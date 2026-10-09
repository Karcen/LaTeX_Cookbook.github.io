/* Content registers synchronously, including under file:// without fetch or a build. */
window.ATELIER = {modules:[],entries:[],examples:[],exercises:[],dictionary:[],version:'2.0.0'};
(() => {
 const names=[
 ['ecosystem','TeX 生态与编译','TeX ecosystem & compilation','引擎、发行版、编辑器与文件。','Engines, distributions, editors, and files.'],
 ['syntax','语法与第一篇文档','Syntax & first documents','命令、参数、环境和作用域。','Commands, arguments, environments, and scope.'],
 ['classes','文档类','Document classes','文章、书籍、信件和专用文档。','Articles, books, letters, and specialized documents.'],
 ['chinese','中文排版','Chinese typesetting','Unicode、字体、标点与中文结构。','Unicode, fonts, punctuation, and Chinese structure.'],
 ['characters','特殊字符与转义','Special characters & escaping','十个特殊字符的语法与转义。','Syntax and escaping for the ten special characters.'],
 ['math-environments','数学环境与结构','Math environments & structures','编号、对齐、矩阵和分段函数。','Numbering, alignment, matrices, and cases.'],
 ['math-fonts','数学字体与符号','Math fonts & symbols','字体、运算符及专业数学记号。','Alphabets, operators, and mathematical notation.'],
 ['tables','表格系统','Tables','跨页表、三线表和数值对齐。','Multipage tables, rules, and numeric alignment.'],
 ['floats','图片与浮动体','Figures & floats','位置、子图、题注和双栏图片。','Placement, subfigures, captions, and wide figures.'],
 ['bibliography','参考文献','Bibliographies','BibTeX、Biber、natbib 与 biblatex。','BibTeX, Biber, natbib, and biblatex.'],
 ['crossrefs','目录、链接与引用','Contents, links & references','稳定标签、PDF 书签与智能引用。','Stable labels, PDF bookmarks, and smart references.'],
 ['beamer','Beamer 学术报告','Beamer presentations','框架、逐步显示、主题和讲者备注。','Frames, overlays, themes, and speaker notes.'],
 ['tikz','TikZ 图形','TikZ graphics','坐标、路径、节点与结构图。','Coordinates, paths, nodes, and diagrams.'],
 ['pgfplots','PGFPlots 数据图','PGFPlots charts','坐标轴、函数、图例和数据。','Axes, functions, legends, and data.'],
 ['layout','页面与段落','Pages & paragraphs','页边距、页眉、列表与多栏。','Margins, headers, lists, and columns.'],
 ['fonts','文本字体与颜色','Text fonts & color','字体族、字重、微排版和颜色。','Families, weight, microtypography, and color.'],
 ['code','代码与特殊内容','Code & special content','源码高亮、文本框与 PDF 合并。','Code highlighting, boxes, and PDF inclusion.'],
 ['algorithms','算法排版','Algorithms','伪代码、浮动体和算法编号。','Pseudocode, floats, and algorithm numbering.'],
 ['programming','宏与 LaTeX3','Macros & LaTeX3','命令定义、计数器、宏包与文档类。','Definitions, counters, packages, and classes.'],
 ['errors','错误排查','Troubleshooting','从日志中的第一条错误定位原因。','Trace the cause from the first error in the log.'],
 ['structure','长文档结构','Long documents','附录、脚注、索引和术语表。','Appendices, footnotes, indexes, and glossaries.'],
 ['academic','学术与专业模板','Academic & professional writing','论文、学位论文、简历与试卷。','Papers, theses, CVs, and examinations.'],
 ['projects','工程与可复现编译','Projects & reproducible builds','多文件、latexmk、Git 与交付。','Multiple files, latexmk, Git, and delivery.'],
 ['accessibility','可访问 PDF','Accessible PDFs','文档结构、语义与兼容性。','Document structure, semantics, and compatibility.']
 ];
 window.ATELIER.modules=names.map(([id,zh,en,dz,de])=>({id,title:{zh,en},description:{zh:dz,en:de}}));
})();
