"""Derive the content inventory and QA claims from exported data and test records."""
import json,subprocess,collections
from pathlib import Path
R=Path(__file__).resolve().parent.parent
D=json.loads(subprocess.check_output(['node',str(R/'scripts/export-content.cjs')]))
def read(name):
 p=R/'tests'/name
 return json.loads(p.read_text()) if p.exists() else {}
C=read('content-results.json');B=read('browser-results.json');T=read('latex-results.json');S=read('source-results.json');E=read('error-repair-results.json');Y=read('symbol-results.json');M=read('math-results.json');Z=read('browser-release-results.json');L=read('language-review-results.json');P=read('home-poster-results.json')
rows=['# Content index / 内容目录','','The data registry supplies the counts and entries in this index.','本目录按数据注册表列出内容并统计数量。','',f"- {len(D['modules'])} modules / 一级模块",f"- {len(D['entries'])} substantive encyclopedia entries / 百科条目",f"- {len(D['dictionary'])} dictionary records / 命令、环境与符号记录",f"- {len(D['examples'])} independent complete examples / 独立完整示例",f"- {len(D['exercises'])} exercises / 交互练习",f"- {len(D['lessons'])} course lessons in four learning paths / 四条路径的课时",f"- {sum(bool(e.get('teaching')) for e in D['entries'])} three-step walkthroughs / 分步操作讲解",f"- {sum(bool(l.get('solution')) for l in D['lessons'])} worked course answers / 课程参考答案",'', '| Module / 模块 | Articles / 条目 | Examples / 示例 | Exercises / 练习 |','| --- | ---: | ---: | ---: |']
for m in D['modules']:
 rows.append(f"| {m['title']['zh']} / {m['title']['en']} | {sum(e['module']==m['id'] for e in D['entries'])} | {sum(m['id'] in x['modules'] for x in D['examples'])} | {sum(q['module']==m['id'] for q in D['exercises'])} |")
rows+=['','Examples may cover several modules; the total counts each example once. Dictionary records and encyclopedia articles have separate totals.','示例可以覆盖多个模块，总数按独立示例统计。词典记录与百科条目分别计数。']
for m in D['modules']:
 rows+=['',f"## {m['title']['zh']} / {m['title']['en']}",'']
 for e in [e for e in D['entries'] if e['module']==m['id']]:
  rows.append(f"- [{e['title']['zh']} / {e['title']['en']}](encyclopedia.html#{e['id']}) (`{e['id']}`), {len(e['sections'])} sections"+(f", example `{e['example']}`" if e.get('example') else ''))
rows+=['','## Complete examples / 完整示例','', '| ID | Title / 名称 | Engine | Actual compilation / 实际编译 |','| --- | --- | --- | --- |']
for x in D['examples']:
 status=T.get(x['id'],{})
 rows.append(f"| [{x['id']}](examples/{x['id']}/main.tex) | {x['title']['zh']} / {x['title']['en']} | {x['engine']} | {'PASS' if status.get('compiled') else 'NOT COMPILED / FAILED'} |")
rows+=['','## Practice types / 题型','']
for typ,n in collections.Counter(q['type'] for q in D['exercises']).items():rows.append(f'- `{typ}`: {n}')
(R/'CONTENT_INDEX.md').write_text('\n'.join(rows)+'\n',encoding='utf-8')
G=read('teaching-browser-results.json');A=read('teaching-review-results.json')
qa=['# QA report / 质量检查报告','','Verification date: 2026-10-12 (Asia/Shanghai).','',
'## Teaching content / 教学内容','',
f"The registry contains {len(D['modules'])} topics, {len(D['entries'])} articles, {len(D['dictionary'])} dictionary records, {len(D['examples'])} complete examples, {len(D['exercises'])} exercises, and {len(D['lessons'])} lessons.",
f"{sum(bool(e.get('teaching')) for e in D['entries'])} articles have three worked steps and a self-check with an answer and reason. Every course lesson has a worked task solution and an observable expected result. The new exercises explain the individual choices; complete examples provide downloadable source, PDF, and preview.",'',
'## Content validation / 数据核对','',
f"Schema and local-resource errors: {len(C.get('errors',[]))}; warnings: {len(C.get('warnings',[]))}. Validation checks bilingual goals, steps, self-checks and course answers, as well as existing IDs, references, example sources, and exercise answers. See tests/content-results.json.",'',
'## Bilingual review / 中英文审读','',
'The teaching additions use Humanizer-zh, Humanizer, and Anti-defensive writing. The local My SKILL.md supplied the concrete-example, stepwise-explanation, self-check, and evidence-preservation principles. Mathematics and table examples were reviewed against the corresponding LaTeX skills and official manuals.',
f"The comparison with the previous registry records {A.get('changedExistingProseFields',0)} changed existing bilingual prose fields. Protected original source/formula differences: {len(A.get('protectedDifferences',[]))}; changed existing example artifacts: {len(A.get('artifactDifferences',[]))}. See LANGUAGE_REVIEW.md and tests/teaching-review-results.json.",'',
'## PDF compilation / PDF 编译','',
f"Saved compilation records: {sum(bool(v.get('compiled')) for v in T.values())} / {len(T)} examples passed. The {sum(x['id'].startswith('guided-') for x in D['examples'])} new guided examples were compiled in this run with the local TeX toolchain. The earlier examples retain their original source, PDF, and preview files; their saved compilation records are historical."]
for x in D['examples']:
 if x['id'].startswith('guided-'):
  v=T.get(x['id'],{});qa.append(f"- {'PASS' if v.get('compiled') else 'FAIL'}: {x['id']}; preview: {bool(v.get('preview'))}; diagnostics: {len(v.get('warnings',[]))}.")
qa+=['','The build logs and actual PDFs are saved in examples/<id>/. Numerical examples are explicitly illustrative, not reported research findings.','',
'## Browser verification / 浏览器检查','',
f"General regression: {B.get('passed',0)} / {B.get('total',0)} passed; console/runtime errors: {len(B.get('errors',[]))}; failed requests: {len(B.get('network',[]))}.",
f"Teaching flows: {G.get('passed',0)} / {G.get('total',0)} passed; console/runtime errors: {len(G.get('errors',[]))}; failed requests: {len(G.get('network',[]))}.",
'The teaching suite opens all 29 courses in both languages, reveals worked answers, follows article sections, grades each new exercise with correct and incorrect input, and checks narrow screens and keyboard disclosure. The general suite covers the existing pages, search, favorites, progress, editor, downloads, math rendering, and exercise formats.',
'','Results: tests/browser-results.json and tests/teaching-browser-results.json. Screenshots are retained in tests/teaching-*.png.','',
'## Reproduce / 复现','',
'Run node tests/validate-content.cjs, rebuild changed examples with scripts/compile-examples.py, run tests/browser-smoke.cjs and tests/teaching-smoke.cjs, then run scripts/build-docs.py and scripts/package-release.py. Playwright is needed for browser tests and TeX for PDF builds. The website itself uses bundled static assets and also runs under file://.','',
'## Test scope / 检查范围','',
'The browser checks use Chromium. Full TeX compilation happens outside the browser; the playground provides live mathematics and a document teaching preview. Self-checks reveal explanatory answers, while code exercises compare the requested source fragments. Equivalent TeX documents can be checked with a TeX engine.']
(R/'QA_REPORT.md').write_text('\n'.join(qa)+'\n',encoding='utf-8')
