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
})();
