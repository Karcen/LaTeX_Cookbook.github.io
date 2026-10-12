/* Guided foundation lessons extend the catalog without changing its compiled examples. */
(() => {
  const D = window.ATELIER;
  const b = s => { const [zh, en] = s.raw[0].split('||'); return {zh: zh.trim(), en: en.trim()}; };
  const r = s => s.raw[0];
  const step = (title, body, code) => ({title, body, ...(code ? {code} : {})});
  const check = (question, answer, reason) => ({question, answer, reason});
  const sources = {
    basics: {label: 'LaTeX author guide (historic) / LaTeX 作者指南', url: 'https://www.latex-project.org/help/documentation/usrguide-historic.pdf'},
    classes: {label: 'Standard document classes / 标准文档类手册', url: 'https://www.latex-project.org/help/documentation/classes.pdf'},
    ctex: {label: 'CTeX manual / CTeX 宏集手册', url: 'https://mirrors.ctan.org/language/chinese/ctex/ctex.pdf'},
    xecjk: {label: 'xeCJK manual / xeCJK 手册', url: 'https://mirrors.ctan.org/macros/xetex/latex/xecjk/xeCJK.pdf'},
    fontspec: {label: 'fontspec manual / fontspec 手册', url: 'https://mirrors.ctan.org/macros/unicodetex/latex/fontspec/fontspec.pdf'},
    latexmk: {label: 'latexmk manual / latexmk 手册', url: 'https://mirrors.ctan.org/support/latexmk/latexmk.pdf'},
    memoir: {label: 'memoir user manual / memoir 用户手册', url: 'https://mirrors.ctan.org/macros/latex/contrib/memoir/memman.pdf'},
    amsfonts: {label: 'AMSFonts / AMS 字体文档', url: 'https://ctan.org/pkg/amsfonts'},
    texlive: {label: 'TeX Live guide / TeX Live 指南', url: 'https://tug.org/texlive/doc/texlive-en/texlive-en.html'}
  };
  function teach(id, summary, bodies, goal, walkthrough, selfCheck, refs) {
    const e = D.entries.find(e => e.id === id);
    if (!e) throw new Error('Missing foundation entry: ' + id);
    if (bodies.length !== e.sections.length) throw new Error('Section mismatch: ' + id);
    e.summary = summary;
    e.sections.forEach((section, i) => { section.body = bodies[i]; });
    e.teaching = {goal, walkthrough, check: selfCheck};
    for (const key of refs) {
      const source = sources[key];
      if (!e.sources.some(item => item.url === source.url)) e.sources.push({...source});
    }
  }

  teach('engines',
    b`先看模板和字体要求，再选 pdfLaTeX、XeLaTeX 或 LuaLaTeX。||Choose pdfLaTeX, XeLaTeX, or LuaLaTeX from the template and font requirements.`,
    [
      b`传统字体宏包和许多期刊模板使用 pdfLaTeX。现代 LaTeX 默认读取 UTF-8 源码，但要排出某个字符，还得有对应的字形和命令支持。XeLaTeX、LuaLaTeX 能直接处理 Unicode，并通过 fontspec 选用 OpenType 字体。||Traditional font packages and many journal templates use pdfLaTeX. Modern LaTeX reads UTF-8 source by default, but printing a character also requires a suitable glyph and command support. XeLaTeX and LuaLaTeX handle Unicode natively and select OpenType fonts through fontspec.`,
      b`ctex 会按引擎选择中文处理方式：XeLaTeX 使用 xeCJK，LuaLaTeX 通常使用 LuaTeX-ja，pdfLaTeX 使用 CJK 字体机制。本站的 Unicode 中文示例采用 fontset=fandol，让字体随 TeX 发行版提供。pdfLaTeX 的中文字库要另行配置。||ctex selects Chinese support for the engine: xeCJK with XeLaTeX, normally LuaTeX-ja with LuaLaTeX, and CJK font mechanisms with pdfLaTeX. The Unicode Chinese examples here use fontset=fandol to obtain fonts from the TeX distribution. pdfLaTeX needs a different Chinese font setup.`,
      b`打开 .log，开头的 pdfTeX、XeTeX 或 LuaTeX 就是实际运行的引擎。fontspec 提示需要 XeTeX 或 LuaTeX 时，修改编辑器或构建命令。文献后端另外选择；首次生成 PDF 后，引用仍可能需要重编译，文献可能需要 BibTeX 或 Biber。||Open the .log file. Its opening pdfTeX, XeTeX, or LuaTeX banner identifies the engine actually used. When fontspec requests XeTeX or LuaTeX, change the editor setting or build command. Select the bibliography backend separately; references can need reruns and bibliographies can need BibTeX or Biber after the first PDF appears.`
    ],
    b`能从源码和日志判断该用哪个引擎，并完成一次匹配的编译。||Use the source and log to choose an engine and complete a matching build.`,
    [
      step(b`从导言区找要求||Read the preamble`, b`打开“中文字体”示例，看 documentclass 的 fontset=fandol 与 fontspec/CJK 字体接口。这里先选 XeLaTeX。保留这几行，编译后应看到完整中文，而不是缺字方框。||Open the Chinese-font example and inspect fontset=fandol and the fontspec/CJK font commands. Choose XeLaTeX for this run. Keep those lines; the PDF should contain complete Chinese text rather than missing-glyph boxes.`),
      step(b`改编译命令||Set the build command`, b`在主文件所在目录运行下面的命令，main.tex 换成实际文件名。-xelatex 选择引擎，-halt-on-error 让失败停在第一处。成功后打开 main.pdf，核对中英文是否都显示出来。||Run this command from the main-file directory, replacing main.tex with your filename. -xelatex chooses the engine and -halt-on-error stops at the first failure. Open main.pdf after success and check both scripts.`, r`latexmk -xelatex -interaction=nonstopmode -halt-on-error main.tex`),
      step(b`核对实际引擎||Confirm the actual engine`, b`打开 main.log，确认开头包含 XeTeX。若模板要求 pdfLaTeX，先恢复模板的字体宏包再切回 -pdf；若用 LuaLaTeX，则选 -lualatex，并使用它支持的中文方案。再次检查 PDF 的字形和引用。||Open main.log and confirm that its banner contains XeTeX. If the template requires pdfLaTeX, restore its font packages before switching to -pdf. For LuaLaTeX, use -lualatex and a compatible Chinese setup. Check the PDF's glyphs and references again.`)
    ],
    check(b`按钮写着 XeLaTeX，日志开头却是 pdfTeX，哪个能说明这次实际用了什么？||The button says XeLaTeX but the log starts with pdfTeX. Which identifies this run?`, b`日志：这次实际运行的是 pdfTeX，需要检查编辑器或 latexmk 的配置。||The log: this run used pdfTeX. Check the editor or latexmk configuration.`, b`日志由本次进程写出，按钮名称可能被项目构建规则覆盖。||The running process writes the log; project rules can override the button's setting.`), ['fontspec', 'ctex', 'latexmk']);

  teach('mwe',
    b`先编译一份完整的小文档，再逐项加入需要的内容。||Compile a complete small document, then add what you need one item at a time.`,
    [
      b`独立文档从 documentclass 开始，方括号放文档类选项。usepackage 加载宏包，应写在 begin{document} 之前的导言区。begin{document} 与 end{document} 之间是正文，end{document} 之后的内容不再处理。||An independent document starts with documentclass, with class options in square brackets. Put usepackage in the preamble before begin{document}. The document body sits between begin{document} and end{document}; processing stops at the latter.`,
      b`排错时复制一份文件，只保留能触发问题的正文、宏包和自定义命令。每删掉一部分就编译一次，确认错误还在。若删除某个宏包后错误消失，再逐项检查它的配置、加载顺序和与其他宏包的配合。||Make a copy for debugging and keep only the text, packages, and definitions needed to reproduce the problem. Compile after each reduction to confirm the failure remains. If removing a package clears the error, examine its settings, loading order, and interaction with other packages.`,
      b`先处理日志中的第一条错误，后面的消息可能只是它引起的连锁反应。目录和标签常要再编译一次。打开最终 PDF，检查引用是否还是问号、字符是否缺失、文字或公式是否越过页边界。||Fix the first error in the log; later messages may follow from it. Contents and labels often need another run. Open the final PDF and check for question-mark references, missing characters, and text or formulas extending into the margins.`
    ],
    b`建立一个可编译的小文件，并用它判断新加入的内容是否出错。||Build a small working file and use it to check each addition.`,
    [
      step(b`保存完整骨架||Save the full skeleton`, b`把下面的完整代码保存为 UTF-8 的 main.tex，用 pdfLaTeX 编译。三行边界都有作用：选择 article、开始正文、结束文档。PDF 应只有一句 Hello, LaTeX!。||Save this complete source as UTF-8 main.tex and compile with pdfLaTeX. The boundary lines select article, begin the body, and end the document. The PDF should contain one sentence, Hello, LaTeX!.`, r`\documentclass{article}
\begin{document}
Hello, LaTeX!
\end{document}`),
      step(b`一次增加一项||Add one thing at a time`, b`在 begin{document} 前插入 usepackage{amsmath}，再在正文句子后插入下面的显示公式。重编译，PDF 应在单独一行显示勾股等式。这样能把宏包位置与正文位置分清。||Insert usepackage{amsmath} before begin{document}, then insert this display after the sentence in the body. Recompile: the Pythagorean identity should appear on a line of its own. This separates package loading from document content.`, r`\[a^2+b^2=c^2\]`),
      step(b`保留能复现的内容||Keep the reproducible part`, b`把自己的出错片段替换进正文，先不加入整份论文。若失败，保留第一条错误和它指向的代码；若成功，再加下一项。每次打开新 PDF，确认新增文字或公式确实出现。||Replace the body with the failing fragment from your project before adding the whole paper. If it fails, keep the first error and the code it points to. If it works, add the next item. Open the new PDF each time to confirm that the added text or formula appears.`)
    ],
    check(b`只有一行 \section{Results} 能作为别人独立编译的最小工作示例吗？||Can the single line \section{Results} serve as an independently compilable MWE?`, b`不能。还要给出 documentclass、document 环境，以及该片段需要的宏包。||No. Include documentclass, the document environment, and any packages the fragment needs.`, b`片段没有说明文档类和配置，别人无法重现同样的编译上下文。||The fragment lacks the class and settings needed to reproduce its compilation context.`), ['basics']);

  teach('commands-groups',
    b`读懂命令的参数，并用花括号限制局部字体设置。||Read command arguments and use braces to keep font changes local.`,
    [
      b`textbf 这类命令以反斜杠加字母组成命令名；\% 这类控制符由反斜杠加一个非字母组成。花括号通常包住必选参数，如 \textbf{Important}。方括号是否能放可选参数，要看该命令的定义。||A command such as textbf has a backslash followed by letters. A control symbol such as \% has a backslash and one nonletter. Braces normally hold a required argument, as in \textbf{Important}. Whether square brackets accept an optional argument depends on that command.`,
      b`花括号形成一个组，字号、颜色等声明通常在右花括号处恢复。环境的 begin 与 end 要配对，很多环境也会建立组。textbf 只把参数设为粗体；bfseries 则持续影响当前组内后面的文字。||Braces form a group; font sizes, colors, and similar declarations normally end at its closing brace. Match each environment's begin with its end; many environments also create groups. textbf makes its argument bold, while bfseries affects later text within the current group.`,
      b`少写一个右花括号，后面的正文可能被读进同一个参数；环境名称不匹配也会引出多个错误。命令和必选参数之间的空行、以及参数里的段落，都要由接口支持。自己定义需要包含段落的命令时，应选择支持段落参数的 long 宏或现代定义接口。||A missing closing brace can pull later text into the argument. Mismatched environment names can also cause several errors. Blank lines before a required argument and paragraphs inside it need interface support. When defining a command that takes paragraphs, use a long macro or a modern interface that accepts paragraph arguments.`
    ],
    b`让字体变化只影响指定词语，避免后面的正文一起变样。||Apply a font change to the intended words without changing later prose.`,
    [
      step(b`比较两种粗体写法||Compare two bold forms`, b`在 article 示例的正文里插入下面两行，用 pdfLaTeX 编译。第一行的 Important 是粗体，第二行的 This whole group 是粗体。它们后面的 normal 都应恢复正常字重。||Insert these two lines into an article body and compile with pdfLaTeX. Important is bold in the first line and This whole group in the second. Both occurrences of normal should retain the ordinary weight.`, r`\textbf{Important} normal.

{\bfseries This whole group} normal.`),
      step(b`收紧声明的范围||Limit the declaration`, b`若自己的正文从某个词起一直加粗，找到 bfseries。把它和要加粗的文字一起包进花括号，或改成 textbf 的参数。重编译，PDF 中下一句话应恢复原来的字体。||If your prose stays bold after one word, find bfseries. Enclose it and the intended words in braces, or use a textbf argument. Recompile and confirm that the next sentence has its original font.`),
      step(b`检查参数和环境的结尾||Check closing boundaries`, b`再把 Important 换成两三个词，保持最后的右花括号。列表则核对 begin{enumerate} 与 end{enumerate} 完全相同。PDF 应只加粗参数里的词，列表后的文字也应回到正常正文。||Replace Important with a few words and keep the closing brace. For a list, match begin{enumerate} with end{enumerate} exactly. The PDF should make only the argument bold and return to normal prose after the list.`)
    ],
    check(b`{\small Local} Normal 中，Normal 会跟着缩小吗？||In {\small Local} Normal, will Normal also become small?`, b`不会。small 的作用在右花括号处结束。||No. The effect of small ends at the closing brace.`, b`组结束后恢复外层字号；去掉这对花括号才会让声明继续影响后文。||Closing the group restores the surrounding size; removing the braces lets the declaration continue.`), ['basics']);

  teach('paragraphs',
    b`源码换一行通常只是空格；空一行才会另起一段。||A source newline usually acts as a space; a blank line starts a new paragraph.`,
    [
      b`普通正文里，连续空格通常合成一个空格，单次源码回车也通常当作空格。一个或多个空行会结束段落。命令名之后用于分隔的空格会被吞掉；如需在 \LaTeX 后保留词间空格，可写 \LaTeX{} text 或显式空格。||In ordinary prose, consecutive spaces normally collapse to one and a source newline usually acts as a space. One or more blank lines end a paragraph. A space that terminates a command name is consumed; write \LaTeX{} text or an explicit space when a word needs separation after \LaTeX.`,
      b`未转义的百分号会隐藏本行剩余源码，也去掉行末带来的空格。宏定义常用它避免多余空白。正文误写百分号会使文字消失，甚至把右花括号一起隐藏；要打印百分比就写 \%。||An unescaped percent hides the rest of its source line and removes the newline's space. Macro definitions often use it to avoid stray whitespace. An accidental percent in prose can hide words or a closing brace; write \% to print a percentage.`,
      b`空行或 \par 结束段落，文档设置决定段首缩进和段间距。双反斜杠只强制换一行，仍在同一段落里。窄栏中反复强制断行容易把短行拉得很松，并产生 underfull 警告。||A blank line or \par ends a paragraph; document settings control its indentation and spacing. A double backslash forces a line break inside the same paragraph. Repeated forced breaks in a narrow column can stretch short lines and produce underfull warnings.`
    ],
    b`用源码空行组织段落，并能解释文字为什么会被百分号接到一起。||Organize paragraphs with blank lines and explain how percent signs join source lines.`,
    [
      step(b`先看一次回车||Try one newline`, b`把下面两行插进 article 正文，用 pdfLaTeX 编译。PDF 应把它们排成同一段，source 与 line 之间有普通空格。源码便于阅读的换行不会指定 PDF 的换行位置。||Insert these lines into an article body and compile with pdfLaTeX. They should form one paragraph with an ordinary space between source and line. A source newline for readability does not choose the PDF's line break.`, r`One source
line continues here.`),
      step(b`用空行分段||Separate paragraphs`, b`在 continues here. 后空一行，再写 A new paragraph.。重编译，PDF 应另起一段，并按文档的设置显示缩进或段间距。文章的内容分段应由这种结构表达。||Leave a blank line after continues here. and add A new paragraph. Recompile. The PDF should start a separate paragraph, using the document's indentation or spacing settings. Use this structure for paragraph divisions.`),
      step(b`观察注释连接||Observe comment joining`, b`在同一正文末尾加下面两行。百分号吞掉行末，所以 PDF 应显示 notebook，两个词之间没有空格。若需要 note book，把百分号去掉或在它前面保留一个空格。||Add these two lines at the end of the same body. Percent suppresses the newline, so the PDF should show notebook without a space. For note book, remove the percent or put a space before it.`, r`note%
book`)
    ],
    check(b`正文两句之间写 \\，会产生一个新段落吗？||Does \\ between two sentences create a new paragraph?`, b`不会。它只强制换行；新段落用空行或 \par。||No. It only forces a line break. Use a blank line or \par for a new paragraph.`, b`段落结束会触发段落缩进和段间距，普通换行没有这个作用。||Ending a paragraph applies paragraph indentation and spacing; an ordinary line break does not.`), ['basics']);

  teach('article',
    b`短论文、作业和技术说明可以从 article 开始。||Start with article for a short paper, assignment, or technical note.`,
    [
      b`article 适合按节组织的短文档。正文层级通常从 section 开始，上面还有 part，下面有 subsection、subsubsection、paragraph 和 subparagraph；它没有 chapter。默认单面、单栏，标题通常排在正文第一页。||article suits short documents organized into sections. The usual hierarchy begins with section, with part above it and subsection, subsubsection, paragraph, and subparagraph below. It has no chapter. Defaults are one-sided, one-column pages with the title on the first body page.`,
      b`标准字号选项是 10pt、11pt、12pt。常用选项还有 a4paper、letterpaper、twoside、twocolumn、titlepage 和 fleqn，选项值须由文档类支持。需要页边距设置时加载 geometry，需要较复杂公式时加载 amsmath，中文正文可以加载 ctex。||The standard size options are 10pt, 11pt, and 12pt. Other common options include a4paper, letterpaper, twoside, twocolumn, titlepage, and fleqn; the class must support the values you request. Load geometry for margins, amsmath for more math structures, and ctex for Chinese text.`,
      b`需要按章组织时，report 和 book 已经提供 chapter 的编号与分页规则。自己补一个名叫 chapter 的命令，不会同时得到这套结构。投稿文档从期刊指定的文档类和宏包开始，再检查其中提供的接口。||For chapters, report and book provide chapter numbering and page-opening rules. Adding a command named chapter alone does not supply that structure. Begin a submission with the publisher's required class and packages, then use their documented interfaces.`
    ],
    b`做出带标题、两节正文和一节小节的短文档。||Produce a short document with a title, two sections, and one subsection.`,
    [
      step(b`选文章类并写标题||Choose article and a title`, b`在“第一篇文档”中把第一行改为下方代码。把示例的 title、author 和 date 移到 begin{document} 之前，正文开头保留 maketitle。用 pdfLaTeX 编译，PDF 应在正文第一页显示标题。||Replace the first line of the first-document example with this class declaration. Move the example's title, author, and date before begin{document} and keep maketitle at the start of the body. Compile with pdfLaTeX; the title should share the first body page.`, r`\documentclass[11pt,a4paper,oneside]{article}`),
      step(b`插入节和小节||Add sections and a subsection`, b`把 maketitle 后的原有正文替换为下面的结构，各段写在相应标题之后。重编译，PDF 应出现 1、1.1、2 这三个编号。编号由 section 和 subsection 的计数器生成。||Replace the existing body after maketitle with this structure, putting prose below each heading. Recompile: the headings should have numbers 1, 1.1, and 2, generated by the section and subsection counters.`, r`\section{Introduction}
A short introduction.
\subsection{Question}
The question being studied.
\section{Results}
The main result.`),
      step(b`生成目录||Build the contents`, b`在 maketitle 后、第一节前加入 tableofcontents，然后用 pdfLaTeX 编译两次。PDF 的目录应列出这些标题和页码。若第一遍目录空白，第二遍会读取上一遍写出的目录数据。||Add tableofcontents after maketitle and before the first section, then run pdfLaTeX twice. The contents should list the headings and page numbers. If it is blank on the first run, the second reads the contents data written by the first.`)
    ],
    check(b`article 中需要“第 1 章”，直接写 \chapter{Methods} 会怎样？||What happens if you write \chapter{Methods} for a first chapter in article?`, b`标准 article 会报未定义命令。需要章结构时改用 report、book 或指定模板。||Standard article reports an undefined command. Use report, book, or the required template for chapters.`, b`article 的正文层级从 section 开始，chapter 由另外的文档类提供。||article's main hierarchy starts with section; other classes provide chapter.`), ['classes']);

  teach('report',
    b`长报告需要 chapter 时，用 report 按章组织正文。||Use report when a longer report needs chapters.`,
    [
      b`report 适合按章组织的研究报告和中等长度学位文档，支持 part、chapter、section 及以下层级。chapter 默认另起一页，标题默认独占一页。相比 book，它的默认设置更接近单面报告。||report suits chapter-based research reports and medium-length theses. It supports part, chapter, section, and lower levels. Chapters begin on a new page and the title normally has its own page. Its defaults are suited to a one-sided report.`,
      b`字号和纸张选项与其他标准类相同。report 默认 oneside、openany，章可以从任意一页开始。twoside 会影响内外边距和页眉设置。appendix 之后的 chapter 用字母编号；目录需要重编译后更新。||Size and paper options follow the other standard classes. report defaults to oneside and openany, allowing chapters to start on either page. twoside affects inner and outer page behavior. Chapters after appendix use letters, and contents update on subsequent runs.`,
      b`report 的前置部分可用 pagenumbering 明确设置页码；它没有 book 的完整 frontmatter、mainmatter、backmatter 接口。学位文档还需按学校模板设置格式。中文章式报告可以选 ctexrep。||Use pagenumbering to set front-matter page numbers explicitly in report. It lacks book's full frontmatter, mainmatter, and backmatter interface. Follow the institution's template for thesis formatting. ctexrep is a Chinese counterpart for chapter-based reports.`
    ],
    b`写出两章报告，再添加一个字母编号的附录。||Write a two-chapter report and add a lettered appendix.`,
    [
      step(b`从报告示例开始||Start with the report example`, b`打开本条目的完整 report 示例，用 pdfLaTeX 编译。第一行保留 report，查看标题页与第一章是否分开。PDF 中每章应从新页开始，这是文档类的默认规则。||Open this entry's complete report example and compile with pdfLaTeX. Keep report on the first line. Check that the title and first chapter occupy different pages and each chapter starts on a new page.`),
      step(b`给章加一节||Add a section to a chapter`, b`把第一章中原有的 section{Sample} 与其后正文替换为下方片段。重编译，PDF 应显示第 1 章下的 1.1 Data。这里用 section 表示章内层级。||Replace the first chapter's existing section{Sample} and its following prose with the fragment below. Recompile: the PDF should show 1.1 Data within Chapter 1. section expresses a level inside the chapter.`, r`\section{Data}
Describe the data used in this report.`),
      step(b`切换到附录||Start the appendix`, b`把示例末尾已有的 appendix 和附录章替换为下方片段，位置仍在 end{document} 前，编译两次。PDF 的新章应使用 A，目录也应出现该附录。appendix 从这个位置改变后续章编号。||Replace the example's existing appendix command and chapter with this fragment before end{document}, then compile twice. The new chapter should use A and appear in the contents. appendix changes chapter numbering from that point onward.`, r`\appendix
\chapter{Additional checks}
Supplementary details.`)
    ],
    check(b`report 的第 2 章之后写 \appendix 再写 \chapter{Data}，新章编号是 3 还是 A？||After Chapter 2 in report, write \appendix and then \chapter{Data}. Is the new number 3 or A?`, b`A。附录模式把章计数重设，并改用字母。||A. Appendix mode resets the chapter counter and uses letters.`, b`appendix 改变之后的 chapter，不需要手写“附录 A”来代替编号。||appendix changes subsequent chapters, so the number need not be typed into the heading.`), ['classes']);

  teach('book',
    b`用 book 分开前言、正文和后置内容，并理解章起始的空白页。||Use book to separate matter divisions and understand blank chapter-opening pages.`,
    [
      b`book 面向书籍、长手册和章式论文。默认 twoside、openright，新章从右页开始，所以有时会插入空白页。它提供带章节信息的页眉，以及前置、正文、后置部分的组织命令。||book suits books, long manuals, and chapter-based documents. Its default twoside and openright settings start chapters on right-hand pages and can insert blank pages. It provides running chapter headings and commands for front, main, and back matter.`,
      b`frontmatter 使用罗马页码，章不编号；mainmatter 从阿拉伯页码 1 开始，恢复章编号。backmatter 继续正文页码，同时取消章编号。appendix 改用字母章号，通常写在 backmatter 之前，这样附录仍有编号。||frontmatter uses Roman page numbers and unnumbered chapters. mainmatter restarts pages at Arabic 1 and enables numbered chapters. backmatter continues page numbers while suppressing chapter numbers. Put appendix before backmatter when lettered appendix chapters are needed.`,
      b`屏幕阅读稿可用 oneside、openany，减少双面和章起始限制。双面版本出现空白页时，先看是否为 openright 的正常结果。book 默认没有 article 的 abstract 环境，前言可以用 chapter。章首页的 plain 页式与其他页的页眉应分别检查。||For a screen-reading copy, oneside and openany reduce facing-page constraints. In a two-sided version, check whether a blank page comes from openright. book has no article-style abstract environment by default; use a chapter for a preface. Inspect plain chapter-opening pages separately from running headers.`
    ],
    b`在一份书稿里得到罗马页码前言、编号正文和字母编号附录。||Create a book with Roman-numbered front matter, numbered chapters, and a lettered appendix.`,
    [
      step(b`检查前置部分||Inspect front matter`, b`打开完整 book 示例，用 pdfLaTeX 编译。找到 frontmatter 后的前言和目录：PDF 中前言应没有章号，前置页码使用罗马数字。这些命令写在正文中，不放进导言区。||Open the complete book example and compile with pdfLaTeX. Locate the preface and contents after frontmatter: the preface should have no chapter number and the front-matter pages should use Roman numerals. Matter commands belong in the body.`),
      step(b`把正文放在 mainmatter 后||Place chapters after mainmatter`, b`在 mainmatter 后增加 chapter{Second chapter} 和正文。重编译，PDF 应出现一个有编号的新章，正文页码为阿拉伯数字。mainmatter 同时恢复章编号并重设页码。||Add chapter{Second chapter} and prose after mainmatter. Recompile: the new chapter should be numbered and the main text should use Arabic page numbers. mainmatter enables chapter numbers and resets page numbering.`, r`\chapter{Second chapter}
The next part of the book.`),
      step(b`核对附录和后置内容||Check appendix and back matter`, b`把附录标题 Proofs 改为 Supplement，后记标题 Afterword 改为 Closing notes，保留 appendix 在 backmatter 之前的顺序。编译两次后，PDF 应显示附录 A，后记无章号。屏幕稿可把第一行选项改成 oneside,openany，再比较分页。||Change the appendix heading Proofs to Supplement and Afterword to Closing notes, keeping appendix before backmatter. After two runs, expect Appendix A and an unnumbered concluding chapter. For a screen copy, change the first-line options to oneside,openany and compare page breaks.`)
    ],
    check(b`\backmatter 后再写 \appendix 和 \chapter，能得到编号 A 吗？||Will \appendix followed by \chapter after \backmatter produce a numbered Appendix A?`, b`标准 book 中不会按有编号正文章排出。要字母编号的附录，应放在 backmatter 之前。||Standard book keeps chapters unnumbered there. Put a lettered appendix before backmatter.`, b`backmatter 已关闭正文的章编号状态，appendix 改章号格式并不恢复该状态。||backmatter disables main-matter chapter numbering; appendix changes the number format without enabling that state.`), ['classes']);

  teach('ctexart',
    b`中文短文档用 ctexart，字体、标点和标题设置可以从默认值开始。||Start a short Chinese document with ctexart's font, punctuation, and heading defaults.`,
    [
      b`ctexart 在 article 的结构上加入中文字体、标点、标题名称和中文字号设置。它适合中文短论文、作业和说明，层级从 section 开始，没有 chapter。第一行用 documentclass 加载 ctexart；ctex.sty 则是供其他类加载的宏包。||ctexart adds Chinese fonts, punctuation, heading names, and sizes to article's structure. It suits short Chinese papers, assignments, and notes, with section-level organization and no chapter. Load ctexart with documentclass; ctex.sty is a package for other classes.`,
      b`zihao=-4 选择小四号。XeLaTeX 或 LuaLaTeX 下的 fontset=fandol 使用 TeX 发行版字体，便于在不同系统编译。ctexset 设置标题外观，oneside、twoside 和纸张选项仍按文章的布局使用。||zihao=-4 selects xiaosi size. With XeLaTeX or LuaLaTeX, fontset=fandol uses distribution fonts for builds across operating systems. ctexset sets heading appearance, while oneside, twoside, and paper options follow article-style layout.`,
      b`ctexart 已经配置中文字体后端，不必再加载 xeCJK。中文字体用 CJK 接口，西文字体用 fontspec 接口。字号、页眉和目录按学校要求设置；需要章结构时选择 ctexrep 或 ctexbook。||ctexart configures the Chinese font backend, so a separate xeCJK load is unnecessary. Use CJK interfaces for Chinese fonts and fontspec interfaces for Latin fonts. Set sizes, headers, and contents to institutional requirements; choose ctexrep or ctexbook for chapters.`,
      b`section 计数器和显示格式决定章节编号，tocdepth 决定目录列到哪一层。ctexset 改标题外观时，目录的样式仍要单独检查。至少试一次短标题、长标题和无编号标题，看看正文与目录是否都符合要求。||The section counter and its format determine heading numbers; tocdepth determines contents depth. After changing headings with ctexset, check contents formatting separately. Test a short, long, and unnumbered heading in both the body and contents.`,
      b`源文件保存为 UTF-8，再运行 xelatex。目录和标签通常需要再运行一次。字体报错时先检查 Fandol 是否完整安装；设置自己的字体前，先用本条目的 Fandol 示例确认引擎能够正常编译。||Save the source as UTF-8 and run xelatex. Contents and labels usually need a second run. For font errors, check that Fandol is installed. Confirm that this entry's Fandol example compiles before configuring custom fonts.`
    ],
    b`编译一份中文文章，调整一处标题样式并检查目录。||Compile a Chinese article, change one heading style, and check its contents.`,
    [
      step(b`先编译默认中文文章||Compile the default Chinese article`, b`打开 ctexart 的完整示例，保存为 UTF-8，确认第一行有 fontset=fandol。用 XeLaTeX 编译，PDF 应能读到中文标题、正文和标点。先保留字体配置，后面只改标题样式。||Open the full ctexart example, save it as UTF-8, and confirm that the first line includes fontset=fandol. Compile with XeLaTeX. The PDF should show readable Chinese headings, prose, and punctuation. Keep the font setup while changing the heading style.`),
      step(b`改一处标题格式||Change one heading format`, b`把导言区已有 ctexset 的 section 格式改为下方行，同时保留 subsection 的设置。LARGE 比示例里的 Large 再大一级。重编译，PDF 的节标题应改变，正文字号应保持原样。||Change the section format in the existing preamble ctexset to the setting below, retaining the subsection setting. LARGE is one step larger than the example's Large. Recompile: the section headings should change while the body size stays the same.`, r`\ctexset{section={format=\LARGE\bfseries}}`),
      step(b`核对目录层级||Check contents levels`, b`在正文第一节前加入 tableofcontents，再给一节添加 subsection。用 XeLaTeX 编译两次，检查 PDF 的目录是否包含小节、长标题是否换行合理。tocdepth 控制目录层级，和标题字号是两项设置。||Add tableofcontents before the first section and add a subsection to one section. Run XeLaTeX twice. Check that the contents includes the subsection and wraps long headings sensibly. tocdepth controls contents levels independently of heading sizes.`)
    ],
    check(b`\documentclass{ctexart} 后还要再 \usepackage{xeCJK} 才能排中文吗？||Must you add \usepackage{xeCJK} after \documentclass{ctexart} to print Chinese?`, b`不需要。ctexart 会按引擎配置中文后端；本练习用 XeLaTeX。||No. ctexart configures the Chinese backend for the engine; this exercise uses XeLaTeX.`, b`重复加载同一后端增加配置冲突的机会，直接使用 ctexart 的字体接口即可。||An extra backend load can conflict with existing options; use ctexart's font interfaces directly.`), ['ctex']);

  teach('ctex',
    b`已有模板必须保留文档类时，用 ctex 宏包加入中文支持。||Use the ctex package to add Chinese support while keeping a required class.`,
    [
      b`ctex.sty 为现有文档类加入中文字体、标点、字号和中文名称。ctexart 等类则同时选择文章、报告或书籍结构及中文默认设置。期刊类和 Beamer 已经确定时，可在导言区加载 ctex 宏包。||ctex.sty adds Chinese fonts, punctuation, sizes, and localized names to an existing class. Classes such as ctexart choose the document structure and Chinese defaults together. When a publisher class or Beamer is already required, load the ctex package in the preamble.`,
      b`ctex 宏包的 heading 选项开启标题设置，CTeX 文档类已经开启这项功能。ctexset 的 name、number、format、beforeskip、afterskip 等键分别设置名称、编号、字体和标题前后间距。scheme=plain 减少中文格式改动，输出仍要结合所用文档类检查。||The package's heading option enables heading configuration; CTeX classes already enable it. ctexset keys such as name, number, format, beforeskip, and afterskip set names, numbers, fonts, and surrounding space. scheme=plain reduces Chinese formatting changes; check the result with your chosen class.`,
      b`中文后端由引擎选择。本站可移植示例用 XeLaTeX 和 fontset=fandol。自己选系统字体时，记录它的名称和来源；字体数据库不可用时，可用 texgyretermes-regular.otf 这样的发行版字体文件名设置西文字体。ctex 已经配置中文后端，通常不用再加载 xeCJK。||The engine determines the Chinese backend. Portable examples here use XeLaTeX and fontset=fandol. Record the names and sources of custom system fonts. If the font database is unavailable, distribution filenames such as texgyretermes-regular.otf can locate Latin fonts. ctex sets up the Chinese backend, so a separate xeCJK load is usually unnecessary.`
    ],
    b`保留 article 类，加入中文正文，并开启一处中文标题设置。||Keep article, add Chinese prose, and configure one heading.`,
    [
      step(b`保留原来的文档类||Keep the existing class`, b`从最小 article 文档开始，第一行仍用 documentclass{article}。在 begin{document} 前加入下方宏包行，选 XeLaTeX。正文写“中文测试。”，PDF 应显示完整句子；这个步骤只增加中文支持。||Start from a minimal article document and keep documentclass{article} on the first line. Insert this package line before begin{document} and choose XeLaTeX. Add 中文测试。 to the body. The PDF should display the full sentence; this step adds Chinese support.`, r`\usepackage[UTF8,fontset=fandol]{ctex}`),
      step(b`按需开启标题接口||Enable heading configuration`, b`若要用 ctexset 设置节标题，把上一行选项改为 UTF8,fontset=fandol,heading。紧接着加下方代码，并在正文加 section{研究方法}。PDF 中该标题应采用较大粗体，中文正文仍正常排出。||To configure section headings with ctexset, add heading to the package options: UTF8,fontset=fandol,heading. Insert this setting after the package and add section{研究方法} in the body. The PDF should show the heading in larger bold type and preserve the Chinese prose.`, r`\ctexset{section={format=\Large\bfseries}}`),
      step(b`确认模板和中文配置一起工作||Check the combined setup`, b`把这两处导言区设置加入实际模板，先编译一页。检查 PDF 的中文、节编号和模板原有页眉。如果需要尽量保留模板格式，在 ctex 选项中加入 scheme=plain，再比较输出。||Move these preamble settings into the actual template and compile one page first. Check Chinese text, section numbers, and the template's header. Add scheme=plain to the ctex options when retaining the template's formatting is important, then compare the output.`)
    ],
    check(b`模板第一行必须是 \documentclass{article}，中文支持应该加哪一行？||The template must keep \documentclass{article}. Which line adds Chinese support?`, b`在导言区加 \usepackage[fontset=fandol]{ctex}，并用 XeLaTeX 编译。||Add \usepackage[fontset=fandol]{ctex} in the preamble and compile with XeLaTeX.`, b`ctex 是宏包，可加载到已有类上；ctexart 是另一个文档类。||ctex is a package for an existing class; ctexart is a different class.`), ['ctex']);

  teach('xeCJK',
    b`XeLaTeX 下用 xeCJK 设置中文字形、中西文间距和标点。||Use xeCJK under XeLaTeX for Chinese fonts, mixed-script spacing, and punctuation.`,
    [
      b`xeCJK 只运行在 XeLaTeX 下，管理 CJK 字体、字符间距和标点。它不提供 ctex 完整的中文标题和字号设置；需要中文文章的整套默认配置时，可直接选择 ctexart。LuaLaTeX 的中文处理要用它支持的后端。||xeCJK runs under XeLaTeX and handles CJK fonts, character spacing, and punctuation. It does not provide ctex's complete heading and Chinese-size setup. Choose ctexart when those defaults are needed. LuaLaTeX uses a different Chinese backend.`,
      b`setCJKmainfont、setCJKsansfont、setCJKmonofont 分别选择中文的主字体、无衬线和等宽字体。setmainfont 等 fontspec 命令选择西文字体。选好后排一行中英文，比较字面大小、笔画粗细和基线，看它们是否协调。||setCJKmainfont, setCJKsansfont, and setCJKmonofont select the Chinese main, sans-serif, and monospaced families. fontspec commands such as setmainfont select Latin families. Print mixed prose and compare visual size, weight, and baseline appearance.`,
      b`字体名称须与编译环境里的字体一致，文件名和字体内部家族名可能不同。先用 Fandol 建立可编译的配置，再替换成本地字体。文字乱码时检查文件编码；日志报 Missing character 时检查字体是否包含那个字。||Font names must match the build environment; filenames and internal family names can differ. Begin with a working Fandol setup, then substitute local fonts. Check source encoding for garbled text and glyph coverage when the log reports Missing character.`
    ],
    b`分别选择中文和西文字体，并确认一次中英文混排输出。||Choose Chinese and Latin fonts separately and check a mixed-script sentence.`,
    [
      step(b`用 XeLaTeX 配置中文||Configure Chinese with XeLaTeX`, b`从最小 article 文档开始，在 begin{document} 前插入下面两行。选择 XeLaTeX，正文写“中文与 LaTeX 混排。”。FandolSong-Regular 是发行版字体文件，PDF 应能显示中文。||Start with a minimal article document and insert these lines before begin{document}. Choose XeLaTeX and add 中文与 LaTeX 混排。 to the body. FandolSong-Regular is a distribution font file; the Chinese text should appear in the PDF.`, r`\usepackage{xeCJK}
\setCJKmainfont{FandolSong-Regular.otf}`),
      step(b`单独设置西文||Set the Latin family separately`, b`在 CJK 字体行后加入下面的西文字体设置。保持中文字库不变，再编译同一句混排文字。PDF 中 Latin 字母的字形会变化，中文字形仍来自 Fandol；这样能看出两套接口各自负责什么。||Add this Latin font setting after the CJK font line, keep the Chinese font, and recompile the same sentence. Latin letters should change while the Chinese glyphs still come from Fandol. The two interfaces control separate scripts.`, r`\setmainfont{texgyretermes-regular.otf}`),
      step(b`用一段文字检查间距||Check spacing in prose`, b`在正文多写一句“使用 XeLaTeX 排版中文，公式为 $x+1$。”。检查 PDF 的逗号、中文与 Latin 字母之间的距离，再查看日志是否有缺字。先观察 xeCJK 的自动处理，再针对具体问题调整。||Add 使用 XeLaTeX 排版中文，公式为 $x+1$。 to the body. Inspect the comma and Chinese/Latin boundaries in the PDF, then check the log for missing characters. Observe xeCJK's automatic spacing before adjusting a specific problem.`)
    ],
    check(b`已加载 xeCJK，想换中文主字体，应改 setmainfont 还是 setCJKmainfont？||With xeCJK loaded, should you change setmainfont or setCJKmainfont to replace the Chinese main font?`, b`改 setCJKmainfont；setmainfont 管理西文主字体。||Change setCJKmainfont; setmainfont controls the Latin main family.`, b`中西文字体分别配置，换西文族不会自动替换中文族。||The families are configured separately; changing the Latin family does not replace the Chinese family.`), ['xecjk', 'fontspec']);

  teach('fontspec',
    b`用 XeLaTeX 或 LuaLaTeX 选择文本字体及其 OpenType 特性。||Use XeLaTeX or LuaLaTeX to select text fonts and OpenType features.`,
    [
      b`fontspec 用于 XeLaTeX 和 LuaLaTeX。setmainfont、setsansfont、setmonofont 分别选择正文、无衬线和等宽文本字体。中文断行要由中文排版方案处理，数学字体也有自己的设置。||fontspec works with XeLaTeX and LuaLaTeX. setmainfont, setsansfont, and setmonofont select the main, sans-serif, and monospaced text families. Chinese line breaking needs a Chinese typesetting setup, and math fonts have separate settings.`,
      b`Numbers 和 Ligatures 等选项控制字体支持的 OpenType 特性。项目内字体可用 Path、Extension、BoldFont 和 ItalicFont 指定路径和字形文件。交给另一台电脑时，要同时提供可用字体资源；分发字体文件需符合它的许可证。||Options such as Numbers and Ligatures request features supported by the font. For project-local fonts, Path, Extension, BoldFont, and ItalicFont specify locations and face files. Another computer needs the font resources too; redistribute them according to their licenses.`,
      b`用 pdfLaTeX 编译含 fontspec 的源码会报引擎要求错误。可以改用 XeLaTeX/LuaLaTeX，或改成 pdfLaTeX 支持的传统字体宏包。中文字体通过 ctex/xeCJK 的 CJK 接口设置，OpenType 数学字体通过 unicode-math 设置。||pdfLaTeX reports an engine requirement error when loading fontspec. Switch to XeLaTeX or LuaLaTeX, or use a traditional font package supported by pdfLaTeX. Configure Chinese families through ctex/xeCJK CJK interfaces and OpenType math fonts through unicode-math.`
    ],
    b`给正文设置一套字体，并检查常规、粗体和斜体是否正确配对。||Set a body font and check its regular, bold, and italic faces.`,
    [
      step(b`先切换引擎||Choose a supported engine`, b`打开本条目的中文字体示例，选 XeLaTeX 或 LuaLaTeX。ctexart 已提供所需字体接口；普通 article 则在导言区加载 fontspec。先编译一次，PDF 应显示中文与 Latin，日志不应报引擎要求错误。||Open this entry's Chinese-font example and select XeLaTeX or LuaLaTeX. ctexart supplies the required font interface; a plain article should load fontspec in the preamble. Compile once and check Chinese and Latin text without an engine requirement error.`),
      step(b`明确写出字体文件||Specify the font files`, b`在导言区用下面的设置替换原来的 setmainfont。它明确指定发行版提供的常规、粗体和斜体文件。正文加入下一步的样本，PDF 应使用 TeX Gyre Termes 文本字体。||Replace the existing preamble setmainfont with this setting. It specifies distribution files for regular, bold, and italic faces. Add the next step's sample; the PDF should use TeX Gyre Termes text.`, r`\setmainfont{texgyretermes-regular.otf}[
  BoldFont=texgyretermes-bold.otf,
  ItalicFont=texgyretermes-italic.otf
]`),
      step(b`并排检查三个字形||Compare three faces`, b`在 begin{document} 后插入下面一行并编译。PDF 中三个 Sample 应依次为常规、粗体、斜体。若某个字形缺失，检查对应文件名和安装；正文换字体后也要查看公式是否仍与文本协调。||Insert this line after begin{document} and compile. The three instances of Sample should be regular, bold, and italic. If one is missing, check its filename and installation. Also inspect how the math matches the changed body font.`, r`Sample \textbf{Sample} \textit{Sample}. Math: $x+1$.`)
    ],
    check(b`setmainfont 已经生效，为什么中文字体和公式字体没有一起变？||Why can Chinese and math fonts stay unchanged after setmainfont takes effect?`, b`setmainfont 选择文本主字体；中文族和数学族分别通过 CJK 与数学字体接口设置。||setmainfont selects the main text family; Chinese and math families have their own interfaces.`, b`fontspec 的文本字体设置不等于完整的中文断行或数学字体配置。||A fontspec text setting does not supply a complete Chinese line-breaking or math-font configuration.`), ['fontspec']);

  teach('chinese-typography',
    b`排一段中英混排，再检查标点、标题、目录和公式的配合。||Print mixed prose, then check punctuation, headings, contents, and mathematics together.`,
    [
      b`中文段落用中文全角标点，英文片段按英文标点规则书写。ctex 的后端会处理部分标点挤压和中西文间距。先在 PDF 里看默认效果，遇到具体问题再调整，避免在每个中英文交界处手工塞空格。||Use full-width Chinese punctuation in Chinese prose and English conventions in English passages. ctex backends handle some punctuation compression and Chinese/Latin spacing. Inspect the default PDF first and adjust a specific problem before adding spaces at every script boundary.`,
      b`ctexset 设置标题的字号、名称、编号和前后间距。标题本身和目录条目分别排版：tocdepth 控制目录层级，secnumdepth 控制编号层级。长文档还要查看章首页的页式，确认页眉与文档类规则一致。||ctexset sets heading size, names, numbers, and spacing. Headings and contents entries are typeset separately: tocdepth controls contents levels and secnumdepth controls numbered levels. In a long document, inspect chapter-opening page styles and their headers.`,
      b`中文学位文档常包含中英文摘要、目录、正文、参考文献和附录，具体顺序按学校规定。字号和缩进也应以学校规范为准，小四号、两字符缩进并非通用要求。正文和公式字体要放在一起检查，中文文献样式另由文献系统设置。||Chinese theses commonly include Chinese and English abstracts, contents, main text, bibliography, and appendices, ordered by institutional rules. Follow those rules for sizes and indentation too; xiaosi size and two-character indents are not universal requirements. Inspect prose and math together, and configure bibliography style through the bibliography system.`
    ],
    b`根据实际 PDF 调整中文排版，并区分目录深度与编号深度。||Adjust Chinese layout from the PDF and distinguish contents depth from numbering depth.`,
    [
      step(b`排一段有代表性的文字||Print representative prose`, b`打开 ctexart 示例，用 XeLaTeX 编译。把正文的一句替换为“使用 LaTeX 排版时，变量 $x_i$ 表示第 $i$ 个观测值。”。PDF 应包含全角逗号、混排文字和下标；比较它们的大小与间距。||Open the ctexart example and compile with XeLaTeX. Replace one sentence with 使用 LaTeX 排版时，变量 $x_i$ 表示第 $i$ 个观测值。 The PDF should contain the full-width comma, mixed text, and subscripts. Compare their size and spacing.`),
      step(b`分开控制目录和编号||Set contents and numbering separately`, b`在导言区加入下面两行，在 begin{document} 后加 tableofcontents，并保留 section 和 subsection。编译两次，PDF 的小节应出现在目录里，但正文小节标题不带编号。两个计数器负责不同任务。||Add these lines in the preamble and tableofcontents after begin{document}, keeping section and subsection in the body. Compile twice. The subsection should appear in the contents but have no number in the body. The two counters control different tasks.`, r`\setcounter{tocdepth}{2}
\setcounter{secnumdepth}{1}`),
      step(b`检查长标题和页眉||Check long headings and headers`, b`把一个 section 的参数换成较长的真实标题。检查 PDF 的标题换行、目录页码和页眉是否被挤出。需要调整时，先改对应的标题或目录接口；学位稿的字号、缩进则照学校要求核对。||Replace one section argument with a longer real heading. Check heading wraps, contents page numbers, and headers in the PDF. Adjust the relevant heading or contents interface when needed, and check thesis sizes and indents against institutional rules.`)
    ],
    check(b`tocdepth=2、secnumdepth=1 时，article/ctexart 的 subsection 会在目录里吗，会编号吗？||With tocdepth=2 and secnumdepth=1 in article/ctexart, does a subsection appear in the contents, and is it numbered?`, b`出现在目录里，但不编号。||It appears in the contents but is unnumbered.`, b`subsection 是第 2 层；目录允许第 2 层，编号只允许到第 1 层。||subsection is level 2; contents includes level 2 while numbering stops at level 1.`), ['ctex', 'classes']);

  teach('escapes',
    b`想打印特殊字符时，先分清它是正文、公式还是代码。||Before printing a special character, decide whether it belongs to prose, math, or code.`,
    [
      b`LaTeX 的十个特殊字符各有语法用途：% 开始注释，$ 进入或退出数学模式，& 分隔对齐列，# 引用宏参数，_ 和 ^ 写数学下标、上标。花括号组成分组或参数，反斜杠开始命令，~ 是活动字符，通常产生不换行空格。||LaTeX's ten special characters have syntactic roles: % starts a comment, $ enters or leaves math mode, & separates alignment cells, # refers to macro arguments, and _ and ^ create math scripts. Braces form groups or arguments, backslash starts commands, and the active character ~ normally creates a nonbreaking space.`,
      b`普通正文打印 %、$、&、#、_ 和花括号时，使用对应的反斜杠转义。可见的反斜杠、波浪号和脱字符用 textbackslash、textasciitilde、textasciicircum。公式中的相似关系则写 \sim，它按数学符号排版。||Escape %, $, &, #, _, and braces with their backslash commands in ordinary prose. Use textbackslash, textasciitilde, and textasciicircum for visible backslashes, tildes, and carets. For a mathematical similarity relation, use \sim with math-symbol spacing.`,
      b`路径、网址和源码可用 url、verb 或 verbatim 输出，减少逐字转义。它们的使用位置仍有区别：标题、命令参数和 PDF 书签各有约束，verb 通常不能直接放进去。先确定内容放在哪里，再选输出接口。||Paths, URLs, and source code can use url, verb, or verbatim to reduce manual escaping. Their placement matters: headings, command arguments, and PDF bookmarks have their own constraints, and verb normally cannot be placed directly in them. Choose the interface for the context.`
    ],
    b`在 PDF 中准确打印百分数、金额、文件名和可见反斜杠。||Print a percentage, price, filename, and visible backslash correctly.`,
    [
      step(b`写一行字面文本||Print literal prose`, b`在 article 正文插入下方片段，用 pdfLaTeX 编译。PDF 应显示 10% 的增长、$20 的金额、R&D 和 data_2026.csv；这些字符在这里都作为文字打印。||Insert this fragment in an article body and compile with pdfLaTeX. The PDF should show 10%, $20, R&D, and data_2026.csv as literal text.`, r`Growth: 10\%. Price: \$20. R\&D.
File: \texttt{data\_2026.csv}.`),
      step(b`给反斜杠选正确命令||Print a visible backslash`, b`在同一段后插入下方代码。PDF 应显示一个反斜杠，以及波浪号和脱字符。双反斜杠是换行命令，不能拿它代替可见反斜杠。||Insert this code after the paragraph. The PDF should show a backslash, tilde, and caret. A double backslash is a line-break command; it does not print a visible backslash.`, r`\textbackslash{} \textasciitilde{} \textasciicircum{}`),
      step(b`把变量留在数学模式||Keep variables in math`, b`在正文加“Variable: $x_i$. Identifier: \texttt{x\_i}.”。重编译，PDF 中变量的 i 应排在下方，程序标识符的下划线则留在同一行。相同输入字符在两个场景中表达不同内容。||Add Variable: $x_i$. Identifier: \texttt{x\_i}. to the body. Recompile: i should be a subscript in the variable, while the identifier should keep a literal underscore on the baseline. The two contexts express different content.`)
    ],
    check(b`想打印正文金额 $10，应写 $10 还是 \$10？||To print the price $10 in prose, write $10 or \$10?`, b`写 \$10。||Write \$10.`, b`未转义的美元符号是数学分隔符，转义形式才打印字面符号。||An unescaped dollar is a math delimiter; the escaped form prints the literal symbol.`), ['basics']);

  teach('percent',
    b`百分号之后的文字消失时，检查它是否被当成注释。||If words disappear after a percent sign, check whether they became a comment.`,
    [
      b`TeX 遇到未转义的 % 会忽略本行余下字符和行末。写 5% growth 只会排出 5，growth 被注释掉。若本行的右花括号也在百分号后，它同样会被隐藏，导致参数无法结束。||An unescaped % tells TeX to ignore the rest of the line and its ending. Writing 5% growth prints only 5 because growth becomes a comment. A closing brace later on the same line is hidden too and can leave an argument unfinished.`,
      b`正文百分数写成 \%。行末 % 在宏定义或连续盒子之间能去掉源码换行带来的空格；abc% 下一行 def 会排成 abcdef。正文注释可以独占一行，便于看出哪些文字会被忽略。||Write \% for a percentage in prose. In macro definitions or adjacent boxes, a line-ending % removes the space from a source newline: abc% followed by def on the next line prints abcdef. A separate comment line makes ignored prose easier to see.`,
      b`verb 和 verbatim 中的百分号会按字面打印。编辑器的注释颜色有助于发现误写，最后仍要编译查看。排查文字消失时，检查前面的百分号，也检查字体是否缺字。||Percent signs print literally inside verb and verbatim. An editor's comment highlighting helps catch accidental comments; compile to see their effect. For missing text, inspect preceding percent signs and font glyph coverage.`
    ],
    b`修复被注释吞掉的文字，并预测行末百分号的连接效果。||Restore commented-out prose and predict how a line-ending percent joins text.`,
    [
      step(b`观察消失的词||Observe the missing words`, b`在 article 正文写下方一行，用 pdfLaTeX 编译。PDF 中应只出现 Growth: 5，后面的词消失。这里不是字体问题，是百分号开始了注释。||Write this line in an article body and compile with pdfLaTeX. Only Growth: 5 should appear; the remaining words disappear because percent starts a comment.`, r`Growth: 5% this year.`),
      step(b`转义百分号||Escape the percent`, b`只把上一行的 % 改成 \%，其他文字不动。重编译，PDF 应显示完整的 Growth: 5% this year.。一次只改这个字符，便于确认原因。||Change only % in that line to \%. Recompile: the PDF should display the full sentence Growth: 5% this year. Changing one character makes the cause easy to confirm.`, r`Growth: 5\% this year.`),
      step(b`检查源码行的连接||Check source-line joining`, b`在正文另加下方两行。PDF 应显示 international。若要两个词，在 inter 后、百分号前加一个空格；注释会保留它前面的空格，而吞掉行末。||Add these two lines elsewhere in the body. The PDF should display international. To separate the words, put a space after inter and before the percent; the comment preserves that earlier space while suppressing the newline.`, r`inter%
national`)
    ],
    check(b`\textbf{5% growth} 中，右花括号能正常结束 textbf 的参数吗？||In \textbf{5% growth}, can the closing brace end the textbf argument normally?`, b`不能。百分号隐藏了本行的右花括号，应改写为 \textbf{5\% growth}。||No. Percent hides the closing brace on that line. Write \textbf{5\% growth}.`, b`注释会影响源码结构，因此一个正文百分号也可能造成参数未闭合。||Comments affect source structure, so a percent in prose can leave an argument open.`), ['basics']);

  teach('verb',
    b`用 verb 打印单行代码，分隔符选成内容里不会出现的字符。||Use verb for single-line code and choose a delimiter absent from its content.`,
    [
      b`verb 后的分隔符标记原样内容的开始，同一个字符再次出现时结束。常选 | 或 +，分隔符不能再出现在内容里，内容也不能跨源码行。verb 的星号形式会把空格标出来，便于演示输入。||The delimiter after verb starts literal content; its next occurrence ends it. Common choices are | and +. Keep the delimiter out of the content and keep the span on one source line. The starred form marks spaces visibly for demonstrations.`,
      b`verb 适合命令名称、短路径和单行源码，里面的字符不用逐个转义。长路径不会自动获得方便的换行。需要可点击、可断行链接时用 url/xurl；多行源码用 verbatim 或代码宏包。||Use verb for command names, short paths, and single-line source without escaping each character. It does not provide convenient breaks in a long path. Use url/xurl for clickable, breakable links and verbatim or a code package for multiline source.`,
      b`普通命令参数和标题里，字符通常已经被提前读取，verb 因而无法正常工作。Beamer 的 frame 里放原样代码需用 fragile。可以把代码移到普通正文，或采用宏包明确支持的原样内容接口。||In ordinary command arguments and headings, characters have normally been read before verb can process them. Use fragile for literal code in a Beamer frame. Put the code in ordinary body text or use a verbatim interface explicitly supported by a package.`
    ],
    b`安全打印带下划线和百分号的代码，并避开标题参数的限制。||Print code containing underscores and percent signs and handle heading restrictions.`,
    [
      step(b`打印单行标识符||Print a one-line identifier`, b`在 article 的普通正文中插入下面一行，用 pdfLaTeX 编译。PDF 应原样显示 data_2026.csv 和 10% complete，下划线与百分号都不再执行语法作用。||Insert this line in ordinary article body text and compile with pdfLaTeX. The PDF should literally show data_2026.csv and 10% complete; their underscore and percent signs have no syntactic effect.`, r`\verb|data_2026.csv| and \verb|10% complete|`),
      step(b`内容含竖线时换分隔符||Change the delimiter for a pipe`, b`想输出 a|b 时，用 + 作为分隔符，写下方代码。PDF 应显示中间的竖线。如果仍用 |，内容会在 a 后提前结束。||To print a|b, use + as the delimiter in this code. The PDF should show the pipe. With | as the delimiter, the content would end after a.`, r`\verb+a|b+`),
      step(b`标题改用文本接口||Use a text interface in headings`, b`若 section 参数里有 verb，把它替换为下方写法。texttt 可以进入普通标题参数，转义下划线后再编译。PDF 标题应显示等宽的 data_2026.csv；加载 hyperref 时另查书签文本。||If a section argument contains verb, replace it with this form. texttt works in an ordinary heading argument; escape the underscore and compile. The PDF heading should show monospaced data_2026.csv. Check bookmarks separately if hyperref is loaded.`, r`\section{The file \texttt{data\_2026.csv}}`)
    ],
    check(b`要原样打印 x|y，\verb|x|y| 与 \verb+x|y+ 哪个正确？||Which prints x|y literally: \verb|x|y| or \verb+x|y+?`, b`\verb+x|y+。||\verb+x|y+.`, b`分隔符必须不在内容里出现；+ 包住整个 x|y，内部的 | 就能保留下来。||The delimiter must be absent from the content; + encloses the full x|y and leaves the internal pipe literal.`), ['basics']);

  teach('linebreaks',
    b`行内换行、段落结束和表格换行，要按所在环境选择。||Choose line, paragraph, and table-row endings for their context.`,
    [
      b`双反斜杠和 newline 强制结束当前文本行，但内容仍属于同一段。空行或 par 结束段落，并采用文档的段首缩进和段间距。地址、短诗可按行组织，普通论述通常按段组织。||A double backslash or newline ends the current text line within the same paragraph. A blank line or par ends the paragraph and applies its indentation and spacing. Addresses and short poems can use line-based structure; prose normally uses paragraphs.`,
      b`在 tabular、align 和矩阵环境中，双反斜杠结束一行单元格或一行公式。某些环境支持附加垂直间距，具体作用由环境定义。复制代码时，先看它结束的是文本行还是表格、公式行。||In tabular, align, and matrix environments, a double backslash ends a row of cells or equations. Some environments support extra vertical spacing, with behavior defined by that environment. When copying code, identify whether it ends a text line or a structured row.`,
      b`还没有文本行可结束时写双反斜杠，会出现 There is no line here to end。此时用段落或垂直间距接口表达需要的结构。若强制断行让短词之间出现大片空白和 underfull 警告，恢复自动断行后再检查 PDF。||A double backslash before a text line exists can cause There is no line here to end. Use a paragraph or vertical-spacing interface for the intended structure. If forced breaks create widely stretched short lines and underfull warnings, restore automatic line breaking and inspect the PDF.`
    ],
    b`能选择合适的换行方式，并修复没有行可结束的报错。||Choose an appropriate break and repair a no-line-to-end error.`,
    [
      step(b`写两行地址||Write a two-line address`, b`把下方片段放进 article 正文，用 pdfLaTeX 编译。PDF 中两句应各占一行，仍在同一个段落里；双反斜杠适合这里明确的行结构。||Place this fragment in an article body and compile with pdfLaTeX. The two lines should appear on separate lines within one paragraph; the explicit address structure suits a double backslash.`, r`Department of Economics\\
Example University`),
      step(b`普通正文用段落||Use paragraphs for prose`, b`在地址之后空一行再写正文，不要以双反斜杠开头。PDF 应另起一段，并恢复正文的缩进规则。空行表达内容分段，不能把地址的行结束写法一路复制到文章里。||Leave a blank line after the address, then write prose without a leading double backslash. The PDF should start a new paragraph with the normal indentation rules. A blank line expresses a paragraph division; address-style breaks do not define prose paragraphs.`),
      step(b`修复空位置的换行||Repair a break with no line`, b`如果在 section 后、正文前单独写了双反斜杠并报错，删除那一行再编译。标题已经安排了后面的空间，PDF 应正常显示标题与第一段；确有额外间距要求时再通过标题设置调整。||If a standalone double backslash after section and before the prose causes an error, remove that line and recompile. The heading already supplies surrounding space; the PDF should show the heading and first paragraph. Adjust heading settings when extra space is actually required.`)
    ],
    check(b`section 后尚未写正文，单独的 \\ 报 There is no line here to end，应先改哪里？||A standalone \\ after section, before any prose, reports There is no line here to end. What should change first?`, b`删掉这处双反斜杠，直接写正文。||Remove that double backslash and write the prose directly.`, b`当前位置没有正在排的文本行，无法执行行结束；标题已处理前后间距。||There is no active text line to end, and the heading already handles surrounding space.`), ['basics']);

  teach('project-multifile',
    b`让主文件管配置，章节文件只写内容，并固定编译目录。||Keep configuration in the main file, content in chapter files, and a consistent build directory.`,
    [
      b`input 在当前位置读取另一个文件，不自动换页。include 会在前后清页，并生成独立 aux 文件，适合正文里的整章，通常不嵌套。documentclass、导言区和 document 环境留在主文件，章节文件只放正文内容。||input reads another file at its current position without forcing a page break. include clears pages around the included content and creates a separate aux, making it useful for complete body chapters; includes normally do not nest. Keep documentclass, the preamble, and document in the main file and prose in chapter files.`,
      b`相对路径通常从编译的工作目录开始查找，不会自动跟着每个章节文件切换。固定从主文件目录编译，或用构建工具的 -cd 选项。编辑器的 root 设置可让你在章节文件里启动主文件编译，但它属于编辑器配置，不是 TeX 命令。||Relative paths normally start from the compilation working directory; they do not automatically move with each chapter file. Build from the main-file directory or use the build tool's -cd option. An editor's root setting can launch the main build from a chapter, but it is editor configuration, not a TeX command.`,
      b`交付项目时，把 tex、sty、cls、bib 和图片一起打包，并写明数据、图形的生成步骤。本条目示例还需要 methods.tex，单独下载主 tex 不会带走它。压缩包应保留项目的相对目录结构。||Deliver tex, sty, cls, bib, and graphics together and describe how data and figures are generated. This entry's example also needs methods.tex; downloading only the main tex does not include it. Preserve the relative directory structure in the archive.`
    ],
    b`把一节正文拆到 methods.tex，并让主文件仍能完整编译。||Move one section into methods.tex and keep the main document compilable.`,
    [
      step(b`给章节建一个文件||Create a chapter-content file`, b`在 main.tex 同一目录新建 methods.tex，保存下面的正文片段，不加 documentclass 或 document 环境。它只是被主文件读入的内容，不单独编译。最终 PDF 应含 Methods 标题和这段正文。||Create methods.tex next to main.tex and save this fragment without documentclass or a document environment. The main file reads this content; it is not an independent document. The final PDF should contain the Methods heading and paragraph.`, r`\section{Methods}
We describe the method here.`),
      step(b`在主文件读取它||Read it from the main file`, b`把主文件原来的 Methods 节替换成下方 input 行，位置放在 begin{document} 与 end{document} 之间。用 pdfLaTeX 编译 main.tex，PDF 的这一节应与拆分前相同，不会因 input 自动另起一页。||Replace the original Methods section in main.tex with this input line between begin{document} and end{document}. Compile main.tex with pdfLaTeX. The section should look the same and input should not force a new page.`, r`\input{methods}`),
      step(b`从干净目录重建||Rebuild from a clean directory`, b`把 main.tex 和 methods.tex 一起复制到新目录，从那里编译 main.tex。若又拆进 chapters 文件夹，input 改成 chapters/methods。PDF 应仍有 Methods；这次测试能发现漏带文件和本机绝对路径。||Copy main.tex and methods.tex together into a new directory and compile main.tex there. If the content is moved into chapters, change input to chapters/methods. The PDF should still contain Methods. This exposes omitted files and local absolute paths.`)
    ],
    check(b`methods.tex 被 \input 读取时，要不要再写一套 documentclass 和 document 环境？||Does methods.tex read by \input need its own documentclass and document environment?`, b`不要。保留正文，整份文档的边界由 main.tex 提供。||No. Keep its content only; main.tex supplies the document boundaries.`, b`input 把内容读进已有文档，重复文档边界会破坏当前结构。||input reads into an existing document; repeating its boundaries disrupts that structure.`), ['basics', 'latexmk']);

  teach('project-latexmk',
    b`让 latexmk 重复编译并运行文献工具，直到引用数据稳定。||Let latexmk repeat compilation and run bibliography tools until references stabilize.`,
    [
      b`-pdf 选择通常的 pdfLaTeX 流程，-xelatex 和 -lualatex 选择相应 Unicode 引擎。latexmk 调用本机已经安装的工具，按需要重编译，直到引用和文献稳定。项目需要的 Biber、字体等依赖应先安装好。||-pdf selects the usual pdfLaTeX workflow; -xelatex and -lualatex select their Unicode engines. latexmk runs tools installed on the machine and repeats compilation until references and bibliographies stabilize. Install the project's required Biber, fonts, and other dependencies first.`,
      b`latexmkrc 可以保存项目的编译规则。-outdir=build 把输出集中到 build，某些宏包和外部工具也要采用对应输出设置。-cd 会先切到主文件目录，-pvc 则监视源码变化并重新编译，适合本地编辑。||latexmkrc stores project build rules. -outdir=build collects output in build; some packages and external tools need corresponding settings. -cd changes to the main-file directory, while -pvc watches source changes and rebuilds during local editing.`,
      b`-c 清理多数辅助产物，-C 还会删除最终 PDF 等输出，清理前要确认哪些文件由自己维护。排错看第一条引擎错误，文献问题还看 blg。更换引擎或文献后端后，清理不兼容的旧辅助数据再编译。||-c cleans most auxiliary output; -C also removes final outputs such as the PDF. Check which files you maintain before cleaning. Diagnose the first engine error and inspect the blg for bibliography failures. Clean incompatible auxiliary data after changing an engine or bibliography backend.`,
      b`latexmk 根据文献宏包产生的数据识别 BibTeX/Biber 流程。glossaries 和部分索引流程可能需要自定义依赖规则。把这些规则和 README 一起交付，其他电脑才能按相同的步骤编译。||latexmk detects BibTeX/Biber workflows from data produced by bibliography packages. glossaries and some indexing workflows can need custom dependency rules. Deliver those rules with the README so other machines can follow the same build steps.`,
      b`自动构建时加 -halt-on-error，让引擎停在第一条错误。失败日志能显示实际引擎和已加载文件，应保留下来排查。修复后重新运行 latexmk，让它完成剩余的引用更新。||Use -halt-on-error for automated builds to stop the engine at the first error. Keep a failed log to identify the actual engine and loaded files. After repairing the source, run latexmk again to finish updating references.`
    ],
    b`用一条命令得到引用稳定的 PDF，并知道失败时该查看什么文件。||Build a PDF with stable references using one command and know which files to inspect on failure.`,
    [
      step(b`按源码选择引擎||Choose the engine from the source`, b`从项目主目录运行下方命令；普通 article 示例用 -pdf，含 fontspec 的示例则把它换成 -xelatex 或 -lualatex。输出应在 build/main.pdf。先确认 PDF 的正文和字体正确。||Run this command from the project root. Use -pdf for the plain article example; for fontspec, replace it with -xelatex or -lualatex. Output should be build/main.pdf. Check its prose and fonts first.`, r`latexmk -pdf -outdir=build -interaction=nonstopmode -halt-on-error main.tex`),
      step(b`观察引用重编译||Observe reference reruns`, b`在正文一节标题后加 label{sec:methods}，再在另一段写 ref{sec:methods}。重新运行同一命令。latexmk 会根据辅助数据决定是否再跑引擎，PDF 的引用应从问号变成对应节号。||Add label{sec:methods} after a section heading and ref{sec:methods} in another paragraph, then run the same command. latexmk decides on reruns from auxiliary data. The PDF reference should resolve to the section number.`, r`\section{Methods}\label{sec:methods}
Details of the method.

See Section~\ref{sec:methods}.`),
      step(b`读取失败日志后重试||Read a failed log and retry`, b`若构建失败，打开 build/main.log 找第一条错误；文献工具失败再看 build/main.blg。修好对应行后再运行同一命令。PDF 应保留完整正文并更新引用；清理时 -c 留最终输出，-C 会连 PDF 一起删掉。||If the build fails, find the first error in build/main.log; inspect build/main.blg for a bibliography failure. Repair the corresponding line and rerun the command. The PDF should contain the full body and updated references. For cleanup, -c keeps final output while -C also removes the PDF.`)
    ],
    check(b`只想清理辅助文件、保留最终 PDF，选 latexmk -c 还是 latexmk -C？||To clean auxiliary files while keeping the final PDF, choose latexmk -c or latexmk -C?`, b`选 -c；-C 还会删除最终输出。||Choose -c; -C also deletes final output.`, b`这两个清理范围不同，项目自定义清理规则也应在使用前核对。||Their cleanup scopes differ; check any project-specific cleanup rules before running them.`), ['latexmk']);

  teach('project-reproducibility',
    b`交付源码、资源和构建说明，再到干净目录试编译。||Deliver sources, resources, and build instructions, then test them in a clean directory.`,
    [
      b`Git 通常跟踪 tex、bib、样式、类和生成脚本，忽略可以重新生成的 aux、log、toc 等文件。bbl 和最终 PDF 是否保留，按投稿或归档要求决定。体积大、反复变化的资产应有明确保存方式，避免把无用副本不断写进历史。||Git normally tracks tex, bib, styles, classes, and generation scripts while ignoring regenerable aux, log, and toc files. Retain bbl and final PDFs according to submission or archiving requirements. Plan storage for large changing assets to avoid filling history with redundant copies.`,
      b`在导言区加 listfiles，log 末尾会列出宏包版本。同时记录 TeX Live/MiKTeX 版本、引擎和 BibTeX/Biber 版本。固定发行版或容器有助于稳定输出，字体、外部工具和数据也必须随项目说明或保存。||Add listfiles in the preamble to list package versions near the end of the log. Record the TeX Live/MiKTeX version, engine, and BibTeX/Biber version too. A pinned distribution or container helps stabilize output; also preserve or document fonts, external tools, and data.`,
      b`图表尽量由脚本从标明版本的数据生成。CI 用非交互模式、遇错停止，并保留日志。成功生成 PDF 后，还要查未定义引用、缺字和溢出。跨环境输出是否稳定，可以结合内容和版面判断，不只比较 PDF 字节。||Generate figures and tables with scripts from identified data versions. Run CI noninteractively, stop on errors, and retain logs. After PDF generation, check unresolved references, missing glyphs, and overflow. Assess cross-environment stability through content and layout as well as file bytes.`,
      b`为外部图片记录来源和许可，交付字体文件时附上允许分发的许可证。区分数据图和示意图，正式稿也要检查模板里的演示数据是否已替换。||Record sources and licenses for external graphics and include redistribution licenses when delivering font files. Distinguish data charts from schematics and check that template demonstration values have been replaced in the final draft.`,
      b`把压缩包解到一个干净目录再编译，能直接检查资源是否齐全。说明主文件、引擎、文献后端和构建命令。若要离线重建，还需写清发行版以及所需宏包的安装条件。||Extract the archive into a clean directory and compile it to test resource completeness. State the main file, engine, bibliography backend, and build command. For offline rebuilding, document the distribution and required package availability.`
    ],
    b`让另一台电脑能够按说明重建项目，而不依赖你的本机路径。||Make the project rebuildable on another computer without relying on local paths.`,
    [
      step(b`记录这次构建环境||Record the build environment`, b`在 main.tex 的导言区加入下方命令，然后完整编译。保存日志里的 File List，并在 README 写明主文件、实际引擎和文献后端。PDF 本身不会因为 listfiles 增加文字。||Add this command to main.tex's preamble and complete a build. Save the log's File List and record the main file, actual engine, and bibliography backend in the README. listfiles adds no text to the PDF.`, r`\listfiles`),
      step(b`列出必须交付的文件||List the required files`, b`把主 tex、章节 tex、bib、自定义 sty/cls、图片和生成脚本列入交付清单。把绝对图片路径改成项目内相对路径。重新编译，PDF 应仍包含原有图表和参考文献；图片来源和字体许可放进说明。||List the main and chapter tex files, bib data, custom sty/cls files, graphics, and generation scripts for delivery. Replace absolute graphic paths with project-relative paths and rebuild. The PDF should retain its figures and bibliography. Document graphic sources and font licenses.`),
      step(b`从空目录按说明重建||Rebuild from an empty directory`, b`只复制交付清单里的文件到新目录，照 README 命令编译。打开新 PDF，与原稿比较章节、图表和引用，并查看日志的缺字、溢出信息。缺了文件就在交付清单补齐，缺了工具就在环境说明补齐。||Copy only the delivery-list files into a new directory and run the README command. Compare chapters, figures, and references in the new PDF with the original and inspect the log for missing glyphs and overflow. Add omitted files to the archive and omitted tools to the environment instructions.`)
    ],
    check(b`你的电脑能生成 PDF，为什么只发 main.tex 仍可能让合作者编译失败？||Your computer builds the PDF. Why can sending only main.tex still fail for a collaborator?`, b`主文件可能读取章节、bib、图片、自定义样式或本机字体；这些依赖也要交付或说明。||The main file may read chapters, bib data, graphics, custom styles, or local fonts; deliver or document these dependencies too.`, b`本机能找到依赖不代表压缩包里已经包含它们，干净目录重建能检查这一点。||Dependencies available locally may be absent from the archive; a clean-directory build tests that difference.`), ['texlive', 'latexmk']);

  teach('error-undefined-command',
    b`先找到日志里的未知命令，再核对拼写和提供它的宏包。||Find the unknown command in the log, then check its spelling and provider.`,
    [
      b`Undefined control sequence 表示 TeX 读到了当前尚未定义的命令。先看日志指出的是哪个控制序列，再判断为何没有定义。||Undefined control sequence means TeX read a command that is not currently defined. Identify the control sequence shown in the log before looking for its missing definition.`,
      b`示例正文使用 \mathbb{R}，但导言区没有加载提供 mathbb 的字体宏包，因此会报未定义命令。||The example uses \mathbb{R} in the body without a font package that provides mathbb, so the command is undefined.`,
      b`常见原因包括命令拼错、漏加载宏包，以及切换引用或算法系统后仍沿用旧命令。示例里的 mathbb 可由 amsfonts 提供，也可加载包含它的 amssymb，或其他提供该接口的宏包。||Common causes include a misspelling, a missing package, or an old command left after changing citation or algorithm systems. amsfonts provides mathbb, as does amssymb by loading it; other packages can also supply the interface.`,
      b`找到日志中的第一条 Undefined control sequence，查看紧随的上下文以识别命令。先核对拼写，再查提供该命令的宏包并放到导言区。若命令属于另一套系统，改用当前系统对应的接口。||Find the first Undefined control sequence and inspect its following context to identify the command. Check spelling, then load its provider in the preamble. For a command from another system, use the selected system's corresponding interface.`,
      b`修复稿在导言区加载 amssymb，用 pdflatex 编译后，PDF 中的 R 应显示为黑板粗体。||The repaired document loads amssymb in the preamble. After pdflatex, R should appear in blackboard bold in the PDF.`,
      b`记录共享命令由哪个宏包提供，以及应该在文本还是数学模式里使用。更换引用或算法系统后，逐项检查旧命令，改成新系统支持的接口。||Record the provider and text/math mode of shared commands. After changing citation or algorithm systems, check old commands and replace them with supported interfaces.`
    ],
    b`根据第一条未知命令报错，补上明确的依赖并确认字形输出。||Use the first undefined-command error to supply a dependency and verify its glyph.`,
    [
      step(b`确认报错的命令||Identify the failing command`, b`用 pdfLaTeX 编译本条目的最小复现代码。日志应指向 mathbb，当前构建无法得到有效的目标输出。不要先处理后面的消息，先确认命令拼写与示例一致。||Compile this entry's minimal reproduction with pdfLaTeX. The log should identify mathbb; the failing build cannot provide the intended result. Check its spelling against the example before interpreting later messages.`),
      step(b`补上字体宏包||Load the font package`, b`在 documentclass 后、begin{document} 前加入下面一行，正文的 mathbb 不变。重新编译，PDF 应显示黑板粗体 R。amssymb 载入了 mathbb 所需的 AMS 字体支持。||Insert this line after documentclass and before begin{document}, leaving mathbb unchanged. Recompile: R should appear in blackboard bold. amssymb loads the AMS font support that supplies mathbb.`, r`\usepackage{amssymb}`),
      step(b`用一个变式检查修复||Check a small variation`, b`把正文的 R 换成 N，再用 pdfLaTeX 编译。PDF 应显示黑板粗体 N，日志不再报告 mathbb 未定义。这个变式确认修复的是命令依赖，而非绕过某一个输入。||Replace R in the body with N and compile again with pdfLaTeX. The PDF should show blackboard-bold N, with no undefined mathbb message. This checks that the command dependency is resolved for another argument.`)
    ],
    check(b`\mathbb{R} 拼写正确却未定义，在传统数学配置里应先补哪个依赖？||\mathbb{R} is spelled correctly but undefined in a traditional math setup. Which dependency should be added first?`, b`在导言区加载 amsfonts 或 amssymb；此示例用 amssymb。||Load amsfonts or amssymb in the preamble; this example uses amssymb.`, b`mathbb 由 AMS 字体支持提供，graphicx、geometry 等无关宏包不会定义它。||AMS font support provides mathbb; unrelated packages such as graphicx or geometry do not.`), ['amsfonts']);

  teach('error-missing-math',
    b`看到 Missing $ inserted，检查附近的下划线、上标和数学分隔符。||For Missing $ inserted, inspect nearby underscores, superscripts, and math delimiters.`,
    [
      b`Missing $ inserted 表示 TeX 为继续处理尝试补入数学分隔符。常见触发点是在文本里使用了下标、上标或数学命令，原文也可能有未配对的数学分隔符。||Missing $ inserted means TeX tried to insert a math delimiter to continue processing. Common triggers are subscripts, superscripts, or math commands in text, and unmatched math delimiters.`,
      b`示例把 data_2026.csv 直接写在正文里。下划线被读成数学下标，因而在文本模式中报错；这里本来想输出的是文件名。||The example writes data_2026.csv directly in prose. Its underscore is read as a mathematical subscript and fails in text mode, although the intended content is a filename.`,
      b`文本中的 _、^ 或数学专用命令可以触发这条错误。另一方面，前面的数学模式若没有关闭，后续正文也会被错误处理。查看当前行时，还要回看此前的分隔符。||An _, ^, or math-only command in text can trigger this error. An earlier unclosed math mode can also distort later prose. Inspect preceding delimiters as well as the reported line.`,
      b`先找到错误位置附近的 _、^ 和数学命令。公式用成对的数学分隔符，文件名用转义或普通正文中的 verb。再向前检查分隔符的配对，修复后重新编译。||First inspect _, ^, and math commands near the reported location. Use paired math delimiters for formulas and escaping or verb in ordinary prose for filenames. Check earlier delimiter pairs, repair the source, and recompile.`,
      b`修复稿把文件名写成 \texttt{data\_2026.csv}，把变量写成数学模式中的 x_i。用 pdflatex 编译，PDF 应同时显示字面下划线和真正的数学下标。||The repair writes the filename as \texttt{data\_2026.csv} and places x_i in math mode. With pdflatex, the PDF should show both a literal underscore and a genuine mathematical subscript.`,
      b`文件名、网址和程序标识符用文本接口，变量的下标用数学接口。先分清内容的用途，就能正确处理同一个下划线。||Use text interfaces for filenames, URLs, and identifiers, and math interfaces for variable subscripts. The content's purpose determines how to write the underscore.`
    ],
    b`分别修复文件名中的下划线和变量中的下标，不改变原意。||Repair a filename underscore and a variable subscript while keeping their meanings.`,
    [
      step(b`定位触发字符||Locate the triggering character`, b`用 pdfLaTeX 编译最小复现代码，日志应在 data_2026.csv 附近报 Missing $ inserted。先读原句：这里是文件名，目标 PDF 应显示下划线，而不是把 2026 排成数学下标。||Compile the minimal reproduction with pdfLaTeX. The log should report Missing $ inserted near data_2026.csv. The sentence names a file, so its intended PDF output has a literal underscore, not a mathematical subscript.`),
      step(b`用文本形式修复||Repair the text form`, b`把出错句替换为下面第一句，并加上第二句作比较。重新编译，PDF 的文件名应为等宽字，变量的 i 应在下方。转义字符和数学分隔符各自保留内容原意。||Replace the failing sentence with the first sentence below and add the second for comparison. Recompile: the filename should be monospaced and i should be a subscript in the variable. Escaping and math delimiters preserve their different meanings.`, r`The file is \texttt{data\_2026.csv}.
The parameter is $x_i$.`),
      step(b`向前检查数学配对||Check earlier delimiter pairs`, b`若仍报错，从错误行向前检查每个 $ 或 \( 的闭合位置，不要在日志提示处随手加美元符号。修复后重编译，PDF 中普通句子应恢复正文的空格，公式里的变量才采用数学排版。||If the error remains, look backward for the closing partner of each $ or \( rather than inserting a dollar blindly at the reported location. After a repair, ordinary prose should regain its text spacing and only formulas should use math typesetting.`)
    ],
    check(b`data_2026.csv 是文件名，改成 $data_2026.csv$ 能保持正确的文本含义和字形吗？||For the filename data_2026.csv, does $data_2026.csv$ preserve the intended text and appearance?`, b`不能。应写 \texttt{data\_2026.csv}，或在普通正文中用 verb。||No. Write \texttt{data\_2026.csv}, or use verb in ordinary body text.`, b`数学模式把字母当变量、下划线当下标，无法表达字面文件名。||Math mode treats letters as variables and the underscore as a subscript, which changes a literal filename.`), ['basics']);

  teach('error-file-not-found',
    b`先看缺的是什么文件，再核对路径、大小写和项目资源。||Identify the missing file, then check its path, case, and delivery.`,
    [
      b`File not found 表示 LaTeX 无法定位请求读取的文件。日志中的文件名是排查起点。||File not found means LaTeX cannot locate the file it was asked to read. Start with the filename shown in the log.`,
      b`示例的 input 请求读取 missing.tex，但项目没有提供这个文件。即使主 tex 本身完整，也无法读到缺失的内容。||The example's input asks for missing.tex, but the project does not contain it. A complete main tex cannot supply missing companion content.`,
      b`常见原因是文件名、扩展名、大小写或相对路径写错，也可能交付时漏带章节和图片。若缺的是 sty 或 cls，通常要检查宏包或文档类安装。||Common causes are a wrong name, extension, case, or relative path, or missing chapters and graphics in a delivered project. For a missing sty or cls, check the package or class installation.`,
      b`先分清项目内容和宏包文件。从编译工作目录检查路径与精确名称，必要时固定从主文件目录编译。恢复遗漏的内容，或用发行版管理器安装缺失宏包，然后重新编译。||Distinguish project content from package files. Check the path and exact name from the compilation working directory; build from the main-file directory when needed. Restore omitted content or install the missing package through the distribution manager, then rebuild.`,
      b`修复稿把短段落直接放回主文件，因此可以用 pdflatex 独立编译。保留多文件版本时，则必须一起提供被 input 读取的文件。||The repaired source puts the short passage in the main file for an independent pdflatex build. A multifile version must include every file read by input.`,
      b`在干净目录编译交付包，可以发现依赖本机路径的内容。章节、样式和数据一起打包；仅安装在个人 TEXMF 里的样式也要列入构建说明。||Build the delivered archive in a clean directory to find local-path dependencies. Include chapters, styles, and data, and document any style available only in a personal TEXMF tree.`
    ],
    b`修复一次缺失章节文件的报错，并检查交付包是否完整。||Repair a missing chapter input and check the archive's completeness.`,
    [
      step(b`照日志找文件||Find the named file`, b`编译最小复现代码，读日志中的 missing.tex。检查编译目录下是否真有这个文件，而不是只找主 tex。失败阶段没有可接受的完整 PDF，因为请求的正文还没读入。||Compile the minimal reproduction and read missing.tex in the log. Check whether that file exists in the build directory, not just whether the main tex exists. A failed build cannot give an acceptable complete PDF because the requested content was not read.`),
      step(b`让 input 与实际位置对应||Match input to the actual location`, b`若文件已保存为 chapters/methods.tex，把主文件的 input 改成下方行，固定从主文件目录用 pdfLaTeX 编译。PDF 应出现 Methods 节；Linux 构建中 Methods.tex 与 methods.tex 的大小写也要一致。||If the file is chapters/methods.tex, replace the main input with this line and compile from the main-file directory using pdfLaTeX. The PDF should contain Methods. Match filename case too: Linux builds distinguish Methods.tex from methods.tex.`, r`\input{chapters/methods}`),
      step(b`重新检验交付文件||Test the delivered files`, b`把主文件和 chapters 目录一起复制到新目录，再按同样命令编译。PDF 应仍包含 Methods。若日志这次缺的是 sty/cls，就检查并安装对应宏包或随项目交付自定义样式。||Copy the main file and chapters directory together to a fresh directory and compile with the same command. Methods should remain in the PDF. If the missing file is now a sty/cls, install its package or include the project's custom style.`)
    ],
    check(b`日志缺 missing.tex，与日志缺 amsmath.sty，修复动作相同吗？||Is the repair the same for missing.tex and amsmath.sty?`, b`不同。前者通常恢复项目文件或修路径；后者检查并安装宏包。||No. Restore the project file or fix its path for the former; check and install the package for the latter.`, b`文件扩展名和调用位置能帮助区分内容依赖与安装依赖。||The extension and call site help distinguish project content from an installation dependency.`), ['basics', 'latexmk']);

  teach('error-chinese',
    b`中文显示异常时，分开检查编码、引擎、中文方案和字体缺字。||For broken Chinese text, check encoding, engine, Chinese support, and glyph coverage separately.`,
    [
      b`示例日志报 Unicode character 中 (U+4E2D) not set up for use with LaTeX，说明当前配置没有为这个中文字符提供排版支持。||The example reports Unicode character 中 (U+4E2D) not set up for use with LaTeX, meaning the current setup lacks typesetting support for that Chinese character.`,
      b`最小复现把中文直接放进普通 article，没有加载中文排版方案。用 pdfLaTeX 编译会触发示例错误。||The minimal reproduction puts Chinese directly in plain article without Chinese support. Compiling it with pdfLaTeX triggers the illustrated error.`,
      b`普通 pdfLaTeX article 不会自动配置中文。源文件不是 UTF-8 时，可能出现乱码；XeLaTeX/LuaLaTeX 下字体缺字时，则可能报 Missing character。引擎、文件编码与字形覆盖是不同检查项。||Plain pdfLaTeX article does not configure Chinese automatically. A non-UTF-8 source can produce garbled text; a missing glyph under XeLaTeX/LuaLaTeX can report Missing character. The engine, source encoding, and glyph coverage need separate checks.`,
      b`先确认源文件保存为 UTF-8，再选择 XeLaTeX/LuaLaTeX 配合 ctex，或完整的 pdfLaTeX 中文方案。检查所选字体有没有目标字符。本条目修复稿采用 XeLaTeX 与 Fandol。||Confirm UTF-8 source, then choose XeLaTeX/LuaLaTeX with ctex or a complete pdfLaTeX Chinese setup. Check that the font contains the required characters. This entry's repair uses XeLaTeX and Fandol.`,
      b`修复稿使用 ctexart 和 fontset=fandol，选 xelatex 编译。PDF 应能显示整句中文，而不再触发原来的 Unicode 配置错误。||The repair uses ctexart with fontset=fandol and compiles with xelatex. The PDF should display the full Chinese sentence without the original Unicode setup error.`,
      b`Missing character 要检查字体字形，乱码要检查保存编码。把这两种现象分开，可避免反复更换引擎却没有处理真正的问题。||For Missing character, inspect font coverage; for garbled input, inspect source encoding. Distinguishing the symptoms prevents repeated engine changes that leave the actual cause unresolved.`
    ],
    b`用可移植配置排出中文，并根据日志区分编码问题和缺字。||Print Chinese with a portable setup and distinguish encoding errors from missing glyphs.`,
    [
      step(b`确认源文件可读||Check the source encoding`, b`在编辑器里确认原中文句子可读，把文件另存为 UTF-8。先记录当前引擎和第一条错误。目标 PDF 要显示“中文测试”，不是乱码、空白或方框。||Confirm that the sentence is readable in the editor and save it as UTF-8. Note the current engine and first error. The intended PDF should display 中文测试, without garbled characters, blanks, or boxes.`),
      step(b`换成配套的中文入口||Use a matching Chinese setup`, b`把最小复现的第一行替换成下方代码，并把编译引擎改为 XeLaTeX；其余文档边界和中文正文保留。重编译，PDF 应显示完整中文，Fandol 提供所需字形。||Replace the reproduction's first line with this code and change the engine to XeLaTeX. Keep the document boundaries and Chinese prose. Recompile: the PDF should display the full Chinese sentence using Fandol glyphs.`, r`\documentclass[fontset=fandol]{ctexart}`),
      step(b`检查少见字的覆盖||Check less common characters`, b`把实际文稿中显示异常的字加到测试句末尾，再编译并搜日志的 Missing character。若只有某个字缺失，检查所选字体的字形覆盖；PDF 应保留原句并显示该测试字，确认后再应用到整稿。||Append the problem character from your document to the test sentence and compile, then search the log for Missing character. If just one glyph is absent, check the font's coverage. Confirm that the PDF displays the original sentence and that character before applying the setup to the full document.`)
    ],
    check(b`XeLaTeX 已运行，日志只有 Missing character，编辑器中的中文正常，优先查编码还是字体？||XeLaTeX ran, the log says Missing character, and the Chinese source looks correct. Check encoding or the font first?`, b`先查字体是否包含日志指出的字。||First check whether the font contains the character identified in the log.`, b`这条消息描述缺失字形；源文件已经被读出，换编码不会给字体增加字形。||The message identifies a missing glyph; changing source encoding does not add glyphs to a font.`), ['ctex', 'xecjk']);

  teach('error-engine',
    b`fontspec 报引擎要求错误时，先读日志，再改实际构建配置。||When fontspec reports an engine requirement, read the log and change the actual build configuration.`,
    [
      b`fontspec 要求 XeTeX 或 LuaTeX。看到这条致命错误，说明这次实际使用的引擎没有提供所需字体接口。||fontspec requires XeTeX or LuaTeX. This fatal error means the engine actually used does not provide the required font interface.`,
      b`最小复现加载了 fontspec，却用 pdfLaTeX 编译。宏包和引擎不匹配，文档无法按这个配置完成排版。||The reproduction loads fontspec but uses pdfLaTeX. The package and engine do not match, so this configuration cannot complete the document.`,
      b`可能是编辑器保留了旧引擎，或 latexmkrc 覆盖了按钮的选择。文件名变了，引擎不会跟着变；要检查实际执行的命令。||An editor may retain an old engine setting, or latexmkrc may override the button. Renaming a source file does not change the engine; inspect the executed command.`,
      b`先读日志开头，确认 pdfTeX、XeTeX 还是 LuaTeX。把编辑器与自动构建规则一起改到匹配引擎，清理受引擎变化影响的辅助数据，再编译。若模板必须用 pdfLaTeX，则采用它支持的字体宏包。||Read the log banner for pdfTeX, XeTeX, or LuaTeX. Align the editor and automated build rules with a supported engine, clean incompatible auxiliary data, and rebuild. For a template requiring pdfLaTeX, use its supported font packages.`,
      b`修复稿通过 fontspec 配置 TeX Gyre 字体文件，用 xelatex 编译。PDF 应能显示 Unicode 西文，如 café。||The repair configures TeX Gyre font files through fontspec and compiles with xelatex. The PDF should display Unicode Latin text such as café.`,
      b`README、编辑器和 latexmkrc 写同一个引擎。构建后再检查日志，可发现项目规则覆盖按钮设置的情况。||Keep the engine consistent in the README, editor, and latexmkrc. Checking the log after a build reveals project rules overriding the button.`
    ],
    b`让含 fontspec 的项目实际用 XeLaTeX 编译，并在日志里确认。||Compile a fontspec project with XeLaTeX and confirm it in the log.`,
    [
      step(b`读日志确认不匹配||Confirm the mismatch in the log`, b`用 pdfLaTeX 运行最小复现，日志应报 fontspec requires either XeTeX or LuaTeX。查看开头的 pdfTeX：这次引擎确实不匹配。失败时先保留日志，目标 Unicode 字体 PDF 还未成功生成。||Run the reproduction with pdfLaTeX. The log should report that fontspec requires either XeTeX or LuaTeX and start with pdfTeX, confirming the mismatch. Keep the failed log; the intended Unicode-font PDF has not been built successfully.`),
      step(b`修改真正的构建命令||Change the actual build command`, b`保留源文件里的 fontspec，从主文件目录运行下方命令，或把编辑器改到同一引擎。不要只改文件名。成功后 PDF 应显示 Unicode text.，不再有引擎要求错误。||Keep fontspec in the source and run this command from the main-file directory, or select the same engine in the editor. Renaming the file does not help. After success, the PDF should display Unicode text. with no engine requirement error.`, r`latexmk -xelatex -interaction=nonstopmode -halt-on-error main.tex`),
      step(b`验证字体和引擎都生效||Verify the font and engine`, b`用本条目的修复代码选择 TeX Gyre 文件，并把正文保留为 café 样本。再编译，查看日志开头含 XeTeX，PDF 中 é 正常显示。最后把同一引擎写进项目构建说明。||Use this entry's repaired source with TeX Gyre files and its café sample. Recompile, confirm XeTeX in the log banner, and inspect é in the PDF. Record that engine in the project build instructions.`)
    ],
    check(b`含 fontspec 的文件从 old.tex 改名 main.tex，pdfLaTeX 的引擎错误会自动消失吗？||Will renaming a fontspec file from old.tex to main.tex remove the pdfLaTeX engine error?`, b`不会。要把实际编译引擎改成 XeLaTeX 或 LuaLaTeX，或改用 pdfLaTeX 字体方案。||No. Change the actual engine to XeLaTeX or LuaLaTeX, or use a pdfLaTeX font setup.`, b`文件名不决定引擎，字体宏包的引擎要求仍然存在。||The filename does not select an engine or change the font package's requirements.`), ['fontspec', 'latexmk']);

  teach('memoir',
    b`自定义长书稿可用 memoir，把版心、章标题和目录放在同一套接口里。||Use memoir for custom long books with one set of layout, chapter, and contents interfaces.`,
    [
      b`memoir 适合书籍和长报告，内置章样式、版面、页眉和目录功能。它支持 book 式的前置、正文、后置部分以及章结构，并提供相应的排版设置命令。||memoir suits books and long reports and includes chapter styles, layout, running headers, and contents facilities. It supports book-style matter divisions and chapters with its own formatting commands.`,
      b`setlrmarginsandblock 设置左右页边距和版心，setulmarginsandblock 设置上下布局，随后用 checkandfixthelayout 校验。chapterstyle 选择章标题样式。memoir 已内置一些常用宏包的功能，加入同类宏包前先查兼容列表。||setlrmarginsandblock sets the horizontal margins and type block; setulmarginsandblock sets vertical layout. Follow them with checkandfixthelayout. chapterstyle selects a chapter style. Check compatibility before loading packages whose facilities memoir already includes.`,
      b`长期维护的自定义书稿可以用 memoir 管理标题、目录与版面。期刊稿仍采用指定的 cls。中文可以加载 ctex，同时在实际输出里确认两套标题接口的配合。||memoir can manage headings, contents, and layout for a custom book maintained over time. Use the prescribed cls for a journal submission. For Chinese, load ctex and verify how the heading interfaces work together in the output.`
    ],
    b`使用 memoir 的原生接口设置版心，并比较一种章标题样式。||Set the type block with memoir's native interfaces and compare a chapter style.`,
    [
      step(b`先查看完整书稿||Inspect the complete book`, b`打开本条目的 memoir 示例，用 pdfLaTeX 编译。找到导言区中的版心设置和正文里的 chapter。PDF 应有章标题与正文；先记录当前页边距，后面只改一项布局。||Open this entry's memoir example and compile with pdfLaTeX. Locate the preamble's layout settings and chapter in the body. Inspect the chapter heading and body in the PDF, noting the margins before changing one setting.`),
      step(b`用原生命令设置版心||Set the type block natively`, b`在导言区把原有对应布局行替换成下面三行，保留 documentclass{memoir} 和原来的 chapterstyle{default}。它们指定左右、上下边距，再计算相关布局。重编译，PDF 中正文应落在新版心内，不能只改边距而漏掉最后的校验命令。||Replace the corresponding preamble layout lines with these three, keeping documentclass{memoir} and the existing chapterstyle{default}. They set horizontal and vertical margins and calculate the related layout. Recompile and check that prose fits the new type block; keep the final layout-check command.`, r`\setlrmarginsandblock{30mm}{30mm}{*}
\setulmarginsandblock{25mm}{25mm}{*}
\checkandfixthelayout`),
      step(b`只改章样式并比较||Compare a chapter style`, b`把导言区的 chapterstyle 换成下方样式，原来的 chapter 和正文不改。重编译，PDF 的章标题外观应变化，章编号和正文内容应保留。再加功能前查 memoir 手册，避免重复加载相同功能的宏包。||Replace the preamble's chapterstyle with this choice, leaving chapter and prose unchanged. Recompile: the heading appearance should change while its number and content remain. Consult the memoir manual before adding packages with overlapping facilities.`, r`\chapterstyle{hangnum}`)
    ],
    check(b`设置 memoir 的边距后，哪条命令负责校验并完成相关布局计算？||After setting memoir margins, which command checks and completes the layout calculations?`, b`\checkandfixthelayout。||\checkandfixthelayout.`, b`原生布局接口需要这一步让版心、边距及关联长度一起生效。||The native layout interface uses this step to resolve the type block, margins, and related lengths together.`), ['memoir']);

  function exercise(id, module, type, title, question, options, answer, explain, related, code) {
    D.exercises.push({
      id: 'exercise-guided-foundation-' + id,
      module, type, title, question,
      options: options.map(item => item.text),
      wrong: options.map(item => item.why),
      answer, explain, related,
      ...(code ? {code} : {})
    });
  }
  const option = (text, why) => ({text, why});

  exercise('engine-log', 'ecosystem', 'single',
    b`按钮与日志不一致||A button and log disagree`,
    b`源码加载 fontspec，编辑器按钮写着 XeLaTeX，但失败日志开头是 pdfTeX。下一步最直接的操作是什么？||The source loads fontspec. The editor button says XeLaTeX, but the failed log starts with pdfTeX. What is the most direct next action?`,
    [
      option(b`把 main.tex 改名 article.tex||Rename main.tex to article.tex`, b`文件名不选择引擎，改名后仍会运行原来的构建配置。||The filename does not select an engine; renaming leaves the build configuration in place.`),
      option(b`检查实际构建规则，把命令改为 latexmk -xelatex main.tex||Inspect the build rule and use latexmk -xelatex main.tex`, b`日志说明实际用了 pdfTeX；修改真正执行的引擎才能满足 fontspec。||The log identifies pdfTeX; changing the executed engine meets fontspec's requirement.`),
      option(b`只把正文中的中文删掉||Delete only the Chinese prose`, b`fontspec 在导言区就要求 Unicode 引擎，正文语言不改变这项依赖。||fontspec requires a Unicode engine in the preamble; the body language does not change that dependency.`),
      option(b`多运行一次同样的 pdfLaTeX||Run the same pdfLaTeX build again`, b`重复运行同一个不匹配引擎仍会触发同一错误。||Repeating the mismatched engine triggers the same error.`)
    ], 1,
    b`先看日志确认实际引擎，再检查编辑器任务或 latexmkrc。把构建命令统一为 XeLaTeX，重新运行后用 XeTeX 日志开头确认。||Use the log to identify the actual engine, then inspect the editor task or latexmkrc. Set the build to XeLaTeX and confirm XeTeX in the next log banner.`, ['engines', 'error-engine', 'project-latexmk']);

  exercise('group-scope', 'syntax', 'single',
    b`粗体影响了后一句||Bold continues into the next sentence`,
    b`想让 Important 加粗、后面的 normal 正常，下面哪项改写最直接？||To make Important bold and keep normal ordinary, which rewrite directly expresses the intended scope?`,
    [
      option(b`\bfseries Important normal||\bfseries Important normal`, b`bfseries 会影响同一组内后面的 normal。||bfseries also affects normal in the same group.`),
      option(b`\textbf{Important normal}||\textbf{Important normal}`, b`normal 仍在 textbf 的参数里，也会加粗。||normal remains inside the textbf argument and becomes bold too.`),
      option(b`\textbf{Important} normal||\textbf{Important} normal`, b`只有 Important 在参数内，组结束后恢复原字重。||Only Important is inside the argument; its ending restores the surrounding weight.`),
      option(b`\begin{document}\bfseries Important normal||\begin{document}\bfseries Important normal`, b`文档组没有在 Important 后结束，不能把影响限制到一个词。||The document group does not end after Important and cannot limit bold to that word.`)
    ], 2,
    b`textbf 的参数就是这次字体变化的边界。声明形式也可以写成 {\bfseries Important} normal。||The textbf argument bounds this font change. The declaration form can also use {\bfseries Important} normal.`, ['commands-groups'], r`\bfseries Important normal`);

  exercise('filename-math', 'errors', 'debug',
    b`保留文件名的下划线||Keep a filename underscore`,
    b`这段正文报 Missing $ inserted。文件名要按字面打印，哪项替换正确？||This prose reports Missing $ inserted. Which replacement prints the filename literally?`,
    [
      option(b`The file is \texttt{data\_2026.csv}.||The file is \texttt{data\_2026.csv}.`, b`texttt 使用文本字体，转义下划线保留了字面文件名。||texttt selects a text font and the escaped underscore preserves the literal filename.`),
      option(b`The file is $data_2026.csv$.||The file is $data_2026.csv$.`, b`数学模式会把字母当变量、下划线当下标，文件名字形和含义都被改变。||Math mode treats letters as variables and the underscore as a subscript, changing the filename's appearance and meaning.`),
      option(b`The file is data^2026.csv.||The file is data^2026.csv.`, b`脱字符同样要求数学模式，而且文件名原本没有这个字符。||The caret also requires math mode and is not the filename's original character.`),
      option(b`只加载 graphicx，正文不改||Load graphicx and keep the prose`, b`graphicx 处理图片，不改变正文下划线的语法。||graphicx handles graphics and does not change an underscore's text syntax.`)
    ], 0,
    b`文件名属于文本。这里转义下划线即可，变量 x_i 则放在成对的数学分隔符中；两种修复按内容用途选择。||A filename is text, so escape its underscore. Put a variable such as x_i inside paired math delimiters instead; choose the repair from the content's purpose.`, ['escapes', 'error-missing-math', 'verb'], r`\documentclass{article}
\begin{document}
The file is data_2026.csv.
\end{document}`);

  exercise('percent-brace', 'characters', 'debug',
    b`百分号把右花括号藏起来||A percent hides the closing brace`,
    b`想加粗完整的“5% growth”，原代码里的参数没有正常结束。哪项保留原意并修复结构？||To make the full phrase 5% growth bold, which repair preserves it and closes the argument correctly?`,
    [
      option(b`\textbf{5% growth}}||\textbf{5% growth}}`, b`新增的右花括号仍在百分号后面的同一行，也会被注释。||The extra closing brace is still after percent on the same line and is commented out too.`),
      option(b`\textbf{5 growth}||\textbf{5 growth}`, b`这能结束参数，但丢掉了原来需要打印的百分号。||The argument closes, but the intended percent sign is lost.`),
      option(b`\textbf{5\% growth}||\textbf{5\% growth}`, b`转义百分号后，growth 和右花括号都会正常被读取。||With percent escaped, growth and the closing brace are read normally.`),
      option(b`\textbf{5% growth} 后再加一个空行||Add a blank line after \textbf{5% growth}`, b`空行不能恢复已经被注释掉的右花括号，仍需修复百分号。||A blank line cannot restore the commented-out closing brace; the percent must be repaired.`)
    ], 2,
    b`未转义的 % 会隐藏本行余下源码，包括右花括号。这里只需改成 \%，PDF 就能排出完整的粗体百分比。||An unescaped % hides the rest of its line, including the closing brace. Changing it to \% lets the PDF show the full bold percentage.`, ['percent', 'commands-groups'], r`\textbf{5% growth}`);

  exercise('file-path', 'projects', 'single',
    b`章节文件在子目录||A chapter lives in a subdirectory`,
    b`项目里 main.tex 位于根目录，章节实际是 chapters/methods.tex。固定从根目录编译，哪项 input 与实际路径对应？||main.tex is in the project root and the chapter is chapters/methods.tex. Building from the root, which input matches the path?`,
    [
      option(b`\input{methods}||\input{methods}`, b`此路径从工作目录找 methods.tex，没有包含实际的 chapters 目录。||This looks for methods.tex from the working directory and omits chapters.`),
      option(b`\input{chapters/methods}||\input{chapters/methods}`, b`路径明确包含子目录，对应现有文件的位置。||The path includes the subdirectory and matches the file's location.`),
      option(b`\usepackage{chapters/methods}||\usepackage{chapters/methods}`, b`usepackage 请求 sty 宏包，不用来读普通章节正文。||usepackage requests a sty package, not ordinary chapter prose.`),
      option(b`在章节里再写一个 documentclass||Put another documentclass inside the chapter`, b`这不修复 input 的路径，且会把文档边界重复放进已有文档。||This does not fix the path and repeats the document boundary inside an existing document.`)
    ], 1,
    b`input 的相对路径从编译工作目录查找。保持根目录编译并写出 chapters/methods，交付时同时保留该目录。||input resolves relative paths from the build working directory. Build from the root, use chapters/methods, and preserve that directory when delivering the project.`, ['project-multifile', 'error-file-not-found']);

  exercise('latexmk-clean', 'projects', 'single',
    b`清理前保留最终 PDF||Keep the final PDF during cleanup`,
    b`构建命令用了 -outdir=build。只想清辅助产物并保留 build/main.pdf，下面哪项符合这个目标？||The build uses -outdir=build. Which command cleans auxiliary output while retaining build/main.pdf?`,
    [
      option(b`latexmk -C -outdir=build main.tex||latexmk -C -outdir=build main.tex`, b`大写 -C 的清理范围包括最终 PDF。||Uppercase -C includes the final PDF in cleanup.`),
      option(b`把 main.tex 删除后再编译||Delete main.tex and recompile`, b`主源码是项目输入，删掉它会阻止重建。||The main source is an input; deleting it prevents rebuilding.`),
      option(b`把 build 目录整个删除||Delete the whole build directory`, b`这会同时删除目录里的最终 PDF。||This also deletes the final PDF in that directory.`),
      option(b`latexmk -c -outdir=build main.tex||latexmk -c -outdir=build main.tex`, b`小写 -c 清理辅助产物，-outdir 与原构建位置保持一致。||Lowercase -c cleans auxiliary output and -outdir matches the original build location.`)
    ], 3,
    b`-c 与 -C 的范围不同。使用项目自定义清理规则时，还要先看其列出的扩展名和文件，避免误删手工维护的资源。||-c and -C have different scopes. Also inspect a project's custom cleanup extensions and files before running them, especially for hand-maintained resources.`, ['project-latexmk']);

  exercise('chinese-glyph', 'chinese', 'single',
    b`中文只有一个字缺失||One Chinese glyph is missing`,
    b`源文件保存为 UTF-8，实际引擎是 XeTeX，其余中文正常。日志指出 Missing character，并列出一个少见汉字。优先检查哪项？||The source is UTF-8, the actual engine is XeTeX, and other Chinese text prints normally. The log reports Missing character for one uncommon Chinese character. What should be checked first?`,
    [
      option(b`当前中文字体是否包含那个字||Whether the current Chinese font contains that glyph`, b`该消息直接描述字形缺失，先检查字体覆盖最符合证据。||The message identifies an absent glyph, so font coverage is the first check supported by it.`),
      option(b`把所有中文转成图片||Convert all Chinese prose to images`, b`这没有定位单个字的字体问题，也使正文难以继续编辑。||This does not diagnose the single glyph's font problem and makes prose harder to edit.`),
      option(b`把 UTF-8 改成任意其他编码||Change UTF-8 to any other encoding`, b`其余文字已被正确读取；更换编码不会给当前字体补字形。||Other text is read correctly; changing encoding does not add a glyph to the font.`),
      option(b`在少见字前加 \par||Add \par before the character`, b`段落边界不改变字体里的字形集合。||A paragraph boundary does not change the font's glyph set.`)
    ], 0,
    b`先从日志确定缺的是哪个字，再检查中文字体覆盖并设置合适替代。编码、引擎和缺字是不同问题，应根据症状排查。||Identify the missing character from the log, check the Chinese font's coverage, and select a suitable substitute. Encoding, engine selection, and missing glyphs have different symptoms.`, ['error-chinese', 'xeCJK', 'chinese-typography']);

  exercise('archive-rebuild', 'projects', 'single',
    b`交付前检查能否重建||Test rebuilding before delivery`,
    b`哪项步骤最能检查压缩包有没有漏掉章节、图片或自定义样式？||Which step best checks whether an archive omits chapters, graphics, or custom styles?`,
    [
      option(b`只打开电脑上已经生成的 PDF||Open only the PDF already generated locally`, b`现有 PDF 能显示旧结果，但没有读取压缩包里的输入文件。||An existing PDF shows previous output without reading the archive's inputs.`),
      option(b`只看 main.tex 的文件大小||Check only the size of main.tex`, b`文件大小不能说明它引用的资源是否都在压缩包里。||Its size cannot show whether its resources are in the archive.`),
      option(b`把压缩包解到新目录，按 README 从主文件完整编译||Extract into a new directory and build the main file using the README`, b`新目录让构建实际读取交付资源，漏带文件和不清楚的构建步骤会暴露出来。||The new directory makes the build read delivered resources, exposing omitted files and unclear build steps.`),
      option(b`只把 PDF 上传 GitHub||Upload only the PDF to GitHub`, b`发布结果不会验证源码和依赖是否足以重建。||Publishing output does not test whether sources and dependencies can rebuild it.`)
    ], 2,
    b`按交付清单在干净目录完整构建，再检查新 PDF 的图表、引用和字形。把缺失资源补进包，把所需工具、字体和版本写进构建说明。||Build from the delivery list in a clean directory, then inspect figures, references, and glyphs in the new PDF. Add missing resources to the archive and document tools, fonts, and versions.`, ['project-reproducibility', 'project-multifile', 'project-latexmk']);
})();
