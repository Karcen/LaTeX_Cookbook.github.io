(() => {
  const A=window.Cookbook,D=A.data;
  const categories=[['all','all'],['math','math'],['document','document'],['layout','layout'],['refs','refs'],['workflow','workflow'],['favorites','favorites']];
  const input=document.getElementById('reference-search'),filters=document.getElementById('ref-filters'),grid=document.getElementById('ref-grid'),counter=document.getElementById('ref-count');
  let query=new URLSearchParams(location.search).get('q')||'',category='all';input.value=query;let timer;
  function storedFavorites(){const s=A.getStorage('favorites',[]);return Array.isArray(s)?s:[];}
  function results(){const fave=storedFavorites();return D.reference.filter(r=>(category==='all'||(category==='favorites'?fave.includes(r.id):r.category===category))&&(!query||(`${r.id} ${r.command} ${r.title.zh} ${r.title.en} ${r.detail.zh} ${r.detail.en}`).toLowerCase().includes(query.toLowerCase())));}
  function drawFilters(){filters.innerHTML=categories.map(([id,label])=>`<button class="filter-btn ${category===id?'active':''}" data-category="${id}" aria-pressed="${category===id}">${A.t(label)}</button>`).join('');filters.querySelectorAll('[data-category]').forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.category;draw();}));}
  async function draw(){drawFilters();const items=results(),fav=storedFavorites();counter.textContent=`${items.length} ${A.lang==='zh'?'条命令':'commands'}`;
    grid.innerHTML=items.length?items.map(r=>{const math=r.category==='math';const code=r.example;return `<article class="ref-card"><div class="ref-card-head"><h3>${A.v(r.title)}</h3><span class="pill">${A.t(r.category==='document'?'document':r.category==='math'?'math':r.category)}</span></div><p>${A.v(r.detail)}</p><div class="ref-example ${math?'':'code-example'}" ${math?`data-math="${A.esc(r.id)}"`:''}>${math?'…':A.esc(code)}</div><div class="ref-card-foot"><code>${A.esc(r.command)}</code><div class="ref-buttons"><button class="tiny-icon-btn favorite-btn ${fav.includes(r.id)?'saved':''}" data-favorite="${r.id}" aria-pressed="${fav.includes(r.id)}" aria-label="${A.lang==='zh'?'收藏':'Favorite'} ${A.v(r.title)}" title="${A.lang==='zh'?'收藏':'Favorite'}">${A.ico('star',16)}</button><button class="tiny-icon-btn" data-copy="${r.id}" aria-label="${A.t('copy')}" title="${A.t('copy')}">${A.ico('copy',16)}</button></div></div></article>`;}).join(''):`<div class="empty-state">${A.ico('search',31)}<span>${A.t('empty')}</span></div>`;
    grid.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const r=D.reference.find(r=>r.id===b.dataset.copy);A.clipboard(r.example);}));
    grid.querySelectorAll('[data-favorite]').forEach(b=>b.addEventListener('click',()=>{const s=new Set(storedFavorites());if(s.has(b.dataset.favorite))s.delete(b.dataset.favorite);else s.add(b.dataset.favorite);A.setStorage('favorites',[...s]);draw();}));
    // Render only expressions currently visible in the reference results.
    if(!window.MathJax)return;
    for(const el of grid.querySelectorAll('[data-math]')){const id=el.dataset.math,r=D.reference.find(x=>x.id===id);try{const node=await A.texToNode(r.example,true);if(el.isConnected)el.replaceChildren(node);}catch{if(el.isConnected)el.textContent=r.example;}}
  }
  input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{query=input.value.trim();draw();},170);});window.addEventListener('languagechange',draw);draw();
})();
