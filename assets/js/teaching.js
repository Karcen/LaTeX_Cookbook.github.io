/* Shared guided lessons and self-checks, rendered from the bilingual content registry. */
(() => {
 'use strict';
 const A=window.Cookbook,W=(zh,en)=>A.lang==='zh'?zh:en;
 const prose=value=>A.esc(A.v(value)).split(/\n\s*\n/).map(p=>`<p>${p.replace(/\n/g,'<br>').replace(/(\\[A-Za-z@]+(?:\{[^{}<>]*\})?)/g,'<code>$1</code>')}</p>`).join('');
 A.teachingView=(guide,{id='guided-practice',heading=W('跟着做一遍','Work through it'),entryId}={})=>{
  if(!guide)return '';
  const exercise=A.catalog.exercises.find(q=>q.id.startsWith('exercise-guided-')&&q.related?.includes(entryId));
  return `<section class="teaching-guide article-section" id="${A.esc(id)}"><h2>${A.esc(heading)}</h2>${prose(guide.goal)}<ol class="teaching-steps">${guide.walkthrough.map(step=>`<li><h3>${A.esc(A.v(step.title))}</h3>${prose(step.body)}${step.code?A.makeCode(step.code):''}</li>`).join('')}</ol><div class="teaching-check"><h3>${W('自己检查一下','Check your understanding')}</h3>${prose(guide.check.question)}<details class="teaching-answer"><summary>${W('查看答案和理由','See the answer and why')}</summary><div>${prose(guide.check.answer)}${prose(guide.check.reason)}</div></details>${exercise?`<a class="text-link teaching-next" href="practice.html?module=${exercise.module}&question=${exercise.id}">${W('再做一道相关练习','Try a related exercise')}</a>`:''}</div></section>`;
 };
 A.lessonSolution=solution=>solution?`<details class="teaching-answer lesson-solution"><summary>${W('做完后，看看一种参考写法','When you are done, compare a worked solution')}</summary><div>${prose(solution.body)}${solution.code?A.makeCode(solution.code):''}${prose(solution.expected)}</div></details>`:'';
 A.lessonDetails=lesson=>lesson.explanations?.length?`<section class="lesson-block"><h2>${W('动手之前，先读懂这些写法','Understand the source before editing')}</h2>${lesson.explanations.map(prose).join('')}</section>`:'';
 A.lessonBuild=(lesson,entry)=>{
  const example=A.catalog.examples.find(x=>x.id===entry?.example)||A.catalog.examples.find(x=>x.id==='first-document');
  const engine=example?.engine||'pdflatex';
  const flag={pdflatex:'-pdf',xelatex:'-xelatex',lualatex:'-lualatex'}[engine];
  const complete=/\\documentclass(?:\[[^\]]*\])?\{/.test(lesson.code);
  const second=A.catalog.examples.find(x=>x.id===lesson.secondExample);
  return `${second?`<section class="lesson-block"><h2>${W('第二个完整示例：','Second complete example: ')}Make LaTex Great Again</h2>${prose(lesson.secondExplanation)}${A.makeCode(second.code)}<p><a class="text-link" href="playground.html?example=${second.id}&mode=document">${W('在实验室编辑这个示例','Edit this example in the Playground')}</a> · <a class="text-link" href="examples.html#${second.id}">${W('下载源码、查看 PDF','Download source and view the PDF')}</a></p>${prose(lesson.secondTask)}</section>`:''}
  <section class="lesson-block"><h2>${W('保存、编译与核对结果','Save, compile, and check')}</h2><ol>
  <li>${complete?W('上方源码是一份完整文档，保存为 UTF-8 的 main.tex。替换示例时替换整份文件，避免出现两套 document 环境。','The source above is a complete document. Save it as UTF-8 main.tex. Replace the whole file when switching examples to avoid duplicate document environments.'):lesson.kind==='math'?W('上方是数学片段：在实验室公式模式直接输入。在完整 .tex 文档中，将它放进显示数学环境，并在导言区加载 amsmath。也可先下载下方关联的完整示例，再替换其中的公式。','The source above is a math fragment: enter it directly in Playground math mode. In a .tex document, put it in display math and load amsmath in the preamble. Alternatively, download the linked full example and replace its formula.'):W('上方是练习片段：正文放进 document 环境，宏包与定义移到导言区，不能把整段直接当成独立文档。先打开下方关联的完整示例，再按本课说明替换相应部分。','The source above is a practice fragment. Place body text in the document environment and packages and definitions in the preamble. Start from the linked complete example and replace the corresponding parts as instructed.')}
  ${example?`<a class="text-link" href="examples.html#${example.id}">${W('查看配套完整示例与附属文件','Open the complete example and companion files')}</a>`:''}</li>
  <li>${W('在线编辑器选择','In an online editor, select')} <strong>${A.esc(engine)}</strong>${W(' 后重新编译。本地环境已安装 TeX 与 latexmk 时，在 main.tex 所在目录运行：','. With TeX and latexmk installed locally, run this from the directory containing main.tex:')}${A.makeCode(`latexmk ${flag} -interaction=nonstopmode -halt-on-error main.tex`)}</li>
  <li>${W('打开 main.pdf，对照步骤里的预期结果检查。目录与交叉引用可能需要多次运行，latexmk 会按需要重编译；文献示例还要有 .bib 文件及对应的 Biber 或 BibTeX。若失败，打开 main.log，先处理第一条错误，再核对文件路径、宏包位置和括号配对。','Open main.pdf and compare it with the expected results in the steps. Contents and cross-references can need several runs; latexmk reruns as needed. Bibliography examples also need their .bib file and Biber or BibTeX. On failure, open main.log, fix the first error, and check paths, package placement, and paired braces.')}</li>
  </ol><p>${W('实验室的文档预览帮助检查结构；字体、浮动位置、目录和引用请以实际编译的 PDF 为准。每次只改一项，保留一份能编译的版本。','The Playground document preview helps check structure. Inspect the compiled PDF for fonts, floats, contents, and references. Change one thing per run and keep a working copy.')}</p></section>`;
 };
})();
