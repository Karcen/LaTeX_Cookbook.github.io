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
 D.version='2.1.0';
})();
