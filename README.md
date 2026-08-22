# 远择 FARWISE｜可上线版

这是一个面向全球旅行者与中国用户的“可解释旅行推荐”网页应用。本仓库在原型基础上完成了漏洞修复、UI 打磨，并已产品化为**可直接上线、可获取搜索流量**的完整站点：推荐器 + 目的地深度攻略 + 旅行方法指南 + SEO 基建 + 自动部署。

## 如何打开

直接双击 `index.html`，或把整个文件夹放到任意静态网站托管服务中。不依赖构建工具、账号或后端。

## 上线与流量

### 一键上线（GitHub Pages）

仓库已内置 `.github/workflows/deploy.yml`：**把本分支合并进 `main` 后自动部署**到

> https://jiulou0619.github.io/yuanyou/

首次部署说明：workflow 使用 `actions/configure-pages` 并开启 `enablement: true`，会自动为仓库启用 Pages（来源：GitHub Actions）。如果因权限失败，到 **Settings → Pages → Build and deployment** 手动把 Source 改为 “GitHub Actions” 后，在 Actions 页重跑一次即可。也可以在 Actions 页手动触发（workflow_dispatch）。

### 站点结构（收流量的核心）

| 板块 | 路径 | 作用 |
| --- | --- | --- |
| 推荐器（单页应用） | `/` | 产品本体，转化落点 |
| 目的地攻略 | `/destinations/`（斯洛文尼亚、福冈别府、马德拉、新西兰南岛） | 长尾搜索流量入口，每篇覆盖签证/行程/预算/住宿/交通/FAQ，带 Article + FAQPage + BreadcrumbList 结构化数据 |
| 目的地图书馆 | `/library/`（34 个目的地 + 30 张速览页） | 长尾流量主引擎：按签证方式（免签/落地签/电子签/申根/需办签）、预算档位、区域客户端筛选；速览页由结构化数据生成 |
| 旅行方法 | `/guides/`（怎么选目的地、两档预算法） | 长青内容，建立专业度并回流推荐器 |
| SEO 基建 | `robots.txt`、`sitemap.xml`、canonical、Open Graph、404 页 | 让搜索引擎能收录、能理解、能展示 |

站内已做互链闭环：首页页脚 → 攻略；结果卡/详情弹窗 →「完整攻略」；攻略页 CTA → 推荐器；分享按钮生成带 UTM 的攻略链接（支持系统分享面板与复制链接）。

**裂变机制：晒图卡。** 结果卡与详情弹窗的「📸 晒图卡」按钮会根据用户的性格滑杆生成「旅行人格」（隐路旅人 / 静水漫游者 / 野径玩家 / 都会节拍手），用 Canvas 纯前端绘制 1080×1440（3:4，适配小红书）的分享图：人格名 + 特质标签 + 最匹配目的地 + 匹配度环 + 站点地址。移动端走系统分享面板，桌面端直接下载 PNG，无需任何后端。

**降低流失（ADHD 友好）**：问卷带进度条与剩余时间提示、「不想填表先看示例推荐」快速通道；每篇攻略顶部有「30 秒速览」摘要框 + 直达预算表/行程/清单的跳转按钮。

**复用型工具（让人反复回来的钩子）**：
- **预算实验室（详情弹窗）**：每类开销可切换选项——胶囊旅馆/青旅/民宿/温泉旅馆、自炊/屋台/餐厅、巴士/租车/房车（住行合一）——档位条实时移动，显示「比默认组合省/贵约 X 档」；
- **档位说明**：`$–$$$$` 各档在每类开销上的大概区间（全站统一定义，折叠展示，不构成对具体目的地的价格断言）；
- **钱包与购物**（弹窗 + 每篇攻略）：现金/刷卡/非接支付倾向、有无退税及怎么退、值得带走的本地好物；
- **可勾选行前清单**（`assets/guide.js`）：攻略页的核验清单可打勾，进度保存在本机，跨刷新保留。

### 上线后第一周该做的事

1. **提交搜索引擎**：在 [Google Search Console](https://search.google.com/search-console) 与 [Bing Webmaster Tools](https://www.bing.com/webmasters) 验证站点，提交 `https://jiulou0619.github.io/yuanyou/sitemap.xml`。百度对 github.io 收录有限，若主攻国内流量建议尽早绑定自定义域名。
2. **接入统计**：所有页面底部都有 `analytics:slot` 注释占位。推荐 [Plausible](https://plausible.io/)（隐私友好）或 GA4。注意：站点默认 CSP 较严格，接入时需在**每个页面**的 CSP meta 中把统计域名加入 `script-src` 与 `connect-src`，例如 Plausible：`script-src 'self' https://plausible.io; connect-src 'self' https://plausible.io`。
3. **社交分发**：每篇攻略都有独立 URL 与分享卡片（OG 图），适合发小红书/知乎/即刻/Twitter 时附链接；结果卡的「分享」按钮已带 UTM 参数，便于统计各渠道回流。
4. **自定义域名（可选，强烈建议）**：在 Settings → Pages 绑定域名并开启 HTTPS 后，全局替换 `https://jiulou0619.github.io/yuanyou/` 为新域名（涉及 canonical、og:url、JSON-LD、sitemap.xml、robots.txt、404 页，以及 `app.js` 中晒图卡底部绘制的站点地址）。

### 内容增长路线

**图书馆管道（速览页，低成本扩张）**：目的地数据集中在 `data/destinations-lite.json`（一地一条结构化记录：签证方式、档位、季节、亮点、注意点等约 20 个字段）。新增目的地只需加一条记录，然后运行：

```bash
node scripts/build-library.mjs
```

生成器会自动重建 `library/index.html`（含筛选网格）、每个目的地的速览页、`assets/library-data.js` 与整份 `sitemap.xml`。签证信息带 `updated` 日期戳，建议每季度复核一轮。

**深度攻略管道（高价值长文）**：图书馆里流量表现最好的目的地升级为深度攻略——复制 `destinations/slovenia/index.html` 作为模板，替换正文与 JSON-LD，在 `destinations/index.html`、首页页脚与 `sitemap.xml` 中登记新页面。每篇保持同一结构（适合谁/签证/时令/行程/预算档位与花费结构/住宿/交通/FAQ/核验清单），这是搜索引擎与读者共同偏好的格式。

**价格策略**：全站不展示对目的地的具体金额断言，统一用 `$ 经济 / $$ 适中 / $$$ 进阶 / $$$$ 高预算` 四档 + 各类开销占比表示。这样既避免示例价格误导用户，也让新增目的地不再需要维护会过期的价格数据（这是低成本扩充目的地库的关键）。用户自己输入的预算数字（问卷滑杆）不受此限制。

## 已实现的交互

- 五步旅行偏好问卷：多护照/多签证、时间预算、兴趣、性格与交通。
- **整份问卷自动保存到本机**：证件、常住地、出发城市、日期、天数、同行方式、预算、住宿/节奏/弹性、兴趣、性格滑杆、避雷因素、交通方式与开关全部在刷新后恢复。
- 目的地排序与六类筛选；收藏列表同样跨刷新保留。
- 结果卡展示匹配原因、可能介意项、证件初筛、天气、人流、交通和总费用区间。
- 目的地详情弹窗：匹配拆解、证件说明、住宿、饮食、交通、安全、支付、核验项和预算档位与花费结构。
- 去过、不感兴趣、永久避雷、临时原因（仅本次会话生效）、相似目的地降权和可恢复排除清单。
- 评论摘要、评论筛选、站内本地评论记录与第三方来源隔离示意。
- 桌面与手机响应式布局、键盘焦点和减少动态效果支持。

## 本轮修复与打磨

**安全**
- 所有从 localStorage 回读的数据（证件标签、排除记录、本地评论）在写入 DOM 前统一转义，并按类型/长度/枚举做完整校验，杜绝存储型注入与原型链查找问题。
- 新增 Content-Security-Policy 与 referrer meta 作为纵深防御。

**功能缺陷**
- 弹窗“点击外部关闭”改为仅响应真正的背景点击：修复了键盘操作（Enter/空格）与 label 转发点击会误关反馈弹窗、排除清单弹窗和详情弹窗的问题。
- 表单在第 1–4 步按 Enter 不再直接跳到结果区，而是前进到下一步；反馈弹窗中按 Enter 现在确认而不是取消。
- 日期联动校验：最晚返回不能早于最早出发。
- 空结果状态的“恢复全部结果”不再静默清空整份去过/避雷清单，只重置筛选并引导到可逐条恢复的管理器。
- 预算档位提示在刷新后正确恢复；评分选择器在提交或重新打开后重置；弹窗内收藏不再丢失未提交的评论草稿。

**UI 与无障碍**
- 全站字号从 7–9px 的不可读微字提升到 10px 起步、正文 12–13px 的可读刻度。
- 低对比度灰字全部加深至 WCAG AA 对比度。
- 手机端不再隐藏 4 个兴趣选项；主导航在窄屏以第二行可滚动形式保留。
- 步骤 tab 支持方向键/Home/End 键盘导航（ARIA tabs 模式）；触控目标加大。
- 详情弹窗关闭按钮改为随滚动吸附，任何窗口尺寸下位置都正确。

**产品化**
- 主视觉从 2.2MB PNG 压缩为 WebP（176KB）+ JPEG 回退，加载体积减少 92%。
- 新增 favicon、theme-color、color-scheme、Open Graph/Twitter 分享 meta 与 noscript 提示。

## 重要说明

页面中的目的地、天气、价格、证件状态和新闻信号全部是用于展示交互的示例数据，不构成签证、法律、医疗或安全建议。正式产品必须接入带来源、有效时间、地理范围和置信度的数据，并在预订前及出发前引导用户复核官方信息。

完整产品方案、数据模型、推荐算法、API 候选和开发路线见同目录的 `product-blueprint.md`。

本轮 UI 的 GitHub 开源参考见 `design-references.md`；Google Places 等评论接入要求见 `reviews-integration.md`。

主视觉由 OpenAI 内置图像生成工具为本原型生成，最终提示词为：

> Premium photorealistic editorial travel panorama for a global recommendation website, combining a quiet Mediterranean coastal town, misty East Asian mountains, a modern city skyline, a scenic alpine train and a winding coastal road; warm morning light, deep teal and warm coral palette, visual interest on the right, calm negative space for interface copy, no text, logos, flags, watermarks or identifiable people.
