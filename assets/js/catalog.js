/* Resolve content relationships without fetching JSON, so the release works under file://. */
(() => {
 const D=window.ATELIER,L=window.LATEX_DATA;
 const packageLinks={'float-tools':['float','placeins','floatrow','rotating','adjustbox'],'large-tables':['pdflscape','adjustbox','graphicx','rotating'],'graphicx':['graphicx','adjustbox'],'cleveref':['cleveref','varioref','nameref'],'contents-bookmarks':['bookmark','tocloft','titletoc'],'hyperref':['hyperref','url','xurl']};for(const [id,packages] of Object.entries(packageLinks)){const e=D.entries.find(e=>e.id===id);if(e)e.packages=[...new Set([...e.packages,...packages])];}
 const maps={start:'mwe',structure:'paragraphs','math-inline':'inline-display','math-align':'align',figures:'float-placement',tables:'tabular',crossref:'cross-references',citation:'biblatex',macros:'programming-newcommand',chinese:'ctexart',debug:'error-undefined-command',project:'project-multifile'};
 L.lessons.forEach(l=>l.entry=maps[l.id]);
 L.lessons.find(l=>l.id==='macros').code=L.lessons.find(l=>l.id==='macros').code.replace('{amsfonts}','{amsmath,amsfonts}');
 const chineseSnippet=L.snippets.find(s=>s.id==='chinese-doc');chineseSnippet.code=chineseSnippet.code.replace('[UTF8]','[UTF8,fontset=fandol]').replace('\\title','\\usepackage{amsmath,amssymb}\n\\title');
 const citationExample=D.examples.find(x=>x.id==='bibliography-biblatex');if(citationExample)L.lessons.find(l=>l.id==='citation').code=citationExample.code;
 // Correct the original lesson dependency: mathbb is provided by amsfonts/amssymb.
 const cn=L.lessons.find(l=>l.id==='chinese');cn.code=cn.code.replace('{amsmath}','{amsmath,amssymb}');
 const extra=[
 ['intermediate','ctexart','中文文章与字体','Chinese articles and fonts','在 TeX 项目中编译中文文章，检查 Fandol 字体。','Compile a Chinese article and check its Fandol fonts.'],
 ['intermediate','mathbb','数学字体与算子','Math alphabets and operators','把数域与变量分别写成黑板粗体和斜体。','Use blackboard bold for number systems and italics for variables.'],
 ['intermediate','cases','分段函数','Piecewise functions','用 cases 写出两段函数并说明定义域。','Write a two-branch cases expression and state its domain.'],
 ['intermediate','tabularx','自动分配列宽','Flexible table widths','让说明列自动换行，同时保留数字列。','Let a description column wrap while preserving numeric columns.'],
 ['intermediate','longtable','跨页数据表','Multipage data tables','建立重复表头，检查第一页与末页的页脚。','Create repeated headers and check first-page and last-page footers.'],
 ['intermediate','natbib','作者—年份引用','Author–year citations','比较正文引用与括号引用，运行 BibTeX 编译链。','Compare textual and parenthetical citations and run BibTeX.'],
 ['intermediate','hyperref','链接与元数据','Links and metadata','设置 PDF 标题和作者，验证标签跳转。','Set PDF title and author and check label links.'],
 ['advanced','standalone','独立图形','Standalone graphics','导出裁切后的图形 PDF，并在文章中引用。','Export a cropped graphic PDF for inclusion in an article.'],
 ['advanced','beamer','报告框架','Presentation structure','建立标题、方法、结果与参考资料页。','Build title, methods, results, and references frames.'],
 ['advanced','tikz-paths','TikZ 坐标与节点','TikZ coordinates and nodes','修改坐标与箭头，解释图形的结构。','Change coordinates and arrows and explain the diagram structure.'],
 ['advanced','pgfplots-axis','数据与坐标轴','Data and axes','标明坐标单位，添加第二条曲线和图例。','Label axis units and add a second curve with a legend.'],
 ['advanced','programming-newcommand','复用宏','Reusable macros','给带参数的宏写一条定义与两次调用。','Define a macro with an argument and use it twice.'],
 ['advanced','programming-expl3','LaTeX3 入门','An introduction to LaTeX3','识别 expl3 函数的参数签名和局部变量。','Identify expl3 argument signatures and local variables.'],
 ['academic','report','报告与章节','Reports and chapters','组织章节与附录，检查编号变化。','Organize chapters and appendices and check numbering.'],
 ['academic','threeparttable','回归表与注释','Regression tables and notes','给模型估计表添加解释样本和标准误的表注。','Add notes describing the sample and standard errors.'],
 ['academic','gb7714','中文参考文献','Chinese bibliographies','选择一套引用后端，并保持模板的配置一致。','Choose one bibliography backend and keep the template consistent.'],
 ['academic','memoir','长文档与书籍','Books and long documents','区分前置内容、正文和后置内容。','Separate front matter, main matter, and back matter.']
 ];
 D.pathways=[{id:'beginner',title:{zh:'入门：第一份文档',en:'Beginner: your first document'},description:{zh:'12 节基础课，从语法走到可交付项目。',en:'12 foundation lessons, from syntax to a shareable project.'},lessons:L.lessons.map(l=>l.id)},...['intermediate','advanced','academic'].map((id,i)=>({id,title:[{zh:'中级：公式与图表',en:'Intermediate: math and figures'},{zh:'进阶：图形与定制',en:'Advanced: graphics and customization'},{zh:'学术写作：完整工作流',en:'Academic writing: complete workflows'}][i],description:{zh:'前置知识：入门文档结构、数学模式与宏包加载。',en:'Prerequisites: basic document structure, math mode, and package loading.'},lessons:[]}))];
 extra.forEach(([path,id,zh,en,tz,te])=>{let e=D.entries.find(e=>e.id===id);if(!e){const modules={ 'tikz-basics':'tikz','pgfplots-basics':'pgfplots','newcommand':'programming','expl3':'programming' };e=D.entries.find(e=>e.module===modules[id]);}if(!e)return;const x=D.examples.find(x=>x.id===e.example);const lid='course-'+e.id;L.lessons.push({id:lid,module:path,entry:e.id,minutes:15,kind:'document',title:{zh,en},lead:e.summary,concept:e.sections[0]?.body||e.summary,bullets:{zh:[tz,'检查导言区的宏包与编译引擎，导出源码后用 TeX 完整编译。'],en:[te,'Check packages and the engine, then export and compile with TeX.']},code:x?.code||e.syntax||'',tip:{zh:'按任务修改示例；对应百科条目列出了可用选项和适用条件。',en:'Adapt the example to your task. The linked article explains its options and requirements.'},task:{zh:tz,en:te}});D.pathways.find(p=>p.id===path).lessons.push(lid);});
 D.dictionary.forEach(r=>{if(!r.entry||!D.entries.some(e=>e.id===r.entry)){r.entry=D.entries.find(e=>e.module===r.module)?.id||'math-symbols';}});
 const unique=new Map();for(const r of D.dictionary){const command=r.command.trim();if(unique.has(command)){const primary=unique.get(command);primary.relatedEntries=[...new Set([...(primary.relatedEntries||[]),r.entry])].filter(id=>id!==primary.entry);}else unique.set(command,r);}D.dictionary=[...unique.values()];
 D.searchCount=D.entries.length+D.dictionary.length+D.examples.length;
})();
