(() => {
 const D=window.ATELIER;
 D.entries.push({id:'math-symbols',module:'math-fonts',title:{zh:'数学符号词典：语义、字体与间距',en:'Mathematical symbols: meaning, alphabets, and spacing'},summary:{zh:'按语义选择关系、运算、箭头和重音，保持论文中记号一致。',en:'Choose relations, operators, arrows, and accents by meaning and keep notation consistent.'},level:'intermediate',keywords:['symbol','符号','Greek','希腊字母','概率','统计','经济学','physics'],packages:['amsmath','amssymb'],engines:['pdfLaTeX','XeLaTeX','LuaLaTeX'],syntax:String.raw`\usepackage{amsmath,amssymb}
\[ \mathbb{P}(X\le x)=F_X(x),\qquad \nabla f(x)=0 \]`,sections:[
 {title:{zh:'关系与运算符',en:'Relations and operators'},body:{zh:'\\le、\\in、\\subseteq 属于关系符号，TeX 在左右加入关系间距；\\times、\\cap 属于二元运算符。自定义关系用 \\mathrel{...}，自定义二元运算用 \\mathbin{...}。命名运算符使用 \\operatorname{Var}(X)，把名称排为正体，并正确处理与括号的间距。',en:'\\le, \\in, and \\subseteq are relations, with relational spacing on either side. \\times and \\cap are binary operators. Wrap a custom relation in \\mathrel{...} and a custom binary operator in \\mathbin{...}. Use \\operatorname{Var}(X) to give a named operator upright type and the appropriate spacing before parentheses.'},math:String.raw`A\subseteq B,\quad x\in A,\quad A\cap B,\quad \operatorname{Var}(X)`},
 {title:{zh:'希腊字母、字体与专业记号',en:'Greek letters, alphabets, and domain notation'},body:{zh:'\\epsilon 与 \\varepsilon、\\phi 与 \\varphi 是不同字形，全文保持选择一致。传统 LaTeX 中，与拉丁字母形似的希腊大写通常直接写 A、B 等，没有对应的 \\Alpha 命令。\\mathbb{E} 和 \\mathbb{P} 常表示期望与概率。β 在经济学中可表示系数，在物理学中可能表示其他量；论文的记号说明应给出这些符号的具体含义。',en:'\\epsilon and \\varepsilon, or \\phi and \\varphi, are alternative glyphs. Use one convention consistently. Greek capitals that resemble Latin letters are normally written as A, B, and so on in traditional LaTeX, which has no corresponding \\Alpha command. \\mathbb{E} and \\mathbb{P} often denote expectation and probability. Beta can denote a coefficient in economics and a different quantity in physics; the paper should define the meaning of each symbol.'}},
 {title:{zh:'重音、括号与省略号',en:'Accents, delimiters, and ellipses'},body:{zh:'单字母可用 \\hat{x}、\\vec{x}，宽内容用 \\widehat{ABC} 或 \\overline{AB}。\\left 与 \\right 必须在同一个数学分组中配对；在多行公式中常用 \\bigl、\\bigr 手工统一大小。逗号列表用 \\ldots，乘加序列用 \\cdots，矩阵的竖向与对角延续用 \\vdots、\\ddots。网页中的公式使用 MathJax 渲染；PDF 中的字形由 TeX 字体配置决定。',en:'Use \\hat{x} or \\vec{x} for one symbol, and \\widehat{ABC} or \\overline{AB} for wider material. Pair \\left and \\right inside the same math group; \\bigl and \\bigr give predictable sizes across multiple lines. Use \\ldots in comma-separated lists, \\cdots between centered operators, and \\vdots or \\ddots in matrices. The web page renders formulas with MathJax; the TeX font configuration determines their appearance in the PDF.'},math:String.raw`\hat{x},\quad\widehat{ABC},\quad x_1,\ldots,x_n,\quad x_1+\cdots+x_n`}
 ],related:['mathbb','mathcal'],sources:[{label:'AMS math documentation',url:'https://www.ams.org/arc/tex/amsmath/amsldoc.pdf'},{label:'LaTeX documentation',url:'https://www.latex-project.org/help/documentation/'}]});
})();
/* Same-letter comparison: source syntax and renderer syntax are explicit. */
(() => {
 const D=window.ATELIER,R=String.raw;
 D.fontComparisons=[
  [R`\mathbb`,'amsfonts',R`\mathbb{R}`],
  [R`\mathcal`,'LaTeX core',R`\mathcal{R}`],
  [R`\mathscr`,'mathrsfs',R`\mathscr{R}`],
  [R`\mathfrak`,'amsfonts',R`\mathfrak{R}`],
  [R`\mathrm`,'LaTeX core',R`\mathrm{R}`],
  [R`\mathbf`,'LaTeX core',R`\mathbf{R}`],
  [R`\mathit`,'LaTeX core',R`\mathit{R}`],
  [R`\mathsf`,'LaTeX core',R`\mathsf{R}`],
  [R`\mathtt`,'LaTeX core',R`\mathtt{R}`],
  [R`\boldsymbol`,'amsmath',R`\boldsymbol{R}`],
  [R`\bm`,'bm',R`\bm{R}`,R`\boldsymbol{R}`],
  [R`\text`,'amsmath',R`\text{R}`],
  [R`\operatorname`,'amsmath',R`\operatorname{R}`],
  [R`\DeclareMathOperator`,'amsmath',R`\DeclareMathOperator{\AtelierR}{R}`,R`\DeclareMathOperator{\AtelierR}{R}\AtelierR`]
 ].map(([command,dependency,source,math])=>({command,dependency,source,math:math||source}));
})();
