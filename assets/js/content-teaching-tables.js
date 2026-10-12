/* Guided, bilingual table, figure, reference, and presentation lessons.
   Numeric examples use invented teaching data. Existing code and math stay intact. */
(() => {
'use strict';
const D=window.ATELIER, R=String.raw;
const b=(zh,en)=>({zh,en});
const step=(zh,en,bz,be,code)=>({title:b(zh,en),body:b(bz,be),...(code?{code}:{})});
const check=(qz,qe,az,ae,rz,re)=>({question:b(qz,qe),answer:b(az,ae),reason:b(rz,re)});
function teach(id,summary,bodies,goal,walkthrough,selfcheck,packages=[],example) {
  const e=D.entries.find(x=>x.id===id);
  if(!e)throw new Error('Missing guided entry: '+id);
  if(bodies.length!==e.sections.length)throw new Error('Section count changed: '+id);
  e.summary=summary;
  e.sections.forEach((s,i)=>{s.body=bodies[i];});
  e.teaching={goal,walkthrough,check:selfcheck};
  const extra=packages.map(pkg=>({label:pkg+' 官方说明 / official documentation',url:'https://ctan.org/pkg/'+pkg}));
  e.sources=[...e.sources,...extra.filter(s=>!e.sources.some(old=>old.url===s.url))];
  if(example)e.example=example;
}

teach('tabular',b('先做两列小表，再给它加题注和编号。','Build a two-column table, then give it a caption and number.'),[
 b('tabular 负责表格本身，table 负责浮动位置、题注和编号。{lr} 表示左对齐和右对齐的两列；每行用 & 分开单元格，用双反斜杠收尾。先数清列数，再填内容。','tabular makes the table itself; table supplies float placement and a home for the caption and number. {lr} declares a left-aligned column and a right-aligned one. Separate cells with & and end each row with a double backslash.'),
 b('说明文字较长时，把 l 改成 p{宽度}，这一列就会自动换行。centering 让表格在当前容器里居中。需要表编号时，在 table 里写 caption，紧接着写 label；只有 tabular 的小表不会自动编号。','Change l to p{width} when a description needs wrapping. centering centers the table in its container. To number it, put caption inside table and label immediately after the caption. A bare tabular has no table number.'),
 b('两列的普通数据行只需要一个分隔符 &。文字里的“&”写成 \\&，否则 LaTeX 会把它当作下一列。表太长用 longtable，说明列太宽用 tabularx；横线只放在读者需要分组的位置。','An ordinary two-column row needs one separating &. Write \\& for an ampersand in text, or LaTeX will treat it as another cell. Use longtable for length and tabularx for flexible width. Add rules where they help readers follow the groups.')],
 b('排出一张带正确编号的两列课程表。','Typeset a two-column course table with a working number.'),[
 step('先填两行','Fill two rows','在正文中放入下面的 tabular。两列分别放名称和人数；这是虚构教学数据。先编译一次，确认每行都落在两列里。','Put this tabular in the document body. The columns contain names and counts, using invented teaching data. Compile once and check that each row occupies two cells.',R`\begin{tabular}{lr}
Course & Students \\
Writing & 12 \\
Math & 8 \\
\end{tabular}`),
 step('包上题注和标签','Add a caption and label','把小表放进 table，题注上方或下方都可按模板要求选择。label 跟在 caption 后，因为这时表计数器才已经更新。','Wrap the small table in table. Place the caption above or below as required by your template. Put label after caption because the caption updates the table counter.',R`\begin{table}[htbp]
\centering
\caption{Invented teaching data}\label{tab:courses}
% Put the tabular here.
\end{table}`),
 step('让编号跟着表走','Reference the number','在正文写 Table~\\ref{tab:courses}，用 pdfLaTeX 编译两次。PDF 应出现表编号；在它前面插入另一张表后再编译，引用会自动改号。','Write Table~\\ref{tab:courses} in the prose and run pdfLaTeX twice. The PDF should show the table number. Insert another table before it and rebuild to see the reference update.',R`Table~\ref{tab:courses} lists the invented counts.`)],
 check('把 {lr} 的一行写成 A & 2 & 3，会发生什么？','What happens to A & 2 & 3 in a {lr} table?','这行多出了一个单元格，应删掉多余内容或改成三列。','It has an extra cell; remove it or declare three columns.','{lr} 只有两列，两个分隔符却把内容分成了三格，通常触发 Extra alignment tab 错误。','{lr} declares two columns, but two separators produce three cells and commonly trigger an Extra alignment tab error.'),['array'],'guided-table-progression');

teach('tabularx',b('给说明列一个 X，让长文字在当前宽度内换行。','Use an X column to wrap descriptions within the available width.'),[
 b('tabularx 比 tabular 多接收一个总宽度参数。X 是自动分配宽度的段落列；有两个 X 时，默认平分剩余空间。l、c、r 仍按内容取自然宽度。','tabularx adds a total-width argument to tabular. X is a paragraph column that receives available space; two X columns share it equally by default. l, c, and r retain their natural widths.'),
 b('在 minipage、分栏或子容器里，用 linewidth 表示眼前这块区域的宽度。需要左对齐说明列时，可通过 array 定义带 raggedright 的 X 列，再加 arraybackslash 恢复表格的行结束命令。','Use linewidth inside a minipage, column, or other local container. To make descriptions ragged right, define an X column with array and raggedright, followed by arraybackslash to restore table row endings.'),
 b('tabularx 会反复试排以求出列宽，单元格里应避免会改变计数器等状态的操作。它仍是一张不可分页的小表。超宽时，先看固定列是否已占满总宽度，再看有没有无法断开的长字符串。','tabularx typesets trial versions to find column widths, so avoid state-changing commands in cells. The result still cannot break across pages. For overflow, check fixed columns and long unbreakable strings.')],
 b('让任务说明自动换行，同时保留简短的编号列。','Wrap task descriptions while keeping a compact identifier column.'),[
 step('在导言区加载宏包','Load the package','在 begin{document} 之前加载 tabularx。下面的小表有一个自然宽度的 l 列和一个可伸缩的 X 列。','Load tabularx before begin{document}. The table below combines a natural-width l column with a flexible X column.',R`\usepackage{tabularx}`),
 step('把总宽度交给当前容器','Use the container width','在正文放入表格，长说明留在 X 列。linewidth 会随容器改变，因此同一段代码放进窄的 minipage 时也能换行。','Put the table in the body and keep the long text in X. linewidth follows the container, so the same table wraps in a narrower minipage.',R`\begin{tabularx}{\linewidth}{lX}
Task & Description \\
1 & Compile the document, read the first error, and check the output. \\
\end{tabularx}`),
 step('缩窄后再看结果','Test at a narrower width','用 pdfLaTeX 编译，检查说明是否换行、数字列是否仍紧凑。再把表放进 0.7\\linewidth 的 minipage；文字应重新换行，表格不会自动跨页。','Compile with pdfLaTeX and inspect wrapping and the compact first column. Try a minipage of width 0.7\\linewidth; the text should reflow, while the table remains one unbreakable object.')],
 check('在半页宽的 minipage 里，用 textwidth 还是 linewidth 设置 tabularx 总宽度？','Inside a half-width minipage, should tabularx use textwidth or linewidth?','优先用 linewidth。','Use linewidth.','linewidth 对应当前位置可用的行宽；textwidth 在一些分栏容器中仍可能指外层正文宽度。','linewidth tracks the available line width; textwidth can still refer to an outer text area in some column contexts.'),['tabularx','array'],'guided-table-progression');

teach('booktabs',b('用三条主要横线和适当留白，让表头、数据和分组容易辨认。','Use three main rules and spacing to separate headings, data, and groups.'),[
 b('加载 booktabs 后，用 top、mid、bottom 三种规则画表顶、表头下方和表底的横线。宏包会留出线周围的空间；表的位置和列宽仍由 table、tabular 等环境管理。','booktabs supplies top, middle, and bottom rules with surrounding space. Use them at the top, below the heading, and at the bottom. The table environment and column specification still determine placement and width.'),
 b('组标题横跨多列时，cmidrule(lr){2-3} 只画第 2 到第 3 列的短线，并收短两端。数据组之间可用 addlinespace 留白。单位放在表头，数值比较通常不需要竖线。longtable 的重复表头也可使用这些规则。','For a group heading, cmidrule(lr){2-3} draws a trimmed rule across columns 2 and 3. Use addlinespace between data groups. Put units in headings; numeric comparisons rarely need vertical rules. The rules also work in longtable headers.'),
 b('逐行画横线会把数值切碎，先试着用留白表达分组。真实回归表还要交代标准误、星号阈值和数据来源；教学表则明确写出数据是虚构的。','A rule after every row makes numbers harder to scan; try whitespace for grouping. Real regression tables need notes on standard errors, star thresholds, and data provenance. Teaching tables should identify invented data.')],
 b('把普通小表改成有清楚表头边界的三线表。','Turn a plain table into a clearly separated three-rule table.'),[
 step('加载规则命令','Load rule commands','在导言区写 usepackage{booktabs}。这些命令放在表格行与行之间，不能放进普通单元格正文。','Load booktabs in the preamble. Its rule commands belong between table rows, not inside ordinary cell text.',R`\usepackage{booktabs}`),
 step('保留三处边界','Keep three boundaries','在 tabular 内按下面顺序放横线。数据为虚构教学数字，表头写清单位，读者就不用从每一格猜测。','Place rules in tabular in this order. These are invented teaching numbers; put the unit in the heading so readers can interpret every value.',R`\begin{tabular}{lr}
\toprule
Task & Time (min) \\
\midrule
Draft & 12 \\
Review & 8 \\
\bottomrule
\end{tabular}`),
 step('比较留白和横线','Compare spacing and rules','用 pdfLaTeX 编译。看表头下方的 midrule 是否与文字保持距离；增加一组数据时，在组间试用 addlinespace，再按实际 PDF 判断是否需要局部横线。','Compile with pdfLaTeX. Inspect the space around midrule. When adding another group, try addlinespace between groups and judge whether a partial rule is also useful in the PDF.')],
 check('booktabs 会自动把宽表缩到页内吗？','Does booktabs automatically fit a wide table to the page?','不会，仍需调整列宽或选用 tabularx 等环境。','No; adjust column widths or use an environment such as tabularx.','booktabs 处理横线和留白，列宽与分页由表格环境负责。','booktabs handles rules and spacing; width and pagination belong to the table environment.'),['booktabs']);

teach('array-columns',b('用固定宽度列排长文字，并把常用对齐方式定义一次。','Use fixed-width columns for prose and define reusable alignment once.'),[
 b('array 扩展 tabular 和数学 array 的列规格。p{宽度} 把单元格顶部对齐，m{宽度} 垂直居中，b{宽度} 底部对齐。>{声明} 和 <{声明} 分别在每格前后执行设置。','array extends column specifications in tabular and mathematical array. Fixed-width p, m, and b columns align at the top, center, and bottom. >{declaration} and <{declaration} apply settings before and after each cell.'),
 b('newcolumntype 可以给长列规格起一个名字。raggedright 改变双反斜杠的用法，所以列声明末尾加 arraybackslash。arraystretch 按比例调行高；extrarowheight 增加高度，处理深度的方式不同。','Give a reusable specification a name with newcolumntype. raggedright changes the double backslash, so end its column declaration with arraybackslash. arraystretch scales row height; extrarowheight adds height with different treatment of depth.'),
 b('说明文字放在 tabular 的文本列，公式矩阵放在数学 array。固定列的宽度相加后，还要算上 tabcolsep 和横竖规则占用的空间；超宽时也检查自然宽度列和不能断开的内容。','Use text columns for descriptions and mathematical array for formula arrays. Add tabcolsep and any rule widths to the declared widths. Also inspect natural-width columns and unbreakable content when diagnosing overflow.')],
 b('定义一个能换行、左对齐的 4 厘米列。','Define a left-aligned wrapping column of width 4 cm.'),[
 step('声明常用列类型','Define a column type','在导言区加载 array，再定义 L。这里的 [1] 表示 L 接收一个宽度参数，声明末尾的 arraybackslash 保留表格换行。','Load array and define L in the preamble. [1] makes L accept a width argument, and arraybackslash preserves row endings.',R`\usepackage{array}
\newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}`),
 step('把长说明放进去','Add a longer description','在正文使用 L{4cm}。说明列会换行，编号列仍可用 r；两列各司其职，不需要手工塞换行符。','Use L{4cm} in the body. The description wraps while the r column keeps identifiers compact, without manual line breaks.',R`\begin{tabular}{rL{4cm}}
1 & Read the log and locate the first error before changing the source. \\
\end{tabular}`),
 step('观察行与单元格的对齐','Inspect alignment','用 pdfLaTeX 编译，确认文字左侧整齐。将 p 暂时换成 m 后再编译，比较短编号相对长段落的垂直位置；改完应恢复所需列类型。','Compile with pdfLaTeX and check the ragged-right text. Temporarily replace p with m and rebuild to compare vertical alignment against the short identifier, then keep the alignment your table needs.')],
 check('含 raggedright 的末列为何常加 arraybackslash？','Why add arraybackslash to a final raggedright column?','恢复双反斜杠结束表格行的含义。','To restore the double backslash as a table row ending.','raggedright 会重定义它；缺少恢复时，行结束可能被当成单元格内部换行。','raggedright redefines it; without restoration, the intended row ending can be interpreted as a line break within the cell.'),['array']);

teach('multirow-multicolumn',b('先画清表头分组，再决定哪些格子需要跨列或跨行。','Plan header groups before choosing column or row spans.'),[
 b('multicolumn 的三个参数依次是跨几列、局部对齐方式和文字。multirow 需要加载同名宏包，参数包括跨几行、宽度和文字；宽度写 * 时按文字的自然宽度排。','multicolumn takes the number of columns, local alignment, and text. multirow requires its package and takes a row count, width, and text; * uses the text’s natural width.'),
 b('跨列格会采用自己的局部列规格，边界设置也要写进这个规格。跨行文字占住的列，在后面的行里仍需留一个空格位，用 & 跳过去。短横线用 cline 或 cmidrule，避开跨行文字。','A column span uses its own local specification, including any boundaries. Later rows of a row span still need an empty cell at that position. Use cline or cmidrule to keep partial rules away from the spanned text.'),
 b('复杂合并会让表头难读，也增加跨页和辅助阅读的维护成本。multirow 的合并组应留在同一页；长表常用重复组名或独立分组行，读者翻到下一页仍能认出结构。','Complicated spans make headings harder to read and pagination and accessibility harder to maintain. Keep a multirow group on one page. Repeated names or separate group rows often make long tables easier to follow.')],
 b('排出一个组标题和一个两行分组，保留正确的空单元格。','Make a grouped heading and a two-row group with correct empty cells.'),[
 step('声明合并所需宏包','Load the row-span package','multicolumn 由 LaTeX 本身提供；如果确实要跨行，在导言区加载 multirow 和 booktabs。','LaTeX already provides multicolumn. For a row span, load multirow and booktabs in the preamble.',R`\usepackage{multirow,booktabs}`),
 step('空出已经被占的位置','Leave occupied cells empty','把下表放在正文。第二个数据行以 & 开始，因为第一列已被 A 跨行占用。数字是虚构教学数据。','Put this table in the body. The second data row begins with & because A already occupies its first cell. The numbers are invented teaching data.',R`\begin{tabular}{lrr}
\toprule
Group & \multicolumn{2}{c}{Invented counts} \\
\cmidrule(lr){2-3}
 & First & Second \\
\midrule
\multirow{2}{*}{A} & 2 & 3 \\
 & 4 & 5 \\
\bottomrule
\end{tabular}`),
 step('检查短线和占位','Check partial rules and cells','用 pdfLaTeX 编译，核对组名只显示一次，数值没有向左错列。若需要在组内画线，限制它到数值列；长表里不要让这一组合并跨过分页点。','Compile with pdfLaTeX. Check that the group name appears once and values have not shifted left. Keep any internal rule within the numeric columns, and avoid page breaks within the span in a long table.')],
 check('跨两行的组名下方，下一行的第一格还能填另一个组名吗？','Can the first cell below a two-row span contain another group name?','应留空，用 & 进入下一列。','Leave it empty and use & to move to the next column.','multirow 占用了那个格位，重复填字会覆盖内容；省略分隔符又会使后续数值错列。','multirow occupies that position. Adding text overlaps the span, while omitting the separator shifts later values.'),['multirow','booktabs']);

teach('makecell',b('把短表头分成两行，让标题和单位各占一行。','Split a short heading into two lines, with a separate line for its unit.'),[
 b('makecell 把多行文字包在一个单元格里。内部用双反斜杠换行，可选 l、c、r 控制水平对齐。它适合短表头；整张表的分页仍由表格环境决定。','makecell keeps several text lines inside one cell. A double backslash creates an internal line break, with optional l, c, or r alignment. It suits short headings; table pagination remains a separate concern.'),
 b('thead 可统一表头格式。makecell 中多了一行文字，外部表格仍只有同一行。整段说明需要随宽度自动换行时，选 p 或 X 列更省事。','thead can standardize headings. An extra line inside makecell is still part of the same outer table row. Choose a p or X column when a paragraph should wrap with the available width.'),
 b('普通 l 列中的双反斜杠会结束整行，所以手工换行要放进 makecell 这样的局部结构。表头中的缩写也要在题注或表注里解释。','A double backslash in a plain l column ends the whole row. Put an internal break inside a structure such as makecell, and explain abbreviations in the caption or notes.')],
 b('制作一个“时间 / 分钟”的两行表头。','Create a two-line time heading with its unit.'),[
 step('加载 makecell','Load makecell','在导言区加载 makecell，随后在正文表格里调用它。宏包提供格内换行命令，表头文字仍留在它对应的单元格中。','Load makecell in the preamble, then call it inside the table in the body. The package supplies internal line breaks; the heading text stays in its own cell.',R`\usepackage{makecell}`),
 step('只在目标格里换行','Break the heading inside its cell','把下面的 makecell 放在表头第二格。外层行尾仍要另写一次双反斜杠，明确结束表格行。数字为虚构教学数据。','Place makecell in the second header cell. A separate double backslash still ends the outer row. The values are invented teaching data.',R`\begin{tabular}{lr}
Task & \makecell{Time\\(min)} \\
Draft & 12 \\
\end{tabular}`),
 step('比较局部和整行换行','Compare the two breaks','用 pdfLaTeX 编译，PDF 应有一个两行表头和一个数据行。把表头改成 makecell[l] 后再看，只有表头格内部的对齐会改变。','Compile with pdfLaTeX. The PDF should have one two-line header row and one data row. Try makecell[l] to change alignment inside the heading cell.')],
 check('makecell 中写两次换行，会把外部表格增加两行吗？','Do two internal breaks in makecell add two outer table rows?','不会，它们仍属于同一个单元格。','No; they stay inside the same cell.','makecell 建立局部多行结构，外部行数由其外面的行结束命令决定。','makecell creates a local multiline structure; outer row endings determine the table’s row count.'),['makecell']);

teach('threeparttable',b('把题注、表体和解释放在一起，让表注跟着表格走。','Keep the caption, table, and explanatory notes together.'),[
 b('threeparttable 把 caption、表体和 tablenotes 组织成宽度协调的一组内容。它本身不浮动，常放在 table 里。表内用 tnote 标记，表下注释用对应的 item 解释。','threeparttable coordinates the widths of a caption, table body, and tablenotes. It does not float by itself and commonly goes inside table. Match each tnote marker to an item in the notes.'),
 b('真实研究表注应说明标准误、显著性和样本范围。普通 footnote 放进浮动表格可能丢失脚注位置；tablenotes 直接在表下排说明。脚本导出研究表格时，让数值和注释来自同一份生成代码。','Research notes should explain standard errors, significance, and the sample. Ordinary footnote placement can fail inside a float; tablenotes keeps explanations below the table. Export research numbers and their notes from the same generating script.'),
 b('普通 threeparttable 适用于整张小表，跨页注释要用 longtable 的表尾或兼容扩展。很长的讨论放进正文，表下注释保留理解数值所需的说明，字号就能保持可读。','Ordinary threeparttable suits an unbroken table. Use longtable footers or a compatible extension for multipage notes. Move extended discussion into the prose and keep the notes needed to interpret values below the table.')],
 b('给虚构课程人数添加一条可追踪的表注。','Add a traceable note to invented course counts.'),[
 step('准备外层结构','Prepare the wrappers','导言区加载 threeparttable。正文用 table 处理位置，在它内部放 threeparttable，题注写在表体前。','Load threeparttable in the preamble. Use an outer table for placement and an inner threeparttable, with the caption before the table body.',R`\usepackage{threeparttable}`),
 step('配对标记和注释','Pair the marker with its note','把 tnote{a} 写在需要解释的名称后，在 tablenotes 中用 item[a] 说明。下面的人数是虚构教学数据。','Put tnote{a} after the name that needs explanation and match it with item[a] in tablenotes. The count below is invented teaching data.',R`\begin{table}[htbp]\centering
\begin{threeparttable}
\caption{Invented course counts}\label{tab:notes}
\begin{tabular}{lr}Writing\tnote{a} & 12 \\\end{tabular}
\begin{tablenotes}\small
\item[a] Invented values for a typesetting lesson.
\end{tablenotes}
\end{threeparttable}
\end{table}`),
 step('查看注释跟随的位置','Inspect the note placement','用 pdfLaTeX 编译两次。确认 a 标记和表下注释对应，label 引用到这张表。若以后由数据脚本生成表格，把这段注释也写进同一生成过程。','Run pdfLaTeX twice. Check the a marker, the matching note, and the table reference. If a data script later generates the table, export the note from that same process.')],
 check('threeparttable 自己能决定浮动位置或跨页吗？','Does threeparttable decide float placement or paginate?','它协调题注与表注宽度；浮动通常由 table 处理，跨页需另外的接口。','It coordinates caption and note widths; table usually handles floating and pagination needs a separate interface.','三部分结构与浮动、分页是不同职责，普通 threeparttable 不创建浮动体。','The three-part layout, floating, and pagination are separate roles; ordinary threeparttable creates no float.'),['threeparttable']);

teach('siunitx',b('把数字交给 S 列解析，让小数点纵向对齐。','Let S columns parse numbers and align their decimal points.'),[
 b('siunitx 的 num 排数字，qty 排数值与单位，S 列排列数字表格。现代 v3 用 qty；旧模板常见 SI，可按所用版本核对。table-format 描述预期数字位数，帮助预留对齐宽度。','siunitx supplies num for numbers, qty for quantities, and S for numeric table columns. Version 3 uses qty; older templates often use SI. table-format describes the expected digit pattern for alignment.'),
 b('S[table-format=2.2] 为两位整数和两位小数预留空间；含负号或误差的列还要按数据格式配置。文本表头用花括号包住，避免被数字解析器读取。单位字形、空格和幂交给宏包统一排。','S[table-format=2.2] allows two integer and two decimal digits; signed values and uncertainties need suitable specifications. Brace text headings to bypass numeric parsing. The package handles unit fonts, spacing, and powers.'),
 b('S 列不会把任意文字、星号或括号当成数字。真实回归表的星号和标准误要按手册配置，也可把标记放到独立位置，或对复杂单元格使用文本列。','S does not treat arbitrary text, stars, or parentheses as numbers. Configure regression stars and standard errors as documented, place markers separately, or use a text column for complicated cells.')],
 b('把不同长度的虚构分数按小数点排齐。','Align invented scores of different lengths by their decimal points.'),[
 step('加载数字解析器','Load numeric parsing','在导言区加载 siunitx 和 booktabs。这个练习使用 v3 的数字接口，不需要外部数据文件。','Load siunitx and booktabs in the preamble. This lesson uses the v3 numeric interface and needs no external data file.',R`\usepackage{siunitx,booktabs}`),
 step('声明数字形状','Declare the numeric pattern','把数值原样放进 S 列。表头 Score 用花括号保护；2.2 对应这里最大的整数和小数位数。这些分数为虚构教学数据。','Put plain numeric input in S. Brace the Score heading, and use 2.2 for the largest integer and decimal parts here. These scores are invented teaching data.',R`\begin{tabular}{lS[table-format=2.2]}
\toprule
Task & {Score} \\
\midrule
A & 9.50 \\
B & 12.25 \\
\bottomrule
\end{tabular}`),
 step('核对小数点和单位','Inspect decimal points and units','用 pdfLaTeX 编译，确认 9.50 与 12.25 的小数点上下对齐。若新增 123.4，重新评估 table-format；单位可写在表头，正文数量可用 qty{12}{\\minute}。','Compile with pdfLaTeX and check that the decimal points line up. If you add 123.4, reconsider table-format. Put a unit in the heading, or use qty{12}{\\minute} for a quantity in prose.')],
 check('S 列的文字表头为何写成 {Score}？','Why write {Score} as an S-column heading?','让这格按文本排版，跳过数字解析。','To typeset that cell as text, bypassing number parsing.','S 默认处理数字；花括号保护单元格内容，表头不需要伪装成数字。','S normally parses numbers; braces protect the cell’s text instead of making the heading look numeric.'),['siunitx','booktabs'],'guided-table-progression');

teach('longtable',b('把长表直接放进正文，给后续页面设置重复表头。','Place a long table in the document flow and repeat its headings on later pages.'),[
 b('tabular 和 table 都把表作为整体处理，无法在数据行之间拆页。longtable 参与页面输出，可在行间分页并保持各页列宽一致。它直接放在正文里，不包进 table。','tabular and table keep a table together. longtable participates in page output, breaks between rows, and keeps column widths consistent. Put it directly in the body without a table wrapper.'),
 b('列规格沿用 l、c、r、p{宽度} 及 array 的扩展列。caption 写在 longtable 内，接上 label，再结束标题行。表编号仍可用 ref 引用，位置则随正文分页。','Columns use l, c, r, p{width}, and array extensions. Put caption and label inside longtable and then end the caption row. ref still retrieves its table number; placement follows the page flow.'),
 b('依次用 endfirsthead、endhead、endfoot、endlastfoot 收好第一页表头、后续页表头、非末页表尾和末页表尾，数据写在这些定义之后。第一页可写完整题注，续页写清“续表”和列名。','Use endfirsthead, endhead, endfoot, and endlastfoot to finish the first header, recurring header, nonfinal footer, and final footer. Add data after those definitions. Keep full captions on the first page and continuation wording on later pages.'),
 b('分页发生在行之间，一个高于页面的单元格仍不会自动拆开。列宽变化时按日志提示继续编译，直到宽度稳定。LTchunksize 是内存调优参数，不能代替列宽设计。','Breaks occur between rows, so one cell taller than a page remains a problem. Rerun when the log reports changing widths, until they stabilize. LTchunksize tunes memory use rather than column design.'),
 b('longtable 不适用于 twocolumn 页面或 multicol 环境。横向长表可放在单栏的 pdflscape 页面。若同时要自动 X 列和分页，可选 xltabular 或 longtblr，再按各自手册写结构。','longtable does not support twocolumn pages or multicol. Use a single-column pdflscape page for a wide long table. For flexible X columns plus pagination, investigate xltabular or longtblr and follow their own interfaces.'),
 b('长附录每页重复变量名、列名和单位，完整表注放在末页。multirow 合并组要留在同一页。表太挤时先缩短表头、删掉无用精度或拆成几张表，再决定是否调整字号。','Repeat labels and units on each page of a long appendix and keep complete notes on the last page. Keep row spans within one page. Shorten headings, remove unnecessary precision, or split a crowded table before reducing type size.')],
 b('制作分页后仍能辨认列名的长表。','Make a multipage table whose columns remain identifiable.'),[
 step('去掉普通浮动外壳','Remove the float wrapper','导言区加载 longtable、booktabs。把 longtable 放在 begin{document} 之后，外面不加 table 或 resizebox，这样数据行才能参与分页。','Load longtable and booktabs in the preamble. Put longtable after begin{document}, without table or resizebox wrappers, so its rows can participate in page breaking.',R`\usepackage{longtable,booktabs}`),
 step('写出第一页和后续页表头','Define both headers','按下面顺序定义表头和表尾，数据行放在 endlastfoot 后。这里使用虚构教学记录。','Define headers and footers in this order, then put data after endlastfoot. The records are invented for teaching.',R`\begin{longtable}{lr}
\caption{Invented teaching records}\label{tab:long}\\
\toprule Name & Count \\ \midrule
\endfirsthead
\multicolumn{2}{l}{Continued}\\
\toprule Name & Count \\ \midrule
\endhead
\midrule\multicolumn{2}{r}{Continued on next page}\\
\endfoot
\bottomrule\endlastfoot
Record 1 & 12 \\
Record 2 & 8 \\
\end{longtable}`),
 step('制造一次真实分页','Make it break across pages','在数据区复制并编号更多教学行，直到超过一页。用 pdfLaTeX 编译到列宽提示消失，核对第二页表头、非末页提示和末页底线；短表只有一页时看不出重复表头。','Add enough numbered teaching rows to exceed one page. Run pdfLaTeX until width warnings stop, then inspect the second header, continuation footer, and final rule. A short one-page table cannot demonstrate recurring headers.')],
 check('为 longtable 加一个 table[htbp] 外壳能改善分页吗？','Will wrapping longtable in table[htbp] improve pagination?','去掉外壳，让 longtable 直接参与正文分页。','Remove the wrapper so longtable can participate in page output.','普通浮动体是整体盒子；长表需要在行之间分页，两种输出机制不能这样嵌套。','An ordinary float is one box; longtable needs breaks between rows, so these output mechanisms cannot be nested this way.'),['longtable','booktabs']);

teach('tabularray',b('用键值设置列、行和单元格样式，先从小表熟悉新接口。','Set columns, rows, and cells through keys, starting with a small table.'),[
 b('tabularray 用键值参数管理结构和样式。普通表用 tblr，跨页表用 longtblr；colspec 声明列，row 与 cell 键设置局部格式。传统表的语法需要逐项核对后迁移。','tabularray manages structure and style through keys. Use tblr for ordinary tables and longtblr for multipage tables. colspec declares columns, while row and cell keys target local formatting. Check syntax when migrating a traditional table.'),
 b('跨行跨列、背景和规则都可通过键设置。booktabs 与 siunitx 集成需要加载对应库。先确认一张两列小表编译正常，再迁移原稿里的复杂表头。','Keys control spans, backgrounds, and rules. Load the relevant libraries for booktabs and siunitx integration. Get a two-column table working before migrating a complicated heading.'),
 b('multirow 和 longtable 的分区标记需要改成新接口；传统横线命令是否可用也要按库配置检查。复杂宏可按手册控制展开。用一套框架管理结构，能减少重复定义和冲突。','Translate multirow and longtable region markers to the new interface, and check rule commands against the loaded libraries. Follow the manual for expansion of complex macros. One structural framework reduces competing definitions.')],
 b('用 colspec 和 row 键做一张有粗体表头的小表。','Make a small table with colspec and a bold header row.'),[
 step('加载新的表格框架','Load the table framework','在导言区加载 tabularray。这个基础练习不需要 multirow 或 longtable，跨页时再选 longtblr。','Load tabularray in the preamble. This basic exercise needs neither multirow nor longtable; select longtblr when you need pagination.',R`\usepackage{tabularray}`),
 step('把样式写到键里','Put styling in keys','在正文写 colspec={lr}，再用 row{1}={font=\\bfseries} 指定首行。数字为虚构教学数据。','In the body, declare colspec={lr} and use row{1}={font=\\bfseries} for the first row. The count is invented teaching data.',R`\begin{tblr}{colspec={lr},row{1}={font=\bfseries},hlines}
Course & Count \\
Writing & 12 \\
\end{tblr}`),
 step('单独改变一项样式','Change one style at a time','用 pdfLaTeX 编译，确认表头粗体和两列对齐。删除 hlines 再编译观察横线变化；保留内容、只改键值，能看清样式和数据各自在哪里。','Compile with pdfLaTeX and inspect the bold heading and column alignment. Remove hlines and rebuild to see the rule change while the cell content stays the same.')],
 check('把 endhead 原样放进 longtblr 就能得到重复表头吗？','Can endhead be copied unchanged into longtblr for repeating headers?','应按 longtblr 的键值和模板接口设置。','Use longtblr’s key and template interfaces.','endhead 属于 longtable 的分区机制，tabularray 管理长表的方式不同。','endhead belongs to longtable’s region mechanism; tabularray manages long tables differently.'),['tabularray']);

teach('colortbl',b('用浅色区分表头或交替行，并保留文字上的类别信息。','Use light shading for headings or alternate rows, with text labels for categories.'),[
 b('加载 xcolor 时加 table 选项，就能使用 colortbl 的表格着色。rowcolor、columncolor 和 cellcolor 分别设置行、列和单元格背景；rowcolors 交替设置数据行背景。','Load xcolor with its table option for colortbl support. rowcolor, columncolor, and cellcolor set row, column, and cell backgrounds, while rowcolors alternates row colors.'),
 b('浅背景配深文字，长行更容易追踪。类别还要用名称或符号表达，灰度打印后才不会丢信息。booktabs 规则周围的留白可能与背景形成缝隙，完成后看实际 PDF。','Light backgrounds with dark text help readers track rows. Also identify categories with words or symbols so grayscale printing retains them. Inspect gaps where shaded cells meet booktabs rule spacing.'),
 b('Beamer 已加载 xcolor，再用不同选项加载可能触发 Option clash。table 选项应提前传入，或走文档类支持的选项接口。PDF 的颜色在 LaTeX 源码里设置，网站主题不会替它换色。','Beamer loads xcolor already, so reloading it with new options can cause an Option clash. Pass table early or through a supported class interface. PDF colors come from the LaTeX source independently of the website theme.')],
 b('做一张淡灰表头，并检查灰度打印也能读懂。','Make a pale-gray heading that remains clear in grayscale.'),[
 step('在合适的位置传选项','Pass the option early','article 文档在导言区按下面方式加载。Beamer 文档可把 PassOptionsToPackage 放在 documentclass 前，避免再次加载时冲突。','For article, load the package as below. With Beamer, PassOptionsToPackage can go before documentclass to avoid a reload clash.',R`\usepackage[table]{xcolor}`),
 step('给表头一层浅背景','Shade the header lightly','rowcolor 放在目标行开头。深文字仍保持默认颜色，类别名称直接写出来；数字是虚构教学数据。','Put rowcolor at the start of the target row. Keep dark text and write category names explicitly. The count is invented teaching data.',R`\begin{tabular}{lr}
\rowcolor{gray!15} Course & Count \\
Writing & 12 \\
\end{tabular}`),
 step('看灰度和边界','Inspect grayscale and boundaries','用 pdfLaTeX 编译，放大看文字对比和背景边界。再查看灰度打印预览，确认表头靠名称和位置也能识别；加 booktabs 后再检查规则周围留白。','Compile with pdfLaTeX and inspect contrast and background boundaries. Check a grayscale print preview for clear headings, then inspect rule spacing again if you add booktabs.')],
 check('只用红色和绿色区分两组，灰度打印可能丢掉什么？','What can be lost when two groups differ only in red and green?','组别信息，应同时写组名或加符号。','The group distinction; add group names or symbols.','颜色在灰度下可能接近，文字标签保留了读者解释表格所需的信息。','The shades can converge in grayscale; text labels preserve the information needed to interpret the table.'),['colortbl','xcolor']);

teach('large-tables',b('先判断表太宽还是太长，再选列宽、横向页面或跨页表。','Diagnose width or length before choosing column widths, landscape, or pagination.'),[
 b('宽表先调整列、缩短表头，必要时用横向页面或有限缩放。长表则需要 longtable 这样的分页环境。sidewaystable 把浮动体整体旋转，整张表仍保持在一起。','For a wide table, redesign columns and shorten headings before using landscape or restrained scaling. A long table needs a paginating environment such as longtable. sidewaystable rotates a whole float and keeps it together.'),
 b('pdflscape 的 landscape 同时安排横向内容和 PDF 页面旋转标记。adjustbox 的 max width 只在超宽时缩小，resizebox 按目标尺寸缩放整个盒子；字体和线宽也会一起改变。','pdflscape’s landscape sets landscape content and a PDF rotation flag. adjustbox’s max width shrinks only when needed; resizebox scales the whole box to a specified size, including type and rules.'),
 b('先删重复列、无用小数和冗长表头，再比较调整后的 PDF。longtable 装进 resizebox 会失去分页能力。最后按实际打印尺寸看数字，别只在放大的屏幕上判断字号。','Remove repeated columns, needless decimals, and verbose headings before comparing the PDF. Wrapping longtable in resizebox removes its pagination ability. Judge numeric readability at the intended print size.')],
 b('为一张宽表选择能保留可读字号的处理方式。','Choose a width treatment that keeps the table type readable.'),[
 step('检查超宽从哪里来','Locate the width problem','先编译现有表，检查日志中的 Overfull 提示和 PDF 右边界。把长说明列改成 X 或 p，并缩短重复表头，通常就能解决一部分宽度。','Compile the current table and inspect Overfull messages and the PDF’s right edge. Change long prose columns to X or p and shorten repeated headings before changing page orientation.'),
 step('必要时安排横向页','Use a landscape page when needed','仍需要更多横向空间时，在导言区加载 pdflscape，正文把表放进 landscape。要同时跨页，就在里面直接使用 longtable。','If the columns still need more horizontal space, load pdflscape in the preamble and put the table in landscape. For pagination too, place longtable directly inside it.',R`\usepackage{pdflscape}
% In the document body:
\begin{landscape}
% Put the wide table or longtable here.
\end{landscape}`),
 step('按最终尺寸阅读','Read at the final size','用 pdfLaTeX 编译两次，确认 PDF 查看器横向显示该页。按 100% 或实际打印尺寸读数值；如果还必须放大才能看清，拆表通常比继续缩放更合适。','Run pdfLaTeX twice and check that the viewer rotates the page. Read numbers at 100% or the intended print size. If they still require zooming, splitting the table usually serves readers better than further scaling.')],
 check('表有很多行，改成 sidewaystable 就能跨页吗？','Will sidewaystable paginate a table with many rows?','不能；行数过多应使用 longtable 等可分页环境。','No; use a paginating environment such as longtable.','旋转改变方向，跨页改变输出结构，sidewaystable 仍是整体浮动体。','Rotation changes orientation; pagination changes output structure. sidewaystable remains one float.'),['pdflscape','longtable','rotating']);

teach('float-placement',b('给图表几个可用位置，再检查大小和前面的浮动队列。','Allow several positions, then inspect float size and the preceding queue.'),[
 b('figure 和 table 由页面输出程序安放。h 允许靠近源码，t 允许页顶，b 允许页底，p 允许浮动页。这些字母列出可以放的位置，顺序不代表绝对坐标或逐项执行的承诺。','The output routine places figure and table. h permits a nearby position, t the top, b the bottom, and p a float page. These letters list permitted locations, not exact coordinates or a strict search order.'),
 b('! 放宽部分比例和数量限制，内容仍须装得进页面。float 的 H 把对象留在源码附近，也可能留下大块空白。先试 htbp，让排版程序有足够的位置可选。','! relaxes some proportion and count limits, but the object still has to fit. The float package’s H keeps it near the source and can leave large gaps. Start with htbp to give the layout more possible locations.'),
 b('placeins 的 FloatBarrier 可把前面图表留在章节边界以内。clearpage 排完等待中的浮动体并换页；newpage 结束当前页，通常不负责清空整个浮动队列。','placeins supplies FloatBarrier for keeping preceding floats within a boundary. clearpage flushes queued floats and starts a page; newpage ends the current page without generally flushing the float queue.'),
 b('双栏的 figure* 跨两栏，可用位置通常比普通图更少，具体看内核和宏包。图片用 linewidth 适配当前区域。图越高、允许位置越少，就越难安放。','In two-column documents, figure* spans both columns and usually has fewer placement options, depending on the kernel and packages. Size images with linewidth. A tall float with few permitted positions is harder to place.'),
 b('图表跑到后面时，先看它是否过高或过宽，再检查位置选项和之前有没有被卡住的图表。必要时在章节结束处加边界。最后通读 PDF，确认题注、图表顺序和正文引用仍便于阅读。','If a float moves far ahead, inspect its size, allowed positions, and any blocked earlier float. Add a section boundary when needed. Read the PDF to check captions, ordering, and references together.')],
 b('判断一张图为什么离引用段落很远，并作最小调整。','Diagnose a figure far from its reference and make a small adjustment.'),[
 step('先给几个可用位置','Allow several locations','在正文靠近第一次引用处插入 figure[htbp]。这个无外部图片的方框便于观察定位，稍后可换成真正的图片。','Insert figure[htbp] near its first reference. This box needs no external image and makes placement easy to inspect; replace it with a real figure later.',R`\begin{figure}[htbp]\centering
\fbox{\rule{0pt}{25mm}\rule{.6\linewidth}{0pt}}
\caption{A placement test}\label{fig:placement}
\end{figure}`),
 step('一次只改一个因素','Change one factor at a time','先编译看位置，再增加方框高度。若图被推到后面，恢复较小高度，比较是否是空间不足；不要同时改五个浮动参数。','Compile and inspect the position, then increase the box height. If it moves forward, restore the smaller height to test whether available space caused it. Change one placement factor at a time.'),
 step('按文档边界收好图表','Keep floats within a boundary','用 pdfLaTeX 编译两次并通读相邻页面。确实不希望图表跨到下一节时，加载 placeins，在节末放 FloatBarrier；观察边界是否留下不必要的空白。','Run pdfLaTeX twice and read neighboring pages. If floats must stay before the next section, load placeins and put FloatBarrier at the boundary, then inspect any resulting whitespace.',R`\usepackage{placeins}
% At the intended boundary in the body:
\FloatBarrier`)],
 check('把 [htbp] 改成 [h] 后，图为什么可能更靠后？','Why might changing [htbp] to [h] delay a figure?','允许的位置变少，附近空间又可能放不下。','Fewer positions are permitted, and the nearby space may be too small.','h 是允许附近位置，不能制造页面空间；页顶、页底和浮动页选项给算法更多选择。','h permits a nearby position without creating space; top, bottom, and float-page options offer additional feasible locations.'),['float','placeins']);

teach('graphicx',b('先确认图片路径，再用当前行宽设置尺寸。','Check the image path first, then size it against the current line width.'),[
 b('includegraphics 的必选参数是图片文件路径。width、height 控制尺寸，keepaspectratio 保持比例。pdfLaTeX 常直接使用 PDF、PNG、JPEG；EPS 通常先转换，其他引擎也须使用驱动支持的格式。','includegraphics takes an image path. width and height set dimensions, and keepaspectratio preserves proportions. pdfLaTeX commonly reads PDF, PNG, and JPEG; EPS usually needs conversion. Other engines also require supported driver formats.'),
 b('相对路径从编译工作目录查找，graphicspath 可以列出搜索文件夹。trim 按左、下、右、上的顺序指定裁边，clip 才真正隐藏裁边外的内容。angle 可旋转图片，选项顺序可能改变最终尺寸。','Relative paths start from the compilation working directory; graphicspath lists search folders. trim specifies left, bottom, right, and top margins, while clip hides the trimmed area. angle rotates images, and option order can affect dimensions.'),
 b('文件名大小写在一些系统上必须完全一致。把图片随项目提交，用接收方也能找到的相对路径；出现 File not found 时先检查目录和文件名。图形按用途选择矢量格式或足够清晰的位图。','Some systems require exact filename case. Include images with the project and use portable relative paths. For File not found, inspect the directory and filename first. Choose vector graphics or sufficiently clear raster images for the output.')],
 b('把项目内图片插入正文，保持比例并能在另一台电脑编译。','Insert a project image without distortion using a portable path.'),[
 step('把图片放进项目','Keep the image in the project','将自己的图片保存为 figures/chart.png，在导言区加载 graphicx。这里的路径是练习约定，要先有这个文件；完整示例页中的无资源例子可用于先试题注。','Save your own image as figures/chart.png and load graphicx in the preamble. This exercise requires that file; use the resource-free full example to practice captions before adding an image.',R`\usepackage{graphicx}`),
 step('用宽度保持比例','Set one dimension','在正文写 includegraphics。只指定 width 时会按比例缩放；放进 minipage 时，linewidth 自动指向里面的可用宽度。','Use includegraphics in the body. Setting width alone preserves proportions, and linewidth follows a minipage’s available width.',R`\includegraphics[width=.8\linewidth]{figures/chart.png}`),
 step('核对路径与清晰度','Check the path and clarity','用 pdfLaTeX 编译，检查比例、边界和图内文字。遇到缺图，按错误日志核对大小写和工作目录；把 tex 和 figures 文件夹一起复制到另一个目录再编译，验证路径可移植。','Compile with pdfLaTeX and inspect proportions, boundaries, and text clarity. For a missing file, check case and the working directory. Copy the tex file and figures folder together to another directory and rebuild to verify portability.')],
 check('trim={10mm 0 0 0} 后仍看到左侧内容，应先查哪个选项？','If the left edge remains after trim={10mm 0 0 0}, which option should you check?','是否加了 clip。','Check for clip.','trim 调整图片边界，clip 才裁掉边界外可见内容。','trim changes the image bounds; clip removes visible material outside them.'),['graphicx']);

teach('caption',b('题注先建立编号，标签紧跟其后，长说明另给一个短目录标题。','Let the caption establish the number, then add the label and a short list entry.'),[
 b('caption 宏包控制题注字体、标签、间距和格式。caption 的方括号参数给图表目录用，花括号里的完整文字显示在正文。caption 更新计数器之后，label 才能记录正确编号。','The caption package controls caption fonts, labels, spacing, and format. Its optional argument supplies the list entry; the mandatory text appears in the body. Put label after caption has updated the counter.'),
 b('非浮动内容也可用 captionof 加题注，不过它不会自动移动内容或分页。完整图注解释缩写、单位和面板，目录用简短标题便于查找。','captionof can caption nonfloating content without adding floating or pagination. Use the full caption for abbreviations, units, and panels, and a short list entry for navigation.'),
 b('Beamer、KOMA 和一些投稿类提供自己的题注设置，要先看兼容说明。label 放到 caption 前可能记录上一对象的编号。无编号题注也不能直接提供普通数字引用。','Beamer, KOMA, and some publisher classes have their own caption settings; inspect compatibility first. A label before caption can record an earlier counter, and an unnumbered caption does not supply an ordinary numeric reference.')],
 b('给图添加完整说明、短目录标题和可靠标签。','Give a figure a full caption, short list entry, and reliable label.'),[
 step('准备题注设置','Prepare caption settings','在 article 导言区加载 caption，先只调整小字号和粗体标签。这样改的是题注外观，图的尺寸另由图形代码控制。','Load caption in an article preamble, initially changing only caption size and label weight. These settings affect the caption rather than the figure dimensions.',R`\usepackage[font=small,labelfont=bf]{caption}`),
 step('先题注，后标签','Caption before label','把下面内容放进正文。短标题进图目录，完整标题解释这是一张排版占位图；label 记录新图编号。','Put this in the body. The short caption enters the figure list, the full caption explains the placeholder, and label records the new figure number.',R`\begin{figure}[htbp]\centering
\fbox{\rule{0pt}{15mm}\rule{.5\linewidth}{0pt}}
\caption[Placement test]{A placeholder for testing caption layout.}
\label{fig:caption}
\end{figure}`),
 step('同时看引用和目录','Check references and the list','在正文写 Figure~\\ref{fig:caption}，并加入 listoffigures。用 pdfLaTeX 编译两次：正文显示完整说明，目录显示短标题，引用显示相同图编号。','Add Figure~\\ref{fig:caption} and listoffigures, then run pdfLaTeX twice. The body should show the full caption, the list the short title, and the reference the correct number.')],
 check('caption 前面的 label 为什么可能引用到上一节？','Why can a label before caption refer to an earlier section?','它记录了 caption 更新之前的当前计数器。','It records the current counter before caption updates it.','把 label 放在对应 caption 之后，才能绑定当前图表的编号。','Putting label after its caption binds it to the figure or table counter.'),['caption']);

teach('subcaption',b('把两块面板放进一张图，并分别为面板和整图编号。','Place two panels in one figure and label the panels and figure separately.'),[
 b('subcaption 基于 caption，提供 subfigure 和 subtable 环境。每块面板都要写宽度，内部的 linewidth 就是该面板宽度。两块面板的宽度加间距，应小于外层区域宽度。','subcaption builds on caption and supplies subfigure and subtable environments. Each panel takes a width, with its own linewidth inside. Panel widths plus gaps must fit the outer container.'),
 b('子题注给面板标 a、b，主题注给整图编号。subref 引用面板字母，ref 可按配置显示组合编号。子图 label 跟子图 caption，整图 label 跟整图 caption。','Subcaptions identify panels a and b, while the main caption numbers the figure. subref retrieves a panel label; ref can show a combined number. Put each label after its own caption.'),
 b('历史 subfigure 宏包和 subcaption 的 subfigure 环境不是同一实现。按文档类支持选择一套子图接口；投稿类指定旧接口时，使用模板要求的配置。','The historical subfigure package differs from subcaption’s subfigure environment. Choose one panel interface supported by the class, and follow publisher configuration when an older interface is required.')],
 b('制作两块无外部图片的面板，并能分别引用。','Make two resource-free panels that can be referenced separately.'),[
 step('只选一套子图接口','Choose one panel interface','在 article 的导言区加载 subcaption。先用方框测试两块面板，不需要准备额外图片文件。','Load subcaption in an article preamble. Use boxes to test panel layout before preparing external images.',R`\usepackage{subcaption}`),
 step('分配宽度并各写题注','Allocate widths and captions','把两个 0.45\\linewidth 的子图放进同一个 figure，中间用 hfill。子题注后分别写标签，主题注最后写。','Place two 0.45\\linewidth panels in one figure with hfill between them. Label each after its subcaption, then add the main caption.',R`\begin{figure}[htbp]\centering
\begin{subfigure}{.45\linewidth}\centering
\fbox{\rule{0pt}{15mm}\rule{.8\linewidth}{0pt}}
\caption{First panel}\label{fig:left}
\end{subfigure}\hfill
\begin{subfigure}{.45\linewidth}\centering
\fbox{\rule{0pt}{15mm}\rule{.8\linewidth}{0pt}}
\caption{Second panel}\label{fig:right}
\end{subfigure}
\caption{Two layout tests}\label{fig:both}
\end{figure}`),
 step('检查两层引用','Check both reference levels','正文用 Figure~\\ref{fig:both} 引用整图，用 panel~\\subref{fig:left} 引用左面板。用 pdfLaTeX 编译两次，检查并排宽度和面板字母；若换行，先检查源码空格和总宽度。','Reference the whole figure with Figure~\\ref{fig:both} and the left panel with panel~\\subref{fig:left}. Run pdfLaTeX twice and inspect panel labels and width. If a panel wraps, check source whitespace and the combined widths.')],
 check('子图内部 includegraphics 应优先用哪个宽度？','Which width should includegraphics usually use inside a panel?','用该子图内部的 linewidth。','Use linewidth inside that panel.','它反映子容器实际宽度，外层页面宽度可能使图片越出面板。','It reflects the panel’s available width; an outer page width can overflow the panel.'),['subcaption']);

teach('bibtex',b('把 bib 数据、bst 样式和编译顺序连起来，先解决问号引用。','Connect the bib data, bst style, and build order to resolve missing citations.'),[
 b('BibTeX 是文献处理程序，读取 aux 中的引用键、数据库和 bst 样式，再生成 bbl。正文 cite 请求条目，bibliographystyle 选样式，bibliography 指定不带 .bib 后缀的数据库名。','BibTeX reads citation keys, database names, and the bst style from aux and writes bbl. cite requests records, bibliographystyle selects a style, and bibliography names the database without .bib.'),
 b('先运行 LaTeX 写出 aux，再运行 bibtex main，最后运行 LaTeX 两次。只有 BibTeX 没有文档上下文；只重复 LaTeX 也不会生成缺失的 bbl，除非编译工具替你调度后端。','Run LaTeX to write aux, then bibtex main, then LaTeX twice. BibTeX needs the document context; repeated LaTeX alone will not create a missing bbl unless the build tool schedules the backend.'),
 b('plain、unsrt 与 natbib 的 plainnat、unsrtnat 是不同样式。作者年份制要使用能提供作者和年份的样式，数据库记录本身不决定正文标点与排序。','plain and unsrt differ from natbib’s plainnat and unsrtnat. Author-year citations need a style that supplies author and year data. Database records alone do not determine punctuation or ordering.'),
 b('传统 BibTeX 对 Unicode 排序和复杂姓名的支持有限。多语言数据可选择 Biber 加 biblatex；投稿模板也可能指定国标 bst。切换后端时，要把资源声明和输出接口一起改好。','Traditional BibTeX has limited Unicode sorting and name processing. Multilingual records may suit Biber with biblatex; submission templates can also require a specific bst. Change resource declarations and output interfaces together with the backend.'),
 b('出错时打开 blg，先找缺文件、缺样式、重复键和语法错误。键名大小写保持一致。nocite{*} 可临时打印全库用于核对，正式文稿保留需要引用的条目。','Open blg for missing files or styles, duplicate keys, and syntax errors. Keep key spelling consistent. Temporarily use nocite{*} to inspect the database, then select records needed in the final manuscript.')],
 b('理解并运行一个传统 BibTeX 项目的完整编译链。','Understand and run the complete build chain of a BibTeX project.'),[
 step('准备真实文献记录','Prepare a bibliographic record','在项目目录保存 refs.bib。下面记录指向真实的 natbib 官方文档；引用键 daly-natbib 只需在项目内唯一。','Save refs.bib in the project directory. This record points to the real official natbib documentation; daly-natbib only needs to be unique within the project.',R`@manual{daly-natbib,
  author = {Daly, Patrick W.},
  title = {Natural Sciences Citations and References},
  year = {2010},
  url = {https://ctan.org/pkg/natbib}
}`),
 step('正文请求条目，末尾输出','Cite, then print the bibliography','在 main.tex 正文加入 cite，文末、end{document} 前放样式和数据库声明。这套接口使用 BibTeX，数据库名不写扩展名。','Add cite to main.tex’s body and put the style and database declarations before end{document}. This interface uses BibTeX and omits the database extension.',R`The citation interface is documented in \cite{daly-natbib}.
\bibliographystyle{plain}
\bibliography{refs}`),
 step('按主文件名运行后端','Run the backend on the job name','在项目目录依次运行下面四条命令。第二步用 main 而不是 refs；PDF 应有数字引用和文献表，失败先看 main.blg。','Run these four commands from the project directory. The second uses main rather than refs. Expect a numeric citation and bibliography in the PDF; inspect main.blg on failure.',R`pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex`)],
 check('为什么 bibtex refs 不是这里的正确第二步？','Why is bibtex refs the wrong second step here?','后端需要读取 main.aux 的文档引用上下文。','The backend needs the citation context from main.aux.','refs.bib 存记录；main.aux 告诉 BibTeX 用哪些键和哪个 bst。','refs.bib stores records; main.aux tells BibTeX which keys and bst the document requests.'),['bibtex']);

teach('natbib',b('先选好文献样式，再用 citet 和 citep 写自然的引用句子。','Choose a compatible style, then use citet and citep in your sentences.'),[
 b('natbib 管正文引用命令和标点，常搭配 BibTeX 与 plainnat、abbrvnat、unsrtnat 等 bst。addbibresource 和 printbibliography 属于 biblatex，natbib 项目使用传统数据库与文献输出命令。','natbib handles citation commands and punctuation, commonly with BibTeX and styles such as plainnat, abbrvnat, or unsrtnat. addbibresource and printbibliography belong to biblatex, while natbib uses the traditional database and output commands.'),
 b('作者年份模式下，作者是句子主语时用 citet，句末附出处时用 citep。星号版可打印更完整的作者列表，具体还取决于样式是否提供这些信息。','In author-year mode, use citet when the author is part of the sentence and citep for a parenthetical source. Starred forms can print fuller author lists if the style provides the information.'),
 b('两个可选参数依次为前注和后注；只有一个时，它是后注。citealt 去掉年份括号，citealp 去掉外层括号；citeauthor、citeyear 分别取作者和年份。','Two optional arguments supply a prenote and postnote; a single argument is a postnote. citealt omits year parentheses, citealp omits outer parentheses, and citeauthor and citeyear retrieve author and year data.'),
 b('数字模式可设置 numbers、sort&compress。作者年份模式需要兼容 bst 提供姓名和年份，普通纯数字样式不够。需要改标点时用 bibpunct 或 setcitestyle，并遵循投稿模板。','Numeric mode can use numbers and sort&compress. Author-year mode needs a compatible bst with author and year data. Configure punctuation through bibpunct or setcitestyle within the submission template’s rules.'),
 b('编译顺序是 LaTeX、BibTeX、再两次 LaTeX。natbib 与 biblatex 分别选用；biblatex 的 natbib=true 只是命令兼容层。更换系统后清理旧辅助文件，再完整重建。','Build with LaTeX, BibTeX, and two more LaTeX runs. Select natbib or biblatex as one system; biblatex’s natbib=true only supplies compatible commands. Remove stale auxiliaries when changing systems and rebuild.')],
 b('在作者年份模式下比较叙述式和括号式引用。','Compare textual and parenthetical citations in author-year mode.'),[
 step('选一组匹配配置','Choose matching settings','导言区加载 natbib；正文末尾用 plainnat。文献数据可沿用 BibTeX 一节的 refs.bib，命令键名保持一致。','Load natbib in the preamble and select plainnat at the end of the body. Reuse refs.bib from the BibTeX lesson with exactly the same key.',R`\usepackage[authoryear,round]{natbib}
% At the end of the body:
\bibliographystyle{plainnat}
\bibliography{refs}`),
 step('让引用适应句子的角色','Fit the citation to the sentence','把两个句子写在正文，比较谁在句子中承担主语。citep 已含括号，不要再在外面手工包一层。','Put these sentences in the body and compare the author’s grammatical role. citep supplies its parentheses, so do not add another pair.',R`\citet{daly-natbib} documents the commands.
The commands are documented \citep{daly-natbib}.`),
 step('编译后读完整句子','Read the complete output sentences','运行 pdfLaTeX、bibtex main、再两次 pdfLaTeX。PDF 应分别出现作者（年份）和（作者，年份）的形式；标点可能随选项变化，核对整句而不只看命令。','Run pdfLaTeX, bibtex main, and pdfLaTeX twice. Expect textual author (year) and parenthetical (author, year) forms, with punctuation determined by the options. Read the whole sentence.')],
 check('natbib 加 plain 样式为何可能不能正确显示作者年份？','Why can natbib with plain fail to show author-year citations?','plain 不提供 natbib 作者年份模式所需的信息。','plain does not supply the metadata natbib needs for author-year mode.','使用 plainnat 等兼容样式，并完成 BibTeX 编译链，才能把作者和年份传回正文。','Use a compatible style such as plainnat and complete the BibTeX chain to supply author and year data to the document.'),['natbib']);

teach('citet-citep',b('作者参与句子用 citet，括号里的出处用 citep。','Use citet for an author in the sentence and citep for a parenthetical source.'),[
 b('citet、citep 来自 natbib。作者年份模式下，前者形如 Knuth (1984)，后者形如 (Knuth, 1984)。数字模式保留两者的叙述差别，具体输出由模式和样式决定。','citet and citep come from natbib. In author-year mode they yield forms such as Knuth (1984) and (Knuth, 1984). Numeric mode keeps their different textual roles, with output determined by the mode and style.'),
 b('讨论作者做了什么时，让 citet 成为句子的一部分；陈述后补来源时用 citep。citep 自带作者和括号，周围文字按整句安排，避免作者名和括号重复出现。','Use citet as part of a sentence about an author’s contribution, and citep to attach a source to a claim. Because citep supplies the author and parentheses, check the surrounding sentence for repetition.'),
 b('两个可选参数分别是前注和后注，多个键用逗号分开。后注中的页码指引用位置，文献记录中的 pages 仍是出版物页码范围。citeauthor、citeyear 可以拼特殊句型，使用时检查标点。','Two optional arguments provide a prenote and postnote; separate multiple keys with commas. A locator points to the cited passage, while pages in the record remains the publication’s page range. Check punctuation when combining citeauthor and citeyear.'),
 b('biblatex 使用 textcite、parencite，autocite 根据样式选形式。迁移文献系统时，宏包、数据库声明、输出、后端和正文引用命令都要成套更新。','biblatex uses textcite and parencite, with autocite following the style. Migration changes package loading, database declaration, output, backend, and in-text commands together.'),
 b('遇到 citet 未定义，先确认项目用哪套文献系统。natbib 项目加载 natbib；biblatex 项目用原生命令或显式兼容选项，保持整个项目的一致配置。','For an undefined citet, identify the project’s bibliography system first. Load natbib in a natbib project; use native commands or an explicit compatibility option in biblatex. Keep the project configuration consistent.')],
 b('把同一出处放进两种句型，并加一个引用位置。','Place one source in two sentence forms and add a locator.'),[
 step('先确认命令归属','Identify the command owner','检查导言区是否已有 natbib 和匹配样式；本练习可接在 natbib 一节之后。若项目是 biblatex，换用 textcite、parencite 继续练习。','Check the preamble for natbib and a compatible style. Continue from the natbib lesson, or use textcite and parencite if the project uses biblatex.'),
 step('分别试主语和出处','Try textual and parenthetical roles','在正文写两个句子，实际来源是 natbib 手册。第二句的两个方括号明确区分“参见”和章节位置。','Write these sentences in the body using the real natbib manual as the source. The two optional arguments distinguish “see” from the section locator.',R`\citet{daly-natbib} explains citation commands.
See the documented syntax \citep[see][Section~2.3]{daly-natbib}.`),
 step('检查作者是否重复','Check for repeated authors','完成 BibTeX 编译链后朗读 PDF 中的整句。若作者名出现两次，把手写作者删掉或改用合适命令；如果仍有问号，核对键名和 blg 日志。','After the BibTeX build chain, read the complete PDF sentences. If the author appears twice, remove the handwritten name or choose the appropriate command. For question marks, check the key and blg log.')],
 check('citep[Section~2.3]{键} 的唯一可选参数是前注还是后注？','Is the only optional argument in citep[Section~2.3]{key} a prenote or postnote?','后注；只写前注要用 [see][]。','A postnote; use [see][] for only a prenote.','natbib 用一个参数作为后注，两个参数才分别读取前注和后注。','natbib treats one optional argument as a postnote; two distinguish prenote from postnote.'),['natbib']);

teach('biblatex',b('在导言区声明文献库，在正文引用，再用 Biber 处理数据。','Declare the bibliography in the preamble, cite in the body, and process it with Biber.'),[
 b('biblatex 用 LaTeX 宏排引用和文献表，Biber 处理数据、排序和姓名消歧。backend=biber 选后端；style 同时选引用与文献风格，也可用 citestyle 和 bibstyle 分开选。','biblatex formats citations and bibliographies through LaTeX macros. Biber handles data, sorting, and name disambiguation. backend=biber selects it; style selects both styles, with separate citestyle and bibstyle options available.'),
 b('addbibresource 放导言区，文件名带 .bib；多份数据库可分别声明。printbibliography 放文献表要出现的正文位置。加载数据库后，还要通过 cite 或 nocite 选择打印的条目。','Put addbibresource in the preamble with .bib included, repeating it for additional databases. Put printbibliography at the desired position in the body. Citation commands and nocite select which loaded records appear.'),
 b('作者作为句子成分时用 textcite，括号出处用 parencite，autocite 的形式交给样式决定。cite 是否自带括号也看配置。前注和后注可说明具体页码或章节。','Use textcite for authors in the sentence, parencite for parenthetical sources, and autocite for the style’s chosen form. cite punctuation also depends on configuration. Notes can give page or section locators.'),
 b('先运行 LaTeX 写出 bcf，再运行 biber main，最后两次 LaTeX。Biber 与 biblatex 版本要兼容，更新发行版时一起更新。文献没出现，先读 Biber 的 blg 和 LaTeX 重编译提示。','Run LaTeX to create bcf, then biber main, then LaTeX twice. Keep Biber and biblatex versions compatible and update them together. For missing entries, inspect Biber’s blg and LaTeX’s rerun requests.'),
 b('refsection 可分开引用区域，用关键词或类型过滤出不同文献表。APA、Chicago、GB/T 等选择对应样式。natbib、bibliographystyle 是另一套接口；保持这一项目的加载与输出方式一致。','refsection separates citation contexts, and keyword or type filters produce separate lists. Choose appropriate styles for APA, Chicago, or GB/T requirements. natbib and bibliographystyle use a separate interface; keep the project’s configuration consistent.')],
 b('运行一个 biblatex+Biber 项目并定位文献没显示的原因。','Build a biblatex+Biber project and diagnose a missing bibliography.'),[
 step('声明系统和数据库','Declare the system and resource','沿用 BibTeX 一节的真实手册记录 refs.bib，在导言区选择 backend=biber。数据库声明带扩展名。','Reuse refs.bib from the BibTeX lesson with its real manual record. Select backend=biber in the preamble and include the file extension.',R`\usepackage[backend=biber,style=authoryear]{biblatex}
\addbibresource{refs.bib}`),
 step('在正文引用和打印','Cite and print in the body','把 textcite 放在句中，文末放 printbibliography。若数据库有条目却没引用，默认不会全部打印；练习中可以用 nocite 指定要检查的条目。','Put textcite in the sentence and printbibliography at the end. An unreferenced database entry is not printed by default; use nocite to select a record for inspection.',R`\textcite{daly-natbib} documents the natbib interface.
\printbibliography`),
 step('用 Biber 完成数据处理','Complete data processing with Biber','在项目目录运行下面命令。后端读 main.bcf；成功后再由 LaTeX 把文献排进 PDF。若编辑器一直跑 BibTeX，就修改后端设置。','Run these commands in the project directory. Biber reads main.bcf, then LaTeX typesets the processed data. If the editor keeps running BibTeX, change its backend setting.',R`pdflatex main.tex
biber main
pdflatex main.tex
pdflatex main.tex`)],
 check('设置 backend=biber 后，连续运行四次 pdfLaTeX 能自动替代 Biber 吗？','With backend=biber, can four pdfLaTeX runs replace Biber?','不能，须执行 Biber 或让构建工具调度它。','No; run Biber or use a build tool that schedules it.','LaTeX 写出数据请求并排版，Biber 读取数据库并生成处理后的文献信息，职责不同。','LaTeX writes requests and typesets; Biber reads the database and processes bibliographic data.'),['biblatex','biber']);

teach('gb7714',b('先看模板使用 BibTeX 还是 biblatex，再选择相应的国标样式。','Identify the template’s bibliography system before choosing its GB/T style.'),[
 b('biblatex-gb7714-2015 提供 gb7714-2015 等样式，一般配 biblatex 和 Biber。数字制或作者年份制要选对应变体，正文引用也用匹配的命令。','biblatex-gb7714-2015 supplies styles such as gb7714-2015 for biblatex, generally with Biber. Select the matching numeric or author-year variant and use the appropriate citation commands.'),
 b('gbt7714 提供 BibTeX 的 bst 和配套引用设置，走 bibliography、bibliographystyle 编译链。先遵循学校或期刊模板的系统，再选其支持的国标实现。','gbt7714 supplies BibTeX bst files and associated citation settings, using bibliography and bibliographystyle. Follow the institution or journal template’s system and choose its supported GB/T implementation.'),
 b('样式名中的 2015 指实现的标准版本，学校的补充规则仍需对照。检查 PDF 中作者、类型标识、访问日期、DOI 和 URL；样式不能替你补齐文献数据。','The 2015 style name identifies the implemented standard version; also check institutional supplements. Inspect authors, type labels, access dates, DOI, and URL in the PDF. A style cannot supply missing record fields.')],
 b('为现有模板选一条一致的国标文献链，并核对输出字段。','Choose a consistent GB/T bibliography chain and inspect its fields.'),[
 step('读模板的文献入口','Read the template’s bibliography setup','搜索模板导言区和文末。看到 addbibresource、printbibliography，多半使用 biblatex；看到 bibliographystyle、bibliography，则检查对应 BibTeX 样式。','Inspect the template’s preamble and ending. addbibresource and printbibliography indicate biblatex; bibliographystyle and bibliography point to a BibTeX setup. Confirm the actual packages too.'),
 step('在一套系统中换样式','Change style within that system','biblatex 路线在导言区选下面样式，并用原有 printbibliography 输出。中文文献可用 XeLaTeX；若模板指定 gbt7714，按它的文档配置 BibTeX 路线。','For biblatex, select this style in the preamble and retain printbibliography. Use XeLaTeX for Chinese records. If the template specifies gbt7714, follow its documented BibTeX setup.',R`\usepackage[backend=biber,style=gb7714-2015]{biblatex}
\addbibresource{refs.bib}`),
 step('拿实际输出对照要求','Compare output with requirements','使用 XeLaTeX、Biber、再两次 XeLaTeX。选一篇书、一篇文章和一条在线资源核对字段；缺 DOI 或访问日期时，先补真实记录，再重编译。','Run XeLaTeX, Biber, and XeLaTeX twice. Inspect a book, article, and online record against the requirements. Fill missing DOI or access dates from the real sources and rebuild.')],
 check('仅把 bibtex main 改成 biber main，就能迁移 gbt7714 项目吗？','Can a gbt7714 project migrate by changing only bibtex main to biber main?','还要换宏包、资源声明、样式和文献输出接口。','Package, resource, style, and output interfaces also need changes.','两套后端读取不同辅助文件，国标的两种实现也使用不同的 LaTeX 接口。','The backends read different auxiliary files, and the two GB/T implementations expose different LaTeX interfaces.'),['gbt7714','biblatex-gb7714-2015']);

teach('hyperref',b('给编号加可点击的链接，再核对 PDF 书签和元数据。','Make numbers clickable, then inspect PDF bookmarks and metadata.'),[
 b('hyperref 把 ref、目录和受支持的引用变成链接。href 写目标网址与显示文字，url 显示网址，hyperref[标签]{文字} 自定义内部链接。label 放置的位置仍决定目标编号。','hyperref links ref, contents, and supported citations. href takes a URL and visible text, url prints an address, and hyperref[label]{text} gives custom internal link text. The label position still determines the referenced number.'),
 b('colorlinks=true 用文字颜色表示链接，linkcolor、citecolor、urlcolor 分别管内部、文献和外部链接。hidelinks 隐藏边框与颜色。pdftitle、pdfauthor、pdfsubject、pdfkeywords 设置 PDF 文件属性。','colorlinks=true marks links with text colors; linkcolor, citecolor, and urlcolor control internal, citation, and external links. hidelinks hides borders and colors. Metadata keys set PDF title, author, subject, and keywords.'),
 b('一般先加载其他常规宏包，再加载 hyperref，cleveref 放其后，bookmark 也可随后加载。Beamer 已含 hyperref，用 hypersetup 调整即可；特殊模板按兼容说明安排顺序。','Load hyperref after most ordinary packages, followed by cleveref and optionally bookmark. Beamer already includes it, so configure it with hypersetup. Specialized templates can have their own load-order requirements.'),
 b('书签是 PDF 文本，不能照搬所有公式和字体命令。标题含数学时，用 texorpdfstring 分别提供排版文字与书签文字。中文书签依赖源码编码和编译引擎的支持。','Bookmarks use PDF strings and cannot reproduce every math or font command. texorpdfstring gives separate typeset and bookmark text for mathematical headings. Chinese bookmarks require suitable encoding and engine support.'),
 b('无编号标题加入目录时，phantomsection 在当前位置建立跳转锚点。重置页码或公式计数器后，检查 duplicate destination 提示；最后实际点击目录与引用验证目标。','Use phantomsection to create a current destination when adding an unnumbered heading to contents. Check duplicate destination warnings after counter resets. Click the PDF contents and references to verify their targets.')],
 b('创建一个能正确跳到章节的内部链接。','Create an internal link that reaches the intended section.'),[
 step('靠后加载并设置属性','Load late and set properties','在 article 导言区的常规宏包后加载 hyperref，用 hidelinks 保持正文外观。Beamer 已加载它，只需 hypersetup。','Load hyperref after the ordinary article packages, using hidelinks for unobtrusive links. Beamer already loads it and only needs hypersetup.',R`\usepackage[hidelinks]{hyperref}
\hypersetup{pdftitle={A reference lesson},pdfauthor={Course reader}}`),
 step('标签跟着目标标题','Place the label after its target','在正文先写链接句，再写章节及标签。网址使用真实的 LaTeX Project 首页；内部章节编号由 label 决定。','Write the link sentence and then the heading and label in the body. The external URL points to the real LaTeX Project, while label identifies the internal target.',R`See Section~\ref{sec:method}.
\href{https://www.latex-project.org/}{LaTeX Project}
\section{Method}\label{sec:method}
This is the link destination.`),
 step('点开 PDF 验证目标','Click the PDF links','用 pdfLaTeX 编译两次，点击章节编号确认到达 Method，再看 PDF 属性中的标题和作者。链接颜色隐藏时仍应能点击；如果跳错位置，检查标签与锚点。','Run pdfLaTeX twice. Click the section number to reach Method and inspect the PDF title and author. Hidden link colors should still leave working links; check labels and anchors if a destination is wrong.')],
 check('hidelinks 会删除 PDF 链接吗？','Does hidelinks remove PDF links?','不会，只隐藏可见的链接颜色和边框。','No; it hides visible colors and borders.','目标链接仍由 hyperref 创建，外观配置不改变引用目标。','hyperref still creates the links; appearance settings do not change their targets.'),['hyperref'],'guided-references-document');

teach('cross-references',b('给对象一个唯一标签，让编号和页码随文档自动更新。','Give each object a unique label so numbers and pages update with the document.'),[
 b('label 记录当前可引用的计数器。章节标签跟在标题后，图表标签跟在 caption 后，公式标签放在编号公式里。ref 取编号，pageref 取页码，amsmath 的 eqref 给公式编号加括号。','label records the current reference counter. Put section labels after headings, float labels after captions, and equation labels inside numbered equations. ref prints a number, pageref a page, and amsmath’s eqref adds parentheses.'),
 b('第一轮写 aux，下一轮读取标签，增删内容后可能还需继续编译。问号通常表示标签未知或尚未稳定。latexmk 可按辅助文件变化调度多次运行。','One run writes aux and the next reads the labels; edits can require further runs. Question marks usually mean an unknown or unresolved label. latexmk can schedule reruns when auxiliary files change.'),
 b('用 sec:、fig:、tab:、eq: 等前缀帮助辨认，键名保持唯一。autoref 添加类型，nameref 引用标题，cleveref 处理多对象和范围。无编号对象要明确设计锚点和引用文字。','Use unique prefixes such as sec:, fig:, tab:, and eq:. autoref supplies a type, nameref a title, and cleveref handles lists and ranges. Design anchors and reference text explicitly for unnumbered objects.')],
 b('引用一个公式，并验证增删前面的公式后编号会更新。','Reference an equation and verify that inserting another changes its number.'),[
 step('放好公式标签','Label the numbered equation','在导言区加载 amsmath。下面是数学恒等式，label 写在 equation 里，不写在它之前。','Load amsmath in the preamble. The expression is a mathematical identity; put label inside equation rather than before it.',R`\usepackage{amsmath}
% In the body:
\begin{equation}\label{eq:square}
(a+b)^2=a^2+2ab+b^2
\end{equation}`),
 step('用标签写正文','Refer by its key','在公式前或后写 eqref，页码用 pageref。键名对应同一对象，避免手写“公式 (1)”以后忘记修改。','Use eqref before or after the equation, and pageref for its page. Both use the same key so you do not have to update a handwritten “equation (1)”.',R`Equation~\eqref{eq:square} is on page~\pageref{eq:square}.`),
 step('改结构再编译','Rebuild after a structural edit','用 pdfLaTeX 编译两次，再在它前面插入一条编号公式并重编译。原引用应自动改号；若仍有 ??，检查键名拼写和日志重编译提示。','Run pdfLaTeX twice, insert another numbered equation before it, and rebuild. The reference should update. For remaining ??, check key spelling and rerun messages.')],
 check('为什么第一轮编译中公式引用可能显示 ??？','Why can an equation reference show ?? on the first run?','这一轮刚写标签，后续运行才能读到它。','The run has just written the label; a later run reads it.','引用依赖 aux 中的标签信息；若多次编译仍未知，还要检查标签是否存在或拼错。','References use label data from aux; if repeated runs fail, also check whether the label exists and is spelled correctly.'),['amsmath','hyperref'],'guided-references-document');

teach('cleveref',b('让引用命令补上“图”“表”“公式”，并处理多个对象。','Let references supply names such as figure, table, and equation.'),[
 b('cref 根据标签类型写出 equation、figure、section 等名称，Cref 适合句首大写。多个标签可按类型分组并压缩范围；nameinlink 让类型文字也成为链接。','cref supplies the target type, such as equation, figure, or section; Cref capitalizes it at the start of a sentence. Lists can be grouped and compressed. nameinlink includes the type name in the link.'),
 b('crefname 和 Crefname 设置单复数名称，中文文档可设置中文名称。自定义定理需要保留正确标签类型。常见加载顺序是 amsmath、hyperref、cleveref。','crefname and Crefname set singular and plural names, including Chinese ones. Custom theorems need correct label type information. A common load order is amsmath, hyperref, then cleveref.'),
 b('varioref 的 vref 可增加“上一页”等页面位置描述，分页变化后可能需要更多次编译。智能引用已含对象名称，正文直接接它即可。旧模板和 PDF 新功能的兼容性仍看相应手册。','varioref’s vref can add descriptions such as a previous page, which can require more reruns after pagination changes. Smart references already supply names, so use them directly in the prose. Check compatibility for old templates or new PDF features.')],
 b('一次引用两个编号公式，并避免重复写类型名称。','Reference two numbered equations without repeating their type names.'),[
 step('按顺序加载','Load in order','在导言区把 cleveref 放到 hyperref 后。noabbrev 使用完整名称，nameinlink 把名称也包含进链接。','Load cleveref after hyperref in the preamble. noabbrev uses full names, and nameinlink includes those names in the link.',R`\usepackage{amsmath}
\usepackage[hidelinks]{hyperref}
\usepackage[nameinlink,noabbrev]{cleveref}`),
 step('给每个公式唯一标签','Label each equation uniquely','在正文添加两个公式。它们只是教学用数学等式；用不同的 eq: 键分别记录。','Add two equations in the body with separate eq: keys. They are mathematical expressions for a typesetting lesson.',R`\begin{equation}\label{eq:first}a+a=2a\end{equation}
\begin{equation}\label{eq:second}a\cdot a=a^2\end{equation}
\Cref{eq:first,eq:second} show two operations.`),
 step('看自动名称和范围','Inspect names and lists','用 pdfLaTeX 编译两次，确认 Cref 输出复数名称和两个编号。把正文手写的 Equations 去掉，避免输出“Equations Equations”；需要中文名称时配置 crefname/Crefname。','Run pdfLaTeX twice and check the plural type name and both numbers. Do not prepend a handwritten “Equations” to Cref. Configure crefname and Crefname if the document needs Chinese names.')],
 check('Table~\\cref{tab:counts} 可能多输出什么？','What can Table~\\cref{tab:counts} repeat?','表的类型名称。','The table type name.','cref 已经按标签补上 table 等名称，外面再写一次会重复。','cref already supplies a name such as table, so adding one outside repeats it.'),['cleveref','varioref'],'guided-references-document');

teach('beamer',b('每个 frame 讲一个明确问题，逐步显示会为同一页产生多张 PDF 页面。','Give each frame one clear question; overlays create several PDF pages for one frame.'),[
 b('Beamer 在 frame 中排内容，overlay 控制分步出现的文字。同一个 frame 可生成多张 PDF 页面；section 管导航结构，不会自动生成内容页。默认页面比例是 4:3。','Beamer typesets content in frames and uses overlays for staged display. One frame can generate multiple PDF pages. section organizes navigation without creating content frames. The default ratio is 4:3.'),
 b('aspectratio=169 选择 16:9。Beamer 已加载 hyperref、xcolor 和数学支持；theme 管整体样式，colortheme 管颜色，fonttheme 管字体。常用字号遵循 Beamer 的接口。','aspectratio=169 selects 16:9. Beamer loads hyperref, xcolor, and mathematical support. theme sets the overall appearance, colortheme sets colors, and fonttheme sets fonts. Size settings follow Beamer’s interfaces.'),
 b('原样代码放在 fragile frame。文章里的浮动定位和页眉设置不能直接照搬到幻灯片。内容太多就拆 frame，检查公式与分栏边界；中文可用 ctexbeamer 或 beamer 加 ctex。','Put verbatim code in fragile frames. Article float-placement and running-header settings do not transfer directly to slides. Split crowded frames and inspect formulas and columns for overflow. Chinese can use ctexbeamer or beamer with ctex.')],
 b('从空白文件做一个标题页和一个内容页。','Create a title frame and one content frame from a blank file.'),[
 step('先选页面比例','Choose the aspect ratio','新建 talk.tex，文档类使用 beamer。标题信息和主题写在 begin{document} 前；这个英文练习可用 pdfLaTeX。','Create talk.tex with the beamer class. Put theme and title information before begin{document}. This English exercise works with pdfLaTeX.',R`\documentclass[aspectratio=169]{beamer}
\usetheme{Madrid}
\title{A short lesson}\author{Course reader}\date{}`),
 step('在正文创建两种 frame','Create two kinds of frame','正文第一个 frame 放 titlepage，第二个写一个完整意思。section 可组织导航，但内容仍需显式放进 frame。','Put titlepage in the first frame and one complete idea in the second. section organizes navigation, while the content still needs an explicit frame.',R`\begin{document}
\begin{frame}\titlepage\end{frame}
\section{Table design}
\begin{frame}{What should a table explain?}
State the unit, name the columns, and explain any markers.
\end{frame}
\end{document}`),
 step('按投影大小检查','Inspect at presentation size','用 pdfLaTeX 编译两次，PDF 应有两页。以整页模式读第二页，检查字号和长句边界；加入 overlay 后，PDF 页数可能超过 frame 数。','Run pdfLaTeX twice and expect two PDF pages. Read the content in full-page mode and inspect type size and line boundaries. Adding overlays can make the PDF page count exceed the frame count.')],
 check('只有 section{Results}，PDF 会自动出现一张 Results 内容页吗？','Does section{Results} automatically create a Results content slide?','不会，要显式创建 frame 或设置分节钩子。','No; add a frame or a section hook.','section 记录导航信息，普通内容页由 frame 承载。','section records navigation structure; frame contains ordinary slide content.'),['beamer'],'guided-beamer-overlays-code');

teach('beamer-frames',b('用 frame 管内容，用 section 管导航，先留出足够空间。','Use frame for content and section for navigation, with enough room for the material.'),[
 b('frame 的高度固定；带 overlay 的一个 frame 会输出多个 PDF 页，因此 frame 编号与 PDF 页码未必相同。16:9 写 aspectratio=169，4:3 写 aspectratio=43，按显示设备和交付要求选。','A frame has fixed height. Overlays can turn one frame into several PDF pages, so frame numbers and page numbers can differ. Use aspectratio=169 for 16:9 or aspectratio=43 for 4:3, according to the display and delivery requirements.'),
 b('frame 后的花括号设置标题，也可在里面写 frametitle。t、c、b 控制垂直位置；plain 隐藏常规主题页眉页脚，适合整页图。titlepage 放独立 frame，页脚标题太长时给 title 一个短版本。','The frame’s braced argument sets its title; frametitle can set it inside. t, c, and b control vertical placement. plain hides normal theme headers and footers for a full-frame graphic. Put titlepage in its own frame and give title a short form when a footer needs it.'),
 b('section 只更新目录和导航，分节页可用 AtBeginSection 插入。拥挤内容先拆成几个 frame；allowframebreaks 适合长文献表等线性内容，与一般 overlay 不能混用。','section updates contents and navigation. AtBeginSection can insert section outlines. Split crowded content across frames. allowframebreaks suits linear material such as references and is incompatible with ordinary overlays.'),
 b('tableofcontents 读取 section 信息，需要重编译。AtBeginSection 的空可选参数让星号章节不执行这一钩子；currentsection 在分节目录中突出当前节。','tableofcontents uses section data and needs a rerun. An empty optional argument to AtBeginSection prevents the hook for starred sections. currentsection emphasizes the current section in an outline.'),
 b('Beamer 图表仍可写 caption 和 label，但不会按文章浮动规则移动。参考文献可用 thebibliography 或 BibTeX/Biber；文献较多时可用 allowframebreaks 单独排文献页。','Beamer figures and tables accept caption and label but do not float as in an article. Use thebibliography or a BibTeX/Biber chain for references. A long bibliography can have its own allowframebreaks frame.')],
 b('加上目录导航，并判断内容是否需要拆页。','Add navigation and judge whether a crowded frame should be split.'),[
 step('给 frame 一个明确标题','Give the frame a clear title','在已有 Beamer 文档正文用下面环境。t 让内容从较高位置开始，标题直接说本页要回答的问题。','Use this frame in an existing Beamer document. t puts content near the top, and the title identifies the page’s question.',R`\begin{frame}[t]{How do table labels work?}
\begin{itemize}
\item A caption establishes the table number.
\item A label records that number.
\item A reference retrieves it after a rerun.
\end{itemize}
\end{frame}`),
 step('把目录放进 frame','Put the outline in a frame','导言区可加 AtBeginSection 钩子，每次进入普通 section 时生成当前节目录。正文仍要用 section 声明节，并给每页写 frame。','Add this AtBeginSection hook in the preamble to produce an outline for each ordinary section. Declare sections and content frames in the body.',R`\AtBeginSection[]{
  \begin{frame}{Outline}
    \tableofcontents[currentsection]
  \end{frame}
}`),
 step('确认固定高度装得下','Check the fixed height','用 pdfLaTeX 编译两次检查目录。给内容页多加一段后，如果底部越界，拆成两个 frame 并各写标题；不要把 overlay 和 allowframebreaks 混在同一 frame。','Run pdfLaTeX twice to inspect the outline. If added text overflows the bottom, split it into two titled frames. Keep ordinary overlays separate from allowframebreaks.')],
 check('一个 frame 有三张 overlay，它的 frame 编号应增加几次？','How many times does the frame number normally advance for a frame with three overlays?','通常一次；PDF 会多出三张页面。','Normally once; the PDF contains three pages for that frame.','overlay 是同一个逻辑 frame 的不同显示状态，PDF 页计数和 frame 计数有不同含义。','Overlays are display states of one logical frame; PDF pages and frames count different things.'),['beamer'],'guided-beamer-overlays-code');

teach('beamer-overlays',b('给每一步明确编号，并决定暂时隐藏的内容要不要占位。','Number the reveal steps and decide whether hidden content should reserve space.'),[
 b('写 <2> 只在第二张显示，<2-> 从第二张起显示，<1-3> 在前面三张显示。item 后可直接跟规格。pause 从当前位置推迟后面的内容，适合简单的顺序讲述。','<2> shows material only on overlay two; <2-> shows it from two onward; <1-3> selects the first three. Put specifications directly after item. pause delays following content for a simple linear explanation.'),
 b('only 在其他状态把内容移除，布局可能移动。uncover 保留位置，默认暂时隐藏；setbeamercovered{transparent} 可改为淡化显示。无星号 onslide 接近保留空间的行为，不加花括号时会持续影响后续内容。','only removes unselected material and can shift the layout. uncover reserves space, normally hiding the material; setbeamercovered{transparent} can make it faint. Unstarred onslide has space-preserving behavior, and its unbraced form affects following content until the next state change.'),
 b('<+-> 自动递增显示编号，编辑时比较省事。关键推理可明确写编号，便于查每一步。handout 通常合并显示状态，互斥 only 内容要设置 handout 规格，避免印在一起。','<+-> increments overlay numbers automatically. Explicit numbers can make an important sequence easier to check. handout usually collapses overlays; mutually exclusive only blocks need suitable handout specifications to avoid overlapping.'),
 b('逐张看 PDF 的中间状态。表格高度、公式编号和引用计数都可能随着显示状态改变。复杂公式用显式规格安排，线性列表才适合主要依赖 pause。','Inspect every intermediate PDF page. Table height, equation numbering, and references can change with the display state. Use explicit specifications for complex formulas and pause for a linear list.'),
 b('Beamer 为每张 overlay 重新排同一个 frame，并恢复常见计数器。自定义计数器按需用 resetcounteronoverlays。互斥内容高度不同时，用 overlayarea 固定区域，后面的文字位置就更稳定。','Beamer typesets the frame for each overlay and restores common counters. Use resetcounteronoverlays when a custom counter needs it. For alternatives of different heights, overlayarea reserves a stable region.')],
 b('让三条操作逐条出现，并保持页面布局稳定。','Reveal three operations in sequence without shifting the layout.'),[
 step('把显示状态标清楚','Specify the reveal states','在 Beamer 正文写下面 frame。第一条从第 1 张起可见，第二条从第 2 张起可见，第三条从第 3 张起可见。','Put this frame in a Beamer body. The first item appears from overlay 1, the second from 2, and the third from 3.',R`\begin{frame}[t]{Resolve a missing reference}
\begin{itemize}
\item<1-> Check the label key.
\item<2-> Compile again to read the auxiliary file.
\item<3-> Inspect the number and click its link.
\end{itemize}
\end{frame}`),
 step('比较保留空间和移除内容','Compare reserved and removed content','在同一 frame 内另加下面一行，用 uncover 让提示留在固定位置。把它临时换成 only，对照后续文字是否移动，再恢复需要的行为。','Add this line within the frame. uncover reserves its position. Temporarily change it to only, inspect whether later text shifts, then retain the behavior the presentation needs.',R`\uncover<2->{The first run writes the label data.}`),
 step('每一张都看一遍','Inspect every overlay','用 pdfLaTeX 编译，按顺序看这个 frame 输出的三张 PDF 页。检查第二张是否正好增加第二条，以及最后一张有无越界；交手稿时另编译 handout 版本核对。','Compile with pdfLaTeX and inspect the frame’s three PDF pages in order. Check the added second item and final-page boundaries. Build and inspect a handout version separately when delivering printouts.')],
 check('隐藏一段较长提示时，希望后面文字不移动，应选 only 还是 uncover？','To hide a long note without moving later text, should you use only or uncover?','uncover。','uncover.','uncover 保留隐藏内容的空间；only 在不显示时把内容移除，后面文字可能重新布局。','uncover reserves the hidden material’s space; only removes it and can reflow the following content.'),['beamer'],'guided-beamer-overlays-code');

teach('beamer-fragile',b('有原样代码的 frame 加 fragile，并把结束标记单独放一行。','Add fragile to frames with literal code and put the ending on its own line.'),[
 b('普通 frame 先把内容读成宏参数，verbatim 需要的字符类别修改就来不及了。fragile 通过辅助文件保存并重新读取内容，让原样代码能保持反斜杠、百分号等字符。','An ordinary frame tokenizes its body as a macro argument before verbatim can change character categories. fragile writes and rereads the content through an auxiliary file, allowing literal backslashes and percent signs.'),
 b('使用 begin{frame} 环境形式，并把 end{frame} 单独放一行。fragile 也不能让标题、caption 等参数中的 verb 自动可用；这些参数有自己的读取限制。','Use the begin{frame} environment form and put end{frame} on a line by itself. fragile does not make verb work inside titles or captions, which have their own argument-reading restrictions.'),
 b('listings 在 TeX 内做高亮，minted 调外部高亮工具，两者用于 frame 时都需要 fragile。minted 还需配置 latexminted 和执行权限。长代码放独立文件可减少主稿转义的负担。','listings highlights within TeX; minted calls an external tool. Both need fragile frames. minted also needs a working latexminted setup and execution permissions. Separate code files can reduce escaping in the main source.')],
 b('在幻灯片中原样显示一段 LaTeX 源码。','Display a LaTeX snippet literally on a slide.'),[
 step('先用最少依赖排代码','Start with basic verbatim','在 Beamer 正文使用 frame 环境并加 fragile。这个练习只用 verbatim，无需另装高亮工具。','Use the frame environment with fragile in the Beamer body. This lesson uses basic verbatim and needs no external highlighter.',R`\begin{frame}[fragile]{A literal table row}
\begin{verbatim}
Course & Count \\
Writing & 12 \\
% invented teaching data
\end{verbatim}
\end{frame}`),
 step('把结束标记单独写','Keep the ending on its own line','end{verbatim} 和 end{frame} 各占一行，frame 的结束行后不要接其他内容。代码标题使用普通文字，需要命令名时可用 texttt 并正确转义。','Keep end{verbatim} and end{frame} on separate lines, with no trailing content after the frame ending. Use ordinary title text, or correctly escaped texttt for command names.'),
 step('检查代码是否真的原样显示','Inspect literal output','用 pdfLaTeX 编译，检查 &、百分号和双反斜杠是否都印出来。若遇到读取到文件末尾的错误，先看 end{frame} 是否独立成行，再核对环境是否配对。','Compile with pdfLaTeX and check that &, %, and double backslashes all print. For a read-to-end-of-file error, inspect the separate end{frame} line and the matching environment ends.')],
 check('加 fragile 后，把 verb 放进 frame 标题就一定能编译吗？','After adding fragile, is verb guaranteed to work inside a frame title?','不能，标题仍是命令参数，应使用普通或正确转义的文字。','No; the title is still an argument, so use ordinary or correctly escaped text.','fragile 改变 frame 正文的读取方式，不解除标题参数自身的字符读取限制。','fragile changes how the frame body is read, not the title argument’s character-handling restrictions.'),['beamer'],'guided-beamer-overlays-code');

function exercise(id,module,type,title,question,options,answer,explain,related,code) {
  D.exercises.push({id:'exercise-guided-tables-'+id,module,type,title,question,
    options:options.map(x=>x[0]),wrong:options.map(x=>x[1]),answer,explain,related,...(code?{code}:{})});
}
exercise('row-repair','tables','debug',b('修复文字中的 &','Repair an ampersand in cell text'),
 b('下面两列表格触发 Extra alignment tab。A&B 是一个小组名称，人数是 12，哪项修改保留原意？','This two-column table raises Extra alignment tab. A&B is one group name and 12 is its count. Which repair preserves that meaning?'),[
 [b(R`A\&B & 12 \\`,R`A\&B & 12 \\`),b('正确：名称里的 & 转义，另一处 & 保留为两列分隔符。','Correct: escape the ampersand in the name and keep the other as the column separator.')],
 [b(R`A & B & 12 \\`,R`A & B & 12 \\`),b('这仍是三格，{lr} 只有两列；名称也被拆开。','This still has three cells for two columns and splits the name.')],
 [b(R`A\&B \& 12 \\`,R`A\&B \& 12 \\`),b('两个 & 都成了文字，两列之间反而没有分隔符。','Both ampersands become text, leaving no separator between the two columns.')],
 [b('把 {lr} 改成 {lrr}','Change {lr} to {lrr}'),b('三列能容纳源码，但会把 A&B 拆成两列，改变题目要求的名称。','Three columns can hold the source but split A&B into two cells, changing the intended name.')]
 ],0,b('区分文字与结构：名称写 A\\&B，单元格之间仍写 &。修复后每个数据行只有一个未转义分隔符。','Separate text from structure: write A\\&B as the name and keep & between cells. The repaired row has one unescaped separator.'),['tabular'],R`\begin{tabular}{lr}
Group & Count \\
A&B & 12 \\
\end{tabular}`);

exercise('width-choice','tables','scenario',b('窄容器中的长说明','A long description in a narrow container'),
 b('半页宽的 minipage 里，编号列很短、说明列很长。哪种起点最合适？','A half-width minipage has short identifiers and long descriptions. Which is a suitable starting point?'),[
 [b(R`tabularx{linewidth}{lX}`,R`tabularx{linewidth}{lX}`),b('正确：l 留给短编号，X 分配剩余宽度并自动换行。','Correct: l holds short identifiers and X receives the remaining width and wraps.')],
 [b(R`tabular{ll}`,R`tabular{ll}`),b('两个 l 都按内容取自然宽度，长说明容易让表超宽。','Both l columns take natural width, so the description can overflow.')],
 [b('给每个单元格加 H','Add H to every cell'),b('H 是 float 宏包的浮动定位选项，不是单元格列宽设置。','H is a float placement option, not a cell-width setting.')],
 [b('先把所有字号缩到 tiny','Start by changing all text to tiny'),b('字号先缩小会降低可读性；这里已经有明确的自动换行需求。','Shrinking first harms readability when the problem already has a wrapping solution.')]
 ],0,b('先让说明换行，再判断表是否还太宽。总宽度使用当前容器的 linewidth，长说明放 X 列。','Let descriptions wrap before judging remaining width. Use the container’s linewidth and put long prose in X.'),['tabularx','array-columns']);

exercise('longtable-wrapper','tables','debug',b('让长表恢复分页','Restore long-table pagination'),
 b('表超过一页，作者把 longtable 放进 table[htbp]，编译和分页出现问题。哪项处理针对原因？','A table exceeds a page. Wrapping longtable in table[htbp] causes build and pagination problems. Which change addresses the cause?'),[
 [b('去掉外层 table，让 longtable 直接放在正文','Remove table and place longtable directly in the body'),b('正确：longtable 需要直接参与页面输出并在行之间分页。','Correct: longtable must participate directly in page output to break between rows.')],
 [b('把 htbp 改成 H','Change htbp to H'),b('位置选项仍留着不可分页的浮动外壳，没有修复机制冲突。','A position option retains the unbreakable wrapper and does not fix the conflict.')],
 [b('再加一层 resizebox','Add resizebox around it'),b('resizebox 将内容装成整体盒子，进一步妨碍分页。','resizebox boxes the content together and prevents pagination.')],
 [b('只把 caption 移到表外','Move only the caption outside'),b('外层 table 仍在，分页所需的输出结构没有恢复。','The table wrapper remains, so the needed page-output structure is still missing.')]
 ],0,b('跨页机制由 longtable 提供。把题注留在 longtable 内，外层不用 table；增添足够数据行后检查第二页表头。','longtable supplies pagination. Keep its caption inside it, omit the table wrapper, and inspect recurring headers after adding enough rows.'),['longtable','large-tables'],R`\begin{table}[htbp]
\begin{longtable}{lr}
Name & Count \\
% Many invented teaching rows...
\end{longtable}
\end{table}`);

exercise('numeric-header','tables','single',b('数字列的文字表头','A text heading in a numeric column'),
 b('siunitx 的 S 列数据为 9.50、12.25，表头是 Score。哪个表头写法可跳过数字解析？','An siunitx S column contains 9.50 and 12.25, with a Score heading. Which heading bypasses number parsing?'),[
 [b('{Score}','{Score}'),b('正确：花括号把这格保护为文本。','Correct: braces protect the cell as text.')],
 [b('Score','Score'),b('裸文本可能被数字解析器读取；这里需要明确保护。','Bare text can be sent to the number parser; protect it explicitly here.')],
 [b('0Score','0Score'),b('添一个数字没有使整串变成合法数字，还改变了表头。','Adding a digit does not make the string a valid number and changes the heading.')],
 [b('把每个数都放进花括号','Brace every number instead'),b('这样绕开了数字处理，失去本题要练的小数对齐功能。','This bypasses numeric processing for the values and defeats the intended decimal alignment.')]
 ],0,b('表头按文本排，数据按数字排；S[table-format=2.2] 可为这组虚构教学数值预留对齐位置。','Typeset headings as text and data as numbers. S[table-format=2.2] reserves alignment space for these invented teaching values.'),['siunitx']);

exercise('caption-label','crossrefs','debug',b('表号为何引用错了','Why the table reference is wrong'),
 b('完成两次编译后，下面 tab:counts 仍引用到上一对象。哪项调整解决绑定位置？','After two runs, tab:counts still refers to an earlier object. Which change fixes the binding position?'),[
 [b('把 label 移到 caption 后','Move label after caption'),b('正确：caption 更新表计数器之后，label 才记录当前表号。','Correct: label records the table number after caption updates the counter.')],
 [b('继续编译十次','Compile ten more times'),b('多次编译会稳定错误绑定的值，不会改变 label 放置的位置。','More runs stabilize the incorrectly bound value rather than move the label.')],
 [b('把表改成数字列 S','Use an S column'),b('数字对齐不会改变题注计数器和标签绑定。','Numeric alignment does not change caption counters or label binding.')],
 [b('把 ref 改成 pageref','Change ref to pageref'),b('pageref 取页码，仍读取同一个标签，不能修正表号绑定。','pageref retrieves a page from the same label and does not repair the number binding.')]
 ],0,b('标签跟在建立目标编号的命令后：章节跟标题，图表跟 caption，公式放编号环境内。然后再编译稳定引用。','Put labels after commands that establish their numbers: after headings and captions, or inside numbered equations. Then rerun to stabilize references.'),['caption','cross-references'],R`\begin{table}[htbp]
\label{tab:counts}
\caption{Invented teaching counts}
\begin{tabular}{lr}Writing & 12 \\\end{tabular}
\end{table}`);

exercise('backend-file','bibliography','scenario',b('文献后端该读哪个文件','Which file does the backend read?'),
 b('main.tex 使用 biblatex 的 backend=biber，refs.bib 存文献。首次 LaTeX 编译后，下一步应做什么？','main.tex uses biblatex with backend=biber, and refs.bib stores the records. What follows the first LaTeX run?'),[
 [b('运行 biber main，再运行 LaTeX 到引用稳定','Run biber main, then rerun LaTeX until references stabilize'),b('正确：Biber 读取主任务的 bcf，并处理它请求的数据库。','Correct: Biber reads the main job’s bcf and processes its requested database.')],
 [b('运行 bibtex refs','Run bibtex refs'),b('程序和任务名都与此配置不符，refs.bib 是数据库。','Both the processor and job name differ from this setup; refs.bib is the database.')],
 [b('把 refs.bib 改成 refs.tex','Rename refs.bib to refs.tex'),b('改扩展名没有执行数据处理，还破坏了资源声明。','Renaming does not process records and breaks the resource declaration.')],
 [b('只删除所有 cite 命令','Delete all cite commands'),b('这会去掉正文请求，默认文献表可能为空，教学目标也无法完成。','Removing requests can leave the default bibliography empty and does not complete the task.')]
 ],0,b('Biber 处理 biblatex 请求，任务名跟主文件一致；之后 LaTeX 读取处理结果。传统 BibTeX 项目使用另一套接口与 aux。','Biber processes biblatex requests for the main job; LaTeX then reads its output. Traditional BibTeX projects use a separate interface and aux.'),['biblatex','bibtex']);

exercise('citation-role','bibliography','single',b('让作者进入句子','Make the author part of the sentence'),
 b('natbib 作者年份模式下，希望输出类似“Daly (2010) explains...”。哪个源码符合这个句型？','In natbib author-year mode, you want a sentence like “Daly (2010) explains...”. Which source fits?'),[
 [b(R`\citet{daly-natbib} explains the interface.`,R`\citet{daly-natbib} explains the interface.`),b('正确：citet 将作者放进句子，并把年份置于相应括号。','Correct: citet integrates the author into the sentence with the year in its configured parentheses.')],
 [b(R`\citep{daly-natbib} explains the interface.`,R`\citep{daly-natbib} explains the interface.`),b('citep 将整条引用括起来，更适合在完整陈述后附出处。','citep encloses the reference and fits better after a complete claim.')],
 [b(R`Daly \citet{daly-natbib} explains the interface.`,R`Daly \citet{daly-natbib} explains the interface.`),b('citet 已输出作者，这里又手写一次，作者名会重复。','citet already prints the author, so the handwritten name repeats it.')],
 [b(R`\bibliography{daly-natbib} explains the interface.`,R`\bibliography{daly-natbib} explains the interface.`),b('bibliography 声明数据库与输出，不是句中的引用命令。','bibliography selects a database and bibliography output, not an in-text citation.')]
 ],0,b('先判断作者在句中承担什么角色。作者参与陈述用 citet，完整陈述后的括号来源用 citep；样式和编译链也要匹配。','Choose by the author’s role in the sentence. Use citet for an author in the statement and citep for a parenthetical source after it, with matching style and build chain.'),['natbib','citet-citep']);

exercise('overlay-code','beamer','debug',b('代码页和分步页','Code frames and reveal frames'),
 b('一个普通 frame 中有 verbatim 源码，另外希望提示从第二张起显示且占位稳定。哪组调整同时合适？','A normal frame contains verbatim code, and a note should appear from overlay two onward without shifting later text. Which changes fit both needs?'),[
 [b('frame 加 fragile，提示用 uncover<2->','Add fragile and use uncover<2-> for the note'),b('正确：fragile 支持原样字符读取，uncover 保留提示空间。','Correct: fragile supports literal characters, and uncover reserves the note’s space.')],
 [b('只给提示加 only<2->','Only add only<2-> to the note'),b('原样代码的读取问题仍在；only 也不保留未显示提示的空间。','The code-reading problem remains, and only does not reserve space while the note is hidden.')],
 [b('frame 改成 table[H]','Replace the frame with table[H]'),b('table 不是 Beamer 内容页接口，H 也不处理原样字符。','table is not a Beamer content-frame interface, and H does not handle literal characters.')],
 [b('给 frame 加 allowframebreaks，再写 pause','Use allowframebreaks and pause'),b('自动拆页不处理本题的原样读取，而且不能这样与一般逐步显示组合。','Automatic page breaks do not fix literal reading and are incompatible with ordinary overlays.')]
 ],0,b('把 end{frame} 单独放一行，并实际检查每张 overlay。代码页可先用基本 verbatim，避免练习依赖额外高亮工具。','Put end{frame} on its own line and inspect every overlay. Start with basic verbatim to avoid external highlighting dependencies.'),['beamer-fragile','beamer-overlays'],R`\begin{frame}{Source}
\begin{verbatim}
\label{tab:counts}
\end{verbatim}
\end{frame}`);

const examples=[
 {
  id:'guided-table-progression',
  title:b('一张表，从两列到可读的宽表','One table, from two columns to a readable wide layout'),
  description:b('同一份虚构教学数据分三步排：tabular 认识行列，booktabs+siunitx 整理横线与数字，tabularx 让说明列换行。每步都在一个完整文档中，可直接用 pdfLaTeX 编译。','Typeset the same invented teaching data in three stages: tabular rows, booktabs and siunitx rules and numbers, then tabularx wrapping descriptions. All stages are in one complete pdfLaTeX document.'),
  engine:'pdflatex',modules:['tables'],
  code:R`\documentclass[11pt]{article}
\usepackage[margin=25mm]{geometry}
\usepackage{booktabs,siunitx,tabularx,array}
\newcolumntype{Y}{>{\raggedright\arraybackslash}X}
\begin{document}
\section*{A table, built in three steps}
All numbers below are invented teaching data for a typesetting lesson.

\subsection*{1. Understand rows and columns}
The first column is left aligned; the second is right aligned.
\begin{center}
\begin{tabular}{lr}
Task & Time (min) \\
Draft & 9.50 \\
Review & 12.25 \\
\end{tabular}
\end{center}

\subsection*{2. Separate the heading and align decimals}
The S column parses numbers. Braces protect its text heading.
\begin{center}
\begin{tabular}{lS[table-format=2.2]}
\toprule
Task & {Time (min)} \\
\midrule
Draft & 9.50 \\
Review & 12.25 \\
\bottomrule
\end{tabular}
\end{center}

\subsection*{3. Add a description without overflowing}
The description receives the remaining width and wraps.
\begin{table}[htbp]
\centering
\caption{Invented tasks and times}\label{tab:tasks}
\begin{tabularx}{\linewidth}{@{}lY S[table-format=2.2]@{}}
\toprule
Task & Description & {Time (min)} \\
\midrule
Draft & Write a short introduction that states the question before explaining the background. & 9.50 \\
Review & Check that captions name units, references resolve, and the table fits its container. & 12.25 \\
\bottomrule
\end{tabularx}
\end{table}
Table~\ref{tab:tasks} keeps the descriptions readable.
Change one description and recompile to see the X column reflow.
\end{document}`
 },
 {
  id:'guided-references-document',
  title:b('把章节、公式、表格和文献连起来','Connect sections, equations, tables, and a source'),
  description:b('完整文章包含双向章节跳转、公式与表格引用、可点击的真实官方来源。文献用 thebibliography 内置，不需 BibTeX 或 Biber；用 pdfLaTeX 编译两次稳定编号。','A complete article with internal section links, equation and table references, and a real official source. An inline thebibliography needs no BibTeX or Biber; run pdfLaTeX twice to stabilize numbers.'),
  engine:'pdflatex',modules:['tables','bibliography','crossrefs'],
  code:R`\documentclass[11pt]{article}
\usepackage[margin=25mm]{geometry}
\usepackage{amsmath,booktabs,siunitx}
\usepackage[hidelinks]{hyperref}
\usepackage[nameinlink,noabbrev]{cleveref}
\hypersetup{pdftitle={A guided reference document},pdfauthor={Course reader}}
\begin{document}
\tableofcontents
\section{Question}\label{sec:question}
How can a reader find an equation, a table, and the source of a command?
The details are in \cref{sec:method}; the arithmetic is in \cref{eq:average}.
The LaTeX Project provides official documentation \cite{latex-project}.

\section{Method}\label{sec:method}
Let $t_1$ and $t_2$ be the two task times in minutes.
The symbol $\bar t$ denotes their arithmetic mean:
\begin{equation}\label{eq:average}
\bar t=\frac{t_1+t_2}{2}.
\end{equation}
The values in \cref{tab:times} are invented teaching data.
They demonstrate alignment and references.
\begin{table}[htbp]
\centering
\caption{Invented task times}\label{tab:times}
\begin{tabular}{lS[table-format=2.2]}
\toprule
Task & {Time (min)} \\
\midrule
Draft & 9.50 \\
Review & 12.25 \\
\bottomrule
\end{tabular}
\end{table}
\Cref{eq:average} is on page~\pageref{eq:average}.
Return to \cref{sec:question} or read
\href{https://www.latex-project.org/help/documentation/}{the official documentation}.

\begin{thebibliography}{9}
\raggedright
\bibitem{latex-project}
The LaTeX Project.
\emph{Documentation}.
\url{https://www.latex-project.org/help/documentation/}.
\end{thebibliography}
\end{document}`
 },
 {
  id:'guided-beamer-overlays-code',
  title:b('三步讲解，再给一页源码','Three reveal steps and a literal code frame'),
  description:b('16:9 的完整 Beamer：标题页、三张稳定占位的逐步显示、fragile 原样代码页。只需常见 Beamer 依赖，无外部图片与高亮工具，预期共五张 PDF 页面。','A complete 16:9 Beamer deck with a title, three stable reveal states, and a fragile code frame. It uses ordinary Beamer dependencies without images or external highlighting, producing five PDF pages.'),
  engine:'pdflatex',modules:['beamer','tables','crossrefs'],
  code:R`\documentclass[aspectratio=169]{beamer}
\usetheme{Madrid}
\setbeamertemplate{navigation symbols}{}
\title{Read a table before polishing it}
\author{Course reader}
\date{}
\begin{document}
\begin{frame}
\titlepage
\end{frame}

\section{A three-step check}
\begin{frame}[t]{What must the reader be able to tell?}
\begin{enumerate}
\item<1-> Which quantities each column contains.
\item<2-> Which units the numbers use.
\item<3-> Whether notes explain any markers.
\end{enumerate}
\vspace{1em}
\uncover<2->{Reserve the space for this note so the layout stays steady.}
\end{frame}

\begin{frame}[fragile]{Read the source literally}
These numbers are invented teaching data.
\begin{verbatim}
\begin{tabular}{lr}
Task & Time (min) \\
Draft & 9.50 \\
Review & 12.25 \\
\end{tabular}
\end{verbatim}
The ampersand separates cells. The double backslash ends a row.
\end{frame}
\end{document}`
 }
];
for(const e of examples) {
  if(D.examples.some(x=>x.id===e.id))throw new Error('Duplicate guided example: '+e.id);
  D.examples.push(e);
}
})();
