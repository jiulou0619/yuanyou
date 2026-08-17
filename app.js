const state = {
  step: 1,
  passports: ["中国大陆"],
  visas: ["申根多次签证"],
  saved: new Set(),
  filter: "all",
  exclusions: [],
  hideVisited: true,
  downrankSimilar: true,
  pendingFeedbackId: null,
  userReviews: {},
  composeRating: 5,
};

const destinations = [
  {
    id: "slovenia",
    media: "slovenia",
    rank: "本次最匹配",
    country: "斯洛文尼亚",
    name: "卢布尔雅那 × 布莱德湖",
    route: "城市慢游 + 湖区徒步",
    score: 94,
    document: "申根签证可覆盖",
    docState: "ok",
    duration: "8–10 天",
    temperature: "17–24°C",
    crowd: "中低",
    crowdValue: 31,
    travel: "约 15h · 转机 1 次",
    travelHours: 15,
    cost: 16600,
    costRange: "¥14,800–18,400",
    tags: ["document", "quiet", "nature", "transit", "drive"],
    tagline: "安静、自然和本地生活的平衡点",
    reasons: ["湖区与轻徒步同时命中高优先兴趣", "首都尺度紧凑，适合独自慢游", "肩季人流与住宿价格更友好"],
    tradeoffs: ["上海通常无直飞", "山区天气切换较快"],
    docDetail: "原型按你填写的中国大陆护照与有效申根多次签证初筛；仍需核对签证有效期、停留天数、首次入境与过境要求。",
    summary: ["匹配度 94", "8–10 天", "P50 ¥16,600", "天气较合适", "人流中低"],
    metrics: [
      ["兴趣匹配", 97, "非常符合"], ["预算稳健", 88, "P90 有余量"], ["氛围个性", 95, "安静而不无聊"],
      ["交通便利", 77, "跨境稍费时"], ["天气窗口", 91, "适合户外"], ["数据置信", 86, "需临近复核"],
    ],
    info: [
      ["住在哪里", "首访可住老城边缘；更安静可选 Trnovo。湖区住一晚，减少当天往返。"],
      ["怎么移动", "市区步行与公交够用；卢布尔雅那至布莱德巴士方便，自驾适合延伸山谷。"],
      ["吃什么", "中央市场、炖菜、奶酪与当地葡萄酒较有代表性；普通正餐约 ¥90–160。"],
      ["安全与习惯", "整体便利，但火车站周边夜间仍需看管随身物品；徒步注意天气和步道关闭。"],
      ["支付与网络", "银行卡接受度高，偏远小店可备少量欧元；城区网络覆盖稳定。"],
      ["当前核验事项", "查看山区降雨、Vintgar 步道开放状态、申根停留天数与联程行李规则。"],
    ],
    budget: [["往返交通", "¥6,300", "¥8,000"], ["住宿 8 晚", "¥4,600", "¥5,900"], ["餐饮", "¥2,200", "¥3,000"], ["当地交通", "¥900", "¥1,600"], ["活动/保险/备用", "¥800", "¥1,700"], ["预计总计", "¥14,800", "¥20,200"]],
  },
  {
    id: "fukuoka",
    media: "fukuoka",
    rank: "最方便",
    country: "日本",
    name: "福冈 × 别府",
    route: "美食城市 + 温泉海岸",
    score: 91,
    document: "需单独核验日本签证",
    docState: "pending",
    duration: "6–8 天",
    temperature: "22–28°C",
    crowd: "中等",
    crowdValue: 48,
    travel: "约 2h · 可直飞",
    travelHours: 2,
    cost: 11800,
    costRange: "¥9,600–14,000",
    tags: ["quiet", "transit"],
    tagline: "路程短、好吃、公共交通顺手",
    reasons: ["直飞降低独自旅行的行程摩擦", "小吃、市场与温泉贴合偏好", "城市便利与安静支线可以兼得"],
    tradeoffs: ["需要另行确认日本签证", "热门餐厅可能排队"],
    docDetail: "现有申根签证通常不能替代日本入境许可。原型无法确认你是否另持有效日本签证，请在预订前通过日本官方渠道核验。",
    summary: ["匹配度 91", "6–8 天", "P50 ¥11,800", "温暖偏湿", "人流中等"],
    metrics: [["兴趣匹配", 92, "美食与温泉突出"], ["预算稳健", 95, "余量充足"], ["氛围个性", 86, "可动可静"], ["交通便利", 98, "直飞与铁路"], ["天气窗口", 79, "注意降雨"], ["数据置信", 82, "证件待确认"]],
    info: [
      ["住在哪里", "博多站周边换乘最省心；想更安静可住大濠公园一带；别府优先选可步行到车站的温泉旅馆。"],
      ["怎么移动", "地铁、JR 与高速巴士覆盖核心路线；网约车不是必须，IC 卡可减少购票摩擦。"],
      ["吃什么", "豚骨拉面、明太子、水炊锅与屋台文化；对排队敏感可避开天神核心街区晚餐高峰。"],
      ["安全与习惯", "夜间总体便利；温泉需遵守入浴礼仪，部分设施对纹身有规定，应提前查询。"],
      ["支付与网络", "交通与连锁店电子支付便利，小店仍可能偏现金；eSIM 覆盖稳定。"],
      ["当前核验事项", "日本签证有效性、台风或强降雨概率、温泉设施纹身规则与末班车。"],
    ],
    budget: [["往返交通", "¥2,200", "¥3,600"], ["住宿 7 晚", "¥3,500", "¥5,300"], ["餐饮", "¥2,100", "¥3,200"], ["当地交通", "¥900", "¥1,400"], ["活动/保险/备用", "¥900", "¥1,500"], ["预计总计", "¥9,600", "¥15,000"]],
  },
  {
    id: "madeira",
    media: "madeira",
    rank: "小众惊喜",
    country: "葡萄牙",
    name: "马德拉群岛",
    route: "海岛公路 + 云端步道",
    score: 89,
    document: "申根签证可覆盖",
    docState: "ok",
    duration: "8–11 天",
    temperature: "20–25°C",
    crowd: "中低",
    crowdValue: 34,
    travel: "约 19h · 转机 1–2 次",
    travelHours: 19,
    cost: 19400,
    costRange: "¥17,200–22,800",
    tags: ["document", "quiet", "nature", "drive"],
    tagline: "海边、徒步和小众感全部拉满",
    reasons: ["Levada 步道高度匹配徒步偏好", "海岛节奏安静，避开大众团线", "自驾能覆盖不同微气候景观"],
    tradeoffs: ["预算 P90 可能超出目标", "转机时间较长"],
    docDetail: "原型按有效申根多次签证进行初筛；请确认签证覆盖葡萄牙、剩余停留天数、转机地入境要求及护照有效期。",
    summary: ["匹配度 89", "8–11 天", "P50 ¥19,400", "温和多变", "人流中低"],
    metrics: [["兴趣匹配", 99, "海岛徒步满分"], ["预算稳健", 70, "存在超支风险"], ["氛围个性", 96, "安静小众"], ["交通便利", 62, "长途转机"], ["天气窗口", 88, "微气候多变"], ["数据置信", 83, "机票波动较大"]],
    info: [
      ["住在哪里", "Funchal 最便利；São Vicente 更安静且靠近自然，但晚间餐饮和公交较少。"],
      ["怎么移动", "自驾体验最好，但山路陡、停车紧张；不自驾可组合区域巴士与小团接驳。"],
      ["吃什么", "黑带鱼、炖牛肉、bolo do caco 与热带水果；旅游区外性价比更高。"],
      ["安全与习惯", "主要风险来自山路、临崖步道和天气突变，不宜只依据城市天气决定徒步。"],
      ["支付与网络", "城区刷卡便利，山地信号会有空白；离线地图和现金备用有帮助。"],
      ["当前核验事项", "步道封闭、风速和降雨、租车保险条款、山路驾驶能力及航班衔接。"],
    ],
    budget: [["往返交通", "¥8,000", "¥11,000"], ["住宿 9 晚", "¥4,700", "¥6,800"], ["餐饮", "¥2,400", "¥3,400"], ["租车/油费/停车", "¥1,500", "¥2,400"], ["活动/保险/备用", "¥600", "¥1,600"], ["预计总计", "¥17,200", "¥25,200"]],
  },
  {
    id: "newzealand",
    media: "newzealand",
    rank: "自然体验最强",
    country: "新西兰",
    name: "基督城 × 蒂卡波",
    route: "南岛自驾 + 星空徒步",
    score: 86,
    document: "需申请访客签证",
    docState: "pending",
    duration: "10–14 天",
    temperature: "8–17°C",
    crowd: "低",
    crowdValue: 22,
    travel: "约 14h · 转机 1 次",
    travelHours: 14,
    cost: 25800,
    costRange: "¥22,000–30,500",
    tags: ["quiet", "nature", "drive"],
    tagline: "愿意多花时间和预算时的自然王牌",
    reasons: ["极低人流与辽阔自然非常匹配", "自驾、摄影、观星可组成完整主题", "路线弹性适合避开热门时段"],
    tradeoffs: ["明显超过当前预算", "左侧通行且驾驶距离长"],
    docDetail: "按中国大陆护照演示时通常需要提前取得新西兰入境许可；签证、健康、资金和返程证明要求请以新西兰官方渠道为准。",
    summary: ["匹配度 86", "10–14 天", "P50 ¥25,800", "偏凉", "人流低"],
    metrics: [["兴趣匹配", 98, "自然与摄影突出"], ["预算稳健", 52, "超出当前预算"], ["氛围个性", 99, "低人流"], ["交通便利", 68, "依赖自驾"], ["天气窗口", 73, "偏凉多风"], ["数据置信", 81, "租车价格浮动"]],
    info: [
      ["住在哪里", "基督城住市中心便于补给；湖区提前订可控预算，避开湖岸第一排通常更安静。"],
      ["怎么移动", "自驾几乎是核心体验；左侧通行、单车道桥和疲劳驾驶是主要挑战。"],
      ["吃什么", "城市餐饮选择丰富，公路段需提前补给；住宿带厨房可显著控制预算。"],
      ["安全与习惯", "自然环境风险高于治安风险，关注强风、紫外线、步道状况与驾驶间隔。"],
      ["支付与网络", "刷卡普及；偏远公路和步道网络不稳定，下载离线地图与应急联系人。"],
      ["当前核验事项", "签证处理时间、国际驾照/翻译件、租车免赔额、山口天气和日落时间。"],
    ],
    budget: [["往返交通", "¥7,300", "¥10,000"], ["住宿 11 晚", "¥6,800", "¥9,500"], ["餐饮", "¥2,800", "¥4,100"], ["租车/油费/停车", "¥3,500", "¥5,200"], ["活动/签证/保险", "¥1,600", "¥2,800"], ["预计总计", "¥22,000", "¥31,600"]],
  },
];

const reviewData = {
  slovenia: {
    rating: 4.7,
    count: 128,
    aspects: [["景色", 96], ["安静", 91], ["步行友好", 88], ["公交", 79], ["旺季住宿", 64, true]],
    reviews: [
      { name: "林屿", rating: 5, date: "2026 年 6 月", tags: ["独行", "徒步", "安静"], text: "卢布尔雅那很适合慢慢走，老城之外的社区更安静。布莱德湖建议住一晚，清晨的人流和体验完全不同。" },
      { name: "Mina K.", rating: 4, date: "2026 年 5 月", tags: ["情侣", "公交", "美食"], text: "城市到湖区的巴士比想象中方便，但周末回程座位紧张。餐饮价格合理，市场附近比主广场更有本地感。" },
      { name: "北纬 31°", rating: 5, date: "2025 年 9 月", tags: ["自驾", "摄影", "徒步"], text: "山谷自驾非常漂亮，不过山区天气变化快。不要只看首都预报，出发前还要检查具体步道和山口。" },
    ],
  },
  fukuoka: {
    rating: 4.6,
    count: 216,
    aspects: [["美食", 97], ["公共交通", 94], ["独行便利", 91], ["温泉", 89], ["热门店排队", 58, true]],
    reviews: [
      { name: "阿柚", rating: 5, date: "2026 年 7 月", tags: ["独行", "美食", "公交"], text: "机场进城很快，一个人旅行几乎没有交通压力。屋台气氛很好，但热门点不一定最好吃，往居民区走更舒服。" },
      { name: "Sora", rating: 4, date: "2026 年 4 月", tags: ["朋友", "温泉", "公交"], text: "福冈和别府组合很顺，JR 与巴士够用。别府住车站附近会省很多力气，晚上去偏远温泉要留意末班车。" },
      { name: "慢慢旅行", rating: 4, date: "2025 年 11 月", tags: ["情侣", "购物", "美食"], text: "商场和餐厅集中，雨天也不无聊。周末天神和博多明显更拥挤，错开饭点体验会好很多。" },
    ],
  },
  madeira: {
    rating: 4.8,
    count: 94,
    aspects: [["自然", 99], ["徒步", 97], ["安静", 88], ["自驾", 82], ["山路难度", 55, true]],
    reviews: [
      { name: "Yuki W.", rating: 5, date: "2026 年 6 月", tags: ["徒步", "独行", "摄影"], text: "步道景观密度很高，但同一天不同区域天气差异很大。准备防水层和离线地图比追求打卡数量更重要。" },
      { name: "陈小路", rating: 5, date: "2026 年 3 月", tags: ["自驾", "情侣", "自然"], text: "自驾自由度很高，不过 Funchal 的陡坡和停车需要适应。自动挡值得提前订，不建议下飞机后立刻开长距离山路。" },
      { name: "Nora", rating: 4, date: "2025 年 10 月", tags: ["公交", "安静", "美食"], text: "不自驾也能玩，但需要围绕巴士时间安排。北岸很安静，餐厅选择少，适合愿意放慢节奏的人。" },
    ],
  },
  newzealand: {
    rating: 4.8,
    count: 173,
    aspects: [["自然", 99], ["星空", 96], ["低人流", 93], ["自驾", 87], ["整体费用", 48, true]],
    reviews: [
      { name: "山海之间", rating: 5, date: "2026 年 2 月", tags: ["自驾", "摄影", "徒步"], text: "风景不用追景点清单，公路本身就是体验。每天驾驶时间不要排太满，强风时的体感和预计行程会差很多。" },
      { name: "Grace T.", rating: 4, date: "2025 年 12 月", tags: ["家庭", "自驾", "自然"], text: "带孩子旅行很舒服，但住宿和餐饮预算比预期高。带厨房的住宿能明显降低成本，也更适合长距离移动。" },
      { name: "陆行鸟", rating: 5, date: "2025 年 9 月", tags: ["独行", "安静", "星空"], text: "蒂卡波之外也有很多安静观星点。夜间驾驶要格外谨慎，动物、结冰和疲劳比城市治安更值得注意。" },
    ],
  },
};

const memoryLabels = {
  visited: { label: "我去过", icon: "✓" },
  not_interested: { label: "不想去", icon: "–" },
  avoid: { label: "永久避雷", icon: "⊘" },
  too_expensive: { label: "预算不合适", icon: "¥" },
  too_far: { label: "路上太久", icon: "↗" },
  too_crowded: { label: "太拥挤", icon: "♟" },
};

const elements = {
  form: document.querySelector("#recommendation-form"),
  stepTabs: [...document.querySelectorAll(".step-tab")],
  formSteps: [...document.querySelectorAll(".form-step")],
  prev: document.querySelector("#prev-step"),
  next: document.querySelector("#next-step"),
  analyze: document.querySelector("#analyze"),
  passportTags: document.querySelector("#passport-tags"),
  visaTags: document.querySelector("#visa-tags"),
  list: document.querySelector("#destination-list"),
  dialog: document.querySelector("#destination-dialog"),
  methodDialog: document.querySelector("#method-dialog"),
  feedbackDialog: document.querySelector("#feedback-dialog"),
  exclusionDialog: document.querySelector("#exclusion-dialog"),
  toast: document.querySelector("#toast"),
};

function formatMoney(value) {
  return `¥${Number(value).toLocaleString("zh-CN")}`;
}

function showToast(message, action) {
  const label = document.createElement("span");
  label.textContent = message;
  elements.toast.replaceChildren(label);
  if (action) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.toastAction = "";
    button.textContent = action.label;
    elements.toast.append(button);
  }
  showToast.action = action?.callback || null;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), action ? 6000 : 2800);
}

function setStep(nextStep) {
  state.step = Math.max(1, Math.min(5, nextStep));
  elements.formSteps.forEach((panel) => {
    const active = Number(panel.dataset.step) === state.step;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  elements.stepTabs.forEach((tab, index) => {
    const number = index + 1;
    tab.classList.toggle("active", number === state.step);
    tab.classList.toggle("done", number < state.step);
    tab.setAttribute("aria-selected", String(number === state.step));
  });
  elements.prev.disabled = state.step === 1;
  elements.next.hidden = state.step === 5;
  elements.analyze.hidden = state.step !== 5;
}

function renderTags(type) {
  const values = type === "passport" ? state.passports : state.visas;
  const container = type === "passport" ? elements.passportTags : elements.visaTags;
  container.innerHTML = values
    .map((value) => `<span class="data-tag">${value}<button type="button" data-remove-${type}="${value}" aria-label="移除 ${value}">×</button></span>`)
    .join("");
}

function addTag(type) {
  const select = document.querySelector(`#${type}-select`);
  const values = type === "passport" ? state.passports : state.visas;
  if (values.includes(select.value)) {
    showToast("这一项已经添加过了");
    return;
  }
  values.push(select.value);
  renderTags(type);
  persistPreferences();
}

function removeTag(type, value) {
  const values = type === "passport" ? state.passports : state.visas;
  if (type === "passport" && values.length === 1) {
    showToast("至少保留一本旅行证件，才能判断入境可行性");
    return;
  }
  const index = values.indexOf(value);
  if (index >= 0) values.splice(index, 1);
  renderTags(type);
  persistPreferences();
}

function selectedInterests() {
  return [...document.querySelectorAll("[data-interest][aria-pressed='true']")].map((button) => button.dataset.interest);
}

function persistPreferences() {
  const snapshot = {
    passports: state.passports,
    visas: state.visas,
    origin: document.querySelector("#origin")?.value,
    budget: document.querySelector("#budget-range")?.value,
    interests: selectedInterests(),
  };
  try {
    localStorage.setItem("farwise-demo-preferences", JSON.stringify(snapshot));
  } catch (_) {
    // The prototype still works when local storage is blocked.
  }
}

function loadPreferences() {
  try {
    const raw = localStorage.getItem("farwise-demo-preferences");
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.passports) && saved.passports.length) state.passports = saved.passports;
    if (Array.isArray(saved.visas)) state.visas = saved.visas;
    if (saved.origin) document.querySelector("#origin").value = saved.origin;
    if (saved.budget) {
      document.querySelector("#budget-range").value = saved.budget;
      document.querySelector("#budget-output").textContent = formatMoney(saved.budget);
    }
    if (Array.isArray(saved.interests)) {
      document.querySelectorAll("[data-interest]").forEach((button) => {
        const selected = saved.interests.includes(button.dataset.interest);
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    }
  } catch (_) {
    // Ignore malformed demo state.
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function persistTravelMemory() {
  try {
    localStorage.setItem("farwise-demo-travel-memory", JSON.stringify({
      exclusions: state.exclusions,
      hideVisited: state.hideVisited,
      downrankSimilar: state.downrankSimilar,
      userReviews: state.userReviews,
    }));
  } catch (_) {
    // The prototype remains usable if local storage is unavailable.
  }
}

function loadTravelMemory() {
  try {
    const raw = localStorage.getItem("farwise-demo-travel-memory");
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.exclusions)) state.exclusions = saved.exclusions;
    if (typeof saved.hideVisited === "boolean") state.hideVisited = saved.hideVisited;
    if (typeof saved.downrankSimilar === "boolean") state.downrankSimilar = saved.downrankSimilar;
    if (saved.userReviews && typeof saved.userReviews === "object") state.userReviews = saved.userReviews;
  } catch (_) {
    // Ignore malformed local prototype data.
  }
}

function getMemoryDisplay(record) {
  if (record.preference === "avoid") return memoryLabels.avoid;
  if (record.preference === "not_interested") return memoryLabels[record.reason] || memoryLabels.not_interested;
  return memoryLabels.visited;
}

function matchingMemories(destination) {
  const haystack = `${destination.country} ${destination.name}`.toLocaleLowerCase("zh-CN");
  return state.exclusions.filter((record) => {
    if (record.destinationId === destination.id) return true;
    const label = String(record.label || "").trim().toLocaleLowerCase("zh-CN");
    return label.length > 0 && haystack.includes(label);
  });
}

function isDestinationExcluded(destination) {
  return matchingMemories(destination).some((record) => {
    if (record.preference === "avoid" || record.preference === "not_interested") return true;
    return record.experience === "visited" && state.hideVisited;
  });
}

function upsertMemory({ destinationId = null, label, reason }) {
  const destination = destinations.find((item) => item.id === destinationId);
  const existing = state.exclusions.find((record) => destinationId ? record.destinationId === destinationId : !record.destinationId && record.label === label);
  const isVisited = reason === "visited";
  const isAvoid = reason === "avoid";
  const record = existing || {
    key: destinationId ? `destination:${destinationId}` : `manual:${Date.now()}`,
    destinationId,
    label: destination ? destination.name : label,
    country: destination?.country || "自定义地点",
    experience: "unvisited",
    preference: "normal",
    revisit: "unspecified",
    createdAt: new Date().toISOString(),
  };

  if (isVisited) {
    record.experience = "visited";
    record.reason = "visited";
  } else {
    record.preference = isAvoid ? "avoid" : "not_interested";
    record.reason = reason;
  }
  record.scope = ["too_expensive", "too_far", "too_crowded"].includes(reason) ? "本次行程" : "直到手动恢复";
  if (!existing) state.exclusions.push(record);
  persistTravelMemory();
  updateMemoryUI();
  renderDestinations();
  return record;
}

function removeMemory(key, withToast = true) {
  const index = state.exclusions.findIndex((record) => record.key === key);
  if (index < 0) return;
  const [removed] = state.exclusions.splice(index, 1);
  persistTravelMemory();
  updateMemoryUI();
  renderDestinations();
  if (withToast) showToast(`已恢复“${removed.label}”参与推荐`);
}

function renderMemoryTags() {
  const container = document.querySelector("#memory-tag-list");
  if (!container) return;
  container.innerHTML = state.exclusions.slice(-5).map((record) => {
    const display = getMemoryDisplay(record);
    return `<span class="memory-tag ${record.preference === "avoid" ? "avoid" : record.preference === "not_interested" ? "not_interested" : "visited"}">${display.icon} ${escapeHtml(record.label)}<button type="button" data-restore-memory="${escapeHtml(record.key)}" aria-label="恢复 ${escapeHtml(record.label)}">×</button></span>`;
  }).join("");
}

function renderExclusionList() {
  const container = document.querySelector("#exclusion-list");
  if (!container) return;
  if (!state.exclusions.length) {
    container.innerHTML = `<div class="empty-exclusions">还没有旅行足迹或避雷记录。<br />在推荐卡上点“去过”或“不想去”即可添加。</div>`;
    return;
  }
  container.innerHTML = state.exclusions.map((record) => {
    const display = getMemoryDisplay(record);
    const details = [display.label, record.scope, record.experience === "visited" && record.preference !== "normal" ? "去过且已排除" : ""].filter(Boolean).join(" · ");
    return `<article class="exclusion-item"><span class="exclusion-item-icon">${display.icon}</span><div><b>${escapeHtml(record.label)}</b><small>${escapeHtml(record.country)} · ${escapeHtml(details)}</small></div><button class="restore-button" type="button" data-restore-memory="${escapeHtml(record.key)}">恢复推荐</button></article>`;
  }).join("");
}

function updateMemoryUI() {
  document.querySelector("#exclusion-count").textContent = state.exclusions.length;
  document.querySelector("#hide-visited-switch").checked = state.hideVisited;
  document.querySelector("#downrank-similar-switch").checked = state.downrankSimilar;
  renderMemoryTags();
  renderExclusionList();
}

function addManualMemory() {
  const input = document.querySelector("#memory-place-input");
  const label = input.value.trim();
  if (!label) {
    showToast("先输入一个国家、城市或地区");
    input.focus();
    return;
  }
  const type = document.querySelector("#memory-place-type").value;
  const isWholeCountry = destinations.some((destination) => destination.country === label);
  const matched = isWholeCountry ? null : destinations.find((destination) => destination.name.includes(label));
  const record = upsertMemory({ destinationId: matched?.id || null, label, reason: type });
  input.value = "";
  const display = getMemoryDisplay(record);
  showToast(`已将“${record.label}”标记为${display.label}`, { label: "撤销", callback: () => removeMemory(record.key, false) });
}

function updateRange(range) {
  const min = Number(range.min || 0);
  const max = Number(range.max || 100);
  const value = Number(range.value);
  const progress = ((value - min) / (max - min)) * 100;
  range.style.setProperty("--range-progress", `${progress}%`);
  const row = range.closest(".spectrum-row");
  if (row) {
    const left = row.dataset.left;
    const right = row.dataset.right;
    const output = row.querySelector(".spectrum-state");
    if (value < 35) output.textContent = `${value < 20 ? "明显" : "偏向"}${left}`;
    else if (value > 65) output.textContent = `${value > 80 ? "明显" : "偏向"}${right}`;
    else output.textContent = "较为平衡";
  }
}

function updateAllRanges() {
  document.querySelectorAll(".smart-range").forEach(updateRange);
}

function updateInterestCount() {
  document.querySelector("#interest-count").textContent = selectedInterests().length;
}

function cardTemplate(destination) {
  const reviews = reviewData[destination.id];
  return `
    <article class="destination-card" data-id="${destination.id}">
      <div class="destination-media ${destination.media}">
        <span class="rank-badge">✦ ${destination.rank}</span>
        <div class="media-bottom">
          <p>${destination.country} · ${destination.route}</p>
          <b>${destination.name}</b>
        </div>
      </div>
      <div class="destination-body">
        <div class="card-heading">
          <div class="score-block">
            <div class="score-ring" style="--score:${destination.score}"><b>${destination.score}</b></div>
            <div><b>高匹配</b><small>${destination.tagline}</small></div>
          </div>
          <span class="document-pill ${destination.docState === "pending" ? "pending" : ""}">${destination.docState === "pending" ? "△" : "✓"} ${destination.document}</span>
        </div>
        <div class="destination-meta">
          <div><span>建议天数</span><b>${destination.duration}</b></div>
          <div><span>同期体感</span><b>${destination.temperature}</b></div>
          <div><span>预计人流</span><b>${destination.crowd}</b></div>
          <div><span>门到门</span><b>${destination.travel}</b></div>
        </div>
        <div class="reason-grid">
          <div><h3>为什么推荐给你</h3><ul class="reason-list">${destination.reasons.map((item) => `<li>${item}</li>`).join("")}</ul></div>
          <div><h3>你可能会介意</h3><ul class="tradeoff-list">${destination.tradeoffs.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        </div>
        <div class="card-actions">
          <div class="price-estimate"><b>${destination.costRange}</b><small>人均总费用估算 · 含大交通与住宿</small><span class="traveler-rating"><b>★ ${reviews.rating}</b> · ${reviews.count} 条原型评论</span></div>
          <div class="action-buttons">
            <button class="save-button ${state.saved.has(destination.id) ? "saved" : ""}" type="button" data-save="${destination.id}">${state.saved.has(destination.id) ? "♥ 已收藏" : "♡ 收藏"}</button>
            <button class="save-button memory-button" type="button" data-visited="${destination.id}">✓ 去过</button>
            <button class="save-button memory-button avoid-button" type="button" data-feedback="${destination.id}">– 不想去</button>
            <button class="detail-button" type="button" data-detail="${destination.id}">查看详情 →</button>
          </div>
        </div>
      </div>
    </article>`;
}

function filteredDestinations() {
  let items = destinations.filter((item) => !isDestinationExcluded(item));
  if (state.filter !== "all") items = items.filter((item) => item.tags.includes(state.filter));
  const sort = document.querySelector("#sort-results").value;
  if (sort === "cost") items.sort((a, b) => a.cost - b.cost);
  else if (sort === "crowd") items.sort((a, b) => a.crowdValue - b.crowdValue);
  else if (sort === "travel") items.sort((a, b) => a.travelHours - b.travelHours);
  else items.sort((a, b) => b.score - a.score);
  return items;
}

function renderDestinations() {
  const items = filteredDestinations();
  if (!items.length) {
    elements.list.innerHTML = `<div class="empty-state"><span>🧭</span><h3>这个组合暂时没有结果</h3><p>试试放宽一个筛选条件，或恢复被隐藏的推荐。</p><button class="secondary-button" type="button" id="reset-results">恢复全部结果</button></div>`;
    return;
  }
  elements.list.innerHTML = items.map(cardTemplate).join("");
}

function stars(rating) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(rounded)}${"☆".repeat(5 - rounded)}`;
}

function reviewCardTemplate(review, isLocal = false) {
  const tags = Array.isArray(review.tags) ? review.tags : [];
  return `<article class="review-card" data-review-tags="${escapeHtml(tags.join("|"))}">
    <span class="review-avatar">${escapeHtml(review.name.slice(0, 2).toUpperCase())}</span>
    <div>
      <div class="review-card-header"><div><b>${escapeHtml(review.name)}</b><small>${escapeHtml(review.date)} · ${isLocal ? "本站本地草稿" : "原型模拟评论"}</small></div><span class="review-stars" aria-label="${review.rating} 星">${stars(review.rating)}</span></div>
      <p>${escapeHtml(review.text)}</p>
      <div class="review-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}${isLocal ? "<span>仅存本机</span>" : ""}</div>
    </div>
  </article>`;
}

function renderReviewSection(destination) {
  const data = reviewData[destination.id];
  const localReviews = state.userReviews[destination.id] || [];
  const allReviews = [...localReviews, ...data.reviews];
  const filters = ["全部", ...new Set(allReviews.flatMap((review) => review.tags || []))].slice(0, 7);
  return `<section class="review-section" id="traveler-reviews" data-review-destination="${destination.id}">
    <div class="review-heading"><div><h3>旅行者评论区</h3><p>站内评论与第三方内容必须分开显示，评分不混算。</p></div><span class="review-demo-badge">模拟内容 · 非抓取</span></div>
    <div class="review-source-tabs" role="tablist" aria-label="评论来源"><button class="active" type="button" role="tab" aria-selected="true">旅行者社区</button><button type="button" role="tab" aria-selected="false" disabled>Google Maps · 待接入</button></div>
    <div class="review-overview">
      <div class="review-score-card"><strong>${data.rating}</strong><span class="stars">${stars(data.rating)}</span><small>${data.count + localReviews.length} 条原型与本地评论</small></div>
      <div class="review-aspects">${data.aspects.map(([name, percent, caution]) => `<span class="aspect-pill ${caution ? "caution" : ""}">${escapeHtml(name)} · ${percent}% 提及</span>`).join("")}</div>
    </div>
    <div class="review-filter-row" aria-label="筛选评论">${filters.map((filter, index) => `<button class="review-filter ${index === 0 ? "active" : ""}" type="button" data-review-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`).join("")}</div>
    <div class="review-list">${allReviews.map((review, index) => reviewCardTemplate(review, index < localReviews.length)).join("")}</div>
    <div class="review-source-note"><span>ⓘ</span><div><b>这里目前是明确标注的原型模拟评论。</b><br />正式版通过 Google Places API 实时获取最多 5 条相关评论时，会保留作者归属、发布时间、翻译说明、Google Maps 原文链接、举报入口以及“按相关性排序”的说明；不会爬取或长期保存 Google 评论正文。</div></div>
    <div class="review-compose">
      <div class="review-compose-head"><b>分享你的亲身体验</b><small>原型仅保存到本机，不会公开发布</small></div>
      <textarea id="review-text" placeholder="建议写清时间、地点和具体经历；不要公开他人的姓名、电话或证件信息。"></textarea>
      <div class="review-compose-footer"><div class="star-picker" aria-label="选择评分">${[1,2,3,4,5].map((rating) => `<button class="${rating <= state.composeRating ? "active" : ""}" type="button" data-review-star="${rating}" aria-label="${rating} 星">★</button>`).join("")}</div><button class="review-submit" type="button" data-submit-review="${destination.id}">保存到我的旅行记录</button></div>
    </div>
  </section>`;
}

function openDestination(id) {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) return;
  const budgetRows = destination.budget
    .map(([label, p50, p90]) => `<tr><td>${label}</td><td>${p50}</td><td>${p90}</td></tr>`)
    .join("");
  document.querySelector("#dialog-content").innerHTML = `
    <div class="drawer-hero">
      <div class="drawer-top"><div><p class="eyebrow">${destination.country} · ${destination.rank}</p><h2>${destination.name}</h2></div><span class="drawer-score"><b>${destination.score}</b><span>/ 100</span></span></div>
      <p>${destination.tagline}。这是基于你本次填写的信息生成的演示判断，不代表对所有旅行者都适合。</p>
    </div>
    <div class="drawer-body">
      <div class="drawer-summary">${destination.summary.map((value, index) => `<div><span>${["综合结果", "适合时长", "预计总价", "天气", "人流"][index]}</span><b>${value}</b></div>`).join("")}</div>
      <section class="drawer-section"><h3>为什么适合我</h3><div class="metric-grid">${destination.metrics.map(([name, score, label]) => `<article class="metric-card"><div class="metric-title"><b>${name}</b><span>${label} · ${score}</span></div><div class="metric-bar"><i style="width:${score}%"></i></div></article>`).join("")}</div></section>
      <section class="drawer-section"><h3>能否顺利前往</h3><div class="info-card"><b>${destination.docState === "ok" ? "初筛：可能符合现有证件条件" : "初筛：仍需完成或确认手续"}</b><p>${destination.docDetail}</p></div></section>
      <section class="drawer-section"><h3>住、吃、移动与安全</h3><div class="info-grid">${destination.info.map(([title, detail]) => `<article class="info-card"><b>${title}</b><p>${detail}</p></article>`).join("")}</div></section>
      <section class="drawer-section"><h3>人均费用区间</h3><table class="budget-table"><thead><tr><th>项目</th><th>P50 常见预算</th><th>P90 保守预算</th></tr></thead><tbody>${budgetRows}</tbody></table></section>
      ${renderReviewSection(destination)}
      <div class="drawer-footer"><p>演示价格不代表实时报价；证件、天气、安全、步道和交通信息应在预订前及出发前再次从官方来源核验。</p><button class="primary-button" type="button" data-dialog-save="${destination.id}">${state.saved.has(destination.id) ? "已收藏到候选清单" : "收藏到候选清单"}</button></div>
    </div>`;
  if (!elements.dialog.open) {
    elements.dialog.showModal();
    elements.dialog.scrollTop = 0;
    document.querySelector(".dialog-close").focus({ preventScroll: true });
  }
}

function updateResultContext() {
  const budget = document.querySelector("#budget-range").value;
  const interests = selectedInterests();
  document.querySelector("#context-origin").textContent = document.querySelector("#origin").value || "当前城市";
  document.querySelector("#context-days").textContent = document.querySelector("#duration").value;
  document.querySelector("#context-budget").textContent = formatMoney(budget);
  document.querySelector("#context-interest").textContent = interests.slice(0, 3).join("、") || "暂未指定";
}

function openFeedback(id, defaultReason = "not_interested") {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) return;
  state.pendingFeedbackId = id;
  document.querySelector("#feedback-title").textContent = defaultReason === "visited" ? `你去过“${destination.name}”？` : `为什么不想看到“${destination.name}”？`;
  const radio = document.querySelector(`input[name="feedback-reason"][value="${defaultReason}"]`);
  if (radio) radio.checked = true;
  elements.feedbackDialog.showModal();
}

function commitFeedback() {
  const reason = document.querySelector('input[name="feedback-reason"]:checked')?.value || "not_interested";
  const destination = destinations.find((item) => item.id === state.pendingFeedbackId);
  if (!destination) return;
  const record = upsertMemory({ destinationId: destination.id, label: destination.name, reason });
  const display = getMemoryDisplay(record);
  elements.feedbackDialog.close();
  showToast(`已将“${destination.name}”标记为${display.label}`, {
    label: "撤销",
    callback: () => removeMemory(record.key, false),
  });
}

function submitLocalReview(destinationId) {
  const textarea = document.querySelector("#review-text");
  const text = textarea?.value.trim() || "";
  if (text.length < 8) {
    showToast("请至少写 8 个字，描述具体体验");
    textarea?.focus();
    return;
  }
  const review = {
    name: "我的记录",
    rating: state.composeRating,
    date: new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" }).format(new Date()),
    tags: ["我的体验"],
    text,
  };
  state.userReviews[destinationId] ||= [];
  state.userReviews[destinationId].unshift(review);
  persistTravelMemory();
  openDestination(destinationId);
  const section = document.querySelector("#traveler-reviews");
  elements.dialog.scrollTop = Math.max(0, section.offsetTop - 18);
  showToast("已保存到本机旅行记录；原型不会公开发布");
}

elements.next.addEventListener("click", () => setStep(state.step + 1));
elements.prev.addEventListener("click", () => setStep(state.step - 1));
elements.stepTabs.forEach((tab) => tab.addEventListener("click", () => setStep(Number(tab.dataset.stepTarget))));

document.querySelector("#add-passport").addEventListener("click", () => addTag("passport"));
document.querySelector("#add-visa").addEventListener("click", () => addTag("visa"));
document.querySelector("#add-memory-place").addEventListener("click", addManualMemory);
document.querySelector("#memory-place-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addManualMemory();
  }
});

document.addEventListener("click", (event) => {
  const passportRemove = event.target.closest("[data-remove-passport]");
  const visaRemove = event.target.closest("[data-remove-visa]");
  if (passportRemove) removeTag("passport", passportRemove.dataset.removePassport);
  if (visaRemove) removeTag("visa", visaRemove.dataset.removeVisa);

  const toggleTile = event.target.closest(".interest-tile, .transport-tile");
  if (toggleTile) {
    const selected = toggleTile.getAttribute("aria-pressed") !== "true";
    toggleTile.setAttribute("aria-pressed", String(selected));
    toggleTile.classList.toggle("selected", selected);
    updateInterestCount();
    persistPreferences();
  }

  const choice = event.target.closest(".choice-chip");
  if (choice) {
    const row = choice.closest(".choice-row");
    if (!row.classList.contains("wrap")) {
      row.querySelectorAll(".choice-chip").forEach((button) => {
        button.classList.remove("selected");
        button.setAttribute("aria-pressed", "false");
      });
      choice.classList.add("selected");
      choice.setAttribute("aria-pressed", "true");
    } else {
      const selected = choice.getAttribute("aria-pressed") !== "true";
      choice.classList.toggle("selected", selected);
      choice.setAttribute("aria-pressed", String(selected));
    }
  }

  const detail = event.target.closest("[data-detail]");
  if (detail) openDestination(detail.dataset.detail);

  const save = event.target.closest("[data-save], [data-dialog-save]");
  if (save) {
    const id = save.dataset.save || save.dataset.dialogSave;
    if (state.saved.has(id)) state.saved.delete(id);
    else state.saved.add(id);
    renderDestinations();
    if (save.dataset.dialogSave) openDestination(id);
    showToast(state.saved.has(id) ? "已收藏到“本次旅行候选”" : "已取消收藏");
  }

  const visited = event.target.closest("[data-visited]");
  if (visited) openFeedback(visited.dataset.visited, "visited");

  const feedback = event.target.closest("[data-feedback]");
  if (feedback) openFeedback(feedback.dataset.feedback, "not_interested");

  const restore = event.target.closest("[data-restore-memory]");
  if (restore) removeMemory(restore.dataset.restoreMemory);

  const reviewFilter = event.target.closest("[data-review-filter]");
  if (reviewFilter) {
    const section = reviewFilter.closest(".review-section");
    const selected = reviewFilter.dataset.reviewFilter;
    section.querySelectorAll(".review-filter").forEach((button) => button.classList.toggle("active", button === reviewFilter));
    section.querySelectorAll(".review-card").forEach((card) => {
      card.hidden = selected !== "全部" && !card.dataset.reviewTags.split("|").includes(selected);
    });
  }

  const reviewStar = event.target.closest("[data-review-star]");
  if (reviewStar) {
    state.composeRating = Number(reviewStar.dataset.reviewStar);
    reviewStar.closest(".star-picker").querySelectorAll("button").forEach((button) => button.classList.toggle("active", Number(button.dataset.reviewStar) <= state.composeRating));
  }

  const reviewSubmit = event.target.closest("[data-submit-review]");
  if (reviewSubmit) submitLocalReview(reviewSubmit.dataset.submitReview);

  if (event.target.closest("[data-toast-action]") && showToast.action) {
    const action = showToast.action;
    showToast.action = null;
    elements.toast.classList.remove("show");
    action();
  }

  if (event.target.closest("#reset-results")) {
    state.exclusions = [];
    persistTravelMemory();
    updateMemoryUI();
    state.filter = "all";
    document.querySelectorAll(".filter-chip").forEach((button) => {
      const active = button.dataset.filter === "all";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderDestinations();
  }

  const filter = event.target.closest(".filter-chip");
  if (filter) {
    state.filter = filter.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((button) => {
      const active = button === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderDestinations();
  }

  const tip = event.target.closest("[data-tip]");
  if (tip) showToast(tip.dataset.tip);
});

document.querySelector("#budget-range").addEventListener("input", (event) => {
  document.querySelector("#budget-output").textContent = formatMoney(event.target.value);
  const value = Number(event.target.value);
  const hint = value < 10000 ? "精打细算" : value < 26000 ? "舒适探索" : value < 50000 ? "体验优先" : "高端定制";
  document.querySelector("#budget-hint span").textContent = `当前档位：${hint}`;
  updateRange(event.target);
  persistPreferences();
});

document.querySelectorAll(".spectrum-row .smart-range").forEach((range) => range.addEventListener("input", () => updateRange(range)));

document.querySelector("#manage-exclusions").addEventListener("click", () => {
  renderExclusionList();
  elements.exclusionDialog.showModal();
});
document.querySelector("#open-exclusions-from-form").addEventListener("click", () => {
  renderExclusionList();
  elements.exclusionDialog.showModal();
});
document.querySelector("#close-exclusions").addEventListener("click", () => elements.exclusionDialog.close());
document.querySelector("#done-exclusions").addEventListener("click", () => elements.exclusionDialog.close());
document.querySelector("#confirm-feedback").addEventListener("click", (event) => {
  event.preventDefault();
  commitFeedback();
});
document.querySelector("#clear-exclusions").addEventListener("click", () => {
  if (!state.exclusions.length) return;
  if (!window.confirm("清空全部去过与避雷记录？此操作只影响当前原型的本机数据。")) return;
  state.exclusions = [];
  persistTravelMemory();
  updateMemoryUI();
  renderDestinations();
  showToast("已清空全部记录");
});
document.querySelector("#hide-visited-switch").addEventListener("change", (event) => {
  state.hideVisited = event.target.checked;
  persistTravelMemory();
  renderDestinations();
});
document.querySelector("#downrank-similar-switch").addEventListener("change", (event) => {
  state.downrankSimilar = event.target.checked;
  persistTravelMemory();
  showToast(event.target.checked ? "相似目的地将降低权重（演示）" : "已关闭相似目的地降权");
});

document.querySelector("#sort-results").addEventListener("change", renderDestinations);

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  elements.analyze.disabled = true;
  elements.analyze.innerHTML = "正在比较 200+ 个目的地…";
  persistPreferences();
  setTimeout(() => {
    updateResultContext();
    renderDestinations();
    elements.analyze.disabled = false;
    elements.analyze.innerHTML = "重新生成 <span>✦</span>";
    document.querySelector("#results").scrollIntoView({ behavior: "smooth" });
    showToast("已完成硬条件筛选与多维匹配");
  }, 850);
});

document.querySelector("#edit-preferences").addEventListener("click", () => {
  setStep(1);
  document.querySelector("#planner").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelectorAll("[data-login]").forEach((button) => {
  button.addEventListener("click", () => showToast("原型演示：正式版将接入 Google、Apple、邮箱、微信与 Passkey"));
});

document.querySelector("#signal-method").addEventListener("click", () => elements.methodDialog.showModal());
document.querySelector(".modal-confirm").addEventListener("click", () => elements.methodDialog.close());
document.querySelector(".dialog-close").addEventListener("click", () => elements.dialog.close());

[elements.dialog, elements.methodDialog, elements.feedbackDialog, elements.exclusionDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
});

loadPreferences();
loadTravelMemory();
renderTags("passport");
renderTags("visa");
updateInterestCount();
updateMemoryUI();
updateAllRanges();
updateResultContext();
renderDestinations();
setStep(1);
