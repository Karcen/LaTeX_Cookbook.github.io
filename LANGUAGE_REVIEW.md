# 中英文文案审查记录 / Bilingual prose review

审查日期：2026-10-09。

本轮使用 `/Users/karcenzheng/Downloads/humanizer` 中的全部技能：Humanizer 3.1.0、Humanizer-zh（2026-09-23）和 Anti-defensive writing。目录内共有四份 `SKILL.md`，其中 Anti-defensive writing 的两份文件内容相同，按同一套规则执行。

审读范围包括百科正文、词典说明、示例介绍、练习解析、课程、界面提示及项目文档。保留自然、准确的原句；对模板化介绍、重复提醒和预先辩解的句子，改为直接说明用途、机制、操作或适用条件。

| 数据内容 | 审读记录数 | 修改记录数 | 修改语言字段数 |
| --- | ---: | ---: | ---: |
| 模块说明 | 24 | 2 | 4 |
| 百科条目 | 157 | 126 | 429 |
| 词典说明 | 571 | 125 | 247 |
| 示例介绍 | 81 | 10 | 18 |
| 练习解析 | 90 | 34 | 80 |
| 课程说明 | 29 | 25 | 70 |
| 合计 | 952 | 322 | 848 |

同一段落的中文与英文字段分别统计。上表统计内容注册表中的修改，界面与文档的文字调整另行审读。

## 改写例子 / Examples

| 原文 | 改写后 |
| --- | --- |
| 缺少 Biber 或字体不会被自动解决。 | 运行前需准备相应的 Biber、字体等依赖。 |
| 示例使用 ctexbook 展示结构，并不保证满足任何院校的封面、边距或匿名评审要求。 | ctexbook 示例展示通用结构；封面、边距和匿名评审格式按院校要求设置。 |
| 不要把 wrapfigure 当大型科研图的默认容器；普通 figure 更稳定。 | 大型科研图通常使用更稳定的 figure。 |
| 本复现稿围绕“Missing $ inserted：数学模式不匹配”保留一个明确触发条件。 | 文件名 data_2026.csv 直接写在文本中，_ 被读作数学下标。 |
| it cannot repair a missing Biber executable or font | Install the required Biber, fonts, and other dependencies beforehand. |
| is an actual class distributed by the CTeX bundle | The CTeX bundle provides ctexbeamer for Chinese presentations. |

实验室提示集中说明 MathJax 的数学渲染、文档教学预览与 TeX 编译流程。宏包归属、引擎要求、版本条件、数学符号之间的区别和实际影响输出的限制，保留在相应条目中。

## 核对结果 / Verification

内容导出与上一版逐字段比较：标题、ID、数据结构、命令、数学表达式、全部示例源码、附属文件、选项、答案及来源链接完全一致。受保护字段的前后 SHA-256 均为：

```text
647d77d66df9c63d6d3cde8c7b62c894fed9b1910c9b4c36603b1008742ed5a4
```

252 份示例源文件、PDF 和预览图片与上一版压缩包逐文件相同。本轮沿用这些源码对应的编译记录。正文中新增的 `95%`、`.8\linewidth` 已对照中文说明和修复示例核实。

所有项目 JavaScript 通过语法检查，内容校验为零错误、零警告。浏览器回归覆盖 12 个页面、双语切换、搜索、收藏、编辑、九种题型和移动端布局：工作目录与独立解压目录均通过 47 / 47 项检查，未记录运行错误或失败请求。详细记录见 `tests/language-review-results.json`、`tests/content-results.json` 和浏览器验证文件。

## 后续写作 / Maintenance

新增或修改文案时，先写清楚读者要做的操作及其结果，再补充影响该操作的条件。把重复出现的通用说明放在统一入口；具体错误说明直接指出触发它的语法或依赖。保留原有事实、确定程度、条件和真正有用的概念对比。中英文各自使用自然句式，核对技术含义一致后，再检查源码与答案是否保持原样。
