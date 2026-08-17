# UI 控件设计参考

本轮控件重设计调研了以下 GitHub 开源项目。当前原型没有复制或打包这些项目的源码，而是重新实现了相同类别的通用交互模式，因此仍然保持零依赖、双击即可运行。

| 项目 | 许可证 | 本原型采用的设计思路 |
|---|---|---|
| [Basecoat](https://github.com/hunvreus/basecoat) | MIT | 原生 HTML/CSS 的低噪声表单、统一边框与焦点环 |
| [Web Awesome](https://github.com/shoelace-style/webawesome) | MIT | Slider 的语义标签、Switch 状态和分段按钮结构 |
| [Radix Primitives](https://github.com/radix-ui/primitives) | MIT | 可访问状态、键盘焦点、Select/Toggle Group 的交互原则 |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | MIT | 克制的中性色、状态层次、卡片和弹窗布局 |
| [Choices.js](https://github.com/Choices-js/Choices) | MIT | 多选搜索、可删除标签；适合正式版护照/签证/地点选择 |
| [noUiSlider](https://github.com/leongersen/noUiSlider) | MIT | 双端范围、触摸与键盘支持；适合正式版预算上下限 |

本轮实际落地：

- 日期灵活度改成分段选择器，当前状态有勾选与浮层反馈。
- 所有原生 Select 统一自定义箭头、分隔线、Hover 和 Focus 状态。
- 预算 Slider 增加已选轨道、强对比手柄、档位说明与三段刻度。
- 性格 Slider 改为卡片式控件，实时显示“偏向安静 / 较为平衡”等语义结果。
- 兴趣、交通和避开条件增加独立选择指示器。
- 二元设置改为整行可点击的 Switch。
- 所有交互保留原生语义、键盘操作与 `focus-visible`。

正式产品如果需要可搜索的多护照/多签证选择，建议直接使用 Choices.js；预算需要上下限时建议使用 noUiSlider。引入依赖时应把对应 MIT 许可证保留在发布包中。
