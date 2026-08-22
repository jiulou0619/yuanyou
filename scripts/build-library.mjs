#!/usr/bin/env node
// 目的地图书馆生成器：读 data/destinations-lite.json，生成
//   library/index.html（预渲染网格 + 客户端筛选）
//   library/<slug>/index.html × N（速览页）
//   assets/library-data.js（筛选用数据）
//   sitemap.xml（全站，含图书馆页面）
// 新增目的地只需在 JSON 里加一条记录后重跑：node scripts/build-library.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://jiulou0619.github.io/yuanyou/";
const DATA = JSON.parse(readFileSync(join(ROOT, "data/destinations-lite.json"), "utf8"));
const UPDATED = DATA.updated;
const records = DATA.destinations;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const VISA_BADGE = {
  免签: "visa-free",
  落地签: "visa-voa",
  电子签: "visa-evisa",
  需办签证: "visa-required",
  申根签证: "visa-schengen",
};

const FAVICON = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230d3b3a'/%3E%3Ctext x='32' y='44' font-size='30' text-anchor='middle' fill='%23ffffff' font-family='Georgia,serif'%3E%E8%BF%9C%3C/text%3E%3C/svg%3E`;

const CSP = `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'`;

function head({ title, desc, canonical, ld, depth }) {
  const p = "../".repeat(depth);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="${CSP}" />
    <meta name="referrer" content="no-referrer" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="color-scheme" content="light" />
    <meta name="theme-color" content="#0d3b3a" />
    <meta property="og:site_name" content="远择 FARWISE" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${BASE}assets/travel-hero.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="${FAVICON}" />
    <link rel="stylesheet" href="${p}styles.css" />
    <link rel="stylesheet" href="${p}assets/guide.css" />
    <script type="application/ld+json">
${ld}
    </script>
  </head>
  <body class="guide-page">`;
}

function header(depth) {
  const p = "../".repeat(depth);
  return `    <header class="site-header" id="top">
      <a class="brand" href="${p}index.html" aria-label="远择首页">
        <span class="brand-mark" aria-hidden="true">远</span>
        <span><b>远择</b><small>FARWISE</small></span>
      </a>
      <nav class="main-nav" aria-label="主导航">
        <a href="${p}index.html">首页</a>
        <a href="${p}destinations/index.html">深度攻略</a>
        <a href="${depth === 1 ? "index.html" : "../index.html"}">图书馆</a>
        <a href="${p}guides/index.html">旅行方法</a>
      </nav>
      <a class="header-cta" href="${p}index.html#planner">测测适不适合你</a>
    </header>`;
}

function footer(depth) {
  const p = "../".repeat(depth);
  return `    <footer class="site-footer">
      <div class="brand footer-brand"><span class="brand-mark">远</span><span><b>远择</b><small>FARWISE</small></span></div>
      <div>
        <ul class="footer-links">
          <li><a href="${p}index.html">智能推荐</a></li>
          <li><a href="${p}destinations/index.html">深度攻略</a></li>
          <li><a href="${depth === 1 ? "index.html" : "../index.html"}">目的地图书馆</a></li>
          <li><a href="${p}guides/index.html">旅行方法</a></li>
        </ul>
        <p>内容为行前参考 · 签证与安全信息更新于 ${UPDATED}，请以各国官方最新公告为准。</p>
      </div>
      <a href="#top">回到顶部 ↑</a>
    </footer>
    <!-- analytics:slot — 接入统计脚本前请阅读 README「上线与流量」一节（需同步放宽 CSP） -->
  </body>
</html>
`;
}

// —— 深度攻略的 4 个目的地也进图书馆网格（指向完整攻略） ——
const DEEP_GUIDES = [
  { slug: "../destinations/slovenia/", name: "卢布尔雅那 × 布莱德湖", country: "斯洛文尼亚", region: "欧洲", visaType: "申根签证", tier: "$$$", days: "8–10 天", bestMonths: "5–6 月 / 9 月", line: "步行尺度的首都加翡翠色冰川湖，安静欧洲入门线", tags: ["自然", "徒步", "小众"], deep: true },
  { slug: "../destinations/fukuoka/", name: "福冈 × 别府", country: "日本", region: "东亚", visaType: "需办签证", tier: "$$", days: "6–8 天", bestMonths: "4–5 月 / 10–11 月", line: "直飞两小时的美食城市与温泉海岸", tags: ["美食", "温泉", "短假期"], deep: true },
  { slug: "../destinations/madeira/", name: "马德拉群岛", country: "葡萄牙", region: "欧洲", visaType: "申根签证", tier: "$$$", days: "8–11 天", bestMonths: "全年温和，春秋最稳", line: "云端步道与海岛公路，小众感拉满", tags: ["海岛", "徒步", "自驾"], deep: true },
  { slug: "../destinations/new-zealand/", name: "基督城 × 蒂卡波", country: "新西兰", region: "大洋洲", visaType: "需办签证", tier: "$$$$", days: "10–14 天", bestMonths: "当地夏季 12–2 月", line: "南岛自驾、雪山湖泊与世界级星空", tags: ["自驾", "星空", "自然"], deep: true },
];

function cardHtml(r) {
  const href = r.deep ? r.slug : `${r.slug}/index.html`;
  const badge = r.deep ? `<span class="lib-deep">深度攻略</span>` : "";
  return `        <a class="lib-card" href="${href}" data-visa="${esc(r.visaType)}" data-tier="${esc(r.tier)}" data-region="${esc(r.region)}">
          <span class="lib-card-top"><b>${esc(r.name)}</b><span class="lib-country">${esc(r.country)}</span>${badge}</span>
          <span class="lib-badges"><i class="visa-badge ${VISA_BADGE[r.visaType]}">${esc(r.visaType)}</i><i class="tier-badge">${esc(r.tier)}</i><i>${esc(r.days)}</i><i>${esc(r.bestMonths)}</i></span>
          <span class="lib-line">${esc(r.line)}</span>
          <span class="lib-tags">${r.tags.map((t) => `<em>${esc(t)}</em>`).join("")}</span>
        </a>`;
}

// —— 图书馆首页 ——
function buildHub() {
  const all = [...records, ...DEEP_GUIDES];
  const ld = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: BASE },
          { "@type": "ListItem", position: 2, name: "目的地图书馆", item: `${BASE}library/` },
        ] },
        { "@type": "CollectionPage", name: "目的地图书馆", inLanguage: "zh-CN", url: `${BASE}library/`, description: `按签证方式、预算档位与区域筛选 ${all.length} 个目的地：免签、落地签、电子签一目了然。` },
      ],
    },
    null,
    2
  );
  const html = `${head({
    title: `目的地图书馆：${all.length} 个目的地按签证与预算筛选 - 远择 FARWISE`,
    desc: `中国护照免签、落地签、电子签目的地一目了然：${all.length} 个目的地按签证方式、预算档位（$–$$$$）、区域与最佳季节筛选，每个都有速览页。`,
    canonical: `${BASE}library/`,
    ld,
    depth: 1,
  })}
${header(1)}

    <main>
      <section class="guide-hero">
        <p class="breadcrumb"><a href="../index.html">首页</a> / 目的地图书馆</p>
        <p class="eyebrow">Destination Library</p>
        <h1>目的地图书馆：${all.length} 个地方，按签证和预算挑</h1>
        <p class="hero-lede">
          先看签证：免签、落地签、电子签的地方，说走就能走。再看档位和季节，点进速览页 30 秒了解一个目的地。
          签证信息更新于 ${UPDATED}，出发前请以官方公告复核。
        </p>
      </section>

      <section class="lib-filter-bar" aria-label="筛选目的地">
        <div class="lib-filter-group" data-filter-key="visa">
          <b>签证</b>
          <button type="button" class="lib-filter on" data-filter-value="">全部</button>
          <button type="button" class="lib-filter" data-filter-value="免签">免签</button>
          <button type="button" class="lib-filter" data-filter-value="落地签">落地签</button>
          <button type="button" class="lib-filter" data-filter-value="电子签">电子签</button>
          <button type="button" class="lib-filter" data-filter-value="申根签证">申根签证</button>
          <button type="button" class="lib-filter" data-filter-value="需办签证">需办签证</button>
        </div>
        <div class="lib-filter-group" data-filter-key="tier">
          <b>预算</b>
          <button type="button" class="lib-filter on" data-filter-value="">全部</button>
          <button type="button" class="lib-filter" data-filter-value="$">$ 经济</button>
          <button type="button" class="lib-filter" data-filter-value="$$">$$ 适中</button>
          <button type="button" class="lib-filter" data-filter-value="$$$">$$$ 进阶</button>
          <button type="button" class="lib-filter" data-filter-value="$$$$">$$$$ 高预算</button>
        </div>
        <div class="lib-filter-group" data-filter-key="region">
          <b>区域</b>
          <button type="button" class="lib-filter on" data-filter-value="">全部</button>
          <button type="button" class="lib-filter" data-filter-value="东亚">东亚</button>
          <button type="button" class="lib-filter" data-filter-value="东南亚">东南亚</button>
          <button type="button" class="lib-filter" data-filter-value="南亚中亚">南亚中亚</button>
          <button type="button" class="lib-filter" data-filter-value="中东非洲">中东非洲</button>
          <button type="button" class="lib-filter" data-filter-value="欧洲">欧洲</button>
          <button type="button" class="lib-filter" data-filter-value="大洋洲">大洋洲</button>
        </div>
        <p class="lib-count" id="lib-count" aria-live="polite">显示全部 ${all.length} 个目的地</p>
      </section>

      <section class="lib-grid" id="lib-grid" aria-label="目的地列表">
${all.map(cardHtml).join("\n")}
      </section>

      <section class="related-section">
        <h2>选好了？下一步</h2>
        <div class="related-grid">
          <a class="related-card" href="../index.html#planner">
            <span class="kicker">智能推荐</span>
            <b>让远择按你的证件和性格排个序</b>
            <p>2 分钟问卷，得到可解释的匹配度，不用一个个比。</p>
            <span class="go">开始测试 →</span>
          </a>
          <a class="related-card" href="../guides/how-to-pick-a-destination/index.html">
            <span class="kicker">旅行方法</span>
            <b>怎么在候选里做最终决定</b>
            <p>两两对比法与出发前 14 项自查清单。</p>
            <span class="go">阅读指南 →</span>
          </a>
          <a class="related-card" href="../guides/travel-budget-guide/index.html">
            <span class="kicker">旅行方法</span>
            <b>档位怎么变成你的预算数字</b>
            <p>两档预算法：常见价订票，稳妥价存钱。</p>
            <span class="go">阅读指南 →</span>
          </a>
        </div>
      </section>
    </main>

${footer(1)}`;
  // analytics 注释前插入筛选脚本
  const withScript = html.replace("    <!-- analytics:slot", '    <script src="../assets/library.js" defer></script>\n    <!-- analytics:slot');
  mkdirSync(join(ROOT, "library"), { recursive: true });
  writeFileSync(join(ROOT, "library/index.html"), withScript);
}

// —— 速览页 ——
function buildMini(r) {
  const url = `${BASE}library/${r.slug}/`;
  const title = `${r.name}旅游速览：签证、预算档位与最佳季节 - 远择 FARWISE`;
  const desc = `${r.name}（${r.country}）速览：中国护照${r.visaType}，预算 ${r.tier} 档，建议 ${r.days}，最佳 ${r.bestMonths}。${r.line}。`;
  const ld = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: BASE },
          { "@type": "ListItem", position: 2, name: "目的地图书馆", item: `${BASE}library/` },
          { "@type": "ListItem", position: 3, name: r.name, item: url },
        ] },
        { "@type": "Article", headline: `${r.name}旅游速览：签证、预算档位与最佳季节`, description: desc, inLanguage: "zh-CN", mainEntityOfPage: url, image: `${BASE}assets/travel-hero.jpg`, author: { "@type": "Organization", name: "远择 FARWISE" }, publisher: { "@type": "Organization", name: "远择 FARWISE" } },
      ],
    },
    null,
    2
  );
  const related = [...records.filter((x) => x.region === r.region && x.slug !== r.slug).slice(0, 2), ...records.filter((x) => x.region !== r.region).slice(0, 1)];
  const html = `${head({ title, desc, canonical: url, ld, depth: 2 })}
${header(2)}

    <main>
      <section class="guide-hero">
        <p class="breadcrumb"><a href="../../index.html">首页</a> / <a href="../index.html">目的地图书馆</a> / ${esc(r.name)}</p>
        <p class="eyebrow">速览 · ${esc(r.region)} · ${esc(r.country)}</p>
        <h1>${esc(r.name)}：${esc(r.line)}</h1>
        <ul class="hero-facts">
          <li>中国护照<b>${esc(r.visaType)}</b></li>
          <li>预算 <b>${esc(r.tier)}</b></li>
          <li><b>${esc(r.days)}</b></li>
          <li>最佳 <b>${esc(r.bestMonths)}</b></li>
          <li>${esc(r.flight)}</li>
          <li>${esc(r.tz)}</li>
        </ul>
      </section>

      <div class="guide-body">
        <article class="guide-article">
          <h2 id="visa"><span class="section-index">01</span>签证怎么走</h2>
          <div class="note-block note-info"><b>${esc(r.visaType)}：</b>${esc(r.visaNote)}</div>

          <h2 id="why"><span class="section-index">02</span>为什么去</h2>
          <ul>
${r.highlights.map((h) => `            <li>${esc(h)}</li>`).join("\n")}
          </ul>

          <h2 id="caution"><span class="section-index">03</span>要注意什么</h2>
          <ul>
${r.cautions.map((c) => `            <li>${esc(c)}</li>`).join("\n")}
          </ul>
          <div class="note-block"><b>季节提醒：</b>${esc(r.avoidNote)}</div>

          <h2 id="daily"><span class="section-index">04</span>吃与花钱</h2>
          <p><strong>吃什么：</strong>${esc(r.food)}</p>
          <p><strong>怎么付钱：</strong>${esc(r.pay)}</p>
          <p><strong>人流水平：</strong>${esc(r.crowd)}。预算档位 ${esc(r.tier)}（$ 越多越贵），各档大概区间见<a href="../../guides/travel-budget-guide/index.html">两档预算法</a>。</p>

          <section class="guide-cta">
            <h2>${esc(r.name)}适合你吗？</h2>
            <p>速览只回答「值不值得看」，适不适合你要看证件、假期、预算和性格。用 2 分钟测一测，远择会把它和其他 30+ 目的地一起排出匹配度。</p>
            <a class="primary-button" href="../../index.html#planner">免费测一测 →</a>
          </section>

          <div class="note-block note-info"><b>关于本页：</b>速览由结构化数据生成，更新于 ${UPDATED}。签证、安全与价格请以官方与预订页面为准。</div>
        </article>

        <aside class="guide-aside">
          <div class="aside-card">
            <b>速览</b>
            <dl>
              <div><dt>签证</dt><dd>${esc(r.visaType)}</dd></div>
              <div><dt>预算档位</dt><dd>${esc(r.tier)}</dd></div>
              <div><dt>建议天数</dt><dd>${esc(r.days)}</dd></div>
              <div><dt>最佳季节</dt><dd>${esc(r.bestMonths)}</dd></div>
              <div><dt>飞行</dt><dd>${esc(r.flight)}</dd></div>
              <div><dt>时差</dt><dd>${esc(r.tz)}</dd></div>
              <div><dt>人流</dt><dd>${esc(r.crowd)}</dd></div>
            </dl>
          </div>
          <div class="aside-card aside-cta">
            <b>还在比较？</b>
            <p>回图书馆按签证与预算筛选，或让推荐器替你排序。</p>
            <a href="../index.html">回到图书馆</a>
          </div>
        </aside>
      </div>

      <section class="related-section">
        <h2>同类目的地</h2>
        <div class="related-grid">
${related.map((x) => `          <a class="related-card" href="../${x.slug}/index.html">
            <span class="kicker">${esc(x.region)} · ${esc(x.visaType)}</span>
            <b>${esc(x.name)}</b>
            <p>${esc(x.line)}</p>
            <span class="go">看速览 →</span>
          </a>`).join("\n")}
        </div>
      </section>
    </main>

${footer(2)}`;
  mkdirSync(join(ROOT, "library", r.slug), { recursive: true });
  writeFileSync(join(ROOT, "library", r.slug, "index.html"), html);
}

// —— 筛选数据 ——
function buildData() {
  const lite = [...records.map((r) => ({ slug: r.slug, name: r.name, visa: r.visaType, tier: r.tier, region: r.region })), ...DEEP_GUIDES.map((r) => ({ slug: r.slug, name: r.name, visa: r.visaType, tier: r.tier, region: r.region }))];
  writeFileSync(join(ROOT, "assets/library-data.js"), `// 由 scripts/build-library.mjs 生成，勿手改\nconst DESTINATION_LIBRARY = ${JSON.stringify(lite)};\n`);
}

// —— sitemap ——
function buildSitemap() {
  const staticUrls = ["", "destinations/", "destinations/slovenia/", "destinations/fukuoka/", "destinations/madeira/", "destinations/new-zealand/", "guides/", "guides/how-to-pick-a-destination/", "guides/travel-budget-guide/"];
  const libUrls = ["library/", ...records.map((r) => `library/${r.slug}/`)];
  const rows = [...staticUrls, ...libUrls]
    .map((u) => `  <url>\n    <loc>${BASE}${u}</loc>\n    <lastmod>${UPDATED}</lastmod>\n    <changefreq>${u === "" || u.endsWith("library/") ? "weekly" : "monthly"}</changefreq>\n    <priority>${u === "" ? "1.0" : u === "library/" || u === "destinations/" ? "0.9" : u.startsWith("library/") ? "0.6" : "0.8"}</priority>\n  </url>`)
    .join("\n");
  writeFileSync(join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`);
}

buildHub();
records.forEach(buildMini);
buildData();
buildSitemap();
console.log(`generated: library/index.html + ${records.length} mini pages + library-data.js + sitemap.xml (${9 + 1 + records.length} urls)`);
