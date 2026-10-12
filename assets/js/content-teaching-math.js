/* Bilingual guided mathematics: preserve original source fragments and references. */
(() => {
'use strict';
const D=window.ATELIER,R=String.raw;
const b=s=>{const [zh,en]=s.raw[0].split('||');return {zh:zh.trim(),en:en.trim()};};
const step=(title,body,code)=>({title,body,...(code?{code}:{})});
const test=(question,answer,reason)=>({question,answer,reason});
const refs={
 math:{label:'AMS / LaTeX Project: amsmath user guide',url:'https://www.latex-project.org/help/documentation/amsldoc.pdf'},
 theorem:{label:'AMS theorem package manual',url:'https://mirrors.ctan.org/macros/latex/required/amscls/doc/amsthdoc.pdf'},
 fonts:{label:'LaTeX font selection guide',url:'https://www.latex-project.org/help/documentation/fntguide.pdf'},
 amsfonts:{label:'AMS font package documentation',url:'https://ctan.org/pkg/amsfonts'},
 bm:{label:'LaTeX tools: bm package',url:'https://ctan.org/pkg/bm'},
 author:{label:'LaTeX author guide: document commands',url:'https://www.latex-project.org/help/documentation/usrguide.pdf'},
 expl3:{label:'LaTeX3 public interfaces: interface3',url:'https://mirrors.ctan.org/macros/latex/required/l3kernel/interface3.pdf'},
 tikz:{label:'PGF/TikZ manual: path specifications',url:'https://tikz.dev/tikz-paths'},
 axis:{label:'PGFPlots manual: axis descriptions',url:'https://tikz.dev/pgfplots/reference-axisdescription'},
 plot:{label:'PGFPlots manual: addplot',url:'https://tikz.dev/pgfplots/reference-addplot'},
 standalone:{label:'standalone documentation',url:'https://ctan.org/pkg/standalone'}
};
function upgrade(id,summary,bodies,goal,walkthrough,check,sources){
 const e=D.entries.find(x=>x.id===id);
 if(!e)throw new Error('Missing guided lesson: '+id);
 if(bodies.length!==e.sections.length)throw new Error('Section count changed: '+id);
 e.summary=summary;e.sections.forEach((s,i)=>{s.body=bodies[i];});
 e.teaching={goal,walkthrough,check};
 for(const source of sources)if(!e.sources.some(s=>s.url===source.url))e.sources.push(source);
}
upgrade('inline-display',b`短公式留在句子里，长公式另起一行；需要正文引用时再加编号。||Keep short formulas in sentences and display long ones separately. Add a number when the prose needs a reference.`,[
 b`正文里的 \(x^2\) 或 $x^2$ 会和文字一起排成一段；\[x^2+y^2=1\] 会另起一行且不编号。行间样式通常把分式和求和排得更大，行内样式则照顾段落行高。||In the body, \(x^2\) or $x^2$ stays in the paragraph. \[x^2+y^2=1\] creates a separate unnumbered display. Display style usually enlarges fractions and sums; inline style keeps paragraph line heights manageable.`,
 b`把公式当成句子的一部分来读，句末仍要有标点，放置方式全文一致。公式挤出栏宽时移到行间；后文需要引用编号时用 equation。||Read a formula as part of its sentence and keep sentence punctuation consistent. Move a formula into a display if it exceeds the column width. Use equation when later prose needs its number.`,
 b`一对数学定界符已经进入数学模式，内部直接写公式即可。公式里不要留空行，空行会结束段落。行间接口用 \[...\] 或 amsmath 环境；旧式 $$...$$ 会绕过部分 LaTeX 显示处理。||One pair of math delimiters establishes math mode. Keep blank lines out of formulas because they end paragraphs. Use \[...\] or amsmath environments for displays; the older $$...$$ interface bypasses parts of LaTeX display handling.`
],b`把同一个分式分别放在句中和行间，比较位置与大小。||Place the same fraction inline and in a display, then compare its position and size.`,[
 step(b`先写一句话||Write a sentence`,b`在 \begin{document} 后插入这句示例。分式在文字后面，仍参与段落排版；这里 x₁、x₂ 表示两个数。||Insert this sentence after \begin{document}. The fraction follows the prose within the paragraph; x₁ and x₂ denote two numbers.`,R`The average is \(\frac{x_1+x_2}{2}\).`),
 step(b`把公式移到行间||Move it into a display`,b`在这句话后，把同一个分式写入 \[...\]。编译后它独占一行，分式样式随显示数学调整。||After the sentence, put the same fraction inside \[...\]. It receives its own line and uses display-math style.`,R`\[\frac{x_1+x_2}{2}.\]`),
 step(b`检查是否需要编号||Check whether it needs a number`,b`读后面的正文。如果需要写“由公式（1）可知”，改用 equation 并加 label；展示一次即可的公式保留方括号定界符。||Read the following prose. If it needs “by equation (1)”, switch to equation and add a label. Keep bracket delimiters for a one-off display.`)
],test(b`\[x^2\] 会自动出现编号吗？||Does \[x^2\] receive an automatic number?`,b`不会，需要编号时用 equation。||No. Use equation for numbering.`,b`方括号定界符建立无编号显示，编号由相应环境的计数器管理。||Bracket delimiters establish an unnumbered display. Numbered environments manage counters.`),[refs.math]);
upgrade('equation',b`给重要公式加标签，正文读编号；前面新增公式后，引用也会随编译更新。||Label important equations and read their numbers in the prose. References update after compilation when earlier equations are added.`,[
 b`equation 建立一条自动编号的行间公式；amsmath 的 equation* 取消编号。label 放在环境内，eqref 输出带括号的引用。编号由计数器决定，标签名称只是查找键。||equation creates an automatically numbered display; amsmath supplies equation* without a number. Put label inside the environment and use eqref for a parenthesized reference. The counter sets the number; the label name is a lookup key.`,
 b`一条推导需要多行但只要一个编号时，在 equation 内放 aligned 或 split。tag 可以改显示标签，使用时检查重复；numberwithin 设置按节或章重置编号。||For one derivation with several lines and one number, put aligned or split inside equation. tag changes the displayed tag, so check for duplicates. numberwithin resets numbering by section or chapter.`,
 b`equation 本身没有多行对齐列；直接加换行不能建立这种结构。需要各行独立编号时，在正文直接用 align。引用是问号时再编译，并检查标签键是否唯一。||equation alone has no multiline alignment columns. A row break does not create that structure. Use align directly in the body for separate row numbers. Rerun if references show question marks and check label uniqueness.`
],b`排一条预算约束，并在下一句话引用它。||Typeset a budget constraint and reference it in the next sentence.`,[
 step(b`准备引用命令||Prepare references`,b`导言区加载 amsmath，以便使用 eqref。例子中的 c₁、c₂ 是两期消费，R 是正的总回报因子，W 是财富；这里只练排版。||Load amsmath in the preamble for eqref. Here c₁ and c₂ are consumption in two periods, R is a positive gross return factor, and W is wealth. This example practices typesetting.`,R`\usepackage{amsmath}`),
 step(b`把标签放进公式||Label the equation`,b`在正文插入公式，把 label 留在 equation 内。编译后约束会有一个编号，下一句读取同一编号。||Insert the formula in the body and keep label inside equation. The constraint receives one number, which the next sentence retrieves.`,R`\begin{equation}\label{eq:budget}
c_1+\frac{c_2}{R}=W.
\end{equation}
Equation~\eqref{eq:budget} is the budget constraint.`),
 step(b`试一次重新编号||Try renumbering`,b`在这条约束之前插入另一个 equation，再编译两次。约束和引用应一起变号；若引用仍是问号，逐字比较键名。||Insert another equation before the constraint and compile twice. Its number and reference should change together. If unresolved, compare the keys character by character.`)
],test(b`标签名 eq:three 会让公式编号变成 3 吗？||Does the label name eq:three set the equation number to 3?`,b`不会，编号由 equation 计数器决定。||No. The equation counter supplies the number.`,b`label 保存当前编号，键名用来读取它，并不设置编号。||label stores the current number. Its key retrieves the number without setting it.`),[refs.math]);
upgrade('align',b`在等号前放 &，让多行方程对齐；每个要引用的行保留自己的编号。||Put & before equals signs to align equations, and retain a number on each row that needs a reference.`,[
 b`加载 amsmath 后，align 用 & 标出对齐点，用双反斜杠分行。通常把 & 放在等号前。默认逐行编号，align* 全部不编号，notag 只取消所在行的编号。||With amsmath, align uses & for alignment points and double backslashes for row breaks. Place & before an equals sign in the usual pattern. Rows have numbers by default; align* removes all numbers and notag removes one row's number.`,
 b`每条需要引用的编号行放自己的 label。同一行可放多组方程，组间距离由 align 管理。长推导需要分页时，可允许显示公式断页，再检查实际断点是否便于阅读。||Label each numbered row you need to reference. Several equation groups can share a row, with align handling their spacing. If a long derivation must span pages, allow display breaks and inspect the actual break points.`,
 b`把 align 直接放在正文，它自己建立显示数学。每多写一个 & 都会改变列结构；正文中的字面 & 写成 \&。整组只要一个编号时，用 equation 加 aligned。||Put align directly in the body; it establishes display math itself. Extra & markers change the columns, while a literal ampersand in prose is \&. Use equation with aligned for one number on the whole block.`
],b`对齐两期预算方程，再决定保留哪些编号。||Align two period-budget equations and choose which numbers to retain.`,[
 step(b`写出两条约束||Write the constraints`,b`导言区加载 amsmath，正文插入 align。c₁、c₂ 是消费，s 是储蓄，y₁、y₂ 是收入，R 是总回报因子。两行等号应对齐并各有编号。||Load amsmath in the preamble and insert align in the body. c₁ and c₂ are consumption, s is saving, y₁ and y₂ are incomes, and R is a gross return factor. The equals signs align, with separate numbers.`,R`\begin{align}
c_1+s&=y_1\label{eq:period-one}\\
c_2&=y_2+Rs\label{eq:period-two}
\end{align}`),
 step(b`检查对齐点||Inspect the alignment points`,b`去掉第一行的 &，编译比较后恢复它。源文件里的空格不会代替对齐点；每行在相同关系符前放 & 才建立同一列。||Remove the first &, compare the compiled output, then restore it. Source spaces do not replace alignment points; matching relation positions need matching markers.`),
 step(b`去掉一个不需要的编号||Suppress an unused number`,b`若第二行不需要引用，把该行 label 改成 notag。编译后第二行仍然对齐，但编号消失；相应正文引用也要删去。||If the second row needs no reference, replace its label with notag. The row stays aligned but loses its number. Remove the corresponding prose reference too.`)
],test(b`两行需要不同编号，用 align 还是 equation 内的 aligned？||Choose align or aligned inside equation for two different row numbers?`,b`用 align，每个编号行各放一个 label。||Use align with one label per numbered row.`,b`aligned 自身不编号，外层 equation 只能提供整组的一个编号。||aligned supplies no numbers itself; the surrounding equation provides one for the block.`),[refs.math]);
upgrade('aligned',b`把短推导排成一个多行块，外层 equation 给整块一个编号。||Arrange a short derivation as a multiline block and let the outer equation number it once.`,[
 b`aligned 放在数学模式里，自己不创建显示或编号。常把它放进 equation，让多行计算共用一个编号。[t]、[c]、[b] 控制块与周围内容的垂直对齐。||aligned belongs inside math mode and creates neither a display nor a number. Inside equation, several lines share one number. [t], [c], and [b] control vertical alignment with surrounding material.`,
 b`块内用 & 对齐，双反斜杠分行。块外可放大括号、说明或另一块 aligned，适合局部组合。外层用 equation 会编号，用 \[...\] 则不编号。||Inside the block, & aligns columns and double backslashes separate rows. Delimiters, annotations, or another aligned block can sit beside it. equation supplies a number; \[...\] does not.`,
 b`aligned 整块不能跨页，每行也没有独立编号。短推导用它即可；很长的计算需要分页或逐行引用时，选顶层 align。||An aligned block cannot split across pages and its rows have no separate numbers. Use it for a short derivation, and choose top-level align when long calculations need page breaks or individual references.`
],b`把平方展开写成两行，只保留一个编号。||Write a square expansion in two rows with one number.`,[
 step(b`建立外层公式||Create the outer display`,b`导言区加载 amsmath，在正文准备 equation 与 label。这个外层负责显示位置和编号，内部再安排分行。||Load amsmath in the preamble and prepare equation with a label in the body. The outer environment handles display placement and numbering.`),
 step(b`填入两步计算||Add the calculation`,b`把 aligned 放进去。第二行直接从 & 开始，省略重复左端；编译后两个等号上下对齐。||Insert aligned. Start the second row with & to omit the repeated left side; the equals signs align vertically.`,R`\begin{equation}\label{eq:expand}
\begin{aligned}
(x+1)^2&=x^2+2x+1\\
&=x(x+2)+1.
\end{aligned}
\end{equation}`),
 step(b`比较无编号版本||Compare an unnumbered version`,b`把外层 equation 换成 \[ 和 \]，删去 label 再编译。内部对齐应保留，编号消失，这能看出两层各自的作用。||Replace the outer equation with \[ and \], remove label, and compile. Alignment stays while numbering disappears, showing the two layers' roles.`)
],test(b`给 aligned 的两行各写 label，会得到两个编号吗？||Do labels on both aligned rows create two numbers?`,b`不会，需要逐行编号时用 align。||No. Use align for row numbers.`,b`label 读取计数器，不能代替一个会逐行更新计数器的环境。||label reads a counter; it cannot replace an environment that steps that counter for each row.`),[refs.math]);
upgrade('gather-multline',b`几条独立公式各自居中用 gather；同一条长公式拆行用 multline。||Use gather for separately centered equations and multline for one long equation broken into rows.`,[
 b`gather 的每行是一条独立公式，各自居中，通常各自编号。multline 的各行属于一条公式，只用一个编号：首行靠左、末行靠右、中间行居中。它们都由 amsmath 提供。||gather centers independent equations with separate numbers by default. multline breaks one equation with one number: the first row is left-aligned, the last right-aligned, and middle rows centered. Both come from amsmath.`,
 b`gather*、multline* 取消编号。multline 没有 & 对齐列，需要逐行等号对齐时用 align。gathered 是内部形式，适合在另一层数学环境里放居中公式块。||gather* and multline* remove numbers. multline has no & alignment columns; use align for vertically aligned equals signs. gathered is an inner form for a centered block within another math context.`,
 b`名称拼作 multline，少一个 i。拆行时把完整加法项或乘法因子留在一起，选数学上易读的断点。单条推导需要关系符对齐时，用 equation 加 split 或 aligned。||Spell the name multline, without the second i. Choose readable breaks between complete terms or factors. For one derivation aligned at relations, use split or aligned inside equation.`
],b`对比两条独立公式与一条拆行公式，检查编号数量。||Compare two independent equations with one broken equation and check the number count.`,[
 step(b`先排独立两式||Set two equations`,b`导言区加载 amsmath，正文放 gather。这两式会分别居中，默认产生两个编号。||Load amsmath in the preamble and put gather in the body. These equations center separately and receive two numbers.`,R`\begin{gather}x+y=1\\x-y=0\end{gather}`),
 step(b`再排一条长式||Set a broken equation`,b`在正文另放 multline，在完整项后换行。这里 S 是八项的和，输出只用一个编号；第一行靠左，第二行靠右。||Add multline in the body, breaking after a complete term. S is the sum of eight terms. It gets one number, with the first row left and the second right.`,R`\begin{multline}
S=a_1+a_2+a_3+a_4\\
+a_5+a_6+a_7+a_8.
\end{multline}`),
 step(b`按阅读需求换结构||Choose for the reading task`,b`若你希望等号形成一列，把那组内容换成 align 并加 &。别把 & 插进 multline，它没有这种对齐列。||If equals signs should form a column, switch to align and add &. Do not insert & into multline, which has no such alignment columns.`)
],test(b`同一长式拆三行且只要一个编号，不要求等号对齐，选什么？||Which environment breaks one long equation into three rows with one number and no relation alignment?`,b`multline。||multline.`,b`各行仍是一条公式，gather 则把每行作为独立的居中公式处理。||The rows remain one equation; gather treats rows as independent centered equations.`),[refs.math]);
upgrade('split',b`一条推导写不下一行时，在 equation 内用 split 拆行并保留一个编号。||Put split inside equation to break one derivation across rows while retaining one number.`,[
 b`split 用 & 对齐一条公式的多行内容，编号由外层提供。常用结构是 equation 内只有 split 和 label；split 不能直接作为正文中的独立显示。||split aligns rows of one equation with &, while its enclosing display supplies the number. A common equation contains only split and label. split cannot be a standalone body display.`,
 b`label 放在外层 equation 内，正文就能引用完整推导。split 用于整个公式拆行；外侧还要加大括号、旁注或并排内容时，aligned 更方便组合。||Place label in the outer equation to reference the complete derivation. split handles a complete broken equation; use aligned for a block with adjacent braces, annotations, or other material.`,
 b`所有行共用外层编号。独立多式用 align，无对齐要求的长式用 multline。split 应构成外层公式的整个可见内容；需要额外可见材料时检查嵌套规则。||Rows share the outer number. Use align for independent equations and multline for a long expression without alignment. split should constitute the entire visible body of its enclosing equation; check nesting rules if other visible material is needed.`
],b`排两步平方展开，并从正文引用整条推导。||Set a two-step square expansion and reference the whole derivation.`,[
 step(b`准备一个编号||Prepare one number`,b`导言区加载 amsmath，正文用 equation 建立显示，并在外层放 label。这个编号用于整个计算。||Load amsmath in the preamble. In the body, equation establishes a display with an outer label for the whole calculation.`),
 step(b`拆开计算步骤||Break the calculation`,b`两步都放在 split 内，在等号前加 &。第二步从 & 开始，PDF 里两个等号会对齐，只出现一个编号。||Put both steps in split and place & before the equals signs. Start the second row with &. The signs align and one number appears.`,R`\begin{equation}\label{eq:square}
\begin{split}
(a+b)^2&=a^2+2ab+b^2\\
&=(b+a)^2.
\end{split}
\end{equation}`),
 step(b`验证引用||Verify the reference`,b`公式后写 \eqref{eq:square} 并编译两次。若两步要分别编号，改成 align；移动 label 并不会新增编号。||Write \eqref{eq:square} after the display and compile twice. Switch to align for separate step numbers; moving a label cannot create them.`)
],test(b`需要在对齐块外加左大括号，优先选 split 还是 aligned？||Prefer split or aligned for an alignment block with an outer left brace?`,b`aligned，并在同一数学分组里配对括号。||aligned, with paired delimiters in the same math group.`,b`split 应占外层公式的全部可见内容，aligned 可与旁边的材料组合。||split should occupy the enclosing equation's entire visible body; aligned can combine with adjacent material.`),[refs.math]);
upgrade('cases',b`分段函数左列写取值、右列写条件，cases 自动排左大括号。||Write values in the left column and conditions in the right; cases supplies the left brace.`,[
 b`加载 amsmath 后，在数学模式中用 cases。& 分开取值与条件，双反斜杠结束一段。说明词 if、otherwise 用 text，数学不等式继续写在数学模式里。||With amsmath, use cases inside math mode. & separates values and conditions, and a double backslash ends a branch. Put words such as if and otherwise in text while leaving inequalities in math mode.`,
 b`cases 默认用行内样式，大分式可能偏小。需要显示样式时显式设置，或选 mathtools 的 dcases。条件是否互斥、是否覆盖定义域仍要自己核对，排版环境不会检查这些。||cases uses text style, which can make fractions small. Request display style or use mathtools' dcases when needed. Check mutually exclusive conditions and domain coverage yourself; the environment does not validate them.`,
 b`说明文字放在 text 参数里，保留适当空格。右侧大括号可用对应接口，或用 array 加 left./right 组合；不可见的定界符仍须配对。||Put explanatory words in text and retain suitable spaces. For a right brace, use a suitable interface or an array with left./right; invisible delimiters still need partners.`
],b`写一个绝对值函数，并确认零点属于哪一段。||Write absolute value and identify the branch containing zero.`,[
 step(b`建立数学显示||Create a math display`,b`导言区加载 amsmath，正文把整个函数放进 \[...\]。cases 需要这层数学模式来排括号和单元格。||Load amsmath in the preamble and enclose the function in \[...\] in the body. cases needs this math context.`),
 step(b`填入取值和条件||Enter values and conditions`,b`第一列写 x 与 -x，第二列写不等式。text{if } 中的尾部空格把单词和条件隔开，编译后左大括号覆盖两行。||Write x and -x in the first column and inequalities in the second. The trailing space in text{if } separates the word from the condition. The brace spans both rows.`,R`\[|x|=\begin{cases}
x&\text{if }x\ge0,\\
-x&\text{if }x<0.
\end{cases}\]`),
 step(b`代入边界值||Check the boundary value`,b`在草稿里代入 x=0，第一段应给出 0。若改成 x>0 与 x<0，零点就没有定义，尽管源文件仍可能编译成功。||Substitute x=0 on paper; the first branch gives 0. Using x>0 and x<0 omits zero even though the source may compile successfully.`)
],test(b`条件 x>0 和 x<0 能覆盖所有实数吗？||Do x>0 and x<0 cover all real numbers?`,b`不能，漏掉 x=0，可把第一段改成 x≥0。||No. They omit x=0; include x≥0 in the first branch.`,b`条件是函数定义的一部分，cases 只处理排版。||Conditions belong to the function definition; cases only handles layout.`),[refs.math]);
upgrade('subequations',b`一组相关约束共享主编号；主标签引用整组，子标签引用具体公式。||Related constraints share a parent number. A parent label references the group and child labels reference individual equations.`,[
 b`subequations 给内部公式加同一主数字下的 a、b 等后缀。紧接 begin{subequations} 放主 label，再在内部每条公式放子 label，才能区分整组与单式。||subequations adds a, b, and subsequent suffixes under one parent number. Place the parent label immediately after begin{subequations}, then label individual internal equations.`,
 b`它只管理编号，不进入数学模式。内部可放 equation、align，也可在公式间放解释文字。这种结构适合把模型约束或联立方程既作为整组又作为单式引用。||It manages numbers without entering math mode. It may contain equation, align, and explanatory prose between displays. The structure lets model constraints or a simultaneous system be referenced as a group or individually.`,
 b`主标签放在组开始处才能记录主编号。放在最后一个子公式后可能记住子编号。标签键保持唯一，编译后同时核对两种引用。||The parent label belongs at the group opening to record the parent number. After the final child equation it may record a child number. Keep keys unique and inspect both reference types.`
],b`给两元系统设置三个标签，比较整组与单式编号。||Label a two-equation system and compare its parent and two child references.`,[
 step(b`先标记整组||Label the group`,b`导言区加载 amsmath，正文开始 subequations 后立即写 eq:system。这时记录的是未加字母的主编号。||Load amsmath in the preamble and place eq:system immediately after the body group opening. It records the parent number without a letter suffix.`),
 step(b`再标记各行||Label each row`,b`内部用 align 给两条方程分别加 label。编译后两行共享主数字，并分别接 a、b。||Use align inside the group and label both equations. They share a parent number with suffixes a and b.`,R`\begin{subequations}\label{eq:system}
\begin{align}
x+y&=1\label{eq:sum}\\
x-y&=0\label{eq:difference}
\end{align}
\end{subequations}`),
 step(b`读取三种编号||Retrieve all three numbers`,b`在下一句写三个 eqref，编译两次。整组引用不带字母，两个子式引用带字母；若输出相同，检查标签的位置。||Add three eqref commands in the next sentence and compile twice. The group reference has no letter; the child references do. If outputs match, inspect label placement.`,R`System~\eqref{eq:system} contains \eqref{eq:sum}
and \eqref{eq:difference}.`)
],test(b`主标签放在最后一条子式之后有什么风险？||What can go wrong if the parent label follows the final child equation?`,b`它可能引用最后的子编号。||It may reference the last child's number.`,b`label 保存当前可引用计数器值，子公式已改变这个值。||label records the current reference counter, which a child equation has changed.`),[refs.math]);
upgrade('matrices',b`先按数学含义选外括号，再用 & 分列、双反斜杠分行。||Choose matrix delimiters by mathematical meaning, then separate columns with & and rows with double backslashes.`,[
 b`matrix 不带括号；pmatrix、bmatrix、Bmatrix 分别带圆、方、花括号；vmatrix、Vmatrix 带单、双竖线。它们由 amsmath 提供，在数学模式里用 & 分列、双反斜杠分行。||matrix has no delimiters. pmatrix, bmatrix, and Bmatrix add parentheses, brackets, and braces; vmatrix and Vmatrix add single and double bars. amsmath supplies them for math mode, using & between columns and double backslashes between rows.`,
 b`矩阵列通常居中。逐列指定对齐用 array；行内小矩阵用 smallmatrix，再补外括号。大矩阵可调整 MaxMatrixCols 列数限制，但先检查页面宽度是否容得下。||Matrix columns normally center. Use array for explicit column alignment and smallmatrix with added delimiters for a small inline matrix. MaxMatrixCols adjusts the column limit, but check available page width first.`,
 b`单竖线常表示行列式，双竖线常表示范数，按对象含义选择。各行保持相同列数，额外 & 可能引起对齐诊断。矩阵过宽时，可按内容采用分块表示。||Single bars commonly denote determinants and double bars norms. Choose by meaning. Keep column counts consistent; extra & markers can cause alignment diagnostics. Consider a block representation for an overly wide matrix.`
],b`排出 2×2 矩阵，再把矩阵与行列式的写法放在一起。||Typeset a 2-by-2 matrix and compare it with its determinant notation.`,[
 step(b`安排四个元素||Arrange the entries`,b`导言区加载 amsmath，正文显示数学里写 pmatrix。两行各一个 &，输出四个元素和自动伸展的圆括号。||Load amsmath in the preamble and put pmatrix inside a body display. Each row has one &, yielding four entries and growing parentheses.`,R`\[A=\begin{pmatrix}1&2\\3&4\end{pmatrix}.\]`),
 step(b`只换外括号||Change just the delimiters`,b`把 begin 与 end 中的 pmatrix 同时改成 bmatrix，再编译。四个元素的位置应不变，外侧改成方括号。||Change pmatrix to bmatrix in both begin and end, then compile. Entries keep their positions while the delimiters become square brackets.`),
 step(b`写行列式||Write the determinant`,b`在正文另加 vmatrix，将左端写成 det A。单竖线在这里表示行列式，计算 1×4−2×3 得到 -2。||Add vmatrix in the body with det A on the left. Its single bars denote the determinant, computed as 1×4−2×3=-2.`,R`\[\det A=\begin{vmatrix}1&2\\3&4\end{vmatrix}=-2.\]`)
],test(b`普通三列矩阵每行写几个 &？||How many & markers does a normal three-column row need?`,b`两个。||Two.`,b`& 分隔相邻单元格，三个单元格只有两个分隔位置。||& separates adjacent cells. Three cells have two boundaries.`),[refs.math]);
upgrade('array-math',b`需要逐列指定对齐方式时，用数学 array 写 l、c、r 列规格。||Use math array with l, c, and r column specifications for explicit column alignment.`,[
 b`array 在数学模式里排单元格。{lcr} 依次指定左对齐、居中、右对齐，可做特殊矩阵或分段结构。外括号用 left/right 在同一个数学分组里配对。||array sets cells in math mode. {lcr} specifies left, centered, and right alignment, useful for custom matrices or cases. Pair outer left/right delimiters within the same math group.`,
 b`array 宏包扩展列格式，可在列前后插入声明。行内小矩阵也可用 smallmatrix，它不会自动加括号。段落里的矩阵尽量保持小而易读，大型结构移到行间。||The array package extends column formats with declarations before or after cells. smallmatrix is another inline option without automatic delimiters. Keep paragraph matrices small and readable; display larger structures separately.`,
 b`单元格里的说明用 text。竖线列格式和数学定界符按用途选用。arraystretch 调整行距，缩小时检查上下标是否与相邻行相碰。||Use text for explanatory words in cells. Choose column rules and mathematical delimiters for their purpose. arraystretch adjusts row spacing; check for colliding scripts when reducing it.`
],b`做一个只有左大括号的两列结构，检查列对齐和定界符配对。||Build a two-column structure with only a visible left brace and inspect alignment and delimiter pairing.`,[
 step(b`先声明两列||Specify two columns`,b`导言区加载 amsmath 以使用 text，正文显示公式里用 array{ll}。两个 l 让取值列和条件列都左对齐。||Load amsmath for text in the preamble. In a body display, array{ll} left-aligns the value and condition columns.`),
 step(b`在外层放括号||Place outer delimiters`,b`在 array 前写 left\{，后写 right.。点让右侧不显示括号，但仍完成配对；左侧大括号按两行高度伸展。||Put left\{ before array and right. after it. The dot hides the right delimiter while completing the pair; the left brace grows to the two-row height.`,R`\[g(x)=\left\{\begin{array}{ll}
x^2&\text{if }x\ge0,\\
-x&\text{if }x<0.
\end{array}\right.\]`),
 step(b`比较左右对齐||Compare alignment`,b`把 {ll} 改成 {rl} 再编译。取值列变成右对齐，条件列仍左对齐。若不需要逐列控制，简单分段函数通常直接用 cases。||Change {ll} to {rl} and compile. Values become right-aligned while conditions remain left-aligned. For a simple piecewise function without custom columns, cases is usually enough.`)
],test(b`left\{ 后只显示左括号，右侧如何结束？||How do you close left\{ when only the left brace should be visible?`,b`写 \right.。||Write \right. (a right command followed by a dot).`,b`left 和 right 必须成对，点代表不可见定界符。||left and right need matching partners; the dot means an invisible delimiter.`),[refs.math]);


upgrade('theorem-system',b`把定理、定义和证明各放进对应环境，让标题、编号和结束方块自动排好。||Use separate environments for theorems, definitions, and proofs so their headings, numbers, and end marks are handled consistently.`,[
 b`newtheorem 的第一项是环境名，第二项是读者看到的名称。定义后在正文用 begin/end 写定理，label 放在环境开始后。内核已有基础 newtheorem；amsthm 增加样式、无编号形式与 proof，和 amsmath 合用时按 AMS 手册加载在它之后。||newtheorem takes an environment name and a printed heading. Use begin/end in the body and place label after the opening. The kernel has basic newtheorem support; amsthm adds styles, unnumbered forms, and proof. Load it after amsmath when using both, as the AMS manual specifies.`,
 b`plain 通常排斜体正文，适合定理、引理和命题；definition 排正体正文，适合定义、例子和假设；remark 通常是斜体标题、正体正文。先写 theoremstyle，再定义环境，样式才会应用到新定义。||plain normally uses italic body text for theorems, lemmas, and propositions. definition uses upright bodies for definitions, examples, and assumptions. remark normally has an italic heading and upright body. Put theoremstyle before the definitions it should affect.`,
 b`定理开始处的可选参数可写名字、出处或补充标题。newtheorem* 建立无编号形式，它没有普通定理计数器，label/ref 不会给出正常定理数字。显示名称由定义决定，中文名称还需中文字体支持。||An optional argument at the theorem opening supplies a name, source, or note. newtheorem* makes an unnumbered form without a normal theorem counter, so label/ref does not yield a normal theorem number. The definition sets the heading; Chinese headings also need Chinese font support.`,
 b`proof 自动排证明标题和结束方块，可选参数可改标题。证明以行间公式结束时，在公式内合适位置放 qedhere，让方块留在最后一行；多行结构中的位置按手册与实际 PDF 检查。||proof supplies a heading and end square; an optional argument changes the heading. If a proof ends with a display, place qedhere appropriately inside it to keep the square on the final line. Check the manual and PDF for its placement in multiline structures.`,
 b`在定理开始后加 label，引用就绑定到定理；若把标签放到证明末尾，可能读到最后一条公式的编号。定理以列表开头时，检查标题与第一项的间距，再核对正文斜体、说明正体和 QED 位置。||A label after the theorem opening refers to that theorem; one at the proof end may pick up the last equation number. If a theorem starts with a list, inspect the gap after its heading, then check body italics, upright explanations, and QED placement.`,
 b`newtheoremstyle 可设置上下间距、正文和标题字体、缩进及标点。thmtools 可处理定理框、重述与元数据；Beamer 和 AMS 类也有自己的支持。先看目标文档类的接口，再选一套定理管理方式。||newtheoremstyle sets spacing, body and heading fonts, indentation, and punctuation. thmtools handles features such as boxes, restatements, and metadata; Beamer and AMS classes have their own support. Check the target class before choosing the theorem interface.`
],b`排一个可引用的定理和证明，观察两者各自的标题与结束标记。||Set a referenceable theorem and its proof, then inspect their headings and the end mark.`,[
 step(b`在导言区定义环境||Define the environment in the preamble`,b`先加载 amsmath，再加载 amsthm，最后定义 theorem。theorem 是代码中的环境名，Theorem 是输出标题，两者用途不同。||Load amsmath, then amsthm, and define theorem in the preamble. theorem names the source environment; Theorem is the printed heading.`,R`\usepackage{amsmath,amsthm}
\newtheorem{theorem}{Theorem}`),
 step(b`写一个完整命题||State a complete claim`,b`在正文插入定理。明确 x 是实数，再说它的平方非负；这是数学命题，不是宏包替你验证的事实。编号应出现在标题旁。||Insert this theorem in the body. State that x is real before claiming its square is nonnegative. This is a mathematical claim, not something the package validates. Its number appears beside the heading.`,R`\begin{theorem}\label{thm:square}
For every real number $x$, we have $x^2\ge0$.
\end{theorem}`),
 step(b`补上证明并引用||Add the proof and reference`,b`在定理后写 proof：非负数自乘非负，负数自乘也非负。编译两次后核对引用编号和证明末尾方块。||Follow the theorem with proof: the square of a nonnegative number is nonnegative, and multiplying two negative factors is also nonnegative. Compile twice and inspect the reference and final square.`,R`\begin{proof}
If $x\ge0$, both factors in $x\cdot x$ are nonnegative.
If $x<0$, their product is positive.
\end{proof}
Theorem~\ref{thm:square} gives the required sign.`)
],test(b`先定义 theorem，再写 theoremstyle{definition}，已定义的 theorem 会自动改成正体正文吗？||Does theoremstyle{definition} change an already defined theorem body to upright type?`,b`不会，它决定随后定义的环境样式。||No. It controls environments defined afterward.`,b`样式在环境定义时绑定，先后顺序会影响结果。||Styles are attached when an environment is defined, so definition order matters.`),[refs.theorem]);
upgrade('theorem-numbering',b`先决定哪些环境共享编号，再决定按节还是按章重置；两处可选参数作用不同。||Decide which environments share a counter and where it resets. The two optional argument positions serve different purposes.`,[
 b`newtheorem{theorem}{Theorem}[section] 创建按节重置的计数器。newtheorem{lemma}[theorem]{Lemma} 让引理共享它，同节可依次出现 Theorem 1.1、Lemma 1.2、Theorem 1.3。中间方括号写共享计数器名。||newtheorem{theorem}{Theorem}[section] creates a counter reset by section. newtheorem{lemma}[theorem]{Lemma} shares it, allowing Theorem 1.1, Lemma 1.2, and Theorem 1.3 in sequence. The middle brackets name the shared counter.`,
 b`newtheorem{exercise}{Exercise}[section] 另建习题计数器。同节的 Theorem 1.1 和 Exercise 1.1 可以同时存在，因为序列独立。中间可选项指定共享对象，末尾可选项指定重置依赖。||newtheorem{exercise}{Exercise}[section] creates an independent exercise counter. Theorem 1.1 and Exercise 1.1 can coexist in one section because their sequences are independent. The middle option chooses a shared counter; the final option chooses the reset dependency.`,
 b`report、book 可按 chapter 重置；article 没有 chapter 计数器，通常按 section 或全篇编号。改 thetheorem 只改变显示形式，重置关系另行设置。逐条手改计数器容易在章节重排后留下重复号。||report and book can reset by chapter; article has no chapter counter, so use section or document-wide numbering. Changing thetheorem alters its printed form, not its reset dependency. Manually setting counters item by item can leave duplicates after reordering.`,
 b`定理开始后放 label，ref 读取数字。使用 cleveref 时，先加载 amsthm、hyperref、cleveref，再定义定理环境，有助于共享计数器下保留实际环境类型，让 cref 区分 theorem 与 lemma。重置编号后也检查 PDF 锚点唯一性。||Place label after the theorem opening and use ref for its number. With cleveref, load amsthm, hyperref, and cleveref before defining environments so shared counters retain actual environment types for cref. Check PDF anchor uniqueness when counters reset.`,
 b`短论文可以让定理、引理和定义共用序列，习题另编号；长书籍常按章重置。先按期刊或学校要求定策略，再在导言区集中定义。修改后编译两次并检查正文、附录引用。||A short paper can share a sequence among theorems, lemmas, and definitions while numbering exercises separately; long books commonly reset by chapter. Choose the required policy, define it centrally in the preamble, and compile twice to check main-text and appendix references.`
],b`比较共享计数器的定理与引理，以及独立编号的习题。||Compare a theorem and lemma sharing a counter with an independently numbered exercise.`,[
 step(b`写清编号规则||Define the numbering policy`,b`在 article 导言区加载 amsthm，写这三条定义。引理的中间 [theorem] 指向现有计数器；习题末尾 [section] 给它独立的按节计数器。||Load amsthm in an article preamble and add these definitions. The lemma's middle [theorem] points to an existing counter; the exercise's final [section] creates an independent section-based one.`,R`\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{exercise}{Exercise}[section]`),
 step(b`在同一节依次调用||Use them within one section`,b`在正文加入一个 section，然后依次写 theorem、lemma、exercise。编译后应看到定理 1.1、引理 1.2、习题 1.1。示例文字只用于观察编号。||Add a section in the body, followed by theorem, lemma, and exercise. Expect Theorem 1.1, Lemma 1.2, and Exercise 1.1. The short texts here only demonstrate numbering.`,R`\section{Numbering}
\begin{theorem}A sample statement.\end{theorem}
\begin{lemma}A sample supporting statement.\end{lemma}
\begin{exercise}A sample task.\end{exercise}`),
 step(b`增加下一节||Add another section`,b`在正文继续增加 section 并调用 theorem。它应从 2.1 开始；若仍续到 1.3，检查重置选项是否放在末尾。||Add another section and a theorem. It should begin at 2.1. If it continues to 1.3, inspect the final reset option.`)
],test(b`lemma 的 [theorem] 写在显示名称前，它表示按 theorem 重置还是共享编号？||Does [theorem] before the printed lemma heading mean reset-by-theorem or counter sharing?`,b`表示共享 theorem 计数器。||It shares the theorem counter.`,b`中间可选项选共享计数器，末尾可选项才指定重置依赖。||The middle option selects a shared counter; the final one specifies the reset dependency.`),[refs.theorem]);
upgrade('mathbb',b`用黑板粗体写数集，并在首次出现时说清每个字母表示什么。||Use blackboard bold for number sets and define what each letter denotes on first use.`,[
 b`传统配置由 amsfonts 提供 mathbb，amssymb 也会加载它。标准 AMS 黑板字体主要提供大写拉丁字母，不能假设小写和数字也有相同字形。需要这些字符时另选有对应覆盖的字体方案。||In a traditional setup, amsfonts supplies mathbb and amssymb loads it too. Standard AMS blackboard fonts primarily cover uppercase Latin letters. Use a font scheme with the required coverage for lowercase letters or digits.`,
 b`R、N、Z、Q、C 常用来表示实数、自然数、整数、有理数、复数。E 和 P 是否用黑板粗体表示期望与概率，要按学科或期刊约定并保持一致，首次出现时仍要定义。||R, N, Z, Q, and C commonly denote the reals, naturals, integers, rationals, and complex numbers. Blackboard E and P for expectation and probability depend on disciplinary or journal conventions. Define them and remain consistent.`,
 b`mathcal 常表示集合族或算子，mathbf 常用于粗体向量，mathbb 选择黑板字族。字形不能替代定义。需要黑板数字或小写字母时，记录提供它们的字体或宏包依赖。||mathcal often marks families or operators, mathbf often bold vectors, and mathbb the blackboard alphabet. Glyph shape does not replace a definition. Record the font or package dependency when using blackboard digits or lowercase letters.`,
 b`unicode-math 配合 OpenType 数学字体可用 symbb，覆盖范围取决于实际字体。迁移后比较 PDF 中的字形和宽度；模板规定传统 AMS 配置时，可以沿用它。||unicode-math with an OpenType math font offers symbb, with coverage determined by the chosen font. Compare PDF glyphs and widths when migrating; retain the traditional AMS setup when a template requires it.`,
 b`mathbb 报 Undefined control sequence 时，先检查导言区是否加载 amsfonts 或 amssymb。命令已定义但某些字符不对时，再检查字体覆盖范围。||If mathbb raises Undefined control sequence, first check for amsfonts or amssymb in the preamble. If the command exists but particular characters look wrong, check font coverage.`
],b`声明实数变量和一个期望值，明确字体记号与数学含义的关系。||Declare a real variable and an expectation, making the notation meanings explicit.`,[
 step(b`加载黑板字族||Load the alphabet`,b`在导言区加入 amssymb，再在正文写 x 属于实数集。编译后 R 是黑板粗体，x 仍是普通数学变量。||Add amssymb in the preamble and state that x is real in the body. R appears in blackboard bold while x remains an ordinary math variable.`,R`\usepackage{amssymb}
% In the document body:
Let $x\in\mathbb{R}$ be a real number.`),
 step(b`说明期望记号||Define expectation notation`,b`在正文说明 X 是随机变量，mathbb{E} 表示期望，然后写 E[X]。它是记号选择，这个命令本身不会计算期望。||Explain in the prose that X is a random variable and mathbb{E} denotes expectation, then write E[X]. This chooses notation; the command does not compute expectations.`,R`For a random variable $X$, $\mathbb{E}[X]$ denotes its expectation.`),
 step(b`检查需要的字形||Check the required glyphs`,b`查看 PDF 中的 R 和 E，确认全篇含义一致。若你需要指示函数的黑板数字 1，先核对另一个字体方案的覆盖，不把 mathbb{1} 当作标准 AMS 必有字形。||Inspect R and E in the PDF and keep their meanings consistent. For a blackboard 1 as an indicator, verify an appropriate font scheme rather than assuming standard AMS fonts provide it.`)
],test(b`加载 amssymb 后，能假定 mathbb{1} 一定输出标准黑板数字 1 吗？||Can amssymb guarantee a standard blackboard digit 1 from mathbb{1}?`,b`不能，标准 AMS 黑板字体主要覆盖大写拉丁字母。||No. Standard AMS blackboard fonts primarily cover uppercase Latin letters.`,b`命令可用与所需字形存在是两个条件，要检查字体覆盖。||Command availability and glyph coverage are separate conditions.`),[refs.amsfonts]);
upgrade('mathcal',b`用书法字母区分集合族、空间或函数，并在正文定义它的含义。||Use calligraphic letters for a family, space, or function and define their meanings in the prose.`,[
 b`mathcal 是传统 LaTeX 书法字族接口，默认主要支持大写拉丁字母。F 可表示 sigma 代数，H 可表示空间，L 可表示拉格朗日函数；这些含义都由作者在正文定义。||mathcal is LaTeX's traditional calligraphic interface, primarily covering uppercase Latin letters by default. F can denote a sigma-algebra, H a space, or L a Lagrangian; the author must define these meanings.`,
 b`mathscr 通常需要 mathrsfs 等宏包，提供另一种花体，字体宏包也可能改变两者的字形。mathcal{F} 与 mathscr{F} 是否是同一个对象，要看正文定义，字体不会自动赋予含义。||mathscr usually needs a package such as mathrsfs for a different script alphabet. Font packages can change both appearances. Whether mathcal{F} and mathscr{F} denote the same object depends on the definitions, not the fonts.`,
 b`在小字号或投影中检查花体字母是否分得清。需要小写字形时核对字体覆盖。Unicode 数学的 symcal、symscr 使用实际 OpenType 字体，换配置后看 PDF 再判断效果。||Check that script letters remain distinguishable at small sizes or on slides. Verify lowercase coverage when needed. Unicode math's symcal and symscr depend on the selected OpenType font; inspect the PDF after a font change.`,
 b`上下标中的书法字母由数学脚本样式决定大小，可读性还取决于字体的小字号设计。若两个花体对象太像，换一个符号名称可能更易读。||Math script styles size calligraphic letters in subscripts and superscripts, with readability also depending on the font's small-size design. If two script objects look too similar, changing a symbol name may help.`,
 b`mathcal 在常规 LaTeX 中可用，mathscr 则需要提供它的字体方案。复制含 mathscr 的公式时，也要复制导言区依赖；未定义命令通常先从这里检查。||mathcal is available in ordinary LaTeX, while mathscr needs a supporting font scheme. Copy the preamble dependency with a mathscr formula; it is the first place to check an undefined command.`
],b`比较 mathcal 与 mathscr，并用一个明确的集合定义避免只凭字体猜含义。||Compare mathcal and mathscr and define a family explicitly rather than inferring meaning from typography.`,[
 step(b`先用内置字族||Start with the built-in alphabet`,b`在正文数学里写 mathcal{F}，并定义它为含两个集合的集合族。这里 F 是整个集合族的名称。||Write mathcal{F} in body mathematics and define it as a family containing two sets. F names the whole family.`,R`\[\mathcal{F}=\{\{1\},\{1,2\}\}.\]`),
 step(b`加入另一种花体||Add another script alphabet`,b`在导言区加载 mathrsfs，再在正文把两种 F 并排排出。编译后比较字形，不把这种区别自动当成两个不同数学对象。||Load mathrsfs in the preamble and display both F forms side by side in the body. Compare the shapes without automatically treating them as different mathematical objects.`,R`\usepackage{mathrsfs}
% In the document body:
\[\mathcal{F}\qquad\mathscr{F}\]`),
 step(b`放进上下标再检查||Inspect a script-size use`,b`在正文试排 X 的下标 F，查看缩小后是否还能识别。若辨识度差，简化符号或回到一种花体，保持已定义含义。||Try F as a subscript of X in the body and inspect its smaller size. If it is hard to identify, simplify the notation or use one script alphabet while preserving the defined meaning.`,R`\[X_{\mathcal{F}}\]`)
],test(b`mathcal{F} 与 mathscr{F} 必然表示不同对象吗？||Must mathcal{F} and mathscr{F} represent different objects?`,b`不必然，含义由正文定义。||No. The prose defines their meanings.`,b`字体只提供字形，作者决定它们是否区分对象。||Fonts supply glyphs; the author determines whether they distinguish objects.`),[refs.fonts]);
upgrade('math-alphabets',b`字体用于区分对象；多字母运算符仍要用运算符接口处理间距。||Use alphabets to distinguish objects and operator interfaces to give named operators the right spacing.`,[
 b`mathrm 是正体，mathit 是文本式数学斜体，mathbf 是粗正体，mathsf 是无衬线，mathtt 是等宽。mathfrak 需要 amsfonts 或 amssymb，常用在代数记号中；实际字形覆盖随字体变化。||mathrm is upright, mathit text-style italic, mathbf bold upright, mathsf sans serif, and mathtt monospaced. mathfrak needs amsfonts or amssymb and often appears in algebraic notation; glyph coverage depends on the font.`,
 b`一次性的多字母运算符用 operatorname，反复用的名称在导言区用 DeclareMathOperator 定义。单位可选 siunitx，说明文字用 text。字体命令只换字形，不会建立运算符间距或文本结构。||Use operatorname for an occasional named operator and DeclareMathOperator in the preamble for repeated names. siunitx can handle units; text handles explanatory words. Alphabet commands change glyphs without supplying operator spacing or text structure.`,
 b`传统 mathbf 不能让所有希腊字母或符号变粗，需按对象用 bm 或 boldsymbol。Unicode 数学采用对应 sym 接口。把字体区分控制在读者能记住的范围，并在符号说明中给出含义。||Traditional mathbf does not bold every Greek letter or symbol; use bm or boldsymbol as appropriate. Unicode math has corresponding sym interfaces. Keep font distinctions manageable and define their meanings in the notation.`
],b`区分变量字形、向量字形与一个命名运算符。||Distinguish a variable, a bold vector, and a named operator.`,[
 step(b`比较几种字族||Compare alphabets`,b`导言区加载 amssymb，正文把几种 ABC 并排排出。先看字形变化，再决定哪一种需要在你的符号约定中出现。||Load amssymb in the preamble and compare ABC in these alphabets in the body. Inspect the glyphs before deciding which distinction your notation needs.`,R`\[\mathrm{ABC}\quad\mathit{ABC}\quad\mathbf{ABC}
\quad\mathsf{ABC}\quad\mathtt{ABC}\quad\mathfrak{g}\]`),
 step(b`给向量一个明确含义||Define a vector`,b`正文说明粗体 x 是向量，再用 mathbf{x}。这种定义让读者知道粗体承担什么含义，后文保持同一写法。||State that bold x denotes a vector, then use mathbf{x}. The definition tells readers what the bold alphabet means; retain it throughout.`,R`Let $\mathbf{x}=(x_1,x_2)$ be a vector.`),
 step(b`让 rank 成为运算符||Make rank an operator`,b`导言区加载 amsmath，在正文比较 mathrm{rank}A 与 operatorname{rank}A。后者除了正体，还提供运算符间距。||Load amsmath in the preamble and compare mathrm{rank}A with operatorname{rank}A in the body. The latter provides operator spacing as well as upright letters.`,R`\[\mathrm{rank}A\qquad\operatorname{rank}A\]`)
],test(b`把 rank 写成 mathrm{rank} 就获得完整运算符结构了吗？||Does mathrm{rank} supply full operator structure?`,b`没有，使用 operatorname 或 DeclareMathOperator。||No. Use operatorname or DeclareMathOperator.`,b`字体命令改变字形，运算符接口还处理数学类别和间距。||Alphabet commands change glyphs; operator interfaces also handle math class and spacing.`),[refs.fonts,refs.math]);
upgrade('bold-math',b`拉丁向量可用 mathbf，希腊参数和更一般的符号用 bm 或 boldsymbol。||Use mathbf for Latin vectors and bm or boldsymbol for Greek parameters and more general symbols.`,[
 b`传统 mathbf 选择粗正体拉丁字族，常用于向量，却通常不能加粗 alpha。amsmath 会加载 amsbsy 并提供 boldsymbol；独立的 bm 宏包处理更一般的数学对象。||Traditional mathbf selects a bold upright Latin alphabet, often for vectors, but usually does not bold alpha. amsmath loads amsbsy for boldsymbol; the separate bm package handles more general math objects.`,
 b`把重复记号定义成语义宏，例如 vect 用 bm 排向量，整篇调用同一个接口。bm 保留数学符号类别，适合公式内部；普通正文的粗体仍用文本命令。||Define repeated notation with semantic macros, such as vect using bm for vectors, and use the same interface throughout. bm retains math symbol classes inside formulas; use text bold commands for ordinary prose.`,
 b`有些字体没有真正的粗体字形，编译可能替代，需看 PDF 和日志。unicode-math 可用 symbf、symbfit 等接口。粗体是正体还是斜体，也属于需要明确的符号约定。||Some fonts lack genuine bold glyphs, so inspect the PDF and log for substitutions. unicode-math offers symbf, symbfit, and related interfaces. Specify whether your bold notation is upright or italic.`
],b`排出粗体拉丁向量和希腊参数，检查它们是否真的变粗。||Set a bold Latin vector and Greek parameter, then inspect whether both are bold.`,[
 step(b`准备符号依赖||Prepare symbol support`,b`在导言区加载 amsmath 和 bm。正文先写 mathbf{x} 与 bm{alpha}；这里粗体 x 表示向量，粗体 alpha 表示参数向量。||Load amsmath and bm in the preamble. In the body, use mathbf{x} and bm{alpha}; here they denote a data vector and a parameter vector.`,R`\usepackage{amsmath,bm}
% In the document body:
\[\mathbf{x}\qquad\bm{\alpha}\]`),
 step(b`做一个字形比较||Compare the glyphs`,b`正文把普通 alpha、mathbf{alpha} 和 bm{alpha} 并排排出。传统字体配置下，检查前两项是否相同、第三项是否更粗。||Display plain alpha, mathbf{alpha}, and bm{alpha} together. In a traditional font setup, check whether the first two look alike and the third is bold.`,R`\[\alpha\qquad\mathbf{\alpha}\qquad\bm{\alpha}\]`),
 step(b`集中定义记号||Centralize the notation`,b`导言区定义 AtelierVect，后文统一调用它。将来改向量的字体时只改这一个定义，再检查字形和数学间距。||Define AtelierVect in the preamble and use it throughout. Change this one definition when adjusting vector typography, then inspect glyphs and mathematical spacing.`,R`\newcommand{\AtelierVect}[1]{\bm{#1}}
% In the document body:
\[\AtelierVect{x}+\AtelierVect{\alpha}\]`)
],test(b`传统配置下，mathbf{alpha} 是可靠的粗体希腊字母接口吗？||Is mathbf{alpha} a reliable bold-Greek interface in a traditional setup?`,b`不是，应使用 bm{alpha} 或 boldsymbol{alpha}。||No. Use bm{alpha} or boldsymbol{alpha}.`,b`mathbf 选择一个数学字族，不会让它覆盖不到的希腊字母自动变粗。||mathbf selects an alphabet rather than automatically bolding Greek glyphs outside its coverage.`),[refs.bm,refs.math]);
upgrade('text-operators',b`条件说明用 text，命名运算符用 operatorname 或 DeclareMathOperator。||Use text for condition words and operatorname or DeclareMathOperator for named operators.`,[
 b`amsmath 的 text 在数学模式中插入正文片段，并随上下标大小调整。分段函数中的 if、otherwise 或中文说明适合它，必要空格放在参数内部。||amsmath's text inserts prose inside mathematics and adjusts to script size. Use it for words such as if or otherwise in cases, or Chinese explanations when supported. Put needed spaces inside its argument.`,
 b`偶尔用 rank 时写 operatorname{rank}；反复用方差时，在导言区写 DeclareMathOperator{\Var}{Var}。星号形式让显示数学中的下标像 lim 那样放在运算符下方。||Write operatorname{rank} for an occasional rank operator. For repeated variance notation, define DeclareMathOperator{\Var}{Var} in the preamble. The starred form puts display subscripts below the operator, as with lim.`,
 b`裸写 sin x 会把 sin 排成三个变量，使用内置 sin 命令。mathrm{rank} 只改字形，没有相同运算符间距。单位和统计记号按明确约定选择接口，避免只凭外观拼字母。||Bare sin x sets sin as three variables; use the built-in sin command. mathrm{rank} changes letters without supplying the same operator spacing. Choose unit and statistical notation through explicit conventions.`
],b`给条件保留正文样式，并定义一个可反复使用的方差运算符。||Preserve text typography in a condition and define a reusable variance operator.`,[
 step(b`先排条件中的文字||Set condition words`,b`导言区加载 amsmath，正文公式里把 if 放到 text 参数，x>0 留在数学模式。编译后 if 应是正文形态，x 是数学变量。||Load amsmath in the preamble. In the body formula, put if inside text and keep x>0 in math mode. if uses prose typography; x remains a math variable.`,R`\[f(x)=x^2\quad\text{if }x>0.\]`),
 step(b`在导言区定义运算符||Define an operator in the preamble`,b`添加 Var 定义，正文说明 X 为随机变量，Var(X) 表示其方差。命令给名称与后面的 X 安排运算符间距。||Add the Var definition in the preamble and explain that Var(X) denotes the variance of a random variable X. The command gives the name operator spacing before X.`,R`\DeclareMathOperator{\Var}{Var}
% In the document body:
For a random variable $X$, $\Var(X)$ denotes its variance.`),
 step(b`比较内置与裸写形式||Compare named and bare forms`,b`正文并排写 sin x 与 \sin x 再编译。裸写的三个字母是变量，内置命令是一个正体运算符；选后者表达正弦。||Compare sin x and \sin x in the body. The bare letters are variables; the command is an upright operator. Use the command for the sine function.`,R`\[sin x\qquad\sin x\]`)
],test(b`同一个 Var 在全文出现多次，用哪种接口集中定义？||Which interface centralizes a repeatedly used Var operator?`,b`导言区用 DeclareMathOperator{\Var}{Var}。||Use DeclareMathOperator{\Var}{Var} in the preamble.`,b`命名一次即可复用，字体与运算符间距也保持一致。||A single definition keeps its font and operator spacing consistent across uses.`),[refs.math]);
upgrade('math-symbols',b`按数学含义选关系、运算和重音；字体、括号与间距都要服务于已定义的记号。||Choose relations, operations, and accents by mathematical meaning; typography and spacing support the defined notation.`,[
 b`le、in、subseteq 是关系符，TeX 会处理两侧关系间距；times、cap 是二元运算符。新关系用 mathrel，新二元运算用 mathbin。命名运算符用 operatorname{Var}(X)，同时获得正体与运算符间距。||le, in, and subseteq are relations with relation spacing; times and cap are binary operators. Use mathrel for a custom relation and mathbin for a custom binary operation. operatorname{Var}(X) supplies upright letters and operator spacing.`,
 b`epsilon 与 varepsilon、phi 与 varphi 是不同字形，全文固定选择。传统配置中，与拉丁字母形似的希腊大写常直接写 A、B 等，没有 Alpha 命令。mathbb{E}、mathbb{P} 常表示期望和概率；beta 也可能有不同学科含义，正文应定义。||epsilon/varepsilon and phi/varphi are different glyph forms; keep the choice consistent. Traditional setups use A, B, and similar letters for Greek capitals that resemble Latin letters, without an Alpha command. mathbb{E} and mathbb{P} commonly denote expectation and probability; define beta and other field-dependent symbols in the prose.`,
 b`单字母可用 hat{x}、vec{x}，宽内容可用 widehat{ABC}、overline{AB}。left/right 要在同一数学分组里配对；跨行时常用 bigl/bigr 统一大小。逗号列表用 ldots，乘加序列用 cdots，矩阵延续用 vdots、ddots。网页由 MathJax 渲染，PDF 字形由 TeX 字体决定。||Use hat{x} or vec{x} for a single letter and widehat{ABC} or overline{AB} for wider content. Pair left/right within one math group; bigl/bigr can keep delimiters consistent across rows. Use ldots for comma lists, cdots for products or sums, and vdots/ddots in matrices. MathJax renders the web view; TeX fonts determine PDF glyphs.`
],b`排一段符号说明，并区分下标、估计记号与省略号。||Set a notation statement and distinguish subscripts, estimator accents, and ellipses.`,[
 step(b`先解释符号||Define the symbols first`,b`在正文说明 xᵢ 是第 i 个观测值，n 是观测个数，hat{x} 在此表示样本均值。加载 amsmath 后排公式，读者就能对应每个位置。||Explain that xᵢ is observation i, n the observation count, and hat{x} the sample mean in this example. Load amsmath and set the formula so every position has a defined role.`,R`\[\hat{x}=\frac{1}{n}\sum_{i=1}^{n}x_i.\]`),
 step(b`按序列选择省略号||Choose an ellipsis for the sequence`,b`正文分别写逗号列表与加法序列。前者用 ldots，后者用 cdots；编译后看省略号与逗号、加号的高度是否协调。||Set a comma list and an addition sequence in the body. Use ldots for the first and cdots for the second, then inspect their heights relative to commas and plus signs.`,R`\[x_1,x_2,\ldots,x_n\qquad
x_1+x_2+\cdots+x_n\]`),
 step(b`检查分组和显示||Check grouping and output`,b`公式需要放大括号时，先确保 left 与 right 在同一行和分组。多行公式要统一大小时可改用 bigl、bigr，再检查 PDF；网页预览不能替代完整 TeX 编译。||For growing delimiters, keep left and right in the same row and group. For consistent delimiters across rows, consider bigl and bigr and inspect the PDF. A web preview does not replace a complete TeX compilation.`)
],test(b`在 align 第一行写 left(，第二行才写 right)，可以配成一对吗？||Can left( in one align row pair with right) in the next?`,b`不能直接跨行配对；可用 bigl(、bigr) 等手工大小。||They cannot pair directly across rows. Use fixed sizes such as bigl( and bigr).`,b`各行有自己的数学分组，left/right 必须在同一个分组内配对。||Rows have separate math groups, while left/right need partners within one group.`),[refs.math]);


upgrade('programming-newcommand',b`重复出现的记号定义一次；参数、适用模式和依赖也一起写清。||Define repeated notation once, including its arguments, math or text mode, and dependencies.`,[
 b`newcommand 的可选数字是参数总数，定义体用 #1 到 #9 取参数。再给默认值时，第一个参数变成可选参数。norm 接一个必选参数，note 接一个默认 Note 的标签和一个必选内容；note[Input]{...} 改掉默认标签。||The optional number in newcommand is the total argument count, and #1 through #9 refer to those arguments. A following default makes the first argument optional. norm has one mandatory argument; note has a label defaulting to Note and mandatory content. note[Input]{...} replaces the label.`,
 b`newcommand 创建新命令，renewcommand 替换已有定义，providecommand 仅在未定义时创建。改写标准命令可能影响宏包内部，项目命令最好带清楚的前缀。||newcommand creates a new command, renewcommand replaces an existing definition, and providecommand defines only when absent. Changing a standard command can affect package internals, so give project commands a clear prefix.`,
 b`norm 中的 lVert/rVert 需要 amsmath，调用也要在数学模式里。ensuremath 可给单一数学记号提供正文接口，完整句子仍按文本排。按含义命名宏，例如 ExpectedValue，让调用处看得懂用途。||The lVert/rVert commands used by norm need amsmath and a math context. ensuremath can give one math notation a text interface; full sentences remain text. Name commands by meaning, such as ExpectedValue, so their uses are understandable.`,
 b`在一个宏定义里再定义或映射参数，内层参数符号需写成 ##1，让外层先读过一次。分组内的普通定义在组结束后失效。先在短完整文档里试参数，再移进共享 sty 文件。||When a macro defines or maps another parameterized command, write the inner marker as ##1 so the outer definition reads it once. Ordinary definitions inside a group disappear at its end. Test arguments in a short complete document before moving them into a shared sty file.`,
 b`共享命令要记录参数、模式和依赖，实现更换字体或宏包时也保留用户接口含义。选择未占用的项目名称，避免覆盖已有重音或数学符号命令。||Document arguments, mode, and dependencies for shared commands. Preserve the user interface's meaning when changing fonts or packages internally. Choose unused project names and keep existing accent and symbol commands intact.`
],b`做一个带参数的范数宏和一个带默认标签的说明宏。||Create a parameterized norm command and a note command with a default label.`,[
 step(b`把定义放在导言区||Put definitions in the preamble`,b`加载 amsmath 后定义两个 Atelier 命令。Norm 的 #1 接对象；Note 的 #1 是可选标签，#2 是内容，所以参数总数写 2。||Load amsmath and define the two Atelier commands in the preamble. Norm's #1 is its object. Note's #1 is an optional label and #2 its content, so the total count is 2.`,R`\usepackage{amsmath}
\newcommand{\AtelierNorm}[1]{\lVert #1\rVert}
\newcommand{\AtelierNote}[2][Note]{\textbf{#1:} #2}`),
 step(b`在对应模式下调用||Call in the right mode`,b`正文里把 Norm 放在数学定界符内，把 Note 留在普通文字里。编译后会得到范数双竖线，以及一个默认标签和一个 Input 标签。||Call Norm inside math delimiters in the body and Note in ordinary text. The PDF shows norm bars, a default label, and an overridden Input label.`,R`\[\AtelierNorm{x+y}\]
\AtelierNote{Use the same notation throughout.}

\AtelierNote[Input]{The argument is a vector.}`),
 step(b`改变参数再检查||Change the arguments and inspect`,b`把 x+y 换成 x_1，不改宏定义；再把 Note 的默认 Note 换成 Reminder。重新编译时，所有未显式给标签的调用会更新，Input 调用保持自选标签。||Replace x+y with x_1 without editing the definition. Then change Note's default from Note to Reminder. Unspecified labels update on compilation, while the Input call retains its chosen label.`)
],test(b`\newcommand{\AtelierNote}[2][Note]{...} 中，第一个必选内容用 #1 还是 #2？||In \newcommand{\AtelierNote}[2][Note]{...}, is the mandatory content #1 or #2?`,b`#2，#1 是有默认值的可选标签。||#2; #1 is the optional label with a default.`,b`可选参数也计入参数总数，定义体按读取顺序编号。||Optional arguments count toward the total and are numbered in reading order.`),[refs.author]);
upgrade('programming-document-commands',b`用明确的参数规范读取星号、默认标签和正文，再分别处理它们。||Use an explicit argument signature to read a star, default label, and content, then handle each deliberately.`,[
 b`m 读取必选参数，o 读取无默认值的可选参数，O{default} 读取带默认值的可选参数，s 检测星号。现代 LaTeX 内核提供 NewDocumentCommand；较旧格式用 xparse 提供相应接口。||m reads a mandatory argument, o an optional argument without a default, O{default} an optional argument with a default, and s a star. Modern LaTeX provides NewDocumentCommand in the kernel; older formats use xparse for the interface.`,
 b`IfBooleanTF 检查 s 的布尔结果，IfNoValueTF 检查 o 是否缺省。缺省的 o 是特殊标记，不能当普通空文本排出来。RenewDocumentCommand 与 ProvideDocumentCommand 分别处理重定义和仅缺省时定义。||IfBooleanTF tests the boolean from s; IfNoValueTF tests whether o was omitted. An omitted o is a special marker, not ordinary empty text. RenewDocumentCommand and ProvideDocumentCommand handle replacement and definition only when absent.`,
 b`接口先读取文档参数，内部函数再处理内容。只有一个简单参数时保持简单签名；参数需要容纳空行或多段文字时，使用相应长参数修饰并实际测试。||Let the document interface read arguments and internal functions process them. Keep a simple one-argument command simple. If an argument must accept blank lines or paragraphs, use the appropriate long-argument modifier and test it.`
],b`写一个可带星号、可改标签的说明命令，明确每个参数的编号。||Write a notice with a star and customizable label, identifying each argument position.`,[
 step(b`读懂参数顺序||Read the argument order`,b`在导言区定义 AtelierNotice，规范 s O{Note} m 依次对应 #1 星号状态、#2 标签、#3 内容。IfBooleanTF 用星号选择粗体或斜体标签。||Define AtelierNotice in the preamble. s O{Note} m gives #1 the star state, #2 the label, and #3 the content. IfBooleanTF selects a bold or italic label from the star state.`,R`\NewDocumentCommand{\AtelierNotice}{s O{Note} m}{%
\IfBooleanTF{#1}{\textbf{#2:}}{\textit{#2:}} #3}`),
 step(b`在正文试两种调用||Try two calls in the body`,b`普通调用省略星号和标签，输出斜体 Note；带星号并给 Tip 时，输出粗体 Tip。两次的正文内容都来自必选参数。||The ordinary call omits both star and label and prints italic Note. The starred call with Tip prints bold Tip. Both take their content from the mandatory argument.`,R`\AtelierNotice{Keep the argument short.}

\AtelierNotice*[Tip]{The star changes the label style.}`),
 step(b`区分缺省和空值||Distinguish omitted and empty values`,b`若改用 o 读取可选标签，先用 IfNoValueTF 判断是否缺省，再安排默认分支。测试不写方括号与写 [] 两种调用，它们不等同。||If you switch to o for the label, test omission with IfNoValueTF before choosing the default branch. Try both an absent option and []; they are distinct cases.`)
],test(b`规范 s O{Note} m 中的内容参数是 #几？||Which argument number holds content in s O{Note} m?`,b`#3。||#3.`,b`星号状态和可选标签都占一个参数位置，必选内容排在第三。||The star state and optional label each occupy a position, so the mandatory content is third.`),[refs.author]);
upgrade('programming-expl3',b`先把文档接口写清，再用带模块前缀的 expl3 函数处理数据。||Keep the document interface clear and process its data with module-prefixed expl3 functions.`,[
 b`ExplSyntaxOn 允许下划线和冒号进入命令名，并改变空格读取；ExplSyntaxOff 恢复普通规则。函数名带模块前缀，变量名 l/g 表示局部或全局约定，tl、int、seq 等后缀说明类型。||ExplSyntaxOn permits underscores and colons in command names and changes space handling; ExplSyntaxOff restores normal syntax. Prefix function names with a module name. Variable names conventionally use l/g for local/global and tl, int, seq, and other type suffixes.`,
 b`冒号后的 N 接单个不带花括号的 token，n 接不展开的花括号内容，V 取变量值，e 按规则展开。签名属于函数接口，不可随意换字母后假定变体存在。||After the colon, N takes one unbraced token, n a braced unexpanded argument, V a variable's value, and e an expanded argument. Signatures belong to function interfaces; changing a letter does not guarantee that variant exists.`,
 b`clist_map_inline:nn 对逗号列表逐项执行代码。在另一个函数定义内写映射时，用 ##1 引用当前元素。外部读者仍调用普通 AtelierList{...}，内部语法留在实现中。||clist_map_inline:nn runs code on each item of a comma list. Inside another function definition, ##1 denotes the mapped item. Users still call an ordinary AtelierList{...} command, leaving internal syntax in the implementation.`,
 b`cs_new_protected:Npn 适合含赋值或排版的函数，纯展开计算则选手册标为可展开的接口。这里的 protected 控制 TeX 在特定上下文中的展开行为，不是安全沙箱机制。||cs_new_protected:Npn suits functions with assignments or typesetting. For expansion-only computation, use interfaces documented as expandable. protected controls TeX expansion in specific contexts; it is not a security sandbox.`,
 b`从 tl、int、clist 开始，按需要再读 seq、prop、keys、message。interface3 记录公开接口，双下划线函数属于可能变化的内部实现。用短完整测试检查作用域和参数类型。||Begin with tl, int, and clist, then study seq, prop, keys, and message as needed. interface3 documents public interfaces; double-underscore functions are internal and may change. Test scope and argument types in short complete documents.`
],b`把逗号列表变成正文列表，分清外层参数与逐项映射参数。||Turn a comma list into a document list and distinguish outer and mapped arguments.`,[
 step(b`定义内部函数||Define the internal function`,b`在导言区打开 expl3 语法。atelier_items:n 的 #1 是整份逗号列表，映射代码里的 ##1 是当前元素；双写 # 让外层定义先读取一次。||Open expl3 syntax in the preamble. atelier_items:n receives the full comma list as #1; ##1 in the mapping code refers to its current item. Doubling # lets the outer definition read it once.`,R`\ExplSyntaxOn
\cs_new_protected:Npn \atelier_items:n #1
 {
  \begin{itemize}
  \clist_map_inline:nn {#1} {\item ##1}
  \end{itemize}
 }
\NewDocumentCommand{\AtelierItems}{m}{\atelier_items:n {#1}}
\ExplSyntaxOff`),
 step(b`使用普通文档接口||Use the document interface`,b`在正文调用 AtelierItems，传入三个逗号分隔的词。编译后应是三项列表，使用者无需输入内部冒号函数。||Call AtelierItems with three comma-separated words in the body. The output is a three-item list, without exposing the colon function in the document interface.`,R`\AtelierItems{Input,Calculation,Output}`),
 step(b`做一个最小变式||Try a minimal variation`,b`在正文调用中删除 Calculation 再编译，列表应变成两项。出现参数号错误时，回到内层映射，检查 ##1 是否误写成 #1。||Remove Calculation from the body call and compile; the list should contain two items. If a parameter-number error occurs, check whether the inner ##1 was accidentally written as #1.`)
],test(b`这里整份列表是 #1，当前列表元素为什么要写 ##1？||Why is the current mapped item ##1 while the whole list is #1?`,b`映射写在外层函数定义内部，需要让内层参数标记保留到映射时。||The mapping is inside an outer function definition, so its parameter marker must survive until mapping.`,b`外层定义读取一次 #，双写让内层得到它自己的 #1。||The outer definition reads # once; doubling it leaves the inner mapping its own #1.`),[refs.expl3,refs.author]);
upgrade('tikz-paths',b`一条路径先写坐标和连接方式，再选线型；末尾分号结束这次绘图。||Write coordinates and connections, choose the style, and end the path with a semicolon.`,[
 b`draw 描边，fill 填充，filldraw 同时做两者，每条路径以分号结束。-- 连接直线，.. controls .. 描述贝塞尔曲线，cycle 把路径闭合。||draw strokes a path, fill fills it, and filldraw does both. End each path with a semicolon. -- joins line segments, .. controls .. describes a Bézier curve, and cycle closes the path.`,
 b`默认 (2,1) 用 x、y 单位向量定位，通常相当于厘米；也可写明确尺寸或极坐标。scope 中的 shift、rotate、scale 局部变换图形，scale 通常不缩放节点文字。||By default, (2,1) uses the x and y basis vectors, usually in centimeters. Explicit dimensions and polar coordinates are available. shift, rotate, and scale in a scope transform locally; scale normally leaves node text unchanged.`,
 b`arrows.meta 提供 Stealth 等箭头。简单 TikZ 可用主流 PDF 引擎编译，不需要外部图片。缺分号时，报错可能落在后面的节点，先检查第一条未结束的路径。||arrows.meta provides tips such as Stealth. Basic TikZ works with the main PDF engines without external images. A missing semicolon can produce an error at a later node, so inspect the first unfinished path.`
],b`从原点画一支箭头，并在终点加标记。||Draw an arrow from the origin and mark its endpoint.`,[
 step(b`准备绘图依赖||Prepare drawing support`,b`在导言区加载 tikz 和 arrows.meta。正文的 tikzpicture 是图形容器，内部坐标与路径都写在其中。||Load tikz and arrows.meta in the preamble. tikzpicture is the body container for the coordinates and paths.`,R`\usepackage{tikz}
\usetikzlibrary{arrows.meta}`),
 step(b`画箭头和终点||Draw the arrow and endpoint`,b`在正文插入图。箭头从 (0,0) 到 (2,1)，终点用一个小圆标出。每条命令单独用分号结束，便于检查。||Insert this picture in the body. The arrow runs from (0,0) to (2,1), with a small circle at its endpoint. End each command separately with a semicolon for easier checking.`,R`\begin{tikzpicture}
\draw[-{Stealth},thick] (0,0)--(2,1);
\fill (2,1) circle[radius=2pt];
\end{tikzpicture}`),
 step(b`同时移动端点||Move both endpoint uses`,b`把终点改成 (3,1)，箭头与小圆中的坐标都要改。编译后确认标记仍在箭头终点；只改一处会让两者分开。||Change the endpoint to (3,1) in both the arrow and the circle. Check that the mark stays at the arrow tip after compilation; editing only one separates them.`)
],test(b`第二个 draw 报路径错误，为什么还要检查前一个 draw？||Why inspect the preceding draw when the second one reports a path error?`,b`前一条路径可能少了分号，把后面的命令读进去了。||The previous path may lack a semicolon and absorb the later command.`,b`报错位置是发现问题的位置，不一定是最早写错的位置。||The reported position is where TeX notices the problem, not always where it began.`),[refs.tikz]);
upgrade('pgfplots-axis',b`先定义坐标轴与范围，再添加曲线；图中的每个轴标题都要说明量的含义。||Define the axes and ranges before plotting, and make each axis label explain its quantity.`,[
 b`axis 放在 tikzpicture 内。width、height 设尺寸，xlabel、ylabel 设轴标题，xmin/xmax 等设范围。普通尺寸会计入轴外标签，scale only axis 只按绘图区设置尺寸。||Place axis inside tikzpicture. width and height set dimensions, xlabel and ylabel set labels, and xmin/xmax and related keys set ranges. Ordinary dimensions account for outer labels; scale only axis applies them to the plotting area alone.`,
 b`addplot 可读表达式、coordinates 或 table。表达式写 x，不是普通 TikZ 循环变量 \x。每条图线以分号结束；addplot+ 把给定选项加在默认循环样式上。||addplot accepts an expression, coordinates, or a table. Write x in an expression rather than the ordinary TikZ loop variable \x. End each plot with a semicolon; addplot+ adds options to the default cycle style.`,
 b`compat 固定兼容行为，减少默认设置变化对图形的影响。例子以 1.18 为行为基线，安装的宏包可以更新。升级时比较范围、刻度和标签位置，再决定是否调整基线。||compat fixes a behavior level to reduce changes from defaults. The examples use behavior level 1.18; the installed package may be newer. Compare ranges, ticks, and label placement before adjusting this baseline.`,
 b`axis cs: 解释数据坐标，rel axis cs: 解释绘图区相对坐标。边界外的注释需要检查裁剪和范围，并确认重要观测仍完整显示。||axis cs: interprets data coordinates and rel axis cs: plotting-area-relative coordinates. For annotations outside the border, inspect clipping and ranges while keeping relevant observations visible.`,
 b`semilogxaxis、semilogyaxis、loglogaxis 分别变换一个或两个轴。对数轴不能直接显示零或负值，处理这些数据要依据研究定义。图注说明是坐标轴用对数刻度，还是输入数据已取对数。||semilogxaxis, semilogyaxis, and loglogaxis transform one or both axes. A logarithmic axis cannot directly display zero or negative values; handle them according to the research definition. Explain whether the axis is logarithmic or the input data already logged.`
],b`画出 y=x²，明确轴、范围和函数表达式各在哪一层。||Plot y=x² and identify the roles of axes, range, and function expression.`,[
 step(b`设置宏包和行为基线||Set the package and behavior level`,b`导言区加载 pgfplots，设 compat=1.18。这里画的是函数例子，横轴 x 是输入值、纵轴 y 是它的平方，没有实测数据。||Load pgfplots in the preamble with compat=1.18. This is a function example: x is the input and y its square, without measured data.`,R`\usepackage{pgfplots}
\pgfplotsset{compat=1.18}`),
 step(b`在坐标轴中添加函数||Add the function inside the axis`,b`正文依次套 tikzpicture、axis，再写 addplot。domain 指定取样区间，表达式用 x；编译后抛物线应经过原点并关于纵轴对称。||In the body, nest axis inside tikzpicture and place addplot inside axis. domain sets the sampling interval and the expression uses x. The parabola passes through the origin and is symmetric about the vertical axis.`,R`\begin{tikzpicture}
\begin{axis}[width=7cm,height=5cm,xlabel={$x$},ylabel={$y$}]
\addplot[domain=-2:2,samples=81]{x^2};
\end{axis}
\end{tikzpicture}`),
 step(b`检查范围和注释||Inspect range and annotations`,b`在 axis 选项里加入 xmin=-2,xmax=2，把下面的注释放在 addplot 后、end{axis} 前。编译后确认原点标签可见，轴标题未遮挡曲线。||Set xmin=-2,xmax=2 in the axis options and put the annotation below after addplot and before end{axis}. Check that its origin label is visible and axis labels do not overlap the curve.`,R`\node[above right] at (axis cs:0,0) {$y=0$};`)
],test(b`addplot 的函数表达式写 x^2 还是 \x^2？||Should an addplot expression use x^2 or \x^2?`,b`x^2。||x^2.`,b`表达式解析器把 x 当自变量，\x 属于另一种 TikZ 命令变量用法。||The expression parser uses x as its variable; \x belongs to another TikZ command-variable convention.`),[refs.axis,refs.plot]);
upgrade('standalone',b`把可复用图形编成独立 PDF，页面裁到内容附近，主文档再插入。||Compile a reusable figure as a separate cropped PDF and include it in the main document.`,[
 b`standalone 可把图形或公式编成裁剪到内容边界的 PDF。tikz 选项加载并识别 TikZ 图形，border 留出边缘空白，适合复用矢量图和论文插图。||standalone compiles a figure or formula into a PDF cropped near its content. The tikz option loads and recognizes TikZ pictures; border adds padding for reusable vector graphics and paper figures.`,
 b`独立公式用行内数学或适当预览环境，避免依赖普通文章页宽。主文档可用 graphicx 插入现成 PDF，也可用 standalone 宏包的 includestandalone 接口。||Use inline math or a suitable preview environment for standalone formulas, independent of article page width. The main document may include the existing PDF with graphicx or use the standalone package's includestandalone interface.`,
 b`普通独立 PDF 可直接编译；转换 PNG/SVG 或自动重建子文件可能需要外部程序与 shell escape。裁剪不对时检查 preview、multi 和多段落内容。长文本仍用按页组织的文档类。||An ordinary standalone PDF compiles directly. PNG/SVG conversion or automatic subfile rebuilding may require external programs and shell escape. Inspect preview, multi, and paragraph content if cropping fails; use a page-oriented class for long text.`,
 b`独立公式可直接放在正文，由预览机制裁剪。多个 tikzpicture 或对象是否分成多页由 multi 等设置决定，空行不保证新输出页面。||A standalone formula can sit directly in the body and be cropped by the preview mechanism. Options such as multi govern multiple-object pages; blank lines do not guarantee new output pages.`,
 b`插入预先编译的 PDF 可固定图形产物并减少主文档编译量。输入图源可统一字体与宏，但主导言区要具备图形依赖。共享项目先约定一种复用路径，并记录工具链。||Including a precompiled PDF fixes the figure artifact and reduces main-document work. Inputting source unifies fonts and macros but requires drawing dependencies in the main preamble. Agree on a reuse workflow and record its toolchain.`
],b`独立编译一张箭头图，并理解它与主文档之间的文件关系。||Compile an arrow figure separately and understand its relationship to the main document.`,[
 step(b`另建一个图源文件||Create a separate figure source`,b`新建 arrow.tex，把完整示例存进去。standalone 是这个文件自己的文档类，border=5pt 为箭头边缘留空白。||Save this complete example as arrow.tex. standalone is this file's document class, and border=5pt adds space around the arrow.`,R`\documentclass[tikz,border=5pt]{standalone}
\begin{document}
\begin{tikzpicture}
\draw[->,thick] (0,0)--(2,1);
\end{tikzpicture}
\end{document}`),
 step(b`单独编译并看边界||Compile and inspect the crop`,b`用 pdfLaTeX 编译 arrow.tex，打开 arrow.pdf。页面应只围着图形并保留设定空白；这一步不需要外部图片或自动转换。||Compile arrow.tex with pdfLaTeX and open arrow.pdf. The page should surround the drawing with the configured padding. This step needs no external image or automatic conversion.`),
 step(b`在主文件中插入产物||Include the artifact in the main file`,b`把 arrow.pdf 放到主文件可找到的位置，主导言区加载 graphicx，正文写 includegraphics。路径要对应实际文件，先有图形 PDF 再编主文档。||Put arrow.pdf where the main document can find it, load graphicx in its preamble, and use includegraphics in its body. Match the actual path and compile the figure before the main file.`,R`\usepackage{graphicx}
% In the main document body:
\includegraphics[width=5cm]{arrow.pdf}`)
],test(b`在 standalone 图源里插一个空行，能保证两个图各自占一页吗？||Does a blank line in a standalone source guarantee one page per picture?`,b`不能，要检查 multi 等多对象输出设置。||No. Check multi and the multiple-object output settings.`,b`源文件空行组织段落，多对象页面由类的预览与输出设置控制。||Blank lines organize paragraphs; preview and output settings control pages for multiple objects.`),[refs.standalone]);


const option=(text,why)=>({text,why});
function exercise(id,module,type,title,question,options,answer,explain,related,code){
 D.exercises.push({id:'exercise-guided-math-'+id,module,type,title,question,
  options:options.map(o=>o.text),wrong:options.map(o=>o.why),answer,explain,related,...(code?{code}:{})});
}
exercise('one-number','math-environments','scenario',
 b`给整条推导一个编号||One number for a derivation`,
 b`你要展示两行利润展开，并在下一段只引用整条推导。等号需要对齐，哪种结构直接满足要求？||You need two aligned rows expanding profit and one reference to the whole derivation. Which structure fits?`,[
 option(b`equation 内放 aligned||aligned inside equation`,b`aligned 安排两行，equation 给整块一个编号。||aligned arranges the rows; equation gives the block one number.`),
 option(b`两个 equation||Two equation environments`,b`两个环境会各自更新编号，无法直接成为一个公式对象。||Two environments step the counter separately instead of creating one reference target.`),
 option(b`直接用 align 并给每行 label||align with a label on each row`,b`这会逐行编号，符合两条独立引用而非此处整组单号的需求。||This numbers the rows individually for separate references rather than the requested single number.`),
 option(b`用普通段落中的换行符||Row breaks in ordinary prose`,b`正文换行不会建立显示数学、等号对齐和公式编号。||Prose row breaks do not create display math, relation alignment, or equation numbering.`)
 ],0,b`外层 equation 建立可引用的编号对象，内层 aligned 用 & 和双反斜杠组织两行。在 equation 内放一个 label，正文用 eqref 引用即可。||The outer equation creates one numbered reference target; inner aligned arranges rows with & and double backslashes. Put one label inside equation and reference it with eqref.`,
 ['equation','aligned','align']);
exercise('repair-nesting','math-environments','debug',
 b`修复重复的显示环境||Repair nested displays`,
 b`加载了 amsmath，但这段代码出现 Erroneous nesting of equation structures。保留两行对齐和一个编号，最小修复是哪项？||amsmath is loaded, but this source reports Erroneous nesting of equation structures. Which minimal repair keeps two aligned rows and one number?`,[
 option(b`把内部 begin/end 的 align 都改成 aligned||Change both inner align names to aligned`,b`aligned 是内部数学结构，可以放在 equation 内。||aligned is an inner math structure permitted inside equation.`),
 option(b`给外面再加 \[ 和 \]||Wrap the block in \[ and \]`,b`又加一层显示数学，重复嵌套更多。||This adds another display layer and worsens the nesting.`),
 option(b`把所有 & 改成 \&||Replace every & with \&`,b`这样会输出字面与号，却没有修复两个独立显示环境的嵌套。||This prints literal ampersands without repairing the nested displays.`),
 option(b`删除 amsmath||Remove amsmath`,b`align 会失去定义，分行与对齐依赖也没有了。||align becomes undefined and loses its required alignment support.`)
 ],0,b`equation 与 align 都是顶层显示环境，不能这样嵌套。此处要一个编号，保留 equation，把内部改为 aligned。开始与结束环境名一起改，再编译检查两行和唯一编号。||equation and align both establish top-level displays and cannot nest this way. Keep equation for one number and change the inner environment to aligned, including both opening and closing names. Recompile and inspect the two rows and single number.`,
 ['equation','align','aligned'],R`\documentclass{article}
\usepackage{amsmath}
\begin{document}
\begin{equation}
\begin{align}
P&=pq-(aq+bq^2)\\
&=(p-a)q-bq^2.
\end{align}
\end{equation}
\end{document}`);
exercise('parent-label','math-environments','single',
 b`把主标签放对位置||Place the parent label`,
 b`subequations 内有两条 align 方程，希望 eq:system 引用整组的 (1)，而不是 (1b)。主 label 应放在哪？||A subequations group contains two align equations. eq:system should reference (1), not (1b). Where does its parent label belong?`,[
 option(b`紧接 begin{subequations}||Immediately after begin{subequations}`,b`此时可以记录主编号，内部方程随后再产生子编号。||This records the parent before the inner equations create child numbers.`),
 option(b`最后一条方程后||After the final equation`,b`这时可能记录最后一条子编号。||It may record the final child's number.`),
 option(b`end{document} 后||After end{document}`,b`正文处理已经结束，不会建立所需的组引用。||Document processing has ended, so the desired group reference is not established.`),
 option(b`把键名改成 eq:1||Rename the key eq:1`,b`键名不设置数字或主子层级。||A key name sets neither the number nor the parent-child level.`)
 ],0,b`label 记录当前位置的可引用计数器。组开始处是主编号；内部各行产生字母子号后，当前值已不同。主标签放开头，子标签放各自编号行，再编译两次核对。||label records the current reference counter. The group opening has the parent value; inner rows change it to lettered child values. Place the parent first and child labels on their numbered rows, then compile twice to check.`,
 ['subequations','equation','align']);
exercise('boundary','math-environments','single',
 b`PDF 能生成，定义仍可能漏值||A compiling definition can omit a value`,
 b`f(x) 定义在全体实数上，两段条件分别是 x>0 和 x<0。PDF 正常生成，但定义缺了什么？||f(x) is defined on all real numbers with branches x>0 and x<0. The PDF compiles. What is missing from the definition?`,[
 option(b`x=0 的取值||The value at x=0`,b`零既不大于零，也不小于零，没有任何一段适用。||Zero satisfies neither strict inequality, so neither branch applies.`),
 option(b`第二个右大括号||A second right brace`,b`cases 本来就是左大括号结构，缺失值与括号无关。||cases intentionally has a left brace; the missing value is unrelated to delimiters.`),
 option(b`每段的独立编号||A separate number for each branch`,b`编号不会补上函数在零点的定义。||Numbers do not define the function at zero.`),
 option(b`更大的字号||A larger font`,b`字形大小不改变条件覆盖范围。||Font size does not change domain coverage.`)
 ],0,b`把零点加入某一段，例如第一段使用 x≥0，或另加 x=0 一段并明确取值。还需检查各段是否互斥。TeX 检查源文件结构，函数定义的完整性由你核对。||Include zero in a branch, for example x≥0, or add an explicit x=0 branch with its value. Check that branches are mutually exclusive. TeX checks source structure; the author checks the completeness of the function definition.`,
 ['cases','array-math']);
exercise('operator','math-fonts','single',
 b`全文复用方差运算符||Reuse a variance operator`,
 b`已加载 amsmath，正文要多次写 Var(X)，并保持正体与运算符间距。哪条导言区定义适合？||With amsmath loaded, the body repeatedly needs Var(X) with upright letters and operator spacing. Which preamble definition fits?`,[
 option(b`\DeclareMathOperator{\AtelierVar}{Var}||\DeclareMathOperator{\AtelierVar}{Var}`,b`它建立可复用的命名运算符。||It defines a reusable named operator.`),
 option(b`\newcommand{\AtelierVar}{Var}||\newcommand{\AtelierVar}{Var}`,b`裸字母在数学里是三个变量，没有命名运算符结构。||Bare letters become three math variables without named-operator structure.`),
 option(b`\newcommand{\AtelierVar}{\textbf{Var}}||\newcommand{\AtelierVar}{\textbf{Var}}`,b`文本粗体不能替代数学运算符的类别和间距。||Text bold does not supply math operator class and spacing.`),
 option(b`\label{Var}||\label{Var}`,b`label 记录引用编号，不创建数学运算符。||label records a reference number rather than defining an operator.`)
 ],0,b`在导言区定义后，正文数学中调用 AtelierVar(X)。DeclareMathOperator 负责名称字体与数学间距；若只用一次，operatorname{Var} 也可完成这一项排版。||After defining it in the preamble, call AtelierVar(X) in body mathematics. DeclareMathOperator handles the name's font and math spacing. operatorname{Var} also suits a one-off use.`,
 ['text-operators','math-alphabets','programming-newcommand']);
exercise('optional-index','programming','single',
 b`可选标签也占一个参数||An optional label occupies an argument`,
 b`\newcommand{\AtelierNote}[2][Note]{...} 中，希望输出必选内容。定义体应读哪个参数？||In \newcommand{\AtelierNote}[2][Note]{...}, which argument contains the mandatory content?`,[
 option(b`#2||#2`,b`#1 是可选标签，必选内容是第二个参数。||#1 is the optional label, so content is argument two.`),
 option(b`#1||#1`,b`这读取的是 Note 或调用时给出的自选标签。||This reads Note or the label supplied by the caller.`),
 option(b`#0||#0`,b`这里的参数编号从 #1 开始，#0 不是这个内容接口。||The argument numbering starts at #1, not #0.`),
 option(b`[Note]||[Note]`,b`这是默认值写法，不是定义体读取参数的占位符。||This is default-value syntax, not an argument placeholder in the definition.`)
 ],0,b`[2] 包含可选参数在内的参数总数；后面的 [Note] 让第一个参数可选。调用 AtelierNote{Text} 时，#1 是 Note，#2 是 Text；调用 AtelierNote[Input]{Text} 时，只替换 #1。||[2] is the total argument count, including the optional one. [Note] makes argument one optional. AtelierNote{Text} gives #1=Note and #2=Text; AtelierNote[Input]{Text} only replaces #1.`,
 ['programming-newcommand','programming-document-commands']);
exercise('bold-greek','math-fonts','single',
 b`给希腊参数加粗||Bold a Greek parameter`,
 b`使用传统数学字体，导言区已加载 bm。需要粗体希腊参数 alpha，哪项合适？||With traditional math fonts and bm loaded, which command suits a bold Greek parameter alpha?`,[
 option(b`\bm{\alpha}||\bm{\alpha}`,b`bm 可对这个数学符号选择粗体处理。||bm handles bolding this math symbol.`),
 option(b`\mathbf{\alpha}||\mathbf{\alpha}`,b`传统 mathbf 不保证覆盖希腊字母。||Traditional mathbf does not guarantee Greek coverage.`),
 option(b`\textbf{alpha}||\textbf{alpha}`,b`它输出文字 alpha，不是希腊符号。||It prints the word alpha rather than the Greek symbol.`),
 option(b`\mathbb{\alpha}||\mathbb{\alpha}`,b`黑板字族不是希腊字母加粗接口，AMS 字形范围也不同。||The blackboard alphabet is not a bold-Greek interface and has different AMS glyph coverage.`)
 ],0,b`在数学模式里用 bm{alpha}，正文先定义粗体参数的含义，再检查 PDF 的实际字形。有些字体没有真正粗体，应同时看日志；采用 Unicode 数学时按相应字体接口处理。||Use bm{alpha} in math mode, define the bold parameter's meaning in the prose, and inspect the PDF. Some fonts lack genuine bold glyphs, so also check the log. Use the corresponding font interface in Unicode mathematics.`,
 ['bold-math','math-alphabets']);
exercise('plot-variable','pgfplots','debug',
 b`修复函数自变量||Repair a plot variable`,
 b`下面的函数曲线用了未定义的 \x。希望用 PGFPlots 内置表达式解析直接画抛物线，哪项修复正确？||This function plot uses an undefined \x. Which repair uses PGFPlots' built-in expression parser to draw the parabola directly?`,[
 option(b`把表达式改成 {x^2}||Change the expression to {x^2}`,b`x 是这个表达式接口的自变量。||x is the variable in this expression interface.`),
 option(b`去掉 addplot 后的分号||Remove the plot's semicolon`,b`分号结束图线路径，删除会新增路径错误。||The semicolon terminates the plot path; removing it creates another error.`),
 option(b`把 domain 改成 xlabel||Replace domain with xlabel`,b`轴标题不会设置函数取样范围，也不解决自变量。||An axis label sets neither the sampling range nor the variable.`),
 option(b`将 axis 改为 equation||Replace axis with equation`,b`公式环境不能替代绘图坐标轴。||An equation environment cannot replace plotting axes.`)
 ],0,b`写 addplot[domain=-2:2]{x^2};，保留分号。axis 仍放在 tikzpicture 内，编译后应得到经过原点的对称抛物线。这里 x 是表达式变量，和另一些 TikZ 循环中的命令变量 \x 用法不同。||Use addplot[domain=-2:2]{x^2}; and retain the semicolon. Keep axis inside tikzpicture. The compiled plot is a symmetric parabola through the origin. x is an expression variable, distinct from the command variable \x used in some TikZ loops.`,
 ['pgfplots-axis','tikz-paths'],R`\documentclass{article}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\begin{document}
\begin{tikzpicture}
\begin{axis}
\addplot[domain=-2:2]{\x^2};
\end{axis}
\end{tikzpicture}
\end{document}`);

D.examples.push({
 id:'guided-math-progression',
 title:b`从记号到完整推导||From notation to a complete derivation`,
 description:b`用一个假设的收入与成本例子，依次练行内记号、整组编号、单号对齐推导、分段函数和证明。所有参数在正文定义。||Use a hypothetical revenue-and-cost example to practice inline notation, grouped numbers, a one-number derivation, a piecewise function, and a proof. Define every parameter in the text.`,
 engine:'pdflatex',modules:['math-environments','math-fonts'],
 code:R`\documentclass[11pt]{article}
\usepackage[margin=25mm]{geometry}
\usepackage{amsmath,amssymb}
\usepackage{amsthm}
\newtheorem{proposition}{Proposition}[section]
\DeclareMathOperator{\Revenue}{Rev}
\DeclareMathOperator{\Cost}{Cost}
\begin{document}
\title{A guided mathematics example}
\author{}
\date{}
\maketitle
\section{Define the notation}
Let $q\in\mathbb{R}$ denote a nonnegative output quantity.
The unit price is $p\ge0$. The cost parameters satisfy $a>0$ and
$b>0$. This is a hypothetical model for practising notation.

\section{Group the related equations}
Revenue and cost are given by
\begin{subequations}\label{eq:model}
\begin{align}
\Revenue(q)&=pq,\label{eq:revenue}\\
\Cost(q)&=aq+bq^2.\label{eq:cost}
\end{align}
\end{subequations}
System~\eqref{eq:model} contains the revenue equation
\eqref{eq:revenue} and the cost equation~\eqref{eq:cost}.

Define profit $\Pi(q)$ as revenue minus cost. One derivation has
one number:
\begin{equation}\label{eq:profit}
\begin{aligned}
\Pi(q)&=\Revenue(q)-\Cost(q)\\
&=pq-(aq+bq^2)\\
&=(p-a)q-bq^2.
\end{aligned}
\end{equation}
The equals signs in \eqref{eq:profit} line up at the alignment markers.

\section{Write a boundary condition}
For an interior optimum the derivative satisfies
\[
\Pi'(q)=p-a-2bq=0.
\]
Since $\Pi''(q)=-2b<0$ and $q\ge0$, the maximizing quantity is
\[
q^*=\begin{cases}
\dfrac{p-a}{2b}&\text{if }p>a,\\[3pt]
0&\text{if }p\le a.
\end{cases}
\]
The two conditions cover the boundary $p=a$ exactly once.

\begin{proposition}\label{prop:nonnegative-cost}
For every $q\ge0$, the cost in \eqref{eq:cost} is nonnegative.
\end{proposition}
\begin{proof}
The assumptions imply $aq\ge0$ and $bq^2\ge0$.
Their sum is nonnegative.
\end{proof}
Proposition~\ref{prop:nonnegative-cost} follows from the stated signs,
rather than from any typesetting command.
\end{document}
`
});
D.examples.push({
 id:'guided-parameter-macros',
 title:b`参数宏与文档接口逐步练习||Parameterized macros and document interfaces`,
 description:b`在完整文档里比较必选参数、默认标签、星号分支与逗号列表映射，调用结果可直接在 PDF 中核对。||Compare mandatory arguments, a default label, a star branch, and comma-list mapping in a complete document. Inspect every call's result in the PDF.`,
 engine:'pdflatex',modules:['programming','math-fonts','math-environments'],
 code:R`\documentclass[11pt]{article}
\usepackage[margin=25mm]{geometry}
\usepackage{amsmath,amssymb}
\newcommand{\AtelierReals}{\ensuremath{\mathbb{R}}}
\newcommand{\AtelierPartial}[2]{\frac{\partial #1}{\partial #2}}
\newcommand{\AtelierNote}[2][Note]{\textbf{#1:} #2}
\NewDocumentCommand{\AtelierNorm}{s m}{%
 \IfBooleanTF{#1}{\left\lVert #2\right\rVert}{\lVert #2\rVert}}
\ExplSyntaxOn
\cs_new_protected:Npn \atelier_items:n #1
 {
  \begin{itemize}
  \clist_map_inline:nn {#1} {\item ##1}
  \end{itemize}
 }
\NewDocumentCommand{\AtelierItems}{m}{\atelier_items:n {#1}}
\ExplSyntaxOff
\begin{document}
\title{A guided macro example}
\author{}
\date{}
\maketitle
\section{Give notation a name}
The set of real numbers is \AtelierReals.
Inside mathematics the same command works: $x\in\AtelierReals$.

Let $U(c,s)=\log c+s$ with $c>0$. The first and second arguments
of the partial-derivative macro are the function and its variable:
\[
\AtelierPartial{U}{c}=\frac{1}{c},
\qquad
\AtelierPartial{U}{s}=1.
\]

\section{Use an optional label}
\AtelierNote{The first argument has a default value.}

\AtelierNote[Input]{An explicit label replaces that default.}

\section{Read a star}
Let $x$ and $y$ be vectors in the same space.
The unstarred norm has ordinary delimiters:
\[
\AtelierNorm{x+y}.
\]
The starred call sizes delimiters to the taller argument:
\[
\AtelierNorm*{\frac{x+y}{2}}.
\]
The star state is argument one; the norm's content is argument two.

\section{Map a comma list}
The public command below passes a comma list to an internal function:
\AtelierItems{Input,Calculation,Output}
Inside the enclosing function definition, the current list item
uses a doubled parameter marker. Removing one input word should
remove one list item without changing the function.
\end{document}
`
});
})();

