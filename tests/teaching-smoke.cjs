/* Exercise the guided teaching as a reader: open, switch language, reveal, and navigate. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),base=process.env.ATELIER_BASE||'file://'+ROOT+'/',out=process.env.ATELIER_TEACHING_OUTPUT||__dirname;
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.ATELIER_CHROMIUM||chromium.executablePath()});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],network=[],checks=[];
 page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('requestfailed',r=>network.push(r.url()));
 const check=async(name,fn)=>{try{await fn();checks.push({name,passed:true});console.log('PASS '+name)}catch(e){checks.push({name,passed:false,error:String(e)});console.log('FAIL '+name+' '+e)}};
 await page.goto(base+'index.html',{waitUntil:'load'});await page.waitForFunction(()=>Cookbook.catalog.entries.filter(e=>e.teaching).length>=77);
 const lessons=await page.evaluate(()=>Cookbook.data.lessons.map(l=>l.id));
 await check('four task-based home paths and preserved campaign',async()=>{assert.equal(await page.locator('.home-path-grid a').count(),4);assert.equal(await page.locator('.campaign-poster').count(),2);assert.equal(await page.locator('.campaign-title .latex-logo').count(),1)});
 for(const lang of ['zh','en']){
  for(const id of lessons){
   await check('course walkthrough and worked answer '+id+' '+lang,async()=>{
    await page.goto(base+'courses.html#'+id,{waitUntil:'load'});await page.evaluate(lang=>Cookbook.setLanguage(lang),lang);
    assert.equal(await page.locator('#lesson-walkthrough .teaching-steps>li').count(),3);
    assert.equal(await page.locator('.lesson-solution[open]').count(),0);
    const summary=page.locator('.lesson-solution>summary');await summary.click();
    assert.equal(await page.locator('.lesson-solution[open]').count(),1);assert((await page.locator('.lesson-solution .code-panel code').innerText()).trim());
    assert(await page.locator('#lesson-walkthrough .teaching-check').innerText());
   });
  }
 }
 const articles=['mwe','ctexart','align','mathbb','theorem-system','longtable','biblatex','beamer-fragile','programming-expl3','project-latexmk'];
 for(const lang of ['zh','en'])for(const id of articles){
  await check('article walkthrough, answer and section jump '+id+' '+lang,async()=>{
   await page.goto(base+'encyclopedia.html#'+id,{waitUntil:'load'});await page.evaluate(lang=>Cookbook.setLanguage(lang),lang);
   assert.equal(await page.locator('#guided-practice .teaching-steps>li').count(),3);
   await page.locator('#guided-practice .teaching-answer summary').click();assert.equal(await page.locator('#guided-practice .teaching-answer[open]').count(),1);
   assert(await page.locator('.article-toc [data-section="guided-practice"]').count());
   await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.article-toc [data-section="guided-practice"]').click();
   assert(Math.abs(await page.locator('#guided-practice').evaluate(el=>el.getBoundingClientRect().top)-90)<60);
  });
 }
 await check('all new exercises have working correct and wrong feedback',async()=>{
  await page.goto(base+'practice.html',{waitUntil:'load'});await page.evaluate(()=>Cookbook.setLanguage('zh'));
  const guided=await page.evaluate(()=>ATELIER.exercises.filter(q=>q.id.startsWith('exercise-guided-')));
  assert.equal(guided.length,24);
  for(const q of guided){
   await page.goto(base+'practice.html?module='+q.module+'&question='+q.id,{waitUntil:'load'});
   if(q.options){const answer=Array.isArray(q.answer)?q.answer:[q.answer];for(const i of answer)await page.locator('[data-choice="'+i+'"]').click()}
   else await page.locator('#quiz-answer').fill(Array.isArray(q.answer)?q.answer[0]:q.answer);
   await page.locator('#quiz-action').click();assert((await page.locator('.quiz-feedback strong').innerText()).includes('正确'),q.id);
   await page.goto(base+'practice.html?module='+q.module+'&question='+q.id,{waitUntil:'load'});
   if(q.options){const answers=Array.isArray(q.answer)?q.answer:[q.answer],bad=q.options.findIndex((_,i)=>!answers.includes(i));assert(bad>=0);await page.locator('[data-choice="'+bad+'"]').click()}else await page.locator('#quiz-answer').fill('wrong answer');
   await page.locator('#quiz-action').click();assert.equal(await page.evaluate(id=>Cookbook.getStorage('exercise-results',{})[id].correct,q.id),false,q.id);
   assert((await page.locator('.quiz-feedback p').count())>=1);
  }
 });
 await check('phone layout and keyboard disclosure',async()=>{
  await page.setViewportSize({width:390,height:844});
  for(const route of ['index.html','courses.html#start','courses.html#course-longtable','encyclopedia.html#mathbb','encyclopedia.html#longtable','practice.html']){
   await page.goto(base+route,{waitUntil:'load'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),route);
  }
  await page.goto(base+'courses.html#start',{waitUntil:'load'});
  await page.locator('.lesson-solution summary').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.lesson-solution[open]').count(),1);
  await page.screenshot({path:path.join(out,'teaching-course-mobile.png'),fullPage:true});
 });
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'courses.html#start',{waitUntil:'load'});await page.screenshot({path:path.join(out,'teaching-course-desktop.png'),fullPage:true});
 await page.goto(base+'encyclopedia.html#longtable',{waitUntil:'load'});await page.screenshot({path:path.join(out,'teaching-article-desktop.png'),fullPage:false});
 const result={base,browser:await browser.version(),checks,errors,network,passed:checks.filter(x=>x.passed).length,total:checks.length};
 fs.writeFileSync(path.join(out,'teaching-browser-results.json'),JSON.stringify(result,null,2));await browser.close();
 console.log(JSON.stringify({passed:result.passed,total:result.total,errors,network}));process.exitCode=checks.some(x=>!x.passed)||errors.length||network.length?1:0;
})().catch(e=>{console.error(e);process.exit(1)});
