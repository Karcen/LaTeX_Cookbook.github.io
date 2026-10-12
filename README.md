# latex.cookbook

中英文交互式 LaTeX 百科全书。网站、知识数据、数学渲染库和语法高亮库均为静态本地文件，阅读和练习不需要账号、网络或开发服务器。

首页顶部的“让 LaTeX 再次伟大”标语使用标准 LaTeX 标志排版。人像指向左侧放大的 LaTeX 标志，乳胶白宫与竞选风海报作为后方错位的 3D 图层，点击海报可查看原图。鼠标移动时产生轻微视差；触屏和减少动态效果模式使用静态展示。图片随网站保存在 `assets/images/` 中，离线可用。

## 怎么开始学

第一次使用时，打开学习路径里的“你的第一份 LaTeX 文档”。先运行原示例，再一次只改一处：标题、段落或公式。每课都有三步操作、一个动手任务和可展开的参考答案；做完后对照 PDF 或预览检查结果。

遇到具体问题，可以直接查百科。77 篇常用条目提供分步操作和自检题，说明代码的插入位置、依赖和预期输出。练习库现有 114 道题，选择题解释各选项，代码题说明接受的写法。示例库有 86 份完整源码与实际编译的 PDF，新增渐进数学、参数宏、表格、交叉引用和 Beamer 示例。

数学模式可以在实验室直接试；完整文档导出后按指定引擎编译。参考文献或图片示例还需要附属文件，先从完整示例下载并放在同一目录，再运行编译链。

## 使用

解压 `deliverables/LaTeX-Cookbook.zip`，打开目录中的 **`index.html`**。也可以直接打开本仓库的 `index.html`。网站由普通 HTML/CSS/JavaScript 文件组成，可直接打开。

| 入口 | 用途 |
| --- | --- |
| `encyclopedia.html` | 分主题百科、分级目录、页内目录、依赖、源码、相关条目与官方资料 |
| `courses.html` | 四条学习路径：入门、中级、进阶与学术写作 |
| `reference.html` | 中英文命令、环境、宏包与使用场景检索 |
| `symbols.html` | 数学符号的 SVG 渲染、源码、依赖、复制与编辑 |
| `packages.html` | 宏包与相关专题入口 |
| `classes.html` | 可搜索的文档类比较表 |
| `examples.html` | 完整源码、附属文件、本地编译状态、PDF 与第一页预览 |
| `templates.html` | 文章、中文文档、报告、演示和专业模板 |
| `troubleshooting.html` | 编译错误、Warning 与排版诊断的排查入口 |
| `playground.html` | 公式实时渲染、结构教学预览、编辑与导出、特殊字符实验 |
| `practice.html` | 九种题型、逐题解析、主题过滤与本地答题记录 |

在导航栏切换 **中 / EN** 和浅色 / 深色主题。按 **/** 或 **Cmd/Ctrl + K** 搜索全部百科、词典和示例。收藏、学习进度、主题、语言、答题结果和实验室草稿保存在当前浏览器。跨设备使用时，各浏览器分别保存记录。浏览器隐私设置或 `file://` 存储策略可能限制持久保存，此时仍可阅读内容并使用当前会话中的交互。

实验室支持行号、语法高亮、括号自动闭合和配对提示。**Tab** 插入缩进，**Cmd/Ctrl + Enter** 刷新，**Cmd/Ctrl + S** 导出 `.tex`。完整示例需要的 `.bib`、`.sty`、`.cls` 或子文件可在示例库分别下载；压缩包的 `examples/` 中已按目录配齐。

## 渲染与编译

公式模式使用本地 MathJax 渲染受支持的数学表达式。文档模式提供标题、段落、列表、公式和表格的教学预览。生成 PDF 时，导出源码并使用 TeX 引擎编译；TikZ、浮动位置、引用后端、目录和字体配置都由 TeX 环境处理。

示例库中的 PDF 和 PNG 是构建阶段使用本机 TeX Live 实际编译生成的静态文件。`assets/js/compilation.js` 记录每份示例的实际编译状态。修改源码后，重新编译以更新 PDF。

例如：

```bash
cd examples/example-id
latexmk -pdf main.tex       # pdfLaTeX
latexmk -xelatex main.tex   # XeLaTeX
latexmk -lualatex main.tex  # LuaLaTeX
```

按示例指定的引擎执行一条命令即可。`latexmk` 会协调需要的引用后端；索引、术语表或外部高亮工具的特殊要求写在对应专题和示例说明中。

## 内容与维护

`CONTENT_INDEX.md` 列出实际模块、条目、例子与练习统计。`QA_REPORT.md` 记录验证范围、结果和限制。`TECHNICAL_NOTES.md` 说明架构与数据格式。`LANGUAGE_REVIEW.md` 记录中英文文案的审读范围、改写例子和核对结果。

内容位于 `assets/js/content-*.js`，界面逻辑独立于内容数据。脚本按 HTML 中的固定顺序加载，在 `window.ATELIER` 注册数据，不使用 `fetch` 或 ES 模块，因此可以在 `file://` 下运行。新增内容后执行：

```bash
node tests/validate-content.cjs
python3 scripts/compile-examples.py
python3 scripts/build-docs.py
python3 scripts/package-release.py
```

需要更新页面公共脚本列表时运行 `python3 scripts/build-page-shells.py`。运行浏览器回归测试时，在开发环境中安装 Playwright：

```bash
node tests/browser-smoke.cjs
node tests/teaching-smoke.cjs
```

静态托管时上传发布目录的全部文件即可，支持 GitHub Pages 和普通静态服务器。需要本机 HTTP 模式时可运行 `python3 -m http.server 8000`，再打开 `http://localhost:8000`。服务器只提供静态文件。

由 [Jiacheng Zheng](https://karcen.github.io/) 使用 ChatGPT 辅助开发。

## English guide

latex.cookbook is a bilingual interactive reference for LaTeX. Unzip the release and open **`index.html`**. All runtime scripts, styles, MathJax, and Prism are included locally. Articles and exercises run offline in the browser, without an account or a server.

The encyclopedia explains syntax, package dependencies, engines, failure modes, and practical workflows. Courses provide four learning paths. The command and symbol dictionaries support Chinese and English keywords. The example library includes complete source files, companion files, compilation status, and locally generated PDF previews. Exercises cover nine formats and explain the answers.

Use **EN** for the full English edition. The theme button selects light or dark mode. Press **/** or **Cmd/Ctrl + K** for global search. Favorites, lesson completion, exercise results, preferences, and drafts are stored in this browser. Each browser keeps its own records. Privacy policies can limit persistent storage for local files.

The playground renders supported mathematics with MathJax. Document mode provides a teaching preview of selected syntax. Export the source and run the specified TeX engine to produce the full PDF. Library PDFs were compiled during release preparation. Recompile edited source to update them. Bibliography, package, class, and chapter files are supplied in each example directory.

Content is maintained in `assets/js/content-*.js`, separate from the interface. `CONTENT_INDEX.md` records the delivered scope, `TECHNICAL_NOTES.md` describes the architecture, and `QA_REPORT.md` records the checks and limitations. `LANGUAGE_REVIEW.md` documents the bilingual prose review with examples and verification results. The validation, compilation, and packaging scripts are optional maintenance tools. Deploy the release directory to any static host, including GitHub Pages.

Developed by [Jiacheng Zheng](https://karcen.github.io/) with assistance from ChatGPT.
