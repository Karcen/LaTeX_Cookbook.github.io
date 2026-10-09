# Technical notes / 技术说明

## Architecture / 架构

The release is a multipage static site. Classic scripts register content synchronously, and HTML files open directly in the browser. All runtime data, scripts, rendering libraries, and fonts are local. The repository itself contains deployable files; `deliverables/LaTeX-Atelier/` is a clean copy for hosting.

网站采用多页静态架构，由普通脚本同步注册内容。数据、脚本和渲染库随网站提供，使用本机字体；源码与发布文件均可直接打开。

| File | Responsibility |
| --- | --- |
| `content-base.js` | 24 bilingual topic definitions and registry |
| `content-core.js` | Core ecosystem, classes, Chinese, math, tables, citations and references |
| `content-advanced.js` | Presentations, graphics, layout, programming, diagnostics and professional workflows |
| `content-theorems.js` | Deep theorem styles, proofs and shared-counter examples |
| `content-exercises.js` | Bilingual practice data and accepted answers |
| `content-symbols.js` | Distinct mathematical symbol records with renderer source |
| `content-supplement.js` | Cross-topic notation guide and explicit source/renderer mapping for the alphabet comparison |
| `catalog.js` | Course curation and content relationships |
| `compilation.js` | Actual build results from local TeX |
| `app.js` | Shared navigation, localization, search, storage, clipboard and math helpers |
| `encyclopedia.js`, `library.js` | Article reader and filtered libraries |
| `playground.js`, `latex-tools.js` | Editor, limited preview and heuristic diagnostics |
| `character-lab.js` | Special-character syntax experiment |
| `atelier.css` | Theme tokens, reading layout, responsive navigation and editor overlay |

`data.js` preserves the original 12 lessons and quick snippets, with dependency corrections applied in `catalog.js`. Original progress IDs remain valid. Course additions have stable `course-` IDs.

## Data model / 数据结构

An entry has a stable `id`, `module`, bilingual `title` and `summary`, `level`, `keywords`, `packages`, `engines`, `syntax`, substantive bilingual `sections`, an optional example ID, related IDs, and source URLs. Each section may include code and a mathematical expression. Bodies are plain text, escaped before rendering.

An example includes its engine, complete main source, and a `files` map for companion source files. The export script writes all files into `examples/<id>/`. Entries may share a complete example where it illustrates the same mechanism; independent examples are counted separately.

A dictionary record includes a command, two names, two explanations, a usage example, dependency, parent entry, and optional MathJax source. Exercises store bilingual instructions, options or accepted text fragments, correct answers, explanations and related entry IDs. Text answers trim leading/trailing whitespace and collapse whitespace. Seven closed source tasks also normalize spacing at TeX token boundaries while preserving spaces within ordinary text. Grading compares the submitted fragment with the accepted answers; full TeX compilation takes place in the user’s TeX environment.

## Rendering boundaries / 渲染边界

MathJax renders supported mathematical TeX syntax as SVG. Document previews show selected syntax. Full PDF generation uses a TeX engine, which processes document classes, TikZ, line breaking, and operating-system fonts, with BibTeX or Biber handling bibliography data. Check the compiled PDF for the final layout.

源码诊断检查括号、环境顺序和常见宏包组合。verbatim、动态环境名和复杂宏展开可能产生误报，因此完整 PDF 的验证需要实际运行 TeX 引擎。

Generated library PDFs and first-page PNGs are actual build artifacts. Warnings remain in each example's `main.log` and `build.txt`. A PDF can compile while still containing a layout warning. `tests/latex-results.json` distinguishes successful compilation from warnings and failures.

## Storage and input / 存储与输入

Preferences retain the `atelier:` localStorage namespace. Learning completion, article favorites, command favorites, exercise results and editor drafts use separate keys. Storage operations catch unavailable or malformed storage. A language change preserves the current article/lesson, selections and answers in memory; scroll position is restored after rendering.

User source and searches are escaped before insertion into HTML. Math preview rejects link/HTML styling/external-extension commands and limits expression size and macro expansion. Example companion paths are restricted to relative paths during export. Clipboard uses the browser Clipboard API with a local-file fallback. Blob downloads do not upload source.

## Dependencies and versions / 依赖与版本

Bundled MathJax and Prism are inherited from the audited original repository and redistributed unchanged. The QA report records the available runtime version information. Authors use TeX Live, latexmk, BibTeX, Biber, makeindex, and external highlighters to build and validate examples. Readers use the bundled browser assets. Sources cite official manuals and package pages; installed TeX versions may differ from the current online manuals.

CTeX font examples use the distribution-provided Fandol font set where applicable. Fandol keeps these examples independent of Windows, macOS, or proprietary Chinese fonts. `fontspec` and `unicode-math` require XeLaTeX or LuaLaTeX. CTeX also has engine-specific support for pdfLaTeX; follow the configuration documented in its manual.

Current references: [LaTeX Project](https://www.latex-project.org/help/documentation/), [CTeX manual](https://mirrors.ctan.org/language/chinese/ctex/ctex.pdf), [longtable](https://ctan.org/pkg/longtable), [MathJax documentation](https://docs.mathjax.org/en/v3.2/).

## Maintenance / 维护

`tests/validate-content.cjs` checks schema, bilingual fields, IDs, cross-links, populated modules, example structure, question answers and page assets. `scripts/compile-examples.py` exports and compiles with latexmk, records warnings and generates PNGs. `tests/browser-smoke.cjs` opens the release in Chromium under `file://` and checks user interactions. `scripts/build-docs.py` derives the content index and QA report from recorded results. `scripts/package-release.py` copies only release assets and packages the complete site, sources, documentation and verification records.
