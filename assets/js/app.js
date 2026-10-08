/* LaTeX Cookbook — shared navigation, localization, storage, UI primitives. */
(() => {
  'use strict';
  const D = window.LATEX_DATA;
  const PAGES = [
    {id:'home',href:'index.html',zh:'首页',en:'Home',icon:'home'},
    {id:'courses',href:'courses.html',zh:'学习路径',en:'Lessons',icon:'book-open'},
    {id:'playground',href:'playground.html',zh:'交互实验室',en:'Playground',icon:'code'},
    {id:'practice',href:'practice.html',zh:'闯关练习',en:'Practice',icon:'check-circle'},
    {id:'reference',href:'reference.html',zh:'命令速查',en:'Reference',icon:'search'}
  ];
  const copy = {
    tagline:{zh:'把想法写成公式',en:'Write your ideas as formulas'},
    home:{zh:'首页',en:'Home'},courses:{zh:'学习路径',en:'Lessons'},playground:{zh:'交互实验室',en:'Playground'},practice:{zh:'闯关练习',en:'Practice'},reference:{zh:'命令速查',en:'Reference'},
    theme:{zh:'切换主题',en:'Toggle theme'},switchToLight:{zh:'切换到浅色模式',en:'Switch to light mode'},switchToDark:{zh:'切换到深色模式',en:'Switch to dark mode'},search:{zh:'快速跳转',en:'Quick search'},searchPlaceholder:{zh:'搜索课程、页面或命令…',en:'Search lessons, pages, or commands…'},
    footerLine:{zh:'写一行，看看它长什么样。',en:'Write a line and see how it looks.'},
    footerCreditBefore:{zh:'由 ',en:'Developed by '},
    footerCreditAfter:{zh:' 使用 ChatGPT 辅助开发',en:' with assistance from ChatGPT'},
    footerNote:{zh:'纯前端 · 离线可用 · 进度仅保存在本机',en:'No server needed · Works offline · Progress stays on this device'},
    builtFor:{zh:'用一点好奇心，学会 LaTeX。',en:'Learn LaTeX at your own pace.'},
    continue:{zh:'继续学习',en:'Continue learning'},start:{zh:'开始学习',en:'Start learning'},explore:{zh:'查看全部课程',en:'Explore all lessons'},
    allLessons:{zh:'全部课程',en:'All lessons'},chapter:{zh:'章节',en:'Chapter'},lessons:{zh:'课时',en:'lessons'},min:{zh:'分钟',en:'min'},
    done:{zh:'已完成',en:'Completed'},markDone:{zh:'标记已学完',en:'Mark as complete'},marked:{zh:'已记下这节',en:'Lesson completed'},
    tryCode:{zh:'去实验室试一下',en:'Try in playground'},lessonPrev:{zh:'上一课',en:'Previous'},lessonNext:{zh:'下一课',en:'Next'},
    keyIdea:{zh:'先记住',en:'Key idea'},watchFor:{zh:'操作要点',en:'In practice'},example:{zh:'代码示例',en:'Code example'},littleTask:{zh:'自己动手',en:'Try it yourself'},fieldNote:{zh:'顺手记一笔',en:'A useful note'},
    copied:{zh:'已复制到剪贴板',en:'Copied to clipboard'},copy:{zh:'复制',en:'Copy'},
    all:{zh:'全部',en:'All'},math:{zh:'数学公式',en:'Math'},document:{zh:'文档结构',en:'Document'},layout:{zh:'图表排版',en:'Layout'},refs:{zh:'引用文献',en:'References'},workflow:{zh:'写作效率',en:'Workflow'},
    preview:{zh:'实时预览',en:'Live preview'},code:{zh:'LaTeX 源码',en:'LaTeX source'},
    download:{zh:'导出 .tex',en:'Export .tex'},reset:{zh:'重置',en:'Reset'},empty:{zh:'没有匹配的结果。换个关键词试试。',en:'No matches. Try another search.'},
    editorReady:{zh:'数学预览已就绪',en:'Math preview ready'},limited:{zh:'此处只预览常见文档结构；完整 PDF 请用 TeX 引擎编译。',en:'This preview handles common document structures. Compile full PDFs in a TeX engine.'},
    totalProgress:{zh:'总学习进度',en:'Overall progress'},lessonComplete:{zh:'课时已完成',en:'lessons complete'},
    pleaseChoose:{zh:'先选一个答案。',en:'Choose an answer first.'},check:{zh:'检查答案',en:'Check answer'},nextQuestion:{zh:'下一题',en:'Next question'},retry:{zh:'重新练习',en:'Try again'},
    favorites:{zh:'已收藏',en:'Favorites'},allCommands:{zh:'全部命令',en:'All commands'},
    showAll:{zh:'查看全部',en:'View all'},finished:{zh:'已学完',en:'Completed'},
    homeHeroEyebrow:{zh:'动手学 LaTeX 的地方',en:'A hands-on place to learn LaTeX'},
    copyUnavailable:{zh:'无法自动复制，请手动选择代码。',en:'Clipboard unavailable. Please select the code manually.'},
    lang:{zh:'语言',en:'Language'},dark:{zh:'深色模式',en:'Dark mode'}
  };
  function getStorage(k,fallback=null){try {const raw=localStorage.getItem('atelier:'+k);return raw===null?fallback:JSON.parse(raw);}catch{return fallback;}}
  function setStorage(k,value){try{localStorage.setItem('atelier:'+k,JSON.stringify(value));return true;}catch{return false;}}
  let lang = getStorage('language','zh');
  if(!['zh','en'].includes(lang))lang='zh';
  let theme = getStorage('theme','light');
  if(!['light','dark'].includes(theme))theme='light';
  const iconPaths = {
    home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/>',
    'book-open':'<path d="M12 7v14"/><path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a1 1 0 0 1-1 1h-4a4 4 0 0 0-4 2 4 4 0 0 0-4-2H4a1 1 0 0 1-1-1Z"/>',
    code:'<polyline points="8 17 3 12 8 7"/><polyline points="16 7 21 12 16 17"/><path d="m14 4-4 16"/>',
    'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    'arrow-left':'<path d="M20 12H4m6 6-6-6 6-6"/>',
    spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    moon:'<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    layers:'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>',
    sigma:'<path d="M18 4H6l7 8-7 8h12"/>',
    layout:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
    link:'<path d="M10 13a5 5 0 0 0 7 .6l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7-.6l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M19.4 15a2 2 0 0 1 .4 2.2l-1.3 2.2-2.3-.3-1.4 1.2-.5 2.2h-2.6l-.5-2.2-1.4-1.2-2.3.3-1.3-2.2.8-2-1.1-1.9L3.8 12l2.1-1.3.4-1.8-.8-2L6.8 4.7l2.3.3L10.5 3l.5-1h2l.5 2 1.4 1 2.3-.3 1.3 2.2-.8 2 1.1 1.9 2.1 1.3-2.1 1.3Z" transform="translate(0 0) scale(.92) translate(1 1)"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4"/><path d="M4 17v4h16v-4"/>',
    rotate:'<path d="M3 11a9 9 0 1 1 3 7"/><path d="M3 4v7h7"/>',
    star:'<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18l-5.8 2.9 1.1-6.5L2.6 9.8l6.5-.9Z"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    close:'<path d="M5 5 19 19M19 5 5 19"/>',
    terminal:'<path d="m4 7 5 5-5 5M12 17h8"/>',
    edit:'<path d="m15 5 4 4M4 20l4-.6L20 7l-4-4L4 15l-.6 5Z"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.5"/>',
    trophy:'<path d="M8 4h8v8a4 4 0 0 1-8 0V4ZM8 6H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4M12 16v4m-4 1h8"/>',
    keyboard:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m3 0h1m3 0h1m3 0h1M5 13h1m3 0h1m3 0h1m3 0h1M7 16h10"/>'
  };
  const ico=(name,size=18)=>`<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.spark}</svg>`;
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const val=obj => typeof obj==='string'?obj:(obj && (obj[lang]||obj.zh||obj.en))||'';
  const tr=k=>val(copy[k]||k);
  function progress(){const done=getStorage('done',[]);return Array.isArray(done)?done:[];}
  function completion(){return progress().length;}
  function isDone(id){return progress().includes(id);}
  function toggleDone(id){const s=new Set(progress());s.has(id)?s.delete(id):s.add(id);setStorage('done',[...s]);window.dispatchEvent(new CustomEvent('progresschange'));return s.has(id);}
  function pageId(){return document.body.dataset.page||'home';}
  function renderNav(){const node=document.getElementById('site-header');if(!node)return;
    const current=pageId();
    node.innerHTML=`<div class="nav-shell container"><a class="brand" href="index.html" aria-label="LaTeX Cookbook home"><span class="brand-icon">\\</span><span class="brand-name">latex<span class="brand-dot">.</span><small>cookbook</small></span></a><nav class="nav-links" aria-label="Main navigation">${PAGES.map(p=>`<a class="nav-link ${current===p.id?'is-current':''}" ${current===p.id?'aria-current="page"':''} href="${p.href}">${val(p)}</a>`).join('')}</nav><div class="nav-actions"><button id="global-search" class="icon-button" aria-label="${tr('search')}" title="${tr('search')} · /">${ico('search',19)}</button><button id="theme-toggle" class="icon-button" aria-label="${theme==='dark'?tr('switchToLight'):tr('switchToDark')}" title="${theme==='dark'?tr('switchToLight'):tr('switchToDark')}" aria-pressed="${theme==='dark'}">${ico(theme==='dark'?'sun':'moon',19)}</button><div class="lang-switch" role="group" aria-label="Language"><button class="lang-opt ${lang==='zh'?'active':''}" data-lang="zh" aria-pressed="${lang==='zh'}">中</button><button class="lang-opt ${lang==='en'?'active':''}" data-lang="en" aria-pressed="${lang==='en'}">EN</button></div></div></div>`;
    node.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
    document.getElementById('global-search')?.addEventListener('click',openPalette);
    document.getElementById('theme-toggle')?.addEventListener('click',()=>setTheme(theme==='light'?'dark':'light'));
  }
  function renderFooter(){const node=document.getElementById('site-footer');if(!node)return;node.innerHTML=`<div class="container footer-main"><div><a class="brand footer-brand" href="index.html"><span class="brand-icon">\\</span><span class="brand-name">latex<span class="brand-dot">.</span><small>cookbook</small></span></a><p class="footer-sentence">${tr('footerLine')}</p></div><div class="footer-links">${PAGES.slice(1).map(p=>`<a href="${p.href}">${val(p)} ${ico('arrow',14)}</a>`).join('')}</div></div><div class="container footer-bottom"><span>© 2026 LaTeX Cookbook · Learn by writing.</span><div class="footer-meta"><span class="footer-credit">${tr('footerCreditBefore')}<a class="footer-author" href="https://karcen.github.io/" target="_blank" rel="noopener noreferrer">Jiacheng Zheng</a>${tr('footerCreditAfter')}</span><span class="footer-note">${tr('footerNote')}</span></div></div>`;}
  function translateStatic(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n);});document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=tr(el.dataset.i18nPlaceholder);});document.querySelectorAll('[data-zh][data-en]').forEach(el=>{el.textContent=lang==='zh'?el.dataset.zh:el.dataset.en;});}
  function setLanguage(next){if(next===lang)return;lang=next;setStorage('language',lang);renderNav();renderFooter();translateStatic();window.dispatchEvent(new CustomEvent('languagechange',{detail:{lang}}));}
  function syncThemeChrome(){const tag=document.querySelector('meta[name="theme-color"]');if(tag)tag.content=theme==='dark'?'#111d1d':'#f6f7f2';}
  function setTheme(next){if(!['light','dark'].includes(next))return;theme=next;document.documentElement.dataset.theme=theme;setStorage('theme',theme);syncThemeChrome();renderNav();window.dispatchEvent(new CustomEvent('themechange',{detail:{theme}}));}
  function toast(message){let toastEl=document.querySelector('.toast');if(!toastEl){toastEl=document.createElement('div');toastEl.className='toast';toastEl.setAttribute('role','status');toastEl.setAttribute('aria-live','polite');document.body.appendChild(toastEl);} toastEl.innerHTML=`${ico('check',16)} <span>${esc(message)}</span>`;toastEl.classList.add('show');clearTimeout(toastEl._timer);toastEl._timer=setTimeout(()=>toastEl.classList.remove('show'),2400);}
  async function clipboard(content){try{await navigator.clipboard.writeText(content);toast(tr('copied'));return true;}catch{try{const t=document.createElement('textarea');t.value=content;document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();if(ok){toast(tr('copied'));return true;}}catch{}toast(tr('copyUnavailable'));return false;}}
  function makeCode(text,classes=''){return `<div class="code-panel ${classes}"><div class="code-panel-top"><span class="code-panel-filename">source.tex</span><button type="button" class="code-copy" aria-label="${tr('copy')}">${ico('copy',15)} <span>${tr('copy')}</span></button></div><pre class="language-latex"><code class="language-latex">${esc(text)}</code></pre></div>`;}
  function bindCopyButtons(root=document){root.querySelectorAll('.code-panel').forEach(panel=>{const b=panel.querySelector('.code-copy');if(b&&!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',()=>clipboard(panel.querySelector('code').textContent));}});}
  function highlight(root=document){if(window.Prism){root.querySelectorAll('code.language-latex').forEach(el=>Prism.highlightElement(el));}}
  function renderInlineLatex(html){return html;}
  let palette;
  function createPalette(){palette=document.createElement('div');palette.id='command-palette';palette.className='palette-overlay';palette.hidden=true;palette.innerHTML=`<div class="palette-dialog" role="dialog" aria-modal="true" aria-labelledby="palette-label"><label id="palette-label" class="sr-only">${tr('search')}</label><div class="palette-field">${ico('search',20)}<input type="search" id="palette-input" autocomplete="off" spellcheck="false" placeholder="${tr('searchPlaceholder')}"/><kbd>ESC</kbd></div><div class="palette-results" id="palette-results"></div><div class="palette-help">${ico('keyboard',14)} <span>↑ ↓ to move · Enter to open</span></div></div>`;document.body.appendChild(palette);
    palette.addEventListener('mousedown',e=>{if(e.target===palette)closePalette()});
    palette.querySelector('#palette-input').addEventListener('input',()=>drawPalette());
    palette.querySelector('#palette-input').addEventListener('keydown',e=>{const all=[...palette.querySelectorAll('.palette-result')];let ix=all.findIndex(a=>a.classList.contains('selected'));if(e.key==='ArrowDown'){e.preventDefault();ix=(ix+1)%Math.max(1,all.length);selectPalette(all,ix);}if(e.key==='ArrowUp'){e.preventDefault();ix=(ix-1+all.length)%Math.max(1,all.length);selectPalette(all,ix);}if(e.key==='Enter'){const a=all.find(a=>a.classList.contains('selected'))||all[0];if(a)location.href=a.href;}});
  }
  function selectPalette(nodes,ix){nodes.forEach((node,i)=>node.classList.toggle('selected',i===ix));nodes[ix]?.scrollIntoView({block:'nearest'});}
  function openPalette(){if(!palette)createPalette();palette.hidden=false;drawPalette();palette.querySelector('input').focus();document.body.classList.add('dialog-open');}
  function closePalette(){if(!palette)return;palette.hidden=true;document.body.classList.remove('dialog-open');}
  function drawPalette(){const q=(palette.querySelector('input').value||'').toLowerCase().trim();const items=[...PAGES.map(p=>({title:val(p),sub:lang==='zh'?'页面':'Page',href:p.href,icon:p.icon,searchText:[p.zh,p.en].join(' ')})),...D.lessons.map(l=>({title:val(l.title),sub:lang==='zh'?'课程':'Lesson',href:'courses.html#'+l.id,icon:'book-open',searchText:[l.id,l.title.zh,l.title.en].join(' ')})),...D.reference.map(r=>({title:val(r.title)+' · '+r.command,sub:lang==='zh'?'命令':'Command',href:'reference.html?q='+encodeURIComponent(r.command),icon:'code',searchText:[r.id,r.command,r.title.zh,r.title.en].join(' ')}))].filter(i=>(i.title+' '+i.sub+' '+i.searchText).toLowerCase().includes(q)).slice(0,11);
    const target=palette.querySelector('#palette-results');target.innerHTML=items.length?items.map((i,j)=>`<a class="palette-result ${j===0?'selected':''}" href="${esc(i.href)}">${ico(i.icon,17)}<span>${esc(i.title)}</span><small>${esc(i.sub)}</small>${ico('arrow',15)}</a>`).join(''):`<div class="palette-empty">${tr('empty')}</div>`;}
  async function typeset(el){if(!window.MathJax)return;await window.MathJax.startup.promise;try{window.MathJax.typesetClear([el]);await window.MathJax.typesetPromise([el]);}catch(err){console.warn('MathJax typeset:',err);}}
  async function texToNode(tex,display=true){await window.MathJax.startup.promise;return window.MathJax.tex2svgPromise(tex,{display});}
  function animateEntries(root=document){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const els=[...root.querySelectorAll('[data-reveal]')];const obs=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('revealed');obs.unobserve(entry.target);}}},{threshold:.09,rootMargin:'0px 0px -24px 0px'});els.forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min((i%7)*45,225)}ms`);obs.observe(el);});}
  function init(){document.documentElement.dataset.theme=theme;syncThemeChrome();renderNav();renderFooter();translateStatic();document.addEventListener('keydown',e=>{const tag=(e.target.tagName||'').toLowerCase();if((e.key==='/'&& !['input','textarea'].includes(tag))||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k')){e.preventDefault();openPalette();} if(e.key==='Escape')closePalette();});window.addEventListener('languagechange',()=>{if(palette&&!palette.hidden){palette.remove();palette=null;openPalette();}});}
  const api={data:D,pages:PAGES,get lang(){return lang;},get theme(){return theme;},t:tr,v:val,esc,ico,getStorage,setStorage,progress,completion,isDone,toggleDone,toast,clipboard,makeCode,bindCopyButtons,highlight,typeset,texToNode,animateEntries,openPalette,setLanguage};
  window.Cookbook=api;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
