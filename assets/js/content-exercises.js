/* Original bilingual exercises. Source fragments are checked, not compiled. */
(() => {
 const D=window.ATELIER;
 const b=s=>{const [zh,en]=s.raw[0].split('||');return {zh:zh.trim(),en:en.trim()};};
 const o=s=>{const [zh,en,wz,we]=s.raw[0].split('||');return {text:{zh:zh.trim(),en:en.trim()},why:{zh:wz.trim(),en:we.trim()}};};
 const r=s=>s.raw[0];
 function c(id,module,type,title,question,opts,answer,explain,related,code){D.exercises.push({id:'exercise-'+id,module,type,title,question,options:opts.map(x=>x.text),wrong:opts.map(x=>x.why),answer,explain,related,...(code?{code}:{})});}
 function f(id,module,type,title,question,answer,explain,related,code){D.exercises.push({id:'exercise-'+id,module,type,title,question,answer,explain,related,...(code?{code}:{})});}
 function tf(id,module,title,question,yes,explain,related){c(id,module,'boolean',title,question,[{text:b`正确||True`,why:explain},{text:b`错误||False`,why:explain}],yes?0:1,explain,related);}
 c('preamble','syntax','single',b`导言区的位置||The preamble`,b`哪一行应放在 \begin{document} 之前？||Which line belongs before \begin{document}?`,[
 o`\usepackage{amsmath}||\usepackage{amsmath}||宏包在导言区加载。||Packages load in the preamble.`,
 o`\section{Results}||\section{Results}||章节标题属于正文。||A section heading belongs in the body.`,
 o`\caption{Result}||\caption{Result}||题注通常位于正文中的浮动体内。||A caption usually belongs in a float in the body.`,
 o`\item Result||\item Result||item 应位于列表环境内。||item belongs inside a list environment.`],0,b`导言区从 \documentclass 开始，到 \begin{document} 之前结束。宏包、字体配置和自定义命令通常放在这里。||The preamble runs from \documentclass to \begin{document}. Package loading, font setup, and command definitions normally belong there.`,['mwe']);
 c('engine-fonts','chinese','single',b`系统字体与引擎||System fonts and engines`,b`使用 fontspec 设置已安装的 OpenType 字体，哪个引擎组合适用？||Which engine pair can use fontspec to select installed OpenType fonts?`,[
 o`XeLaTeX 与 LuaLaTeX||XeLaTeX and LuaLaTeX||fontspec 面向这两个 Unicode 引擎。||fontspec supports these Unicode engines.`,
 o`仅 pdfLaTeX||Only pdfLaTeX||pdfLaTeX 不能直接使用 fontspec。||pdfLaTeX cannot use fontspec directly.`,
 o`BibTeX 与 Biber||BibTeX and Biber||这是文献处理工具，不是排版引擎。||These are bibliography processors, not typesetting engines.`,
 o`MathJax 与 BibTeX||MathJax and BibTeX||浏览器数学渲染器与文献工具不能替代这些引擎。||A browser math renderer and bibliography processor do not replace these engines.`],0,b`fontspec 要求 XeLaTeX 或 LuaLaTeX，指定的字体也须安装在编译环境中。||fontspec requires XeLaTeX or LuaLaTeX, with the selected font installed in the build environment.`,['fontspec']);
 c('class-chapters','classes','single',b`章节层级||Chapter hierarchy`,b`标准 article 与 report 的关键结构差异是什么？||What is a structural difference between the standard article and report classes?`,[
 o`report 支持 chapter；article 的主要编号层级从 section 开始||report supports chapters; article's main hierarchy begins with sections||文档类提供不同的章节层级。||The classes provide different hierarchies.`,
 o`article 完全不支持 section||article has no sections||article 正是常用 section 组织正文。||article commonly uses sections.`,
 o`report 需要 Beamer 才支持 chapter||report needs Beamer for chapters||chapter 由 report 自身提供。||report provides chapters itself.`,
 o`article 必须用 Biber 编译||article must be compiled by Biber||Biber 不能排版 article 正文。||Biber cannot typeset an article.`],0,b`article 常用于短篇论文；report 提供 chapter，适合按章组织的长报告。文档类决定结构，参考文献后端与此无关。||article is common for shorter papers; report provides chapters for longer reports. The class determines the structure independently of the bibliography backend.`,['article','report']);
 c('ctex-package','chinese','single',b`ctex 与 ctexart||ctex and ctexart`,b`保留 article 类并加入 CTeX 中文支持，应使用哪一行？||Which line adds CTeX Chinese support while keeping the article class?`,[
 o`\usepackage{ctex}||\usepackage{ctex}||ctex 是可加载到现有类的宏包。||ctex is a package for an existing class.`,
 o`\usepackage{ctexart}||\usepackage{ctexart}||ctexart 是文档类，不是用此接口加载的宏包。||ctexart is a class, not a package loaded with this interface.`,
 o`\documentclass{ctex}||\documentclass{ctex}||此处应加载 ctex 宏包，不能把它当作 article 类。||Here ctex is a package, not an article class.`,
 o`\bibliographystyle{ctex}||\bibliographystyle{ctex}||此命令选择 BibTeX 样式。||This selects a BibTeX style.`],0,b`ctex 宏包和 ctexart 类是两种入口。article + ctex 保留原有类；\documentclass{ctexart} 则选择中文文章类。||The ctex package and ctexart class are two entry points. article with ctex keeps the original class; \documentclass{ctexart} selects the Chinese article class.`,['ctex','ctexart']);
 c('comment','characters','single',b`注释范围||Comment scope`,b`通常的 LaTeX 源文件中，未转义的 % 会怎样？||What does an unescaped % do in ordinary LaTeX source?`,[
 o`忽略本行后续内容||Ignore the remainder of the source line||% 开始注释，并抑制该行结束符。||% begins a comment and suppresses that line ending.`,
 o`输出百分号||Print a percent sign||字面百分号应写 \%。||Use \% for a literal percent sign.`,
 o`打开数学模式||Start math mode||$ 才是常见数学模式分隔符。||$ is a familiar math delimiter.`,
 o`开始新段落||Start a paragraph||注释不会自动生成段落。||A comment does not create a paragraph.`],0,b`Total: 10% complete 会截掉“ complete”。打印这句话应写 Total: 10\% complete；逐字环境采用不同的字符规则。||Total: 10% complete discards “ complete”. Write Total: 10\% complete to print it; verbatim contexts use different rules.`,['percent']);
 c('one-number','math-environments','single',b`两行一个编号||Two lines, one number`,b`加载 amsmath 后，两行推导共用一个编号，哪组结构适合？||With amsmath, which structure gives a two-line derivation one equation number?`,[
 o`equation 内嵌 split||split inside equation||split 拆行，由 equation 提供编号。||split breaks lines; equation provides the number.`,
 o`两个独立 equation||Two equation environments||每个 equation 都更新公式计数器。||Each equation steps the counter.`,
 o`equation 内嵌 align||align inside equation||align 是独立显示，不能这样嵌套。||align is an independent display and cannot be nested this way.`,
 o`正文 tabular||tabular in text||tabular 不提供这种数学编号机制。||tabular does not provide this math-numbering mechanism.`],0,b`split 是附属环境，要放在已有数学显示中。若每行都要独立编号，应选 align；aligned 也可在一个外层显示中组织多行。||split is subsidiary to an existing display. Use align for separate numbers on each line; aligned can also organize lines in one surrounding display.`,['split','align','aligned']);
 c('mathbb-dependency','math-fonts','single',b`黑板粗体依赖||Blackboard-bold dependency`,b`传统 LaTeX 数学配置中，哪项能提供 \mathbb？||In a traditional LaTeX math setup, which choice provides \mathbb?`,[
 o`amsfonts，或加载它的 amssymb||amsfonts, or amssymb which loads it||AMS 字体提供这种字母。||AMS fonts supply the alphabet.`,
 o`仅 graphicx||Only graphicx||graphicx 处理图片。||graphicx handles images.`,
 o`仅 natbib||Only natbib||natbib 处理引用。||natbib handles citations.`,
 o`仅 geometry||Only geometry||geometry 处理页面尺寸。||geometry handles page dimensions.`],0,b`传统配置常加载 amssymb 后写 \mathbb{R}。unicode-math 使用另一套 Unicode 数学字体机制，字形能力要按实际字体判断。||A traditional setup commonly loads amssymb and writes \mathbb{R}. unicode-math uses another font mechanism whose glyph capabilities depend on the chosen font.`,['mathbb']);
 c('longtable-body','tables','single',b`跨页表的位置||Multipage table placement`,b`需要跨页的 longtable 应放在哪里？||Where should a longtable that must span pages be placed?`,[
 o`直接放在正文中||Directly in the body||longtable 自己管理分页和题注。||longtable manages page breaks and captions itself.`,
 o`table 浮动体内||Inside a table float||浮动体整体不能跨页。||A float cannot split across pages.`,
 o`resizebox 内||Inside resizebox||缩放盒子把表格装成不能分页的整体。||A resizing box makes the table indivisible.`,
 o`行内数学中||Inside inline math||它是正文表格环境。||It is a text table environment.`],0,b`longtable 是非浮动跨页表，应直接放在单栏正文中。标准双栏输出与它不兼容；表格缩放也不能代替分页机制。||longtable is nonfloating and belongs directly in a single-column body. Standard two-column output is incompatible; scaling does not replace page breaking.`,['longtable']);
 c('float-p','floats','single',b`浮动体页||A float page`,b`figure[htbp] 的 p 表示什么？||What does p mean in figure[htbp]?`,[
 o`专门的浮动体页||A dedicated float page||p 允许专用于浮动体的页面。||p permits a page dedicated to floats.`,
 o`强制当前段落内||Force the current paragraph||p 不表示 paragraph。||p does not mean paragraph.`,
 o`只允许奇数页||Only odd pages||这些选项不控制奇偶页。||These options do not control page parity.`,
 o`转成 PNG||Convert to PNG||位置与图片格式无关。||Placement is unrelated to image format.`],0,b`h、t、b、p 分别允许当前位置、页顶、页底和浮动体页。LaTeX 仍要遵守空间及浮动体数量等约束。||h, t, b, and p permit here, top, bottom, and float-page placement. LaTeX still applies space and float-count constraints.`,['float-placement']);
 c('natbib-textual','bibliography','single',b`叙述式引用||A narrative citation`,b`natbib 作者年份模式中，哪个命令通常产生 Smith (2020)？||In natbib author-year mode, which command normally produces Smith (2020)?`,[
 o`\citet{smith2020}||\citet{smith2020}||它提供 textual 引用。||It provides a textual citation.`,
 o`\citep{smith2020}||\citep{smith2020}||它提供括号式引用。||It provides a parenthetical citation.`,
 o`\printbibliography||\printbibliography||这是 biblatex 的文献表输出接口。||This is biblatex's bibliography-printing interface.`,
 o`\bibliography{smith2020}||\bibliography{smith2020}||它指定数据库名，不引用这个条目键。||It names a database rather than citing this entry key.`],0,b`natbib 的 citet 与 citep 分别表示叙述式与括号式引用。具体标点取决于选项和样式；biblatex 常用对应命令为 textcite 与 parencite。||natbib uses citet for narrative citations and citep for parenthetical ones. Exact punctuation depends on options and styles; common biblatex counterparts are textcite and parencite.`,['natbib','citet-citep','biblatex']);
 c('caption-order','crossrefs','single',b`题注与标签||Caption and label`,b`普通 figure 内，哪个顺序能正确记录图编号？||Which order records a normal figure's number?`,[
 o`\caption{Result}\label{fig:result}||\caption{Result}\label{fig:result}||caption 更新计数器后，label 记录它。||label records the counter updated by caption.`,
 o`\label{fig:result}\caption{Result}||\label{fig:result}\caption{Result}||先写 label 可能记录前一对象的编号。||The earlier label may record the previous object's number.`,
 o`\ref{fig:result}\caption{Result}||\ref{fig:result}\caption{Result}||ref 读取标签，不能定义标签。||ref reads a label without defining it.`,
 o`\caption{fig:result}||\caption{fig:result}||这仅打印题注文字。||This prints caption text only.`],0,b`label 应紧跟 caption，或放在它之后且仍处于该浮动体内。正文用 ref 读取编号，并按日志要求重复编译。||Place label just after caption while still inside the float. Use ref in the body and rerun LaTeX as requested by the log.`,['caption','cross-references']);
 c('fragile-option','beamer','single',b`逐字内容的 frame||A frame containing verbatim`,b`frame 内放 verbatim 通常要哪个选项？||Which frame option is normally needed for verbatim contents?`,[
 o`fragile||fragile||它改变 frame 内容处理方式以支持逐字输入。||It changes frame processing to support verbatim input.`,
 o`twocolumn||twocolumn||它不是逐字输入处理开关。||It is not the verbatim-processing option.`,
 o`backend=biber||backend=biber||这是文献后端设置。||This is a bibliography backend setting.`,
 o`fontset=fandol||fontset=fandol||这是中文字体方案设置。||This is a Chinese font-scheme setting.`],0,b`写 \begin{frame}[fragile]。Beamer 通常先采集 frame 内容，逐字输入需要特殊处理；单纯加入数学公式不自动要求 fragile。||Write \begin{frame}[fragile]. Beamer normally collects frame contents first, while verbatim needs special treatment. Ordinary mathematics alone does not require fragile.`,['beamer-fragile']);
 c('sources','ecosystem','multiple',b`项目源材料||Project source materials`,b`哪些文件通常应作为主要源材料保存？||Which files normally belong among the project's primary sources?`,[
 o`.tex||.tex||这是文档源码。||This is document source.`,
 o`.bib||.bib||这是文献数据库。||This is bibliography data.`,
 o`自编 .sty||A custom .sty||这是项目的自定义宏包依赖。||This is a custom package dependency.`,
 o`可重新生成的 .aux||A regenerable .aux||它通常是编译生成的辅助数据。||It is normally generated auxiliary data.`],[0,1,2],b`源码、数据库、自定义宏包和图片共同组成可重建项目。.aux 和 .log 通常可重建；投稿时仍须遵循出版方明确的交付要求。||Sources, databases, custom packages, and images form a rebuildable project. .aux and .log can normally be regenerated; follow explicit publisher delivery requirements.`,['mwe']);
 c('local-font','syntax','multiple',b`局部字体作用域||Local font scope`,b`哪些写法把粗体限制在 word 一词？||Which forms restrict boldface to the word word?`,[
 o`{\bfseries word}||{\bfseries word}||花括号限定声明作用域。||The group limits the declaration.`,
 o`\textbf{word}||\textbf{word}||字体命令为参数提供局部作用域。||The font command supplies local argument scope.`,
 o`\bfseries word 后继续同一作用域||\bfseries word followed by more text in the same scope||声明会继续生效。||The declaration remains active.`,
 o`\begin{document}\bfseries word||\begin{document}\bfseries word||文档作用域大于一个词。||The document scope is broader than one word.`],[0,1],b`bfseries 持续到当前组结束；textbf 的变化限制在参数内。组结束后，字体恢复为组外的设置。||bfseries remains active until the current group ends; textbf affects its argument. Closing the group restores the surrounding font settings.`,['commands-groups']);
 c('text-escapes','characters','multiple',b`正文字符转义||Text-character escaping`,b`哪些片段在普通正文中能按字面打印标点？||Which fragments print their punctuation literally in ordinary text?`,[
 o`R\&D||R\&D||反斜杠转义与号。||The escape prints the ampersand.`,
 o`10\%||10\%||反斜杠转义百分号。||The escape prints the percent sign.`,
 o`item\_id||item\_id||反斜杠转义下划线。||The escape prints the underscore.`,
 o`price $10||price $10||单个美元符开启未闭合数学模式。||The single dollar sign starts unclosed math mode.`],[0,1,2],b`打印金额可写 price \$10。特殊字符有语法角色；逐字环境另用一套规则。||Write price \$10 for a dollar amount. Special characters have syntactic roles; verbatim uses another set of rules.`,['escapes']);
 c('subsidiary-math','math-environments','multiple',b`附属数学环境||Subsidiary math environments`,b`哪些 amsmath 环境需要已有数学模式？||Which amsmath environments require an existing math context?`,[
 o`aligned||aligned||它位于外层数学显示中。||It lives inside an outer math display.`,
 o`split||split||它为已有显示提供拆行。||It breaks lines inside an existing display.`,
 o`equation||equation||它自己建立数学显示。||It establishes a math display itself.`,
 o`align||align||它自己建立多行显示。||It establishes a multiline display itself.`],[0,1],b`不要在 equation 中嵌套 align。aligned 与 split 服务于外层显示；cases 和矩阵环境也通常需要先进入数学模式。||Do not nest align inside equation. aligned and split serve an outer display; cases and matrices also normally require math mode.`,['aligned','split','align']);
 c('operator-roles','math-fonts','multiple',b`数学字体与语义||Math fonts and meaning`,b`哪些写法与说明配对正确？||Which forms match their descriptions?`,[
 o`\sin x：正体函数名||\sin x: upright function name||标准运算符命令包含合适间距。||A standard operator command supplies suitable spacing.`,
 o`\operatorname{Var}(X)：自定义运算符||\operatorname{Var}(X): custom operator||amsmath 把名称排成运算符。||amsmath typesets the name as an operator.`,
 o`\mathrm{d}x：正体 d||\mathrm{d}x: upright d||字体设为正体；是否用它取决于微分记号规范。||It makes d upright; the differential convention depends on the style.`,
 o`sin x：与 \sin x 完全相同||sin x: identical to \sin x||裸字母按变量排版，字形和间距不同。||Bare letters are variables with different shape and spacing.`],[0,1,2],b`mathrm 选择正体字母，operatorname 创建带运算符间距的名称。标准函数优先使用 sin、log 等已有命令。||mathrm selects upright letters; operatorname creates a name with operator spacing. Use existing commands such as sin and log for standard functions.`,['text-operators','math-alphabets']);
 c('table-tools','tables','multiple',b`表格工具用途||Table-tool purposes`,b`哪些工具与用途配对正确？||Which tools match their stated purposes?`,[
 o`tabularx：X 列分配目标宽度||tabularx: X columns allocate target width||X 列分担可用宽度并可折行。||X columns share available width and wrap text.`,
 o`siunitx：数值对齐||siunitx: numeric alignment||S 列解析并对齐数值。||S columns parse and align numbers.`,
 o`booktabs：toprule 等规则线||booktabs: rules such as toprule||它提供规则线与相应间距。||It supplies rules and related spacing.`,
 o`graphicx：重复跨页表头||graphicx: repeated page headers||graphicx 处理图片；表头分页由其他机制提供。||graphicx handles images; another mechanism provides repeated headers.`],[0,1,2],b`宽度、数值和规则线是不同需求，可以组合这些工具。booktabs 不会使 tabular 自动跨页。||Width, numeric alignment, and rules are different needs that can be combined. booktabs does not make tabular break across pages.`,['tabularx','siunitx','booktabs']);
 c('table-header','tables','multiple',b`longtable 结构标记||longtable structure markers`,b`哪些 longtable 命令说明正确？||Which descriptions of longtable commands are correct?`,[
 o`endfirsthead：第一页表头定义结束||endfirsthead: end first-page header||它结束第一页专用表头。||It ends the first-page header definition.`,
 o`endhead：续页表头定义结束||endhead: end continuation header||它结束后续页重复表头。||It ends the repeated continuation header.`,
 o`endlastfoot：末页表尾定义结束||endlastfoot: end last-page footer||它结束最后一页专用表尾。||It ends the last-page footer definition.`,
 o`endfoot：整个环境结束||endfoot: end the entire environment||整个环境由 end{longtable} 结束。||end{longtable} closes the entire environment.`],[0,1,2],b`这些命令分隔表头和表尾的定义。endfoot 结束通常页的表尾定义，endlastfoot 结束末页专用表尾定义；整个环境由 end{longtable} 关闭。||These commands separate header and footer definitions. endfoot ends the ordinary footer definition, endlastfoot ends the final-page footer definition, and end{longtable} closes the environment.`,['longtable']);
 c('cite-ownership','bibliography','multiple',b`引用命令归属||Citation command ownership`,b`哪些命令归属正确？||Which command assignments are correct?`,[
 o`citet：natbib||citet: natbib||这是 natbib 的叙述式引用。||This is natbib's textual citation.`,
 o`parencite：biblatex||parencite: biblatex||这是 biblatex 的括号式引用。||This is biblatex's parenthetical citation.`,
 o`addbibresource：biblatex||addbibresource: biblatex||它注册 biblatex 数据源。||It registers a biblatex resource.`,
 o`bibliographystyle：Biber 可执行程序||bibliographystyle: a Biber executable||这是文档中的传统 BibTeX 接口命令。||It is a traditional BibTeX-interface command in the document.`],[0,1,2],b`biblatex 可提供 natbib 兼容命令；使用这些命令时仍采用 biblatex 的文献系统，无需同时加载 natbib。引用命令应与选定的系统和后端配套。||biblatex can provide natbib-compatible commands while retaining its own bibliography system, without loading natbib. Use citation commands that match the selected system and backend.`,['natbib','biblatex']);
 c('unresolved-ref','crossrefs','multiple',b`未解析的引用||Unresolved references`,b`某引用显示 ??，哪些检查有帮助？||A reference displays ??. Which checks are useful?`,[
 o`label 和 ref 的键是否相同||Whether label and ref keys match||完整字符串必须一致。||The full strings must match.`,
 o`标签是否重复定义||Whether a label is defined twice||重复键会产生不明确目标和警告。||Duplicate keys create ambiguous targets and warnings.`,
 o`无致命错误后是否再次运行 LaTeX||Whether LaTeX was rerun after a build without fatal errors||下一轮读取之前写入的辅助数据。||The next run reads previously written auxiliary data.`,
 o`把所有编号手写||Hard-code all numbers||手写不能修复标签且会随结构变化失效。||Hard-coding does not repair labels and becomes stale.`],[0,1,2],b`确认标签位于实际编译的文件中，并放在对应计数器更新之后。键有拼写错误时，先修正源码，再重新编译。||Check that the label is in a file included in the build and follows the relevant counter update. Correct any misspelled key in the source before rerunning LaTeX.`,['cross-references','error-reference']);
 c('overlay-space','beamer','multiple',b`逐步显示与空间||Overlays and space`,b`哪些 Beamer overlay 说明正确？||Which Beamer overlay descriptions are correct?`,[
 o`uncover 通常保留隐藏内容空间||uncover normally reserves space||这有助于布局稳定。||This helps keep layout stable.`,
 o`only 未选中时不保留内容空间||only removes the content's space when unselected||周围内容可能移动。||Surrounding content may move.`,
 o`pause 可使后续内容延后出现||pause can delay later content||这是基本的逐步显示方式。||This is a basic reveal mechanism.`,
 o`overlay 必然增加 frame 高度||An overlay necessarily increases frame height||溢出取决于实际排版内容。||Overflow depends on actual layout contents.`],[0,1,2],b`使用 only 或 uncover 时应考虑是否保留位置。复杂公式和 columns 中先确认总高度，再设置显示顺序。||Choose only or uncover according to whether space should remain. Check total height before assigning reveal order in complex formulas or columns.`,['beamer-overlays']);
 c('build-inputs','projects','multiple',b`可复现构建信息||Reproducible-build information`,b`哪些信息有助于他人在另一台电脑重建 PDF？||Which information helps another person rebuild the PDF on another machine?`,[
 o`引擎与相关版本||Engine and relevant versions||环境会影响字体和宏包行为。||The environment affects fonts and package behavior.`,
 o`源码、图片和文献数据||Sources, images, and bibliography data||缺少输入会阻断重建。||Missing inputs prevent rebuilding.`,
 o`文献和索引处理步骤||Bibliography and index-processing steps||外部步骤可能必不可少。||External steps may be necessary.`,
 o`仅 PDF 截图||Only a PDF screenshot||截图没有源码和构建依赖。||A screenshot lacks sources and build dependencies.`],[0,1,2],b`记录真正用到的流程并保留允许交付的资源。latexmk 自动安排常规轮次，但仍需可用的引擎和外部工具。||Record the actual workflow and preserve distributable inputs. latexmk schedules ordinary reruns but still requires engines and external tools.`,['project-latexmk']);
 c('log-strategy','errors','multiple',b`阅读日志||Reading logs`,b`大量编译消息出现时，哪些做法合理？||Which approaches are reasonable when a build produces many messages?`,[
 o`先看第一条真正的错误||Inspect the first actual error||它可能导致后面的连锁错误。||It may cause later errors.`,
 o`区分错误、警告和排版诊断||Distinguish errors, warnings, and layout diagnostics||严重程度和修复方法不同。||Severity and repair strategies differ.`,
 o`制作最小复现||Create a minimal reproduction||移除无关内容可以缩小影响范围。||Removing unrelated material narrows the cause.`,
 o`删掉日志就算修复||Delete the log to count as a fix||这既不改变源码也不修复结果。||This changes neither source nor output.`],[0,1,2],b`Undefined control sequence 是错误，Overfull hbox 通常是排版诊断。先修复阻断构建的原因，再检查 PDF 中的溢出、引用和字体。||Undefined control sequence is an error; Overfull hbox is normally a layout diagnostic. Repair blocking causes first, then inspect PDF overflow, references, and fonts.`,['error-undefined-command','error-overfull']);
 f('fill-class','syntax','fill',b`文档类命令||The class command`,b`只填命令名称，不含反斜杠或参数：\____{article}。||Enter only the command name without a backslash or arguments: \____{article}.`,['documentclass'],b`documentclass 选择文档类，usepackage 加载宏包，两者各自控制文档结构和所用功能。||documentclass selects the class and usepackage loads packages, controlling document structure and added functionality respectively.`,['mwe']);
 f('fill-option','syntax','fill',b`可选参数括号||Optional-argument brackets`,b`只填一个符号：\documentclass_11pt]{article} 中，字号前缺哪个左括号？||Enter one character: which opening bracket is missing in \documentclass_11pt]{article}?`,['['],b`可选参数通常用 []，必选参数通常用 {}。完整写法是 \documentclass[11pt]{article}。||Optional arguments normally use []; mandatory arguments normally use {}. The complete form is \documentclass[11pt]{article}.`,['commands-groups']);
 f('fill-par','syntax','fill',b`结束段落||End a paragraph`,b`只填命令名称，不含反斜杠：\____ 显式结束当前段落。||Enter the command name only: \____ explicitly ends the current paragraph.`,['par'],b`par 与正常空行都能结束段落。双反斜杠强制换行，不能替代普通正文分段。||par and a normal blank line end paragraphs. A double backslash forces a line break rather than creating paragraph structure.`,['paragraphs','linebreaks']);
 f('fill-percent','characters','fill',b`打印百分号||Print a percent sign`,b`只写打印字面百分号的两字符命令，包括反斜杠。||Enter only the two-character command for a literal percent sign, including its backslash.`,[r`\%`],b`\% 打印字面符号；单独 % 注释当前源码行后续内容。||\% prints the sign; a bare % comments out the remainder of the source line.`,['percent']);
 f('fill-index','math-environments','fill',b`多字符下标||A multicharacter subscript`,b`只填一个左花括号：要使 x_i+1} 表示下标 i+1，应在 _ 后插入什么？||Enter one opening brace: what must be inserted after _ in x_i+1} to make i+1 the subscript?`,['{'],b`正确源码是 x_{i+1}。未分组时 _ 只读取下一个 token，+1 留在下标外。||The source is x_{i+1}. Without grouping, _ consumes one token and +1 remains outside the subscript.`,['inline-display']);
 f('fill-alignment','math-environments','fill',b`等号对齐标记||An equals-sign alignment marker`,b`只填一个字符：align 中沿等号对齐，f(x)_=x^2 的 _ 应换成什么？||Enter one character: replace _ in f(x)_=x^2 to align at the equals sign in align.`,['&'],b`f(x)&=x^2 将对齐点放在等号前。& 分列或标记对齐，双反斜杠分行。||f(x)&=x^2 places the alignment marker before the equals sign. & marks alignment or separates columns; a double backslash ends a row.`,['align']);
 f('fill-head','tables','fill',b`续页表头||A continuation header`,b`只填命令名称：longtable 中，\____ 结束后续页面重复表头定义。||Enter the command name: \____ ends the repeated continuation-header definition in longtable.`,['endhead'],b`endhead 结束续页表头定义，endfirsthead 结束第一页专用表头定义。整个表格由 end{longtable} 关闭。||endhead ends the continuation-header definition and endfirsthead the first-page header. end{longtable} closes the complete table.`,['longtable']);
 f('fill-midrule','tables','fill',b`三线表中间线||The middle rule`,b`只填 booktabs 命令名称：toprule 和 bottomrule 之间的主要规则线是 \____。||Enter the booktabs command name: the main rule between toprule and bottomrule is \____.`,['midrule'],b`midrule 常用来分隔表头与数据；cmidrule 则用于指定列范围的局部规则线。||midrule commonly separates headings from data; cmidrule draws a partial rule over a specified column range.`,['booktabs']);
 f('fill-resource','bibliography','fill',b`注册文献资源||Register a resource`,b`只填命令名称：\____{refs.bib} 注册 biblatex 数据源。||Enter the command name: \____{refs.bib} registers a biblatex resource.`,['addbibresource'],b`addbibresource 通常放导言区，包含 .bib 扩展名。bibliography 是传统 BibTeX 工作流接口。||addbibresource normally goes in the preamble and includes .bib. bibliography is the traditional BibTeX interface.`,['biblatex']);
 f('fill-eqref','crossrefs','fill',b`公式引用括号||Equation-reference parentheses`,b`只填 amsmath 命令名称：\____{eq:mean} 为引用编号自动加括号。||Enter the amsmath command name: \____{eq:mean} automatically adds parentheses to the number.`,['eqref'],b`eqref 已包含公式引用括号，正文可直接使用；ref 只读取编号。||eqref includes equation-reference parentheses and can be used directly in the text; ref retrieves the number alone.`,['cross-references']);
 f('fill-argument','programming','fill',b`宏参数占位符||A macro placeholder`,b`只填两字符：\newcommand{\sq}[1]{____^2} 中如何引用第一个参数？||Enter two characters: how is the first argument referenced in \newcommand{\sq}[1]{____^2}?`,['#1'],b`定义体用 #1 引用第一个参数。这是供数学模式使用的简单宏，调用时参数不写 #。||#1 references the first argument in the definition. This simple macro is for math mode; calls do not prefix their argument with #.`,['programming-newcommand']);
 f('fill-path','tikz','fill',b`路径终止符||A path terminator`,b`只填一个字符：\draw (0,0) -- (1,1)_ 的 _ 应换为什么？||Enter one character: replace _ in \draw (0,0) -- (1,1)_ with its terminator.`,[';'],b`TikZ 路径以分号结束。遗漏时后续命令可能被吸收进同一路径。||TikZ paths end with semicolons. When omitted, later commands may be absorbed into the same path.`,['tikz-paths']);
 tf('newline','syntax',b`源文件换行||Source newlines`,b`判断：普通正文中，单次源文件回车通常相当于空格，空行通常结束段落。||True or false: a source newline normally behaves like a space in ordinary text, while a blank line ends a paragraph.`,true,b`普通空白通常折叠为空格；空行或 par 组织段落。verbatim 等特殊环境有不同规则。||Ordinary whitespace is normally collapsed to a space; blank lines or par establish paragraphs. Special contexts such as verbatim use different rules.`,['paragraphs']);
 tf('verb-title','characters',b`标题中的 verb||verb in a heading`,b`判断：标准 section 的标题参数可以随意包含 \verb|x_y|，无需特殊处理。||True or false: a standard section title can freely contain \verb|x_y| without special handling.`,false,b`verb 直接读取分隔符之间的字符，不能正常放进命令参数。标题可按用途使用 \texttt{x\_y}，并检查 PDF 书签文本。||verb reads characters directly between delimiters and does not work normally inside arguments. A heading can use \texttt{x\_y}, with PDF bookmark text checked separately.`,['verb','hyperref']);
 tf('nested-display','math-environments',b`嵌套独立显示||Nested displays`,b`判断：\[\begin{equation}x=1\end{equation}\] 是正确的嵌套。||True or false: \[\begin{equation}x=1\end{equation}\] is valid nesting.`,false,b`外层括号和 equation 都建立显示数学模式。选一个外层，再按需添加 aligned 或 split。||Both the outer delimiters and equation establish displays. Choose one outer display and use aligned or split inside if needed.`,['equation','aligned']);
 tf('matrix-delimiter','math-environments',b`矩阵外括号||Matrix delimiters`,b`判断：pmatrix 自动加圆括号，bmatrix 自动加方括号。||True or false: pmatrix adds parentheses and bmatrix adds square brackets.`,true,b`这两个属于 amsmath。matrix 不加外括号，vmatrix 和 Vmatrix 分别加单竖线和双竖线。||Both are from amsmath. matrix has no outer delimiters, while vmatrix and Vmatrix add single and double bars.`,['matrices']);
 tf('bold-greek','math-fonts',b`粗体希腊字母||Bold Greek letters`,b`判断：传统数学字体配置中，\mathbf{\alpha} 总能将 alpha 加粗。||True or false: in a traditional math-font setup, \mathbf{\alpha} always makes alpha bold.`,false,b`传统 mathbf 主要选择粗正体拉丁字母和数字。希腊字母通常用 amsmath 的 boldsymbol 或 bm 宏包的 bm；采用 Unicode 数学字体时，按相应字体接口设置。||Traditional mathbf primarily selects bold upright Latin letters and digits. Greek letters normally use amsmath's boldsymbol or bm's bm; Unicode math fonts use their corresponding font interface.`,['bold-math']);
 tf('tabular-break','tables',b`tabular 分页||tabular page breaks`,b`判断：tabular 行数够多时会自动跨页。||True or false: tabular automatically spans pages once enough rows are added.`,false,b`tabular 形成不可分页的表格盒子。需要跨页应选 longtable 等专门机制。||tabular forms an indivisible box. Use a mechanism such as longtable for multipage tables.`,['tabular','longtable']);
 tf('H-option','floats',b`大写 H||Uppercase H`,b`判断：普通 article 中使用 figure[H] 通常需要 float 宏包。||True or false: figure[H] in a normal article usually requires the float package.`,true,b`H 是 float 提供的特殊位置选项。固定当前位置可能留下空白或影响分页；小写 h 是标准允许位置，行为不同。||H is a special option from float. Fixing placement here can leave gaps or affect page breaks; lowercase h is a standard permitted placement with different behavior.`,['float-placement']);
 tf('mix-bib','bibliography',b`混用文献系统||Mixing bibliography systems`,b`判断：为了使用 citet 和 printbibliography，应同时加载 natbib 和 biblatex。||True or false: load both natbib and biblatex to use citet and printbibliography.`,false,b`常规工作流选择一套。biblatex 的 natbib=true 提供兼容命令，但不要求加载 natbib 宏包。||Choose one in a normal workflow. biblatex's natbib=true provides compatible commands without requiring the natbib package.`,['natbib','biblatex']);
 tf('label-number','crossrefs',b`标签名与编号||Label names and numbers`,b`判断：\label{fig:three} 强制图编号为 3。||True or false: \label{fig:three} forces the figure number to be 3.`,false,b`键是标识符，编号由对象计数器决定。图表增删后重新编译会更新引用。||The key is an identifier; the object's counter determines its number. Reruns update references after figures are inserted or removed.`,['cross-references']);
 tf('font-install','chinese',b`字体安装||Font installation`,b`判断：改用 XeLaTeX 后，任意电脑都保证拥有指定商业中文字体。||True or false: switching to XeLaTeX guarantees every computer has the named commercial Chinese font.`,false,b`字体格式支持与字体是否安装是独立条件。应使用编译环境可用且许可允许的字体，或设置替代方案。||Format support and font installation are separate conditions. Use available fonts permitted by their licenses or configure substitutes.`,['fontspec','chinese-typography']);
 tf('overfull','errors',b`排版诊断||A layout diagnostic`,b`判断：Overfull hbox 通常是排版诊断，不必然阻止生成 PDF。||True or false: Overfull hbox is normally a layout diagnostic and does not necessarily stop PDF creation.`,true,b`它表示水平盒子超过了可用宽度。查看 PDF 中相应位置，检查长公式、网址或不可断行文本。||It means a horizontal box exceeds its available width. Inspect the corresponding PDF position for long formulas, URLs, or unbreakable text.`,['error-overfull']);
 tf('mathjax','projects',b`渲染与编译||Rendering and compilation`,b`判断：MathJax 显示公式成功，就证明整个 tex 文档可以生成 LaTeX PDF。||True or false: successful MathJax rendering proves the whole tex document can generate a LaTeX PDF.`,false,b`MathJax 在网页中渲染数学表达式。完整 PDF 中的文档类、字体、浮动体和参考文献由适合项目的 TeX 引擎及相关工具处理。||MathJax renders mathematical expressions on a web page. A suitable TeX engine and related tools handle document classes, fonts, floats, and bibliographies for a full PDF.`,['mwe','project-latexmk']);
 c('debug-money','errors','debug',b`金额引起的报错||A price-related error`,b`普通正文中的代码开启未闭合数学模式。哪项修改打印原意的金额？||This text opens unclosed math mode. Which change prints the intended price?`,[
 o`$ 改为 \$||Replace $ with \$||它打印字面美元符号。||It prints the dollar sign literally.`,
 o`删掉 end{document}||Delete end{document}||这破坏文档结束。||This breaks the document ending.`,
 o`article 改成 book||Change article to book||两个类的美元符语法相同。||Both classes use the same dollar syntax.`,
 o`加载 natbib||Load natbib||引用宏包不改变数学分隔符。||A citation package does not change math delimiters.`],0,b`price $10 开启数学模式；普通正文应写 price \$10。先修复第一条语法错误，再检查后续消息。||price $10 opens math mode; ordinary text should use price \$10. Repair the first syntax error before interpreting later messages.`,['escapes','error-missing-math'],r`\documentclass{article}
\begin{document}
The price is $10.
\end{document}`);
 c('debug-align','errors','debug',b`未知 align 环境||Unknown align environment`,b`此示例提示 Environment align undefined。哪项直接补齐依赖？||This example reports Environment align undefined. Which change supplies its dependency?`,[
 o`导言区加载 amsmath||Load amsmath in the preamble||align 由 amsmath 提供。||amsmath supplies align.`,
 o`所有 & 改为 \&||Change every & to \&||这删除对齐点却没有定义环境。||This removes alignment markers without defining the environment.`,
 o`外层套 $$||Wrap it in $$||这造成重复显示数学模式。||This creates nested displays.`,
 o`删除 end{align}||Delete end{align}||环境会不匹配。||The environment becomes unbalanced.`],0,b`先核对环境名称和提供它的宏包。此处拼写正确，加载 amsmath 即补齐依赖；align 自己建立数学显示，应直接放在正文中。||Check the environment name and its providing package. The spelling is correct here, so amsmath supplies the dependency. align establishes its own mathematical display and belongs directly in the body.`,['align','error-environment'],r`\documentclass{article}
\begin{document}
\begin{align}y&=x+1\end{align}
\end{document}`);
 c('debug-columns','errors','debug',b`列数不一致||A column-count mismatch`,b`声明两列却写三项。若确实要三列，哪项修复正确？||Two columns are declared but three cells are written. If three columns are intended, which repair is correct?`,[
 o`{lr} 改为 {lrr}||Change {lr} to {lrr}||三个列说明对应三个单元格。||Three specifications match three cells.`,
 o`增加 hline||Add hline||横线不改变列数。||A rule does not change column count.`,
 o`增加 [H]||Add [H]||位置设置不改变列结构。||Placement does not change column structure.`,
 o`行末双反斜杠改为 par||Replace the row terminator with par||par 不修复列数且不适合作此行结束符。||par neither repairs columns nor acts as this row terminator.`],0,b`普通 n 列行使用 n−1 个 &。此处三个单元格对应 lrr；若实际只需要两列，应删掉或合并多出的单元格。||An ordinary n-column row uses n−1 ampersands. Here, lrr matches the three cells; remove or merge the extra cell if only two columns are intended.`,['tabular','error-alignment-tab'],r`\begin{tabular}{lr}
A & 0.5 & 0.1 \\
\end{tabular}`);
 c('debug-definition','programming','debug',b`重复定义宏||A duplicate definition`,b`第一行已经定义 R。明确要替换实现时，第二行应使用哪个命令？||The first line defines R. Which command should the second line use to intentionally replace it?`,[
 o`renewcommand||renewcommand||它替换已存在的定义。||It replaces an existing definition.`,
 o`providecommand||providecommand||它会保留已有定义。||It retains an existing definition.`,
 o`ref||ref||它读取标签。||It reads labels.`,
 o`usepackage||usepackage||它加载宏包。||It loads packages.`],0,b`newcommand 在名称已定义时报告错误。renewcommand 用于明确修改；先确认名字没有被其他宏包用于重要语义。||newcommand errors on an existing name. renewcommand intentionally changes it; check that other packages do not rely on that name's meaning.`,['programming-newcommand'],r`\newcommand{\R}{\mathbb{R}}
\newcommand{\R}{\mathbf{R}}`);
 c('debug-key','crossrefs','debug',b`引用键不匹配||Mismatched keys`,b`完成重复编译仍显示 ??，最直接的问题是什么？||The reference remains ?? after reruns. What is the immediate problem?`,[
 o`results 与 result 不一致||results and result differ||标签键按完整字符串匹配。||Keys match as complete strings.`,
 o`label 不能放 section 后||label cannot follow section||编号 section 后适合放标签。||A numbered section can be followed by its label.`,
 o`缺 figure 环境||A figure environment is missing||章节引用不需要图形环境。||A section reference requires no figure.`,
 o`标签必须纯数字||Labels must be numeric||字符串标签是正常做法。||String keys are normal practice.`],0,b`改用 \ref{sec:results}，使引用键与标签键一致，包括大小写和标点。修正源码后再重新编译。||Use \ref{sec:results} so the reference key matches the label, including case and punctuation. Rerun LaTeX after correcting the source.`,['cross-references','error-reference'],r`\section{Results}\label{sec:results}
See Section~\ref{sec:result}.`);
 c('debug-backend','bibliography','debug',b`后端不匹配||A backend mismatch`,b`配置为 backend=biber，脚本却运行 bibtex main。哪项修复正确？||The document selects backend=biber but the script runs bibtex main. Which repair matches the setup?`,[
 o`首次 LaTeX 后运行 biber main，再按需运行 LaTeX||Run biber main after the first LaTeX run, then rerun LaTeX||Biber 读取主文档的 bcf 数据。||Biber reads the main document's bcf data.`,
 o`仅运行 biber refs.bib||Run only biber refs.bib||常规流程使用主文档作业名，不把数据库当作主文档。||The normal workflow uses the main job name, not the database as its main document.`,
 o`删除 printbibliography||Delete printbibliography||这只隐藏文献表。||This only hides the bibliography.`,
 o`引用键全部改成 main||Change all citation keys to main||作业名与条目键不同。||A job name differs from an entry key.`],0,b`常见流程为 LaTeX → Biber → LaTeX → LaTeX，实际轮次按日志决定。Biber 参数通常是 main，不带 tex 扩展名。||A common sequence is LaTeX → Biber → LaTeX → LaTeX, with actual reruns determined by logs. The Biber argument is normally main without the tex extension.`,['biblatex','error-bibliography'],r`\usepackage[backend=biber]{biblatex}
\addbibresource{refs.bib}`);
 c('debug-font','errors','debug',b`字体引擎错误||A font-engine error`,b`此代码在 pdfLaTeX 中产生 fontspec 引擎错误。保留系统字体设置，怎样修复？||This raises a fontspec engine error under pdfLaTeX. How do you retain system-font selection and repair it?`,[
 o`换 XeLaTeX 或 LuaLaTeX，检查字体已安装||Use XeLaTeX or LuaLaTeX and check font installation||满足引擎和字体两项条件。||This addresses both engine and font requirements.`,
 o`运行 BibTeX 编译字体||Compile the font with BibTeX||BibTeX 处理文献。||BibTeX processes bibliographies.`,
 o`删除正文所有空格||Delete all body spaces||空白与这个引擎错误无关。||Whitespace does not cause this engine error.`,
 o`字体名加入 label||Put the font name in label||标签不会加载字体。||Labels do not load fonts.`],0,b`fontspec 要求 XeTeX 或 LuaTeX。换用相应引擎后，继续确认指定字体已安装在编译环境中。||fontspec requires XeTeX or LuaTeX. After switching engines, confirm that the selected font is installed in the build environment.`,['fontspec','error-engine'],r`\usepackage{fontspec}
\setmainfont{TeX Gyre Termes}`);
 c('debug-tikz','tikz','debug',b`TikZ 缺少终止符||A missing TikZ terminator`,b`在 node 前，第一条路径缺少什么？||What is missing from the first path before node?`,[
 o`第一行末分号||A semicolon at the first line's end||它结束 draw 路径。||It terminates the draw path.`,
 o`end{document}||end{document}||这会提前结束文档。||This prematurely ends the document.`,
 o`坐标两侧美元符||Dollar signs around coordinates||路径坐标不需要数学模式分隔符。||Path coordinates need no math delimiters.`,
 o`每个数字前 number||number before each numeral||普通坐标数字可直接写。||Ordinary coordinate numbers can be written directly.`],0,b`修复为 \draw (0,0) -- (1,1);。缺分号可能让后续命令吸收到路径内，应先修复结构。||Repair it to \draw (0,0) -- (1,1);. A missing semicolon can absorb later commands into the path, so fix the structure first.`,['tikz-paths'],r`\draw (0,0) -- (1,1)
\node at (1,1) {End};`);
 c('debug-delimiter','math-environments','debug',b`left 与 right||left and right`,b`保留圆括号，哪项修复 left/right 配对？||Which repair preserves parentheses and pairs left/right?`,[
 o`最后 ) 改成 \right)||Replace the last ) with \right)||同一数学组内完成配对。||This pairs the commands in the same math group.`,
 o`删除 \]||Delete \]||这破坏外层显示结束符。||This breaks the display ending.`,
 o`加 caption||Add caption||题注不修复数学括号。||A caption does not repair math delimiters.`,
 o`left 改成 label||Change left to label||label 不是定界符尺寸命令。||label is not a delimiter-sizing command.`],0,b`left 和 right 必须配对。右圆括号用 right)；不显示右侧定界符时用 right.。||left and right must pair. right) gives a visible closing parenthesis; right. makes that side invisible.`,['math-symbols'],r`\[\left(\frac{a}{b}+c)\]`);
 c('debug-frame','beamer','debug',b`frame 内的逐字代码||Verbatim code in a frame`,b`哪项修改针对这段 Beamer frame 的逐字内容处理？||Which change addresses verbatim processing in this Beamer frame?`,[
 o`\begin{frame}[fragile]{Code}||\begin{frame}[fragile]{Code}||fragile 支持逐字内容处理。||fragile supports verbatim content processing.`,
 o`加 \mathbb{frame}||Add \mathbb{frame}||数学字体不改变 frame 内容采集。||A math font does not change frame collection.`,
 o`verbatim 内转义下划线||Escape the underscore inside verbatim||它会改变显示的源码。||This changes the displayed source.`,
 o`改用 letter 但保留 frame||Use letter while keeping frame||letter 不提供 Beamer frame。||letter does not provide Beamer frames.`],0,b`fragile 使 frame 适配逐字内容，代码中的下划线保留原样。还需遵循 Beamer 的 fragile frame 结束规则。||fragile adapts the frame to verbatim; keep the code underscore unchanged. Also follow Beamer's fragile-frame closing rules.`,['beamer-fragile'],r`\begin{frame}{Code}
\begin{verbatim}
x_i = 1
\end{verbatim}
\end{frame}`);
 c('match-alphabet','math-fonts','match',b`匹配集合字母||Match a set alphabet`,b`哪条命令对应常用于实数集合的黑板粗体 R？||Which command corresponds to the blackboard-bold R often used for real numbers?`,[
 o`\mathbb{R}||\mathbb{R}||这是 AMS 黑板粗体。||This is AMS blackboard bold.`,
 o`\mathcal{R}||\mathcal{R}||这是书法体。||This is calligraphic.`,
 o`\mathrm{R}||\mathrm{R}||这是普通正体。||This is ordinary upright.`,
 o`\mathtt{R}||\mathtt{R}||这是等宽数学字母。||This is a monospaced math letter.`],0,b`这些命令选择不同的数学字母样式。论文中的记号说明给出每个字母的含义。||These commands select different mathematical alphabets. The paper's notation definitions give each letter its meaning.`,['mathbb','mathcal']);
 c('match-bracket','math-environments','match',b`匹配矩阵边界||Match matrix boundaries`,b`方括号包围的矩阵对应哪个 amsmath 环境？||Which amsmath environment matches a matrix enclosed in square brackets?`,[
 o`bmatrix||bmatrix||它自动加方括号。||It adds square brackets.`,
 o`pmatrix||pmatrix||它加圆括号。||It adds parentheses.`,
 o`vmatrix||vmatrix||它加单竖线。||It adds single bars.`,
 o`matrix||matrix||它不加外括号。||It has no outer delimiters.`],0,b`内部用 & 分列、双反斜杠分行。选择环境决定外括号，无需再给 bmatrix 手写同样的方括号。||Use & between columns and a double backslash between rows. The environment supplies its delimiters, so bmatrix needs no extra square brackets.`,['matrices']);
 c('match-subset','math-fonts','match',b`匹配集合包含||Match set inclusion`,b`“A 是 B 的子集，允许相等”对应什么？||Which matches “A is a subset of B, allowing equality”?`,[
 o`A\subseteq B||A\subseteq B||下方线表示允许相等。||The lower bar includes equality.`,
 o`A\in B||A\in B||in 是元素隶属。||in denotes membership.`,
 o`A\supseteq B||A\supseteq B||方向表示 A 包含 B。||This says A contains B.`,
 o`A\cup B||A\cup B||cup 是并集运算。||cup is union.`],0,b`subseteq 明确允许相等。严格包含可按所用字体选择 subsetneq；subset 的严格性约定并不处处一致。||subseteq explicitly permits equality. A suitable font setup can use subsetneq for strict inclusion; conventions for subset vary.`,['math-symbols']);
 c('match-implies','math-fonts','match',b`匹配逻辑箭头||Match a logical arrow`,b`“p 蕴含 q”对应哪条源码？||Which source matches “p implies q”?`,[
 o`p\Rightarrow q||p\Rightarrow q||右向双箭头常表示蕴含。||The right double arrow commonly denotes implication.`,
 o`p\Leftarrow q||p\Leftarrow q||方向反过来了。||This reverses the direction.`,
 o`p\Leftrightarrow q||p\Leftrightarrow q||它表示双向等价。||This denotes two-way equivalence.`,
 o`p\mapsto q||p\mapsto q||它常用于映射元素。||This commonly describes an element's image.`],0,b`逻辑蕴含可用 Rightarrow 或 implies；映射箭头和极限箭头应按上下文另选。||Logical implication can use Rightarrow or implies; choose mapping and limit arrows according to their context.`,['math-symbols']);
 c('match-eqref','crossrefs','match',b`匹配公式引用结果||Match equation-reference output`,b`公式编号是 7，哪个 amsmath 命令通常输出 (7)？||For equation number 7, which amsmath command normally outputs (7)?`,[
 o`\eqref{eq:a}||\eqref{eq:a}||它自动加引用括号。||It adds reference parentheses.`,
 o`\pageref{eq:a}||\pageref{eq:a}||它读取页码。||It reads the page number.`,
 o`\label{eq:a}||\label{eq:a}||它定义键而不输出引用。||It defines the key without printing a reference.`,
 o`\cite{eq:a}||\cite{eq:a}||它查找文献条目。||It looks up a bibliography entry.`],0,b`eqref 需要 amsmath。ref 与 pageref 属于基本引用机制，分别读取编号和页码。||eqref requires amsmath. Basic ref and pageref retrieve the object number and page number respectively.`,['cross-references']);
 c('match-partial-rule','tables','match',b`匹配局部规则线||Match a partial rule`,b`booktabs 表中，只画第 2 至第 4 列的中间线，命令是什么？||Which booktabs command draws a middle rule across columns 2 through 4 only?`,[
 o`\cmidrule{2-4}||\cmidrule{2-4}||范围参数指定这三列。||The range selects these three columns.`,
 o`\midrule{2-4}||\midrule{2-4}||midrule 不接受这种局部范围。||midrule does not take this partial range.`,
 o`\multicolumn{2-4}{c}{Rule}||\multicolumn{2-4}{c}{Rule}||它要求跨列数量，也不是画线命令。||It expects a span count and does not draw a rule.`,
 o`\cline{2}{4}||\cline{2}{4}||cline 应用 {2-4}，且不是本题要求的 booktabs 命令。||cline needs {2-4} and is not the requested booktabs command.`],0,b`cmidrule 可用裁切选项，如 \cmidrule(lr){2-4}，在两端留空隙。列号必须对应实际表结构。||cmidrule permits trimming options such as \cmidrule(lr){2-4} to leave end gaps. Column numbers must match the actual table.`,['booktabs']);
 c('match-nonbreak','characters','match',b`匹配不换行空格||Match a nonbreaking space`,b`哪段源码让 Figure 和引用编号保持同一行？||Which source keeps Figure and its reference number on the same line?`,[
 o`Figure~\ref{fig:a}||Figure~\ref{fig:a}||~ 是不换行空格。||~ is a nonbreaking space.`,
 o`Figure\\\ref{fig:a}||Figure\\\ref{fig:a}||双反斜杠要求换行。||The double backslash requests a line break.`,
 o`Figure\par\ref{fig:a}||Figure\par\ref{fig:a}||par 结束段落。||par ends the paragraph.`,
 o`Figure% \ref{fig:a}||Figure% \ref{fig:a}||% 注释后面的引用。||% comments out the reference.`],0,b`~ 也用于 Section~ref 等结构，保持文字与编号连在一起。打印字面波浪号用 textasciitilde。||~ also works in Section~ref-like constructions to keep the word and number together. Use textasciitilde to print a literal tilde.`,['escapes','cross-references']);
 c('match-expectation','math-fonts','match',b`匹配期望字母||Match an expectation letter`,b`已定义 E 为期望，哪项使用黑板粗体 E 并带括号？||With E defined as expectation, which uses a blackboard-bold E with parentheses?`,[
 o`\mathbb{E}(X)||\mathbb{E}(X)||字体和括号符合要求。||The alphabet and parentheses match.`,
 o`\mathcal{E}(X)||\mathcal{E}(X)||这是书法体 E。||This is a calligraphic E.`,
 o`\expectation(X)||\expectation(X)||此命令不是基本 LaTeX 或 AMS 保证提供的。||Core LaTeX and AMS do not guarantee this command.`,
 o`E_X||E_X||它是下标字母，结构与字体不同。||This is a subscripted letter with different structure and font.`],0,b`传统配置下，黑板粗体 E 需要 AMS 字体。文献也可能采用正体 E；字母样式与所定义的期望记号保持一致。||Blackboard-bold E requires AMS fonts in a traditional setup. Publications may also use upright E; keep the alphabet consistent with the defined expectation notation.`,['mathbb','text-operators']);
 c('formula-fraction','math-environments','formula',b`识别分式||Recognize a fraction`,b`哪段源码表示 a+b 整体除以 2？||Which source means the entire a+b divided by 2?`,[
 o`\frac{a+b}{2}||\frac{a+b}{2}||分子包括整个 a+b。||The numerator includes all of a+b.`,
 o`a+\frac{b}{2}||a+\frac{b}{2}||这里只有 b 除以 2。||Only b is divided by 2.`,
 o`\frac{a}{b+2}||\frac{a}{b+2}||分子分母均已改变。||Both numerator and denominator change.`,
 o`\frac{a+b}2x||\frac{a+b}2x||结果还额外乘了 x。||The result has an extra factor x.`],0,b`frac 读取分子和分母两个参数。显式花括号能清楚表达它们各自的范围。||frac reads numerator and denominator arguments. Explicit braces show their scopes clearly.`,['inline-display']);
 c('formula-root','math-environments','formula',b`识别立方根||Recognize a cube root`,b`哪段源码表示 x 的立方根？||Which source denotes the cube root of x?`,[
 o`\sqrt[3]{x}||\sqrt[3]{x}||根指数是可选参数。||The root index is optional.`,
 o`\sqrt{x^3}||\sqrt{x^3}||这是 x^3 的平方根。||This is the square root of x cubed.`,
 o`\sqrt{3x}||\sqrt{3x}||这是 3x 的平方根。||This is the square root of 3x.`,
 o`3\sqrt{x}||3\sqrt{x}||这是平方根乘 3。||This is three times a square root.`],0,b`sqrt[index]{radicand} 把根指数放方括号。省略时是平方根。||sqrt[index]{radicand} places the index in brackets; omitting it gives a square root.`,['inline-display']);
 c('formula-sum','math-fonts','formula',b`识别求和||Recognize a sum`,b`哪段表示 i 从 1 到 n 的 x_i 求和？||Which sums x_i from i=1 to n?`,[
 o`\sum_{i=1}^{n}x_i||\sum_{i=1}^{n}x_i||上下限正确分组。||The limits are correctly grouped.`,
 o`\prod_{i=1}^{n}x_i||\prod_{i=1}^{n}x_i||这是连乘。||This is a product.`,
 o`\sum_i=1^n x_i||\sum_i=1^n x_i||等号没有处于求和下限内。||The equals sign is outside the sum's lower limit.`,
 o`\int_1^n x_i||\int_1^n x_i||这是积分符号。||This uses an integral sign.`],0,b`多字符下限 i=1 需要分组。上下限位置会随行内与显示样式改变，但源码语义不变。||The multicharacter lower limit i=1 needs grouping. Limit placement changes with inline or display style without changing the source meaning.`,['math-symbols']);
 c('formula-partial','math-fonts','formula',b`识别偏导||Recognize a partial derivative`,b`哪段表示 f 对 x 的偏导？||Which expresses the partial derivative of f with respect to x?`,[
 o`\frac{\partial f}{\partial x}||\frac{\partial f}{\partial x}||分子分母均使用偏导符号。||Both numerator and denominator use the partial symbol.`,
 o`\frac{f}{x}||\frac{f}{x}||这只是比值。||This is a ratio.`,
 o`\frac{\nabla f}{x}||\frac{\nabla f}{x}||nabla 常表示梯度。||nabla commonly denotes a gradient.`,
 o`\partial\frac{x}{f}||\partial\frac{x}{f}||没有形成要求的偏导结构。||This does not form the requested derivative structure.`],0,b`partial 用于偏导记号，nabla 常用于梯度等向量微分运算。采用哪种写法取决于函数和模型中的运算定义。||partial is used in partial-derivative notation, while nabla commonly appears in vector differential operations such as gradients. The function and model determine which operation is intended.`,['math-symbols']);
 c('formula-integral','math-fonts','formula',b`识别积分||Recognize an integral`,b`哪段表示 0 到 1 上 f(x) 的积分，并在微分前留细空格？||Which integrates f(x) from 0 to 1 with a thin space before the differential?`,[
 o`\int_0^1 f(x)\,\mathrm{d}x||\int_0^1 f(x)\,\mathrm{d}x||限、函数和细空格正确。||The limits, integrand, and thin space are correct.`,
 o`\sum_0^1 f(x)\,\mathrm{d}x||\sum_0^1 f(x)\,\mathrm{d}x||sum 不是积分。||sum is not an integral.`,
 o`\int_1^0 f(x)\,\mathrm{d}x||\int_1^0 f(x)\,\mathrm{d}x||上下限相反。||The limits are reversed.`,
 o`\int_0^1 f(x)_dx||\int_0^1 f(x)_dx||下划线创建下标，不是细空格。||The underscore creates a subscript, not a thin space.`],0,b`\, 是细数学空格，mathrm{d} 采用正体微分约定。部分规范使用斜体 d；积分上下限确定积分的方向。||\, is a thin math space and mathrm{d} follows an upright differential convention. Some styles use italic d; the bounds specify the integration direction.`,['math-symbols']);
 c('formula-condition','math-fonts','formula',b`识别条件概率||Recognize conditional probability`,b`已定义 P 为概率，哪段表示给定 B 时 A 的概率？||With P defined as probability, which denotes the probability of A given B?`,[
 o`\mathbb{P}(A\mid B)||\mathbb{P}(A\mid B)||事件在前，条件在后。||The event precedes the condition.`,
 o`\mathbb{P}(A\cup B)||\mathbb{P}(A\cup B)||这表示并集概率。||This denotes union probability.`,
 o`\mathbb{P}(B\mid A)||\mathbb{P}(B\mid A)||事件与条件交换了。||The event and condition are exchanged.`,
 o`\mathbb{P}(A+B)||\mathbb{P}(A+B)||加号不表示条件分隔。||A plus sign does not mark conditioning.`],0,b`mid 提供关系间距，适合作条件分隔竖线。普通 | 是定界符，间距不同；选择应符合上下文。||mid provides relational spacing for a conditioning bar. A plain | is a delimiter with different spacing; choose according to context.`,['math-symbols','mathbb']);
 c('formula-hat','academic','formula',b`识别估计值||Recognize an estimate`,b`约定帽子表示估计值，哪段表示 beta 的估计值？||Under a hat-for-estimates convention, which denotes an estimated beta?`,[
 o`\hat{\beta}||\hat{\beta}||帽子作用在 beta 上。||The hat applies to beta.`,
 o`\bar{\beta}||\bar{\beta}||这是横线重音。||This is a bar accent.`,
 o`\beta_{\hat}||\beta_{\hat}||hat 缺参数且位于下标。||hat lacks its argument and is in a subscript.`,
 o`\widehat=beta||\widehat=beta||没有正确的命令参数或 beta 命令。||It lacks the proper argument and beta command.`],0,b`帽子常用来标记估计值，widehat 适合更宽的表达式。论文的记号说明给出估计值的具体含义。||A hat commonly marks an estimate, while widehat suits broader expressions. The paper's notation definitions specify what is being estimated.`,['math-symbols']);
 c('formula-norm','math-fonts','formula',b`识别二范数||Recognize a 2-norm`,b`哪个片段使用 amsmath 的双竖线定界符写 x 的二范数？||Which uses amsmath double-bar delimiters for the 2-norm of x?`,[
 o`\lVert x\rVert_2||\lVert x\rVert_2||左右定界符和下标完整。||Both delimiters and the subscript are present.`,
 o`\lvert x\rvert_2||\lvert x\rvert_2||这是单竖线。||These are single bars.`,
 o`\lVert_2 x||\lVert_2 x||缺右定界符且下标位置错误。||The right delimiter is missing and the subscript misplaced.`,
 o`\norm{x}_2||\norm{x}_2||norm 不是基本 LaTeX 或 amsmath 保证的命令。||Core LaTeX and amsmath do not guarantee norm.`],0,b`lVert 和 rVert 分别提供左、右定界符语义。内容较高时可配合 left/right 自动调整尺寸。||lVert and rVert provide left and right delimiter roles. Pair them with left/right for automatic sizing when contents require it.`,['math-symbols']);
 c('scenario-graphic','classes','scenario',b`独立图形 PDF||A standalone graphic PDF`,b`TikZ 图要导出紧贴内容边界的独立 PDF，哪个类直接适合？||Which class directly suits exporting a TikZ diagram as a tightly cropped PDF?`,[
 o`standalone||standalone||它支持独立裁切内容。||It supports independent cropped contents.`,
 o`letter||letter||它面向信件。||It targets correspondence.`,
 o`report||report||它默认使用普通长报告页面。||It normally uses report pages.`,
 o`ctexbook||ctexbook||书籍结构不是该单幅图所需。||Book structure is unnecessary for this one graphic.`],0,b`可写 \documentclass[tikz,border=3pt]{standalone}。border 为图形留边，TeX 编译生成的 PDF 可插入主论文。||Use \documentclass[tikz,border=3pt]{standalone}. border adds padding; the PDF produced by TeX can be included in the main paper.`,['standalone','tikz-paths']);
 c('scenario-pages','tables','scenario',b`三页数据表||A three-page data table`,b`单栏附录需要三页数据、重复表头和一致列宽，优先选什么？||A single-column appendix needs three pages of data, repeated headers, and consistent widths. What fits?`,[
 o`longtable||longtable||它提供这些跨页机制。||It provides these multipage mechanisms.`,
 o`table 内 tabular||tabular inside table||浮动体不能跨页。||A float cannot break across pages.`,
 o`figure 内矩阵||A matrix inside figure||它没有文字数据表的跨页表头机制。||It lacks multipage text-table headers.`,
 o`resizebox 内 tabular||tabular inside resizebox||缩放不会增加分页能力。||Scaling does not add page breaking.`],0,b`longtable 可区分首页、续页和末页内容。若主文档是标准双栏，应先选择合适的单栏区域或另一种兼容方案。||longtable can distinguish first, continuation, and final-page contents. A standard two-column document needs a suitable single-column area or another compatible mechanism.`,['longtable']);
 c('scenario-decimal','tables','scenario',b`回归表数值对齐||Regression-table numbers`,b`小数位长度不同，想自动沿小数点对齐，应选什么？||Values have varying decimal lengths. What can align them at the decimal marker automatically?`,[
 o`siunitx 的 S 列||siunitx S columns||S 解析并对齐数值。||S parses and aligns numbers.`,
 o`每个数字前加 ~||Prefix every number with ~||空格不解析小数结构。||A space does not parse decimal structure.`,
 o`所有列改 p{1cm}||Use p{1cm} for all columns||段落宽度不是小数点对齐。||Paragraph width is not decimal alignment.`,
 o`natbib||natbib||它管理引用。||It manages citations.`],0,b`S 列可用 table-format 预留预期数字结构。星号、括号等非数值材料按 siunitx 文档配置。||S columns can reserve the expected numeric shape with table-format. Configure nonnumeric material such as stars or parentheses according to siunitx documentation.`,['siunitx']);
 c('scenario-unicode-bib','bibliography','scenario',b`Unicode 文献||Unicode bibliographies`,b`新项目要 Unicode 数据与过滤文献表，没有期刊指定 bst 限制，哪组工具适合？||A new project needs Unicode data and filtered bibliographies, with no publisher-mandated bst. Which setup fits?`,[
 o`biblatex + Biber||biblatex + Biber||这一组合支持相应数据与文献表需求。||This pair supports those data and bibliography needs.`,
 o`natbib + printbibliography||natbib + printbibliography||这是混用了不同系统接口。||This mixes interfaces from different systems.`,
 o`只运行一次 pdfLaTeX||Only one pdfLaTeX run||正常数据库流程还要后端处理。||A normal database workflow also needs backend processing.`,
 o`geometry + graphicx||geometry + graphicx||页面与图片工具不处理文献数据。||Page and image tools do not process bibliography data.`],0,b`biblatex + Biber 满足题设。如果期刊要求特定 bst，则应遵循投稿流程，可能改用 BibTeX 与 natbib。||biblatex with Biber fits the stated needs. If a publisher requires a bst, follow its workflow, which may use BibTeX and natbib.`,['biblatex','natbib']);
 c('scenario-url','crossrefs','scenario',b`可点击的网址||Clickable URLs`,b`需要可点击网址及更多网址折行机会，哪组工具适合？||Which tools provide clickable URLs and more URL-breaking opportunities?`,[
 o`hyperref，按需加入 xurl||hyperref with xurl when needed||分别提供链接与扩展折行。||They provide links and expanded line breaks respectively.`,
 o`仅 textbf||Only textbf||粗体不建立 PDF 链接。||Boldface does not create links.`,
 o`仅 label||Only label||内部键不是外部网址链接。||An internal key is not an external URL link.`,
 o`网址放 mathbb||Put the URL in mathbb||数学字母字体不适合网址，也不建链接。||A math alphabet neither suits URLs nor creates links.`],0,b`url 命令处理网址内部特殊字符。超长片段仍须查看真实 PDF；加载顺序按相关宏包文档处理。||url handles special characters in addresses. Inspect actual PDF output for long segments and follow package documentation on loading order.`,['hyperref']);
 c('scenario-algorithm','algorithms','scenario',b`带行号伪代码||Numbered pseudocode`,b`algorithmicx 家族中，哪项提供 State、If 和逐行编号？||Within the algorithmicx family, which provides State, If, and numbering every line?`,[
 o`algpseudocode + algorithmic[1]||algpseudocode + algorithmic[1]||该布局提供命令，选项 1 给每行编号。||The layout supplies commands; option 1 numbers every line.`,
 o`仅 algorithm||Only algorithm||它是浮动体层，不自动提供这套伪代码语言。||It is a float layer, not this pseudocode language by itself.`,
 o`仅 graphicx||Only graphicx||它处理图形。||It handles images.`,
 o`itemize 内直接 State||State directly inside itemize||它需要配套算法宏包与环境。||It needs its matching package and environment.`],0,b`algorithm 浮动体与 algorithmic 内容是不同层次。algorithm2e 是另一套系统，命令不能不经转换直接混用。||The algorithm float and algorithmic contents are different layers. algorithm2e is another system whose commands are not interchangeable without conversion.`,['algorithm-pseudocode']);
 c('scenario-highlighting','code','scenario',b`TeX 内部代码高亮||Code highlighting within TeX`,b`希望不调用外部高亮程序，哪个是合适起点？||Which is a suitable starting point when no external highlighter should be invoked?`,[
 o`listings||listings||它在 TeX 端提供代码排版。||It provides code typesetting within TeX.`,
 o`minted 且假定无外部组件||minted while assuming no external components||其工作流涉及外部组件，需按版本配置。||Its workflow involves external components and version-dependent setup.`,
 o`natbib||natbib||这是引用工具。||This is a citation tool.`,
 o`longtable||longtable||这是跨页表格工具。||This is a multipage-table tool.`],0,b`listings 适合许多无需外部工具的展示，仍须测试语言、Unicode 与字体。minted 是另一条路线，须核对当前工具和权限要求。||listings suits many displays without external tools, but test language, Unicode, and fonts. minted is another route whose current tools and permissions must be checked.`,['code-listings','code-minted']);
 c('scenario-build','projects','scenario',b`自动构建轮次||Automatic build reruns`,b`多文件论文更新引用和文献，哪个工具能自动调度轮次？||Which tool can schedule reruns when a multi-file paper's references and citations change?`,[
 o`latexmk||latexmk||它读取依赖与日志安排构建。||It uses dependencies and logs to schedule builds.`,
 o`复制 PDF 文件名||Copy the PDF filename||文件名不执行构建。||A filename does not perform builds.`,
 o`手写章节编号||Hard-code section numbers||这绕过引用系统且会失效。||This bypasses references and becomes stale.`,
 o`用 newpage 替代 Biber||Replace Biber with newpage||分页命令不处理文献。||A page break does not process bibliography data.`],0,b`latexmk 调用已安装的引擎和后端。记录项目引擎设置，并确认文献和索引工具可用。||latexmk invokes the installed engines and backends. Record the engine setup and ensure the bibliography and index tools are available.`,['project-latexmk']);
 f('task-section','syntax','task',b`带标签章节||A labeled section`,b`只写紧邻的两条命令：创建标题 Results 的编号 section，随后定义 sec:results。不要外层文档。||Write only two adjacent commands: a numbered section titled Results, then label sec:results. No document wrapper.`,[r`\section{Results}\label{sec:results}`],b`标签记录 section 刚更新的计数器，因此应放在对应标题命令之后。||The label records the counter just stepped by section, so it follows the relevant heading command.`,['article','cross-references']);
 f('task-escape','characters','task',b`转义文本任务||An escaping task`,b`只提交普通正文片段，准确打印 R&D costs 10%。用反斜杠转义 & 与 %，保留词间空格。||Submit only the ordinary-text fragment printing R&D costs 10%. Escape & and % with backslashes, keeping word spaces.`,[r`R\&D costs 10\%`],b`普通正文使用 \& 打印与号，用 \% 打印百分号。||In ordinary text, \& prints an ampersand and \% prints a percent sign.`,['escapes','percent']);
 f('task-operator','math-fonts','task',b`定义 Var||Define Var`,b`已加载 amsmath。只用 DeclareMathOperator 定义无上下限型命令 Var，显示名称精确为 Var。||amsmath is loaded. Use only DeclareMathOperator to define the non-limit command Var, printed exactly as Var.`,[r`\DeclareMathOperator{\Var}{Var}`],b`DeclareMathOperator 把名称排为正体，并设置运算符间距。无星号版本使用普通的上下标位置，星号版本允许显示型上下限。||DeclareMathOperator supplies an upright name and operator spacing. The unstarred form uses ordinary script placement; the starred form permits display-style limits.`,['text-operators']);
 f('task-matrix','math-environments','task',b`二阶单位矩阵||A 2-by-2 identity matrix`,b`已有数学模式且加载 amsmath。只交 bmatrix 环境，两行顺序为 1 0 和 0 1。||Math mode is active and amsmath loaded. Submit only a bmatrix whose rows are 1 0 and 0 1.`,[r`\begin{bmatrix}1&0\\0&1\end{bmatrix}`],b`& 分列，双反斜杠分行；bmatrix 为整个矩阵添加方括号。||& separates columns and a double backslash separates rows; bmatrix supplies square brackets around the matrix.`,['matrices']);
 f('task-citation','bibliography','task',b`natbib 括号引用||A natbib parenthetical citation`,b`使用 natbib。只写一条无前后注的括号式引用，键精确为 smith2020。||Using natbib, write only a parenthetical citation without notes, with the exact key smith2020.`,[r`\citep{smith2020}`],b`citep 是 natbib 的括号式引用命令；biblatex 的对应接口是 parencite。||citep is natbib's parenthetical citation command; the corresponding biblatex interface is parencite.`,['natbib','citet-citep']);
 f('task-link','crossrefs','task',b`带文字链接||A link with display text`,b`已加载 hyperref。只交一条 href 命令，目标 https://example.org，显示文字 Example。||hyperref is loaded. Submit one href command targeting https://example.org with display text Example.`,[r`\href{https://example.org}{Example}`],b`href 的第一个参数是链接目标，第二个是显示文字。url 则直接显示网址。||href takes the target first and the display text second; url displays the address itself.`,['hyperref']);
 f('task-caption','floats','task',b`题注和标签||A caption and label`,b`已在 figure 内。只写紧邻两条命令：题注 Demand，随后标签 fig:demand。||Inside figure, write only two adjacent commands: caption Demand followed by label fig:demand.`,[r`\caption{Demand}\label{fig:demand}`],b`caption 更新图计数器，后面的 label 记录该编号，供正文引用。||caption steps the figure counter, and the following label records that number for references in the text.`,['caption','cross-references']);
 f('task-square','programming','task',b`一参数平方宏||A one-argument square macro`,b`只交 newcommand：新命令 sq 恰有一个必选参数，替换体精确为 {#1}^2。||Submit only newcommand: define sq with exactly one mandatory argument and the exact body {#1}^2.`,[r`\newcommand{\sq}[1]{{#1}^2}`],b`[1] 声明一个参数，#1 引用它，额外分组将完整参数作为底数。这个简单宏供数学模式使用。||[1] declares one argument, #1 references it, and the extra group keeps the entire argument as the base. This simple macro is for math mode.`,['programming-newcommand']);
 const closedSourceTasks=new Set(['task-section','task-operator','task-matrix','task-citation','task-link','task-caption','task-square']);
 for(const q of D.exercises) if(closedSourceTasks.has(q.id.replace(/^exercise-/,''))) q.ignoreWhitespace=true;
 /* A stable ordering keeps answers reproducible without making every correct option A. */
 for(const q of D.exercises) {
  if(!q.options||q.type==='boolean') continue;
  let seed=Array.from(q.id).reduce((n,char)=>Math.imul(n^char.charCodeAt(0),16777619)>>>0,2166136261);
  const order=q.options.map((_,i)=>i);
  for(let i=order.length-1;i>0;i--) {
   seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;
   const j=(seed>>>0)%(i+1);[order[i],order[j]]=[order[j],order[i]];
  }
  const originalAnswer=q.answer;
  q.options=order.map(i=>q.options[i]);
  q.wrong=order.map(i=>q.wrong[i]);
  q.answer=Array.isArray(originalAnswer)?originalAnswer.map(i=>order.indexOf(i)):order.indexOf(originalAnswer);
 }
})();
