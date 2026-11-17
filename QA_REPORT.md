# QA report / 质量检查报告

Verification date: 2026-10-12 (Asia/Shanghai).

## 教程增补验证（2026-11-17）

12 节入门课新增代码位置、语法含义与常见错误说明，全部 29 节课新增保存、编译与结果核对指引。第一课保留 Hello, LaTeX!，增加 Make LaTex Great Again 完整示例及字号修改任务；当前示例总数为 87。

- 新示例使用本机 pdfLaTeX 实际编译，生成一页 PDF 和预览；无编译警告，并核对了 PDF 文字与排版。此前 86 份示例保留原有编译记录。
- 内容验证通过：0 错误、0 警告；JavaScript 语法与差异空白检查通过。
- Chromium 浏览器检查 68 项通过，涵盖全部课程的中英文页面与答案展开、新示例跳转、PDF 链接、居中与局部字号预览、实时修改，以及 1440 / 390 像素下的页面溢出检查；无运行时错误。
- 增补结果保存在 tests/tutorial-expansion-results.json。以下章节为原有版本的验证记录。

## Teaching content / 教学内容

The registry contains 24 topics, 157 articles, 571 dictionary records, 86 complete examples, 114 exercises, and 29 lessons.
77 articles have three worked steps and a self-check with an answer and reason. Every course lesson has a worked task solution and an observable expected result. The new exercises explain the individual choices; complete examples provide downloadable source, PDF, and preview.

## Content validation / 数据核对

Schema and local-resource errors: 0; warnings: 0. Validation checks bilingual goals, steps, self-checks and course answers, as well as existing IDs, references, example sources, and exercise answers. See tests/content-results.json.

## Bilingual review / 中英文审读

The teaching additions use Humanizer-zh, Humanizer, and Anti-defensive writing. The local My SKILL.md supplied the concrete-example, stepwise-explanation, self-check, and evidence-preservation principles. Mathematics and table examples were reviewed against the corresponding LaTeX skills and official manuals.
The comparison with the previous registry records 796 changed existing bilingual prose fields. Protected original source/formula differences: 0; changed existing example artifacts: 0. See LANGUAGE_REVIEW.md and tests/teaching-review-results.json.

## PDF compilation / PDF 编译

Saved compilation records: 86 / 86 examples passed. The 5 new guided examples were compiled in this run with the local TeX toolchain. The earlier examples retain their original source, PDF, and preview files; their saved compilation records are historical.
- PASS: guided-math-progression; preview: True; diagnostics: 0.
- PASS: guided-parameter-macros; preview: True; diagnostics: 0.
- PASS: guided-table-progression; preview: True; diagnostics: 0.
- PASS: guided-references-document; preview: True; diagnostics: 0.
- PASS: guided-beamer-overlays-code; preview: True; diagnostics: 0.

The build logs and actual PDFs are saved in examples/<id>/. Numerical examples are explicitly illustrative, not reported research findings.

## Browser verification / 浏览器检查

General regression: 47 / 47 passed; console/runtime errors: 0; failed requests: 0.
Teaching flows: 81 / 81 passed; console/runtime errors: 0; failed requests: 0.
The teaching suite opens all 29 courses in both languages, reveals worked answers, follows article sections, grades each new exercise with correct and incorrect input, and checks narrow screens and keyboard disclosure. The general suite covers the existing pages, search, favorites, progress, editor, downloads, math rendering, and exercise formats.

Results: tests/browser-results.json and tests/teaching-browser-results.json. Screenshots are retained in tests/teaching-*.png.

## Reproduce / 复现

Run node tests/validate-content.cjs, rebuild changed examples with scripts/compile-examples.py, run tests/browser-smoke.cjs and tests/teaching-smoke.cjs, then run scripts/build-docs.py and scripts/package-release.py. Playwright is needed for browser tests and TeX for PDF builds. The website itself uses bundled static assets and also runs under file://.

## Test scope / 检查范围

The browser checks use Chromium. Full TeX compilation happens outside the browser; the playground provides live mathematics and a document teaching preview. Self-checks reveal explanatory answers, while code exercises compare the requested source fragments. Equivalent TeX documents can be checked with a TeX engine.
