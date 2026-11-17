/* Course tasks have worked answers and observable results, not an automatic TeX grade. */
(() => {
 'use strict';
 const D=window.ATELIER,L=window.LATEX_DATA.lessons,P=(zh,en)=>({zh,en}),R=String.raw;
 const solutions={
 start:[P('只改标题这一行，再编译。正文边界和 \\maketitle 都保留。','Change the title line and compile again. Keep the document boundaries and \\maketitle.'),R`\title{A Note on Probability}`,P('PDF 上的标题应变成 A Note on Probability，正文仍显示 Hello, LaTeX!。','The PDF title should read A Note on Probability, while the body still says Hello, LaTeX!.')],
 structure:[P('把这段放在正文里。空行分开两段；\\subsection 为小节建立层级。','Put this in the document body. The blank line separates the paragraphs, and \\subsection creates the subsection.'),R`\subsection{Methods}
We record each observation once.

We compare the observations using a simple summary.`,P('Methods 有自动编号，两段文字分开。若只在源码里按一次回车，它们通常仍会连成一段。','Methods receives a number, and the text forms two paragraphs. A single source newline usually leaves the text in one paragraph.')],
 'math-inline':[P('在实验室的公式模式输入下面这行。放到完整文档时，再用 \\[ 和 \\] 包起来。','Enter this in the Playground math mode. In a complete document, put it between \\[ and \\].'),R`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,P('分母是整个 2a，根号覆盖 b²−4ac，正负号显示为 ±。这是 a≠0 时的求根公式。','The entire 2a is in the denominator, the radical covers b²−4ac, and the sign is ±. The quadratic formula assumes a≠0.')],
 'math-align':[P('每行都把 & 放在等号之前。第二行展示展开过程，第三行写成平方。','Put & before the equals sign on each line. The second line shows the expansion and the third writes the square.'),R`\begin{aligned}
f(x)&=x^2+2x+1\\
&=x^2+x+x+1\\
&=(x+1)^2
\end{aligned}`,P('三个等号应竖直对齐。这个 aligned 块放到 PDF 文档时，需要外层数学环境。','The three equals signs should line up. In a PDF document, the aligned block needs an outer math environment.')],
 figures:[P('保留图片文件名，只改 width。chart.pdf 要和主文件放在同一目录，或改成图片的实际相对路径。','Keep the filename and change width. Put chart.pdf beside the main file, or use its actual relative path.'),R`\includegraphics[width=.85\textwidth]{chart.pdf}`,P('图片比原来更宽，纵横比保持不变。在列表、minipage 或栏内，更适合按当前的 \\linewidth 设置宽度。','The figure is wider and keeps its aspect ratio. Inside a list, minipage, or column, use the current \\linewidth for the width.')],
 tables:[P('在 \\bottomrule 之前插入新行。这里的数字是排版练习用的虚构数据。','Insert a row before \\bottomrule. These are fictional numbers for a typesetting exercise.'),R`C & 0.28 & 0.06 \\`,P('C 行有三个单元格，与 A、B 的列对齐；底线仍在所有数据行下方。','The C row has three cells aligned with A and B, and the bottom rule remains below all data rows.')],
 crossref:[P('先写题注，再写标签。正文引用标签，编译两遍检查编号。','Put the caption before the label. Refer to the label in the text and compile twice to check the number.'),R`\begin{table}[htbp]
\centering
\caption{Summary}\label{tab:summary}
\begin{tabular}{lr}
Group & Count\\
A & 12
\end{tabular}
\end{table}
See Table~\ref{tab:summary}.`,P('正文里的编号应与 Summary 表格的题注一致。标签内容 tab:summary 本身不会印在 PDF 上。','The reference number should match the Summary table caption. The label text tab:summary is not printed in the PDF.')],
 citation:[P('在正文与 refs.bib 中一起改键名；书名、作者和出版年份都保留。接着运行 LaTeX、Biber、LaTeX、LaTeX，或让 latexmk 协调。','Rename the key in both the document and refs.bib. Keep the book title, author, and year. Run LaTeX, Biber, LaTeX, LaTeX, or let latexmk coordinate the build.'),R`% main.tex
\textcite{texbook1984} describes TeX.

% refs.bib: change the entry's opening line
@book{texbook1984,
  author = {Knuth, Donald E.},
  title = {The {TeX}book},
  year = {1984},
  publisher = {Addison-Wesley}
}`,P('引用仍指向同一本书，日志不再提示 texbook1984 未定义。refs.bib 中的 demo2024 条目继续保留；书名中的花括号保护 TeX 的大小写。','The citation still points to the same book, and the log no longer reports texbook1984 as undefined. Keep the demo2024 entry in refs.bib. The braces protect the capitalization of TeX in the title.')],
 macros:[P('在导言区加载 amsmath 后声明运算符，正文只调用它。','Load amsmath and declare the operator in the preamble. Call it in the body.'),R`\DeclareMathOperator{\Var}{Var}
% In the document body:
\[ \Var(X)=\mathbb{E}[(X-\mathbb{E}[X])^2] \]`,P('Var 应为正体，X 是数学变量。此例的 \\mathbb 还需要 amsfonts 或 amssymb；课程源码已加载 amsfonts。','Var should be upright while X remains a math variable. This example also needs amsfonts or amssymb for \\mathbb; the lesson source loads amsfonts.')],
 chinese:[P('修改导言区的标题，再把段落放进 document 环境。选择 XeLaTeX 编译。','Change the title in the preamble and place the paragraph in the document environment. Compile with XeLaTeX.'),R`\title{概率与数据}
% In the document body:
我们用 random variable 表示随机变量，并用 sample 描述观察到的样本。`,P('标题、中文和英文术语都应正常显示。出现缺字时先看日志中的字体信息。','The title, Chinese text, and English terms should all appear. If characters are missing, check the font information in the log first.')],
 debug:[P('x_1 的下标需要数学模式；第二个片段少了分母的右花括号。把两处都修好，再看日志中的第一条错误是否消失。','The subscript in x_1 needs math mode. The second fragment is missing the denominator’s closing brace. Fix both and check whether the first error disappears.'),R`The value is $x_1$.
\[ \frac{a}{b} \]`,P('下标与分式正常显示；仅补花括号仍不足以让 \\frac 在正文模式里工作。','The subscript and fraction should display correctly. Adding the brace alone still does not make \\frac work in text mode.')],
 project:[P('可以采用课程里的目录：main.tex、macros.tex、references.bib 都放在 project 下；sections 下有 intro.tex、results.tex；figures 下有 figure1.pdf。先创建实际文件，再写下面的主文件。macros.tex 放命令定义，两个章节文件只放正文。','Use the lesson layout: main.tex, macros.tex, and references.bib in project; intro.tex and results.tex in sections; figure1.pdf in figures. Create the actual files before writing the main file below. macros.tex contains definitions, while the chapter files contain body text.'),R`\documentclass{article}
\usepackage{graphicx}
\usepackage[backend=biber]{biblatex}
\addbibresource{references.bib}
\input{macros}
\begin{document}
\input{sections/intro}
\input{sections/results}
\includegraphics[width=.6\linewidth]{figures/figure1.pdf}
\printbibliography
\end{document}`,P('从 main.tex 所在目录编译；定义在导言区加载，章节在正文加载，图片和文献文件的路径都与目录对应。文献表列出正文实际引用的条目，含引用时用 Biber 或让 latexmk 协调编译。','Compile from the directory containing main.tex. Definitions load in the preamble, chapters load in the body, and the image and bibliography paths match the directory layout. The bibliography lists entries cited in the body; when there are citations, use Biber or let latexmk coordinate the build.')],
 'course-ctexart':[P('明确使用发行版自带的 Fandol 字体集，按示例选择 XeLaTeX 编译。','Select the bundled Fandol font set explicitly and compile the example with XeLaTeX.'),R`\documentclass[UTF8,fontset=fandol]{ctexart}`,P('中文标题和正文可读；PDF 阅读器的字体属性或编译日志可帮助确认使用了 Fandol 字体。','The Chinese title and body should be readable. The PDF viewer’s font properties or the build log can help confirm the Fandol fonts.')],
 'course-mathbb':[P('黑板粗体标识数域，普通变量保持默认数学斜体。连同这一对显示公式分隔符直接放在正文，替换一段已有显示公式。','Use blackboard bold for the number system and the default math italics for variables. Put this block directly in the body, including its display delimiters, to replace an existing display.'),R`\[ x\in\mathbb{R},\qquad \mathbf{x}\in\mathbb{R}^{n} \]`,P('R 是黑板粗体；第一个 x 是标量斜体，第二个 x 是粗体向量。记号的含义仍需要在文字中定义。','R is blackboard bold. The first x is an italic scalar and the second is a bold vector. Define the notation in the surrounding text.')],
 'course-cases':[P('先写出函数的两段，再给每段写条件。amsmath 在导言区加载。','Write the two branches first, then attach a condition to each. Load amsmath in the preamble.'),R`\[
f(x)=\begin{cases}
x^2 & \text{if }x\ge 0,\\
-x & \text{if }x<0.
\end{cases}
\]`,P('左侧只有一个大花括号；条件分成 x≥0 与 x<0，覆盖全部实数且不重叠。','There is one large left brace. The conditions x≥0 and x<0 cover all real numbers without overlapping.')],
 'course-tabularx':[P('保留两端的普通列，把长说明交给 X 列。列宽总和由 tabularx 按当前行宽分配。','Keep the ordinary columns at the ends and use X for the long description. tabularx allocates the total width to the current line width.'),R`\begin{tabularx}{\linewidth}{lXr}
Item & Explanation & Count\\
A & A longer explanation that wraps within its column. & 12\\
\end{tabularx}`,P('说明会自动换行，Count 列保持右对齐。X 列默认按段落排版，普通 l、c、r 列通常不自动换行。','The explanation wraps while Count stays right aligned. X is a paragraph column; ordinary l, c, and r columns normally do not wrap.')],
 'course-longtable':[P('保留原例的三列和数据行，把 caption 后到第一条数据之前的表头与页脚定义替换成这一段。','Keep the original three columns and data rows. Replace the header and footer definitions after the caption and before the first data row with this block.'),R`\toprule ID & Group & Observation\\\midrule\endfirsthead
\multicolumn{3}{l}{Table \thetable\ continued}\\
\toprule ID & Group & Observation\\\midrule\endhead
\midrule\multicolumn{3}{r}{Continued on next page}\\\endfoot
\bottomrule\endlastfoot`,P('数据足够多时，续页重复三列表头；只有非末页出现续页提示，末页只画底线。multicolumn 的 3 与原例的 rll 三列一致。','With enough rows, continuation pages repeat the three-column header. Only non-final pages show the continuation note; the final page has the bottom rule. The 3 in multicolumn matches the original rll columns.')],
 'course-natbib':[P('在正文里并排比较两种引用，参考文献样式仍用 plainnat，后端仍用 BibTeX。','Compare the two citation forms in the text. Keep plainnat as the bibliography style and BibTeX as the backend.'),R`\citet{knuth1984} describes TeX.
The design is described elsewhere \citep{knuth1984}.`,P('第一句的作者名成为句子成分；第二句的作者和年份放在括号内。编译链为 LaTeX、BibTeX、LaTeX、LaTeX。','In the first sentence, the author is part of the sentence. In the second, the author and year appear in parentheses. Build with LaTeX, BibTeX, LaTeX, LaTeX.')],
 'course-hyperref':[P('在 hyperref 已加载后设置元数据，保留正文中的标签和引用。','Set the metadata after hyperref has loaded, and keep the labels and references in the body.'),R`\hypersetup{
  pdftitle={A Note on Probability},
  pdfauthor={A. Student},
  hidelinks
}`,P('PDF 属性中的标题和作者改变；点击引用仍能跳转。元数据标题和印在页面上的 \\title 可以分别设置。','The PDF properties show the new title and author, and reference links still work. The metadata title and the printed \\title are separate settings.')],
 'course-standalone':[P('先把 standalone 源码保存为 plot.tex，编译为 plot.pdf，再在文章正文引用。主文章的导言区需要 graphicx。','Save the standalone source as plot.tex and compile plot.pdf. Include it in the article body, with graphicx loaded in the article preamble.'),R`\includegraphics[width=.6\linewidth]{plot.pdf}`,P('plot.pdf 的页面边界贴近图形，正文中缩放后仍保留矢量清晰度。','The plot.pdf page is cropped close to the drawing, and the vector graphic remains sharp when scaled in the article.')],
 'course-beamer':[P('在标题页之后添加下面三个 frame。每页用一个标题说明这一页要讲什么。','Add these three frames after the title page. Give each frame a title that states its point.'),R`\begin{frame}{Methods}
We compare two illustrative groups.
\end{frame}
\begin{frame}{Results}
The example demonstrates the layout of a result slide.
\end{frame}
\begin{frame}{References}
List the sources used in the presentation.
\end{frame}`,P('至少有标题、方法、结果和参考资料四个 frame。这里的文字是版式练习，不是实际研究结论。','There should be at least four frames: title, methods, results, and references. The wording is for layout practice, not an actual research finding.')],
 'course-tikz-paths':[P('把点的位置改为 (3,2)，标签也跟着改。路径命令末尾的分号保留。','Move the point to (3,2) and update its label. Keep the semicolon at the end of each path command.'),R`\fill[teal] (3,2) circle[radius=2pt];
\node[above right] at (3,2){$A=(3,2)$};
\draw[->,thick] (0,0)--(3,2);`,P('箭头从原点指向 A；标注坐标与真实点位置一致。','The arrow points from the origin to A, and the label agrees with the point’s coordinates.')],
 'course-pgfplots-axis':[P('在 axis 选项里写清单位，再为每条曲线添加图例。以下用无量纲变量，避免给函数随意附上物理单位。','State the units in the axis options and give each curve a legend. This example uses dimensionless variables rather than inventing physical units.'),R`\begin{axis}[
xlabel={$x$ (dimensionless)},
ylabel={$f(x)$ (dimensionless)}]
\addplot[blue,domain=-2:2]{x^2};
\addlegendentry{$x^2$}
\addplot[teal,domain=-2:2]{x+1};
\addlegendentry{$x+1$}
\end{axis}`,P('两条曲线的颜色和图例对应，坐标标题说明变量无量纲。axis 仍需要外层 tikzpicture。','The legend matches the two curve colors, and both axis labels say the quantities are dimensionless. Keep axis inside tikzpicture.')],
 'course-programming-newcommand':[P('在导言区定义一次，在正文调用两次。#1 是调用时传进来的参数。','Define the command once in the preamble and call it twice in the body. #1 is the argument supplied by the caller.'),R`\newcommand{\norm}[1]{\lVert #1\rVert}
% In the document body, with amsmath loaded:
\[ \norm{x},\qquad \norm{x-y} \]`,P('两次调用都加上范数定界符，但括号内内容不同。若课程源码已定义 \\norm，修改原定义即可，不要重复声明。','Both calls add norm delimiters, with different content inside. If \\norm is already defined in the lesson source, edit that definition instead of declaring it again.')],
 'course-programming-expl3':[P('示例中的 :n 表示接收一个不展开的普通参数；它没有声明本地变量。下面另加一个 token list，l_ 是本地变量的命名约定，_tl 表示类型。','The :n signature accepts an ordinary, unexpanded argument. The original example declares no local variable. This additional token list uses l_ for local scope and _tl for its type.'),R`\ExplSyntaxOn
\tl_new:N \l_atelier_label_tl
\tl_set:Nn \l_atelier_label_tl { draft }
\tl_use:N \l_atelier_label_tl
\ExplSyntaxOff`,P('放在正文时输出 draft。变量赋值在当前分组中生效，命名中的 l_ 本身不会创建一个新分组。','Placed in the body, it prints draft. The assignment is local to the current group; the l_ name itself does not create a group.')],
 'course-report':[P('章节和附录都用 \\chapter。\\appendix 只切换编号规则，后面仍要创建附录章节。','Use \\chapter for both chapters and appendices. \\appendix changes the numbering scheme; it does not create an appendix chapter.'),R`\chapter{Data}
Describe the sample.
\chapter{Results}
Present the analysis.
\appendix
\chapter{Additional tables}`,P('正文章节通常编号为 1、2；附录章改成 A。article 没有 \\chapter，需要换成 report 或 book。','The main chapters are normally numbered 1 and 2, and the appendix chapter becomes A. article has no \\chapter; use report or book for this structure.')],
 'course-threeparttable':[P('把说明放进 tablenotes，说明数据性质和括号里的数字。这里保留教学示例，不当成真实回归结果。','Put the notes in tablenotes and explain the data and the numbers in parentheses. These remain teaching data, not actual regression results.'),R`\begin{tablenotes}\footnotesize
\item Notes: Synthetic teaching data. Robust standard errors
are in parentheses. Both columns use the same 480 illustrative observations.
$^{**}p<0.05$.
\end{tablenotes}`,P('表注出现在表体下方，宽度与 threeparttable 的表体协调。真实项目中的数字和样本说明应由分析代码生成。','The notes appear below the table body with a coordinated width. In a real project, generate the numbers and sample description from the analysis code.')],
 'course-gb7714':[P('这份课程采用 biblatex 的 gb7714-2015 样式与 Biber。保持这一套配置，并把 refs.bib 保存到同一目录。','This lesson uses biblatex’s gb7714-2015 style with Biber. Keep that configuration and save refs.bib in the same directory.'),R`\usepackage[backend=biber,style=gb7714-2015]{biblatex}
\addbibresource{refs.bib}
% In the body:
\cite{knuth1984}
\printbibliography`,P('按 XeLaTeX、Biber、XeLaTeX、XeLaTeX 编译后，引用与文献表应出现。若单位模板指定另一套标准或 BibTeX 路线，应按模板重配整条链。','After XeLaTeX, Biber, XeLaTeX, XeLaTeX, the citation and bibliography should appear. If an institutional template specifies another standard or a BibTeX workflow, configure the whole chain to match it.')],
 'course-memoir':[P('把前置部分、正文和后置部分依次排好，再编译两遍检查目录。','Put front matter, main matter, and back matter in order, then compile twice to check the contents.'),R`\frontmatter
\tableofcontents
\chapter{Preface}
\mainmatter
\chapter{Main argument}
\backmatter
\chapter{Notes}`,P('前置页通常用罗马页码，正文从阿拉伯页码开始；后置章节标题保留，但通常不再编号。','Front matter normally uses Roman page numbers, main matter starts Arabic page numbers, and back-matter chapter titles are normally unnumbered.')]
 };
 for(const lesson of L){
  const e=D.entries.find(e=>e.id===lesson.entry),s=solutions[lesson.id];
  if(!s)throw new Error('Missing worked course solution: '+lesson.id);
  if(!e?.teaching)throw new Error('Missing course walkthrough: '+lesson.id);
  lesson.teaching=e.teaching;
  lesson.solution={body:s[0],code:s[1],expected:s[2]};
  lesson.minutes=Math.max(lesson.minutes,lesson.id.startsWith('course-')?20:12);
  lesson.tip=P('先运行原示例，再一次改一处。做完下方任务后，对照参考写法与输出检查。','Run the original example first, then change one thing at a time. After the task, compare your source and output with the worked solution.');
 }
 const descriptions={
  beginner:P('从文档边界、段落和数学模式学起，再加入图表、引用和项目文件。每节只引入能马上用上的几项写法。','Start with document boundaries, paragraphs, and math mode, then add figures, tables, references, and project files. Each lesson introduces a few things you can use immediately.'),
  intermediate:P('会写一份小文档后，再处理中文字体、分段公式、宽表、跨页表和参考文献。重点是选对工具，并在 PDF 中检查结果。','Once you can write a small document, work on Chinese fonts, cases, wide and multipage tables, and bibliographies. Choose the appropriate tool and check the result in the PDF.'),
  advanced:P('把图形、数据图和重复写法整理成可复用的组件，再练习 Beamer 与 LaTeX3。先跑通小例子，再加自己的内容。','Make graphics, charts, and repeated notation reusable, then work with Beamer and LaTeX3. Get a small example working before adding your own content.'),
  academic:P('按报告、带表注的结果表、中文参考文献和长文档四个任务练习。模板决定格式，源码组织和编译链决定能否稳定交付。','Practice four tasks: a report, a results table with notes, a Chinese bibliography, and a long document. The template sets the format; source organization and the build chain make the project reproducible.')
 };
 D.pathways.forEach(p=>p.description=descriptions[p.id]);
 // Explain the source placement and the reasoning before asking readers to edit it.
 const notes={
 start:[
 P('先准备一个可以编译 .tex 的环境：在线编辑器中新建空白项目，把代码放进 main.tex 并选择 pdfLaTeX；本地写作则需要 TeX 发行版和编辑器。本站实验室可先练习结构，实际 PDF 由 TeX 编译生成。文件保存为 UTF-8，检查扩展名是 .tex，而不是 .tex.txt。','Prepare an environment that compiles .tex: create a blank project in an online editor, place the code in main.tex, and choose pdfLaTeX. Local work requires a TeX distribution and an editor. The site Playground lets you practice structure; TeX produces the actual PDF. Save as UTF-8 and check that the extension is .tex rather than .tex.txt.'),
 P('第一行的 \\documentclass{article} 选择文章类。从这一行到 \\begin{document} 之前是导言区。\\title 和 \\author 只记录标题与作者，正文里的 \\maketitle 才把它们排出来。示例未设置日期时通常显示编译当天的日期；在导言区加 \\date{} 可隐藏日期。','The first line, \\documentclass{article}, selects the article class. Everything before \\begin{document} is the preamble. \\title and \\author store information; \\maketitle in the body prints it. Without a date setting, the title normally shows the compilation date; add \\date{} to the preamble to hide it.'),
 P('Hello, LaTeX! 是普通正文，可以直接替换文字。以反斜杠开头的是命令，花括号包住参数；环境用同名的 begin 与 end 配对。百分号开始的内容到该行末尾都是注释，不会印在 PDF 上。先保留所有边界，只改一处文字并重新编译，确认自己打开的是更新后的 PDF。','Hello, LaTeX! is ordinary body text that you can replace directly. A backslash starts a command and braces enclose its argument; environments pair begin and end with the same name. A percent sign comments out the rest of its source line. Keep the boundaries, edit one phrase, and recompile to confirm that you are viewing the updated PDF.')],
 structure:[
 P('本课源码是正文片段：放在已有文档的 \\begin{document} 与 \\end{document} 之间。\\section 是节，\\subsection 是节下面的小节，编号由文档类维护。不要把“1. Background”手写进标题参数，否则自动编号会再出现一次。','This lesson supplies a body fragment: place it between \\begin{document} and \\end{document} in an existing document. \\section creates a section and \\subsection a level below it. The class maintains numbering; typing “1. Background” into a heading would duplicate the number.'),
 P('源码里只按一次回车，通常相当于一个空格；中间留一整行空白才开始新段。新段默认可能表现为首行缩进，而不是增加段间空白。\\textbf 的粗体范围由花括号决定，\\emph 表示强调。先观察默认结果，再调整版式，不需要给每一行加双反斜杠。','A single source newline normally acts like a space; a blank line starts a paragraph. A new paragraph may use indentation rather than extra vertical space. Braces limit the bold text in \\textbf, and \\emph marks emphasis. Inspect the defaults before changing layout; ordinary lines need no forced breaks.')],
 'math-inline':[
 P('实验室公式模式只输入公式本身。本课的分式可以直接运行；放进 .tex 正文时，短公式用 $...$ 包住，独立公式用 \\[ 与 \\] 包住。不要把这两种分隔符互相嵌套。','In Playground math mode, enter only the expression. In a .tex body, enclose short math in $...$ or a display in \\[ and \\]. Do not nest those two delimiter forms.'),
 P('\\frac 的第一个参数是分子，第二个是分母；\\sqrt 的参数决定根号覆盖的范围。x^12 只把 1 放在上标，x^{12} 才把 12 一起放上去。每次先配好花括号，再填写里面的表达式。正文出现下划线报错时，先判断它是不是应放在数学模式里的下标。','The first argument of \\frac is the numerator and the second is the denominator. The argument of \\sqrt controls the radical. x^12 raises only 1, whereas x^{12} raises both digits. Pair braces first, then fill them. If an underscore causes an error in prose, check whether it belongs in a math subscript.')],
 'math-align':[
 P('实验室可直接输入本课 aligned 片段；在完整文档里先于导言区加载 amsmath，再把片段放进 \\[...\\]。aligned 需要外层数学模式，本身不产生公式编号；需要逐行编号时，可在正文使用 align，外面不再加显示公式分隔符。','The Playground accepts this aligned fragment directly. In a complete document, load amsmath in the preamble and enclose the fragment in \\[...\\]. aligned needs outer math mode and supplies no number. For numbered rows, use align directly in the body without display delimiters around it.'),
 P('把 & 放在每行相同的逻辑位置，例如等号前；双反斜杠结束一行，单个反斜杠不表示换行。矩阵中 & 分列，双反斜杠分行。先核对每行的列数，再处理括号大小与间距。','Place & at the same logical point on each line, such as before an equals sign. Two backslashes end a row; one does not. In matrices, & separates columns and two backslashes separate rows. Check column counts before adjusting delimiters or spacing.')],
 figures:[
 P('本课开头的 \\usepackage{graphicx} 放到导言区，其余 figure 块放进正文。chart.pdf 是你准备的实际 PDF 图片：把自己的图片放在 main.tex 旁边并命名为 chart.pdf，或把源码改为实际文件名。关联示例用方框演示浮动位置，不含 chart.pdf。只有 .tex 而没有图片文件，无法完成本课的实际插图编译。','Put \\usepackage{graphicx} in the preamble and the figure block in the body. chart.pdf must be a real PDF image: put your own image beside main.tex with this name, or change the source to its actual filename. The linked example demonstrates placement with a box and does not supply chart.pdf. The .tex file alone cannot compile this image example.'),
 P('width=.7\\textwidth 表示正文总宽度的 70%，只指定宽度会等比缩放。\\centering 让图片居中；\\caption 生成图题与编号，随后的 \\label 保存该编号。图片可能移到页顶或后页，检查尺寸和题注后，再判断是否需要调整浮动位置。','width=.7\\textwidth means 70% of the text width, with proportional scaling. \\centering centers the image, \\caption creates its caption and number, and the following \\label stores that number. A float may move to a page top or later page; check size and caption before adjusting placement.')],
 tables:[
 P('把 booktabs 的加载语句移到导言区，tabular 环境放进正文。lrr 表示三列：第一列左对齐，后两列右对齐。每行三个单元格需要两个 &；在新行之前保留双反斜杠。单元格本身要显示 & 时，写成 \\&。','Load booktabs in the preamble and put tabular in the body. lrr gives three columns: left, right, right. Three cells need two & separators, with two backslashes before the next row. To print an ampersand inside a cell, use \\&.'),
 P('\\toprule、\\midrule、\\bottomrule 分别放在表头前、表头后和全部数据后。添加 C 行时插在底线之前，并与原来的三列保持一致。tabular 只排表体；需要题注、编号和浮动位置时，再在外面套 table 环境。','Place \\toprule before the heading, \\midrule after it, and \\bottomrule after all data. Insert row C before the bottom rule, keeping three cells. tabular typesets the cells; wrap it in table when you need a caption, number, and float placement.')],
 crossref:[
 P('把本课片段放进正文，导言区加载 amsmath 以支持 \\eqref。标签名是内部标识，不是要印出的标题；每个对象使用唯一名称。图表的 label 紧跟 caption，章节的 label 紧跟 section，公式的 label 放在编号环境内部。','Put the fragment in the body and load amsmath for \\eqref. Label names are internal identifiers, with one unique name per object. Put a figure or table label after its caption, a section label after its heading, and an equation label inside its numbered environment.'),
 P('第一次编译把编号写入 .aux，下一次编译再读取，所以首次出现 ?? 时先再编译一次。若仍是问号，检查 ref 与 label 拼写是否完全一致，以及目标是否真的有编号。不要把问号直接改成手写数字，否则改动顺序后引用就会过时。','The first run writes numbers to .aux and the next reads them. Compile again if the first output shows ??. If it persists, check exact label spelling and whether the target is numbered. Keep the reference command so later reordering updates the number.')],
 citation:[
 P('这是多文件示例。先下载关联示例中的 refs.bib，与 main.tex 放在同一目录；\\addbibresource 中的名称必须和实际文件一致。正文引用的是条目键 knuth1984，不是作者名或文件名。只粘贴主文件会缺少文献数据库。','This is a multi-file example. Download refs.bib from the linked example and put it beside main.tex; its name must match \\addbibresource. Cite the entry key knuth1984, rather than an author or filename. Copying only the main file omits the database.'),
 P('Biber 处理的是主文件的作业名：主文件为 main.tex 时运行 biber main，不是 biber refs。一次 LaTeX 先写出请求，Biber 处理文献，再运行 LaTeX 两次更新引用与版面。修改条目键时，正文与 .bib 必须同步修改；没有被引用的条目通常不出现在文献表中。','Biber uses the main document job name: run biber main for main.tex, rather than biber refs. A LaTeX run writes requests, Biber processes them, and two more LaTeX runs update citations and layout. Rename keys in both the body and .bib. Uncited entries normally stay out of the bibliography.')],
 macros:[
 P('宏定义放在导言区，调用放在需要输出的位置。本课已有命令时只修改原定义；再次用 newcommand 定义同名命令会报错。带一个参数的宏用 [1] 声明，再以 #1 引用传入内容；调用时用花括号包住参数。','Define macros in the preamble and call them where output belongs. Edit an existing definition rather than declaring the same name with newcommand again. A one-argument macro uses [1] and refers to its input as #1; supply that input in braces.'),
 P('自定义命令不会自动补齐依赖。\\DeclareMathOperator 需要 amsmath，\\mathbb 需要 amsfonts 或 amssymb。先确认宏展开后的普通写法能编译，再把它封装起来；修改一次定义后，检查所有调用位置是否都得到一致结果。','Custom commands still need their dependencies. \\DeclareMathOperator requires amsmath and \\mathbb requires amsfonts or amssymb. Compile the underlying expression before wrapping it in a macro, then check all uses after changing the definition.')],
 chinese:[
 P('本课用 XeLaTeX 编译，源文件保存为 UTF-8。ctexart 负责中文文章的字体与标题规则，fontset=fandol 指定 TeX 发行版提供的字体。先运行默认字体示例，成功后再尝试自己的字体，便于区分引擎问题和字体名称问题。','Compile this lesson with XeLaTeX and save UTF-8 source. ctexart configures Chinese fonts and headings, while fontset=fandol selects distribution fonts. Compile the default first, then try personal fonts to distinguish engine problems from font-name problems.'),
 P('中文标题仍由 title 定义、maketitle 输出，段落和数学环境沿用前面的结构。出现方框或缺字时，查看日志里的 Missing character 与字体信息；出现 fontspec 的引擎错误时，检查实际编译设置是否仍是 pdfLaTeX。','Use title and maketitle as before, along with the same paragraph and math structures. For boxes or missing glyphs, inspect Missing character messages and font details. A fontspec engine error calls for checking whether the build is still using pdfLaTeX.')],
 debug:[
 P('先备份能编译的版本，再复现错误。打开日志，从第一条错误开始找文件名与行号，同时看出错行的前一行：缺失的花括号或环境结尾常在更早的位置。一次只修一个原因，再重新编译，后面的连锁错误可能一起消失。','Keep a working copy before reproducing a failure. Start at the first log error and its file and line number, then inspect the preceding source too: a missing brace or environment ending may occur earlier. Fix one cause and rebuild; later errors may disappear with it.'),
 P('Error 表示编译遇到问题；Warning 常提示需要重编译、引用未定义或版面不理想。即使生成了 PDF，也要看本次进程是否成功，以及 PDF 是否真有新增内容。最小示例应包含文档类、必要宏包和正文边界，便于独立复现。','An Error signals a compilation problem; a Warning may request another run or report references or layout issues. Even if a PDF exists, check the build status and whether new content appears. An independently reproducible example includes the class, required packages, and body boundaries.')],
 project:[
 P('从 main.tex 开始编译；sections 里的文件只写章节正文，不再写 documentclass 或 document 环境。\\input{sections/intro} 会在当前位置读入文件内容。宏定义在导言区读入，章节在正文读入，顺序与写在单个文件中相同。','Compile main.tex. Files in sections contain body content without another class or document environment. \\input{sections/intro} reads that file at the current position. Load definitions in the preamble and chapters in the body, just as in a single file.'),
 P('本课目录是组织示意，不能只创建空文件便期待得到完整结果。先放入实际章节文字、图片和 .bib 数据，再核对主文件中的相对路径。交付时把源文件与全部依赖一起复制到新目录，重新编译一次，确认没有依赖原电脑上的绝对路径。','The directory is an organizational sketch; empty files do not supply the full result. Add actual chapter text, an image, and bibliography records, then check paths in the main file. To deliver, copy sources and dependencies to a fresh directory and compile there to check for accidental absolute paths.')]
 };
 for(const lesson of L)lesson.explanations=notes[lesson.id]||[];
 const first=L.find(l=>l.id==='start');
 first.minutes=25;
 first.secondExample='make-latex-great-again';
 first.secondExplanation=P('先运行上方 Hello, LaTeX! 示例，再把编辑器中的整份源码替换为下面的第二个完整示例。title 改标题，date{} 隐藏日期；center 使其中的段落居中。花括号把 LARGE 与 bfseries 限制在标语内，par 在字号恢复前结束该段。最后一句应恢复普通字重。这里按原样输出 LaTex；要使用标准标志字形，可把该词替换成命令 \\LaTeX{}。','Run the Hello, LaTeX! source first, then replace the whole editor contents with this second complete example. title changes the title, date{} hides the date, and center centers its paragraphs. Braces keep LARGE and bfseries local to the slogan, and par ends that paragraph before its size resets. The final sentence should return to normal weight. LaTex is printed literally here; replace that word with \\LaTeX{} for the standard logo.');
 first.secondTask=P('先把居中的 LARGE 改成 Large，比较两次 PDF 的字号；再把标语中的 Great 改成 Clear，确认只有这一处变化。检查标题、Hello, LaTeX!、居中标语、自动编号的节标题与普通字重的结尾都出现。','Change the centered LARGE to Large and compare PDF sizes, then replace Great with Clear in that slogan only. Check the title, Hello, LaTeX!, centered slogan, numbered section, and normal-weight ending.');
 D.version='2.1.0';
})();
