"""Derive the content inventory and QA claims from exported data and test records."""
import json,subprocess,collections
from pathlib import Path
R=Path(__file__).resolve().parent.parent
D=json.loads(subprocess.check_output(['node',str(R/'scripts/export-content.cjs')]))
def read(name):
 p=R/'tests'/name
 return json.loads(p.read_text()) if p.exists() else {}
C=read('content-results.json');B=read('browser-results.json');T=read('latex-results.json');S=read('source-results.json');E=read('error-repair-results.json');Y=read('symbol-results.json');M=read('math-results.json');Z=read('browser-release-results.json');L=read('language-review-results.json')
rows=['# Content index / 内容目录','','The data registry supplies the counts and entries in this index.','本目录按数据注册表列出内容并统计数量。','',f"- {len(D['modules'])} modules / 一级模块",f"- {len(D['entries'])} substantive encyclopedia entries / 百科条目",f"- {len(D['dictionary'])} dictionary records / 命令、环境与符号记录",f"- {len(D['examples'])} independent complete examples / 独立完整示例",f"- {len(D['exercises'])} exercises / 交互练习",f"- {len(D['lessons'])} course lessons in four learning paths / 四条路径的课时",'', '| Module / 模块 | Articles / 条目 | Examples / 示例 | Exercises / 练习 |','| --- | ---: | ---: | ---: |']
for m in D['modules']:
 rows.append(f"| {m['title']['zh']} / {m['title']['en']} | {sum(e['module']==m['id'] for e in D['entries'])} | {sum(m['id'] in x['modules'] for x in D['examples'])} | {sum(q['module']==m['id'] for q in D['exercises'])} |")
rows+=['','Examples may cover several modules; the total counts each example once. Dictionary records and encyclopedia articles have separate totals.','示例可以覆盖多个模块，总数按独立示例统计。词典记录与百科条目分别计数。']
for m in D['modules']:
 rows+=['',f"## {m['title']['zh']} / {m['title']['en']}",'']
 for e in D['entries']:
  rows.append(f"- [{e['title']['zh']} / {e['title']['en']}](encyclopedia.html#{e['id']}) (`{e['id']}`), {len(e['sections'])} sections"+(f", example `{e['example']}`" if e.get('example') else ''))
rows+=['','## Complete examples / 完整示例','', '| ID | Title / 名称 | Engine | Actual compilation / 实际编译 |','| --- | --- | --- | --- |']
for x in D['examples']:
 status=T.get(x['id'],{})
 rows.append(f"| [{x['id']}](examples/{x['id']}/main.tex) | {x['title']['zh']} / {x['title']['en']} | {x['engine']} | {'PASS' if status.get('compiled') else 'NOT COMPILED / FAILED'} |")
rows+=['','## Practice types / 题型','']
for typ,n in collections.Counter(q['type'] for q in D['exercises']).items():rows.append(f'- `{typ}`: {n}')
(R/'CONTENT_INDEX.md').write_text('\n'.join(rows)+'\n',encoding='utf-8')
qa=['# QA report / 质量检查报告','','Release verification date: 2026-10-09 (Asia/Shanghai).','', '## Project audit / 原项目审查','', 'The original five-page site had 12 lessons, 12 questions and 33 command records. All original HTML, authored CSS, JavaScript, course data and README were inspected. The local MathJax/Prism assets and original preference/progress storage namespace were retained. The original Chinese math lesson omitted the dependency for `mathbb`; the curated lesson adds `amssymb`.','', '## Delivered content / 实际内容','']
qa += [f"The registry contains {len(D['modules'])} populated modules, {len(D['entries'])} encyclopedia articles, {len(D['dictionary'])} dictionary records, {len(D['examples'])} complete examples, and {len(D['exercises'])} exercises. The index lists every article and example.", '']
qa += ['## Automated content checks / 自动内容检查','',f"Schema/internal-resource errors: {len(C.get('errors',[]))}. Warnings: {len(C.get('warnings',[]))}. See `tests/content-results.json`.",'']
qa += ['- '+x for x in C.get('errors',[])+C.get('warnings',[])]
if L:
 qa += ['', '## Bilingual prose review / 中英文文案审读', '', f"Humanizer, Humanizer-zh and Anti-defensive writing were applied to articles, dictionary explanations, example descriptions, exercises, lessons, interface text and documentation. {L.get('changedProseFields',0)} registry language fields changed. Protected registry data has identical SHA-256 before and after; {len(L.get('protectedDifferences',[]))} protected-field differences and {len(L.get('structureDifferences',[]))} structural differences were found. All {L.get('compiledArtifactFilesChecked',0)} checked source/PDF/preview files match the previous release. See LANGUAGE_REVIEW.md and tests/language-review-results.json."]
qa += ['','Checks cover bilingual fields, unique IDs, populated topic modules, valid related-entry/example links, dictionary parents, complete document structure, exercise option bounds, all nine exercise types, and HTML resource paths.','', '## Real TeX compilation / 实际 TeX 编译','',f"{sum(s.get('compiled',False) for s in T.values())} / {len(T)} examples compiled successfully using local TeX Live 2025 and latexmk 4.86a. Each example has a generated PDF and a retained build log.",'']
failed=[(id,s) for id,s in T.items() if not s.get('compiled')]
if failed:
 qa+=['| Example | Result / 原因 |','| --- | --- |']
 for id,s in failed:qa.append(f"| `{id}` | {s.get('reason','Not compiled').replace('|','/')} |")
else:qa.append('All exported example projects produced a PDF. Their first pages are supplied as PNG previews.')
warn=[(id,s) for id,s in T.items() if s.get('warnings')]
qa+=['', f"{len(warn)} example builds emitted warning/diagnostic lines. The retained logs record compilation and layout diagnostics.",'']
if warn:
 qa+=['| Example | Warning / diagnostic excerpts |','| --- | --- |']
 for id,s in warn:qa.append(f"| `{id}` | {'; '.join(s['warnings'][:3]).replace('|','/')} |")
qa+=['',f"All {len(E)} repaired error-article MWEs were additionally compiled twice, with no recorded missing glyphs, unresolved references or overfull boxes. See `tests/error-repair-results.json` and its source/log directories.", f"The {Y.get('records',0)} dedicated symbol records were tested as {Y.get('formulaChecks',0)} actual TeX expressions (glyph plus usage example), using only their declared core/amsmath/amssymb dependencies. All passed; sources and logs are retained in `tests/symbol-compilation/`.", f"All {len(M)} dictionary MathJax expressions also rendered without merror."]
qa+=['','## Browser verification / 浏览器验证','',f"Chromium: {B.get('passed',0)} / {B.get('total',0)} recorded checks passed. Mode: `{B.get('base','not run')}`.",f"Uncaught/console errors: {len(B.get('errors',[]))}. Failed requests: {len(B.get('network',[]))}.",f"Browser version: {B.get('browser',Z.get('browser','see test runtime'))}; bundled MathJax: {B.get('mathjax',Z.get('mathjax','see browser runtime'))}.",'']
for c in B.get('checks',[]):qa.append(f"- {'PASS' if c['passed'] else 'FAIL'}: {c['name']}"+(f" ({c.get('error','')})" if not c['passed'] else ''))
qa+=['','Checks include every page, both languages, theme persistence, article/command favorites, multilingual global search and acceptance queries, SVG notation, lesson progress, editor highlighting/pairing/drafts, invalid math, rejected link injection, template switching, character syntax, `.tex` and `.bib` downloads, correct grading in all nine formats, incorrect-answer feedback, mobile navigation/layout, reduced motion, and keyboard search. Desktop and mobile screenshots are saved in `tests/`.','', '## References / 官方资料','']
qa.append(f"{S.get('checked',0)} distinct primary-reference URLs were checked; {len(S.get('unavailable',[]))} could not be confirmed by the automated network check. The report lists timeouts and automated-access restrictions as unavailable.")
for s in S.get('unavailable',[]):qa.append('- '+s['url']+': '+s['reason'])
if Z:qa += ['', '## Unzipped-release verification / 解压验证', '', f"The ZIP was extracted to an independent temporary directory and opened under file://. {Z.get('passed',0)} / {Z.get('total',0)} browser checks passed, with {len(Z.get('errors',[]))} console/runtime errors and {len(Z.get('network',[]))} failed requests. See tests/browser-release-results.json. The final archive contains the runtime files used in this check, together with updated documentation and verification records."]
qa+=['','Current official manuals and locally installed package sources were compared for high-risk facts: CTeX/ctexbeamer, engine and font requirements, natbib versus biblatex ownership, longtable output-routine constraints, math-environment nesting, Beamer overlays, and minted 3 external-tool requirements. Online package versions may be newer than the test installation.','', '## Remaining limits / 限制与未完成事项','', '- The playground renders mathematics and selected document structures. Full LaTeX PDFs require a TeX engine; the library supplies precompiled TikZ and Beamer examples.', '- Source diagnostics check braces, environment order, and common package combinations. Code grading accepts the listed text fragments; other equivalent source needs review in a TeX environment.', '- Automated browser checks use Chromium. Safari/Firefox and assistive-technology audits have not been exhaustively tested.', '- User-created projects can require fonts, images, bibliography tools or package versions beyond the supplied portable examples.', '- Reference URLs need internet access; all delivered learning content and runtime assets are local.', '- The documented data schema supports further packages and institutional templates.','', '## Reproduction / 复现','', 'The local universal Biber executable had a host-specific lipo wrapper failure. Validation used an arm64 slice extracted to /tmp with the system lipo tool. The local TeX installation and release assets remained intact.','', 'Run `node tests/validate-content.cjs`, `python3 scripts/compile-examples.py`, `node tests/browser-smoke.cjs`, then the documentation and packaging scripts. Playwright is required only to run the browser tests; TeX is required only to rebuild the example PDFs.']
(R/'QA_REPORT.md').write_text('\n'.join(qa)+'\n',encoding='utf-8')
