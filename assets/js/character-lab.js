(() => {
 const A=window.Cookbook,host=document.getElementById('character-lab');if(!host)return;
 const items=[
 ['%','\\%','注释符，忽略本行余下源码。','Starts a comment and discards the rest of the source line.','比例为 10\\%。','The rate is 10\\%.'],
 ['$','\\$','进入或退出行内数学模式。','Starts or ends inline math mode.','价格是 \\$20。','The price is \\$20.'],
 ['&','\\&','分隔表格或数学对齐列。','Separates table or math alignment columns.','A \\& B','A \\& B'],
 ['#','\\#','宏定义中的参数标记，如 #1。','Marks a parameter in a macro definition, such as #1.','编号 \\#3','Item \\#3'],
 ['_','\\_','数学模式中的下标标记。','Introduces a subscript in math mode.','文件名 data\\_2026.csv','File name data\\_2026.csv'],
 ['{','\\{','开始一个分组或必选参数。','Starts a group or mandatory argument.','集合 $\\{1,2\\}$','The set $\\{1,2\\}$'],
 ['}','\\}','结束一个分组或必选参数。','Ends a group or mandatory argument.','集合 $\\{1,2\\}$','The set $\\{1,2\\}$'],
 ['~','\\textasciitilde{}','不换行空格；\\~{a} 是文本重音。','A nonbreaking space; \\~{a} is a text accent.','Figure~\\ref{fig:demo}','Figure~\\ref{fig:demo}'],
 ['^','\\textasciicircum{}','数学模式中的上标标记。','Introduces a superscript in math mode.','$x^{n+1}$','$x^{n+1}$'],
 ['\\','\\textbackslash{}','引入控制序列；\\\\ 是特定环境中的换行命令。','Introduces a control sequence; \\\\ ends a line in certain environments.','\\verb|C:\\data|','\\verb|C:\\data|']
 ];
 function draw(){const previous=document.getElementById('special-input')?.value||'% & _';const W=(z,e)=>A.lang==='zh'?z:e;host.innerHTML=`<h2>${W('特殊字符实验','Special character experiment')}</h2><p>${W('输入字符，比较其原始语法与文本模式的正确写法。','Enter characters to compare their syntax with their literal spelling in text mode.')}</p><label>${W('要检查的字符','Characters to inspect')}<input id="special-input" type="text" value="${A.esc(previous)}" maxlength="200" spellcheck="false"></label><div id="special-result" class="table-scroll"></div><a class="text-link" href="encyclopedia.html#escapes">${W('阅读特殊字符与转义专题','Read about special characters and escaping')}</a>`;const input=document.getElementById('special-input'),result=document.getElementById('special-result');const render=()=>{const matches=items.filter(([c])=>input.value.includes(c));result.innerHTML=matches.length?`<table class="comparison-table"><thead><tr><th>${W('字符','Character')}</th><th>${W('语法作用','Syntax')}</th><th>${W('文本转义','Text spelling')}</th><th>${W('使用示例','Example')}</th></tr></thead><tbody>${matches.map(([c,escape,z,e,ez,ee])=>`<tr><td><code>${A.esc(c)}</code></td><td>${A.esc(W(z,e))}</td><td><code>${A.esc(escape)}</code></td><td><code>${A.esc(W(ez,ee))}</code></td></tr>`).join('')}</tbody></table>`:`<p>${W('这里没有检测到 TeX 特殊字符。','No TeX special characters were detected.')}</p>`;};input.addEventListener('input',render);render();}
 window.addEventListener('languagechange',draw);draw();
})();
