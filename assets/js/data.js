/* LaTeX Atelier — original bilingual learning content. */
window.LATEX_DATA = (() => {
  const modules = [
    { id:'foundation', number:'01', color:'lime', icon:'layers', zh:'从零起步', en:'Foundations', descZh:'先写出第一份能编译的文档。', descEn:'Build a small document that actually compiles.', lessons:['start','structure'] },
    { id:'math', number:'02', color:'lilac', icon:'sigma', zh:'数学排版', en:'Math typesetting', descZh:'分式、公式组、矩阵，写得准确又整齐。', descEn:'Fractions, aligned equations, and matrices.', lessons:['math-inline','math-align'] },
    { id:'layout', number:'03', color:'peach', icon:'layout', zh:'图表与版面', en:'Figures & tables', descZh:'让图片、表格和正文各就各位。', descEn:'Give figures, tables, and text room to breathe.', lessons:['figures','tables'] },
    { id:'references', number:'04', color:'blue', icon:'link', zh:'引用与文献', en:'References', descZh:'编号、交叉引用、参考文献不再手改。', descEn:'Stop maintaining numbers and citations by hand.', lessons:['crossref','citation'] },
    { id:'workflow', number:'05', color:'yellow', icon:'settings', zh:'高效写作', en:'Workflow', descZh:'用宏、模板和中文支持节省重复劳动。', descEn:'Reusable commands, templates, and Chinese typesetting.', lessons:['macros','chinese'] },
    { id:'shipping', number:'06', color:'mint', icon:'check-circle', zh:'排错与交付', en:'Finish & export', descZh:'定位报错，整理文件，顺利交付。', descEn:'Debug common errors and package a clean project.', lessons:['debug','project'] }
  ];
  const lessons = [
    { id:'start', module:'foundation', minutes:6, kind:'document', title:{zh:'你的第一份 LaTeX 文档',en:'Your first LaTeX document'},
      lead:{zh:'先别背命令。打开一个最小例子，认清导言区、正文和编译器就够了。',en:'Skip memorizing commands for now. Start with a tiny file and learn where the preamble, content, and compiler fit.'},
      concept:{zh:'LaTeX 是一套排版系统：你写内容和结构，编译器负责排版。英文文档可从 article 开始；有中文时，推荐 XeLaTeX 搭配 ctex。',en:'LaTeX is a typesetting system. You describe content and structure; the compiler handles the page. Start with article for English, or ctex with XeLaTeX for Chinese.'},
      bullets:{zh:['\\documentclass 选择文档类型。','\\begin{document} 与 \\end{document} 圈定正文。','文档预览只是学习辅助；真正的 PDF 需要完整的 TeX 引擎编译。'],en:['\\documentclass selects the document type.','\\begin{document} and \\end{document} mark the document body.','The browser preview is for practice; producing a real PDF requires a TeX engine.']},
      code:String.raw`\documentclass{article}
\title{My first note}
\author{A. Student}
\begin{document}
\maketitle
Hello, LaTeX!
\end{document}`,
      tip:{zh:'动手改一下标题，再去“实验室”查看简化文档预览。',en:'Change the title, then open the simplified document preview in the lab.'},
      task:{zh:'把标题改成 “A Note on Probability”，保留文档结构。',en:'Change the title to “A Note on Probability” while keeping the document structure.'}},
    { id:'structure', module:'foundation', minutes:7, kind:'document', title:{zh:'标题、段落与文本样式',en:'Sections, paragraphs & emphasis'},
      lead:{zh:'写作时先组织层级，再处理字体。这样后面改版式才不会牵一发动全身。',en:'Organize the document first; tweak typography later. That keeps formatting changes manageable.'},
      concept:{zh:'\\section、\\subsection 形成标题层级。用空行分段；粗体和斜体分别交给 \\textbf、\\emph。',en:'\\section and \\subsection create hierarchy. A blank line starts a paragraph; \\textbf and \\emph add emphasis.'},
      bullets:{zh:['不要用空格或连续回车模拟排版。','用语义命令标识标题，目录才能自动生成。','\\tableofcontents 会生成目录（通常需要重复编译）。'],en:['Do not arrange a page with spaces or repeated Enter presses.','Use section commands so the table of contents can be generated.','\\tableofcontents creates a contents page (usually after another compile).']},
      code:String.raw`\section{Background}
This is the first paragraph.

This is a second paragraph with \textbf{a bold phrase}.
\subsection{A closer look}
Use \emph{emphasis} sparingly.`,
      tip:{zh:'文档预览支持 section、subsection、textbf、emph 等常见写法。',en:'The document preview recognizes section, subsection, textbf, and emph.'},
      task:{zh:'加一个 “Methods” 小节，再写两段短文。',en:'Add a “Methods” subsection and write two short paragraphs.'}},
    { id:'math-inline', module:'math', minutes:9, kind:'math', title:{zh:'写好第一个数学公式',en:'Write your first equation'},
      lead:{zh:'数学模式是 LaTeX 的另一套语法。分式、根号、上下标都在这里出现。',en:'Math mode has its own syntax. This is where fractions, radicals, subscripts, and superscripts live.'},
      concept:{zh:'行内公式用 $...$，独立公式通常用 \\[...\\]。\\frac{a}{b} 写分式，^ 和 _ 处理上下标。',en:'Use $...$ for inline math and \\[...\\] for display math. Fractions use \\frac{a}{b}; ^ and _ set superscripts and subscripts.'},
      bullets:{zh:['数学变量默认斜体；sin、log 等函数应写作 \\sin、\\log。','多字符的上标或下标要加花括号：x^{n+1}。','行内公式不要为了“显眼”全部写成独立公式。'],en:['Variables are italic by default; functions should use \\sin and \\log.','Wrap multi-character scripts in braces: x^{n+1}.','Keep short expressions inline when they belong in a sentence.']},
      code:String.raw`\frac{a+b}{2}=\sqrt{x^2+y^2}`, 
      tip:{zh:'点击示例公式，然后改动分子、分母，观察预览如何变化。',en:'Edit the numerator and denominator and watch the preview update.'},
      task:{zh:'写出二次方程求根公式：x = (-b ± √(b² − 4ac))/(2a)。',en:'Typeset the quadratic formula, including the plus/minus symbol.'}},
    { id:'math-align', module:'math', minutes:10, kind:'math', title:{zh:'对齐公式、矩阵和分段函数',en:'Aligned equations, matrices & cases'},
      lead:{zh:'公式一多，读者最需要的是清楚的对齐关系，而不是更大的字号。',en:'When equations get longer, alignment matters more than font size.'},
      concept:{zh:'在 aligned 环境中，用 & 标记对齐位置，\\\\ 换行。matrix、pmatrix 和 cases 负责常见的数学结构。',en:'In aligned, & marks an alignment point and \\\\ starts a new line. Matrix environments and cases handle structured expressions.'},
      bullets:{zh:['等号通常是公式组的对齐位置。','pmatrix 自动加圆括号，bmatrix 加方括号。','cases 中第一列是表达式，第二列常写条件。'],en:['Align at equals signs for multi-line derivations.','pmatrix adds parentheses; bmatrix adds brackets.','In cases, the second column usually holds a condition.']},
      code:String.raw`\begin{aligned}
f(x)&=x^2+2x+1\\
&=(x+1)^2
\end{aligned}`,
      tip:{zh:'MathJax 可以渲染这些数学环境，但它不是完整的 TeX 编译器。',en:'MathJax renders these math environments, though it does not compile full TeX documents.'},
      task:{zh:'把上面的等式改成三行推导，仍然沿等号对齐。',en:'Extend the derivation to three lines while keeping the equals signs aligned.'}},
    { id:'figures', module:'layout', minutes:8, kind:'document', title:{zh:'插图与浮动体',en:'Figures & floats'},
      lead:{zh:'LaTeX 会尽量为图片找合适的位置。浮动体就是这个机制的一部分。',en:'LaTeX finds suitable places for figures. Floats are part of that layout system.'},
      concept:{zh:'加载 graphicx 后，用 \\includegraphics 插图；\\caption 添加题注。htbp 是位置偏好，不是强制坐标。',en:'Load graphicx to insert images and add captions with \\caption. Placement options such as htbp are preferences, not exact coordinates.'},
      bullets:{zh:['图片应放在项目目录中，文件名尽量简单。','图题、标签一般放在 figure 环境里。','本网站不会加载你的真实图片；请用本地 TeX 项目编译检查。'],en:['Keep image files in your project and use simple filenames.','Place captions and labels inside the figure environment.','Use a local TeX compiler to verify real image placement.']},
      code:String.raw`\usepackage{graphicx} % in the preamble

\begin{figure}[htbp]
  \centering
  \includegraphics[width=.7\textwidth]{chart.pdf}
  \caption{Main result}
  \label{fig:main}
\end{figure}`,
      tip:{zh:'“htbp” 分别指 here、top、bottom、page。它们给编译器选择，而不是下死命令。',en:'h, t, b, and p mean here, top, bottom, and float page. They guide the compiler rather than lock a position.'},
      task:{zh:'把图片宽度从 .7\\textwidth 改成 .85\\textwidth。',en:'Change the image width from .7\\textwidth to .85\\textwidth.'}},
    { id:'tables', module:'layout', minutes:10, kind:'document', title:{zh:'做一张干净的表格',en:'Build a clean table'},
      lead:{zh:'好的表格先有清楚的列，再考虑横线。学术写作里，少量规则线往往更好读。',en:'Start by making the columns clear. In academic tables, a few horizontal rules are often enough.'},
      concept:{zh:'tabular 指定列格式，& 分列，\\\\ 换行。booktabs 提供更克制的三线表命令。',en:'tabular defines column alignment; & separates cells and \\\\ ends a row. booktabs provides cleaner horizontal rules.'},
      bullets:{zh:['列格式 l、c、r 对应左、中、右对齐。','使用 booktabs 之前要在导言区加载宏包。','较宽的表可考虑 tabularx，避免用空格硬撑。'],en:['Column specs l, c, and r mean left, center, and right.','Load booktabs in the preamble before using its rules.','For wider tables, consider tabularx instead of padding with spaces.']},
      code:String.raw`\usepackage{booktabs} % preamble

\begin{tabular}{lrr}
\toprule
Model & Estimate & SE \\
\midrule
A & 0.42 & 0.08 \\
B & 0.31 & 0.07 \\
\bottomrule
\end{tabular}`,
      tip:{zh:'不要把每个单元格都画上边框。先让列对齐，表格自然就整齐了。',en:'Avoid putting a box around every cell. Clear alignment does most of the work.'},
      task:{zh:'添加第三行模型 C，并为它填写估计值和标准误。',en:'Add a third row for model C with an estimate and a standard error.'}},
    { id:'crossref', module:'references', minutes:7, kind:'document', title:{zh:'编号与交叉引用',en:'Labels & cross-references'},
      lead:{zh:'章节顺序会改，图表编号也会变。让 LaTeX 处理这些编号，自己只写标签。',en:'Sections move and figure numbers change. Let LaTeX maintain the numbers and refer to stable labels.'},
      concept:{zh:'\\label 给对象命名，\\ref 调用编号，\\eqref 专门处理公式编号（需 amsmath）。',en:'\\label names an element, \\ref retrieves its number, and \\eqref formats equation references (requires amsmath).'},
      bullets:{zh:['标签通常采用 sec:、fig:、tab:、eq: 等前缀。','题注之后放 label 更稳妥。','交叉引用第一次可能显示 ??，多编译一次通常即可。'],en:['Use prefixes such as sec:, fig:, tab:, and eq:.','For figures and tables, place labels after captions.','References may show ?? until LaTeX has compiled again.']},
      code:String.raw`\section{Results}\label{sec:results}
As shown in Section~\ref{sec:results},
the estimate is positive.

\begin{equation}\label{eq:model}
y_i = \alpha + \beta x_i + \varepsilon_i
\end{equation}
See Equation~\eqref{eq:model}.`,
      tip:{zh:'波浪号 ~ 是不可断行空格，常放在 “Figure~\\ref{...}” 之间。',en:'The tilde ~ is a nonbreaking space, useful in “Figure~\\ref{...}”.'},
      task:{zh:'给一个表格创建 tab:summary 标签，并在正文引用它。',en:'Create a tab:summary label for a table and refer to it in a sentence.'}},
    { id:'citation', module:'references', minutes:10, kind:'document', title:{zh:'用 BibLaTeX 管理文献',en:'Manage citations with BibLaTeX'},
      lead:{zh:'把文献信息与正文分开，后面换引用格式会容易得多。',en:'Keep bibliography data separate from your prose. Changing citation styles then becomes much easier.'},
      concept:{zh:'biblatex 从 .bib 文件读取文献条目；\\addbibresource 指定文件，\\cite 引用键，\\printbibliography 输出文献表。',en:'biblatex reads entries from a .bib file. Use \\addbibresource to link it, \\cite for keys, and \\printbibliography for the list.'},
      bullets:{zh:['本节示例使用 biblatex + biber 工作流。','citation key 应稳定、易识别。','常见编译顺序：LaTeX → Biber → LaTeX → LaTeX。'],en:['This example uses the biblatex + biber workflow.','Choose stable, memorable citation keys.','A typical sequence is LaTeX → Biber → LaTeX → LaTeX.']},
      code:String.raw`% In the preamble:
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{references.bib}

% In the document:
A classic result \parencite{knuth1984}.
\printbibliography

% In references.bib:
@book{knuth1984,
  author={Donald E. Knuth},
  title={The TeXbook},
  year={1984},
  publisher={Addison-Wesley}
}`,
      tip:{zh:'如果学校模板已经规定 BibTeX 或 natbib，请按模板配置，不要混用两套引用命令。',en:'If your institution uses BibTeX or natbib, follow its template rather than mixing citation systems.'},
      task:{zh:'把引用键 knuth1984 改成 texbook1984，并同步修改 .bib 条目。',en:'Rename the citation key to texbook1984 in both the command and the .bib entry.'}},
    { id:'macros', module:'workflow', minutes:8, kind:'document', title:{zh:'自定义命令，少写重复代码',en:'Write less with custom commands'},
      lead:{zh:'一篇文档里会反复出现同样的记号。给它一个名字，修改就只需改一处。',en:'If a symbol appears dozens of times, name it once. A later change then takes one edit.'},
      concept:{zh:'\\newcommand{\\E}{\\mathbb{E}} 可以定义期望算子。带参数的宏用 [1]、#1 接收内容。',en:'\\newcommand{\\E}{\\mathbb{E}} defines an expectation symbol. Use [1] and #1 for one-argument macros.'},
      bullets:{zh:['命令名不要和已有命令冲突。','把常用宏放在导言区或单独的 macros.tex。','宏用于表达重复语义，不必为每个字母造命令。'],en:['Avoid redefining existing commands accidentally.','Keep shared macros in the preamble or a macros.tex file.','Create macros for repeated meaning, not every single letter.']},
      code:String.raw`\usepackage{amsfonts}
\newcommand{\E}{\mathbb{E}}
\newcommand{\vect}[1]{\boldsymbol{#1}}

% Later, in math mode:
\E[X] = 0,\qquad \vect{\beta}^\top x`,
      tip:{zh:'宏命令需先定义后使用；你的浏览器数学预览也支持常见的 \\newcommand。',en:'Define a macro before using it. The math preview also understands common \\newcommand definitions.'},
      task:{zh:'定义一个 \\Var 命令来表示方差。',en:'Define a \\Var macro for the variance operator.'}},
    { id:'chinese', module:'workflow', minutes:9, kind:'document', title:{zh:'中英文混排与 XeLaTeX',en:'Chinese text with XeLaTeX'},
      lead:{zh:'写中文论文时，字体和引擎的选择要先定下来。不要等正文完成后再返工。',en:'For Chinese documents, settle on the engine and font setup early rather than retrofitting them at the end.'},
      concept:{zh:'ctexart 提供中文文章的开箱即用配置；XeLaTeX 通常是中英混排的稳妥选择。',en:'ctexart provides a practical starting point for Chinese articles, and XeLaTeX handles multilingual text well.'},
      bullets:{zh:['保存 UTF-8 编码的 .tex 文件。','指定 XeLaTeX 编译器，不要误选 pdfLaTeX。','字体依赖操作系统和模板，本教程不预设某个具体字体。'],en:['Save the .tex file in UTF-8.','Select the XeLaTeX engine rather than pdfLaTeX.','Font availability depends on the machine and template.']},
      code:String.raw`\documentclass[UTF8,12pt]{ctexart}
\usepackage{amsmath}
\title{一份简短的研究笔记}
\begin{document}
\maketitle
中文正文与 English terms 可以一起排版。
\[
  \mathbb{E}[X] = \sum_i p_i x_i
\]
\end{document}`,
      tip:{zh:'本地完整编译推荐 TeX Live + XeLaTeX；浏览器预览只模拟部分文本结构。',en:'For full compilation, use TeX Live with XeLaTeX. The browser only previews selected document features.'},
      task:{zh:'修改标题，并添加一个带有英文术语的中文段落。',en:'Change the title and add a Chinese paragraph containing an English term.'}},
    { id:'debug', module:'shipping', minutes:10, kind:'document', title:{zh:'读懂常见报错',en:'Read common error messages'},
      lead:{zh:'报错往往发生在某个符号附近，但真正原因可能在前几行。按顺序查，效率会高很多。',en:'The error may point to one line while its cause sits a few lines earlier. Check systematically.'},
      concept:{zh:'优先查花括号是否配对、环境是否结束、命令是否拼对、宏包是否加载。',en:'Check matching braces, environments, command spelling, and required packages first.'},
      bullets:{zh:['Missing $ inserted：数学符号可能跑出了数学模式。','Undefined control sequence：命令拼错，或缺宏包。','Environment ... undefined：环境没有定义，检查所需宏包。'],en:['Missing $ inserted: math notation may be outside math mode.','Undefined control sequence: a typo or missing package is likely.','Environment ... undefined: check whether its defining package is loaded.']},
      code:String.raw`% Common mistake:
The value is x_1.

% Fixed:
The value is $x_1$.

% Another mistake:
\frac{a}{b

% Fixed:
\frac{a}{b}`,
      tip:{zh:'先找到日志里第一条实质性错误，再看附近代码。后面的报错可能只是连锁反应。',en:'Read the first meaningful error in the log. Later errors may simply cascade from it.'},
      task:{zh:'找出上面两处错误，并说出为什么会触发它们。',en:'Identify the two mistakes above and explain what triggers each one.'}},
    { id:'project', module:'shipping', minutes:7, kind:'document', title:{zh:'从练习到正式项目',en:'Turn practice into a project'},
      lead:{zh:'准备交付前，整理目录、移除废弃文件，再在干净环境里编译一次。',en:'Before sharing, clean the folder and compile once from a fresh environment.'},
      concept:{zh:'主文件、图片、参考文献与自定义宏各放在清晰的位置；提交的文件应足以让别人复现 PDF。',en:'Keep the main file, figures, bibliography, and macros organized. Someone else should be able to reproduce the PDF.'},
      bullets:{zh:['保持主文件名清晰，例如 main.tex。','用相对路径引用图片和子文件。','检查 .bib、图片、字体和宏包依赖是否齐全。'],en:['Use a clear main filename such as main.tex.','Use relative paths for figures and included files.','Check bibliography, figures, fonts, and package dependencies.']},
      code:String.raw`project/
├── main.tex
├── references.bib
├── macros.tex
├── sections/
│   ├── intro.tex
│   └── results.tex
└── figures/
    └── figure1.pdf`,
      tip:{zh:'导出 .tex 后仍需在 TeX Live、MiKTeX 或 Overleaf 中编译成 PDF。',en:'After exporting .tex, compile it using TeX Live, MiKTeX, or Overleaf.'},
      task:{zh:'给你自己的项目画一个目录结构，保证每个资源都能被找到。',en:'Sketch your own folder structure so every project asset has a clear home.'}}
  ];
  const quizzes = [
    {lesson:'start',question:{zh:'哪个命令用来指定 LaTeX 文档类型？',en:'Which command sets the LaTeX document class?'},options:['\\usepackage','\\documentclass','\\begin','\\section'],answer:1,explain:{zh:'\\documentclass{article} 指定文档类。宏包另由 \\usepackage 加载。',en:'\\documentclass{article} selects the class. \\usepackage loads packages.'}},
    {lesson:'structure',question:{zh:'LaTeX 中，最常见的“开始新段落”方式是什么？',en:'What is the usual way to start a new paragraph?'},options:['两个空格','空一行','\\\\\\\\','按 Tab'],answer:1,explain:{zh:'源码里的空行表示分段。连续空格通常不会形成排版上的空白。',en:'A blank source line starts a paragraph. Repeated spaces are normally collapsed.'}},
    {lesson:'math-inline',question:{zh:'下面哪个命令会输出真正的分式？',en:'Which command produces a built-up fraction?'},options:['\\frac{a}{b}','a//b','\\fraction(a,b)','\\divide{a,b}'],answer:0,explain:{zh:'\\frac{分子}{分母} 使用两个花括号参数。',en:'\\frac takes two braced arguments: numerator and denominator.'}},
    {lesson:'math-align',question:{zh:'aligned 环境中，哪个符号定义对齐位置？',en:'Which character marks alignment points in aligned?'},options:['#','&','@','%'],answer:1,explain:{zh:'& 用作列的对齐标记；\\\\ 用来换行。',en:'& marks alignment points; \\\\ starts a new row.'}},
    {lesson:'figures',question:{zh:'把图片缩放为正文宽度的 70%，应使用哪种写法？',en:'Which option scales a figure to 70% of text width?'},options:['width=70','width=.7\\textwidth','scale=70cm','size=70%'],answer:1,explain:{zh:'width=.7\\textwidth 使用正文宽度作为参照。',en:'width=.7\\textwidth measures the image relative to the text width.'}},
    {lesson:'tables',question:{zh:'tabular 里哪一个字符用来分隔表格列？',en:'Which character separates columns in tabular?'},options:['|',';',',','&'],answer:3,explain:{zh:'& 分列，\\\\ 换行；l、c、r 决定列对齐方式。',en:'& separates columns; \\\\ ends rows; l/c/r control alignment.'}},
    {lesson:'crossref',question:{zh:'文中引用图表编号通常用哪个命令？',en:'Which command normally retrieves a figure or table number?'},options:['\\cite','\\ref','\\tag','\\footnote'],answer:1,explain:{zh:'\\label 创建标签，\\ref 引用它的编号。',en:'\\label defines a label and \\ref retrieves its number.'}},
    {lesson:'citation',question:{zh:'在 biblatex + biber 工作流中，哪里存放参考文献的元数据？',en:'Where are bibliography records stored in biblatex + biber?'},options:['.bib 文件','.png 文件','.cls 文件','.aux 文件'],answer:0,explain:{zh:'.bib 文件保存文献条目；\\addbibresource 将它加入项目。',en:'A .bib file holds records, added with \\addbibresource.'}},
    {lesson:'macros',question:{zh:'下列哪个命令用于定义一个新的 LaTeX 命令？',en:'Which command defines a new LaTeX macro?'},options:['\\newcommand','\\makefile','\\section','\\renewenvironment'],answer:0,explain:{zh:'\\newcommand 定义新命令；有参数时可写 [1]、#1。',en:'\\newcommand defines a new macro and can take parameters.'}},
    {lesson:'chinese',question:{zh:'中文 UTF-8 文档通常优先选择哪个编译引擎？',en:'Which engine is a practical choice for UTF-8 Chinese documents?'},options:['BibTeX','pdfLaTeX only','XeLaTeX','MakeIndex'],answer:2,explain:{zh:'ctex + XeLaTeX 是常见的中文排版组合。',en:'ctex together with XeLaTeX is a common setup for Chinese typesetting.'}},
    {lesson:'debug',question:{zh:'提示 Undefined control sequence 时，先检查什么？',en:'What should you check first after “Undefined control sequence”?'},options:['网页缩放','命令拼写和所需宏包','PDF 纸张尺寸','页边距'],answer:1,explain:{zh:'未定义命令最常见的原因是拼写问题或缺少相关宏包。',en:'A misspelled command or missing package often causes this error.'}},
    {lesson:'project',question:{zh:'向合作者发送项目时，哪种做法最合适？',en:'What is the best way to share a reproducible LaTeX project?'},options:['只发送截图','只发送生成的 PDF','发送 main.tex 与需要的资源','只发送 .aux'],answer:2,explain:{zh:'源码、参考文献、图像以及相关依赖信息能帮助别人重新编译。',en:'Share source, bibliography, figures, and necessary dependency information.'}}
  ];
  const reference = [
    ['frac','math','\\frac{a}{b}',String.raw`\frac{a}{b}`,'分式','Fraction','把 a 放在分子，b 放在分母。','Builds a numerator over a denominator.'],
    ['sqrt','math','\\sqrt{x}',String.raw`\sqrt{x^2+1}`,'平方根','Square root','可用 [n] 写 n 次根。','Use an optional [n] for nth roots.'],
    ['sum','math','\\sum_{i=1}^n',String.raw`\sum_{i=1}^{n} x_i`,'求和','Summation','下标和上标定义求和范围。','Scripts define the summation bounds.'],
    ['int','math','\\int_a^b',String.raw`\int_0^1 x^2\,dx`,'积分','Integral','\\, 常用于积分式中的微小间隔。','\\, adds a little spacing before the differential.'],
    ['lim','math','\\lim_{x\\to 0}',String.raw`\lim_{x\to 0}\frac{\sin x}{x}=1`,'极限','Limit','\\lim 是直立的数学运算符。','\\lim produces an upright operator.'],
    ['infty','math','\\infty',String.raw`\sum_{n=0}^{\infty}\frac{1}{2^n}=2`,'无穷大','Infinity','无穷符号常用在积分、极限与求和里。','Common in series, limits, and integrals.'],
    ['alpha','math','\\alpha, \\beta',String.raw`\alpha+\beta=\gamma`,'希腊字母','Greek letters','注意区分小写和大写，例如 Gamma 对应 \\Gamma。','Uppercase Greek symbols may use different commands.'],
    ['mathbb','math','\\mathbb{R}',String.raw`x\in\mathbb{R}^n`,'黑板粗体','Blackboard bold','常用来表示集合和数域。','Common for sets and number systems.'],
    ['vec','math','\\vec{x}',String.raw`\vec{v}\cdot\vec{w}=0`,'向量','Vector','单字符向量可用 \\vec。','Places an arrow over a variable.'],
    ['hat','math','\\hat{\\theta}',String.raw`\hat{\theta}=\frac{1}{n}\sum_i X_i`,'估计量','Estimator hat','常用于统计估计量。','Often used for estimated parameters.'],
    ['boldsymbol','math','\\boldsymbol{\\beta}',String.raw`\boldsymbol{\beta}^{\top}x`,'数学粗体','Bold math','比在数学模式里用 textbf 更合适。','Useful for bold math symbols.'],
    ['cases','math','\\begin{cases}',String.raw`f(x)=\begin{cases}x^2,&x\ge0\\-x,&x<0\end{cases}`,'分段函数','Piecewise function','使用 & 分隔表达式与条件。','Separates an expression from its condition.'],
    ['pmatrix','math','\\begin{pmatrix}',String.raw`\begin{pmatrix}a&b\\c&d\end{pmatrix}`,'圆括号矩阵','Parenthesized matrix','矩阵列用 & 分隔。','Use & to separate matrix columns.'],
    ['aligned','math','\\begin{aligned}',String.raw`\begin{aligned}a&=b+c\\ &=d\end{aligned}`,'公式对齐','Align equations','以 & 指定对齐位置。','Mark alignment points with &.'],
    ['binom','math','\\binom{n}{k}',String.raw`\binom{n}{k}=\frac{n!}{k!(n-k)!}`,'组合数','Binomial coefficient','自动生成组合数的括号。','Creates binomial notation.'],
    ['partial','math','\\partial',String.raw`\frac{\partial f}{\partial x}`,'偏导数','Partial derivative','偏微分符号写作 partial。','Partial derivative symbol.'],
    ['nabla','math','\\nabla',String.raw`\nabla f(x)=0`,'梯度','Nabla','常用于梯度与向量分析。','Used in vector calculus and gradients.'],
    ['text','math','\\text{...}',String.raw`x>0\quad\text{for all }x\in A`,'数学文本','Text in math','数学公式里插入正常文本。','Inserts upright text inside an equation.'],
    ['section','document','\\section{Title}',String.raw`\section{Introduction}`,'章节标题','Section heading','自动编号的一级标题。','Creates a numbered section heading.'],
    ['subsection','document','\\subsection{Title}',String.raw`\subsection{Data}`,'小节标题','Subsection','位于 section 之下。','Creates a subsection heading.'],
    ['textbf','document','\\textbf{...}',String.raw`This is \textbf{important}.`,'粗体文字','Bold text','强调短语，别让整段都变成粗体。','Use on selected words or phrases.'],
    ['emph','document','\\emph{...}',String.raw`This is \emph{important}.`,'文字强调','Emphasis','通常表现为斜体。','Usually appears in italics.'],
    ['itemize','document','\\begin{itemize}',String.raw`\begin{itemize}
\item First
\item Second
\end{itemize}`,'无序列表','Bulleted list','每条条目以 item 开头。','Each list entry begins with item.'],
    ['enumerate','document','\\begin{enumerate}',String.raw`\begin{enumerate}
\item First
\item Second
\end{enumerate}`,'有序列表','Numbered list','编号交给环境自动管理。','Lets LaTeX number the entries.'],
    ['includegraphics','layout','\\includegraphics{...}',String.raw`\includegraphics[width=.7\textwidth]{fig1.pdf}`,'插入图片','Insert image','在导言区加载 graphicx。','Requires the graphicx package.'],
    ['caption','layout','\\caption{...}',String.raw`\caption{Regression results}`,'图表题注','Figure/table caption','通常放在 figure 或 table 中。','Usually placed in a float environment.'],
    ['tabular','layout','\\begin{tabular}',String.raw`\begin{tabular}{lc}A & B \\ 1 & 2\end{tabular}`,'基础表格','Tabular','l、c、r 定义列对齐。','Column specs set alignment.'],
    ['label','refs','\\label{...}',String.raw`\label{fig:results}`,'交叉引用标签','Cross-reference label','给可编号对象命名。','Names a numbered element.'],
    ['ref','refs','\\ref{...}',String.raw`Figure~\ref{fig:results}`,'引用编号','Reference number','自动引用对应对象的编号。','Prints the label number.'],
    ['cite','refs','\\cite{...}',String.raw`\cite{knuth1984}`,'文献引用','Citation','具体显示格式取决于文献系统。','Formatting depends on the bibliography setup.'],
    ['newcommand','workflow','\\newcommand',String.raw`\newcommand{\E}{\mathbb{E}}`,'自定义宏','Custom macro','让重复记号保持一致。','Reuse a meaningful symbol consistently.'],
    ['input','workflow','\\input{...}',String.raw`\input{sections/introduction}`,'拆分文件','Include a file','拆分长文档，方便维护。','Split larger documents into manageable files.'],
    ['tableofcontents','workflow','\\tableofcontents',String.raw`\tableofcontents`,'自动目录','Table of contents','根据章节命令生成目录。','Generates a section-based contents page.']
  ].map(([id,category,command,example,zh,en,detailZh,detailEn])=>({id,category,command,example,title:{zh,en},detail:{zh:detailZh,en:detailEn}}));
  const snippets = [
    {id:'fraction',label:{zh:'分式',en:'Fraction'},kind:'math',code:String.raw`\frac{a+b}{c+d}`},
    {id:'quadratic',label:{zh:'求根公式',en:'Quadratic'},kind:'math',code:String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`},
    {id:'integral',label:{zh:'积分',en:'Integral'},kind:'math',code:String.raw`\int_0^{\infty}e^{-x}\,dx=1`},
    {id:'aligned',label:{zh:'多行对齐',en:'Aligned'},kind:'math',code:String.raw`\begin{aligned}
(a+b)^2&=a^2+2ab+b^2\\
&=(a+b)(a+b)
\end{aligned}`},
    {id:'matrix',label:{zh:'矩阵',en:'Matrix'},kind:'math',code:String.raw`A=\begin{pmatrix}1&2\\3&4\end{pmatrix}`},
    {id:'cases',label:{zh:'分段函数',en:'Cases'},kind:'math',code:String.raw`f(x)=\begin{cases}x^2,&x\ge0\\-x,&x<0\end{cases}`},
    {id:'greek',label:{zh:'希腊字母',en:'Greek'},kind:'math',code:String.raw`\alpha+\beta=\gamma,\qquad\theta\in(0,\pi)`},
    {id:'limit',label:{zh:'极限',en:'Limit'},kind:'math',code:String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`},
    {id:'minimal',label:{zh:'最小文档',en:'Minimal doc'},kind:'document',code:String.raw`\documentclass{article}
\title{A short note}
\author{Your name}
\begin{document}
\maketitle
\section{Introduction}
A short paragraph with $E=mc^2$.
\end{document}`},
    {id:'chinese-doc',label:{zh:'中文文档',en:'Chinese doc'},kind:'document',code:String.raw`\documentclass[UTF8]{ctexart}
\title{研究笔记}
\begin{document}
\maketitle
\section{引言}
这是我的第一份中文文档。
\[
  \mathbb{E}[X]=\sum_i p_i x_i
\]
\end{document}`},
    {id:'list',label:{zh:'项目列表',en:'List'},kind:'document',code:String.raw`\section{To-do list}
\begin{itemize}
\item Read the paper.
\item Reproduce the figure.
\item Write a brief note.
\end{itemize}`},
    {id:'docmath',label:{zh:'含公式的段落',en:'Math in prose'},kind:'document',code:String.raw`\section{A simple model}
Consider the equation $y = \alpha + \beta x$.

We estimate the parameters by minimizing
\[
  \sum_{i=1}^{n} (y_i - \alpha - \beta x_i)^2.
\]
The solution can be checked numerically.`}
  ];
  return {modules, lessons, quizzes, reference, snippets};
})();
