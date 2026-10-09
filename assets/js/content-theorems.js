/* Theorem interfaces follow the AMS amsthm user guide. */
(() => {
'use strict';
const D=window.ATELIER,R=String.raw,bi=(zh,en)=>({zh,en});
const sec=(zh,en,bz,be,code)=>({title:bi(zh,en),body:bi(bz,be),...(code?{code}:{})});
const sources=[{label:'AMS theorem package documentation',url:'https://ctan.org/pkg/amsthm'},{label:'AMS-LaTeX official documentation',url:'https://www.ams.org/tex/amslatex.html'}];
D.entries.push({
 id:'theorem-system',module:'math-environments',title:bi('amsthm：定理、引理、定义与证明','amsthm: theorems, lemmas, definitions, and proofs'),
 summary:bi('使用统一样式、自动计数器与证明环境组织数学论证。','Organize mathematical arguments with consistent styles, automatic counters, and proof environments.'),
 level:'intermediate',keywords:['amsthm','newtheorem','theoremstyle','proof','qedhere','定理','引理','命题','定义','证明','theorem','lemma','proposition','definition'],packages:['amsmath','amsthm'],engines:['pdflatex','xelatex','lualatex'],
 syntax:R`\usepackage{amsmath}
\usepackage{amsthm}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\theoremstyle{definition}
\newtheorem{definition}[theorem]{Definition}
\theoremstyle{remark}
\newtheorem*{remark}{Remark}`,example:'theorem-proof-styles',related:['theorem-numbering','equation','cross-references','cleveref','programming-environments'],sources,
 sections:[
 sec('定义环境与宏包顺序','Defining environments and load order','newtheorem 的第一个参数是环境名称，第二个必选参数是显示名称。定义后用 begin{theorem}...end{theorem} 编写正文，并在环境开始后放 label。LaTeX 内核已有基础 newtheorem，amsthm 扩展样式、无编号形式与 proof 环境；使用 amsmath 时，按 AMS 手册把 amsthm 加载在它之后。','The first newtheorem argument names the environment and the second mandatory argument supplies its printed heading. Use the environment in the body and place a label after its opening. The LaTeX kernel supplies basic newtheorem; amsthm extends styles, unnumbered forms, and proofs. Load amsthm after amsmath, as specified by the AMS guide.'),
 sec('三种内置样式','Three built-in styles','plain 通常让正文斜体，适合定理、引理、命题和推论。definition 使用正体正文，适合定义、例子和假设。remark 的标题通常为斜体，正文为正体，适合说明。theoremstyle 只决定之后定义的定理环境，不会自动改变已经定义的环境。','plain normally uses italic body text for theorems, lemmas, propositions, and corollaries. definition uses upright body text for definitions, examples, and assumptions. remark normally uses an italic heading and upright body. theoremstyle selects the style of subsequently declared environments; it does not retroactively restyle existing ones.',R`\theoremstyle{plain}
\newtheorem{proposition}[theorem]{Proposition}
\theoremstyle{definition}
\newtheorem{example}[theorem]{Example}`),
 sec('标题附注与无编号环境','Heading notes and unnumbered environments','theorem 环境的可选参数可写命名定理、出处或额外说明，例如 begin{theorem}[A quadratic bound]。newtheorem* 建立无编号版本，没有普通定理计数器，label/ref 因而不能产生正常定理数字。显示名称由定义参数决定，中文名称还需要中文字体支持。','An optional environment argument supplies a named result, attribution, or heading note. newtheorem* defines an unnumbered environment. It does not establish a normal theorem counter, so label/ref will not produce an ordinary theorem number. Printed heading language comes from the declaration; Chinese headings also require Chinese font support.'),
 sec('proof 与 QED 符号','Proofs and the QED symbol','amsthm 的 proof 自动生成证明标题与结束方块，可选参数替换标题。证明以行间公式结束时，将 qedhere 放在公式内的适当位置，使 QED 留在最后的数学行。不同公式结构对 qedhere 的支持有差异，多行结构需按手册检查输出。','amsthm’s proof supplies a heading and a closing QED symbol; an optional argument replaces the heading. When a proof ends in displayed mathematics, place qedhere inside the display so the marker stays with the final mathematical line. Support varies by display structure; check multiline arrangements against the manual and inspect their output.',R`\begin{proof}
A square is nonnegative, so
\begin{equation*}
(x-a)^2\ge0.\qedhere
\end{equation*}
\end{proof}`),
 sec('引用、列表与实际检查','References, lists, and practical checks','定理开始后放置标签，将引用绑定到定理；证明结束处的标签可能记录最后一个公式编号。以列表开头的定理需检查标题与第一项的间距，必要时明确安排换行。完整文档中检查斜体变量、正体说明、题注和 QED 的位置。','Place the label after the theorem opens to bind the reference to that result. At the end of its proof, the current value may be an equation number. Check spacing between the heading and first item when a theorem begins with a list, and arrange a line break if needed. Inspect mathematical italics, upright explanations, heading notes, and QED placement.'),
 sec('样式扩展与框架兼容','Extending styles and checking compatibility','newtheoremstyle 配置上下间距、正文字体、缩进、标题字体和标点。thmtools 可用于定理框、可重述定理或更复杂元数据。Beamer 有自己的定理模板，AMS 类也可能内置相应功能；采用目标类支持的一套接口管理环境。','newtheoremstyle configures spacing, body font, indentation, heading font, and punctuation. thmtools provides additional theorem management. Beamer has its own templates, and AMS classes may already include these facilities. Use one set of interfaces supported by the target class to manage the environments.')
 ]
});
D.entries.push({
 id:'theorem-numbering',module:'math-environments',title:bi('定理计数器：共享编号、按节重置与引用','Theorem counters: shared numbering, section resets, and references'),
 summary:bi('区分共享计数器与独立计数器，确保编号和超链接稳定。','Distinguish shared and independent counters to keep numbering and references stable.'),
 level:'intermediate',keywords:['newtheorem','shared counter','section numbering','theorem numbering','定理编号','共享计数器','按节编号','lemma'],packages:['amsthm','hyperref','cleveref'],engines:['pdflatex','xelatex','lualatex'],
 syntax:R`\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{exercise}{Exercise}[section]`,example:'theorem-shared-counters',related:['theorem-system','cross-references','cleveref','programming-counters'],sources,
 sections:[
 sec('共享编号和独立编号','Shared and independent numbering','newtheorem{theorem}{Theorem}[section] 建立按节重置的 theorem 计数器。newtheorem{lemma}[theorem]{Lemma} 让 lemma 使用同一个计数器，输出可依次为 Theorem 1.1、Lemma 1.2、Theorem 1.3。中间的可选参数是共享计数器名称。','newtheorem with a final section argument creates a theorem counter reset by each section. The middle optional argument in a lemma declaration selects the existing theorem counter. The sequence can therefore be Theorem 1.1, Lemma 1.2, Theorem 1.3.'),
 sec('重置参数的位置','Where the reset argument belongs','newtheorem{exercise}{Exercise}[section] 给 exercise 建立独立计数器，并在每节重置。同节可出现 Theorem 1.1 和 Exercise 1.1，因为两者属于不同序列。中间的可选参数指定共享计数器，末尾的可选参数指定重置依赖。','An exercise declaration with a final section argument creates its own counter that resets within each section. Theorem 1.1 and Exercise 1.1 may coexist because they belong to different sequences. The middle shared-counter argument and final reset argument have different purposes.'),
 sec('章结构与显示格式','Chapter structure and printed format',R`report、book 等类可使用 [chapter]，article 没有 chapter 计数器，使用 [section] 或全篇编号。renewcommand{\thetheorem}{...} 只改变显示形式，重置依赖另行设置。计数器按既定规则自动更新；逐条手工 setcounter 会使章节重排后容易出现重复编号。`,'report and book can reset within chapter; article has no chapter counter and uses section resets or document-wide numbering. Redefining thetheorem changes its printed form, while reset dependencies need separate configuration. Automatic counter rules survive rearrangement; manual setcounter calls before each result can produce duplicate numbers.'),
 sec('引用类型与锚点','Reference types and hyperlink anchors','label 放在定理开始处，ref 读取数字；使用 cleveref 时，先加载 amsthm、hyperref、cleveref，再定义定理环境，有助于保留共享计数器下的实际环境类型。cref 可以分别显示 theorem 和 lemma。编号重置后还要检查 PDF 锚点是否唯一。','Place labels at theorem openings and use ref for their numbers. When using cleveref, load amsthm, hyperref, and cleveref before theorem declarations to preserve environment types with shared counters. cref can then distinguish theorems and lemmas. Verify that hyperlinks remain unique after resets.'),
 sec('编号规则的选择','Choosing a numbering convention','短论文可让定理、定义、引理共用一个序列，读者只需追踪一个顺序；习题可保持独立编号。长书籍常按章重置。先按期刊或学校规范确定策略，再集中定义环境；修改后至少编译两次，并核对正文引用与附录。','A short paper can share one sequence across results and definitions, while exercises may have their own sequence. Long books commonly reset by chapter. Choose the convention required by the venue, declare it centrally, then rerun LaTeX and check references and appendices after changes.')
 ]
});
D.examples.push({id:'theorem-proof-styles',title:bi('定理样式、定义和行间公式证明','Theorem styles, definitions, and a displayed proof'),description:bi('展示 plain、definition、remark，共享按节编号，以及 qedhere。','Demonstrates plain, definition, and remark styles, shared section numbering, and qedhere.'),engine:'pdflatex',modules:['math-environments','academic'],code:R`\documentclass[11pt]{article}
\usepackage{amsmath,amssymb}
\usepackage{amsthm}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\theoremstyle{definition}
\newtheorem{definition}[theorem]{Definition}
\theoremstyle{remark}
\newtheorem*{remark}{Remark}
\begin{document}
\section{A quadratic bound}
\begin{definition}\label{def:nonnegative}
A real number $x$ is nonnegative if $x\ge0$.
\end{definition}
\begin{lemma}\label{lem:square}
For every real $x$, $x^2\ge0$.
\end{lemma}
\begin{proof}
If $x\ge0$, the product $x\cdot x$ is nonnegative.
If $x<0$, use $x^2=(-x)^2$.
\end{proof}
\begin{theorem}[A quadratic bound]\label{thm:bound}
For every $x,a\in\mathbb{R}$, $x^2-2ax+a^2\ge0$.
\end{theorem}
\begin{proof}[Proof of the quadratic bound]
By Lemma~\ref{lem:square},
\begin{equation*}
x^2-2ax+a^2=(x-a)^2\ge0.\qedhere
\end{equation*}
\end{proof}
\begin{remark}
Equality in Theorem~\ref{thm:bound} holds exactly when $x=a$.
\end{remark}
\end{document}
`});
D.examples.push({id:'theorem-shared-counters',title:bi('共享定理序列与独立习题编号','Shared theorem sequence and independent exercises'),description:bi('对比中间共享参数与末尾重置参数，并验证 cleveref 类型。','Compares shared-counter and reset arguments, with correct cleveref target types.'),engine:'pdflatex',modules:['math-environments','crossrefs'],code:R`\documentclass[11pt]{article}
\usepackage{amsmath}
\usepackage{amsthm}
\usepackage[hidelinks]{hyperref}
\usepackage[nameinlink,noabbrev]{cleveref}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\theoremstyle{definition}
\newtheorem{exercise}{Exercise}[section]
\begin{document}
\section{First section}
\begin{theorem}\label{thm:first}
For a real $x$, $x^2\ge0$.
\end{theorem}
\begin{lemma}\label{lem:first}
For a real $x$, $x^2+1>0$.
\end{lemma}
\begin{exercise}\label{ex:first}
Find the minimum of $x^2+1$ over the real numbers.
\end{exercise}
The shared sequence gives \cref{thm:first,lem:first};
\cref{ex:first} belongs to an independent exercise sequence.
\section{Second section}
\begin{theorem}\label{thm:second}
For a real $x$, $(x-1)^2\ge0$.
\end{theorem}
\begin{exercise}\label{ex:second}
Find the minimum of $(x-1)^2$.
\end{exercise}
Both counters reset in the new section:
\cref{thm:second,ex:second}.
\end{document}
`});
const words=[
[R`\newtheorem`,'定义定理环境','Define a theorem environment','可选共享计数器放在环境名后，可选重置计数器放在显示名后。','The shared counter follows the environment name; the reset counter follows the printed name.',R`\newtheorem{lemma}[theorem]{Lemma}`,'theorem-numbering'],
[R`\newtheorem*`,'无编号定理环境','Unnumbered theorem environment','amsthm 的星号形式取消编号，不建立普通数字引用目标。','amsthm’s starred form suppresses numbering and does not create a normal numbered target.',R`\newtheorem*{remark}{Remark}`,'theorem-system'],
[R`\theoremstyle`,'选择定理样式','Choose a theorem style','影响之后定义的环境，内置 plain、definition、remark。','Affects subsequently declared environments; built-ins are plain, definition, and remark.',R`\theoremstyle{definition}`,'theorem-system'],
[R`\newtheoremstyle`,'定义定理样式','Define a theorem style','配置间距、字体、缩进、标点与标题格式；创建后再选择。','Configures spacing, fonts, indentation, punctuation, and head format; select it after defining it.',R`\newtheoremstyle{custom}{6pt}{6pt}{\itshape}{}{\bfseries}{.}{.5em}{}`,'theorem-system'],
['proof','证明环境','Proof environment','自动输出标题与 QED，可选参数替换标题文字。','Provides a heading and QED; an optional argument replaces the heading.',R`\begin{proof}[Proof of the lemma]Argument.\end{proof}`,'theorem-system'],
[R`\qedhere`,'把 QED 放在此处','Place QED here','证明以行间公式结尾时放在数学环境内，检查多行环境支持。','Place inside a final displayed formula, checking support for the specific multiline environment.',R`\begin{equation*}x^2\ge0.\qedhere\end{equation*}`,'theorem-system'],
[R`\qedsymbol`,'证明结束符号','Proof-ending symbol','默认空心方块，可集中重新定义证明结束符号。','The default is an open square; redefine it centrally to change the proof-ending symbol.',R`\renewcommand{\qedsymbol}{$\blacksquare$}`,'theorem-system'],
[R`\swapnumbers`,'交换定理标题与编号','Swap theorem heading and number','在定理定义前调用，控制之后定义环境的标题顺序。','Call before theorem declarations to control their heading order.',R`\swapnumbers\newtheorem{theorem}{Theorem}`,'theorem-system']
];
for(const [command,z,e,dz,de,example,linked] of words){if(!D.dictionary.some(x=>x.command===command))D.dictionary.push({id:'theorem-command-'+(linked==='theorem-numbering'?'numbering':command.replace(/[^a-z*]/gi,'')),module:'math-environments',category:'math',command,title:bi(z,e),detail:bi(dz,de),example,package:command===R`\qedsymbol`?'amsthm, amssymb':'amsthm',entry:linked});}
})();
