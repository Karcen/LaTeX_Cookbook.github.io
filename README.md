# LaTeX Atelier

一个不用注册、可以本地打开的 LaTeX 学习网站。中文和 English 可随时切换。所有课程、练习、样式和渲染脚本都在压缩包里。

## 打开网站

解压后，双击 **`index.html`**。导航栏可进入四个功能页：

| 文件 | 页面 | 可以做什么 |
| --- | --- | --- |
| `index.html` | 首页 / Home | 浏览六个学习单元、查看学习进度 |
| `courses.html` | 学习路径 / Lessons | 十二节课程、示例代码、完成标记 |
| `playground.html` | 实验室 / Playground | 实时排版公式、简化文档预览、示例模板、导出 `.tex` |
| `practice.html` | 闯关练习 / Practice | 十二道选择题、即时反馈、本机最高成绩 |
| `reference.html` | 命令速查 / Reference | 搜索 33 条命令、预览公式、复制、收藏 |

如果浏览器对本地文件施加额外限制，可以在解压目录运行：

```bash
python3 -m http.server 8000
```

再打开 `http://localhost:8000`。这只是本机静态文件服务，不需要后台、数据库或联网。

## 常用操作

- **中 / EN**：切换中英文界面与课程说明。
- **月亮 / 太阳**：默认浅色；点击切换深色、浅色主题。选择会保存在浏览器中。
- **/** 或 **Cmd/Ctrl + K**：打开快速跳转，搜索课程和页面。
- **实验室**：左侧修改源码、右侧查看渲染；**Tab** 缩进，**Cmd/Ctrl + Enter** 立即刷新，**Cmd/Ctrl + S** 导出源码。
- **课程进度**：在课程页点击“标记已学完”。完成情况、主题、语言、草稿、收藏和最佳分数保存在当前浏览器的 `localStorage` 中。换设备或清理站点数据后不会自动同步。

## 预览范围

**数学模式**使用本地打包的 MathJax SVG 输出。适合练习分式、积分、上下标、矩阵、对齐公式和分段函数。

**文档模式**是教学用的结构预览器，可以显示常见标题、段落、文字强调、列表、部分数学环境，并为图表提供简化表示。它不是完整的 LaTeX 编译器，不会实际排版浮动体、生成目录或处理参考文献。

导出的 `.tex` 是标准文本源码。需要输出正式 PDF 时，用 TeX Live、MiKTeX 或 Overleaf 编译。涉及中文的文档可用 `ctex` 与 XeLaTeX；带图像和 `.bib` 的示例还需要相应资源文件。

## 修改课程

所有内容都在 `assets/js/data.js` 里：

- `modules`：六个模块及其章节对应关系。
- `lessons`：十二节中英双语课程。
- `quizzes`：十二道练习题及答案说明。
- `reference`：命令速查数据库。
- `snippets`：实验室快捷模板。

全站 footer 显示“由 [Jiacheng Zheng](https://karcen.github.io/) 使用 ChatGPT 辅助开发”（英文界面提供英文表述）。

样式在 `assets/css/style.css`，公共交互在 `assets/js/app.js`，各页面对应同名脚本。没有构建步骤，也没有 Node.js、React 或服务器端代码依赖。

## Libraries & design research

先筛过 GitHub 上的动效、设计与渲染项目，再按“直接打开、读起来舒服、维护成本低”的条件做取舍。

| 项目 | GitHub | 最终取舍 |
| --- | --- | --- |
| Anime.js | https://github.com/juliangarnier/anime | 研究了动效 API。本项目改用原生 CSS transitions / IntersectionObserver，减少离线依赖。 |
| Animate.css | https://github.com/animate-css/animate.css | 参考现成动效思路；未打包其样式。 |
| Open Props | https://github.com/argyleink/open-props | 参考设计 token 思路；颜色、间距和组件样式均为本项目自定义。 |
| Pico CSS | https://github.com/picocss/pico | 考察了语义化 CSS；为保留编辑器与课程布局的视觉一致性，没有直接引入。 |
| Lucide | https://github.com/lucide-icons/lucide | 图标视觉参考，页面采用精简、内联 SVG 图标。 |
| MathJax | https://github.com/mathjax/MathJax | **实际使用**。本地打包 `tex-svg-full.js`，SVG 渲染无需下载网页字体。 |
| Prism | https://github.com/PrismJS/prism | **实际使用**。本地打包源码示例的语法高亮。 |
| Humanizer / 中文 Humanizer | https://github.com/blader/humanizer · https://github.com/jiji262/humanizer-chinese | 用于审阅课程文案：删掉空洞的“重要性”结论、机械排比、讲义腔过渡和无意义的免责声明。保留操作建议与必要的功能边界。 |

MathJax 和 Prism 的原始许可证见 `assets/licenses/`。页面内容与定制样式可以按需要编辑。

---

# English quick start

Unzip the archive and open **`index.html`** in a modern browser. The site has 12 lessons, a live equation playground, a simplified document preview, 12 practice questions, and a searchable 33-command reference. Switch to **EN** in the header to read the English edition.

Everything runs in your browser. MathJax and Prism are included locally. Your lesson progress, favorites, editor drafts, theme, and quiz best score are saved on this device, with no account or synchronization.

The equation playground renders mathematical notation as SVG. Document mode is a teaching preview, not a full TeX compiler. Export `.tex`, then compile with a proper TeX engine when you need a production PDF.


The design starts in light mode and retains the chosen theme between visits. The bilingual footer credits [Jiacheng Zheng](https://karcen.github.io/) for development with assistance from ChatGPT.
