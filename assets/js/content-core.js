/* Primary references checked against LaTeX Project, CTAN, and installed package manuals. */
(() => {
'use strict';
const D=window.ATELIER, R=String.raw;
const bi=(zh,en)=>({zh,en});
const sec=(zh,en,bz,be,code,math)=>({title:bi(zh,en),body:bi(bz,be),...(code?{code}:{}),...(math?{math}:{})});
const refs={ecosystem:'https://www.latex-project.org/help/documentation/',syntax:'https://www.latex-project.org/help/documentation/',classes:'https://ctan.org/pkg/latex-base',chinese:'https://ctan.org/pkg/ctex',characters:'https://www.latex-project.org/help/documentation/','math-environments':'https://ctan.org/pkg/amsmath','math-fonts':'https://ctan.org/pkg/amsfonts',tables:'https://ctan.org/pkg/array',floats:'https://ctan.org/pkg/latex-base',bibliography:'https://ctan.org/pkg/biblatex',crossrefs:'https://ctan.org/pkg/hyperref'};
function entry(id,module,zh,en,sz,se,syntax,sections,opts={}) {
D.entries.push({id,module,title:bi(zh,en),summary:bi(sz,se),level:'intermediate',keywords:[id,zh,en],packages:[],engines:['pdflatex','xelatex','lualatex'],syntax,sections,related:[],sources:[{label:'Official documentation / 官方文档',url:refs[module]}],...opts});
}
function example(id,zh,en,dz,de,engine,code,modules,files){D.examples.push({id,title:bi(zh,en),description:bi(dz,de),engine,code,modules,...(files?{files}:{})});}
const doc=(body,preamble='',cls='article',opts='11pt')=>`\\documentclass[${opts}]{${cls}}\n${preamble}\n\\begin{document}\n${body}\n\\end{document}\n`;
example('first-document','第一篇文档','First document','标题、摘要、章节与行内公式。','A title, abstract, section, and inline formula.','pdflatex',doc(R`\title{A first document}
\author{Jiacheng Zheng}
\date{}
\maketitle
\begin{abstract}A small, complete LaTeX document.\end{abstract}
\section{Introduction}
The identity $a^2+b^2=c^2$ is inline mathematics.

A blank line starts a new paragraph.`),['ecosystem','syntax','classes']);
example('class-report','报告与章节','Report chapters','报告类的目录、章和附录。','Chapters, contents, and an appendix in report.','pdflatex',doc(R`\title{Research report}\author{A. Researcher}\date{}\maketitle
\tableofcontents
\chapter{Data}\section{Sample}We observe a balanced panel.
\chapter{Results}\section{Estimates}The estimate is positive.
\appendix\chapter{Additional tables}Supplementary material.`, '', 'report','11pt,a4paper,oneside'),['classes']);
example('class-book','书籍的前置与正文','Book front matter','罗马页码、正文和后置部分。','Roman front matter, main matter, and back matter.','pdflatex',doc(R`\frontmatter
\title{A short book}\author{A. Author}\date{}\maketitle
\tableofcontents\chapter{Preface}A preface without a chapter number.
\mainmatter\chapter{Foundations}\section{Definitions}Main chapters are numbered.
\appendix\chapter{Proofs}Appendix chapters use letters.
\backmatter\chapter{Afterword}Final unnumbered material.`, '', 'book','11pt,a4paper,oneside,openany'),['classes']);
example('class-letter','正式信件','Formal letter','收信人、称呼、落款和附件。','Recipient, opening, signature, and enclosures.','pdflatex',doc(R`\begin{letter}{Editorial Office\\Example Journal}
\opening{Dear Editor,}
Please consider the enclosed manuscript for publication.
\closing{Sincerely,}
\encl{Manuscript; cover sheet}
\end{letter}`,R`\signature{A. Researcher}
\address{Department of Economics\\Example University}
\date{9 October 2026}`, 'letter','11pt'),['classes']);
example('class-minimal','minimal 的诊断用法','Minimal diagnostic class','隔离基础排版问题的小型测试。','A small test for isolating basic typesetting behavior.','pdflatex',doc('A plain test paragraph.\n\nAnother paragraph.','','minimal',''),['classes']);
example('class-standalone','独立 TikZ 图片','Standalone TikZ figure','紧裁剪的矢量图，没有外部图片。','A tightly cropped vector figure with no external image.','pdflatex',doc(R`\begin{tikzpicture}[>=stealth]
\draw[->] (0,0)--(3,0) node[right] {$x$};
\draw[->] (0,0)--(0,2) node[above] {$y$};
\draw[thick,teal] (0,0)--(2.5,1.5);
\node[above] at (1.5,.9) {$y=0.6x$};
\end{tikzpicture}`, '', 'standalone','tikz,border=5pt'),['classes']);
example('class-beamer','Beamer 文档类','Beamer class','16:9 幻灯片、主题、分栏和公式。','A 16:9 deck with a theme, columns, and mathematics.','pdflatex',doc(R`\frame{\titlepage}
\section{Model}
\begin{frame}{A simple model}
\begin{columns}[T]
\begin{column}{.48\textwidth}\begin{block}{Objective}$\max_x u(x)$\end{block}\end{column}
\begin{column}{.48\textwidth}\begin{itemize}\item One decision\item One constraint\end{itemize}\end{column}
\end{columns}
\end{frame}`,R`\usetheme{Madrid}
\title{A research presentation}\author{A. Researcher}\date{}
\setbeamertemplate{navigation symbols}{}`, 'beamer','aspectratio=169'),['classes','beamer']);
for(const [cls,body] of [
['ctexart',R`\title{中文短文}\author{研究者}\date{}\maketitle
\tableofcontents\section{研究问题}中文与 English 混排。公式为 $y=\alpha+\beta x$。
\subsection{数据说明}本示例使用随 TeX 发行版提供的 Fandol 字体。`],
['ctexrep',R`\tableofcontents\chapter{研究设计}\section{样本}第一章包含研究问题。
\chapter{实证结果}第二章包含估计结果。
\appendix\chapter{补充材料}附录。`],
['ctexbook',R`\frontmatter\tableofcontents\chapter{前言}正文之前的说明。
\mainmatter\chapter{基础知识}\section{定义}书籍正文。
\appendix\chapter{证明}附录。
\backmatter\chapter{后记}结束部分。`]]) {
example('class-'+cls,cls+' 中文文档',cls+' Chinese document','使用 Fandol 字体的可移植中文结构。','Portable Chinese structure using the Fandol font set.','xelatex',doc(body,cls==='ctexart'?R`\usepackage{amsmath,lmodern}`:R`\usepackage{amsmath}`,cls,'UTF8,fontset=fandol,zihao=-4,oneside'),['classes','chinese']);
}
example('class-ctexbeamer','ctexbeamer 中文幻灯片','Chinese ctexbeamer deck','官方中文适配类与 Fandol 字体。','The official Chinese adapter class with Fandol fonts.','xelatex',doc(R`\frame{\titlepage}
\begin{frame}{研究设计}\begin{block}{模型}$y=\alpha+\beta x+\varepsilon$\end{block}
\begin{itemize}\item 中文标题和正文\item English and mathematics\end{itemize}\end{frame}`,R`\usetheme{Madrid}\title{学术报告}\author{研究者}\date{}`, 'ctexbeamer','aspectratio=169,fontset=fandol'),['classes','chinese','beamer']);
example('beamer-ctex-package','Beamer 加载 ctex','Beamer with the ctex package','为既有 Beamer 模板添加中文支持。','Add Chinese support to an existing Beamer template.','xelatex',doc(R`\begin{frame}{中文报告}使用 beamer 文档类，并加载 ctex 宏包。\end{frame}`,R`\usepackage[UTF8,fontset=fandol]{ctex}`, 'beamer','aspectratio=169'),['classes','chinese','beamer']);
for(const [cls,body] of [
['scrartcl',R`\title{A KOMA article}\author{A. Author}\date{}\maketitle
\tableofcontents\section{Introduction}The class has sections, but no chapters.\subsection{Detail}A second level.`],
['scrreprt',R`\tableofcontents\chapter{A report}\section{Introduction}Chapter-based organization.
\appendix\chapter{Supplement}Additional material.`],
['scrbook',R`\frontmatter\tableofcontents\chapter{Preface}Front matter.
\mainmatter\chapter{Foundations}Numbered main matter.
\backmatter\chapter{Afterword}Back matter.`]]) {
example('class-'+cls,cls+' 排版',cls+' typesetting','使用 KOMA-Script 原生标题和版心接口。','Use KOMA-Script heading and type-area interfaces.','pdflatex',doc(body,R`\setkomafont{sectioning}{\normalfont\bfseries}`,cls,'fontsize=11pt,paper=a4,DIV=12,oneside'),['classes']);
}
example('class-scrlttr2','KOMA 正式信函','KOMA business letter','用具名变量设置发件人和主题。','Use named variables for sender and subject.','pdflatex',doc(R`\begin{letter}{Editorial Office\\Example Journal}
\opening{Dear Editor,}
Please find the manuscript enclosed.
\closing{Sincerely,}
\end{letter}`,R`\setkomavar{fromname}{A. Researcher}
\setkomavar{fromaddress}{Example University}
\setkomavar{subject}{Manuscript submission}`, 'scrlttr2','paper=a4,fontsize=11pt'),['classes']);
example('class-memoir','memoir 手册','Memoir manual','原生设置页边距、章节和页眉。','Configure margins, chapter style, and page style natively.','pdflatex',doc(R`\frontmatter\tableofcontents
\mainmatter\chapter{A manual}\section{Scope}A long-form document.
\appendix\chapter{Reference}Additional reference material.`,R`\setlrmarginsandblock{30mm}{25mm}{*}
\setulmarginsandblock{25mm}{25mm}{*}
\checkandfixthelayout\chapterstyle{default}`, 'memoir','11pt,a4paper,oneside'),['classes']);
example('class-exam','试卷与答案','Exam and solutions','题目、分值与可切换答案。','Questions, points, and switchable solutions.','pdflatex',doc(R`\begin{questions}
\question[5] Solve $2x=6$.
\begin{solution}Divide both sides by 2 to obtain $x=3$.\end{solution}
\question[5] State the derivative of $x^2$.
\begin{solution}The derivative is $2x$.\end{solution}
\end{questions}`,R`\printanswers`, 'exam','11pt,addpoints'),['classes','academic']);
example('class-moderncv','学术简历','Academic CV','不依赖照片的简历结构。','A CV structure without an external portrait.','pdflatex',doc(R`\makecvtitle
\section{Education}\cventry{2022--2026}{PhD}{Example University}{}{}{Research in economics.}
\section{Experience}\cventry{2025}{Research assistant}{Example Lab}{}{}{Data analysis and reproducible research.}`,R`\usepackage{lmodern}
\moderncvstyle{classic}\moderncvcolor{green}
\usepackage[scale=.8]{geometry}\name{Alex}{Researcher}\title{Academic CV}`, 'moderncv','11pt,a4paper,sans'),['classes','academic']);
example('class-tikzposter','学术海报','Academic poster','大纸张、标题和分块内容。','A large-format title and content blocks.','pdflatex',doc(R`\maketitle
\block{Research question}{What changes when information improves?}
\begin{columns}\column{.5}\block{Model}{$y=\alpha+\beta x+\varepsilon$}
\column{.5}\block{Results}{Describe the main finding.}\end{columns}`,R`\title{A research poster}\author{A. Researcher}\institute{Example University}\usetheme{Default}
% Correct the titletextscale key setter in tikzposter 2.0.
\makeatletter
\define@key{title}{titletextscale}{\gdef\TP@titletextscale{#1}}
\makeatother`, 'tikzposter','20pt,a1paper,portrait'),['classes','academic']);
example('chinese-fonts','中文字体与标题','Chinese fonts and headings','分开设置西文、中文和标题样式。','Set Latin, Chinese, and heading styles separately.','xelatex',doc(R`\section{研究背景}中文与 Latin 混排。
\subsection{模型}$y=\alpha+\beta x+\varepsilon$。
\begin{equation}\label{eq:model}y_i=\alpha+\beta x_i+\varepsilon_i\end{equation}
见公式 \eqref{eq:model}。`,R`\usepackage{amsmath}
\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]
\ctexset{section={format=\Large\bfseries},subsection={format=\large\bfseries}}
\setlength{\parindent}{2em}`, 'ctexart','UTF8,fontset=fandol,zihao=-4'),['chinese']);
example('xeCJK-direct','xeCJK 中文混排','Direct xeCJK typesetting','保留 article 标题格式，只添加中文字体。','Keep article headings while adding Chinese fonts.','xelatex',doc(R`\section{A bilingual note}这是中文。 This is English.`,R`\usepackage{xeCJK}\setCJKmainfont{FandolSong-Regular.otf}\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]`),['chinese']);
example('unicode-math-fonts','Unicode 数学字体','Unicode math fonts','以 OpenType 数学字体设置西文公式。','Use an OpenType mathematics font for formulas.','lualatex',doc(R`\[\symbb{R}\quad\symcal{F}\quad\symbf{\alpha}\quad\symup{d}x\]
\[\int_0^1 x^2\,\symup{d}x=\frac13\]`,R`\usepackage{amsmath}\usepackage{unicode-math}\setmathfont{Latin Modern Math}`),['chinese','math-fonts']);
example('special-characters','特殊字符完整示例','Special characters','文本转义、注释、原样输出与不换行空格。','Escaping, comments, literal output, and a nonbreaking space.','pdflatex',doc(R`A rate of 5\%, a price of \$10, A\&B, item \#1, file\_name.
Braces: \{x\}. Backslash: \textbackslash.
Tilde: \textasciitilde. Caret: \textasciicircum.
% This comment does not appear in the PDF.
Section~2 is connected by a nonbreaking space.
\verb|a_b%#&|
\begin{verbatim}
\command{a_b%#&}
\end{verbatim}
\texttt{\detokenize{file_name.tex}}`),['characters']);
example('math-environments','数学环境组合','Math environments','对齐、分段函数、矩阵与统一编号。','Alignment, cases, matrices, and grouped numbering.','pdflatex',doc(R`\begin{equation}\label{eq:one}E=mc^2\end{equation}
\begin{align}a+b&=c\\a&=c-b\end{align}
\begin{equation}\begin{aligned}f(x)&=x^2+2x+1\\&=(x+1)^2\end{aligned}\end{equation}
\begin{gather}x+y=1\\x-y=0\end{gather}
\begin{multline}a+b+c+d+e+f+g+h\\=i+j+k+l\end{multline}
\begin{equation}\begin{split}(a+b)^2&=a^2+2ab+b^2\\&=b^2+2ab+a^2\end{split}\end{equation}
\[ f(x)=\begin{cases}x^2&\text{if }x\ge0,\\-x&\text{otherwise.}\end{cases}\]
\[A=\begin{pmatrix}1&2\\3&4\end{pmatrix}\]
\begin{subequations}\label{eq:system}\begin{align}x+y&=1\label{eq:sysa}\\x-y&=0\end{align}\end{subequations}
Equation~\eqref{eq:one}; system~\eqref{eq:system}.`,R`\usepackage{amsmath}`),['math-environments']);
example('math-alphabet-comparison','数学字体对照','Math alphabet comparison','相同字母的数学字族与运算符。','Compare mathematical alphabets and operator spacing.','pdflatex',doc(R`\[\mathbb{R}\quad\mathcal{F}\quad\mathscr{F}\quad\mathfrak{g}\]
\[\mathrm{ABC}\quad\mathbf{ABC}\quad\mathit{ABC}\quad\mathsf{ABC}\quad\mathtt{ABC}\]
\[\boldsymbol{\alpha}\quad\bm{\alpha}\quad\mathbf{x}\]
\[\operatorname{rank}(A)=2,\quad \argmax_{x\in\mathbb{R}}f(x)\]
\[P(X>0)=\tfrac12\quad\text{under symmetry.}\]`,R`\usepackage{amsmath,amssymb,mathrsfs,bm}
\DeclareMathOperator*{\argmax}{arg\,max}`),['math-fonts']);
example('table-regression','经济学回归表','Economics regression table','三线表、标准误、样本量与表注。','Rules, standard errors, sample size, and notes.','pdflatex',doc(R`\begin{table}[htbp]\centering
\begin{threeparttable}\caption{Illustrative regression estimates}\label{tab:reg}
\begin{tabular}{lcc}\toprule
& (1) & (2)\\\midrule
Treatment & $0.24^{**}$ & $0.21^{**}$\\
& $(0.08)$ & $(0.09)$\\
Controls & No & Yes\\
Observations & 480 & 480\\
$R^2$ & 0.18 & 0.24\\\bottomrule
\end{tabular}
\begin{tablenotes}\footnotesize\item Notes: Synthetic teaching data. Robust standard errors in parentheses. $^{**}p<0.05$.\end{tablenotes}
\end{threeparttable}\end{table}
Table~\ref{tab:reg} reports illustrative results.`,R`\usepackage{booktabs,threeparttable}`),['tables','floats']);
example('table-descriptive','描述统计表','Descriptive statistics','siunitx 按小数点对齐均值和标准差。','Align means and standard deviations with siunitx.','pdflatex',doc(R`\begin{table}[htbp]\centering\caption{Synthetic descriptive statistics}
\begin{tabular}{lS[table-format=2.2]S[table-format=2.2]S[table-format=3.0]}\toprule
Variable & {Mean} & {SD} & {N}\\\midrule
Age & 34.25 & 8.16 & 480\\
Income & 12.50 & 5.23 & 480\\\bottomrule\end{tabular}\end{table}`,R`\usepackage{booktabs,siunitx}`),['tables']);
example('table-correlation','相关系数矩阵','Correlation matrix','清晰列名与下三角矩阵。','Named columns and a lower triangular matrix.','pdflatex',doc(R`\begin{table}[htbp]\centering\caption{Synthetic correlations}
\begin{tabular}{lrrr}\toprule & Income & Age & Education\\\midrule
Income & 1.00 & &\\Age & 0.28 & 1.00 &\\Education & 0.45 & 0.12 & 1.00\\\bottomrule\end{tabular}\end{table}`,R`\usepackage{booktabs}`),['tables']);
example('table-longtable','跨页数据表','Multipage data table','四类表头表尾、题注、标签与 90 行数据。','Four header/footer regions, caption, label, and 90 rows.','pdflatex',doc(R`\begin{longtable}{@{}rll@{}}
\caption{Synthetic panel observations}\label{tab:panel}\\
\toprule ID & Group & Observation\\\midrule\endfirsthead
\multicolumn{3}{l}{Table \thetable\ continued}\\
\toprule ID & Group & Observation\\\midrule\endhead
\midrule\multicolumn{3}{r}{Continued on next page}\\\endfoot
\bottomrule\endlastfoot
`+Array.from({length:90},(_,i)=>`${i+1} & Group ${i%3+1} & Teaching observation \\\\`).join('\n')+R`
\end{longtable}
See Table~\ref{tab:panel}.`,R`\usepackage{longtable,booktabs}`),['tables']);
example('table-tabularx','自动列宽表格','Flexible-width table','X 列吸收可用宽度并自动换行。','An X column fills the available width and wraps text.','pdflatex',doc(R`\noindent\begin{tabularx}{\linewidth}{@{}lXr@{}}\toprule
Item & Explanation & Count\\\midrule
A & A long description wraps naturally inside the flexible-width column. & 12\\
B & The total width equals the current line width. & 4\\\bottomrule\end{tabularx}`,R`\usepackage{tabularx,booktabs}`),['tables']);
example('table-merged','合并单元格','Merged table cells','列合并、行合并和局部横线。','Column spans, row spans, and partial rules.','pdflatex',doc(R`\begin{tabular}{lrr}\toprule
&\multicolumn{2}{c}{Results}\\\cmidrule(lr){2-3}
Group & Mean & SD\\\midrule
\multirow{2}{*}{A} & 4.2 & 1.1\\ & 4.5 & 1.2\\\bottomrule
\end{tabular}`,R`\usepackage{booktabs,multirow}`),['tables']);
example('table-tabularray','tabularray 声明式表格','Declarative tabularray table','用列规格和单元格键设置样式。','Style columns and cells through key-value specifications.','pdflatex',doc(R`\begin{tblr}{colspec={lrr},row{1}={font=\bfseries},hlines}
Item & Mean & SD\\A & 4.2 & 1.1\\B & 5.0 & 1.3\\
\end{tblr}`,R`\usepackage{tabularray}`),['tables']);
example('float-subcaptions','双子图与引用','Two subfigures and references','用规则绘制占位图，示范子题注，无需外部图片文件。','Draw placeholder shapes and show subcaptions without external image files.','pdflatex',doc(R`\begin{figure}[htbp]\centering
\begin{subfigure}{.45\linewidth}\centering\rule{\linewidth}{25mm}\caption{First panel}\label{fig:a}\end{subfigure}\hfill
\begin{subfigure}{.45\linewidth}\centering\rule{\linewidth}{25mm}\caption{Second panel}\label{fig:b}\end{subfigure}
\caption{A two-panel illustration}\label{fig:both}\end{figure}
Figure~\ref{fig:both} contains panels~\subref{fig:a} and~\subref{fig:b}.`,R`\usepackage{graphicx,subcaption}`),['floats','crossrefs']);
example('float-placement-demo','浮动体边界','Float boundary','将标签放在题注后，并设置浮动体边界。','Keep the label after the caption and enforce a boundary.','pdflatex',doc(R`\section{Results}The figure belongs to this section.
\begin{figure}[htbp]\centering\fbox{\rule{0pt}{20mm}\rule{.7\linewidth}{0pt}}\caption{Illustrative result}\label{fig:result}\end{figure}
\FloatBarrier
\section{Discussion}Figure~\ref{fig:result} stays before this boundary.`,R`\usepackage{placeins}`),['floats']);
const sampleBib=R`@book{knuth1984,
  author = {Knuth, Donald E.},
  title = {The {TeX}book},
  year = {1984},
  publisher = {Addison-Wesley}
}
@article{demo2024,
  author = {Researcher, Alex and Writer, Sam},
  title = {A synthetic teaching example},
  journal = {Example Journal},
  year = {2024},
  volume = {1},
  pages = {1--12},
  note = {Fictional data for a bibliography demonstration}
}
`;
example('bibliography-natbib','natbib 与 BibTeX','Natbib and BibTeX','叙述式和括号式引用，附带 refs.bib。','Textual and parenthetical citations with refs.bib.','pdflatex',doc(R`\section{Background}\citet{knuth1984} describes TeX.
A related example is discussed elsewhere \citep[see][p.~3]{demo2024}.
Authors only: \citeauthor{knuth1984}; year only: \citeyear{knuth1984}.
\bibliographystyle{plainnat}\bibliography{refs}`,R`\usepackage[authoryear,round]{natbib}\usepackage[hidelinks]{hyperref}`),['bibliography'],{'refs.bib':sampleBib});
example('bibliography-biblatex','biblatex 与 Biber','Biblatex and Biber','UTF-8 文献数据、引用与文献表。','UTF-8 bibliography data, citations, and bibliography.','pdflatex',doc(R`\textcite{knuth1984} describes TeX.
A related example \parencite[see][3]{demo2024} is fictional.
\printbibliography`,R`\usepackage{csquotes}
\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{refs.bib}\usepackage[hidelinks]{hyperref}`),['bibliography'],{'refs.bib':sampleBib});
example('bibliography-gb7714','GB/T 7714 文献表','GB/T 7714 bibliography','中文文档、国标样式和 Biber。','A Chinese document, GB/T style, and Biber.','xelatex',doc(R`\section{参考文献示例}引用一本书\cite{knuth1984}。
\printbibliography`,R`\usepackage[backend=biber,style=gb7714-2015]{biblatex}
\addbibresource{refs.bib}`, 'ctexart','UTF8,fontset=fandol'),['bibliography','chinese'],{'refs.bib':sampleBib});
example('hyperref-cleveref','目录、书签和智能引用','Contents, bookmarks, and smart references','稳定标签、PDF 元数据及自动名称。','Stable labels, PDF metadata, and automatic reference names.','pdflatex',doc(R`\tableofcontents
\section{Model}\label{sec:model}
\begin{equation}\label{eq:model}y=\alpha+\beta x\end{equation}
See \cref{sec:model,eq:model}; page~\pageref{eq:model}.
\href{https://www.latex-project.org/}{LaTeX Project}.
\section*{Acknowledgements}\phantomsection\addcontentsline{toc}{section}{Acknowledgements}
Thanks to the contributors.`,R`\usepackage{amsmath}
\usepackage[colorlinks=true,linkcolor=blue,urlcolor=blue,citecolor=blue,pdftitle={Reference demonstration},pdfauthor={A. Author}]{hyperref}
\usepackage{bookmark}\usepackage[nameinlink,noabbrev]{cleveref}`),['crossrefs']);
entry('tex-ecosystem','ecosystem','TeX、LaTeX 与 LaTeX3','TeX, LaTeX, and LaTeX3','区分排版引擎、宏格式和编程接口。','Distinguish typesetting engines, formats, and programming interfaces.',R`tex file.tex
pdflatex file.tex`,[
sec('引擎与格式','Engines and formats','TeX 是排版系统及其语言。LaTeX 是建立在 TeX 上的宏格式，提供章节、交叉引用和文档类等结构。pdfTeX、XeTeX 和 LuaTeX 是不同的引擎；pdfLaTeX、XeLaTeX 和 LuaLaTeX 表示引擎加载 LaTeX 格式运行。','TeX supplies the typesetting language and machinery. LaTeX is a macro format that adds document classes, sections, references, and other document structures. pdfLaTeX, XeLaTeX, and LuaLaTeX run the LaTeX format on three different engines.'),
sec('LaTeX2e 与 expl3','LaTeX2e and expl3','LaTeX2e 是常用文档接口的名称。LaTeX3 的 expl3 提供一致命名、数据类型与编程工具，已整合进现代 LaTeX 内核。写普通文档仍可使用熟悉的 documentclass 和 usepackage。','LaTeX2e names the familiar document interface. LaTeX3 provides the expl3 programming layer, with consistent names and data types, integrated into modern LaTeX kernels. Ordinary documents continue to use documentclass and usepackage.'),
sec('ConTeXt 与兼容性','ConTeXt and compatibility','ConTeXt 是另一套 TeX 宏格式，有自己的文档接口，通常不能直接使用 LaTeX 宏包。排查命令错误时，先确认源码所需的格式，再检查编译引擎。','ConTeXt is a separate TeX format with its own document interfaces. LaTeX packages generally cannot be used directly in ConTeXt. When a command fails, check the format expected by the source, then the selected engine.')],{level:'beginner',example:'first-document',related:['engines','distributions','commands-groups']});
entry('distributions','ecosystem','发行版、编辑器与在线平台','Distributions, editors, and online platforms','安装工具链与选择编辑界面是两件事。','The toolchain and the editing interface are separate choices.',R`tlmgr info amsmath
latexmk -pdf main.tex`,[
sec('安装内容','What a distribution installs','TeX Live 提供跨平台的引擎、宏包、字体和辅助程序。MacTeX 是面向 macOS 的 TeX Live 发行套装。MiKTeX 是另一套发行版，支持宏包管理和按需安装；具体界面取决于系统与版本。','TeX Live distributes engines, packages, fonts, and auxiliary tools across platforms. MacTeX packages TeX Live for macOS. MiKTeX is another distribution with its own package management and on-demand installation behavior.'),
sec('编辑方式','Editing workflows','Overleaf、TeXPage 提供浏览器中的编辑与远程编译。VS Code 加 LaTeX Workshop 通常调用本地发行版；安装扩展不会自动安装 TeX。在线服务的免费额度和引擎版本可能变化，应查看项目设置。','Overleaf and TeXPage combine browser editing with remote compilation. VS Code with LaTeX Workshop normally invokes an installed local toolchain; installing the extension does not install TeX. Hosted limits and available versions should be checked in project settings.'),
sec('缺包与可复现性','Missing packages and reproducibility','缺少的宏包通过发行版包管理器安装，并记录 TeX Live 年份和编译引擎。项目中的 sty 文件会覆盖同名系统版本；引入本地副本前，先查看日志中的实际加载路径与版本。','Install missing packages through the distribution manager and record the distribution year and engine. A local sty file can shadow the maintained system copy. Inspect the loaded file path and version in the log before vendoring a package.')],{level:'beginner',example:'first-document',related:['engines','project-files'],sources:[{label:'TeX Live documentation',url:'https://tug.org/texlive/doc.html'},{label:'MiKTeX documentation',url:'https://docs.miktex.org/'}]});
entry('engines','ecosystem','pdfLaTeX、XeLaTeX 与 LuaLaTeX','pdfLaTeX, XeLaTeX, and LuaLaTeX','按字体、中文支持与模板要求选择引擎。','Choose an engine for fonts, language support, and template requirements.',R`pdflatex main.tex
xelatex main.tex
lualatex main.tex`,[
sec('字体和 Unicode','Fonts and Unicode','pdfLaTeX 常用于传统 Type 1 字体和成熟期刊模板，现代 LaTeX 默认读取 UTF-8，但任意 Unicode 字符仍需对应字体和宏支持。XeLaTeX 和 LuaLaTeX 原生处理 Unicode，并通过 fontspec 使用 OpenType 字体。','pdfLaTeX works well with traditional font packages and established journal templates. UTF-8 input does not guarantee that every Unicode character has an available glyph. XeLaTeX and LuaLaTeX support Unicode natively and use OpenType fonts through fontspec.'),
sec('中文后端','Chinese backends','ctex 在 XeLaTeX 下使用 xeCJK，在 LuaLaTeX 下通常使用 LuaTeX-ja，在 pdfLaTeX 下使用 CJK 字体机制。fontset=fandol 适用于 XeLaTeX 和 LuaLaTeX 的便携示例；pdfLaTeX 的字体配置采用另一套机制。','ctex uses engine-specific Chinese support: xeCJK for XeLaTeX, normally LuaTeX-ja for LuaLaTeX, and CJK mechanisms for pdfLaTeX. Fandol is a portable choice for the Unicode engines; its configuration is not interchangeable with pdfLaTeX font handling.'),
sec('诊断与编译链','Diagnosis and build chains','日志首行说明运行的引擎。fontspec 报错要求 XeTeX 或 LuaTeX 时，修改编译配置。生成 PDF 后，文献与引用仍可能需要 BibTeX、Biber 或再次运行 LaTeX；引擎与文献后端分别选择。','The first log line identifies the engine. If fontspec requests XeTeX or LuaTeX, change the build configuration. Bibliographies and references may require external tools and repeated LaTeX runs after a PDF first appears; the bibliography backend is a separate choice.')],{level:'beginner',example:'chinese-fonts',related:['ctex','fontspec','bibtex','biblatex'],sources:[{label:'TeX Live guide',url:'https://tug.org/texlive/doc/texlive-en/texlive-en.html'},{label:'fontspec',url:'https://ctan.org/pkg/fontspec'}]});
entry('project-files','ecosystem','工程文件与辅助文件','Project and auxiliary files','认识源文件、日志、交叉引用与文献产物。','Identify source files, logs, references, and bibliography artifacts.',R`main.tex  style.sty  thesis.cls  refs.bib
main.aux  main.log  main.toc  main.bbl  main.bcf`,[
sec('可编辑源文件','Editable sources','tex 包含文档，sty 定义宏包，cls 定义文档类。bib 存储文献数据；bst 是 BibTeX 样式程序，不能当作 biblatex 样式直接加载。图片、数据和本地字体也可能是项目输入。','A tex file contains the document; sty and cls files define packages and classes. A bib file stores bibliographic records, while a bst file is a BibTeX style program, not a biblatex style. Images, data, and local fonts may also be required inputs.'),
sec('编译产物','Build artifacts','aux 保存标签与引用请求，toc 保存目录内容，log 记录错误和版本。BibTeX 或 Biber 生成 bbl；biblatex 通过 bcf 给 Biber 传递处理要求。bbl 的格式随文献系统而异，不能互换。','The aux file stores labels and citation requests, the toc file stores contents entries, and the log records diagnostics and versions. BibTeX or Biber produces a bbl file. With biblatex, the bcf file carries instructions to Biber; bbl formats differ between systems.'),
sec('清理与交付','Cleaning and delivery','辅助文件清理后可重新生成，但需要完整重编译。投稿系统有时要求提交 bbl，因为系统不会运行文献后端，具体按期刊说明处理。版本管理一般保留源文件和必要资源；缓存随构建更新。','Generated auxiliaries can usually be rebuilt, but cleaning requires a complete subsequent build. Submission systems sometimes require a bbl because they do not run the bibliography backend. Keep source inputs under version control and follow the receiving system’s delivery instructions.')],{level:'beginner',example:'bibliography-biblatex',related:['bibtex','biblatex','cross-references']});
entry('mwe','syntax','最小工作示例与导言区','Minimal working examples and preambles','从完整小文档开始定位问题。','Diagnose a problem in a complete, small document.',R`\documentclass[11pt]{article}
\usepackage{amsmath}
\begin{document}
\[a^2+b^2=c^2\]
\end{document}`, [
sec('文档边界','Document boundaries','documentclass 选择一个文档类；方括号传递选项。usepackage 在导言区加载依赖。begin{document} 之前主要放配置，之后放正文；end{document} 结束处理。每个独立示例必须包含这套边界。','documentclass selects one class and optional class settings. usepackage loads dependencies in the preamble. Configuration precedes begin{document}; document content follows it. end{document} ends processing. An independently compilable example needs this complete structure.'),
sec('缩小问题','Reducing a failure','保留能触发错误的最少正文、宏包和自定义定义。删除无关图片和章节后仍要确认问题存在。对比加入某个宏包前后的日志，能区分源码错误与加载顺序问题。','Retain the smallest body, dependencies, and definitions that reproduce the failure. Confirm that the problem remains after unrelated chapters and images are removed. Compare logs before and after loading a suspect package to identify ordering or compatibility problems.'),
sec('检查结果','Checking the result','先修复日志中的第一条 Error，再判断后续连锁错误。目录和标签可能需要第二次运行。验证生成的 PDF 时，还应查看引用、字体和 overfull 诊断是否影响实际文档。','Repair the first error before interpreting later cascading messages. Contents and labels may require another run. To validate the PDF, inspect unresolved references, missing glyphs, and layout diagnostics that affect the document.')],{level:'beginner',example:'first-document',related:['commands-groups','engines','project-files']});
entry('commands-groups','syntax','命令、参数、环境与作用域','Commands, arguments, environments, and scope','理解反斜杠、方括号、花括号与局部设置。','Understand backslashes, brackets, braces, and local settings.',R`\textbf{Important}
{\small Local text}
\begin{enumerate}\item First\end{enumerate}`, [
sec('参数读取','Argument parsing','控制词由反斜杠和字母组成，如 textbf；控制符由反斜杠和一个非字母组成，如 %。花括号通常界定必选参数。方括号是否表示可选参数，取决于具体命令的定义。','Control words use a backslash followed by letters, as in textbf. A control symbol uses a backslash and one nonletter. Braces commonly delimit mandatory arguments. Optional bracket arguments exist only when the command’s definition explicitly supports them.'),
sec('分组与环境','Groups and environments','花括号分组让字号、颜色等声明通常只在组内生效。环境通过 begin/end 配对，并常建立自己的分组。textbf 接收文本参数，而 bfseries 是字体声明；两者适合不同的作用范围。','A braced group normally localizes font, color, and other assignments. Environments pair begin and end and often establish groups of their own. textbf takes a text argument; bfseries is a declaration whose effective scope must be managed.'),
sec('常见参数错误','Common argument errors','遗漏右花括号可能使后面的正文进入参数；环境名称不匹配也会引发连锁错误。命令与必选参数之间的空段落需要接口支持。定义能接收段落的命令时，需理解 long 宏或现代命令接口的行为。','A missing closing brace can absorb following text into an argument. Mismatched environment names can produce cascades. Paragraph breaks between a command and its argument require an interface that supports them. Definitions that accept paragraphs need suitable macro interfaces.')],{level:'beginner',example:'first-document',related:['escapes','paragraphs']});
entry('paragraphs','syntax','空格、注释与段落','Spaces, comments, and paragraphs','源代码的换行与排版的段落有不同作用。','Source line breaks and typeset paragraphs have different roles.',R`One source line
continues the same paragraph.

A new paragraph.
Text% suppresses the end-of-line space
continues.`, [
sec('空白规则','Whitespace rules','普通文本中的多个空格通常合并成一个；单次源码换行通常相当于空格。一个或多个空行结束段落。控制词之后用于结束命令名的空格会被读取掉，必要时用空组或显式空格保留分隔。','Runs of ordinary spaces generally collapse to one, and a single source newline usually behaves as a space. Blank lines end a paragraph. A space terminating a control word is consumed; an empty group or explicit space may be needed afterward.'),
sec('注释与连接','Comments and joining','百分号使本行剩余内容不参与排版，也吞掉行末空格。它常用于宏定义中防止多余空白，正文里误写百分号却可能隐藏右花括号。排版百分比时使用转义后的百分号。','A percent sign comments out the remainder of its line, including the newline. This is useful for suppressing unintended whitespace in macro definitions. An accidental percent in prose can hide a closing brace; use the escaped percent to print a percentage.'),
sec('段落设计','Paragraph design','空行或 par 建立段落，段落缩进和段间距通过长度或宏包设置。双反斜杠强制换行，属于另一种排版操作；在窄栏中频繁使用，常会导致 underfull 警告。','Blank lines or par establish paragraphs; document settings control their indentation and spacing. A forced line break is a separate operation and can produce poor justification when used repeatedly in narrow columns.')],{level:'beginner',example:'special-characters',related:['percent','linebreaks']});
const classRecords=[
['article','短篇文章与论文','Articles and short papers','first-document',R`\documentclass[11pt,a4paper,oneside]{article}`,
'适合短论文、作业和技术说明。章节从 section 开始，可使用 part、subsection、subsubsection、paragraph 和 subparagraph；没有 chapter。默认单面、单栏，标题通常与正文同页。','Use article for short papers, assignments, and technical notes. Sectioning starts at section, with part above it and several subordinate levels. There is no chapter. Standard defaults are one-sided and one-column, with an in-page title.',
'标准字号为 10pt、11pt、12pt；常用 a4paper、letterpaper、twoside、twocolumn、titlepage 和 fleqn。字号选项只接受该类支持的值。geometry 改页边距，amsmath 增加数学结构，中文可加载 ctex。','Standard sizes are 10pt, 11pt, and 12pt. Useful options include a4paper, letterpaper, twoside, twocolumn, titlepage, and fleqn. geometry controls margins and amsmath supplies math environments; ctex can add Chinese support.',
'report 和 book 提供章层级及其编号、分页机制，适合需要 chapter 的文档。单独定义 chapter 无法复现整套机制。期刊投稿采用期刊指定的类与宏包。','report and book supply chapters with their numbering and page behavior. Defining chapter alone does not reproduce that system. For journal submissions, use the publisher’s prescribed class and dependencies.'],
['report','研究报告与章结构','Reports with chapters','class-report',R`\documentclass[11pt,a4paper,oneside]{report}`,
'适合章式研究报告和中等长度学位文档。支持 part、chapter、section 及以下层级，chapter 默认换页，标题默认独立成页。与 book 相比通常更适合单面报告。','Use report for chapter-based research reports and medium-length theses. It supports part, chapter, section, and subordinate levels. Chapters begin on a new page and the title normally has its own page.',
'10pt、11pt、12pt 和纸张选项与 article 类似。默认 oneside、openany；twoside 影响内外边距及页眉。appendix 后 chapter 使用字母编号，目录需要重复编译。','Sizes and paper options follow the standard-class conventions. report defaults to oneside and openany. twoside changes inner and outer page behavior. appendix switches chapter numbering to letters; contents need repeated runs.',
'report 不提供 book 的完整 frontmatter/mainmatter/backmatter 接口。前置部分可明确设置 pagenumbering，学校论文规则还应由模板约束。中文报告优先考虑 ctexrep。','report does not supply book’s full frontmatter/mainmatter/backmatter interface. Set front-matter page numbering explicitly where required, and follow institutional formatting rules. ctexrep is a convenient Chinese counterpart.'],
['book','书籍与前置部分','Books and front matter','class-book',R`\documentclass[11pt,twoside,openright]{book}`,
'适合书籍、长篇手册和章式论文。支持章级结构，默认双面并在右页开始新章；因此可能插入空白页。默认页眉包含章节信息，正文前后的组织比 report 更完整。','Use book for books, manuals, and long chapter-based documents. It defaults to two-sided pages and right-hand chapter openings, which may insert blank pages. Running headings and front/main/back matter support long-form organization.',
'frontmatter 使用罗马页码并取消章编号；mainmatter 恢复阿拉伯页码和章编号；backmatter 取消章编号但继续正文页码。appendix 把章编号改成字母，通常放在 backmatter 之前。','frontmatter uses Roman pages and unnumbered chapters. mainmatter restores Arabic pages and numbered chapters. backmatter suppresses chapter numbering while continuing page numbers. appendix changes chapter numbers to letters and commonly precedes backmatter.',
'屏幕阅读稿可用 oneside,openany，双面排版中的空白页则可能是正常章起始页。book 通常没有 article 的 abstract 环境；前言可用 chapter。页眉高度和章首页的 plain 页式需要分别处理。','For a screen-reading version, oneside and openany avoid facing-page constraints. Blank opening pages may be intentional. book does not provide article’s abstract environment by default; use a chapter for a preface and account for plain chapter-opening pages.'],
['letter','正式信件','Formal letters','class-letter',R`\documentclass[11pt]{letter}`,
'letter 用收信地址、opening、closing 和 signature 组织信件，不以章节为主。一个文件可包含多个 letter 环境，每封信有自己的收信人和开头。','letter structures correspondence around a recipient address, opening, closing, and signature rather than chapters. Several letter environments can appear in one file, each with its own recipient and salutation.',
'address 设置发件地址，signature 设置签名；letter 的必选参数是收件地址，双反斜杠用于地址内换行。encl 和 cc 设置附件与抄送。常用 10pt 至 12pt 字号和 a4paper。','address sets the sender address and signature the signatory. The mandatory letter argument contains the recipient address, with line breaks inside it. encl and cc add enclosures and copied recipients. Standard size and paper options are available.',
'letter 围绕收信人、称呼和落款组织信件，maketitle、chapter 和文章摘要结构不适用于这套接口。复杂企业信头和定位需求可选 scrlttr2。中文信件可以加载 ctex，称呼、落款和日期文本按实际通信习惯编写。','letter uses recipient, salutation, and closing interfaces; article title and abstract structures and the chapter command do not apply. scrlttr2 offers richer business-letter layout control. ctex can supply Chinese text; wording for salutations, closings, and dates follows the correspondence’s conventions.'],
['minimal','低层排版诊断','Low-level diagnostic class','class-minimal',R`\documentclass{minimal}`,
'minimal 用于验证基础排版或隔离底层问题，只提供少量文档功能。它缺少普通文章的章节、标题、列表及许多字号命令，日常论文通常使用功能完整的文档类。','minimal is a diagnostic class for basic typesetting and low-level problems. It supplies few document features and lacks ordinary article sectioning, titles, lists, and many font-size commands. Everyday papers normally use a class with those facilities.',
'最小工作示例通常仍用 article，做法是删去与问题无关的代码。minimal 类的选项和接口很有限，article 中可用的设置需逐项确认。','A minimal working example normally uses article with irrelevant code removed. The minimal class has few options and interfaces, so settings available in article need to be checked individually.',
'若宏包需要 section 或 normal-sized display settings 等类接口，在 minimal 下失败可能是测试环境造成的。改用 article 再复现问题；需要裁剪图形时使用 standalone。','A package may depend on interfaces missing from minimal, so a failure can be caused by the diagnostic class itself. Reproduce it under article as well. Use standalone when the actual requirement is cropped graphics.'],
['standalone','独立图形与公式','Standalone figures and formulas','class-standalone',R`\documentclass[tikz,border=5pt]{standalone}`,
'standalone 编译独立图形或公式，并把 PDF 页面裁剪到内容边界。tikz 选项加载 TikZ 并识别 tikzpicture，border 给边缘留空白；适合可复用矢量图和论文插图。','standalone compiles a separate figure or formula and crops the PDF page to its content. The tikz option loads TikZ support, and border supplies padding. This is useful for reusable vector graphics and paper figures.',
'独立公式可用正文中的行内数学或专门的预览环境，避免依赖普通文章页宽。主文档可用 graphicx 插入已编译 PDF，或使用 standalone 宏包的 includestandalone 接口。','For formulas, keep the content independent of an ordinary article page width. A main document can include the compiled PDF through graphicx or use the standalone package’s includestandalone interface.',
'自动转换成 PNG/SVG 或重建子文件可能需要外部程序和 shell escape；普通独立 PDF 编译则可直接完成。裁剪不正确时检查 preview/multi 设置和多段落内容。书籍等长文本应使用按页组织内容的文档类。','Image conversion or automatic rebuilding can require external programs and shell escape; an ordinary standalone PDF does not. Investigate preview/multi settings and paragraph content if cropping is wrong. Use a document class designed for pages when producing long text.'],
['beamer','幻灯片文档类','Presentation class','class-beamer',R`\documentclass[aspectratio=169]{beamer}`,
'Beamer 把内容装进 frame，并用 overlay 控制逐步显示。同一 frame 可能生成多张 PDF 页面；section 用于导航结构，不会自动创建普通论文式章节正文。默认页面比例是 4:3。','Beamer places content in frames and uses overlays for staged display. One frame may produce several PDF pages. Sections organize navigation rather than ordinary paper chapters. The default slide aspect ratio is 4:3.',
'aspectratio=169 选择 16:9；常用字号与主题接口属于 Beamer 自身。它已加载 hyperref、xcolor 及数学支持，theme 改整体外观，colortheme 和 fonttheme 分别改颜色与字体。','aspectratio=169 selects 16:9. Size and theme options follow Beamer’s own interfaces. Beamer already loads hyperref, xcolor, and math support. Themes, color themes, and font themes adjust different aspects of the presentation.',
'原样代码需要 fragile frame；普通文章的浮动体定位和页面页眉方案不适合直接照搬。内容过多应拆分 frame，检查公式与 columns 是否越界。中文可用 ctexbeamer 或 beamer 加 ctex。','Verbatim code requires a fragile frame. Article float placement and running-header schemes do not transfer directly. Split crowded frames and inspect formulas and columns for overflow. Chinese can use ctexbeamer or beamer with ctex.'],
['ctexart','中文文章类','Chinese article class','class-ctexart',R`\documentclass[UTF8,fontset=fandol,zihao=-4]{ctexart}`,
'ctexart 基于 article，添加中文字体、标点、标题名称和中文字号等配置。章节从 section 开始，没有 chapter；适合中文短论文、作业和技术说明。它是文档类，ctex.sty 是宏包。','ctexart extends article with Chinese fonts, punctuation, heading names, and Chinese size settings. It starts sectioning at section and has no chapter. It is a class; ctex.sty is a package that can be used with other classes.',
'zihao=-4 表示小四号。fontset=fandol 在 XeLaTeX/LuaLaTeX 下选择发行版字体，避免依赖 Windows 或 macOS 字体。ctexset 配置章节样式；oneside、twoside 和纸张设置继承文章的布局思路。','zihao=-4 selects the Chinese xiaosi size. With XeLaTeX or LuaLaTeX, fontset=fandol uses distribution fonts instead of operating-system fonts. ctexset configures headings, while paper and sidedness options follow the article layout model.',
'ctexart 已配置中文字体后端，无需重复加载 xeCJK。中文主字体使用 CJK 接口，西文字体使用 fontspec 接口。学校要求的字号、页眉和目录需按规范设置。需要章结构时使用 ctexrep 或 ctexbook。','ctexart configures the Chinese font backend, so xeCJK needs no separate loading. Use CJK interfaces for Chinese fonts and fontspec interfaces for Latin fonts. Set sizes, headers, and contents to the institution’s requirements. ctexrep and ctexbook provide chapters.'],
['ctexrep','中文报告类','Chinese report class','class-ctexrep',R`\documentclass[UTF8,fontset=fandol,zihao=-4]{ctexrep}`,
'ctexrep 在 report 的章结构上提供中文标题和排版设置。chapter 通常另起一页，section 属于章内；适合中等长度中文报告和需要章编号的研究文档。','ctexrep adds Chinese typesetting and headings to report’s chapter structure. Chapters normally begin on new pages, with sections inside them. It suits Chinese reports and research documents that require chapter numbering.',
'zihao、fontset、scheme 控制中文字号、字体和排版方案；ctexset 可设置 chapter/name、number、format 和间距。标准纸张和单双面选项仍可使用。中文示例选择 XeLaTeX 与 Fandol。','zihao, fontset, and scheme control Chinese size, font selection, and conventions. ctexset configures chapter names, numbering, formatting, and spacing. Standard paper and sidedness options remain available. The example uses XeLaTeX and Fandol.',
'ctexrep 与 ctexbook 提供的前置部分接口不同，使用 frontmatter 前需核对所选类。标题设置由 titlesec 或 ctexset 中的一套接口负责，再配置目录和页眉规则。','ctexrep and ctexbook have different front-matter interfaces, so check the class before using frontmatter. Use one heading-control interface, such as titlesec or ctexset, then configure contents and running headers.'],
['ctexbook','中文书籍类','Chinese book class','class-ctexbook',R`\documentclass[UTF8,fontset=fandol,zihao=-4,oneside]{ctexbook}`,
'ctexbook 结合 book 的长文档结构与中文排版。支持 frontmatter、mainmatter、appendix 和 backmatter，适合书籍、学位论文和大型手册；章、节和页眉可使用中文名称。','ctexbook combines book’s long-document structure with Chinese typesetting. It supports frontmatter, mainmatter, appendix, and backmatter, making it suitable for books, theses, and manuals with Chinese heading conventions.',
'通过 twoside/openright 或 oneside/openany 决定印刷与屏幕阅读行为；zihao 调整中文基准字号，ctexset 配置章名与编号。数学宏包仍按需要加载，中文字体支持不会自动决定数学字体。','Choose twoside/openright for facing-page printing or oneside/openany for simpler screen layouts. zihao sets the Chinese base size and ctexset controls chapter conventions. Chinese text support does not automatically select the mathematics font.',
'学位论文通常还需要摘要、符号表、声明和参考文献，具体格式按学校规范配置。核对前置页码、目录层级和章首页页式。openright 在双面排版中可引入正常空白页，重复 clearpage 不会解决这一设置问题。','A thesis may also need abstracts, notation lists, declarations, and bibliography rules, configured to institutional requirements. Check front-matter numbering, contents depth, and chapter-opening page styles.'],
['ctexbeamer','中文 Beamer 适配类','Chinese Beamer adapter class','class-ctexbeamer',R`\documentclass[aspectratio=169,fontset=fandol]{ctexbeamer}`,
'CTeX 宏集提供 ctexbeamer 文档类，用于中文幻灯片，沿用 Beamer 的 frame 和 overlay 机制。接口见官方手册与安装中的 cls 文件。','The CTeX bundle provides ctexbeamer for Chinese presentations. It retains Beamer frames and overlays; its interfaces are documented in the official manual and the installed class file.',
'使用 aspectratio=169 设置宽屏，fontset=fandol 选择便携中文字体。主题、分栏与 fragile 仍遵循 Beamer 规则。既有模板也可以保留 documentclass{beamer} 并加载 ctex 宏包。','Use aspectratio=169 for widescreen slides and fontset=fandol for portable Chinese fonts. Themes, columns, and fragile frames still follow Beamer rules. Existing templates can retain beamer and load the ctex package instead.',
'旧的或裁剪后的发行版可能缺少 ctexbeamer，可用 kpsewhich ctexbeamer.cls 检查。文件缺失时安装完整 CTeX，或选用 beamer+ctex。每份文档选择一个文档类；中文与数学字号需在实际投影距离下检查。','Older or reduced installations may lack ctexbeamer; check with kpsewhich ctexbeamer.cls. Install CTeX or use beamer plus ctex if necessary. Each document uses one class. Assess Chinese and mathematical sizes at presentation distance.'],
['scrartcl','KOMA 文章类','KOMA article class','class-scrartcl',R`\documentclass[fontsize=11pt,paper=a4,DIV=12]{scrartcl}`,
'scrartcl 是 KOMA-Script 的文章类，提供 section 结构、可配置版心与语义化字体接口。默认标题外观与 article 不同，适合希望通过原生接口控制排版的报告和文章。','scrartcl is KOMA-Script’s article class, with section-based structure, configurable type areas, and semantic font interfaces. Its heading appearance differs from article and suits documents requiring systematic layout control.',
'fontsize 与 paper 设置字号和纸张，DIV 控制版心计算。setkomafont/addtokomafont 修改 sectioning 等元素。页眉优先使用 scrlayer-scrpage，标题使用 KOMA 自身选项。','fontsize and paper set size and paper; DIV controls the type-area calculation. setkomafont and addtokomafont address semantic elements such as sectioning. scrlayer-scrpage integrates with KOMA’s page-style system.',
'KOMA 与 titlesec、tocloft 等替代内部结构的宏包组合可能产生警告或行为差异。先查原生接口是否足够。中文可加载 ctex，但需要明确由谁负责标题，以免重复重定义。','Packages that replace KOMA heading or contents internals can produce warnings or altered behavior. Check the native interfaces first. For Chinese, ctex can be loaded, but choose which system owns heading formatting.'],
['scrreprt','KOMA 报告类','KOMA report class','class-scrreprt',R`\documentclass[fontsize=11pt,DIV=12,oneside]{scrreprt}`,
'scrreprt 提供章式报告结构，并使用 KOMA 的版心、标题与页式接口。它适合技术报告和论文草稿，保留 report 的章结构，同时提供更细的设置粒度。','scrreprt provides chapter-based report structure with KOMA’s type-area, heading, and page-style interfaces. It suits technical reports and thesis drafts requiring finer control than the standard report class.',
'可设置 chapterprefix、headings、BCOR 和 DIV；BCOR 为装订修正，DIV 控制版心。chapter、section 和附录结构可正常使用。标题字体通过 setkomafont 指定，不需要重写 chapter 宏。','Options such as chapterprefix, headings, BCOR, and DIV address chapter appearance, binding correction, and type area. Chapters, sections, and appendices remain available. Heading fonts can be set without redefining chapter.',
'前置部分命令以所选类提供的接口为准。版面可由 typearea 或 geometry 计算，使用其中一套参数，避免相互覆盖。完成设置后检查目录与章首页样式。','Use the front-matter interfaces supplied by the selected class. Let typearea or geometry calculate the page layout, with one set of parameters controlling it. Inspect contents and chapter-opening page styles after configuration.'],
['scrbook','KOMA 书籍类','KOMA book class','class-scrbook',R`\documentclass[fontsize=11pt,paper=a4,twoside]{scrbook}`,
'scrbook 用于双面长文档，支持章、前置部分和后置部分。与 book 相比，它通过 KOMA 原生接口提供标题、页眉、目录和版心设置，更适合统一管理大型手册。','scrbook targets long, commonly two-sided documents with chapters and front/back matter. KOMA interfaces configure headings, running headers, contents, and type area, making it useful for consistently designed books and manuals.',
'frontmatter/mainmatter/backmatter 控制页码与章编号，open=right 或 open=any 决定章起始页；BCOR 处理装订宽度。页眉可采用 scrlayer-scrpage 并分别配置章首页。','frontmatter, mainmatter, and backmatter control page and chapter numbering. open=right or open=any controls chapter openings, and BCOR accounts for binding. Page styles can be configured through scrlayer-scrpage.',
'右页开章带来的空白页是双面排版结果。导出单面电子版可显式换成 oneside,open=any。页式、目录和标题应优先用 KOMA 接口，并记录模板的兼容版本。','Blank pages from right-hand chapter openings are a consequence of facing-page layout. Use oneside and open=any for an electronic variant when appropriate. Prefer native KOMA interfaces and record the template’s supported versions.'],
['scrlttr2','KOMA 信函类','KOMA letter class','class-scrlttr2',R`\documentclass[paper=a4,fontsize=11pt]{scrlttr2}`,
'scrlttr2 用于结构化正式信函，支持发件人、收件人、主题、信头与地址窗口定位。它通过具名变量和信函选项配置内容，适合可复用的机构信件。','scrlttr2 supports structured business correspondence with sender, recipient, subject, letterhead, and address-window positioning. Named variables and letter options make institutional letter templates reusable.',
'setkomavar 设置 fromname、fromaddress、subject 等变量。letter 环境接收地址，opening 与 closing 处理称呼和结束语；lco 选项文件可以保存可复用的信头布局。','setkomavar sets variables such as fromname, fromaddress, and subject. The letter environment takes the recipient address; opening and closing handle salutation and closing. lco option files can preserve reusable letter layouts.',
'scrlttr2 使用具名变量配置信函。地址窗口尺寸需匹配实际信封与纸张，除屏幕预览外，还需检查打印定位。中文信函另行选择字体与译名。','scrlttr2 configures correspondence through named variables. Match address-window positions to actual envelopes and paper, and check printed alignment as well as the screen preview. Chinese correspondence also needs suitable fonts and wording.'],
['memoir','一体化长文档类','Integrated long-document class','class-memoir',R`\documentclass[11pt,a4paper,oneside]{memoir}`,
'memoir 面向书籍和长报告，整合章样式、版面、页眉、目录等许多功能。支持 book 风格的前置部分与章结构，并提供丰富的原生排版接口。','memoir targets books and long reports, integrating chapter styles, layout, running headers, and contents facilities. It supports book-style matter divisions and chapter organization with extensive native formatting interfaces.',
'setlrmarginsandblock 和 setulmarginsandblock 设置版心，随后 checkandfixthelayout 校验布局。chapterstyle 选择章样式。其功能可能已经替代某些常用宏包，加载前应查手册的兼容列表。','setlrmarginsandblock and setulmarginsandblock configure the type block, followed by checkandfixthelayout. chapterstyle selects chapter appearance. memoir incorporates facilities otherwise supplied by packages, so consult its compatibility list before adding dependencies.',
'memoir 适合长期维护的自定义书籍；标题和目录采用一套接口管理。期刊投稿则使用指定的 cls。中文可与 ctex 组合，并验证章节接口。','memoir suits custom books maintained over time, with one interface controlling headings and contents. Journal submissions use the mandated class. Chinese support can use ctex, with heading interfaces checked in the resulting document.'],
['exam','试卷与答案类','Examinations and solutions','class-exam',R`\documentclass[11pt,addpoints]{exam}`,
'exam 用 questions、question、parts 和 solution 组织试卷，可自动累积分值并控制是否显示答案。题目结构与普通 enumerate 不同，适合考试、习题和教师版讲义。','exam organizes assessments through questions, question, parts, and solution. It can total points and show or hide solutions. This structure differs from a plain enumerate list and supports student and instructor versions.',
'question[5] 给该题五分；printanswers 显示 solution 内容，noprintanswers 隐藏。addpoints 启用总分计算，页眉和评分表使用 exam 接口。数学支持按需要加载 amsmath。','question[5] assigns five points. printanswers shows solutions and noprintanswers hides them. addpoints enables point totals. The class supplies assessment-specific header and grading-table interfaces; load amsmath when needed.',
'使用时区分 exam 文档类、其他考试类和同名宏包。学生版交付前核对答案设置与实际 PDF。插图资源和随机题目生成需要单独配置工作流。','Distinguish this exam class from other examination classes and similarly named packages. Before distributing a student version, inspect answer settings and the actual PDF. Figure resources and randomized question generation require separate workflows.'],
['moderncv','学术与职业简历','Academic and professional CVs','class-moderncv',R`\documentclass[11pt,a4paper,sans]{moderncv}`,
'moderncv 用 name、section 和 cventry 组织简历条目，并提供预设样式与颜色。条目包含日期、职位或学位、机构、地点和说明，适合结构化履历。','moderncv structures a CV through name, section, and cventry, with predefined styles and colors. Entries represent dates, positions or degrees, institutions, locations, and descriptions in a consistent layout.',
'moderncvstyle{classic} 选择布局，moderncvcolor{green} 选择颜色。cventry 接收六个参数，即使没有地点或成绩也要保留空参数。可用 geometry 调整内容占比。','moderncvstyle{classic} selects the layout and moderncvcolor{green} its palette. cventry takes six arguments; retain empty arguments for omitted fields. geometry can adjust the proportion of page space used.',
'某些样式的社交图标或照片可能带来额外依赖，需要在目标发行版上测试。空参数用于维持字段位置。中文简历可配置 ctex 与 Unicode 引擎，并检查字宽对左右栏的影响。','Some styles introduce icon or photo dependencies, so test under the target distribution. Missing empty arguments can shift fields. For Chinese, configure ctex and a Unicode engine, then inspect how wider glyphs affect the columns.'],
['tikzposter','大幅学术海报','Large academic posters','class-tikzposter',R`\documentclass[20pt,a1paper,portrait]{tikzposter}`,
'tikzposter 把标题、内容块和多栏布局绘制为大幅海报。它以 block 和 columns 构建内容，不使用普通论文的连续章节页，适合会议海报。','tikzposter draws titles, content blocks, and columns on large poster pages. It uses block and columns rather than an article’s sequence of sectioned pages, making it suitable for conference posters.',
'a0paper/a1paper 等选项选择纸张，portrait/landscape 选择方向；usetheme 设置整体主题，column 的小数参数设置宽度比例。大字号有助于远距离阅读，但内容仍需控制长度。','Paper options such as a0paper and a1paper choose the format, and portrait or landscape chooses orientation. usetheme selects the design. column uses fractional widths. Large type helps distant reading, but text density still needs restraint.',
'海报按最终纸张大小检查字号、边距和图像分辨率。内容块溢出时，重新分配内容，保留可读字号。输出尺寸与印刷供应方确认。','Inspect font size, margins, and image resolution at the final print size. Reorganize overflowing blocks while retaining readable type. Confirm the output dimensions with the print provider.']
];
for(const [id,z,e,ex,syntax,bz,be,oz,oe,pz,pe] of classRecords){entry(id,'classes',id+'：'+z,id+': '+e,bz.split('。')[0]+'。',be.split('. ')[0]+'.',syntax,[sec('用途与文档结构','Purpose and structure',bz,be),sec('选项与依赖','Options and dependencies',oz,oe,syntax),sec('兼容性与实际建议','Compatibility and practical advice',pz,pe)],{example:ex,level:['article','report','book','ctexart'].includes(id)?'beginner':'intermediate',related:id.startsWith('ctex')?['ctex','engines','beamer']:['article','report','book'].filter(x=>x!==id),engines:id.startsWith('ctex')?['xelatex','lualatex']:['pdflatex','xelatex','lualatex'],packages:id.startsWith('ctex')?['ctex']:[],sources:[{label:'Class documentation / 文档类手册',url:id.startsWith('ctex')?'https://ctan.org/pkg/ctex':id.startsWith('scr')?'https://ctan.org/pkg/koma-script':['article','report','book','letter','minimal'].includes(id)?'https://ctan.org/pkg/latex-base':'https://ctan.org/pkg/'+id}]});}
entry('ctex','chinese','ctex 宏包与中文框架','The ctex package and Chinese framework','在保留既有文档类时加入中文排版。','Add Chinese typesetting while retaining the existing class.',R`\documentclass{article}
\usepackage[UTF8,fontset=fandol,heading]{ctex}
\ctexset{section={format=\Large\bfseries}}`,[
sec('类与宏包的选择','Choosing a class or package','ctex.sty 为其他类提供中文字体、标点、字号与本地化支持；ctexart 等类同时选择文章结构与中文默认设置。已经必须使用期刊类或 Beamer 时，加载 ctex 宏包通常更合适。','ctex.sty adds Chinese fonts, punctuation, sizes, and localization to another class. ctexart and related classes also choose the underlying document structure and Chinese defaults. Use the package when a publisher class or existing Beamer class must be retained.'),
sec('配置接口','Configuration interfaces','宏包的 heading 选项开启章节标题设置，CTeX 类已启用相应功能。ctexset 的键值控制 name、number、format、beforeskip 和 afterskip 等。scheme=plain 可减少中文格式改动，具体行为需结合文档类。','The heading package option enables heading configuration, which CTeX classes already provide. ctexset keys control names, numbering, formatting, and spacing. scheme=plain reduces Chinese-style document conventions; assess its behavior with the chosen class.'),
sec('字体与引擎','Fonts and engines','中文后端由引擎决定。可移植示例使用 XeLaTeX 与 fontset=fandol；若使用系统字体，必须记录字体名称和来源。系统字体数据库不可用时，可通过 texgyretermes-regular.otf 等字体文件名定位发行版字体。ctex 已处理字体后端，不需要为同一功能重复加载 xeCJK。','Chinese backends depend on the engine. The portable example uses XeLaTeX and fontset=fandol. Record names and provenance when relying on system fonts. File-based names such as texgyretermes-regular.otf can improve lookup portability when a system font database is unavailable. ctex configures its backend, so redundant xeCJK loading is usually unnecessary.')],{example:'beamer-ctex-package',packages:['ctex'],engines:['xelatex','lualatex','pdflatex'],related:['ctexart','ctexbeamer','xeCJK','fontspec']});
entry('xeCJK','chinese','xeCJK：XeLaTeX 中文混排','xeCJK: Chinese text with XeLaTeX','只配置中文字体与中西文边界。','Configure Chinese fonts and CJK/Latin boundaries.',R`\usepackage{xeCJK}
\setCJKmainfont{FandolSong-Regular.otf}
\setCJKsansfont{FandolHei-Regular}`, [
sec('适用边界','Scope and engine','xeCJK 运行于 XeLaTeX，管理 CJK 字体、字符间距和标点。它不提供 ctex 的全部中文标题与字号体系；如果需要完整中文文章结构，可直接用 ctexart。LuaLaTeX 不能使用 xeCJK。','xeCJK runs under XeLaTeX and handles CJK fonts, spacing, and punctuation. It does not supply all ctex heading and Chinese-size conventions. Use ctexart when those are needed. xeCJK is not the Chinese backend for LuaLaTeX.'),
sec('中西文字体','CJK and Latin fonts','setCJKmainfont、setCJKsansfont、setCJKmonofont 分别配置中文的主字体、无衬线和等宽族；setmainfont 等 fontspec 命令配置西文。两套字体应在字号、笔画粗细和基线观感上协调。','setCJKmainfont, setCJKsansfont, and setCJKmonofont configure the CJK families. fontspec’s setmainfont and related commands address Latin fonts. Match their visual size, weight, and baseline appearance in mixed prose.'),
sec('排查字体','Diagnosing fonts','字体名称应与实际安装匹配，文件名和内部家族名并不总相同。可先用 Fandol 建立可编译的配置，再引入本地字体。输入编码和字形覆盖分别检查，缺字信息见编译日志。','Font names must match the installation; file names and internal family names need not coincide. Start with a working Fandol configuration, then add local fonts. Check input encoding and glyph coverage separately; the log reports missing glyphs.')],{example:'xeCJK-direct',packages:['xeCJK'],engines:['xelatex'],related:['ctex','fontspec'],sources:[{label:'xeCJK manual',url:'https://ctan.org/pkg/xecjk'}]});
entry('fontspec','chinese','fontspec：OpenType 文本字体','fontspec: OpenType text fonts','使用 Unicode 引擎选择字体与 OpenType 特性。','Select fonts and OpenType features with Unicode engines.',R`\usepackage{fontspec}
\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]
\setsansfont{TeX Gyre Heros}
\setmonofont{Latin Modern Mono}`, [
sec('接口与依赖','Interfaces and requirements','fontspec 用于 XeLaTeX 和 LuaLaTeX。setmainfont、setsansfont 和 setmonofont 分别设置罗马、无衬线和等宽文本字体。中文断行与数学字体需要各自的配置。','fontspec requires XeLaTeX or LuaLaTeX. setmainfont, setsansfont, and setmonofont select roman, sans-serif, and monospaced text families. Chinese line breaking and mathematics fonts need their own configuration.'),
sec('特性与本地文件','Features and local files','Numbers、Ligatures 等选项调整 OpenType 特性；Path、Extension 和明确的 BoldFont/ItalicFont 可设置项目内字体。跨电脑使用时需提供可用字体资源，重新分发前检查字体许可。','Options such as Numbers and Ligatures request OpenType features. Path, Extension, and explicit BoldFont/ItalicFont settings can use project-local files. Provide available font resources for use on another machine and check permissions before redistribution.'),
sec('编译错误与配对','Failures and pairing','pdfLaTeX 遇到 fontspec 会报引擎要求错误。改用 Unicode 引擎，或用适合 pdfLaTeX 的传统字体宏包。中文主字体使用 ctex/xeCJK 的 CJK 接口；数学 OpenType 字体使用 unicode-math。','pdfLaTeX will reject fontspec with an engine requirement error. Switch to a Unicode engine or use a traditional pdfLaTeX font package. Configure Chinese families through CJK interfaces and OpenType mathematics through unicode-math.')],{example:'chinese-fonts',packages:['fontspec'],engines:['xelatex','lualatex'],related:['xeCJK','unicode-math'],sources:[{label:'fontspec manual',url:'https://ctan.org/pkg/fontspec'}]});
entry('unicode-math','chinese','unicode-math：OpenType 数学字体','unicode-math: OpenType mathematics','以 Unicode 数学字形和统一接口选择公式字体。','Choose mathematical glyphs through Unicode and OpenType.',R`\usepackage{unicode-math}
\setmathfont{Latin Modern Math}
\[\symbb{R},\symbf{\alpha},\symup{d}x\]`, [
sec('数学字体系统','The mathematics font system','unicode-math 需要 XeLaTeX 或 LuaLaTeX，以及含数学表的 OpenType 字体，如 Latin Modern Math。setmathfont 设置数学字形。它改变部分传统数学字族命令的行为，应在迁移旧模板时核查。','unicode-math requires XeLaTeX or LuaLaTeX and an OpenType font with a mathematics table, such as Latin Modern Math. setmathfont selects mathematical glyphs. Some traditional alphabet commands change behavior, so check legacy templates during migration.'),
sec('语义化字族','Semantic alphabets','symup、symit、symbf、symbb 和 symcal 直接指定数学字族。文本字族与数学字族分别配置，粗体希腊字母使用数学字族接口。可按范围选择字体，但先保证单一字体的基线与符号完整。','symup, symit, symbf, symbb, and symcal address mathematical alphabets directly. Text and math families are configured separately. Range-based font selection is possible, but first establish a consistent single-font configuration.'),
sec('迁移与宏包组合','Migration and package combinations','传统 amssymb 或 bm 的用法可能与新字体系统重复或存在差异。现代 Unicode 示例优先使用 sym 命令，并检查希腊字母、积分号和粗体符号。中文字体仍通过 ctex 设置，与数学字体互不替代。','Traditional amssymb or bm usage can duplicate facilities or behave differently under the new system. Prefer explicit sym commands in Unicode examples and inspect Greek letters, integrals, and bold symbols. ctex still manages Chinese text separately.')],{example:'unicode-math-fonts',packages:['unicode-math'],engines:['xelatex','lualatex'],related:['fontspec','mathbb','bold-math'],sources:[{label:'unicode-math manual',url:'https://ctan.org/pkg/unicode-math'}]});
entry('chinese-typography','chinese','中文标点、缩进与论文结构','Chinese punctuation, indentation, and thesis structure','协调中英混排、章节、目录和数学字体。','Coordinate Chinese/Latin prose, headings, contents, and math.',R`\ctexset{section={format=\Large\bfseries}}
\setlength{\parindent}{2em}
\zihao{-4}`, [
sec('标点与段落','Punctuation and paragraphs','中文正文使用中文全角标点，西文片段按西文标点规则书写。ctex 后端处理部分标点挤压与中西文间距。先检查默认输出，再针对确切的间距问题调整。','Use Chinese punctuation in Chinese prose and Latin conventions within English passages. ctex backends handle punctuation compression and CJK/Latin boundaries. Inspect the defaults before inserting manual spaces throughout the source.'),
sec('标题与目录','Headings and contents','ctexset 调整标题字号、名称、编号和间距。标题与目录项不是同一排版对象；目录深度由 tocdepth 控制，编号深度由 secnumdepth 控制。页眉还需与文档类的章首页规则协调。','ctexset controls heading sizes, names, numbers, and spacing. Headings and contents entries are separate objects. tocdepth sets contents depth, while secnumdepth sets numbering depth. Running headers must account for chapter-opening page styles.'),
sec('学位论文与公式','Theses and mathematics','中文学位文档通常有中文摘要、英文摘要、目录、正文、参考文献和附录；具体顺序取决于学校。小四号和两字符缩进并非通用验收规则。正文与公式字体要搭配测试，中文文献样式另由文献系统决定。','Chinese theses commonly contain Chinese and English abstracts, contents, main chapters, bibliography, and appendices, with institutional ordering. Xiaosi text and two-character indentation are not universal requirements. Test prose and mathematics together; bibliography style is configured separately.')],{example:'chinese-fonts',packages:['ctex'],engines:['xelatex','lualatex'],related:['ctexbook','gb7714','contents-bookmarks']});
entry('escapes','characters','十个特殊字符与文本转义','Ten special characters and text escaping','按语法角色区分注释、数学、对齐和参数。','Separate commenting, math, alignment, and argument syntax.',R`\% \$ \& \# \_ \{ \}
\textbackslash \textasciitilde \textasciicircum`, [
sec('字符的原始角色','Original syntactic roles','% 开始行注释，$ 切换数学模式，& 分隔对齐列，# 指宏参数，_ 与 ^ 表示数学下标和上标，{} 形成组或参数边界。反斜杠开始控制序列，~ 是活动的不换行空格。','Percent begins a comment; dollar selects math mode; ampersand separates alignment columns; hash marks macro parameters; underscore and caret supply math scripts. Braces delimit groups or arguments. Backslash starts a control sequence, and tilde normally creates a nonbreaking space.'),
sec('文本中的正确写法','Printing them in text','文本中用转义命令输出 %、$、&、#、_ 和花括号。可见反斜杠、波浪号、脱字符分别用 textbackslash、textasciitilde 和 textasciicircum。数学里的波浪关系使用 sim，按数学符号规则排版。','Use escaped commands for percent, dollar, ampersand, hash, underscore, and braces in prose. textbackslash, textasciitilde, and textasciicircum print the remaining visible characters. Use sim for a mathematical tilde relation; text escaping and math notation serve different purposes.'),
sec('不同输入上下文','Different input contexts','文件路径、URL 和代码适合 url、verb 或 verbatim，不必手动逐字转义。宏参数、章节标题和 PDF 书签有不同限制；verb 不宜放在标题或其他命令参数里。先选择输出上下文，再选转义方式。','Paths, URLs, and code often belong in url, verb, or verbatim rather than manually escaped prose. Macro arguments, headings, and PDF bookmarks have additional restrictions. verb generally cannot be used in another command’s argument or a heading.')],{level:'beginner',example:'special-characters',related:['percent','verb','detokenize'],keywords:['%','$','&','#','_','{','}','~','^','\\','转义','escape','特殊字符']});
entry('percent','characters','% 注释与 \% 百分号','% comments and escaped percentages','百分号会隐藏本行余下源码。','Percent hides the rest of its source line.',R`Growth is 5\%.
% Hidden comment
abc% suppress the end-of-line space
def`,[
sec('扫描机制','Scanning behavior','TeX 读到未转义的 % 时忽略当前行剩余字符，包括行末。因此源代码里的 5% growth 只排出 5，后面的文字被注释掉。如果右花括号也在百分号后面，可能产生未闭合参数错误。','An unescaped percent makes TeX ignore the rest of the line, including the newline. Writing 5% growth prints only 5. If a closing brace follows that percent, it is hidden too, which can cause a runaway argument.'),
sec('排版与连接','Printing and joining','百分数用转义后的 % 输出。在宏定义或连续盒子之间，行末 % 可消除换行带来的空格；abc% 换行 def 会连接成 abcdef。正文注释独立放行，便于辨认被隐藏的文本。','Use the escaped percent to print a percentage. End-of-line percent signs can suppress unwanted spaces in macro definitions or adjacent boxes. A line ending in abc% followed by def joins into abcdef. Put prose comments on separate lines for clarity.'),
sec('原样代码','Literal code','verb 与 verbatim 中的百分号作为普通可见字符输出。编辑器高亮有助于发现意外注释，实际结果仍需编译查看。排查“文字消失”时，检查前面的百分号以及字体。','Inside verb and verbatim, percent is a literal visible character. Editor highlighting helps reveal accidental comments; compilation shows their effect. When text disappears, inspect earlier percent signs as well as font availability.')],{level:'beginner',example:'special-characters',related:['escapes','paragraphs'],keywords:['%','\\%','comment','percentage','注释','百分号']});
entry('verb','characters',R`\verb：行内原样代码`,'verb: literal inline code','用选定分隔符保留特殊字符。','Preserve special characters with a chosen delimiter.',R`\verb|file_name%#&|
\verb*|a b|`,[
sec('分隔符与空格','Delimiters and spaces','verb 后的第一个非字母字符用作分隔符，第二次出现时结束内容。可选择 | 或 +，但分隔符不能在内容里重复。星号形式显示空格标记，便于讲解输入。','The first nonletter after verb becomes its delimiter; the next occurrence ends the literal span. Choose a delimiter absent from the content. The starred form displays spaces visibly, which is useful when explaining source input.'),
sec('适用场景','Where to use it','用于命令名称、短路径和单行代码，字符不需要单独转义。它不能跨源码行，也不会自动在长路径中换行。可点击且允许断行的链接用 url/xurl，长源码块用 verbatim 或代码宏包。','Use it for command names, short paths, and single-line code without manual escaping. It cannot cross a source newline and does not conveniently break long paths. Use url/xurl for breakable links and verbatim or a code package for blocks.'),
sec('移动参数限制','Argument restrictions','verb 在普通宏参数和标题等移动参数中通常不可用，因为字符早已被读取。Beamer frame 内需要 fragile。把代码移到普通正文，或使用宏包明确支持的原样接口。','verb usually fails inside macro arguments and moving arguments such as headings because characters have already been tokenized. Beamer frames require fragile for literal code. Move the code into ordinary body text or use an explicitly supported verbatim interface.')],{example:'special-characters',related:['verbatim','detokenize','beamer']});
entry('verbatim','characters','verbatim：原样代码块','verbatim: literal code blocks','保留代码的行、空格和特殊字符。','Preserve source lines, spaces, and special characters.',R`\begin{verbatim}
\textbf{source_only} % not a comment here
\end{verbatim}`, [
sec('环境行为','Environment behavior','verbatim 使用等宽字体原样显示代码，保留缩进和换行，数学与宏命令都作为字符输出。环境的结尾标记按其定界规则结束代码块；显示同一标记需要换用其他接口。','verbatim prints source in a monospaced font, preserving indentation and line breaks. Math and commands appear as literal characters. Its closing marker ends the block according to the environment’s delimiter rules; showing that marker requires another interface.'),
sec('扩展选择','Extended interfaces','fancyvrb 提供行号、可配置字号和文件导入；listings 或 minted 提供语法高亮。基础 verbatim 无需外部工具。长行的布局需按目标页宽安排。','fancyvrb provides configurable fonts, line numbers, and file input; listings or minted provide syntax highlighting. Basic verbatim needs no external tool. Arrange long source lines for the target page width.'),
sec('嵌套与幻灯片','Nesting and slides','原样环境不能直接放进普通命令参数，Beamer 中需要 fragile。讲解 end{verbatim} 时，选用其他可定界接口。原样内容中的反斜杠按字面输出，增加反斜杠不会转义结尾标记。','Literal environments cannot be placed directly inside ordinary macro arguments. Beamer needs fragile. To show end{verbatim}, choose another literal interface. Backslashes print literally, so adding them does not escape a closing marker.')],{example:'special-characters',related:['verb','beamer']});
entry('detokenize','characters',R`\detokenize：标记转字符`,'detokenize: tokens to characters','显示已读取的标记，不等同于原始输入捕获。','Display already-read tokens; this is not raw-input capture.',R`\texttt{\detokenize{file_name.tex}}`,[
sec('转换对象','What is converted','detokenize 将参数中的标记转换为普通字符标记，使下划线等内容可直接作为文本输出。结果仍使用当前字体；texttt 可加等宽外观。控制词后可能出现用于分隔的空格。','detokenize converts argument tokens into ordinary character tokens, allowing underscores to be printed in text. It uses the current font; texttt adds a monospaced appearance. Control words can acquire separating spaces in the output.'),
sec('读取阶段限制','Tokenization limits','TeX 在转换前已读取参数，因此未转义的百分号仍会注释源码，花括号也须平衡。detokenize 适用于这些条件已满足的标记，无法恢复被注释掉的文本。','TeX reads the argument before conversion, so an unescaped percent still comments out source and braces still need to balance. detokenize works on tokens that meet those conditions and cannot recover discarded comments.'),
sec('使用选择','Choosing an interface','适合受控路径或内部标记的可见输出。需要真正保留百分号与不平衡花括号的原始代码时用 verb 或 verbatim；需要链接用 url。安全地生成 TeX 源码时仍应按上下文处理字符。','Use it for controlled paths or token lists. For genuinely literal source with percent signs or unmatched braces, use verb or verbatim; for links, use url. Generated TeX source still needs context-specific handling of special characters.')],{example:'special-characters',related:['verb','escapes']});
entry('linebreaks','characters',R`\\、\newline 与 \par`,'Line breaks, newline, and par','区分行、段落及对齐环境中的行结束。','Distinguish line endings, paragraph endings, and alignment rows.',R`Line one\\
Line two\par
A new paragraph.`,[
sec('正文行与段落','Lines and paragraphs','双反斜杠和 newline 强制结束当前行，内容仍属于同一段落。par 或空行结束段落，并触发缩进和段间距机制。按需要选择行结束或段落结束接口。','A double backslash and newline force a line break within the same paragraph. par or a blank line ends the paragraph and engages indentation and paragraph spacing. Choose the interface for the structure the text needs.'),
sec('环境中的双反斜杠','Double backslashes in environments','在 tabular、align 和矩阵环境中，双反斜杠结束一行记录或一行公式，而非普通文本行。某些环境允许可选垂直间距，但含义与正文断行不能一概而论。','In tabular, align, and matrix environments, a double backslash ends a table row or mathematical row. Optional vertical spacing is available in some contexts, but the command’s behavior is defined by its environment.'),
sec('常见错误','Common errors','在尚未开始文本行的位置写双反斜杠，可能出现 There is no line here to end。改用段落或垂直间距接口。行末留短词造成 underfull 时，优先恢复自动断行。','Using a forced break before a text line exists can produce “There is no line here to end.” Use paragraph structure or a vertical-spacing interface instead. Restore automatic line breaking when forced breaks create poorly justified short lines.')],{example:'special-characters',related:['paragraphs','tabular','align']});
const mathEntries=[
['inline-display','行内与行间数学','Inline and display mathematics',R`Text \(x^2\) and $y^2$.
\[x^2+y^2=1\]`,
'行内数学用 \(...\) 或 $...$，公式参与段落断行；行间数学用 \[...\]，独占一行但不编号。显示模式通常使用更大的求和与分式，行内模式则照顾行高。','Use parentheses or dollar delimiters for inline mathematics, which participates in the paragraph. Bracket delimiters produce unnumbered displays. Display style typically enlarges sums and fractions, while inline style keeps prose line heights manageable.',
'正文标点属于完整句子，可放在数学结束前或紧随其后，全文保持一致。长行内公式可移到行间，以免超出窄栏。需要编号时选择 equation。','Punctuation belongs to the complete sentence; place it before or just after the closing math delimiter consistently. Move long inline expressions into displays when they exceed a narrow column. Use equation when the display needs a number.',
'不要嵌套数学定界符，也不要在公式内部插入空段落。传统 $$...$$ 不是推荐的 LaTeX 行间接口，会绕开部分间距与编号机制；用 \[...\] 或 amsmath 环境。','Do not nest math delimiters or insert blank paragraphs inside a formula. The plain-TeX double-dollar interface bypasses parts of LaTeX display handling; use bracket delimiters or an amsmath environment.'],
['equation','单行编号公式','Single numbered equations',R`\begin{equation}\label{eq:energy}E=mc^2\end{equation}
Equation~\eqref{eq:energy}.`,
'equation 提供一个独立编号的行间公式；equation* 由 amsmath 提供并取消编号。label 放在公式环境内，eqref 输出带括号的编号。自动计数器建立引用对象，使编号随文档修改更新。','equation creates one numbered display. amsmath provides equation* without a number. Put label inside the environment and use eqref for a parenthesized reference. The counter establishes a reference target whose number updates as the document changes.',
'需要跨行且只用一个编号，可在 equation 内使用 aligned 或 split。tag 可显式改显示标签，但应说明其用途并避免重复标签；numberwithin 可按章节重置公式编号。','For several lines sharing one number, use aligned or split inside equation. tag changes the displayed tag and should be used deliberately. numberwithin can reset equation numbering within a section or chapter.',
'equation 本身不是多行对齐结构，直接插入换行不会建立可靠对齐。不要把 align 放进 equation；align 自己就是行间环境。引用显示问号时再编译并检查标签唯一性。','equation alone is not a multiline alignment. Do not nest align inside it because align is already a top-level display. If references show question marks, rerun LaTeX and check that labels are unique.'],
['align','align：按关系符对齐','align: align at relations',R`\begin{align}
y&=\alpha+\beta x\label{eq:linear}\\
z&=y^2\notag
\end{align}`, 
'align 由 amsmath 提供，在 & 处建立列对齐，双反斜杠分行。通常把 & 放在等号前，每行默认独立编号；align* 全部不编号，notag 取消某一行编号。','amsmath’s align aligns rows at ampersands and separates them with double backslashes. An ampersand commonly precedes an equals sign. Rows normally receive separate numbers; align* removes all numbers and notag suppresses a particular row.',
'多个方程列可重复对齐对，但间距由 align 管理。每个需要引用的编号行放自己的 label。较长推导可结合允许显示公式分页的设置，但先核对断页是否破坏推导逻辑。','Several aligned equation groups can share a row, with spacing managed by align. Give each referenced numbered row its own label. Long derivations can permit display page breaks, but review whether the chosen break preserves readability.',
'align 不能嵌套在 $、\[ 或 equation 内。文本中的 & 要写成转义字符；align 内多写一个 & 可能改变列结构。只有一个总体编号时改用 equation 加 aligned。','align must not be nested inside inline delimiters, bracket displays, or equation. Escape a literal ampersand in text. Additional alignment tabs alter column structure. Use equation with aligned when the block needs one shared number.'],
['aligned','aligned：公式内部对齐块','aligned: nested aligned blocks',R`\begin{equation}
\begin{aligned}[t]y&=a+b\\&=c\end{aligned}
\end{equation}`, 
'aligned 是数学内部结构，不负责进入数学模式，也不独立编号。它常放在 equation 内，把多行推导看作一个公式；可选 t、c、b 控制与周围公式的垂直对齐。','aligned is an inner math structure: it does not enter math mode or create its own number. Inside equation it groups several derivation lines into one numbered object. The optional t, c, or b controls vertical alignment.',
'可与大括号、矩阵旁说明或另一个 aligned 并排。& 建立内部对齐，分行仍用双反斜杠。外层选择 equation 或 \[...\]，分别决定是否编号。','Use it beside delimiters, matrix annotations, or another aligned block. Ampersands define internal alignment and double backslashes separate rows. The outer equation or bracket display determines whether the object is numbered.',
'aligned 需要外层数学模式，每行不单独编号，整体编号由外层环境管理。整个块是不能跨页的数学盒子；特别长的推导适合使用顶层 align。','aligned needs an outer math context. Its rows have no separate numbers; numbering belongs to the enclosing environment. The block is a mathematical box that cannot split across pages. Use top-level align for very long derivations.'],
['gather-multline','gather 与 multline','gather and multline',R`\begin{gather}a=b\\c=d\end{gather}
\begin{multline}a+b+c+d\\=e+f\end{multline}`, 
'gather 把多行独立公式分别居中，每行可编号。multline 将一个很长的公式拆为多行，首行靠左、末行靠右，中间行居中，并保留一个编号。两者都由 amsmath 提供。','gather centers independent equations on separate rows, normally with one number per row. multline breaks one long equation across lines: the first is left-aligned, the last right-aligned, and intermediate rows centered, with one number.',
'星号版本取消编号。multline 没有 & 对齐列，不适合逐行等号对齐；该需求使用 align。gathered 是 gather 的内部形式，可放在其他数学环境中。','Starred forms suppress numbering. multline has no ampersand alignment columns; use align when successive equals signs should align. gathered is the inner form for placing centered rows inside another math structure.',
'环境名是 multline，没有第二个 i。它不通过 & 建立对齐列；长公式的断点按运算结构安排，首末行布局由环境处理。','The name is multline, without a second i. It has no ampersand alignment columns. Place line breaks at clear structural boundaries and let the environment position the first and last rows.'],
['split','split：单个公式的多行拆分','split: split a single equation',R`\begin{equation}\begin{split}
(a+b)^2&=a^2+2ab+b^2\\&=(b+a)^2
\end{split}\end{equation}`, 
'split 在一个外层行间公式内拆分推导，用 & 对齐并共享一个编号。它主要服务于单个 equation 或符合 amsmath 规则的外层结构，不能独立放在正文中。','split breaks a single displayed equation into aligned lines sharing one number. It belongs within a suitable outer display, commonly equation, and cannot be used directly as ordinary text.',
'与 aligned 相比，split 更专门针对一个完整公式的拆行。aligned 则方便组成并排公式块和局部结构。把 label 放在外层 equation 内，引用整个推导。','split is specialized for splitting one complete equation; aligned is more flexible for local or side-by-side blocks. Put the label in the outer equation to reference the derivation as a whole.',
'split 各行共享外层公式编号，label 引用整个推导。多个独立公式使用 align；不按关系符对齐的长表达式使用 multline。外层包含额外数学材料时，核对嵌套规则。','split rows share the enclosing equation number, and a label references the whole derivation. Use align for independent equations or multline for a long expression without alignment points. Check nesting rules when the outer display contains additional material.'],
['cases','cases：分段函数','cases: piecewise functions',R`\[f(x)=\begin{cases}x^2&\text{if }x\ge0,\\-x&\text{otherwise.}\end{cases}\]`,
'cases 由 amsmath 提供，建立左大括号与两列结构。第一列放表达式，第二列放条件，& 分隔两列。它必须位于数学模式内，中文或英文说明使用 text。','amsmath’s cases creates a left brace and two columns. The first contains the expression and the second the condition. It is an inner math structure, so place it in math mode and use text for prose conditions.',
'cases 默认按行内式样设置内容；包含大分式时可考虑 mathtools 的 dcases，或显式选择显示式样并评估行高。条件需互斥且覆盖定义域，这是数学内容本身的要求。','cases normally uses text-style math within its rows. For large fractions, consider mathtools’ dcases or deliberate display-style adjustments. Review the row heights. Conditions should partition the intended domain without accidental overlap or omissions.',
'条件说明用 text 保留文字字形。需要只有右括号的结构时，可选对应接口，或 array 加 left./right；可见与不可见定界符都需成对。','Use text to retain prose typography in conditions. For a right brace without a visible left delimiter, use a suitable structure or array with paired visible and invisible delimiters. Every left delimiter needs a matching right delimiter.'],
['subequations','subequations：编号分组','subequations: grouped numbering',R`\begin{subequations}\label{eq:system}
\begin{align}x+y&=1\label{eq:a}\\x-y&=0\label{eq:b}\end{align}
\end{subequations}`, 
'subequations 将内部公式编号为同一主编号下的 a、b 等子编号。紧接 begin{subequations} 的 label 引用整组主编号，内部 label 引用具体子公式。','subequations groups equation numbers under one parent number, commonly with a, b, and subsequent letters. A label immediately after its begin references the parent; labels inside numbered rows reference the individual subequations.',
'内部可使用 equation 或 align。文字可以夹在公式之间，但 subequations 自身不进入数学模式。整组引用和子式引用适合模型约束、联立系统与定义集合。','Place equation or align inside the grouping. Explanatory text may appear between formulas because subequations does not itself enter math mode. Parent and child references suit model constraints and simultaneous systems.',
'每个标签保持唯一，主标签紧接组开始处。label 记录当时的可引用计数器值；放在最后一个子公式后，会使整组引用可能指向最后一个子编号。','Keep labels unique and place the parent label at the start of the group. A label records the current reference value; placing it after the last subequation can make the group reference point to that child.'],
['matrices','矩阵环境与定界符','Matrices and delimiters',R`\[\begin{pmatrix}1&2\\3&4\end{pmatrix}\quad\begin{Vmatrix}a&b\\c&d\end{Vmatrix}\]`, 
'amsmath 提供 matrix 无括号、pmatrix 圆括号、bmatrix 方括号、Bmatrix 花括号、vmatrix 单竖线和 Vmatrix 双竖线。& 分列，双反斜杠分行，整个环境需要数学模式。','amsmath supplies matrix without delimiters, pmatrix with parentheses, bmatrix with square brackets, Bmatrix with braces, vmatrix with single bars, and Vmatrix with double bars. Ampersands separate columns and double backslashes separate rows.',
'矩阵列通常居中。复杂列规格用 array；行内小矩阵用 smallmatrix，并自行添加适当括号。大矩阵的列数限制可用 MaxMatrixCols 计数器调整，但先评估是否适合一页展示。','Matrix columns are normally centered. Use array for custom column specifications and smallmatrix for compact inline matrices with separate delimiters. MaxMatrixCols can raise the column limit, but first assess whether the matrix fits the page.',
'单竖线和双竖线分别有行列式、范数等数学含义，括号按对象含义选择。每行列数保持一致，额外的 & 会造成对齐诊断。窄栏中的大矩阵可考虑分块表示。','Single and double bars carry meanings such as determinant and norm, so choose them semantically. Keep row column counts consistent; extra ampersands cause alignment diagnostics. Consider block notation for a matrix too wide for a narrow column.'],
['array-math','array 与 smallmatrix','Math arrays and small matrices',R`\[\left\{\begin{array}{ll}x^2&x\ge0\\-x&x<0\end{array}\right.\]`, 
'数学 array 通过 {lcr} 等列规格控制对齐，与文本 tabular 不同，它在数学模式中使用数学字形。可构造特殊分段结构或自定义矩阵，括号用 left/right 在外层配对。','Math array uses column specifications such as lcr to control alignment. Unlike text tabular, it is placed in math mode and uses mathematical glyphs. It supports custom cases and matrices, with paired delimiters supplied outside.',
'array 宏包扩展列格式，允许前后插入声明。smallmatrix 把矩阵压缩到行内大小，不自动添加括号；简单正文里可以写小型变换矩阵，但不宜塞入大型表格。','The array package extends column formatting with inserted declarations. smallmatrix reduces a matrix for inline use and does not add delimiters. It suits a small transformation matrix in prose rather than large tabular material.',
'文字说明使用 text 保留正文排版。垂直线按技术需要使用，数学定界符则通过对应接口设置。arraystretch 改变行高，缩得过小可能使上下标相碰。','Use text for prose typography. Table rules and mathematical delimiters have separate roles and interfaces. arraystretch changes row heights, and excessive compression can make scripts collide.']
];
for(const [id,z,e,syntax,bz,be,uz,ue,pz,pe] of mathEntries){entry(id,'math-environments',z,e,bz.split('。')[0]+'。',be.split('. ')[0]+'.',syntax,[sec('机制与语法','Mechanics and syntax',bz,be,syntax),sec('编号与组合','Numbering and composition',uz,ue),sec('常见错误与选择','Errors and choosing a structure',pz,pe)],{packages:['amsmath'],example:'math-environments',related:['equation','align','aligned','matrices'].filter(x=>x!==id),level:id==='inline-display'?'beginner':'intermediate'});}
entry('mathbb','math-fonts',R`\mathbb：黑板粗体`,'mathbb: blackboard bold','用语义一致的字母表示数集和特定对象。','Use consistent blackboard alphabets for sets and objects.',R`\usepackage{amssymb}
\[\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\subset\mathbb{C}\]`, [
sec('依赖与字形范围','Dependencies and glyph coverage','传统 LaTeX 中 mathbb 由 amsfonts 提供，amssymb 会加载 amsfonts。标准 AMS 黑板字体主要覆盖大写拉丁字母；mathbb{abc123} 中的小写字母和数字需要另有相应字形的字体方案。','In traditional LaTeX, amsfonts supplies mathbb and amssymb loads amsfonts. The standard AMS blackboard alphabet mainly covers uppercase Latin letters. Lowercase letters and digits need a font setup that supplies those glyphs.'),
sec('数学含义','Mathematical meaning','常用 R、N、Z、Q 和 C 表示实数、自然数、整数、有理数和复数。概率中的 P 或期望中的 E 是否用黑板粗体取决于学科与期刊约定，全文要一致。','Common uses are R, N, Z, Q, and C for familiar number sets. Blackboard P and E for probability and expectation depend on field and journal conventions. State the notation and apply it consistently.'),
sec('与其他字族比较','Comparing alphabets','mathcal 常表示集合族或算子，mathbf 常表示粗体向量；黑板字形则使用 mathbb 等对应字族。需要黑板数字或小写字母时，选择具有相应覆盖的字体或宏包，并记录依赖。','mathcal often denotes families or operators, while mathbf commonly denotes bold vectors. Blackboard notation uses a corresponding alphabet such as mathbb. For lowercase letters or digits, choose a font or package that provides those glyphs and record the dependency.'),
sec('Unicode 路线','Unicode route','unicode-math 配合 OpenType 数学字体可使用 symbb，字形覆盖取决于字体。迁移时比较实际 PDF 的字形和字宽。传统论文模板如果规定 amssymb，可继续使用稳定的 AMS 字体路线。','With unicode-math, symbb selects an OpenType blackboard alphabet whose coverage depends on the font. Compare glyphs and widths during migration. Retain the AMS route when a publisher template specifies it.',null,R`\mathbb{R}\quad\mathbb{E}[X]\quad\mathbb{P}(A)`) ],{packages:['amsfonts','amssymb'],example:'math-alphabet-comparison',related:['mathcal','math-alphabets','unicode-math'],keywords:['mathbb','\\mathbb','黑板粗体','blackboard bold','实数','real numbers']});
entry('mathcal','math-fonts',R`\mathcal 与 \mathscr：书法字体`,'mathcal and mathscr: calligraphic alphabets','比较集合族、空间与算子的字形约定。','Compare alphabet conventions for families, spaces, and operators.',R`\usepackage{mathrsfs}
\[\mathcal{F}\quad\mathscr{F}\quad\mathcal{L}\]`,[
sec('内核字族','The kernel alphabet','mathcal 是 LaTeX 的传统书法数学字族接口，默认字体主要支持大写拉丁字母。常用于 sigma 代数 F、空间 H、拉格朗日函数 L 等，但这些含义必须在正文定义。','mathcal is LaTeX’s traditional calligraphic math alphabet. Its default font mainly supports uppercase Latin letters. Common uses include a sigma-algebra F, a space H, or a Lagrangian L, with meanings defined in the prose.'),
sec('花体比较','Script comparison','mathscr 通常需要 mathrsfs 等宏包，提供另一种花体；字体宏包可以改变 mathcal 与 mathscr 的字形。mathcal{F} 与 mathscr{F} 的含义由作者定义，字形差异本身不决定数学对象。','mathscr generally needs a package such as mathrsfs and supplies another script face. Font packages can change both alphabets. Definitions in the prose determine what the glyphs denote; their appearance alone does not define different mathematical objects.'),
sec('可读性与迁移','Readability and migration','花体在投影或小字号中容易混淆，用于不同变量时需检查辨识度。小写字形需核对字体覆盖。Unicode 数学系统可使用 symcal/symscr，其效果取决于所选 OpenType 字体。','Script glyphs can be difficult to distinguish at small sizes or on slides, so check readability when using them for variables. Verify lowercase coverage. Unicode mathematics offers symcal/symscr, whose appearance depends on the selected OpenType font.',null,R`\mathcal{F}\quad\mathscr{F}\quad\mathcal{L}`)],{packages:['mathrsfs'],example:'math-alphabet-comparison',related:['mathbb','math-alphabets','unicode-math'],keywords:['mathcal','mathscr','书法字体','花体','calligraphic','script'],sources:[{label:'LaTeX author documentation',url:'https://www.latex-project.org/help/documentation/'},{label:'mathrsfs script alphabet documentation',url:'https://ctan.org/pkg/mathrsfs'}]});
entry('math-alphabets','math-fonts','正体、斜体与等宽数学字族','Roman, italic, and monospaced math alphabets','按对象含义选择数学字体，不用字体替代运算符结构。','Choose mathematical alphabets by meaning and preserve operator structure.',R`\[\mathrm{ABC}\ \mathit{ABC}\ \mathbf{ABC}\ \mathsf{ABC}\ \mathtt{ABC}\ \mathfrak{g}\]`,[
sec('字族选择','Alphabet selection','mathrm 使用正体，mathit 使用文本式数学斜体，mathbf 使用粗体正体，mathsf 使用无衬线，mathtt 使用等宽。mathfrak 需要 amsfonts/amssymb，常见于代数结构。字形范围随字体变化。','mathrm selects upright roman, mathit text-like italic, mathbf bold upright, mathsf sans-serif, and mathtt monospaced mathematical alphabets. mathfrak needs amsfonts/amssymb and is often used in algebra. Coverage depends on the fonts.'),
sec('语义与间距','Meaning and spacing','多字母运算符通过 operatorname 或 DeclareMathOperator 设置，以获得运算符字形和间距。单位可用 siunitx，正文说明用 text。mathrm 等字体命令只改变字形，不建立运算符或语言结构。','operatorname or DeclareMathOperator sets the typography and spacing of named multi-letter operators. siunitx handles units, and text inserts prose. Alphabet commands such as mathrm change glyphs without establishing operator or language structure.'),
sec('粗体的限制','Limits of bold alphabets','传统 mathbf 不会使希腊字母和所有符号变粗；这些对象使用 bm 或 boldsymbol。Unicode 系统采用对应 sym 接口。公式中的字体区分应少而稳定，并在符号表里明确含义。','Traditional mathbf does not make Greek letters or all symbols bold; use bm or boldsymbol for them. Unicode mathematics uses corresponding sym interfaces. Keep font distinctions limited and document their meanings.')],{example:'math-alphabet-comparison',packages:['amsfonts'],related:['bold-math','text-operators','mathcal']});
entry('bold-math','math-fonts',R`\mathbf、\boldsymbol 与 \bm`,'mathbf, boldsymbol, and bm','区分粗体拉丁字母与粗体数学符号。','Distinguish bold Latin alphabets from bold mathematical symbols.',R`\usepackage{amsmath,bm}
\[\mathbf{x}\quad\boldsymbol{\alpha}\quad\bm{\Sigma}\]`,[
sec('传统数学字体','Traditional math fonts','mathbf 选择粗体正体拉丁字族，常用于向量，但一般不能加粗 alpha。boldsymbol 由 amsbsy 提供，amsmath 自动加载它；bm 是独立宏包，处理更广泛的数学符号加粗。','mathbf selects a bold upright Latin alphabet, commonly for vectors, but generally does not bold alpha. boldsymbol is supplied by amsbsy, loaded by amsmath. The separate bm package handles bolding a broader range of mathematical symbols.'),
sec('表达与定义','Expressions and definitions',R`语义化宏可统一向量与参数记号，例如 \newcommand{\vect}[1]{\bm{#1}}，并保持各章节一致。bm 保留数学符号类别，适用于公式中的粗体；文本粗体命令用于正文。`,'A semantic macro can keep vector and parameter notation consistent across chapters. bm preserves mathematical symbol classes when making formulas bold; text-bold commands serve prose.'),
sec('字体可用性','Font availability','部分字体没有真正的粗体字形，结果可能替代或不理想；检查 PDF 与日志。unicode-math 中优先使用 symbf/symbfit 等命令。粗体的正斜选择是符号规范的一部分，应明确约定。','Some fonts lack genuine bold glyphs, leading to substitutions or poor output. Check the PDF and log. With unicode-math, prefer symbf/symbfit and related commands. Upright versus italic bold is part of the notation convention.')],{example:'math-alphabet-comparison',packages:['amsmath','bm'],related:['math-alphabets','unicode-math']});
entry('text-operators','math-fonts',R`\text 与数学运算符`,'Text and named math operators','保持说明文字与运算符的正确字形和间距。','Preserve prose and operator typography inside mathematics.',R`\usepackage{amsmath}
\DeclareMathOperator{\Var}{Var}
\DeclareMathOperator*{\argmax}{arg\,max}
\[\Var(X)=1\quad\text{when }X\sim N(0,1)\]`,[
sec('正文说明','Prose inside math','amsmath 的 text 在数学中插入文本，能随上下标大小适当缩放。条件里的 if、otherwise 和中文说明都适合 text；文本前后的空格需要在参数中合理保留。','amsmath’s text inserts prose in mathematics and adapts to script sizes. Use it for conditions such as if or otherwise, and for Chinese explanations. Include intended word spacing in the text argument.'),
sec('运算符接口','Operator interfaces',R`operatorname{rank} 适合一次性运算符；DeclareMathOperator{\Var}{Var} 在导言区建立可复用命令。星号形式使下标在显示模式下像 lim 一样放到运算符下方。`,'operatorname{rank} defines an operator locally, while DeclareMathOperator defines a reusable command in the preamble. Its starred form permits display-style limits beneath the name, like lim.'),
sec('常见写法错误','Common mistakes','直接写 sin x 会把 sin 当三个斜体变量；使用内置 sin。mathrm{rank} 只改变字形，不提供同样的运算符间距。单位和统计记号也需遵守约定，而非仅凭可见字形拼装。','Typing sin as plain letters makes three italic variables; use the built-in sin command. mathrm{rank} changes the font without supplying the same operator spacing. Units and statistical notation should follow explicit conventions.')],{example:'math-alphabet-comparison',packages:['amsmath'],related:['math-alphabets','siunitx']});
entry('longtable','tables','longtable：跨页表格完整机制','longtable: multipage tables','在单栏页面上建立重复表头、表尾和稳定列宽。','Create repeating headers, footers, and consistent column widths on single-column pages.',R`\usepackage{longtable,booktabs}
\begin{longtable}{ll}
\caption{Data}\label{tab:data}\\
\toprule A&B\\\midrule\endfirsthead
\toprule A&B\\\midrule\endhead
\midrule Continued&\\\endfoot
\bottomrule\endlastfoot
1&2\\
\end{longtable}`, [
sec('为什么不能使用普通浮动表','Why an ordinary floating table is insufficient','tabular 把所有行装进一个不可分割的盒子，table 浮动体也整体移动。longtable 直接参与页面输出，可在行之间分页，并使各页列宽一致。它作为独立长表使用，不能再包进 table。','tabular boxes its rows into an indivisible object, and a table float moves as a whole. longtable participates in page output, breaks between rows, and keeps column widths consistent across pages. Use it as a standalone table environment; it cannot be nested in a table float.'),
sec('标题、标签与列规格','Captions, labels, and columns','列规格与 tabular 类似，可用 l、c、r、p{宽度} 和 array 的扩展列。caption 放在 longtable 内，紧跟 label，再用双反斜杠结束标题行。标签引用与普通表相同，但分页不是浮动定位。','Column specifications resemble tabular and can use l, c, r, fixed-width paragraph columns, and array extensions. Put caption inside longtable, immediately followed by label, then end the caption row. References behave like ordinary table references.'),
sec('四个分区标记','Four region delimiters','endfirsthead 结束第一页表头，endhead 结束后续页重复表头，endfoot 结束非末页表尾，endlastfoot 结束最后一页表尾。这些标记只定义一次，数据行写在它们之后。第一页可显示完整标题，后续页写“续表”。','endfirsthead finishes the first-page header; endhead finishes the recurring header; endfoot finishes the nonfinal-page footer; endlastfoot finishes the final footer. Define these regions once, then provide data rows. The first header can include the full caption and later headers a continuation note.'),
sec('跨页与重复编译','Page breaks and repeated compilation','longtable 在行之间断页，一个巨大单元格不能拆成多页。首次编译可能提示列宽变化，需要继续运行到宽度稳定。LTchunksize 用于进阶内存调优；列宽和内容安排仍由列设计决定。','longtable breaks between rows; a single oversized cell cannot split across pages. Column-width changes may require additional runs until stable. LTchunksize tunes memory use, while column design controls widths and content layout.'),
sec('输出例程限制','Output-routine constraints','longtable 改动输出例程，不适用于 twocolumn 页面或 multicol 环境。需要横向跨页表可在单栏模式下使用 pdflscape。需要自动 X 列与分页时可研究 xltabular 或 tabularray 的 longtblr，并分别查其语法。','longtable modifies the output routine and does not work on twocolumn pages or inside multicol. A single-column pdflscape page can hold a wide multipage table. For flexible X columns with pagination, examine xltabular or tabularray’s longtblr as separate interfaces.'),
sec('研究表格实践','Research-table practice','大型回归附录重复列名、模型编号和单位，最后一页保留完整注释。跨页 multirow 难以保持结构，行合并应留在同一页。列名过长、精度过多或信息拥挤时，可缩短标题、减少无意义的小数或拆分内容，以保持可读字号。','Repeat model names, variable labels, and units in large appendices, and retain complete notes on the final page. Keep row spans within one page. Shorten long headers, remove unnecessary decimal precision, or split crowded information to retain readable type.')],{packages:['longtable','booktabs'],example:'table-longtable',related:['tabular','booktabs','large-tables','tabularray'],sources:[{label:'longtable official manual',url:'https://ctan.org/pkg/longtable'},{label:'LaTeX tools bundle',url:'https://www.latex-project.org/help/documentation/'}]});
const tableEntries=[
['tabular','tabular 与 table 的分工','tabular and table have different roles',R`\begin{table}[htbp]\centering\caption{Data}\label{tab:data}
\begin{tabular}{lcr}Name&Value&Count\\A&2&4\\\end{tabular}
\end{table}`,'table-regression','',
'文字表格由 tabular 定义；table 是容纳表格、题注和标签的浮动体。l、c、r 控制列对齐，& 分隔单元格，双反斜杠结束数据行。列数由列规格决定。','tabular defines the text table; table is a float that holds the table, caption, and label. l, c, and r set column alignment. Ampersands separate cells and double backslashes end rows. The specification determines the number of columns.',
'p{宽度} 建立能换行的段落列。centering 只影响局部居中，不创建表格。题注与标签通常放在 table 内，label 紧跟 caption；tabular 本身不会生成表编号。','A p column supplies a wrapping paragraph of a fixed width. centering affects alignment but does not create a table. Caption and label usually belong inside table, with label following caption. tabular alone does not create a table number.',
'单元格中的正文 & 需转义，分隔符数量错误会造成错列或报错。tabular 不能跨页，长表使用 longtable，自动宽度使用 tabularx。横线与竖线按表格的阅读需要设置。','Escape literal ampersands inside cells. Incorrect alignment tabs shift cells or trigger errors. tabular cannot break across pages; choose longtable for length and tabularx for flexible width. Use rules only where they improve reading.'],
['tabularx','tabularx：自动分配列宽','tabularx: flexible column widths',R`\begin{tabularx}{\linewidth}{lXr}Name&Description&N\\A&Long text&4\\\end{tabularx}`,'table-tabularx','tabularx',
'tabularx 接收总宽度和列规格，X 列像段落列一样换行，并分配剩余空间。多个 X 默认等分可用宽度；l/c/r 列按内容取自然宽度。','tabularx takes a total width and column specification. X columns wrap as paragraph columns and share the remaining width, equally by default. l/c/r columns keep natural content widths.',
'在浮动体、minipage 或分栏内部优先用 linewidth 表示当前可用宽度。可通过 array 的声明定义左对齐 X 列，并加 arraybackslash 恢复行结束命令。','Use linewidth for the current available width inside floats, minipages, or columns. array declarations can create left-aligned X columns; include arraybackslash when needed to restore row-ending behavior.',
'tabularx 为确定宽度会多次试排表格，单元格里的副作用命令要谨慎。它仍不能跨页；跨页 X 列需其他接口。超宽时检查固定列是否已经占满总宽度。','tabularx performs trial typesetting to determine widths, so avoid side effects in cells. It still cannot break across pages. If it remains too wide, check whether the fixed-width columns already consume the available width.'],
['booktabs','booktabs：三线表与局部线','booktabs: publication-style rules',R`\toprule
Name&Estimate\\\midrule
A&0.24\\\bottomrule`,'table-regression','booktabs',
'booktabs 提供 top、mid、bottom 三种横线和 cmidrule 局部线，并安排线周围的留白。它适合回归表、描述统计和相关系数表，不自动创建 table 或控制列宽。','booktabs supplies top, middle, bottom, and partial rules with deliberate surrounding spacing. It suits regression, descriptive, and correlation tables. It does not create a float or choose column widths.',
'cmidrule(lr){2-3} 在指定列间画短线，并裁去两端；addlinespace 分组数据行。一般让单位放在表头，避免竖线干扰数值比较。可与 longtable 配合重复表头。','cmidrule(lr){2-3} draws a trimmed partial rule across selected columns. addlinespace groups rows with whitespace. Put units in headers and avoid unnecessary vertical rules. booktabs also works with longtable headers.',
'线宽与间距用于区分表头、数据和信息组，重复 hline 或逐行画线会增加不必要的分隔。回归表中说明标准误、星号阈值和样本来源。','Rule weight and spacing distinguish headers, data, and information groups. Repeated hline commands or rules on every row add unnecessary separators. Regression notes should explain standard errors, significance thresholds, and data provenance.'],
['array-columns','array：段落列和自定义列','array: paragraph and custom columns',R`\newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}
\begin{tabular}{L{4cm}m{2cm}b{2cm}}A&B&C\\\end{tabular}`,'table-tabularx','array',
'array 扩展 tabular 与数学 array 的列规格。p 列顶部对齐，m 垂直居中，b 底部对齐；三个都接收宽度。>{声明} 和 <{声明} 在单元格前后插入设置。','array extends column specifications for tabular and math arrays. p, m, and b give top, middle, and bottom-aligned fixed-width paragraph columns. Greater-than and less-than declarations insert settings before or after each cell.',
'newcolumntype 定义可复用列类型。raggedright 会改变双反斜杠的含义，可用 arraybackslash 恢复表格行结束。arraystretch 调行高，extrarowheight 增加行高但不直接扩大所有深度。','newcolumntype defines reusable column types. raggedright changes the meaning of a double backslash; arraybackslash restores table row endings. arraystretch scales row height, while extrarowheight adds height without directly increasing every depth.',
'文字说明使用文本列，数学 array 使用数学字形。计算固定列总宽时，还需计入 tabcolsep 和规则宽度。超宽可能来自列规格或自然宽度列，也可能来自较长的单元格内容。','Use text columns for prose and math array for mathematical glyphs. Total fixed-column width includes tabcolsep and any rules. Overflow can come from the specification, natural-width columns, or long cell content.'],
['multirow-multicolumn','行合并与列合并','Row spans and column spans',R`\multicolumn{2}{c}{Model results}
\multirow{2}{*}{Group A}`,'table-merged','multirow',
'multicolumn 是 LaTeX 的列合并接口，参数为列数、局部列格式和内容。multirow 由宏包提供，参数包括跨行数、宽度和内容；* 宽度使用自然宽度。','multicolumn is LaTeX’s column-span interface, taking a span count, local alignment, and content. multirow comes from a package and takes a row count, width, and content. An asterisk width uses the natural width.',
'列合并会覆盖原始列格式，必要时在局部规格中保留边界设置。行合并后的后续行仍要为被占列留出空单元格。局部横线用 cline 或 booktabs 的 cmidrule 避开跨行内容。','Column spans override the original local column formatting. Following rows of a row span still need empty cells for the occupied position. Use cline or cmidrule to avoid drawing a rule through spanned content.',
'合并过多会降低表头可读性，屏幕阅读与跨页结构也更难维护。multirow 不宜跨 longtable 断页；复杂文本表优先重复组名或使用显式分组行。','Excessive spans make headers harder to read and complicate accessibility and pagination. Avoid multirow across longtable page breaks. Repeated group labels or explicit grouping rows often maintain a clearer structure.'],
['makecell','makecell：单元格内多行标题','makecell: multiline cell headings',R`\usepackage{makecell}
\makecell[l]{Outcome\\variable}`,'table-regression','makecell',
'makecell 在单元格内建立多行内容，双反斜杠拆分标题，可选 l、c、r 改水平对齐。它处理短表头换行；表格跨页需要另选长表接口。','makecell creates multiline content within one cell, with optional left, center, or right alignment. It handles short wrapping headers; pagination requires a long-table interface.',
'thead 可统一表头样式，单元格内的换行不会增加外部表格行数。需要自然段落自动换行时，p 或 X 列通常更合适。','thead can standardize heading appearance. Internal line breaks do not add outer table rows. For prose that should wrap automatically, a p or X column is generally a better fit.',
'普通 l 列中的双反斜杠会结束整行。格内换行使用 makecell 的局部结构或段落列，表头中的缩写另行定义。','A double backslash in an ordinary l column ends the table row. Use makecell or a paragraph column for internal line breaks, and define heading abbreviations separately.'],
['threeparttable','threeparttable：题注、表体与表注','threeparttable: caption, body, and notes',R`\begin{threeparttable}\caption{Results}
\begin{tabular}{lc}A&1\tnote{a}\\\end{tabular}
\begin{tablenotes}\item[a] Note text.\end{tablenotes}
\end{threeparttable}`,'table-regression','threeparttable',
'把题注、表体和 tablenotes 组合成宽度协调的结构；它本身不是浮动体，通常放在 table 中。tnote 输出表注标记，tablenotes 提供说明条目。','threeparttable groups a caption, table body, and tablenotes with coordinated widths. It is not itself a float and is commonly placed inside table. tnote produces note markers, with explanations supplied in tablenotes.',
'适合说明回归表的标准误、显著性和样本限制。表注不等同于正文脚注，避免在浮动表格内直接 footnote 造成位置丢失。表内统计结果与注释应一同更新。','It suits notes about standard errors, significance, and sample restrictions. Table notes differ from ordinary footnotes, which can behave poorly inside floats. Update numerical results and their explanatory notes together.',
'跨页表注使用 longtable 的表尾机制或兼容扩展，普通 threeparttable 不提供这项功能。较长说明可精炼后保留在表注，或移入正文，以维持可读字号。','Multipage notes use longtable footers or a compatible extension; ordinary threeparttable does not provide that facility. Condense long notes or move extended discussion into the prose to retain readable type.'],
['siunitx','siunitx：数字、单位与小数点对齐','siunitx: numbers, units, and decimal alignment',R`\usepackage{siunitx}
\num{12345.67}\quad\qty{3.2}{\metre\per\second}
\begin{tabular}{S[table-format=2.2]}3.14\\12.50\\\end{tabular}`,'table-descriptive','siunitx',
'siunitx 解析数字与单位，提供 num、qty 和表格 S 列。现代 v3 接口使用 qty；旧文档常见 SI，应按模板版本核对。S 列按数字结构对齐，table-format 指定预期位数。','siunitx parses numbers and units through num, qty, and S table columns. The modern v3 interface uses qty; older sources often use SI. table-format specifies the anticipated numeric shape for alignment.',
'S[table-format=2.2] 为两位整数与两位小数预留宽度，符号或误差形式还需相应规格。表头用花括号保护为文本。单位的正体、间距和指数交给宏包统一处理。','S[table-format=2.2] reserves two integer and two fractional digits. Signs or uncertainty formats require corresponding specifications. Brace textual headers so they are not parsed as numbers. Let the package handle unit fonts, spacing, and powers.',
'回归显著性星号和括号标准误需要专门配置，S 列不会自动把任意装饰文本解释为数字。复杂回归表可将数字与标记分开，或使用文本列。','Regression stars and parenthesized standard errors need deliberate configuration; S does not automatically parse arbitrary decorated strings as numbers. Separate numeric and marker content or use text columns for complex regression tables.'],
['tabularray','tabularray：键值式表格','tabularray: key-value tables',R`\begin{tblr}{colspec={lrr},row{1}={font=\bfseries},hlines}A&B&C\\1&2&3\\\end{tblr}`,'table-tabularray','tabularray',
'把结构与样式通过键值接口配置，tblr 处理普通表格，longtblr 处理长表。colspec 定义列，row 和 cell 键定义局部样式；接口与传统 tabular 宏包不是逐字兼容。','tabularray uses key-value specifications for structure and style. tblr handles ordinary tables and longtblr handles long tables. colspec defines columns; row and cell keys address styles. The interface is not a drop-in syntax copy of traditional tabular packages.',
'可声明行列跨越、背景和边框，库接口扩展 booktabs 与 siunitx 支持。应根据当前手册使用对应库和列类型，先做小型示例再迁移复杂表。','The interface supports spans, backgrounds, and rules, with libraries for booktabs and siunitx integration. Use the documented libraries and column types for the installed version. Establish a small example before migrating a complex table.',
'传统 multirow、hline 和 longtable 分区标记需按新接口转换。复杂单元格宏可能需要控制展开。表格结构由一套框架管理，以免多套实现重复定义。','Convert traditional multirow, hline, and longtable region markers to the new interface. Complex cell macros may need controlled expansion. Use one framework to manage table structure and prevent competing definitions.'],
['colortbl','xcolor 与 colortbl 的表格着色','Table colors with xcolor and colortbl',R`\usepackage[table]{xcolor}
\rowcolors{2}{gray!10}{white}
\begin{tabular}{lr}\rowcolor{teal!15}Name&Value\\A&1\\B&2\\\end{tabular}`,'table-descriptive','xcolor',
'xcolor 的 table 选项加载 colortbl 表格着色支持。rowcolor、columncolor 和 cellcolor 分别改变行、列和单元格背景；rowcolors 可给数据行交替着色。','xcolor’s table option enables colortbl table coloring. rowcolor, columncolor, and cellcolor address row, column, and cell backgrounds. rowcolors supplies alternating backgrounds for data rows.',
'浅背景与深文字有助于行追踪，但颜色不能独自表达重要类别。打印灰度版时仍要能辨认数据结构。booktabs 横线周围留白与背景可能形成间隙，应检查实际 PDF。','Subtle backgrounds can help readers track rows, but color should not be the sole carrier of categories. Keep the table intelligible in grayscale. Inspect interactions between colored cells and the spacing around booktabs rules.',
'Beamer 已加载 xcolor，再次加载不同选项可能报 Option clash。table 选项需提前传入，或通过类支持的机制设置。LaTeX PDF 与网站主题分别配置颜色，切换网站深色主题不会改变下载的 PDF。','Beamer already loads xcolor; loading it again with different options can cause an option clash. Pass the table option early or use supported class mechanisms. LaTeX PDF colors and website theme colors are configured separately, so switching the website theme leaves the downloaded PDF unchanged.'],
['large-tables','大型表格、横向页面与缩放','Large tables, landscape pages, and scaling',R`\usepackage{pdflscape,adjustbox}
\begin{landscape}
\begin{adjustbox}{max width=\linewidth}\begin{tabular}{lll}A&B&C\\\end{tabular}\end{adjustbox}
\end{landscape}`,'table-longtable','pdflscape',
'区分表太宽与表太长：宽表可改列设计、使用横向页面或有限缩放；长表需可分页的 longtable。rotating 的 sidewaystable 是整体旋转浮动体，不能让一个表格跨页。','Separate width from length. Wide tables may need redesigned columns, landscape pages, or restrained scaling. Long tables need a paginating interface such as longtable. sidewaystable rotates a float as a whole and does not make it multipage.',
'pdflscape 的 landscape 同时影响页面内容方向与 PDF 查看旋转标记。adjustbox 的 max width 只在需要时缩小，resizebox 则按指定尺寸缩放整个盒子。缩放会一起改变字号与线宽。','pdflscape’s landscape handles content orientation and PDF viewing rotation. adjustbox’s max width shrinks only when necessary, while resizebox scales the whole box to the specified size. Both scale type and rule widths.',
'先减少无用精度、重复列和冗长表头。缩放时保持表格字号与正文协调；长表装进 resizebox 会失去分页能力。最终按打印尺寸检查重要数值的可读性。','First remove unnecessary precision, repeated columns, and verbose headings. Keep scaled table type consistent with the prose. A longtable boxed in resizebox loses pagination. Check important values at the final print size.']
];
for(const [id,z,e,syntax,ex,pkg,bz,be,uz,ue,pz,pe] of tableEntries){entry(id,'tables',z,e,bz.split('。')[0]+'。',be.split('. ')[0]+'.',syntax,[sec('机制与参数','Mechanics and parameters',bz,be,syntax),sec('使用与组合','Use and composition',uz,ue),sec('错误与排版建议','Errors and layout advice',pz,pe)],{packages:pkg?[pkg]:[],example:ex,related:['tabular','longtable','booktabs','large-tables'].filter(x=>x!==id),sources:[{label:'Package documentation / 宏包文档',url:pkg?'https://ctan.org/pkg/'+pkg:'https://www.latex-project.org/help/documentation/'}]});}
entry('float-placement','floats','浮动体位置与 [htbp]、[H]','Float placement: htbp and H','浮动参数是允许位置，不是页面坐标。','Placement parameters allow positions; they do not specify coordinates.',R`\begin{figure}[htbp]\centering
\rule{.6\linewidth}{20mm}\caption{Example}\label{fig:example}
\end{figure}`, [
sec('位置算法','Placement algorithm','figure 和 table 浮动体按输出例程安排位置，以协调文字与图表的页面布局。h 允许附近位置，t 页顶，b 页底，p 浮动页；字母允许位置而非按源码顺序逐一尝试的绝对指令。','figure and table are placed by the output routine to balance text and floats. h allows a nearby position, t the top, b the bottom, and p a float page. The letters allow locations rather than specifying exact coordinates or a strict source-order search.'),
sec('放宽限制与固定','Relaxing constraints and fixing placement','! 放宽部分浮动比例与数量限制，位置仍受实际可用空间约束。float 宏包的 H 将内容固定在源码附近，可能留下空白或影响分页。通常先使用 htbp，给排版算法留出选择空间。','An exclamation mark relaxes some float constraints, within the space actually available. The float package’s H fixes content near its source position and can leave gaps or harm page flow. htbp usually gives the algorithm useful flexibility.'),
sec('边界与清空','Boundaries and flushing','placeins 的 FloatBarrier 阻止先前浮动体越过边界。clearpage 清空待排浮动体并换页，newpage 主要结束当前页而不保证清空浮动队列。它们应按文档结构使用。','placeins provides FloatBarrier to stop preceding floats crossing a boundary. clearpage flushes queued floats and ends the page, while newpage mainly ends the page without guaranteeing that the queue is cleared.'),
sec('双栏与大小','Columns and size','双栏文档的 figure* 跨两栏，常受页顶或浮动页定位限制，具体取决于内核和宏包。图片尺寸用 linewidth 匹配当前容器；越大的图越难在允许区域安放。','In two-column documents, figure* spans both columns and commonly has stricter top/float-page placement, depending on the kernel and packages. Use linewidth for the current container. Larger floats have fewer feasible positions.'),
sec('排查步骤','Troubleshooting placement','浮动体定位困难时，先核对页高和页宽，再放宽允许位置，检查前面是否有浮动体阻塞队列。需要时设置章节边界。H 固定位置可能留下空白或影响分页，应按具体对象选择；图的源码顺序、题注和阅读逻辑需一同检查。','For a placement problem, check dimensions first, broaden allowed positions, and inspect whether an earlier float blocks the queue. Add section barriers where appropriate. H can leave gaps or harm page flow, so choose it for individual objects and assess source order, captions, and reading flow together.')],{example:'float-placement-demo',packages:['float','placeins'],related:['graphicx','caption','float-tools']});
const floatEntries=[
['graphicx','graphicx：缩放、裁剪与旋转','graphicx: scaling, clipping, and rotation',R`\includegraphics[width=.8\linewidth,trim=10mm 5mm 10mm 5mm,clip]{figure.pdf}`,'float-subcaptions','graphicx',
'includegraphics 的必选参数是文件路径，width/height 设置尺寸，keepaspectratio 防止比例变形。pdfLaTeX 常直接读取 PDF、PNG 和 JPEG；EPS 通常需要转换。Unicode 引擎也需匹配驱动支持的格式。','includegraphics takes a file path and options such as width, height, and keepaspectratio. pdfLaTeX commonly reads PDF, PNG, and JPEG directly; EPS usually needs conversion. Other engines also depend on supported driver formats.',
'相对路径相对于编译工作目录，可用 graphicspath 管理搜索目录。trim 的次序为左、下、右、上，clip 才把超出部分裁掉。angle 旋转，选项的执行顺序可能影响最终尺寸。','Relative paths are resolved from the compilation working directory; graphicspath manages search directories. trim orders margins left, bottom, right, top, and clip applies visible cropping. angle rotates, and option order can affect dimensions.',
'某些系统严格区分文件名大小写。投稿项目使用接收方也能解析的路径，图片缺失时先核对路径与文件。矢量图或高分辨率位图按输出用途选择。','File-name case matters on some systems. Avoid machine-specific absolute paths in submissions. Check paths when an image is missing. Choose vector or raster resources according to the final output.'],
['caption','caption：题注与标签','caption: captions and labels',R`\usepackage{caption}
\captionsetup{font=small,labelfont=bf}
\caption[Short title]{Full descriptive caption}\label{fig:demo}`,'float-subcaptions','caption',
'caption 宏包配置题注字体、编号标签、间距和格式。caption 的可选短标题用于图表目录，必选参数显示在正文。caption 增加计数器，label 应紧随其后。','caption configures caption fonts, labels, spacing, and formatting. The optional short caption enters the list of figures or tables; the mandatory text appears in the body. caption steps the counter, so label should follow it.',
'captionof 可为非浮动内容创建题注，但不会赋予自动浮动或分页。长图注可保留完整解释，同时给目录提供短标题。图注应定义缩写、单位和图中面板。','captionof can caption nonfloating content but does not add floating or pagination behavior. Provide short list entries for long captions. Explain abbreviations, units, and panels in the caption.',
'Beamer、KOMA 和某些投稿类有自己的题注接口，先核对兼容性。把 label 放在 caption 前面常引用上一对象；无编号题注不能自动提供正常的数字引用。','Beamer, KOMA, and some publisher classes have their own caption interfaces, so check compatibility. A label before the caption often records the previous counter. Unnumbered captions do not automatically provide a normal numbered reference.'],
['subcaption','subcaption：现代子图','subcaption: modern subfigures',R`\begin{subfigure}{.45\linewidth}\centering
\rule{\linewidth}{20mm}\caption{Panel A}\label{fig:a}
\end{subfigure}`,'float-subcaptions','subcaption',
'subcaption 基于 caption，提供 subfigure/subtable 环境和子题注。每个子图接收宽度，内部 linewidth 是子容器宽度；总宽度与间距必须小于外层可用宽度。','subcaption builds on caption and supplies subfigure/subtable environments. Each takes a width, with an internal linewidth matching that container. Total panel widths plus gaps must fit the outer available width.',
'主题注编号整张图，子题注标识 a、b 等面板；subref 引用面板标签，ref 可根据配置显示组合编号。两层 label 都放在对应 caption 后。','The main caption numbers the figure and subcaptions identify panels. subref references a panel label; ref can show a combined number depending on configuration. Place each label after its corresponding caption.',
'历史 subfigure 宏包已过时，与 subcaption 中的同名环境是不同实现。subfigure、subfig 和 subcaption 按所选文档类的支持范围选择一套；投稿类要求旧接口时遵循其配置。','The historical subfigure package is obsolete and differs from subcaption’s environment of the same name. Select one of subfigure, subfig, or subcaption according to the document class’s supported interfaces. Follow publisher configuration when it requires an older interface.'],
['wrapfig','wrapfig：绕排图片','wrapfig: text-wrapped figures',R`\begin{wrapfigure}{r}{.35\linewidth}\centering
\rule{.9\linewidth}{25mm}\caption{Small illustration}\end{wrapfigure}`,'float-placement-demo','wrapfig',
'wrapfigure 用左右位置与宽度让普通段落绕过小图。适合正文中的短插图，和标准 figure 的页顶/页底浮动机制不同；位置参数通常用 l 或 r。','wrapfigure combines a side and width to wrap ordinary paragraphs around a small figure. It suits short illustrations within prose and differs from standard top/bottom figure placement.',
'可选行数影响绕排行高范围，内容应在有足够文字的稳定段落旁使用。宽度包含图与题注布局，内部图片尺寸按当前 linewidth 设置。','An optional line count affects the wrapping region. Use it beside stable prose with enough text. The specified width accommodates figure and caption; size the inner graphic against its current linewidth.',
'列表、章节边界、分页和过长题注容易破坏绕排。大型科研图通常使用更稳定的 figure。修改附近段落后，重新检查实际分页。','Lists, heading boundaries, page breaks, and long captions can disrupt wrapping. Ordinary figure is more stable for large research graphics. Recheck pagination after editing nearby prose.'],
['float-tools','placeins、floatrow 与 rotating','placeins, floatrow, and rotating',R`\FloatBarrier
\begin{sidewaystable}\centering\caption{Wide table}\end{sidewaystable}`,'float-placement-demo','placeins',
'placeins 控制浮动体跨越结构边界；floatrow 管理浮动体内部的布局与题注组合；rotating 提供 sidewaysfigure 和 sidewaystable 旋转浮动体。三者解决不同层面的问题。','placeins controls crossing structural boundaries; floatrow manages float layout and caption arrangements; rotating supplies sideways figures and tables. These packages address distinct aspects of float design.',
'一个图内部需要并排图片与题注可研究 floatrow；一整页宽表可选旋转浮动体。adjustbox 控制盒子的最大尺寸和裁剪，而不改变浮动排队规则。','Consider floatrow for coordinated panels and captions, and rotated floats for page-sized wide objects. adjustbox controls box dimensions and clipping without changing the float queue.',
'尺寸、定位和分页分别影响图表布局。添加宏包前确认需要处理哪一项，再选一套题注与浮动框架。旋转浮动表仍作为整体排版，不能跨页。','Dimensions, placement, and pagination affect different parts of figure and table layout. Identify the requirement before choosing a caption and float framework. A rotated table remains an indivisible float and cannot span pages.']
];
for(const [id,z,e,syntax,ex,pkg,bz,be,uz,ue,pz,pe] of floatEntries){entry(id,'floats',z,e,bz.split('。')[0]+'。',be.split('. ')[0]+'.',syntax,[sec('机制与参数','Mechanics and parameters',bz,be,syntax),sec('使用与组合','Use and composition',uz,ue),sec('兼容性与错误','Compatibility and errors',pz,pe)],{packages:[pkg],example:ex,related:['float-placement','caption','graphicx'].filter(x=>x!==id),sources:[{label:'Package manual / 宏包手册',url:'https://ctan.org/pkg/'+pkg}]});}
entry('bibtex','bibliography','BibTeX：传统参考文献链','BibTeX: the traditional bibliography chain','用 bst 样式处理 bib 数据与 aux 请求。','Process bib data and aux requests with a bst style.',R`pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex`, [
sec('文件与程序','Files and program','BibTeX 读取 aux 里的引用键、文献库与 bst 样式，再生成 bbl。正文用 cite，末尾用 bibliographystyle 选择样式，用 bibliography 指定 bib 文件名而不写扩展名。','BibTeX reads citation keys, bibliography databases, and the bst style requested through aux, then writes bbl. cite requests references; bibliographystyle selects the style and bibliography names the bib database without its extension.'),
sec('正确运行顺序','Correct run order','先运行 LaTeX 建立 aux，再执行 bibtex main，后面运行 LaTeX 两次读取文献并稳定引用。只跑 bibtex 没有文档上下文，只跑 LaTeX 则不会自动生成缺失的 bbl，除非编译工具调度了后端。','Run LaTeX to create aux, BibTeX on the job name, and LaTeX twice more to read the bibliography and stabilize references. BibTeX needs document context; repeated LaTeX alone does not create a missing bbl unless a build tool schedules the backend.'),
sec('样式与 natbib','Styles and natbib','plain、unsrt 等传统样式与 plainnat、unsrtnat 的 natbib 兼容样式不同。作者年份制需匹配含作者年份信息的样式；文献库本身不决定最终括号或排序。','Traditional styles such as plain and unsrt differ from natbib-compatible plainnat and unsrtnat. Author-year citation requires a suitable style. The database alone does not determine punctuation or sorting.'),
sec('Unicode 与迁移','Unicode and migration','传统 BibTeX 的 Unicode 排序与姓名解析能力有限；中文复杂数据可采用 Biber 加 biblatex，或按投稿要求使用合适国标 bst。BibTeX 和 Biber 是不同程序，不能交换命令而保留所有接口不变。','Traditional BibTeX has limited Unicode sorting and name-processing support. Complex multilingual data often suits Biber with biblatex, while mandated submissions may require a specific bst. BibTeX and Biber are different processors with different input contracts.'),
sec('错误检查','Checking failures','blg 日志记录缺字段、重复键、缺样式和语法错误。引用键大小写保持一致。nocite{*} 可列出全库供审核，最终论文则按引用需要筛选文献。','The blg log reports missing fields, duplicate keys, missing styles, and syntax errors. Keep citation-key spelling consistent. nocite{*} lists the database for inspection; select relevant records for the final paper.')],{example:'bibliography-natbib',related:['natbib','bib-fields','biblatex'],sources:[{label:'BibTeX documentation',url:'https://ctan.org/pkg/bibtex'}]});
entry('bib-fields','bibliography','.bib 条目、作者与字段','.bib entries, authors, and fields','让文献数据可核验、可复用且不依赖输出样式。','Keep bibliographic data verifiable, reusable, and separate from output style.',sampleBib.split('@article')[0],[
sec('条目结构','Record structure','条目以 @book、@article 等类型开头，花括号内首先是唯一键，再写字段。author 的不同作者用 and 分隔，姓名可用“姓, 名”。机构作者用双层花括号保护整体。','Entries begin with a type such as book or article, followed by a unique key and fields. Separate authors with and; “family, given” makes name structure explicit. Double braces protect an institutional author as one name.'),
sec('字段与大小写','Fields and capitalization','title 中专名、缩写可用花括号保护大小写；pages 用 1--12 表示范围。doi 通常填写 DOI 本体，url 填完整链接。BibTeX 的 journal/year 与 biblatex 的 journaltitle/date 等字段有接口差异。','Protect proper names and acronyms in titles with braces. Page ranges use a double hyphen. Store a DOI as its identifier and a URL as a complete link. Traditional journal/year fields differ from biblatex’s richer journaltitle/date interfaces.'),
sec('数据审核','Data review','作者、年份、卷期、DOI 和题名按真实出版页面核对。导入工具可能带入重复键或 HTML 残留。生成 PDF 前，检查文献表的字段与作者拆分是否正确。','Verify author, year, volume, issue, and DOI against the publication record. Imported data can contain duplicate keys or HTML remnants. Inspect the formatted bibliography for missing fields and incorrectly parsed names before delivery.')],{example:'bibliography-natbib',related:['bibtex','biblatex','gb7714']});
entry('natbib','bibliography','natbib：作者—年份与数字引用','natbib: author-year and numeric citations','配合 BibTeX 样式控制正文引用语法。','Control citation syntax with a compatible BibTeX style.',R`\usepackage[authoryear,round]{natbib}
\citet{knuth1984}\quad\citep{knuth1984}
\bibliographystyle{plainnat}
\bibliography{refs}`, [
sec('宏包与后端的分工','Package and backend roles','natbib 提供正文引用命令与标点控制，常与 BibTeX 及兼容 bst 配合，常见样式有 plainnat、abbrvnat、unsrtnat。biblatex 则采用独立接口，其中的 addbibresource 和 printbibliography 不属于 natbib。','natbib supplies citation commands and punctuation control, commonly paired with BibTeX and a compatible bst such as plainnat, abbrvnat, or unsrtnat. biblatex uses a separate interface; its addbibresource and printbibliography commands do not belong to natbib.'),
sec('叙述与括号','Textual and parenthetical forms','作者年份模式下 citet 输出作者（年份），适合作者成为句子成分；citep 输出（作者，年份），适合句末佐证。星号版本可展开完整作者列表，具体作者缩略规则仍受样式影响。','In author-year mode, citet puts the author in the sentence with the year in parentheses, while citep encloses the citation. Starred versions can print fuller author lists, subject to the selected style’s capabilities.'),
sec('可选注释参数','Optional note arguments','citep[前注][后注]{键} 可加入 see 与页码；只有一个可选参数时是后注。citealt 不加年份括号，citealp 去掉外层括号；citeauthor 和 citeyear 只取作者或年份。','Two optional arguments provide a prenote and postnote; a single optional argument is a postnote. citealt omits year parentheses, citealp omits outer parentheses, and citeauthor/citeyear print only the corresponding data.'),
sec('模式与样式一致性','Mode and style consistency','numbers、sort&compress 用于数字模式；作者年份模式需要兼容样式提供作者与年份数据。只有数字标签的普通 bst 不满足这一要求。bibpunct 或 setcitestyle 可调整标点，投稿时按模板配置。','numbers and sort&compress support numeric styles. Author-year output requires suitable author and year data from a compatible style; a purely numeric bst does not supply it. bibpunct or setcitestyle adjusts punctuation as permitted by the template.'),
sec('编译与冲突','Compilation and conflicts','编译顺序为 LaTeX→BibTeX→LaTeX→LaTeX。natbib 与 biblatex 不应同时加载；biblatex 的 natbib=true 是命令兼容层，不代表实际加载 natbib。修改样式或后端后清理旧产物再重建。','Build with LaTeX, BibTeX, then two LaTeX runs. Do not load natbib together with biblatex. biblatex’s natbib=true provides command compatibility rather than loading natbib. Rebuild stale artifacts after changing systems.')],{packages:['natbib'],example:'bibliography-natbib',related:['citet-citep','bibtex','biblatex','bib-fields'],sources:[{label:'natbib reference sheet and manual',url:'https://ctan.org/pkg/natbib'}]});
entry('citet-citep','bibliography',R`\citet 与 \citep：句法选择`,'citet and citep: choosing citation grammar','把作者放进句子，或把引用放进括号。','Put authors in the sentence or place the reference in parentheses.',R`\citet{knuth1984} describes TeX.
TeX is documented in detail \citep[see][p.~10]{knuth1984}.`,[
sec('命令归属','Command ownership','citet 和 citep 原生属于 natbib。作者年份模式下，citet 生成“Knuth (1984)”，citep 生成“(Knuth, 1984)”，实际标点由配置决定。数字模式下，两者仍有不同的叙述功能，输出随模式与样式设置变化。','citet and citep are native natbib commands. In author-year mode they produce textual and parenthetical forms, with punctuation configured by the style. Numeric-mode output follows its own mode and style settings.'),
sec('写作语法','Sentence grammar','“citet demonstrates...” 适合讨论作者的贡献；“the method is standard citep...” 适合在陈述后附出处。citep 已包含作者与外层括号，句中按需要安排这些信息，避免重复。','Use the textual form when discussing an author’s contribution and the parenthetical form after a claim. citep supplies the author and outer parentheses, so arrange the surrounding sentence without duplicating them.'),
sec('注释与文献键','Notes and keys','两个可选参数为前注、后注；多个键用逗号分隔。页码是引用位置而非修改文献条目的总页码。citeauthor/citeyear 可组合特殊句型，但过多手工拼装可能破坏标点一致性。','Optional arguments provide prenotes and postnotes; comma-separated keys request multiple sources. A page locator identifies the cited passage, not the publication’s full page range. Author/year-only commands support special wording but require careful punctuation.'),
sec('biblatex 的对应接口','Corresponding biblatex interfaces','biblatex 原生使用 textcite 与 parencite，autocite 则由样式决定引用形式。项目迁移需同时处理宏包、资源声明、文献输出和后端，以及正文引用命令。','biblatex natively uses textcite and parencite; autocite follows the style’s citation mode. Migration changes the package, resource declarations, bibliography output, backend, and citation commands together.'),
sec('排查 undefined','Diagnosing undefined commands','citet 未定义时，先确认文档类及项目使用的文献系统。natbib 项目加载对应宏包；biblatex 项目使用原生命令或明示的兼容选项，两套宏包分别使用。','If citet is undefined, first identify the bibliography system supplied by the class or project. A natbib project needs the corresponding package; a biblatex project uses native commands or explicitly supported compatibility options. Keep the two package systems separate.')],{packages:['natbib'],example:'bibliography-natbib',related:['natbib','biblatex','bibtex'],keywords:['citet','citep','叙述式引用','括号式引用','textual citation','parenthetical citation'],sources:[{label:'natbib reference sheet and manual',url:'https://ctan.org/pkg/natbib'},{label:'biblatex interfaces for comparison',url:'https://ctan.org/pkg/biblatex'}]});
entry('biblatex','bibliography','biblatex 与 Biber：现代文献系统','biblatex and Biber: modern bibliographies','分离引用样式、文献样式和数据后端。','Separate citation style, bibliography style, and processing backend.',R`\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{refs.bib}
\textcite{knuth1984}\parencite{knuth1984}
\printbibliography`,[
sec('系统结构','System structure','biblatex 用 LaTeX 宏控制文献与引用格式，Biber 处理数据、排序和姓名消歧。backend=biber 明确选择后端。style 同时选择文献与引用风格，也可分别用 bibstyle/citestyle。','biblatex formats references and citations through LaTeX macros. Biber processes data, sorting, and name disambiguation. backend=biber selects the processor. style selects both output styles, which can also be chosen independently through bibstyle/citestyle.'),
sec('资源与输出','Resources and output','addbibresource 在导言区声明带 .bib 扩展名的资源，多份资源可逐次声明。printbibliography 放在文献表所需的位置。文献表默认列出已引用或由 nocite 请求的条目，资源加载与条目选择分别处理。','Declare resources in the preamble with addbibresource, including the .bib extension, and repeat for multiple files. Place printbibliography where the list belongs. By default, citations and nocite select the records printed; resource loading is a separate step.'),
sec('命令语义','Citation commands','textcite 将作者融入句子，parencite 输出括号式引用，autocite 根据样式选择括号或脚注等形式。cite 的括号形式取决于配置。前注与后注用于精确的页码或章节定位。','textcite integrates authors into prose, parencite produces a parenthetical form, and autocite follows the style’s chosen mode. The parentheses around cite output depend on configuration. Notes can provide precise page or section locators.'),
sec('编译链与版本','Build chain and versions','先运行 LaTeX 生成 bcf，然后 biber main，再运行 LaTeX 两次。Biber 与 biblatex 的版本需要兼容，升级发行版时一起更新。文献不显示先看 Biber 的 blg 与 LaTeX 的重编译提示。','Run LaTeX to produce bcf, then biber main, then LaTeX twice. Biber and biblatex versions must be compatible and should be updated together. For missing references, inspect the Biber log and LaTeX rerun requests.'),
sec('高级组织与兼容','Advanced organization and compatibility','refsection 建立独立引用区域，关键词或类型过滤可生成分组文献表。APA、Chicago 和 GB/T 等使用相应样式宏包，并核对规范。样式由 biblatex 选项配置；natbib 和 bibliographystyle 属于另一套文献接口，不能混用。','refsection creates independent citation contexts, and keyword or type filters produce grouped bibliographies. APA, Chicago, and GB/T requirements use appropriate styles with specification checks. Configure styles through biblatex options; natbib and bibliographystyle belong to a separate bibliography interface and cannot be mixed into this setup.')],{packages:['biblatex','csquotes'],example:'bibliography-biblatex',related:['natbib','bib-fields','gb7714'],sources:[{label:'biblatex documentation',url:'https://ctan.org/pkg/biblatex'},{label:'Biber documentation',url:'https://ctan.org/pkg/biber'}]});
entry('gb7714','bibliography','GB/T 7714：两条文献实现路线','GB/T 7714: two implementation routes','区分 biblatex 国标样式与 BibTeX 国标样式。','Distinguish biblatex and BibTeX implementations of the standard.',R`\usepackage[backend=biber,style=gb7714-2015]{biblatex}
\addbibresource{refs.bib}
\printbibliography`,[
sec('biblatex 路线','The biblatex route','biblatex-gb7714-2015 提供 gb7714-2015 等样式，通常配合 Biber 和 biblatex。数字与作者年份制分别选择相应样式，并使用匹配的正文引用命令。','biblatex-gb7714-2015 provides styles such as gb7714-2015 for biblatex and normally Biber. Select the numeric or author-year variant and use matching citation commands.'),
sec('BibTeX 路线','The BibTeX route','gbt7714 提供 BibTeX bst 与配套引用设置，使用 bibliography/bibliographystyle 的传统链。两种方案处理文献表与引用的机制不同，选一种与模板兼容的方案。','gbt7714 supplies BibTeX styles and associated citation configuration, using the traditional bibliography/bibliographystyle chain. The two implementations have different mechanisms; choose the one supported by the document template.'),
sec('版本与数据核验','Version and data checks','样式名称中的 2015 标明实现的标准版本；学校补充细则需另行核对。实际输出中检查中文作者、类型标识、在线日期、DOI 和 URL。缺失的文献字段需要补全数据。','The 2015 style name identifies the implemented standard version. Check institutional supplements separately, along with Chinese names, type labels, access dates, DOI, and URL output. Missing fields require complete bibliographic data.')],{packages:['biblatex-gb7714-2015'],example:'bibliography-gb7714',engines:['xelatex','lualatex'],related:['biblatex','bibtex','ctex'],sources:[{label:'biblatex-gb7714-2015',url:'https://ctan.org/pkg/biblatex-gb7714-2015'},{label:'gbt7714',url:'https://ctan.org/pkg/gbt7714'}]});
entry('hyperref','crossrefs','hyperref：PDF 链接、书签与元数据','hyperref: PDF links, bookmarks, and metadata','给引用、目录与外部地址建立可导航链接。','Make references, contents, and external addresses navigable.',R`\usepackage[colorlinks=true,linkcolor=teal,citecolor=teal,urlcolor=blue]{hyperref}
\hypersetup{pdftitle={Research paper},pdfauthor={A. Author}}
\href{https://www.latex-project.org/}{LaTeX Project}`, [
sec('链接类型','Link types','hyperref 把内部 ref、目录和部分引用变为链接。href 接收目标 URL 与显示文本，url 显示网址，hyperref[标签]{文本} 建立自定义内部跳转。目标编号仍由 label 绑定的位置决定。','hyperref links internal references, contents, and supported citations. href takes a URL and visible text; url prints an address; hyperref with a label creates custom internal link text. The position of label determines the referenced counter value.'),
sec('视觉与元数据','Appearance and metadata','colorlinks=true 用颜色标识文字链接，linkcolor/citecolor/urlcolor 分别控制内部、文献和外部链接。hidelinks 隐藏可见边框和链接颜色。pdftitle、pdfauthor、pdfsubject 和 pdfkeywords 设置 PDF 元数据。','colorlinks=true uses colored text; linkcolor, citecolor, and urlcolor distinguish internal, citation, and external links. hidelinks removes visible borders and link coloring. Metadata options include title, author, subject, and keywords.'),
sec('加载顺序','Load order','hyperref 通常靠后加载，cleveref 一般在其后，bookmark 也可随后加载。Beamer 已包含 hyperref，使用 hypersetup 配置。特殊模板的加载顺序以手册为准。','hyperref is usually loaded late; cleveref generally follows it, and bookmark can follow it too. Beamer already includes hyperref, configured through hypersetup. Follow the manual’s load order for specialized templates.'),
sec('书签与数学标题','Bookmarks and mathematical headings','书签使用 PDF 文本形式，标题中的数学与字体命令可能产生 PDF string 警告。texorpdfstring{排版内容}{书签文本} 提供两种表示。中文书签依赖正确编码与引擎支持，独立于网页字体配置。','Bookmarks use PDF strings; mathematical or formatting commands in headings may trigger warnings. texorpdfstring supplies separate typeset and bookmark text. Chinese bookmarks require appropriate encoding and engine support, independently of website font settings.'),
sec('锚点与重复目的地','Anchors and duplicate destinations','无编号标题添加目录项时，phantomsection 建立目标锚点；缺少锚点可能使目录跳到上一章节。页码或公式计数器重置后，检查 duplicate destination 诊断与唯一锚点表示，并验证实际跳转。','Use phantomsection to establish a destination before adding an unnumbered contents entry. Otherwise it may link to an earlier heading. Counter resets can create duplicate destinations; inspect unique anchor representations and test the actual links.')],{packages:['hyperref'],example:'hyperref-cleveref',related:['cross-references','cleveref','contents-bookmarks'],sources:[{label:'hyperref manual',url:'https://ctan.org/pkg/hyperref'},{label:'bookmark manual',url:'https://ctan.org/pkg/bookmark'}]});
entry('cross-references','crossrefs',R`\label、\ref、\eqref 与 \pageref`,'label, ref, eqref, and pageref','引用由计数器与辅助文件建立。','References depend on counters and auxiliary files.',R`\section{Model}\label{sec:model}
\begin{equation}\label{eq:model}y=\beta x\end{equation}
Section~\ref{sec:model}; equation~\eqref{eq:model}; page~\pageref{eq:model}.`,[
sec('绑定对象','Binding a target','label 记录最近建立的可引用计数器值，章节后放章节 label，caption 后放图表 label，编号公式内部放公式 label。ref 取编号，pageref 取页码，eqref 由 amsmath 提供并添加括号。','label records the current reference value. Place it after a heading or caption, or inside a numbered equation. ref prints the number, pageref the page, and amsmath’s eqref wraps an equation number in parentheses.'),
sec('辅助文件与多次编译','Auxiliaries and repeated runs','第一轮把标签写入 aux，下一轮读取并替换引用；增删章节或分页改变后可能继续需要一轮。问号通常指标签未知或尚未稳定，不是字体渲染错误。latexmk 可以调度重复运行。','The first run writes labels to aux and the next reads them. Structural edits may require additional runs until stable. Question marks generally indicate unknown or unresolved labels, not a font issue. latexmk can schedule the repeated runs.'),
sec('命名与锚点','Names and anchors','使用 sec:、fig:、tab:、eq: 等语义前缀并保证唯一。autoref 给出类型名称，nameref 给出标题文字，cleveref 处理组合类型与范围。无编号对象需要显式设计，不应借用上一个计数器。','Use unique semantic prefixes such as sec:, fig:, tab:, and eq:. autoref adds a type name, nameref prints heading text, and cleveref handles combined types and ranges. Unnumbered objects require explicit reference design rather than borrowing an earlier counter.')],{example:'hyperref-cleveref',packages:['amsmath','hyperref'],related:['equation','caption','hyperref','cleveref']});
entry('cleveref','crossrefs','cleveref 与 varioref：智能引用','cleveref and varioref: smarter references','自动加入对象类型或相对页面描述。','Add object names or contextual page descriptions.',R`\usepackage{hyperref}
\usepackage[nameinlink,noabbrev]{cleveref}
\cref{eq:a,eq:b}\quad\Cref{fig:result}`, [
sec('类型识别','Recognizing target types','cleveref 的 cref 自动选择 equation、figure 或 section 等名称，Cref 适合句首大写。多个标签可按类型组织、排序和压缩范围；nameinlink 让名称也成为链接。','cleveref’s cref supplies target types such as equation, figure, or section, while Cref uses sentence-initial capitalization. Lists can be grouped and compressed by type. nameinlink includes the type name in the link.'),
sec('译名与自定义对象','Names and custom objects','crefname/Crefname 指定单复数名称，中文文档可配置中文译名。自定义定理类型需在环境定义和标签记录时保留正确类型。加载顺序一般是 amsmath、hyperref、cleveref。','crefname and Crefname define singular and plural names, including Chinese names. Custom theorem types require correct type information during definition and labeling. A common load order is amsmath, hyperref, then cleveref.'),
sec('相对页面与稳定性','Relative pages and stability','varioref 的 vref 可补充“上一页”等上下文描述，分页改变后可能需要更多编译轮次。智能引用已提供类型名称，正文可直接衔接引用。旧模板或新 PDF 功能的兼容条件见当前宏包说明。','varioref’s vref can add contextual page wording. Pagination changes may require more runs. Smart references supply the type name, so the surrounding prose can lead directly into the reference. Check current compatibility notes for older templates or newer PDF features.')],{example:'hyperref-cleveref',packages:['cleveref'],related:['hyperref','cross-references'],sources:[{label:'cleveref',url:'https://ctan.org/pkg/cleveref'},{label:'varioref',url:'https://ctan.org/pkg/varioref'}]});
entry('contents-bookmarks','crossrefs','目录、图表目录与 PDF 书签','Contents, lists, and PDF bookmarks','区分印刷目录、编号深度与导航书签。','Distinguish printed contents, numbering depth, and navigation bookmarks.',R`\tableofcontents\listoffigures\listoftables
\setcounter{tocdepth}{2}\setcounter{secnumdepth}{3}
\section*{Acknowledgements}\phantomsection
\addcontentsline{toc}{section}{Acknowledgements}`, [
sec('目录文件','Contents files','tableofcontents 读取 toc，listoffigures/listoftables 读取对应的图表目录辅助文件。首次运行目录可能为空。标题的可选短文本控制目录项，正文完整标题仍可保留。','tableofcontents reads toc, while listoffigures and listoftables read their auxiliary lists. A first run may be empty. Optional short heading or caption text can simplify list entries without shortening the displayed title.'),
sec('深度与无编号条目','Depth and unnumbered entries','tocdepth 决定哪些层级进入目录，secnumdepth 决定哪些层级编号；两者独立。星号章节通常不自动进入目录，addcontentsline 显式添加；使用 hyperref 时配合正确锚点。','tocdepth controls contents inclusion and secnumdepth controls numbering independently. Starred headings usually do not enter contents automatically. addcontentsline adds them, with a suitable anchor when hyperref is active.'),
sec('样式与书签','Styles and bookmarks','tocloft 和 titletoc 设置印刷目录外观，bookmark 管理 PDF 导航书签。选用目录布局方案时，以文档类为基础，并核对 KOMA/memoir 的原生目录接口。','tocloft and titletoc style printed contents, while bookmark manages PDF navigation. Choose a contents layout for the document class and check KOMA or memoir’s native interfaces before replacing them.')],{example:'hyperref-cleveref',related:['hyperref','cross-references','book'],sources:[{label:'bookmark',url:'https://ctan.org/pkg/bookmark'},{label:'tocloft',url:'https://ctan.org/pkg/tocloft'},{label:'titletoc',url:'https://ctan.org/pkg/titlesec'}]});
// Extra detail where parameters and downstream effects require separate treatment.
for(const id of ['ctexart','standalone','mathbb','mathcal']) {
 const x=D.entries.find(y=>y.id===id);
 const extra={
 ctexart:[sec('章节与目录编号','Heading and contents numbering','ctexart 的章节编号由 section 计数器与显示格式决定，目录深度仍用 tocdepth。ctexset 修改标题外观不代表自动改变目录样式；需要目录规则时单独测试短标题、长标题和无编号标题。','Section counters and display formats determine ctexart numbering, while tocdepth still controls contents depth. Heading appearance and contents formatting are separate. Test short, long, and unnumbered headings when designing contents rules.'),sec('完整编译流程','Complete compilation workflow','保存 UTF-8 tex 后运行 xelatex，目录和公式标签通常再运行一次。若出现字体错误，确认 Fandol 字体包完整；若使用自己的字体集，先用本页可移植例子验证引擎。','Save the source as UTF-8 and run xelatex, usually again for contents and labels. Check that Fandol fonts are installed if font errors occur. Validate the engine with the portable example before introducing a custom font set.')],
 standalone:[sec('公式图与多对象输出','Formula figures and multiple objects','独立公式可在正文直接放数学内容，页面由预览机制裁剪。多个 tikzpicture 或其他对象的多页输出由 multi 等选项控制，不能假设空行会自动生成独立页面。','A standalone formula can be placed directly in the body and cropped by the preview machinery. Multi-object output uses options such as multi; blank source lines do not automatically create separate output pages.'),sec('主文档中的复用','Reuse from a main document','预先编译 PDF 后，用 includegraphics 插入可以固定图形产物且减少主文档工作量。直接输入图源则统一字体与宏，但要求主导言区具备依赖。团队项目应明确采用哪条路径并记录工具链。','Including a precompiled PDF fixes the figure artifact and reduces main-document work. Inputting source unifies fonts and macros but requires the main preamble to provide dependencies. Choose and document one reuse workflow for a shared project.')],
 mathbb:[sec('错误示例与修复','Failure and repair','未加载字体支持时，mathbb 通常报 Undefined control sequence。传统方案在导言区加载 amsfonts 或 amssymb。命令已定义却字形不正确时，检查所选字体的覆盖范围。','Without alphabet support, mathbb normally produces an undefined-command error. Load amsfonts or amssymb for the traditional route. If the command exists but a glyph is wrong, inspect the selected font’s coverage.')],
 mathcal:[sec('字号与上下标','Sizes and scripts','书法字族可用于上下标，字形和可读性取决于数学字体的小字号设计，字号由数学脚本机制处理。两个花体对象相似时，修改符号名称通常比增加字体区分更清楚。','Calligraphic alphabets can appear in scripts; their readability depends on the math font’s small-size design. Mathematical script sizing handles their scale. Clearer symbol names often help more than adding another similar script face.'),sec('依赖错误','Dependency failures','mathcal 在常规 LaTeX 中可用，mathscr 则通常需要 mathrsfs 或其他提供该命令的字体方案。只复制公式而不复制导言区依赖会导致未定义命令。完整示例同时给出两种字族与依赖。','mathcal is available in ordinary LaTeX, while mathscr generally needs mathrsfs or another provider. Copying only the expression can omit its required preamble. The complete example supplies both alphabets and their dependencies.')]
 };
 x.sections.push(...extra[id]);
}
let dictCount=0;
function dict(module,category,linked,rows){for(const [command,zh,en,dz,de,ex,pkg,math] of rows){D.dictionary.push({id:'core-command-'+(++dictCount),module,category,entry:linked,command,title:bi(zh,en),detail:bi(dz,de),example:ex,package:pkg||'LaTeX kernel',...(math?{math}:{})});}}
for(const [id,z,e,ex,syntax] of classRecords){dict('classes','classes',id,[[id,z,e,'将类名传给 documentclass；选项和兼容条件以该类文档为准。','Pass the class name to documentclass. Its documentation defines the supported options and compatibility.',syntax,id]]);}
dict('syntax','document','commands-groups',[
[R`\documentclass`,'选择文档类','Select a document class','每个文档加载一个类；方括号给出类选项。','Load one class per document; bracket arguments supply class options.',R`\documentclass[11pt]{article}`],
[R`\usepackage`,'加载宏包','Load a package','在导言区加载宏包，可给宏包传入选项。','Load dependencies in the preamble, optionally passing package settings.',R`\usepackage{amsmath}`],
[R`\begin`,'开始环境','Start an environment','环境名称必须与对应 end 配对。','The environment name must match the corresponding end.',R`\begin{document}`],
[R`\end`,'结束环境','End an environment','先结束内层环境，再结束外层环境。','Close inner environments before their surrounding environments.',R`\end{document}`],
[R`\textbf`,'文本粗体','Bold text','接收一个文本参数；数学粗体使用数学字族。','Takes a text argument; mathematical bold uses math interfaces.',R`\textbf{Important}`],
[R`\bfseries`,'粗体声明','Bold declaration','声明的作用范围到当前组结束，文本直接写在声明之后。','The declaration applies through the current group; text follows it directly.',R`{\bfseries Important}`],
[R`\par`,'结束段落','End a paragraph','结束当前段落，按文档设置启动段落间距与缩进。','Ends the paragraph and applies paragraph-spacing and indentation rules.',R`First paragraph.\par Second paragraph.`]
]);
dict('syntax','document','paragraphs',[
[R`\noindent`,'取消当前段缩进','Suppress current indentation','在段落开头取消本段首行缩进，不修改全局段落设置。','At a paragraph start, suppresses its first-line indent without changing global settings.',R`\noindent A paragraph.`],
[R`\newline`,'正文强制换行','Force a prose line break','结束当前行但不建立新段落。','Ends the current line without starting a new paragraph.',R`Line one\newline Line two`],
[R`\\`,'环境行结束或换行','Row ending or line break','正文、表格与数学环境中含义不同；不能替代段落。','Its meaning depends on prose, table, or math context; it does not replace paragraphs.',R`A&B\\`]
]);
dict('characters','document','escapes',[
[R`\%`,'输出百分号','Print a percent sign','未转义 % 注释本行；转义后显示百分号。','Unescaped percent comments out the line; this prints a percent sign.',R`Growth: 5\%.`],
[R`\$`,'输出美元符号','Print a dollar sign','在文本中输出美元符号，不开启数学模式。','Prints the currency mark without opening math mode.',R`Price: \$10.`],
[R`\&`,'输出与号','Print an ampersand','表格单元格中也用转义形式输出 &，不增加对齐列。','Prints an ampersand as cell content without adding an alignment column.',R`A\&B`],
[R`\#`,'输出井号','Print a hash sign','普通文本显示井号；原始 # 用于宏参数。','Prints a hash in prose; raw hash denotes macro parameters.',R`Item \#1`],
[R`\_`,'输出下划线','Print an underscore','文本下划线不同于数学下标。','A literal underscore differs from a mathematical subscript.',R`file\_name`],
[R`\{`,'输出左花括号','Print a left brace','打印左花括号，局部分组使用未转义的花括号。','Prints a left brace; local groups use unescaped braces.',R`\{x\}`],
[R`\}`,'输出右花括号','Print a right brace','打印右花括号，局部分组使用未转义的花括号。','Prints a right brace; local groups use unescaped braces.',R`\{x\}`],
[R`\textbackslash`,'文本反斜杠','Text backslash','输出可见反斜杠；双反斜杠通常表示换行。','Prints a visible backslash; a double backslash usually ends a line or row.',R`\textbackslash command`],
[R`\textasciitilde`,'文本波浪号','Text tilde','打印波浪号；源码 ~ 通常是不换行空格。','Prints a tilde; a raw tilde normally creates a nonbreaking space.',R`\textasciitilde user`],
[R`\textasciicircum`,'文本脱字符','Text caret','打印脱字符；数学 ^ 用于上标。','Prints a caret; mathematical caret introduces a superscript.',R`\textasciicircum`],
['~','不换行空格','Nonbreaking space','连接 Section 与编号，避免两者在行末分离。','Keeps a word and reference number together across line breaking.',R`Section~\ref{sec:model}`]
]);
dict('characters','document','verb',[[R`\verb`,'行内原样代码','Inline literal code','用选定分隔符界定单行原样内容；分隔符不能出现在内容中，普通宏参数中不可用。','Delimits a single source line of literal content. Choose a delimiter absent from that content; ordinary macro arguments are unsupported.',R`\verb|a_b%|`],[R`\verb*`,'显示空格的代码','Literal code with visible spaces','星号形式显示空格标记，适合教学源码示例。','The starred form marks spaces visibly for source demonstrations.',R`\verb*|a b|`]]);
dict('characters','document','verbatim',[['verbatim','原样代码环境','Literal code environment','保留源码行与特殊字符；Beamer 中需 fragile。','Preserves source lines and special characters; Beamer needs fragile.',R`\begin{verbatim}
a_b%#
\end{verbatim}`]]);
dict('characters','document','detokenize',[[R`\detokenize`,'标记转字符','Tokens to characters','转换已读取标记，不能恢复被百分号注释掉的源码。','Converts already-read tokens and cannot recover commented-out source.',R`\texttt{\detokenize{file_name.tex}}`]]);
const envDict=[
['equation','编号公式','Numbered equation','每个环境建立一个编号。','Each environment establishes one equation number.',R`\begin{equation}a=b\end{equation}`,'equation'],
['equation*','无编号公式','Unnumbered equation','星号形式取消编号，需要 amsmath。','The starred form suppresses numbering and needs amsmath.',R`\begin{equation*}a=b\end{equation*}`,'equation'],
['align','多行对齐','Multiline alignment','每行默认编号，& 通常放等号前。','Rows normally have numbers; place ampersands before relation signs.',R`\begin{align}a&=b\\c&=d\end{align}`,'align'],
['align*','无编号对齐','Unnumbered alignment','保留对齐结构，取消全部行编号。','Keeps alignment while suppressing all row numbers.',R`\begin{align*}a&=b\end{align*}`,'align'],
['aligned','内部对齐块','Inner alignment block','需要外层数学模式，不单独编号。','Needs an outer math context and does not number itself.',R`\[\begin{aligned}a&=b\\&=c\end{aligned}\]`,'aligned'],
['gather','分别居中公式','Centered equations','每行独立居中，不用 & 建等号列。','Centers each row independently without ampersand alignment columns.',R`\begin{gather}a=b\\c=d\end{gather}`,'gather-multline'],
['gather*','无编号居中公式','Unnumbered centered equations','居中多行公式并取消编号。','Centers several equations without numbers.',R`\begin{gather*}a=b\end{gather*}`,'gather-multline'],
['multline','长公式拆行','Broken long equation','首行靠左、末行靠右，共用一个编号。','First line left and last line right, with one number.',R`\begin{multline}a+b+c\\=d+e\end{multline}`,'gather-multline'],
['multline*','无编号长公式','Unnumbered broken equation','保持 multline 布局，取消编号。','Retains multline layout without a number.',R`\begin{multline*}a+b\\=c\end{multline*}`,'gather-multline'],
['split','单公式拆分','Split equation','在外层行间环境中共享编号并对齐。','Shares the enclosing display number while aligning rows.',R`\begin{equation}\begin{split}a&=b\\&=c\end{split}\end{equation}`,'split'],
['cases','分段函数','Piecewise function','左花括号与两列；条件说明使用 text。','A left brace and two columns; use text for prose conditions.',R`\[f(x)=\begin{cases}x&x\ge0\\-x&x<0\end{cases}\]`,'cases'],
['subequations','子公式编号组','Subequation group','外层主标签与内层子标签记录不同编号。','Parent and child labels record distinct reference values.',R`\begin{subequations}\begin{equation}a=b\end{equation}\end{subequations}`,'subequations'],
['matrix','无定界符矩阵','Matrix without delimiters','使用 amsmath，列数由每行 & 决定。','Provided by amsmath; ampersands define row columns.',R`\begin{matrix}1&0\\0&1\end{matrix}`,'matrices'],
['pmatrix','圆括号矩阵','Parenthesized matrix','添加自动大小的圆括号。','Adds automatically sized parentheses.',R`\begin{pmatrix}1&0\\0&1\end{pmatrix}`,'matrices'],
['bmatrix','方括号矩阵','Square-bracket matrix','添加方括号，适合矩阵或块表示。','Adds square brackets for matrices or blocks.',R`\begin{bmatrix}1&0\\0&1\end{bmatrix}`,'matrices'],
['Bmatrix','花括号矩阵','Brace-delimited matrix','大写 B 与小写 b 是不同环境。','Uppercase B and lowercase b select different delimiters.',R`\begin{Bmatrix}1&0\\0&1\end{Bmatrix}`,'matrices'],
['vmatrix','单竖线矩阵','Single-bar matrix','常用于行列式，含义须由数学语境确定。','Often used for determinants; meaning depends on context.',R`\begin{vmatrix}a&b\\c&d\end{vmatrix}`,'matrices'],
['Vmatrix','双竖线矩阵','Double-bar matrix','常用于范数，区别于行列式单竖线。','Often denotes norms and differs from determinant bars.',R`\begin{Vmatrix}a&b\\c&d\end{Vmatrix}`,'matrices'],
['array','数学列阵','Mathematical array','必选列规格控制对齐，必须放在数学模式。','A mandatory column specification controls alignment inside math mode.',R`\begin{array}{lr}a&b\\c&d\end{array}`,'array-math'],
['smallmatrix','行内小矩阵','Small inline matrix','压缩矩阵但不自动添加括号。','Creates compact inline matrices without automatically adding delimiters.',R`(\begin{smallmatrix}1&0\\0&1\end{smallmatrix})`,'array-math']
];
for(const [cmd,z,e,bz,be,ex,link] of envDict)dict('math-environments','math',link,[[cmd,z,e,bz,be,ex,'amsmath',['matrix','pmatrix','bmatrix','Bmatrix','vmatrix','Vmatrix','smallmatrix','cases','aligned'].includes(cmd)?ex.replace(/^\\\[/,'').replace(/\\\]$/,''):null]]);
dict('math-environments','math','equation',[
[R`\eqref`,'带括号公式引用','Parenthesized equation reference','读取公式编号并添加圆括号。','Prints an equation reference with parentheses around its number.',R`\eqref{eq:model}`,'amsmath'],
[R`\notag`,'取消本行编号','Suppress this row number','在 align 等环境取消当前行标签。','Suppresses the number of the current alignment row.',R`a&=b\notag`,'amsmath'],
[R`\tag`,'指定公式显示标签','Set a displayed equation tag','标签改变显示编号；唯一引用与锚点仍需检查。','Changes the displayed tag; references and anchors still require checking.',R`\tag{A}`,'amsmath'],
[R`\numberwithin`,'按章节编号','Number within a sectional unit','关联计数器重置与显示格式。','Connects counter resetting with the displayed numbering format.',R`\numberwithin{equation}{section}`,'amsmath']
]);
dict('math-fonts','math','mathbb',[[R`\mathbb`,'黑板粗体','Blackboard bold','标准 AMS 字体主要支持大写拉丁字母。','The standard AMS alphabet mainly supports uppercase Latin letters.',R`\mathbb{R}`,'amsfonts',R`\mathbb{R}`]]);
dict('math-fonts','math','mathcal',[[R`\mathcal`,'书法数学字族','Calligraphic alphabet','默认字族主要覆盖大写字母，无需单独宏包。','The default alphabet mainly covers uppercase letters and needs no extra package.',R`\mathcal{F}`,'LaTeX kernel',R`\mathcal{F}`],[R`\mathscr`,'花体数学字族','Script alphabet','mathrsfs 提供此接口；实际外观取决于字体方案。','mathrsfs supplies this interface; appearance depends on the font setup.',R`\mathscr{F}`,'mathrsfs',R`\mathscr{F}`]]);
dict('math-fonts','math','math-alphabets',[
[R`\mathfrak`,'哥特数学字族','Fraktur alphabet','常用于代数结构，传统路线需要 AMS 字体。','Often used for algebraic structures; traditional setup needs AMS fonts.',R`\mathfrak{g}`,'amsfonts',R`\mathfrak{g}`],
[R`\mathrm`,'数学正体','Upright roman math','选择正体字族；命名运算符的间距由运算符接口处理。','Selects an upright alphabet; named-operator spacing requires an operator interface.',R`\mathrm{d}x`,null,R`\mathrm{d}x`],
[R`\mathbf`,'粗体正体字母','Bold upright letters','通常用于向量，但不能普遍加粗希腊字母。','Commonly denotes vectors but does not generally bold Greek letters.',R`\mathbf{x}`,null,R`\mathbf{x}`],
[R`\mathit`,'数学文本式斜体','Text-style math italic','适合斜体多字母标识，仍不同于正文 text。','Provides italic multi-letter identifiers and differs from prose text.',R`\mathit{abc}`,null,R`\mathit{abc}`],
[R`\mathsf`,'无衬线数学字族','Sans-serif math alphabet','可用于特定算子或矩阵约定，含义由正文定义。','May encode a particular operator or matrix convention defined in prose.',R`\mathsf{A}`,null,R`\mathsf{A}`],
[R`\mathtt`,'等宽数学字族','Monospaced math alphabet','用于数学标识，代码块仍应用原样环境。','Useful for math identifiers; code blocks still need literal environments.',R`\mathtt{A}`,null,R`\mathtt{A}`]
]);
dict('math-fonts','math','bold-math',[[R`\boldsymbol`,'粗体数学符号','Bold mathematical symbols','由 amsbsy 提供，amsmath 自动加载。','Supplied by amsbsy, which amsmath loads automatically.',R`\boldsymbol{\alpha}`,'amsmath',R`\boldsymbol{\alpha}`],[R`\bm`,'广泛符号加粗','General symbol bolding','需要 bm 宏包，并依赖可用粗体字体。','Needs bm and suitable bold font resources.',R`\bm{\Sigma}`,'bm',R`\boldsymbol{\Sigma}`]]);
dict('math-fonts','math','text-operators',[[R`\text`,'数学中的说明文字','Text within mathematics','随数学脚本大小排版说明文字。','Typesets prose at the appropriate mathematical script size.',R`\text{if }x>0`,'amsmath',R`\text{if }x>0`],[R`\operatorname`,'临时命名运算符','Local named operator','使用正体和运算符间距，适合一次性 rank 等名称。','Uses upright type and operator spacing for occasional names.',R`\operatorname{rank}(A)`,'amsmath',R`\operatorname{rank}(A)`],[R`\DeclareMathOperator`,'定义运算符命令','Define an operator command','导言区定义可复用运算符；星号允许显示式下置极限。','Defines reusable operators in the preamble; the star enables display-style limits.',R`\DeclareMathOperator{\Var}{Var}`,'amsmath']]);
dict('chinese','packages','ctex',[[R`\ctexset`,'中文格式键值配置','Chinese formatting keys','修改章节名称、编号、字体和间距。','Configures heading names, numbering, fonts, and spacing.',R`\ctexset{section={format=\Large\bfseries}}`,'ctex'],[R`\zihao`,'中文字号','Chinese font sizes','例如 -4 为小四；不等同于标准类字号选项。','For example, -4 is xiaosi; this differs from standard-class size options.',R`\zihao{-4}`,'ctex']]);
dict('chinese','packages','xeCJK',[[R`\setCJKmainfont`,'中文主字体','Chinese main font','设置 CJK 正文族，西文正文另用 setmainfont 设置。','Sets the CJK prose family separately from the Latin main font.',R`\setCJKmainfont{FandolSong-Regular.otf}`,'xeCJK'],[R`\setCJKsansfont`,'中文无衬线字体','Chinese sans-serif font','在 XeLaTeX 中设置 CJK 无衬线族。','Selects the CJK sans-serif family under XeLaTeX.',R`\setCJKsansfont{FandolHei-Regular.otf}`,'xeCJK']]);
dict('chinese','packages','fontspec',[[R`\setmainfont`,'西文主字体','Latin main font','只用于 XeLaTeX/LuaLaTeX，须有对应字体资源。','Requires XeLaTeX/LuaLaTeX and the named font resource.',R`\setmainfont{texgyretermes-regular.otf}`,'fontspec'],[R`\setsansfont`,'西文无衬线字体','Latin sans-serif font','设置文本无衬线族，不直接改数学字体。','Sets the text sans-serif family without directly changing mathematics.',R`\setsansfont{texgyreheros-regular.otf}`,'fontspec'],[R`\setmonofont`,'文本等宽字体','Text monospaced font','代码字体应检查空格、符号和缺字覆盖。','Inspect spaces, symbols, and glyph coverage for code typography.',R`\setmonofont{lmmono10-regular.otf}`,'fontspec']]);
dict('chinese','math','unicode-math',[[R`\setmathfont`,'OpenType 数学字体','OpenType math font','选择带 MATH 表的 OpenType 数学字体。','Selects an OpenType font with a MATH table for mathematics.',R`\setmathfont{Latin Modern Math}`,'unicode-math'],[R`\symbb`,'Unicode 黑板字族','Unicode blackboard alphabet','字形覆盖由当前 OpenType 数学字体决定。','Glyph coverage is determined by the selected OpenType math font.',R`\symbb{R}`,'unicode-math'],[R`\symbf`,'Unicode 粗体数学','Unicode bold mathematics','直接选择数学粗体字族。','Directly selects a bold mathematical alphabet.',R`\symbf{\alpha}`,'unicode-math']]);
dict('tables','packages','tabular',[
['tabular','普通表格','Ordinary table','列规格创建不可自动跨页的表格盒子。','Column specifications create a table box that cannot paginate automatically.',R`\begin{tabular}{lr}A&1\\\end{tabular}`],
['table','表格浮动体','Table float','使题注与表体整体浮动，单元格结构由 tabular 等表格环境定义。','Floats the caption and body as one object; tabular defines the cell structure.',R`\begin{table}[htbp]\centering\caption{Data}\end{table}`],
[R`\multicolumn`,'合并列','Span columns','三个参数为跨列数、局部格式与内容。','Takes the span count, local alignment, and cell content.',R`\multicolumn{2}{c}{Results}`]
]);
dict('tables','packages','tabularx',[['tabularx','可变宽度表格','Flexible-width table','必选总宽度，X 列分配剩余空间但不能跨页。','Requires a total width; X columns share spare space without pagination.',R`\begin{tabularx}{\linewidth}{lX}A&Description\\\end{tabularx}`,'tabularx']]);
dict('tables','packages','longtable',[
['longtable','跨页表格','Multipage table','直接参与输出例程，不能嵌在 table 内或用于双栏页。','Participates in page output; do not put it inside table or on two-column pages.',R`\begin{longtable}{lr}A&1\\\end{longtable}`,'longtable'],
[R`\endfirsthead`,'第一页表头结束','End first-page header','其前的区域只在第一页作表头。','The preceding header region is used on the first page only.',R`\toprule A&B\\\midrule\endfirsthead`,'longtable'],
[R`\endhead`,'后续页表头结束','End recurring header','其前的区域用于后续页面重复表头。','Finishes the header region repeated on subsequent pages.',R`\toprule A&B\\\midrule\endhead`,'longtable'],
[R`\endfoot`,'普通表尾结束','End nonfinal footer','定义除末页之外页面的表尾。','Defines the footer for pages preceding the final page.',R`\multicolumn{2}{r}{Continued}\\\endfoot`,'longtable'],
[R`\endlastfoot`,'末页表尾结束','End final footer','定义最后一页底线或完整表注。','Defines final-page rules or notes.',R`\bottomrule\endlastfoot`,'longtable']
]);
dict('tables','packages','booktabs',[
[R`\toprule`,'顶线','Top rule','放在表头上方，含合适的线周围间距。','Places a rule above the header with deliberate surrounding spacing.',R`\toprule`,'booktabs'],
[R`\midrule`,'中线','Middle rule','区分表头和数据或信息组。','Separates the header from data or distinct information groups.',R`\midrule`,'booktabs'],
[R`\bottomrule`,'底线','Bottom rule','结束表体；长表在末页表尾中使用。','Ends the body; in long tables, place it in the final footer.',R`\bottomrule`,'booktabs'],
[R`\cmidrule`,'局部横线','Partial rule','列范围指定绘线区域，l/r 裁剪两端。','Column ranges select the segment; l/r trim its ends.',R`\cmidrule(lr){2-3}`,'booktabs'],
[R`\addlinespace`,'数据行留白','Whitespace between rows','通过行间空白区分数据组。','Separates data groups with space between rows.',R`\addlinespace`,'booktabs']
]);
dict('tables','packages','array-columns',[[R`\newcolumntype`,'定义列类型','Define a column type','建立带参数的复用列规格。','Defines reusable column specifications with optional parameters.',R`\newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}`,'array'],[R`\arraybackslash`,'恢复行结束','Restore row ending','配合段落列的 raggedright 等声明。','Restores row-ending behavior after paragraph alignment declarations.',R`>{\raggedright\arraybackslash}p{3cm}`,'array']]);
dict('tables','packages','multirow-multicolumn',[[R`\multirow`,'合并行','Span rows','后续行仍要为跨行内容保留空单元格。','Later rows still require empty cells for the spanned position.',R`\multirow{2}{*}{Group A}`,'multirow']]);
dict('tables','packages','makecell',[[R`\makecell`,'格内多行内容','Multiline cell content','内部换行不会结束外部表格行。','Internal line breaks do not end the outer table row.',R`\makecell[l]{Long\\heading}`,'makecell']]);
dict('tables','packages','threeparttable',[[R`\tnote`,'表注标记','Table-note marker','表注标记对应 tablenotes 条目，与正文脚注分别管理。','Connects a table-note marker to a tablenotes entry, separately from prose footnotes.',R`Estimate\tnote{a}`,'threeparttable']]);
dict('tables','packages','siunitx',[[R`\num`,'数字格式化','Format a number','统一分组、指数和小数表示。','Formats grouping, exponent, and decimal presentation consistently.',R`\num{12345.67}`,'siunitx'],[R`\qty`,'数值与单位','Quantity and unit','现代 v3 接口，单位间距由宏包处理。','Modern v3 interface with package-managed unit spacing.',R`\qty{3.2}{\metre\per\second}`,'siunitx'],['S column','小数点列','Decimal-aligned column','table-format 为数字结构预留宽度，文本表头用花括号。','table-format reserves numeric space; brace text headers.',R`S[table-format=2.2]`,'siunitx']]);
dict('tables','packages','tabularray',[['tblr','键值式表格','Key-value table','colspec 定义列，row/cell 键设置样式。','colspec defines columns and row/cell keys set styles.',R`\begin{tblr}{colspec={lr},hlines}A&1\\\end{tblr}`,'tabularray'],['longtblr','键值式长表','Key-value long table','跨页接口与传统 longtable 的分区标记不同。','Its multipage interface differs from longtable region markers.',R`\begin{longtblr}{colspec={lr}}A&1\\\end{longtblr}`,'tabularray']]);
dict('tables','packages','colortbl',[[R`\rowcolor`,'行背景色','Row background color','通过 xcolor 的 table 选项获得支持。','Enabled through xcolor’s table option.',R`\rowcolor{teal!10}`,'colortbl'],[R`\cellcolor`,'单元格背景色','Cell background color','设置单元格背景；类别还需有颜色之外的辨识方式。','Sets a cell background; categories also need an indication that remains readable without color.',R`\cellcolor{gray!10}Value`,'colortbl']]);
dict('floats','layout','graphicx',[[R`\includegraphics`,'插入图片','Include a graphic','用 linewidth 匹配当前容器，并检查路径大小写。','Size against the current linewidth and check path case.',R`\includegraphics[width=.8\linewidth]{figure.pdf}`,'graphicx'],[R`\graphicspath`,'图片搜索路径','Graphic search paths','每个目录各用一层花括号，通常以斜杠结尾。','Enclose each directory in braces, normally with a trailing slash.',R`\graphicspath{{figures/}{plots/}}`,'graphicx'],[R`\resizebox`,'缩放整个盒子','Scale an entire box','字号和线宽一起缩放；盒子不能自动跨页。','Scales fonts and rules together; the box cannot paginate.',R`\resizebox{\linewidth}{!}{Content}`,'graphicx']]);
dict('floats','layout','caption',[[R`\caption`,'编号题注','Numbered caption','先建立题注再写 label，可选参数用于图表目录。','Create the caption before its label; optional text enters the list.',R`\caption[Short]{Full caption}\label{fig:demo}`],[R`\captionsetup`,'题注设置','Caption settings','设置文字、编号标签与题注间距。','Configures caption text, labels, and spacing.',R`\captionsetup{font=small,labelfont=bf}`,'caption'],[R`\captionof`,'非浮动题注','Caption nonfloating content','指定 figure 或 table 类型但不产生浮动行为。','Specifies figure or table type without creating floating behavior.',R`\captionof{figure}{A diagram}`,'caption']]);
dict('floats','layout','subcaption',[[R`\subref`,'子图面板引用','Reference a subfigure panel','引用对应子题注后的标签。','References a label placed after the corresponding subcaption.',R`\subref{fig:a}`,'subcaption']]);
dict('floats','layout','float-placement',[[R`\FloatBarrier`,'浮动体边界','Float barrier','阻止此前图表越过当前位置。','Prevents preceding floats from crossing this point.',R`\FloatBarrier`,'placeins'],[R`\clearpage`,'清空浮动体并换页','Flush floats and end the page','清空待排浮动体并换页；newpage 主要结束当前页。','Flushes queued floats and ends the page; newpage mainly ends the current page.',R`\clearpage`],['[H]','固定放置参数','Fixed-placement parameter','由 float 提供，固定内容位置，可能留下空白或影响分页。','Provided by float. Fixes the content position and can leave gaps or affect page breaks.',R`\begin{figure}[H]...\end{figure}`,'float']]);
dict('bibliography','refs','bibtex',[[R`\cite`,'通用引用请求','Citation request','显示形式由当前文献系统和样式决定。','Its displayed form depends on the bibliography system and style.',R`\cite{knuth1984}`],[R`\bibliographystyle`,'选择 BibTeX 样式','Select a BibTeX style','参数为 bst 样式名；不属于 biblatex 配置接口。','Names a bst style; it is not the biblatex configuration interface.',R`\bibliographystyle{plainnat}`,'BibTeX'],[R`\bibliography`,'输出传统文献表','Traditional bibliography output','指定 bib 文件名而不写扩展名，并读取 bbl。','Names bib databases without extensions and reads the generated bbl.',R`\bibliography{refs}`,'BibTeX'],[R`\nocite`,'请求未正文引用的条目','Request uncited entries','星号可列出全库用于审核，最终论文需筛选。','An asterisk requests the whole database for review; select deliberately for the final paper.',R`\nocite{*}`]]);
dict('bibliography','refs','natbib',[
[R`\citet`,'叙述式作者年份引用','Textual author-year citation','作者作为句子成分，年份通常放括号。','Places the author in the sentence, normally with a parenthesized year.',R`\citet{knuth1984}`,'natbib'],
[R`\citep`,'括号式引用','Parenthetical citation','整个引用进入括号；两个可选参数为前后注。','Encloses the citation; two optional arguments give pre- and postnotes.',R`\citep[see][p.~10]{knuth1984}`,'natbib'],
[R`\citealt`,'无年份括号叙述引用','Textual citation without year parentheses','在作者年份模式中移除年份括号。','Removes year parentheses in author-year mode.',R`\citealt{knuth1984}`,'natbib'],
[R`\citealp`,'无外括号引用','Citation without outer parentheses','输出括号式内容但去掉外层括号。','Prints parenthetical-style content without outer parentheses.',R`\citealp{knuth1984}`,'natbib'],
[R`\citeauthor`,'仅引用作者','Cite authors only','只取作者信息，适合特定句法。','Prints author data for special sentence structures.',R`\citeauthor{knuth1984}`,'natbib'],
[R`\citeyear`,'仅引用年份','Cite year only','只取年份，不自动形成完整引用。','Prints the year without forming a full citation.',R`\citeyear{knuth1984}`,'natbib'],
[R`\setcitestyle`,'设置引用标点','Set citation punctuation','按 natbib 参数配置模式、括号和分隔符。','Configures natbib mode, brackets, and separators.',R`\setcitestyle{authoryear,round}`,'natbib']
]);
dict('bibliography','refs','biblatex',[
[R`\textcite`,'biblatex 叙述引用','Biblatex textual citation','将作者融入句子；与 natbib 的 citet 分属不同接口。','Integrates authors into prose using the biblatex interface.',R`\textcite{knuth1984}`,'biblatex'],
[R`\parencite`,'biblatex 括号引用','Biblatex parenthetical citation','按引用样式输出括号式参考来源。','Produces a parenthetical source according to the citation style.',R`\parencite{knuth1984}`,'biblatex'],
[R`\autocite`,'样式决定引用形式','Style-selected citation mode','按样式选择括号、脚注或其他引用形式。','Selects parentheses, footnotes, or another citation form according to the style.',R`\autocite{knuth1984}`,'biblatex'],
[R`\addbibresource`,'声明文献资源','Declare a bibliography resource','导言区使用，参数包含 .bib 扩展名。','Use in the preamble with the .bib extension.',R`\addbibresource{refs.bib}`,'biblatex'],
[R`\printbibliography`,'输出 biblatex 文献表','Print a biblatex bibliography','可按类型或关键词过滤，不使用 bst。','Can filter by type or keyword and does not use a bst.',R`\printbibliography[title={References}]`,'biblatex'],
['Biber','Unicode 文献后端','Unicode bibliography backend','读取 bcf 与 bib，须与 biblatex 版本兼容。','Reads bcf and bib data and must match the biblatex version.',R`biber main`,'biber']
]);
dict('crossrefs','refs','cross-references',[[R`\label`,'建立标签','Create a label','记录当前可引用对象，图表中紧跟 caption。','Records the current reference target; follow caption in floats.',R`\label{eq:model}`],[R`\ref`,'编号引用','Number reference','读取标签编号，需要辅助文件稳定。','Reads a target number after auxiliaries have stabilized.',R`\ref{sec:model}`],[R`\pageref`,'页码引用','Page reference','页码随分页改变，修改正文后需重编译。','Page values follow pagination and need rebuilding after edits.',R`\pageref{fig:result}`]]);
dict('crossrefs','refs','hyperref',[[R`\autoref`,'带类型名称的引用','Reference with a type name','由 hyperref 提供，类型译名可配置。','Supplied by hyperref with configurable type names.',R`\autoref{fig:result}`,'hyperref'],[R`\href`,'自定义外部链接','Custom external link','两个必选参数为目标 URL 与显示文字。','Two mandatory arguments give the URL and visible text.',R`\href{https://www.latex-project.org/}{LaTeX Project}`,'hyperref'],[R`\url`,'显示 URL','Display a URL','处理网址中的特殊字符；xurl 可扩展断行位置。','Handles URL characters; xurl adds line-break opportunities.',R`\url{https://example.org/file_name}`,'url'],[R`\hyperref`,'自定义内部链接','Custom internal link','可选标签参数加必选显示文本。','Takes an optional target label and mandatory visible text.',R`\hyperref[sec:model]{the model}`,'hyperref'],[R`\phantomsection`,'建立无编号锚点','Create an unnumbered anchor','给 addcontentsline 等手工目录条目提供跳转目标。','Provides a destination for manually added contents entries.',R`\phantomsection\addcontentsline{toc}{section}{Acknowledgements}`,'hyperref'],[R`\hypersetup`,'PDF 链接配置','PDF link settings','配置已有 hyperref；适合 Beamer 避免重复加载。','Configures an already-loaded hyperref, including in Beamer.',R`\hypersetup{hidelinks,pdftitle={Report}}`,'hyperref'],[R`\texorpdfstring`,'书签替代文字','Alternative bookmark text','为数学或格式化标题提供纯文本书签。','Supplies plain bookmark text for mathematical or formatted headings.',R`\texorpdfstring{$\alpha$}{alpha}`,'hyperref']]);
dict('crossrefs','refs','cleveref',[[R`\cref`,'智能对象引用','Smart object reference','自动加入类型名称并组合多个标签。','Adds target names and combines several labels.',R`\cref{eq:a,eq:b}`,'cleveref'],[R`\Cref`,'句首智能引用','Sentence-initial smart reference','大写名称形式，适合英文句首。','Uses a capitalized target name for English sentence starts.',R`\Cref{fig:result}`,'cleveref'],[R`\vref`,'相对页引用','Contextual page reference','根据相对页面位置生成说明，可能需多轮编译。','Adds relative-page wording and may need extra runs.',R`\vref{fig:result}`,'varioref'],[R`\nameref`,'标题文字引用','Reference heading text','输出标签对应的标题名称而非数字。','Prints the target heading text instead of its number.',R`\nameref{sec:model}`,'nameref']]);
dict('crossrefs','document','contents-bookmarks',[[R`\tableofcontents`,'生成目录','Print contents','读取 toc；首次运行可能为空。','Reads toc, which may be empty on the first run.',R`\tableofcontents`],[R`\listoffigures`,'图目录','List of figures','读取图题注的短标题与编号。','Reads figure-caption list text and numbers.',R`\listoffigures`],[R`\listoftables`,'表目录','List of tables','读取表题注的短标题与编号。','Reads table-caption list text and numbers.',R`\listoftables`],[R`\addcontentsline`,'手工添加目录项','Add a contents entry','指定文件类型、层级和显示内容。','Specifies the list, sectioning level, and entry text.',R`\addcontentsline{toc}{section}{Acknowledgements}`]]);
})();
