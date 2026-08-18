// 行前核验清单：把静态列表升级为可勾选、进度保存在本机的清单。
// 渐进增强——没有 JS 时仍是普通列表。
(function () {
  const heading = document.querySelector("#checklist");
  if (!heading) return;
  let list = heading.nextElementSibling;
  while (list && list.tagName !== "UL") list = list.nextElementSibling;
  if (!list) return;

  const storageKey = "farwise-checklist-" + window.location.pathname;
  let saved = [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey));
    if (Array.isArray(parsed)) saved = parsed.map(Boolean);
  } catch (error) {
    saved = [];
  }

  const items = Array.from(list.querySelectorAll("li"));
  const counter = document.createElement("p");
  counter.className = "checklist-progress";
  list.parentNode.insertBefore(counter, list);

  function persist() {
    const states = items.map((item) => item.querySelector("input").checked);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(states));
    } catch (error) {
      /* 隐私模式下静默降级 */
    }
    const done = states.filter(Boolean).length;
    counter.textContent =
      done === items.length
        ? "✓ 全部核对完成，祝一路顺利！"
        : "已核对 " + done + " / " + items.length + " 项 · 进度只保存在本机";
    list.classList.toggle("checklist-done", done === items.length);
  }

  list.classList.add("checklist-interactive");
  items.forEach(function (item, index) {
    const label = document.createElement("label");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = Boolean(saved[index]);
    const text = document.createElement("span");
    while (item.firstChild) text.appendChild(item.firstChild);
    label.appendChild(box);
    label.appendChild(text);
    item.appendChild(label);
    item.classList.toggle("checked", box.checked);
    box.addEventListener("change", function () {
      item.classList.toggle("checked", box.checked);
      persist();
    });
  });
  persist();
})();
