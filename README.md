# 远择 FARWISE｜交互原型

这是一个面向全球旅行者与中国用户的“可解释旅行推荐”网页原型。

## 如何打开

直接双击 `index.html`，或把整个文件夹放到任意静态网站托管服务中。原型不依赖构建工具、账号或后端。

## 已实现的交互

- 五步旅行偏好问卷：多护照/多签证、时间预算、兴趣、性格与交通。
- 本地自动保存基础偏好，不上传证件或账号数据。
- 目的地排序与六类筛选。
- 结果卡展示匹配原因、可能介意项、证件初筛、天气、人流、交通和总费用区间。
- 目的地详情弹窗：匹配拆解、证件说明、住宿、饮食、交通、安全、支付、核验项和 P50/P90 预算。
- 收藏、不适合反馈、结果恢复、数据局限说明。
- 去过、不感兴趣、永久避雷、临时原因、相似目的地降权和可恢复排除清单。
- 评论摘要、评论筛选、站内本地评论记录与第三方来源隔离示意。
- 重新设计的 Slider、Switch、分段选择器、Select 和多选状态。
- 桌面与手机响应式布局、键盘焦点和减少动态效果支持。

## 重要说明

页面中的目的地、天气、价格、证件状态和新闻信号全部是用于展示交互的示例数据，不构成签证、法律、医疗或安全建议。正式产品必须接入带来源、有效时间、地理范围和置信度的数据，并在预订前及出发前引导用户复核官方信息。

完整产品方案、数据模型、推荐算法、API 候选和开发路线见同目录的 `product-blueprint.md`。

本轮 UI 的 GitHub 开源参考见 `design-references.md`；Google Places 等评论接入要求见 `reviews-integration.md`。

主视觉由 OpenAI 内置图像生成工具为本原型生成，最终提示词为：

> Premium photorealistic editorial travel panorama for a global recommendation website, combining a quiet Mediterranean coastal town, misty East Asian mountains, a modern city skyline, a scenic alpine train and a winding coastal road; warm morning light, deep teal and warm coral palette, visual interest on the right, calm negative space for interface copy, no text, logos, flags, watermarks or identifiable people.
