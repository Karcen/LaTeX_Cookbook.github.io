# Third-party notices

This release redistributes the original repository's local rendering and highlighting libraries without changes:

| Component | Bundled files | License |
| --- | --- | --- |
| [MathJax](https://github.com/mathjax/MathJax) | `assets/vendor/mathjax-tex-svg-full.js` | Apache License 2.0; full text in `assets/licenses/MathJax-LICENSE.txt` |
| [PrismJS](https://github.com/PrismJS/prism) | `assets/vendor/prism.js`, `assets/vendor/prism-latex.js` | MIT; copyright Lea Verou and contributors; full text in `assets/licenses/Prism-LICENSE.txt` |
| [Lucide](https://github.com/lucide-icons/lucide) | Some small inline SVG icon geometries in `assets/js/app.js` follow the Lucide icon set | ISC; Feather-derived icons retain MIT terms; both texts in `assets/licenses/Lucide-LICENSE.txt` |

The website uses system fonts and requests no web-font service. It does not redistribute TeX Live, LaTeX document classes, TeX packages, BibTeX, Biber, or external syntax-highlighting tools. The LaTeX sources are original instructional examples; the PDFs are their typeset outputs, generated with the installed TeX tools and fonts. Links lead readers to the package documentation.

Frontend-design, the Chinese and English Humanizer skills, and Anti-defensive writing guided design and prose review during development. The browser uses the bundled static scripts and libraries.

第三方库完整许可证随网站一并打包。正文与示例链接到官方资料。用户在本机安装 TeX 宏包与外部编译工具，具体依赖见相应条目。
