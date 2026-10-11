(() => {
 const A=window.Cookbook,D=A.catalog,root=document.getElementById('home-content'),W=(z,e)=>A.lang==='zh'?z:e;
 let cleanupCampaign=()=>{};
 function draw(){cleanupCampaign();const next=A.data.lessons.find(l=>!A.isDone(l.id))||A.data.lessons[0];
 root.innerHTML=`<div class="container"><section class="campaign-hero" aria-labelledby="campaign-title">
 <div class="campaign-copy">
  <h1 id="campaign-title">${W(`<span class="campaign-title-line">让 ${A.latexLogo()}</span><span class="campaign-title-line">再次伟大</span>`,`<span class="campaign-title-line">MAKE ${A.latexLogo()}</span><span class="campaign-title-line">GREAT AGAIN</span>`)}</h1>
  <p>${W('在实验室编辑源码，或沿学习路径写出第一篇文档。','Edit source in the playground, or follow a learning path to write your first document.')}</p>
  <a class="btn campaign-cta" href="playground.html">${W('打开 LaTeX 实验室','Open the LaTeX playground')}</a>
 </div>
 <figure class="campaign-portrait">
  <a class="campaign-scene" href="assets/images/trump-pointing.png" target="_blank" rel="noopener noreferrer" aria-label="${W('查看特朗普人像原图（新标签页）','View the Donald Trump portrait in a new tab')}">
   <div class="campaign-depth">
    <div class="campaign-backdrop" aria-hidden="true"></div>
    <img class="campaign-person" src="assets/images/trump-pointing.png" width="1600" height="1600" fetchpriority="high" alt="${W('特朗普身穿深蓝西装、系红色领带，伸手指向观众。','Donald Trump in a navy suit and red tie, pointing toward the viewer.')}">
   </div>
  </a>
  <figcaption>
   <a href="assets/images/latex-white-house.png" target="_blank" rel="noopener noreferrer">${W('乳胶白宫海报 ↗','White House poster ↗')}<span class="sr-only">${W('（新标签页）',' (new tab)')}</span></a>
   <a href="assets/images/make-latex-great-again.png" target="_blank" rel="noopener noreferrer">${W('竞选风海报 ↗','Campaign poster ↗')}<span class="sr-only">${W('（新标签页）',' (new tab)')}</span></a>
  </figcaption>
 </figure>
</section><section class="atelier-hero"><div><p class="hero-label">LaTeX Cookbook</p><h2 class="home-guide-title">${W('LaTeX 的使用手册<br>与实验桌。','A field guide to LaTeX.<br>A desk to experiment.')}</h2><p class="article-lead">${W('查文档类、理解公式、排好图表。沿学习路径写第一篇文档，或直接找到眼前问题的答案。','Look up a class, understand an equation, or build a table. Follow a learning path or find an answer to the problem in front of you.')}</p><div class="hero-search"><label class="search-field">${A.ico('search',22)}<input id="home-search" type="search" placeholder="${W('试试：ctexart、黑板粗体、longtable、Missing $','Try ctexart, blackboard bold, longtable, Missing $')}" aria-label="${W('全站搜索','Search the entire site')}"><kbd>⌘ K</kbd></label><div id="home-results" class="home-results" hidden></div></div><div class="article-actions"><a class="btn btn-primary" href="courses.html#${next.id}">${A.completion()?A.t('continue'):A.t('start')}</a><a class="btn btn-outline" href="encyclopedia.html">${W('浏览百科全书','Browse the encyclopedia')}</a></div></div><aside class="desk-demo"><div class="desk-caption">${W('同一个字母，不同的语义','One letter, different meanings')}</div><div class="font-samples">${[['\\mathbb{R}','\\mathbb'],['\\mathcal{R}','\\mathcal'],['\\mathrm{R}','\\mathrm'],['\\mathbf{R}','\\mathbf']].map(([tex,cmd])=>`<a href="reference.html?q=${encodeURIComponent(cmd)}"><div data-math="${A.esc(tex)}"></div><code>${A.esc(cmd)}</code></a>`).join('')}</div><pre class="desk-code">${A.esc(String.raw`\usepackage{amsmath,amssymb}
\[
  f : \mathbb{R} \to \mathbb{R},
  \qquad \mathcal{L}(\theta)
\]`)}</pre><div class="desk-note">${W('点击字体查询语义、依赖和完整示例。','Select an alphabet to see its meaning, dependencies, and examples.')} <a class="text-link" href="encyclopedia.html#math-alphabets">${W('完整字体对照','Compare all alphabets')}</a></div></aside></section><div class="content-census"><span>${D.modules.length} ${W('个主题','topics')}</span><span>${D.entries.length} ${W('个百科条目','articles')}</span><span>${D.dictionary.length} ${W('条词典记录','dictionary records')}</span><span>${D.examples.length} ${W('份完整源码','complete examples')}</span><span>${D.exercises.length} ${W('道练习','exercises')}</span></div><section class="home-section"><div class="section-header"><div><h2>${W('从眼前的任务开始','Start with the task in front of you')}</h2><p>${W('常用问题的入口，直接连接详细说明。','Common questions, linked directly to detailed explanations.')}</p></div><a href="examples.html" class="text-link">${W('完整示例库','Complete examples')}</a></div><div class="task-grid">${[['ctexart','选中文文档类','Choose a Chinese class','字体与引擎如何搭配？','Which fonts and engine fit?'],['mathbb','选择数学字体','Choose a math alphabet','黑板粗体、花体与粗体。','Blackboard bold, calligraphic, and bold.'],['percent','输入特殊字符','Type a special character','% 是注释，\\% 是百分号。','% starts a comment; \\% prints a percent sign.'],['longtable','排跨页数据表','Build a multipage table','重复表头、页脚与编号。','Repeated headers, footers, and numbering.'],['natbib','区分引用命令','Choose citation commands','citet、citep 与 biblatex。','citet, citep, and biblatex.'],['beamer','制作学术报告','Build an academic talk','框架、主题、图表与参考资料。','Frames, themes, figures, and references.']].map(([id,z,e,dz,de])=>`<a href="encyclopedia.html#${id}"><h3>${W(z,e)}</h3><p>${W(dz,de)}</p></a>`).join('')}</div></section><section class="home-section"><div class="section-header"><div><h2>${W('知识目录','Knowledge directory')}</h2><p>${W('语法、排版机制与项目实践分主题检索。','Find syntax, typesetting mechanisms, and project workflows by topic.')}</p></div><a class="text-link" href="encyclopedia.html">${W('全部条目','All articles')}</a></div><div class="topic-grid">${D.modules.map(m=>`<a href="encyclopedia.html?module=${m.id}"><h3>${A.esc(A.v(m.title))}</h3><p>${A.esc(A.v(m.description))}</p><span>${D.entries.filter(e=>e.module===m.id).length} ${W('个条目','articles')}</span></a>`).join('')}</div></section><section class="learning-banner"><div><h2>${W('按自己的进度学。','Learn at your own pace.')}</h2><p>${W('课程决定学习顺序，百科提供深入查询。练习会解释每个答案，进度与收藏保存在当前浏览器。','Courses provide an order; articles provide depth. Exercises explain each answer. Progress and favorites stay in this browser.')}</p></div><a class="btn btn-primary" href="courses.html">${W('查看四条学习路径','Explore four learning paths')}</a></section></div>`;
 cleanupCampaign=bindCampaign(root.querySelector('.campaign-scene'));
 root.querySelectorAll('[data-math]').forEach(async el=>{try{const n=await A.texToNode(el.dataset.math);if(el.isConnected)el.replaceChildren(n)}catch{el.textContent=el.dataset.math}});
 const input=document.getElementById('home-search'),results=document.getElementById('home-results');input.addEventListener('input',()=>{results.hidden=!input.value.trim();results.innerHTML=A.searchItems(input.value).slice(0,8).map(x=>`<a href="${A.esc(x.href)}"><strong>${A.esc(x.title)}</strong><span>${A.esc(x.sub)}</span></a>`).join('')||'<p>'+A.t('empty')+'</p>';});input.addEventListener('keydown',e=>{if(e.key==='Enter')results.querySelector('a')?.click();if(e.key==='Escape')results.hidden=true});
 }
 function bindCampaign(scene){
  const allowed=window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
  let frame=0,x=0,y=0;
  const reset=()=>{
   cancelAnimationFrame(frame);frame=0;scene.classList.remove('is-tracking');
   for(const key of ['rx','ry','x','y'])scene.style.removeProperty('--portrait-'+key);
  };
  const move=event=>{
   if(!allowed.matches||event.pointerType==='touch')return;
   const rect=scene.getBoundingClientRect();
   x=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
   y=Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1));
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    frame=0;scene.classList.add('is-tracking');
    scene.style.setProperty('--portrait-rx',(-3-y*5).toFixed(2)+'deg');
    scene.style.setProperty('--portrait-ry',(-7+x*7).toFixed(2)+'deg');
    scene.style.setProperty('--portrait-x',(x*8).toFixed(2)+'px');
    scene.style.setProperty('--portrait-y',(y*5).toFixed(2)+'px');
   });
  };
  scene.addEventListener('pointermove',move);
  scene.addEventListener('pointerleave',reset);
  scene.addEventListener('pointercancel',reset);
  allowed.addEventListener('change',reset);
  return ()=>{
   reset();scene.removeEventListener('pointermove',move);
   scene.removeEventListener('pointerleave',reset);scene.removeEventListener('pointercancel',reset);
   allowed.removeEventListener('change',reset);
  };
 }
 window.addEventListener('languagechange',draw);draw();
})();
