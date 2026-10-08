(() => {
  const A=window.Atelier,D=A.data;
  const params=new URLSearchParams(location.search);
  const lesson=D.lessons.find(l=>l.id===params.get('lesson'));
  let mode= params.get('mode')==='document'?'document':params.get('mode')==='math'?'math':lesson?.kind||A.getStorage('editorMode','math');
  let code=lesson?.code || A.getStorage('draft-'+mode,null) || D.snippets.find(s=>s.kind===mode).code;
  let request=0,timeout;
  const tabs=document.getElementById('mode-tabs');const work=document.getElementById('workbench');const snippets=document.getElementById('snippets');const actions=document.getElementById('workbench-actions');const info=document.getElementById('work-info');
  function inlineMarkup(raw){let s=A.esc(raw);
    s=s.replace(/\\textbf\{([^{}]*)\}/g,'<strong>$1</strong>')
      .replace(/\\(?:textit|emph)\{([^{}]*)\}/g,'<em>$1</em>')
      .replace(/\\underline\{([^{}]*)\}/g,'<u>$1</u>')
      .replace(/\\texttt\{([^{}]*)\}/g,'<code>$1</code>')
      .replace(/\\ref\{([^{}]*)\}/g,'<span title="Unresolved reference">??</span>')
      .replace(/\\cite\{([^{}]*)\}/g,'[$1]')
      .replace(/\\label\{[^{}]*\}/g,'')
      .replace(/\\parencite\{([^{}]*)\}/g,'($1)')
      .replace(/\\%/g,'%').replace(/~/g,'&nbsp;');
    return s;
  }
  function docHtml(src){const title=src.match(/\\title\s*\{([^{}]*)\}/);const author=src.match(/\\author\s*\{([^{}]*)\}/);
    let text=src;
    const start=text.indexOf('\\begin{document}');if(start>=0)text=text.slice(start+'\\begin{document}'.length);
    const end=text.indexOf('\\end{document}');if(end>=0)text=text.slice(0,end);
    text=text.replace(/\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g,(_,s)=>'\\[\n'+s+'\n\\]');
    text=text.replace(/\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g,(_,s)=>'\\[\n\\begin{aligned}'+s+'\\end{aligned}\n\\]');
    const lines=text.split(/\r?\n/),out=[],para=[];let list=null,math=null,table=null,figure=null,foundTitle=false;
    function flush(){if(!para.length)return;out.push('<p>'+inlineMarkup(para.join(' ').trim())+'</p>');para.length=0;}
    function flushList(){if(list){out.push(`</${list}>`);list=null;}}
    function outputTable(raw){const source=raw.join('\n');const inner=source.replace(/^.*?\\begin\{tabular\}(?:\{[^{}]*\})?/s,'').replace(/\\end\{tabular\}[\s\S]*$/s,'');
      const rows=inner.replace(/\\(?:toprule|midrule|bottomrule|hline)/g,'').split(/\\\\/).map(s=>s.trim()).filter(Boolean);
      const cells=rows.slice(0,12).map((r)=>'<tr>'+r.split(/(?<!\\)&/).map(x=>'<td>'+inlineMarkup(x.trim())+'</td>').join('')+'</tr>').join('');
      return `<div style="overflow:auto"><table class="doc-table">${cells}</table></div>`;}
    function outputFigure(raw){const s=raw.join('\n'),caption=s.match(/\\caption\{([^{}]*)\}/),file=s.match(/\\includegraphics(?:\[[^\]]*\])?\{([^{}]*)\}/);return `<div class="doc-figure"><div class="doc-figure-placeholder">${A.ico('layout',22)} <span>${A.esc(file?file[1]:'figure')}</span></div><div class="doc-figure-caption">${A.esc(caption?caption[1]:'Figure placeholder')}</div></div>`;}
    for(let i=0;i<lines.length;i++){
      const line=lines[i],trim=line.trim();
      if(math!==null){math.push(line);if(trim.includes('\\]')||trim.includes('$$')){out.push('<div class="doc-equation">'+A.esc(math.join('\n'))+'</div>');math=null;}continue;}
      if(table!==null){table.push(line);if(trim.includes('\\end{tabular}')){out.push(outputTable(table));table=null;}continue;}
      if(figure!==null){figure.push(line);if(trim.includes('\\end{figure}')){out.push(outputFigure(figure));figure=null;}continue;}
      if(!trim){flush();continue;}
      if(trim.startsWith('%') || /^\\(?:documentclass|usepackage|addbibresource|newcommand|title|author|date|geometry)\b/.test(trim))continue;
      if(trim.startsWith('\\begin{tabular}')){flush();flushList();table=[line];if(trim.includes('\\end{tabular}')){out.push(outputTable(table));table=null;}continue;}
      if(trim.startsWith('\\begin{figure}')){flush();flushList();figure=[line];if(trim.includes('\\end{figure}')){out.push(outputFigure(figure));figure=null;}continue;}
      if(trim.startsWith('\\[')||trim.startsWith('$$')){flush();flushList();math=[line];if((trim.endsWith('\\]')&&trim.length>3)||(trim.endsWith('$$')&&trim.length>4)){out.push('<div class="doc-equation">'+A.esc(math.join('\n'))+'</div>');math=null;}continue;}
      if(trim==='\\maketitle'){flush();flushList();foundTitle=true;out.push(`<h1>${A.esc(title?title[1]:'Untitled')}</h1>${author?`<div class="author">${A.esc(author[1])}</div>`:''}`);continue;}
      const sec=trim.match(/^\\(section|subsection|subsubsection)\*?\{([^{}]*)\}/);
      if(sec){flush();flushList();out.push(`<${sec[1]==='section'?'h2':'h3'}>${A.esc(sec[2])}</${sec[1]==='section'?'h2':'h3'}>`);continue;}
      const begin=trim.match(/^\\begin\{(itemize|enumerate)\}/);
      if(begin){flush();flushList();list=begin[1]==='itemize'?'ul':'ol';out.push(`<${list}>`);continue;}
      if(/^\\end\{(itemize|enumerate)\}/.test(trim)){flush();flushList();continue;}
      if(trim.startsWith('\\item')){flush();if(!list){list='ul';out.push('<ul>');}out.push('<li>'+inlineMarkup(trim.replace(/^\\item\s*/,''))+'</li>');continue;}
      if(trim==='\\tableofcontents'){flush();out.push('<p style="color:var(--muted)">'+(A.lang==='zh'?'〔目录将在编译后生成〕':'[Table of contents appears after compilation]')+'</p>');continue;}
      if(trim==='\\printbibliography'){flush();out.push('<p style="color:var(--muted)">'+(A.lang==='zh'?'〔参考文献将在编译后生成〕':'[Bibliography appears after compilation]')+'</p>');continue;}
      if(trim.startsWith('\\begin{')||trim.startsWith('\\end{')){flush();continue;}
      para.push(trim);
    }
    flush();flushList();
    if(math!==null)out.push('<div class="doc-equation">'+A.esc(math.join('\n'))+'</div>');
    if(table!==null)out.push(outputTable(table));if(figure!==null)out.push(outputFigure(figure));
    if(!foundTitle&&title){out.unshift(`<h1>${A.esc(title[1])}</h1>${author?`<div class="author">${A.esc(author[1])}</div>`:''}`);}
    return '<article class="doc-paper">'+(out.join('')||'<p>…</p>')+'</article>';
  }
  function draw(){tabs.innerHTML=`<button type="button" class="seg-btn ${mode==='math'?'active':''}" data-mode="math" aria-pressed="${mode==='math'}">${A.ico('sigma',15)} ${A.t('math')}</button><button type="button" class="seg-btn ${mode==='document'?'active':''}" data-mode="document" aria-pressed="${mode==='document'}">${A.ico('book-open',15)} ${A.t('document')}</button>`;
    actions.innerHTML=`<button id="reset-code" class="btn btn-outline">${A.ico('rotate',15)} ${A.t('reset')}</button><button id="copy-code" class="btn btn-outline">${A.ico('copy',15)} ${A.t('copy')}</button><button id="export-code" class="btn btn-primary">${A.ico('download',15)} ${A.t('download')}</button>`;
    work.innerHTML=`<section class="work-panel"><div class="work-panel-bar"><span class="panel-title">${A.ico('code',16)} ${A.t('code')}</span><span class="minor">${mode==='math'?'equation.tex':'document.tex'}</span></div><div class="editor-wrap"><div class="line-numbers" id="line-numbers" aria-hidden="true">1</div><textarea id="latex-editor" class="latex-editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="LaTeX source code"></textarea></div><div class="editor-foot"><span id="editor-count">0 lines</span><span>⌘ / Ctrl + Enter ${A.lang==='zh'?'刷新':'refresh'}</span></div></section>
    <section class="work-panel"><div class="work-panel-bar"><span class="panel-title">${A.ico('spark',16)} ${A.t('preview')}</span><span class="preview-status" id="preview-status"><i class="status-dot"></i><span>${A.lang==='zh'?'等待输入':'Ready'}</span></span></div><div class="preview-canvas"><div id="live-output" class="preview-content ${mode==='document'?'is-doc':''}" aria-live="polite">…</div></div><div class="editor-foot"><span>${mode==='math'?'MathJax · SVG':'Selected LaTeX syntax'}</span><span>${A.lang==='zh'?'本机渲染':'Local render'}</span></div></section>`;
    info.innerHTML=`${A.ico('info',18)} <span>${mode==='math'?(A.lang==='zh'?'公式由 MathJax 在浏览器本地渲染。支持分式、矩阵、对齐等常见数学语法。':'Math is rendered locally with MathJax. Try fractions, matrices, and aligned expressions.'):A.t('limited')}</span>`;
    snippets.innerHTML=D.snippets.filter(s=>s.kind===mode).map(s=>`<button class="snippet-btn" data-snippet="${s.id}">${A.ico('code',14)} ${A.v(s.label)}</button>`).join('');
    document.getElementById('latex-editor').value=code;
    tabs.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{if(mode===btn.dataset.mode)return;persistCode();mode=btn.dataset.mode;A.setStorage('editorMode',mode);code=A.getStorage('draft-'+mode,null)||D.snippets.find(s=>s.kind===mode).code;draw();}));
    document.getElementById('reset-code').addEventListener('click',()=>{code=D.snippets.find(s=>s.kind===mode).code;editor.value=code;persistCode();scheduleRender(true);A.toast(A.lang==='zh'?'已恢复默认示例':'Default example restored');});
    document.getElementById('copy-code').addEventListener('click',()=>A.clipboard(editor.value));
    document.getElementById('export-code').addEventListener('click',exportTex);
    snippets.querySelectorAll('[data-snippet]').forEach(btn=>btn.addEventListener('click',()=>{code=D.snippets.find(s=>s.id===btn.dataset.snippet).code;editor.value=code;persistCode();scheduleRender(true);editor.focus();}));
    const editor=document.getElementById('latex-editor');
    editor.addEventListener('input',()=>{code=editor.value;persistCode();scheduleRender(false)});
    editor.addEventListener('scroll',()=>{document.getElementById('line-numbers').scrollTop=editor.scrollTop});
    editor.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const s=editor.selectionStart;editor.setRangeText('  ',s,editor.selectionEnd,'end');editor.dispatchEvent(new Event('input'));}if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();scheduleRender(true);}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();exportTex();}});
    scheduleRender(true);
  }
  function persistCode(){A.setStorage('draft-'+mode,code);}
  function lineCount(){const ed=document.getElementById('latex-editor');if(!ed)return;const count=ed.value.split('\n').length;document.getElementById('line-numbers').textContent=Array.from({length:count},(_,i)=>i+1).join('\n');document.getElementById('editor-count').textContent=`${count} ${A.lang==='zh'?'行':'lines'} · ${ed.value.length} ${A.lang==='zh'?'字符':'chars'}`;}
  function setStatus(text,isError=false){const node=document.querySelector('#preview-status');if(node)node.innerHTML=`<i class="status-dot ${isError?'error':''}"></i><span>${A.esc(text)}</span>`;}
  function scheduleRender(instant){clearTimeout(timeout);lineCount();if(instant)render();else timeout=setTimeout(render,320);}
  async function render(){const current=++request;const output=document.getElementById('live-output');if(!output)return;
    const value=document.getElementById('latex-editor').value;
    if(!value.trim()){output.textContent=A.lang==='zh'?'在左边输入 LaTeX':'Type LaTeX on the left';setStatus(A.lang==='zh'?'等待输入':'Waiting for input');return;}
    setStatus(A.lang==='zh'?'正在排版…':'Rendering…');
    if(mode==='math'){
      try{const node=await A.texToNode(value,true);if(current!==request||!output.isConnected)return;
        const err=node.querySelector('merror,[data-mjx-error]');
        if(err){output.innerHTML=`<div class="preview-error">${A.esc(err.getAttribute('data-mjx-error')||err.textContent||'Invalid TeX')}</div>`;setStatus(A.lang==='zh'?'语法需要检查':'Check syntax',true);}
        else{output.replaceChildren(node);setStatus(A.lang==='zh'?'排版完成':'Rendered');}
      }
      catch(e){if(current!==request)return;output.innerHTML=`<div class="preview-error">${A.esc(e.message||String(e))}</div>`;setStatus(A.lang==='zh'?'语法需要检查':'Check syntax',true);}
    }else{
      try{if(window.MathJax)await MathJax.startup.promise;if(current!==request||!output.isConnected)return;
        // Remove old MathJax internals before writing a new document preview.
        if(window.MathJax)window.MathJax.typesetClear([output]);output.innerHTML=docHtml(value);
        if(window.MathJax)await A.typeset(output);
        if(current!==request)return;setStatus(A.lang==='zh'?'简化预览已更新':'Preview updated');}
      catch(e){if(current!==request)return;output.innerHTML=`<div class="preview-error">${A.esc(e.message||String(e))}</div>`;setStatus(A.lang==='zh'?'排版出错':'Render error',true);}
    }
  }
  function exportTex(){
    let tex=document.getElementById('latex-editor').value;
    if(mode==='math'){
      tex=['\\documentclass{article}','\\usepackage{amsmath,amssymb}','\\begin{document}','\\[',tex,'\\]','\\end{document}',''].join('\n');
    } else if(!/\\begin\{document\}/.test(tex)){
      // Keep package declarations above the document body when exporting a partial example.
      const preamble=[],body=[];
      for(const line of tex.split(/\r?\n/)){
        if(/^\s*\\(?:usepackage|newcommand|renewcommand|setlength|addbibresource)(?:\[|\{)/.test(line))preamble.push(line);
        else body.push(line);
      }
      tex=['\\documentclass{article}','\\usepackage{amsmath,amssymb}',...preamble,'\\begin{document}',...body,'\\end{document}',''].join('\n');
    }
    const blob=new Blob([tex],{type:'text/x-tex;charset=utf-8'});
    const href=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=href;link.download=mode==='math'?'equation.tex':'document.tex';
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(href),1500);
    A.toast(A.lang==='zh'?'已生成 .tex 文件':'Saved .tex file');
  }
  window.addEventListener('languagechange',()=>{const el=document.getElementById('latex-editor');if(el)code=el.value;draw();});
  draw();
})();
