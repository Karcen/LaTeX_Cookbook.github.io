# QA report / 质量检查报告

Release verification date: 2026-10-09 (Asia/Shanghai).

## Project audit / 原项目审查

The original five-page site had 12 lessons, 12 questions and 33 command records. All original HTML, authored CSS, JavaScript, course data and README were inspected. The local MathJax/Prism assets and original preference/progress storage namespace were retained. The original Chinese math lesson omitted the dependency for `mathbb`; the curated lesson adds `amssymb`.

## Delivered content / 实际内容

The registry contains 24 populated modules, 157 encyclopedia articles, 571 dictionary records, 81 complete examples, and 90 exercises. The index lists every article and example.

## Automated content checks / 自动内容检查

Schema/internal-resource errors: 0. Warnings: 0. See `tests/content-results.json`.


## Bilingual prose review / 中英文文案审读

Humanizer, Humanizer-zh and Anti-defensive writing were applied to articles, dictionary explanations, example descriptions, exercises, lessons, interface text and documentation. 848 registry language fields changed. Protected registry data has identical SHA-256 before and after; 0 protected-field differences and 0 structural differences were found. All 252 checked source/PDF/preview files match the previous release. See LANGUAGE_REVIEW.md and tests/language-review-results.json.

Checks cover bilingual fields, unique IDs, populated topic modules, valid related-entry/example links, dictionary parents, complete document structure, exercise option bounds, all nine exercise types, and HTML resource paths.

## Real TeX compilation / 实际 TeX 编译

81 / 81 examples compiled successfully using local TeX Live 2025 and latexmk 4.86a. Each example has a generated PDF and a retained build log.

All exported example projects produced a PDF. Their first pages are supplied as PNG previews.

0 example builds emitted warning/diagnostic lines. The retained logs record compilation and layout diagnostics.


All 19 repaired error-article MWEs were additionally compiled twice, with no recorded missing glyphs, unresolved references or overfull boxes. See `tests/error-repair-results.json` and its source/log directories.
The 285 dedicated symbol records were tested as 570 actual TeX expressions (glyph plus usage example), using only their declared core/amsmath/amssymb dependencies. All passed; sources and logs are retained in `tests/symbol-compilation/`.
All 307 dictionary MathJax expressions also rendered without merror.

## Browser verification / 浏览器验证

Chromium: 47 / 47 recorded checks passed. Mode: `file:///Users/karcenzheng/Documents/GitHub/LaTeX_Cookbook.github.io/`.
Uncaught/console errors: 0. Failed requests: 0.
Browser version: 154.0.8037.98; bundled MathJax: 3.2.1.

- PASS: open index
- PASS: open encyclopedia
- PASS: open courses
- PASS: open reference
- PASS: open symbols
- PASS: open packages
- PASS: open classes
- PASS: open examples
- PASS: open templates
- PASS: open troubleshooting
- PASS: open playground
- PASS: open practice
- PASS: bilingual longtable article and reading location
- PASS: theme saves on reload
- PASS: article favorite saves
- PASS: global search ctexart
- PASS: global search standalone
- PASS: global search 黑板粗体
- PASS: global search blackboard bold
- PASS: global search mathcal
- PASS: global search %
- PASS: global search longtable
- PASS: global search citet
- PASS: global search citep
- PASS: global search Undefined control sequence
- PASS: dictionary search favorites and copy
- PASS: symbols actually render SVG
- PASS: all dictionary mathematics render without MathJax errors
- PASS: fourteen mathematical alphabet comparisons render
- PASS: learning progress survives reload
- PASS: math editor live rendering highlight pairing save and download
- PASS: math errors and HTML/link injection rejected
- PASS: document template and character experiment
- PASS: example .bib companions and actual PDF output
- PASS: exercise grading single
- PASS: exercise grading multiple
- PASS: exercise grading fill
- PASS: exercise grading boolean
- PASS: exercise grading debug
- PASS: exercise grading match
- PASS: exercise grading formula
- PASS: exercise grading scenario
- PASS: exercise grading task
- PASS: code tasks allow formatting and preserve literal text
- PASS: wrong answer explains the mistake
- PASS: mobile navigation and no horizontal page overflow
- PASS: reduced motion and keyboard search

Homepage poster checks: 6 / 6 combinations passed across 1440px, 390px and 320px widths in both languages. Both supplied images load locally at their original proportions. The title and footer use the requested slogan, the English slogan is uppercase, captions read only View full image / 查看原图, and the displayed brand is latex.cookbook. No horizontal page overflow was found. Light and dark screenshots are retained in tests/poster-*.png; details are in tests/home-poster-results.json.

Checks include every page, both languages, theme persistence, article/command favorites, multilingual global search and acceptance queries, SVG notation, lesson progress, editor highlighting/pairing/drafts, invalid math, rejected link injection, template switching, character syntax, `.tex` and `.bib` downloads, correct grading in all nine formats, incorrect-answer feedback, mobile navigation/layout, reduced motion, and keyboard search. Desktop and mobile screenshots are saved in `tests/`.

## References / 官方资料

76 distinct primary-reference URLs were checked; 0 could not be confirmed by the automated network check. The report lists timeouts and automated-access restrictions as unavailable.

## Unzipped-release verification / 解压验证

The ZIP was extracted to an independent temporary directory and opened under file://. 47 / 47 browser checks passed, with 0 console/runtime errors and 0 failed requests. See tests/browser-release-results.json. The final archive contains the runtime files used in this check, together with updated documentation and verification records.

Current official manuals and locally installed package sources were compared for high-risk facts: CTeX/ctexbeamer, engine and font requirements, natbib versus biblatex ownership, longtable output-routine constraints, math-environment nesting, Beamer overlays, and minted 3 external-tool requirements. Online package versions may be newer than the test installation.

## Remaining limits / 限制与未完成事项

- The playground renders mathematics and selected document structures. Full LaTeX PDFs require a TeX engine; the library supplies precompiled TikZ and Beamer examples.
- Source diagnostics check braces, environment order, and common package combinations. Code grading accepts the listed text fragments; other equivalent source needs review in a TeX environment.
- Automated browser checks use Chromium. Safari/Firefox and assistive-technology audits have not been exhaustively tested.
- User-created projects can require fonts, images, bibliography tools or package versions beyond the supplied portable examples.
- Reference URLs need internet access; all delivered learning content and runtime assets are local.
- The documented data schema supports further packages and institutional templates.

## Reproduction / 复现

The local universal Biber executable had a host-specific lipo wrapper failure. Validation used an arm64 slice extracted to /tmp with the system lipo tool. The local TeX installation and release assets remained intact.

Run `node tests/validate-content.cjs`, `python3 scripts/compile-examples.py`, `node tests/browser-smoke.cjs`, then the documentation and packaging scripts. Playwright is required only to run the browser tests; TeX is required only to rebuild the example PDFs.
