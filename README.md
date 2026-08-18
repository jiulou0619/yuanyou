# 远择 FARWISE｜交互原型（完成版）

这是一个面向全球旅行者与中国用户的“可解释旅行推荐”网页应用。本仓库是在原始原型基础上完成漏洞修复、UI 打磨与产品化收尾后的完成版。

## 如何打开

直接双击 `index.html`，或把整个文件夹放到任意静态网站托管服务中。不依赖构建工具、账号或后端。

## 已实现的交互

- 五步旅行偏好问卷：多护照/多签证、时间预算、兴趣、性格与交通。
- **整份问卷自动保存到本机**：证件、常住地、出发城市、日期、天数、同行方式、预算、住宿/节奏/弹性、兴趣、性格滑杆、避雷因素、交通方式与开关全部在刷新后恢复。
- 目的地排序与六类筛选；收藏列表同样跨刷新保留。
- 结果卡展示匹配原因、可能介意项、证件初筛、天气、人流、交通和总费用区间。
- 目的地详情弹窗：匹配拆解、证件说明、住宿、饮食、交通、安全、支付、核验项和 P50/P90 预算。
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
