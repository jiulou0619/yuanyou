// 目的地图书馆筛选：签证 × 预算 × 区域 三组 AND 过滤。
// 渐进增强——没有 JS 时全部卡片可见。
(function () {
  const grid = document.querySelector("#lib-grid");
  const bar = document.querySelector(".lib-filter-bar");
  if (!grid || !bar) return;

  const active = { visa: "", tier: "", region: "" };
  const cards = Array.from(grid.querySelectorAll(".lib-card"));
  const count = document.querySelector("#lib-count");
  const total = cards.length;

  function apply() {
    let shown = 0;
    cards.forEach(function (card) {
      const ok =
        (!active.visa || card.dataset.visa === active.visa) &&
        (!active.tier || card.dataset.tier === active.tier) &&
        (!active.region || card.dataset.region === active.region);
      card.hidden = !ok;
      if (ok) shown += 1;
    });
    if (count) {
      count.textContent =
        shown === total
          ? "显示全部 " + total + " 个目的地"
          : shown === 0
            ? "没有符合条件的目的地——放宽一个筛选试试"
            : "符合条件的有 " + shown + " 个（共 " + total + "）";
    }
  }

  bar.addEventListener("click", function (event) {
    const button = event.target.closest(".lib-filter");
    if (!button) return;
    const group = button.closest(".lib-filter-group");
    const key = group.dataset.filterKey;
    active[key] = button.dataset.filterValue;
    group.querySelectorAll(".lib-filter").forEach(function (b) {
      b.classList.toggle("on", b === button);
    });
    apply();
  });

  apply();
})();
