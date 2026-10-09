/* Distinct mathematical commands with original bilingual usage notes.
   Traditional LaTeX dependencies; browser glyphs are MathJax, not a PDF compiler. */
(() => {
 const D=window.ATELIER;
 function add(pkg,source) {
  source.raw[0].trim().split('\n').filter(Boolean).forEach(line=>{
   const [id,command,zh,en,dzh,den,example,math]=line.split('||').map(x=>x.trim());
   D.dictionary.push({id:'symbol-'+id,module:'math-fonts',category:'symbols',command,title:{zh,en},detail:{zh:dzh,en:den},example,package:pkg,entry:'math-symbols',math:math||command});
  });
 }
 const core=source=>add('LaTeX core',source);
 const ams=source=>add('amsmath',source);
 const sym=source=>add('amssymb',source);
 core`
alpha||\alpha||小写 alpha||Lowercase alpha||常用于显著性水平、角度或参数。||Common for significance levels, angles, and parameters.||\alpha=0.05
beta||\beta||小写 beta||Lowercase beta||回归系数和贴现因子常用这个字母。||Common for regression coefficients and discount factors.||y=\alpha+\beta x
gamma||\gamma||小写 gamma||Lowercase gamma||可表示参数或曲线；与大写 Gamma 函数符号区分。||Can name a parameter or curve; distinguish it from the uppercase gamma-function symbol.||\gamma>0
delta||\delta||小写 delta||Lowercase delta||常表示小变化或阈值；大写 Delta 常用于有限差分。||Often denotes a small change or threshold; uppercase Delta commonly denotes a finite difference.||0<\delta<\epsilon
epsilon||\epsilon||小写 epsilon||Lowercase epsilon||误差、扰动或极限中的正数常用；与 varepsilon 是不同字形。||Common for errors, perturbations, or positive bounds in limits; varepsilon is another glyph.|||x-a|<\epsilon
varepsilon||\varepsilon||变体 epsilon||Variant epsilon||选择另一种 epsilon 字形；与 epsilon 的选择应全文一致。||Selects an alternative epsilon glyph; use a consistent convention throughout.||y_i=\beta x_i+\varepsilon_i
zeta||\zeta||小写 zeta||Lowercase zeta||常见于 zeta 函数名称，也可作作者定义的参数。||Used in the zeta-function name or as an author-defined parameter.||\zeta(s)=\sum_{n=1}^{\infty}n^{-s}
eta||\eta||小写 eta||Lowercase eta||可表示效率、弹性或潜在参数，字形与拉丁 n 不同。||Can denote efficiency, elasticity, or a latent parameter; its glyph differs from Latin n.||0<\eta<1
theta||\theta||小写 theta||Lowercase theta||常表示角度或待估参数；与 vartheta 是字体变体。||Common for an angle or a parameter to estimate; vartheta is a glyph variant.||\theta\in\Theta
vartheta||\vartheta||变体 theta||Variant theta||theta 的环状变体，与 theta 表达相同字母的不同字形。||A looped variant of theta: the same letter in an alternative glyph.||\vartheta=\pi/2
iota||\iota||小写 iota||Lowercase iota||与拉丁 i 不同；可用于索引映射等自定义记号。||Distinct from Latin i; useful for notation such as an indexing map.||\iota:A\to B
kappa||\kappa||小写 kappa||Lowercase kappa||常用于曲率、条件数或参数。||Common for curvature, condition numbers, and parameters.||\kappa(A)\ge1
lambda||\lambda||小写 lambda||Lowercase lambda||常用于特征值、拉格朗日乘子或到达率。||Common for eigenvalues, Lagrange multipliers, and arrival rates.||Av=\lambda v
mu||\mu||小写 mu||Lowercase mu||常表示总体均值、测度或乘子；单位前缀在正文中另按规范处理。||Common for a population mean, measure, or multiplier; text unit prefixes have separate conventions.||\mu=\mathrm{E}(X)
nu||\nu||小写 nu||Lowercase nu||常见于频率或自由度，容易与拉丁 v 混淆，需选清晰字体。||Often used for frequency or degrees of freedom; choose a font that distinguishes it from v.||\nu=n-1
xi||\xi||小写 xi||Lowercase xi||可表示随机量或坐标。||Can denote a random quantity or coordinate.||\xi_i\sim N(0,1)
pi||\pi||小写 pi||Lowercase pi||可表示圆周率，也常在经济学中表示利润。||Can denote the circle constant or, in economics, profit.||\pi=pq-C(q)
varpi||\varpi||变体 pi||Variant pi||提供另一种 pi 字形，常用于需要区分两个 pi 类符号的记号。||An alternative pi glyph, useful when notation must distinguish two pi-like symbols.||\varpi\ne\pi
rho||\rho||小写 rho||Lowercase rho||常表示相关系数、密度或贴现率，用法随学科而变。||Common for correlation, density, and discount rates, with usage varying by discipline.||-1\le\rho\le1
varrho||\varrho||变体 rho||Variant rho||有尾部的 rho 字形，可与无尾字形形成明确的记号区分。||A tailed rho glyph that can distinguish notation from the untailed form.||\varrho(x)\ge0
sigma||\sigma||小写 sigma||Lowercase sigma||常表示标准差或截面；方差通常另写 sigma 平方。||Common for standard deviation or a cross-section; variance is often written sigma squared.||\sigma^2=\mathrm{E}[(X-\mu)^2]
varsigma||\varsigma||终形 sigma||Final-form sigma||使用希腊字母 sigma 的终形；在数学中可作为另一记号。||Uses the final form of sigma, which can serve as a distinct mathematical notation.||\varsigma\ne\sigma
tau||\tau||小写 tau||Lowercase tau||可表示时间尺度、税率或检验参数；注意与拉丁 t 区分。||Can denote a time scale, tax rate, or test parameter; distinguish it from Latin t.||T=\tau Y
upsilon||\upsilon||小写 upsilon||Lowercase upsilon||希腊字母 upsilon，字形与拉丁 u 不同。||The Greek letter upsilon, distinct in shape from Latin u.||\upsilon>0
phi||\phi||小写 phi||Lowercase phi||常表示角度或势；默认字形与 varphi 的对应取决于数学字体。||Common for an angle or potential; the phi/varphi glyph correspondence depends on the math font.||\phi(x)=x^2
varphi||\varphi||变体 phi||Variant phi||选择 phi 的另一字形，换用 Unicode 数学字体时需检查视觉对应。||Selects the alternative phi glyph; inspect its appearance when changing to Unicode math fonts.||\varphi:A\to B
chi||\chi||小写 chi||Lowercase chi||常见于卡方分布和特征函数类记号；不要与拉丁 x 混用。||Used in chi-squared and characteristic-function-like notation; do not confuse it with Latin x.||\chi^2_\nu
psi||\psi||小写 psi||Lowercase psi||常用于波函数或其他函数名，参数按普通函数写法给出。||Common for wavefunctions or other function names, with arguments written in the usual way.||\psi(x,t)
omega||\omega||小写 omega||Lowercase omega||可表示角频率或状态；样本空间常采用大写 Omega。||Can denote angular frequency or a state; uppercase Omega commonly names a sample space.||\omega=2\pi f
Gamma||\Gamma||大写 Gamma||Uppercase Gamma||常用于 Gamma 函数或边界集合，有独立的大写命令。||Common for the gamma function or a boundary set, with its own uppercase command.||\Gamma(n)=(n-1)!
Delta||\Delta||大写 Delta||Uppercase Delta||常表示有限变化量；可与小写 delta 的局部变化约定区分。||Common for a finite change, distinguished from a small-delta local-change convention.||\Delta y=y_{t+1}-y_t
Theta||\Theta||大写 Theta||Uppercase Theta||统计中可表示参数空间；复杂度记号也可能使用它。||Can denote a parameter space in statistics or a complexity class in algorithms.||\theta\in\Theta
Lambda||\Lambda||大写 Lambda||Uppercase Lambda||可表示对角特征值矩阵或集合，是与小写 lambda 不同的变量。||Can denote a diagonal eigenvalue matrix or a set, as a variable distinct from lowercase lambda.||A=Q\Lambda Q^{-1}
Xi||\Xi||大写 Xi||Uppercase Xi||三横线的大写希腊字母，可用于矩阵或参数名称。||The three-bar Greek capital, usable as a matrix or parameter name.||\Xi=\Xi^\top
Pi||\Pi||大写 Pi||Uppercase Pi||这是希腊字母，不是带上下限的大型连乘算子 prod。||This is a Greek letter, not the large product operator prod.||\Pi=\Pi_0
Sigma||\Sigma||大写 Sigma||Uppercase Sigma||常表示协方差矩阵；求和算子应另用 sum。||Common for a covariance matrix; use sum separately for a summation operator.||\Sigma=\mathrm{E}[(X-\mu)(X-\mu)^\top]
Upsilon||\Upsilon||大写 Upsilon||Uppercase Upsilon||传统 LaTeX 中的大写希腊字母，字形与拉丁 Y 不同。||A Greek capital in traditional LaTeX, with a glyph distinct from Latin Y.||\Upsilon>0
Phi||\Phi||大写 Phi||Uppercase Phi||常用作分布函数或映射；用于正态分布函数时需说明约定。||Common for a distribution function or map; state the convention when using it for a normal CDF.||\Phi(z)=\Pr(Z\le z)
Psi||\Psi||大写 Psi||Uppercase Psi||可表示势函数或矩阵，与小写 psi 是不同变量。||Can denote a potential or matrix, distinct from lowercase psi.||\Psi=\Psi^\top
Omega||\Omega||大写 Omega||Uppercase Omega||常用作样本空间或区域；电阻单位应另按单位排版规范处理。||Common for a sample space or region; electrical units need their own typographic conventions.||\omega\in\Omega
`;
 sym`
varkappa||\varkappa||变体 kappa||Variant kappa||AMS 提供的另一 kappa 字形；传统配置需 amssymb。||An alternate kappa glyph supplied by AMS; traditional setups need amssymb.||\varkappa>0
digamma||\digamma||小写 digamma||Lowercase digamma||AMS 提供的古希腊字母，可作特殊函数或其他记号。||An archaic Greek letter supplied by AMS, usable for special-function or other notation.||\digamma(x)
`;
 core`
aleph||\aleph||aleph 基数符号||Aleph cardinal symbol||集合论中常配下标表示无限基数。||Commonly takes a subscript to denote an infinite cardinal in set theory.||\aleph_0
hbar||\hbar||约化普朗克常数记号||Reduced-Planck-constant notation||带横线的 h，物理学中常表示约化普朗克常数。||A barred h commonly denoting the reduced Planck constant in physics.||E=\hbar\omega
ell||\ell||花体小写 ell||Script lowercase ell||可用作长度或索引，以区别于数字 1 和普通小写 l。||Useful for lengths or indices to distinguish from 1 and ordinary lowercase l.||\ell=1
wp||\wp||Weierstrass 椭圆函数符号||Weierstrass elliptic-function symbol||提供特殊的 p 字形，常用于 Weierstrass 椭圆函数。||Provides the special p glyph commonly used for the Weierstrass elliptic function.||\wp(z)
Re||\Re||实部符号||Real-part symbol||传统花体实部符号；若需要直立文字 Re，可定义运算符。||The traditional real-part glyph; define an operator if upright text Re is preferred.||\Re(z)
Im||\Im||虚部符号||Imaginary-part symbol||传统花体虚部符号，与实部 Re 配合使用。||The traditional imaginary-part glyph, paired with Re.||\Im(z)
infty||\infty||无穷符号||Infinity||表示无穷或极限方向，不是可直接代入的普通实数。||Denotes infinity or a limiting direction, not an ordinary real number to substitute.||\lim_{n\to\infty}a_n
partial||\partial||偏导符号||Partial-derivative symbol||常在偏导分式两处出现，也可按作者约定表示边界。||Commonly appears twice in a partial-derivative fraction and can also denote a boundary by convention.||\frac{\partial f}{\partial x}
nabla||\nabla||nabla 算子||Nabla operator||梯度、散度和旋度使用同一基本符号，具体运算由后面的结构决定。||The same symbol is used for gradient, divergence, and curl; following structure determines the operation.||\nabla f
prime||\prime||撇号||Prime||可作导数或另一个变量的标记，应放在上标中获得常用位置。||Can mark a derivative or a related variable; place it in a superscript for the usual position.||f^\prime(x)||f^\prime
emptyset||\emptyset||空集||Empty set||表示没有元素的集合，与数字零或字母 O 不同。||The set with no elements, distinct from zero or the letter O.||A\cap B=\emptyset
forall||\forall||全称量词||Universal quantifier||表示对指定域中的每个对象都成立，应写明变量与取值域。||States that a claim holds for every object in a stated domain; include variable and domain.||\forall x\in A
exists||\exists||存在量词||Existential quantifier||表示至少存在一个满足条件的对象；唯一存在需要额外说明。||States that at least one object satisfies a condition; uniqueness needs an additional convention.||\exists x\in A
neg||\neg||逻辑非||Logical negation||作为逻辑否定前缀，不能拿来替代普通减号。||A logical-negation prefix, not a replacement for subtraction.||\neg p
top||\top||逻辑真或转置标记||Top or transpose marker||可作真值或上标转置记号；矩阵转置含义需在文中说明。||Can denote truth or serve as a transpose superscript; define the transpose convention.||A^\top
bot||\bot||逻辑假或底元素||Bottom or falsity||可表示假值或偏序的底元素；垂直关系通常使用 perp。||Can denote falsehood or a least element; use perp for a perpendicular relation.||f(\bot)=\bot
angle||\angle||角度符号||Angle symbol||常写在三个点之前表示一个角。||Often precedes three points to denote an angle.||\angle ABC
triangle||\triangle||三角形符号||Triangle symbol||可在几何中标记三角形；集合对称差若使用此字形应先定义。||Can name a triangle in geometry; define any use for symmetric difference.||\triangle ABC
surd||\surd||独立根号符号||Standalone radical symbol||只是根号字形，没有自动延伸的根线；带内容的根式用 sqrt。||Only the radical glyph without an extensible overbar; use sqrt for a root containing an expression.||\surd 2
flat||\flat||降号||Flat sign||音乐记号中的降号；不要与变量 b 混为同一字形。||The musical flat sign, distinct from the variable b.||B^\flat
natural||\natural||还原号||Natural sign||音乐记号中的还原号。||The musical natural sign.||C^\natural
sharp||\sharp||升号||Sharp sign||音乐中的升号，也可按约定用作数学标记；它不是宏参数字符 #。||The musical sharp sign, also usable by convention in mathematics; it is not the macro-parameter character #.||F^\sharp
`;
 sym`
varnothing||\varnothing||变体空集||Variant empty set||AMS 提供的空集字形；选择它或 emptyset 并保持一致。||An AMS empty-set glyph; choose it or emptyset consistently.||A=\varnothing
nexists||\nexists||不存在量词||Nonexistence quantifier||表示不存在满足条件的对象，通常要跟变量和条件。||States that no object satisfies the condition; follow it with a variable and condition.||\nexists x:x^2=-1,\ x\in\mathbb{R}
complement||\complement||补集符号||Complement symbol||可写作上标表示补集，全集及补集记号约定须说明。||Can be used as a superscript for a complement; state the universe and notation convention.||A^\complement
eth||\eth||eth 符号||Eth symbol||AMS 提供的带横线字形，可用于特定的微分记号。||An AMS barred glyph used in specialized differential notation.||\eth f
`;
 core`
pm||\pm||正负号||Plus-minus sign||表示一对正负分支，也可用于已说明定义的误差范围。||Marks positive and negative branches or a clearly defined uncertainty interval.||x=\mu\pm\sigma
mp||\mp||负正号||Minus-plus sign||与 pm 配对时表示相反的符号选择，而不是两个独立选择。||Paired with pm, it denotes the opposite correlated sign choice.||a\pm b,\quad a\mp b
times||\times||乘号||Multiplication sign||表示乘法、笛卡尔积或叉积，含义由对象类型决定。||Denotes multiplication, a Cartesian product, or a cross product according to the objects.||a\times b
div||\div||除号||Division sign||常用于初等算术；复杂公式中分式通常能更清楚显示作用范围。||Common in elementary arithmetic; fractions often make scope clearer in complex formulas.||6\div2=3
cdot||\cdot||居中乘点||Centered multiplication dot||可表示乘法或内积，TeX 按二元运算符设置两侧间距。||Can denote multiplication or an inner product, with binary-operator spacing.||u\cdot v
ast||\ast||星形运算符||Asterisk operator||常用于卷积等作者定义的运算，与字符 * 的字形选择不同。||Often used for convolution or another defined operation; its glyph differs from a literal *.||(f\ast g)(x)
star||\star||五角星运算符||Star operator||五角星字形，可用作运算符或上标标记。||A star-shaped glyph usable as an operator or superscript marker.||a\star b
circ||\circ||复合运算圈||Composition circle||函数复合常用此符号，f circ g 的作用顺序需按约定读取。||Common for function composition; read the order of f circ g according to the convention.||(f\circ g)(x)
bullet||\bullet||实心圆点||Bullet operator||可用作数学占位符或自定义运算符；正文项目列表使用列表环境。||Can serve as a mathematical placeholder or defined operator; text lists use list environments.||f(\bullet)
diamond||\diamond||菱形运算符||Diamond operator||二元运算符字形，适用于已定义的代数操作。||A binary-operator glyph for a defined algebraic operation.||a\diamond b
cap||\cap||交集||Intersection||取同时属于两个集合的元素，多个集合的交用 bigcap。||Selects elements in both sets; use bigcap for an indexed family.||A\cap B
cup||\cup||并集||Union||取属于任一集合的元素，多个集合的并用 bigcup。||Selects elements belonging to either set; use bigcup for an indexed family.||A\cup B
uplus||\uplus||不交并||Disjoint-union symbol||常表示不交并或多重集并，应说明采用哪种约定。||Common for disjoint union or multiset union; state which convention is used.||A\uplus B
sqcap||\sqcap||方交运算符||Square-cap operator||可表示格中的交，也可用于其他约定的运算。||Can denote a lattice meet or another operation defined in the text.||a\sqcap b
sqcup||\sqcup||方并运算符||Square-cup operator||可表示格中的并或不交并；大算子版本为 bigsqcup。||Can denote a lattice join or disjoint union; bigsqcup is the large-operator form.||a\sqcup b
vee||\vee||逻辑或或并||Logical or or join||逻辑析取与格上的并都可采用此符号，需结合域读取。||Used for logical disjunction or lattice join according to the domain.||p\vee q
wedge||\wedge||逻辑与或楔积||Logical and or wedge||可表示逻辑合取或外代数楔积，含义依对象而定。||Can denote conjunction or an exterior product according to the objects.||p\wedge q
setminus||\setminus||集合差||Set difference||A setminus B 表示 A 中不属于 B 的元素。||A setminus B denotes elements of A that are not in B.||A\setminus B
wr||\wr||花环积符号||Wreath-product symbol||群论中常用于花环积，属于特殊的二元运算记号。||Common in group theory for a wreath product, a specialized binary operation.||G\wr H
bigtriangleup||\bigtriangleup||上三角运算符||Triangle-up operator||二元运算符字形，可按约定表示对称差。||A binary-operator glyph usable by convention for symmetric difference.||A\bigtriangleup B
bigtriangledown||\bigtriangledown||下三角运算符||Triangle-down operator||可表示自定义二元操作，与微分算子 nabla 的分类不同。||Can denote a defined binary operation; its math class differs from the nabla operator.||a\bigtriangledown b
triangleleft||\triangleleft||左三角运算符||Triangle-left operator||核心命令按二元运算符处理；群论关系有时用 AMS 的 lhd。||The core command is a binary operator; group-theory relations sometimes use AMS lhd.||a\triangleleft b
triangleright||\triangleright||右三角运算符||Triangle-right operator||与左三角成对，可用于作者定义的操作。||Pairs with triangleleft and can denote an author-defined operation.||a\triangleright b
oplus||\oplus||直和符号||Direct-sum symbol||常表示直和或异或；索引直和的大算子为 bigoplus。||Common for direct sums or exclusive-or; bigoplus is the indexed large operator.||V\oplus W
ominus||\ominus||圈减运算符||Circled-minus operator||圈内减号，作为作者定义的二元运算符使用。||A circled-minus glyph for an author-defined binary operation.||a\ominus b
otimes||\otimes||张量积符号||Tensor-product symbol||常表示张量积，也可表示 Kronecker 积等明确定义的操作。||Common for tensor products or explicitly defined operations such as a Kronecker product.||V\otimes W
oslash||\oslash||圈除运算符||Circled-division operator||可按约定表示逐元素除法等运算。||Can denote an operation such as elementwise division by convention.||a\oslash b
odot||\odot||圈点运算符||Circled-dot operator||常按约定表示逐元素乘积或另一种积。||Often denotes an elementwise product or another product by convention.||A\odot B
dagger||\dagger||剑号运算符||Dagger operator||可作为二元运算符，也常按约定用作伴随的上标标记。||Can serve as a binary operator or, by convention, a superscript adjoint marker.||A^\dagger
ddagger||\ddagger||双剑号||Double dagger||可用作第二种上标标记或特殊运算，应避免与 dagger 混淆。||Can serve as a second superscript marker or special operation; distinguish it from dagger.||A^\ddagger
amalg||\amalg||余积符号||Coproduct-style symbol||常用于余积或合并结构，语义依代数或范畴论约定。||Common for coproducts or amalgamated structures according to algebraic conventions.||A\amalg B
`;
 core`
leq||\leq||小于或等于||Less than or equal||弱不等式允许两边相等；不是严格小于。||A weak inequality permits equality, unlike strict less-than.||x\leq y
geq||\geq||大于或等于||Greater than or equal||与 leq 方向相反，同样允许相等。||The reverse of leq, also permitting equality.||x\geq0
neq||\neq||不等于||Not equal||表示两个数或对象不相等。||Denotes inequality between two numbers or objects.||x\neq0
equiv||\equiv||恒等或同余||Identical or congruent||可表示恒等、等价类或模同余，应说明采用的关系。||Can denote identity, an equivalence class, or modular congruence; specify the relation.||a\equiv b\pmod n
approx||\approx||近似等于||Approximately equal||表示近似关系，不等同于有精确误差界的等式。||Denotes an approximation rather than an equality with a specified error bound.||\pi\approx3.14159
sim||\sim||波浪关系||Tilde relation||可表示渐近等价、相似或服从分布，必须结合上下文。||Can denote asymptotic equivalence, similarity, or a distribution; context determines the meaning.||X\sim N(0,1)
simeq||\simeq||波浪等号||Tilde-equals relation||可表示近似或某种同构，与 approx 的含义约定应区分。||Can denote approximation or a type of isomorphism; distinguish its convention from approx.||A\simeq B
cong||\cong||全等或同构||Congruent or isomorphic||常用于几何全等或代数同构。||Common for geometric congruence or algebraic isomorphism.||G\cong H
asymp||\asymp||渐近量级关系||Asymptotic-comparability relation||常用作量级比较，具体上下界定义应由作者说明。||Common for asymptotic comparison; state the exact bound convention.||f(n)\asymp g(n)
propto||\propto||正比于||Proportional to||表示比例关系，比例常数是否依其他量变化需明确。||Denotes proportionality; specify whether the constant depends on other quantities.||y\propto x
ll||\ll||远小于||Much less than||常表示数量级较小；数论中也有专门的界记号含义。||Often means much smaller; number theory also assigns a bound-notation meaning.||\epsilon\ll1
gg||\gg||远大于||Much greater than||方向与 ll 相反，使用时应说明量级或界的含义。||The reverse of ll; explain the intended scale or bound meaning.||n\gg1
prec||\prec||先于关系||Precedes relation||可表示偏好或严格偏序，关系的具体性质由定义给出。||Can denote preference or a strict order, with its properties set by the definition.||x\prec y
succ||\succ||后于或优于关系||Succeeds relation||经济学中可表示严格偏好，用法取决于偏好关系的定义。||Can denote strict preference in economics, according to the defined preference relation.||x\succ y
preceq||\preceq||先于或等同||Precedes or equal||常用于弱偏序或半正定矩阵序。||Common for weak orders and semidefinite matrix orders.||A\preceq B
succeq||\succeq||后于或等同||Succeeds or equal||可表示弱偏好或反方向的矩阵序，允许等同情况。||Can denote weak preference or the reverse matrix order, including equality.||A\succeq0
in||\in||属于||Element of||左边是元素，右边是集合；不要与集合包含 subseteq 混用。||The left side is an element and the right a set; do not confuse it with subseteq.||x\in A
ni||\ni||包含元素||Contains as an element||是 in 的反方向，左边为集合、右边为元素。||The reverse of in, with the set on the left and element on the right.||A\ni x
notin||\notin||不属于||Not an element of||否定元素隶属，集合不包含的关系应另用相应包含符号。||Negates membership; non-inclusion between sets needs a subset-related symbol.||x\notin A
subset||\subset||子集关系||Subset relation||是否表示严格包含因作者约定而异；需要允许相等时用 subseteq。||Strictness varies by convention; use subseteq when equality is explicitly allowed.||A\subset B
supset||\supset||包含关系||Superset relation||subset 的反方向；严格性仍需与全文约定一致。||The reverse of subset, with strictness determined by the document's convention.||B\supset A
subseteq||\subseteq||子集或相等||Subset or equal||表示包含且允许相等，是集合之间的关系。||Denotes set inclusion allowing equality.||A\subseteq B
supseteq||\supseteq||包含或相等||Superset or equal||表示左边集合包含右边，并允许它们相等。||The left set contains the right, allowing equality.||B\supseteq A
sqsubseteq||\sqsubseteq||方子集或等同||Square-subset or equal||常用于域理论或偏序中的关系。||Common for relations in domain theory and ordered structures.||a\sqsubseteq b
sqsupseteq||\sqsupseteq||方包含或等同||Square-superset or equal||与 sqsubseteq 方向相反，适合定义成对的序关系。||The reverse of sqsubseteq, useful for paired order relations.||b\sqsupseteq a
models||\models||语义蕴涵||Models or semantic entailment||逻辑中常表示模型满足公式或语义蕴涵，区分于形式推导 vdash。||Often denotes satisfaction or semantic entailment, distinct from syntactic derivability vdash.||M\models\phi
vdash||\vdash||可推导||Derivability turnstile||常表示从一组假设形式推导出结论。||Commonly denotes formal derivability from assumptions.||\Gamma\vdash\phi
dashv||\dashv||反向推导符||Reverse turnstile||vdash 的反向字形，可用于伴随关系等明确定义的记号。||The reverse turnstile, usable in defined notation such as adjunctions.||F\dashv G
perp||\perp||垂直或独立关系||Perpendicular relation||常表示几何垂直；概率独立若采用此符号应说明约定。||Common for perpendicularity; define any use for probabilistic independence.||u\perp v
mid||\mid||整除或条件分隔||Divides or conditioning bar||提供关系间距，常用于整除或条件概率中的竖线。||Provides relational spacing for divisibility or conditional-probability bars.||\Pr(A\mid B)
parallel||\parallel||平行关系||Parallel relation||表示平行，按关系符号处理两侧间距；范数定界符使用 Vert 类命令。||Denotes parallelism with relation spacing; norm delimiters use Vert-style commands.||l\parallel m
smile||\smile||上弧关系||Smile relation||一种关系字形，可按领域约定表示特殊联系。||A relation glyph for a domain-specific connection.||a\smile b
frown||\frown||下弧关系||Frown relation||与 smile 成对的弧形关系，用于领域约定的记号。||An arc relation paired with smile for domain-specific notation.||a\frown b
doteq||\doteq||点等号||Dotted equals||可表示按定义相等，也可用于文中约定的其他相等关系。||Can denote equality by definition or another equality convention stated in the text.||f(x)\doteq x^2
bowtie||\bowtie||蝴蝶结关系||Bowtie relation||可表示连接、自然连接等操作；TeX 默认把它作为关系符号。||Can denote joins or other defined operations; TeX treats it as a relation.||R\bowtie S
`;
 sym`
sqsubset||\sqsubset||方子集关系||Square-subset relation||AMS 提供的严格式方包含字形，常用于偏序记号。||An AMS square-inclusion glyph often used for ordering notation.||a\sqsubset b
sqsupset||\sqsupset||方包含关系||Square-superset relation||与 sqsubset 反向，传统配置由 amssymb 提供。||The reverse of sqsubset, supplied by amssymb in traditional setups.||b\sqsupset a
nleq||\nleq||不小于等于||Not less than or equal||否定弱不等式；一般偏序中不必等价于严格大于。||Negates a weak inequality; in a general partial order it need not mean strictly greater.||a\nleq b
ngeq||\ngeq||不大于等于||Not greater than or equal||否定反方向弱不等式，不要自动将其解读为严格小于。||Negates the reverse weak inequality; do not automatically read it as strictly smaller.||a\ngeq b
nsubseteq||\nsubseteq||不是子集||Not a subset||至少有一个左集合元素不在右集合中，和不相等不同。||Some element of the left set is absent from the right, a different claim from inequality.||A\nsubseteq B
nsupseteq||\nsupseteq||不包含||Not a superset||否定左集合包含右集合的关系。||Negates the claim that the left set contains the right.||A\nsupseteq B
subsetneq||\subsetneq||真子集||Proper subset||明确表示包含且不相等，可避免 subset 的约定歧义。||Explicitly denotes inclusion without equality, avoiding the ambiguity of subset.||A\subsetneq B
supsetneq||\supsetneq||真包含||Proper superset||明确表示左集合包含右集合且不相等。||Explicitly says the left set contains the right without equality.||B\supsetneq A
leqslant||\leqslant||斜线小于等于||Slanted less-or-equal||使用倾斜的等号部分，含义通常与 leq 相同，字形不同。||Uses a slanted equality part, normally with the same meaning as leq.||x\leqslant y
geqslant||\geqslant||斜线大于等于||Slanted greater-or-equal||与 leqslant 成对，选择此字形后应全文统一。||Pairs with leqslant; use the chosen glyph consistently.||x\geqslant y
lesssim||\lesssim||小于或约等于||Less than or approximately equal||表示混合的界或近似关系，严格数学定义应在文中给出。||Denotes a mixed bound or approximate relation whose precise definition belongs in the text.||f(n)\lesssim g(n)
gtrsim||\gtrsim||大于或约等于||Greater than or approximately equal||与 lesssim 反向，表示大于或近似相等一类关系。||The reverse of lesssim, denoting a greater-than or approximately-equal relation.||a\gtrsim b
`;
 core`
leftarrow||\leftarrow||左箭头||Left arrow||可表示反向映射或赋值，含义由公式和领域决定。||Can denote a reverse map or assignment depending on the formula and field.||x\leftarrow y
rightarrow||\rightarrow||右箭头||Right arrow||可表示映射、收敛或推导；极限中常与下标一起使用。||Can denote a map, convergence, or a derivation; often used in limit subscripts.||x\rightarrow0
leftrightarrow||\leftrightarrow||左右单箭头||Left-right arrow||可表示双向对应或其他定义的关系，区别于双线等价箭头。||Can denote a two-way correspondence, distinct from a double-line equivalence arrow.||A\leftrightarrow B
Leftarrow||\Leftarrow||左双箭头||Left double arrow||逻辑中常表示左边命题由右边命题推出。||Commonly denotes that the proposition on the right implies the one on the left.||p\Leftarrow q
Rightarrow||\Rightarrow||右双箭头||Right double arrow||常表示左边命题蕴含右边命题。||Commonly denotes that the proposition on the left implies the one on the right.||p\Rightarrow q
Leftrightarrow||\Leftrightarrow||等价双箭头||Equivalence double arrow||常表示当且仅当，也就是双向蕴含。||Common for if and only if, meaning implication in both directions.||p\Leftrightarrow q
mapsto||\mapsto||映射到||Maps-to arrow||指明单个元素经映射后的像，与函数整体的定义域箭头不同。||Shows an element's image, unlike an arrow between the whole domain and codomain.||x\mapsto x^2
hookrightarrow||\hookrightarrow||右钩箭头||Right hooked arrow||常用于嵌入映射，映射的性质由定义给出。||Common for embeddings, with the map's properties given by its definition.||A\hookrightarrow B
hookleftarrow||\hookleftarrow||左钩箭头||Left hooked arrow||右钩箭头的反向字形，可表示反向写出的嵌入。||The reverse hooked arrow, usable for an embedding written in reverse order.||B\hookleftarrow A
leftharpoonup||\leftharpoonup||左上鱼叉箭头||Left harpoon, barb up||半箭头可用于成对关系；上下变体表达不同字形。||A half-arrow for paired relations; upper and lower forms have different glyphs.||a\leftharpoonup b
leftharpoondown||\leftharpoondown||左下鱼叉箭头||Left harpoon, barb down||向左且钩朝下的半箭头，与 leftharpoonup 配对。||A leftward, downward-barbed half-arrow paired with leftharpoonup.||a\leftharpoondown b
rightharpoonup||\rightharpoonup||右上鱼叉箭头||Right harpoon, barb up||右向半箭头，常作为配对箭头结构的一部分。||A rightward half-arrow, often part of a paired-arrow construction.||a\rightharpoonup b
rightharpoondown||\rightharpoondown||右下鱼叉箭头||Right harpoon, barb down||右向下钩半箭头，与上钩版本不同。||A rightward downward-barbed half-arrow, distinct from its upward-barbed form.||a\rightharpoondown b
rightleftharpoons||\rightleftharpoons||双向鱼叉箭头||Opposing harpoons||常用于可逆反应或平衡关系，也可用于约定的数学关系。||Common for reversible reactions or equilibrium, and usable for a defined mathematical relation.||A\rightleftharpoons B
uparrow||\uparrow||向上箭头||Up arrow||可表示递增或趋近，自动随定界符尺寸调整需结合 left/right。||Can denote increasing behavior or approach; automatic delimiter sizing needs left/right.||a_n\uparrow a
downarrow||\downarrow||向下箭头||Down arrow||常表示递减趋近，含义应与序列的定义对应。||Common for decreasing approach, with meaning tied to the sequence definition.||a_n\downarrow0
updownarrow||\updownarrow||上下箭头||Up-down arrow||提供双向竖直单箭头，可用于图表或自定义关系。||A vertical two-way single arrow for diagrams or defined relations.||A\updownarrow B
Uparrow||\Uparrow||向上双箭头||Up double arrow||向上的竖直双线箭头，图中的连线布局由绘图环境安排。||An upward vertical double arrow; the drawing environment handles diagram layout.||A\Uparrow B
Downarrow||\Downarrow||向下双箭头||Down double arrow||常在竖向推导中使用，具体对象位置需由排版环境安排。||Can be used in vertical derivations; an environment must arrange object positions.||A\Downarrow B
Updownarrow||\Updownarrow||上下双箭头||Up-down double arrow||竖向双线双箭头，可作成对关系记号。||A vertical two-way double arrow for a defined paired relation.||A\Updownarrow B
nearrow||\nearrow||东北箭头||North-east arrow||指向右上角，可表示递增趋势或图示方向。||Points to the upper right, useful for an increasing trend or diagram direction.||a_n\nearrow a
searrow||\searrow||东南箭头||South-east arrow||指向右下角，可表示递减趋势或斜向映射。||Points to the lower right, useful for a decreasing trend or diagonal map.||a_n\searrow0
swarrow||\swarrow||西南箭头||South-west arrow||指向左下角，复杂交换图的布局应另由绘图工具完成。||Points to the lower left; use a diagram tool for complex commutative-diagram layout.||A\swarrow B
nwarrow||\nwarrow||西北箭头||North-west arrow||指向左上角，可与其他斜箭头配合使用。||Points to the upper left and can be combined with other diagonal arrows.||A\nwarrow B
longrightarrow||\longrightarrow||长右箭头||Long right arrow||比普通右箭头更长，但不会随标签长度自动延展。||Longer than rightarrow, but it does not automatically stretch to a label's length.||A\longrightarrow B
longleftarrow||\longleftarrow||长左箭头||Long left arrow||提供固定的较长左箭头，适用于反向写出的关系。||A fixed longer left arrow for a relation written in reverse order.||B\longleftarrow A
longleftrightarrow||\longleftrightarrow||长左右箭头||Long left-right arrow||固定较长的单线双箭头，可使双向对应更易读。||A fixed longer two-way single arrow for a correspondence.||A\longleftrightarrow B
Longrightarrow||\Longrightarrow||长右双箭头||Long right double arrow||固定长度的长双线蕴含箭头，两侧逻辑间距需另行设置。||A fixed-length double implication arrow, with extra logical spacing supplied separately.||p\Longrightarrow q
Longleftarrow||\Longleftarrow||长左双箭头||Long left double arrow||长双线箭头的反方向，用于由右向左的蕴含。||The reverse long double arrow for implication from right to left.||p\Longleftarrow q
Longleftrightarrow||\Longleftrightarrow||长等价箭头||Long equivalence arrow||较长的双线双箭头，常用于逻辑等价。||A longer two-way double arrow commonly used for logical equivalence.||p\Longleftrightarrow q
longmapsto||\longmapsto||长映射到箭头||Long maps-to arrow||mapsto 的较长字形，适合右侧表达式较长的映射定义。||A longer maps-to glyph for mapping definitions with longer images.||x\longmapsto x^2+1
`;
 ams`
xrightarrow||\xrightarrow||带标签的右箭头||Labeled extensible right arrow||必选参数为上方标签，可选参数为下方标签；长度按内容延展。||The mandatory argument labels above and the optional argument below; the arrow stretches to fit.||A\xrightarrow[f]{g}B||\xrightarrow[f]{g}
xleftarrow||\xleftarrow||带标签的左箭头||Labeled extensible left arrow||左向箭头同样支持上、下标签，参数顺序与 xrightarrow 一致。||The left arrow supports upper and lower labels with the same argument order as xrightarrow.||B\xleftarrow{f}A||\xleftarrow{f}
`;
 sym`
twoheadrightarrow||\twoheadrightarrow||右双箭头头||Right two-headed arrow||常表示满射，用法依映射定义而定。||Common for surjections, according to the map's definition.||A\twoheadrightarrow B
twoheadleftarrow||\twoheadleftarrow||左双箭头头||Left two-headed arrow||满射常用符号的反向字形，左右对象顺序也相应反转。||The reversed common surjection glyph, with domain and codomain order reversed.||B\twoheadleftarrow A
rightleftarrows||\rightleftarrows||上下相反箭头||Opposing full arrows||两条相反方向的完整箭头；与鱼叉形状不同。||Two full arrows pointing in opposite directions, distinct from harpoons.||A\rightleftarrows B
leftrightarrows||\leftrightarrows||反序上下箭头||Reversed opposing full arrows||与 rightleftarrows 的上下排列顺序相反。||Uses the opposite vertical arrow ordering from rightleftarrows.||A\leftrightarrows B
rightsquigarrow||\rightsquigarrow||右波浪箭头||Right squiggly arrow||常用于约定的变换或弱关系，具体含义由文中定义。||Common for a defined transformation or weaker relation, with its meaning stated in the text.||A\rightsquigarrow B
`;
 core`
sum||\sum||求和算子||Summation operator||使用下标和上标给出范围；显示样式通常把限放在上下。||Use subscripts and superscripts for limits; display style normally places them above and below.||\sum_{i=1}^{n}x_i
prod||\prod||连乘算子||Product operator||用于一族因子的积，和大写希腊字母 Pi 是不同数学对象。||An indexed product, distinct from the Greek capital Pi.||\prod_{i=1}^{n}x_i
coprod||\coprod||余积大算子||Coproduct operator||大型余积符号，可带索引，具体结构取决于所在范畴。||A large indexed coproduct symbol whose structure depends on the category.||\coprod_{i\in I}A_i
int||\int||积分算子||Integral operator||普通积分上下限默认通常位于右侧；积分变量应在公式中明确。||Integral limits normally default to the side; state the integration variable in the formula.||\int_a^b f(x)\,\mathrm{d}x
oint||\oint||闭合积分||Contour integral||积分符号上的圈常表示闭合路径，路径方向仍需说明。||The circle commonly denotes a closed path; state the orientation.||\oint_C f(z)\,\mathrm{d}z
bigcap||\bigcap||大型交集||Indexed intersection||用于集合族的交，可把索引集合写在下方。||An intersection of a family of sets, with indexing information below.||\bigcap_{i\in I}A_i
bigcup||\bigcup||大型并集||Indexed union||用于集合族的并，与二元 cup 的尺寸和算子类别不同。||A union of a family, with a different size and operator role from binary cup.||\bigcup_{i\in I}A_i
biguplus||\biguplus||大型不交并||Indexed disjoint union||用于索引不交并或其他已定义的 uplus 运算。||An indexed disjoint union or another defined uplus operation.||\biguplus_{i\in I}A_i
bigsqcup||\bigsqcup||大型方并||Indexed square union||用于一族方并运算，大算子可配上下限。||An indexed square-union operation with large-operator limits.||\bigsqcup_{i\in I}A_i
bigvee||\bigvee||大型析取或并||Indexed disjunction or join||可表示一族命题的析取或格元素的并。||An indexed disjunction of propositions or join of lattice elements.||\bigvee_{i=1}^{n}p_i
bigwedge||\bigwedge||大型合取或交||Indexed conjunction or meet||可表示一族命题的合取或格元素的交。||An indexed conjunction of propositions or meet of lattice elements.||\bigwedge_{i=1}^{n}p_i
bigoplus||\bigoplus||大型直和||Indexed direct sum||表示多个向量空间等对象的直和，索引写作上下限。||An indexed direct sum of objects such as vector spaces.||\bigoplus_{i=1}^{n}V_i
bigotimes||\bigotimes||大型张量积||Indexed tensor product||用于索引张量积；尺寸比二元 otimes 大。||An indexed tensor-product operator, larger than binary otimes.||\bigotimes_{i=1}^{n}V_i
bigodot||\bigodot||大型圈点运算||Indexed circled-dot operation||用于索引圈点积，积的具体含义由文中定义。||An operator for an indexed circled-dot product, as defined in the text.||\bigodot_{i=1}^{n}A_i
lim||\lim||极限算子||Limit operator||函数名为正体，趋近条件通常作为下标给出。||An upright operator name with the approaching condition normally supplied as a subscript.||\lim_{x\to0}\frac{\sin x}{x}
limsup||\limsup||上极限||Limit superior||表示序列上极限，不同于求每个有限样本的最大值。||The limit superior of a sequence, distinct from a finite-sample maximum.||\limsup_{n\to\infty}a_n
liminf||\liminf||下极限||Limit inferior||表示序列下极限，与 limsup 组成一对界。||The limit inferior of a sequence, paired with limsup.||\liminf_{n\to\infty}a_n
sup||\sup||上确界||Supremum||上确界不要求在集合中取到，区别于 max。||A least upper bound need not be attained, unlike max.||\sup_{x\in A}f(x)
inf||\inf||下确界||Infimum||下确界不要求取到，区别于 min。||A greatest lower bound need not be attained, unlike min.||\inf_{x\in A}f(x)
max||\max||最大值||Maximum||最大值意味着在所给集合中取到，应区分最大化位置 argmax。||A maximum is attained in the stated set; distinguish the maximizing argument argmax.||\max_{x\in A}f(x)
min||\min||最小值||Minimum||表示在指定集合中取到的最小值，与最小化参数不同。||Denotes the minimum attained in a specified set, distinct from the minimizing argument.||\min_{x\in A}f(x)
sin||\sin||正弦||Sine||使用正体函数名与正确间距，裸写 sin 会变成三个变量。||Provides an upright function name and spacing; bare sin becomes three variables.||\sin x
cos||\cos||余弦||Cosine||标准三角函数命令，参数括号是否添加按公式可读性决定。||A standard trigonometric operator; use argument parentheses when readability requires them.||\cos(x+y)
tan||\tan||正切||Tangent||正体正切函数名，注意它与双曲正切 tanh 不同。||An upright tangent name, distinct from hyperbolic tangent tanh.||\tan x=\frac{\sin x}{\cos x}
arcsin||\arcsin||反正弦||Inverse sine||反函数名为一个运算符；值域和分支应由数学定义说明。||The inverse-function name is one operator; specify its range and branch mathematically.||\arcsin(1)=\pi/2
arccos||\arccos||反余弦||Inverse cosine||反余弦运算符，不要用负一次幂与倒数混淆。||An inverse-cosine operator; avoid confusing inverse-function notation with a reciprocal.||\arccos(0)=\pi/2
arctan||\arctan||反正切||Inverse tangent||提供标准反正切名称，双参数 arctan 需按所用定义另行命名。||The standard inverse-tangent name; a two-argument variant needs its own defined name.||\arctan(1)=\pi/4
sinh||\sinh||双曲正弦||Hyperbolic sine||双曲正弦函数名，整体排为正体运算符；普通正弦使用 sin。||The hyperbolic-sine name, typeset as one upright operator; ordinary sine uses sin.||\sinh x=(e^x-e^{-x})/2
cosh||\cosh||双曲余弦||Hyperbolic cosine||双曲余弦的标准运算符命令。||The standard operator command for hyperbolic cosine.||\cosh^2x-\sinh^2x=1
tanh||\tanh||双曲正切||Hyperbolic tangent||双曲正切函数名，常见于数学和神经网络表达式，应整体排为运算符。||The hyperbolic-tangent name, common in mathematics and neural networks, set as one operator.||\tanh x=\frac{\sinh x}{\cosh x}
log||\log||对数||Logarithm||对数底数可用下标给出；省略时应说明采用的底数约定。||The logarithm base can be given as a subscript; state the convention when omitting it.||\log_b x
ln||\ln||自然对数||Natural logarithm||通常表示以 e 为底的对数，排版为正体运算符。||Normally denotes a logarithm to base e, typeset as an upright operator.||\ln e=1
exp||\exp||指数函数||Exponential function||复杂指数可用 exp(内容) 提高可读性，函数参数仍需正确分组。||exp(contents) can improve readability for complex exponents; group arguments correctly.||\exp(-x^2)
det||\det||行列式||Determinant||提供正体算子名，与 vmatrix 的竖线记号是两种表达方式。||An upright operator name, an alternative notation to vmatrix determinant bars.||\det(A)
gcd||\gcd||最大公约数||Greatest common divisor||标准算子名，通常将两个或多个整数放在括号参数中。||A standard operator name, normally followed by integer arguments in parentheses.||\gcd(12,18)=6
ker||\ker||核||Kernel||常表示线性映射的核。||Commonly denotes the kernel of a linear map.||\ker T
dim||\dim||维数||Dimension||维数运算符名，d、i、m 整体排为正体。||The dimension operator name, with d, i, and m typeset together in upright type.||\dim V=n
arg||\arg||辐角||Argument of a complex number||常表示复数的辐角，区别于最大化参数 argmax。||Common for the argument of a complex number, distinct from the maximizing argument argmax.||\arg z
Pr||\Pr||概率算子||Probability operator||核心正体 Pr 运算符，可作为概率记号；与黑板粗体 P 是不同字体约定。||A core upright Pr operator usable for probability, distinct from a blackboard-bold P convention.||\Pr(A\mid B)
`;
 ams`
iint||\iint||二重积分||Double integral||AMS 提供紧排的二重积分符号，积分域和变量应明确。||AMS provides a tightly spaced double-integral symbol; state the region and variables.||\iint_D f(x,y)\,\mathrm{d}x\,\mathrm{d}y
iiint||\iiint||三重积分||Triple integral||用于三重积分，多个微分之间可加细空格以区分变量。||For triple integrals; thin spaces between differentials help separate variables.||\iiint_V f\,\mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z
iiiint||\iiiint||四重积分||Quadruple integral||AMS 提供四重积分的组合字形；浏览器字体对独立 Unicode 字形的支持有所不同。||AMS supplies a quadruple-integral construction. Support for a separate Unicode glyph varies by browser font.||\iiiint_D f\,\mathrm{d}V
idotsint||\idotsint||省略号多重积分||Multiple integral with dots||在积分符号之间加省略号，用于没有逐个写出的多重积分。||Places dots between integral signs for a multiple integral not written sign by sign.||\idotsint_D f\,\mathrm{d}x_1\cdots\mathrm{d}x_n
operatorname-Var||\operatorname{Var}||方差算子名||Variance operator name||Var 不是基础内置算子名，用 operatorname 获得正体与运算符间距。||Var is not a core built-in name; operatorname supplies upright type and operator spacing.||\operatorname{Var}(X)=\sigma^2
operatorname-Cov||\operatorname{Cov}||协方差算子名||Covariance operator name||把 Cov 整体排成正体运算符，并设置运算符间距。||Typesets Cov as one upright operator with operator spacing.||\operatorname{Cov}(X,Y)
operatorname-argmax||\operatorname*{arg\,max}||最大化参数||Maximizing argument||星号允许运算符带显示型上下限，结果是参数位置而非最大值。||The star permits display limits; the result is an argument rather than the maximum value.||\operatorname*{arg\,max}_{x\in A}f(x)||\operatorname*{arg\,max}
`;
 core`
hat||\hat{x}||帽重音||Hat accent||适合单字母估计值等记号，宽表达式可用 widehat。||Suitable for single-letter estimates; widehat suits broader expressions.||\hat{\beta}
widehat||\widehat{ABC}||宽帽重音||Wide hat accent||在较宽内容上放帽子；字形宽度由数学字体可用尺寸决定。||Places a hat over wider contents; available font sizes determine its shape.||\widehat{ABC}
bar||\bar{x}||短横重音||Bar accent||常表示均值或共轭，主要用于单符号。||Common for a mean or conjugate, mainly on a single symbol.||\bar{x}=\frac1n\sum_i x_i
overline||\overline{AB}||上横线||Overline||横线延伸到整个参数宽度，可表示线段或共轭。||The line spans the full argument, useful for a segment or conjugate.||\overline{AB}
underline||\underline{x+y}||下横线||Underline||在参数下方画线，可按约定用作向量标记。||Draws a line below the argument, usable by convention as a vector marker.||\underline{x}
tilde||\tilde{x}||波浪重音||Tilde accent||常作另一估计值或变换变量，适合单符号。||Often denotes another estimate or transformed variable, best for one symbol.||\tilde{\beta}
widetilde||\widetilde{XYZ}||宽波浪重音||Wide tilde accent||适合多符号参数，区别于普通 tilde 的窄重音。||Suits a multi-symbol argument, unlike the narrower tilde accent.||\widetilde{XYZ}
vec||\vec{x}||向量箭头重音||Vector arrow accent||在字母上方放右箭头，可用来表示向量。||Places a right arrow over a letter, usable for vector notation.||\vec{v}
dot||\dot{x}||一阶点重音||Dot accent||在参数上方加一个点，物理学中常用作时间导数的记号。||Places a dot over the argument, commonly used for a time derivative in physics.||\dot{x}(t)
ddot||\ddot{x}||二阶点重音||Double-dot accent||常用于二阶时间导数，点重音应直接作用于所需符号。||Common for a second time derivative; apply the accent directly to the intended symbol.||\ddot{x}(t)
breve||\breve{x}||短音重音||Breve accent||提供上方小弧，可用于作者定义的变量区分。||Provides a small upper arc for a defined distinction between variables.||\breve{x}
check||\check{x}||楔形重音||Check accent||为单符号添加倒帽形状，常作另一个版本的变量标记。||Adds an inverted-hat shape, often marking another version of a variable.||\check{x}
acute||\acute{x}||尖重音||Acute accent||数学模式中的斜向尖重音，与正文重音命令的输入机制不同。||An acute math accent with different input conventions from text accents.||\acute{x}
grave||\grave{x}||钝重音||Grave accent||为数学符号添加向另一侧倾斜的重音。||Adds the oppositely sloping accent to a mathematical symbol.||\grave{x}
mathring||\mathring{x}||圆圈重音||Ring accent||在参数上方放小圈，可按约定表示内点等记号。||Places a ring above the argument, usable by convention for notation such as an interior point.||\mathring{A}
overbrace||\overbrace{a+b}^{n}||上大括号||Overbrace||括住上方内容，后接上标可给这组内容加说明。||Braces material from above; a following superscript labels the group.||\overbrace{x+\cdots+x}^{n}
underbrace||\underbrace{a+b}_{n}||下大括号||Underbrace||括住下方内容，后接下标作为分组说明。||Braces material from below; a following subscript labels the group.||\underbrace{x+\cdots+x}_{n}
ldots||\ldots||基线省略号||Baseline ellipsis||逗号分隔序列常用基线点，与乘加序列的 cdots 不同。||Common in comma-separated lists, unlike cdots for centered operations.||x_1,\ldots,x_n
cdots||\cdots||居中省略号||Centered ellipsis||在加号、乘号等居中运算序列中使用。||Used between centered operators such as plus or multiplication signs.||x_1+\cdots+x_n
vdots||\vdots||竖直省略号||Vertical ellipsis||表示矩阵中竖直延续，需放在合适的单元格中。||Indicates vertical continuation in a matrix and belongs in the appropriate cell.||\begin{array}{c}a\\\vdots\\b\end{array}
ddots||\ddots||对角省略号||Diagonal ellipsis||表示矩阵沿右下对角方向延续。||Indicates continuation down the rightward diagonal of a matrix.||\begin{array}{cc}a&0\\0&\ddots\end{array}
frac||\frac{a}{b}||分式||Fraction||分子与分母是两个必选参数，行内样式通常较小。||Numerator and denominator are mandatory arguments; inline fractions are normally smaller.||\frac{a+b}{c+d}
sqrt||\sqrt{x}||平方根||Square root||必选参数是被开方内容；可选参数可指定根指数。||The mandatory argument is the radicand; an optional argument gives the root index.||\sqrt[3]{x}
langle||\langle||左角括号||Left angle delimiter||用于内积或生成结构的左侧，与大于小于关系字形不同。||The opening delimiter for inner products or generated structures, distinct from inequality glyphs.||\langle x,y\rangle
rangle||\rangle||右角括号||Right angle delimiter||与 langle 配对，成对书写才能明确整个结构。||Pairs with langle to delimit the full structure.||\langle x,y\rangle
lceil||\lceil||左上取整括号||Left ceiling delimiter||与 rceil 配对，常表示向上取整。||Pairs with rceil, commonly for the ceiling function.||\lceil x\rceil
rceil||\rceil||右上取整括号||Right ceiling delimiter||向上取整括号的右半，与 lceil 配对。||The closing ceiling delimiter, paired with lceil.||\lceil x\rceil
lfloor||\lfloor||左下取整括号||Left floor delimiter||与 rfloor 配对，常表示向下取整。||Pairs with rfloor, commonly for the floor function.||\lfloor x\rfloor
rfloor||\rfloor||右下取整括号||Right floor delimiter||向下取整括号的右半，与 lfloor 配对。||The closing floor delimiter, paired with lfloor.||\lfloor x\rfloor
backslash||\backslash||数学反斜杠||Math backslash||在数学中提供反斜杠字形；集合差通常用带二元间距的 setminus。||A backslash glyph in mathematics; set differences normally use binary-spaced setminus.||A\backslash B
Vert||\Vert||双竖线定界符||Double-bar delimiter||普通双竖线字形；有左右语义的范数定界符可用 lVert 和 rVert。||A double-bar delimiter; lVert and rVert add left and right roles for norms.||\Vert x\Vert
`;
 ams`
lvert||\lvert||左单竖线||Left single-bar delimiter||左侧单竖线定界符，按开定界符处理间距，常用于绝对值。||A single-bar opening delimiter with delimiter spacing, commonly used for absolute values.||\lvert x\rvert
rvert||\rvert||右单竖线||Right single-bar delimiter||与 lvert 配对，按闭定界符处理间距。||Pairs with lvert and uses closing-delimiter spacing.||\lvert x\rvert
lVert||\lVert||左双竖线||Left double-bar delimiter||用于范数等结构的开定界符，可配 left 自动调整尺寸。||An opening delimiter for norms, optionally sized with left.||\lVert x\rVert_2
rVert||\rVert||右双竖线||Right double-bar delimiter||与 lVert 配对，范数下标通常跟在这个右定界符之后。||Pairs with lVert; a norm subscript normally follows this closing delimiter.||\lVert x\rVert_2
overset||\overset{!}{=}||上置标记||Overset annotation||把第一个参数放到第二个参数上方，适合给关系添加说明。||Places the first argument above the second, useful for annotating relations.||a\overset{!}{=}b
underset||\underset{n\to\infty}{\longrightarrow}||下置标记||Underset annotation||把第一参数放到第二参数下方，复杂运算符仍宜用专门结构。||Places the first argument below the second; specialized structures remain preferable for complex operators.||a_n\underset{n\to\infty}{\longrightarrow}a
overrightarrow||\overrightarrow{AB}||长向量箭头||Extensible vector arrow||箭头覆盖整个参数宽度，适合由多个字母组成的向量。||The arrow spans the full argument, useful for a vector named by several letters.||\overrightarrow{AB}
overleftarrow||\overleftarrow{AB}||左向长重音箭头||Extensible left accent arrow||为宽参数提供左向箭头，方向与 overrightarrow 相反。||Provides a left-pointing arrow over a wide argument.||\overleftarrow{AB}
dfrac||\dfrac{a}{b}||显示型分式||Display-style fraction||显式要求显示样式分式，在行内可能增加行高。||Forces a display-style fraction, which can increase line height inline.||\dfrac{a+b}{c+d}
tfrac||\tfrac{a}{b}||文本型分式||Text-style fraction||显式要求文本样式分式，适合显示公式中的次要小分式。||Forces a text-style fraction, useful for smaller secondary fractions in a display.||1+\tfrac12
binom||\binom{n}{k}||二项式系数||Binomial coefficient||给上下两参数加圆括号且没有分数线，适合组合数。||Stacks arguments in parentheses without a fraction bar, suitable for combinatorial coefficients.||\binom{n}{k}
boxed||\boxed{x=1}||公式框||Boxed formula||在参数周围加矩形框。||Adds a rectangular frame around the argument.||\boxed{E=mc^2}
text||\text{if}||数学内文本||Text within math||在数学式中加入正常文字，并随上下标等数学样式调整字号。||Adds normal text inside math and adapts size in scripts and other math styles.||x=0\quad\text{if }y=1
`;
 core`
thinspace||\,||细数学空格||Thin math space||常用于积分中微分之前的正细空格。||A positive thin space commonly placed before a differential in an integral.||\int f(x)\,\mathrm{d}x||a\,b
mediumspace||\:||中数学空格||Medium math space||比细空格宽，手动使用时避免破坏运算符默认间距。||Wider than a thin space; avoid overriding suitable default operator spacing.||a\:b||a\:b
thickspace||\;||厚数学空格||Thick math space||较宽的数学空格，可分隔逻辑条件等内容。||A thicker mathematical space, useful between logical conditions.||p\;\Rightarrow\;q||a\;b
negative-thinspace||\!||负细数学空格||Negative thin math space||缩小相邻内容的间距，用于局部调整公式排版。||Reduces nearby spacing for local adjustments to a formula.||\int\!\int_D f(x,y)\,\mathrm{d}x\,\mathrm{d}y||a\!b
quad||\quad||一 em 空格||One-em math space||常用于公式与条件之间的间隔，宽度随当前字体字号变化。||Common between a formula and its condition; width scales with the current font size.||x>0\quad y>0||a\quad b
qquad||\qquad||两 em 空格||Two-em math space||提供比 quad 更宽的分隔，适合并列的独立小表达式。||A wider gap than quad, suited to separate short expressions.||a=b\qquad c=d||a\qquad b
mathbb-E||\mathbb{E}||黑板粗体期望记号||Blackboard-bold expectation notation||期望常用的黑板粗体 E，传统配置需要 AMS 字体。||A blackboard-bold E commonly used for expectation, requiring AMS fonts in traditional setups.||\mathbb{E}(X)
mathbb-P||\mathbb{P}||黑板粗体概率记号||Blackboard-bold probability notation||概率常用的黑板粗体 P。||A blackboard-bold P commonly used for probability.||\mathbb{P}(A)
mathrm-d||\mathrm{d}||正体微分 d||Upright differential d||采用正体微分约定时使用；空格与积分变量需另行给出。||For an upright differential convention; spacing and the integration variable are supplied separately.||\int f(x)\,\mathrm{d}x
mathrm-e||\mathrm{e}||正体指数常数 e||Upright exponential constant e||一些规范把常数 e 排为正体；需与变量 e 的约定保持区别。||Some styles set the constant e upright; distinguish it from a variable e by convention.||\mathrm{e}^{x}
mathrm-i||\mathrm{i}||正体虚数单位 i||Upright imaginary unit i||采用正体虚数单位约定时使用。||Used under an upright-imaginary-unit convention.||\mathrm{e}^{\mathrm{i}\pi}+1=0
`;
 /* AMS alphabets are not in the core even though the source rows are grouped above. */
 for(const item of D.dictionary) if(item.id==='symbol-mathbb-E'||item.id==='symbol-mathbb-P') item.package='amssymb';
 for(const item of D.dictionary) if(item.id==='symbol-overrightarrow'||item.id==='symbol-overleftarrow') item.package='LaTeX core';
})();
