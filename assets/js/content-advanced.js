/* Bilingual advanced topics, independent examples, and troubleshooting. */
(() => {
 const D=window.ATELIER;
 D.entries.push(...[
  {
    "id": "beamer-frames",
    "module": "beamer",
    "title": {
      "zh": "frame、标题与画幅",
      "en": "Frames, titles, and aspect ratio"
    },
    "summary": {
      "zh": "frame 是演示内容的逻辑单元，同一单元可以生成多张幻灯片。",
      "en": "A frame is a logical presentation unit and may produce multiple slides."
    },
    "syntax": "\\documentclass[aspectratio=169]{beamer}\\begin{frame}[t]{Title}...\\end{frame}",
    "sections": [
      {
        "title": {
          "zh": "逻辑 frame 与 PDF 页",
          "en": "Logical frames and PDF pages"
        },
        "body": {
          "zh": "普通 article 连续排版正文，Beamer 将内容放进固定高度的 frame。一个带逐步显示的 frame 会生成多个 PDF 页；因此 frame 编号不一定等于 PDF 页码。\n\naspectratio=169 选择 16:9，aspectratio=43 选择 4:3。默认比例为 4:3；应根据投影设备和交付要求选择。",
          "en": "An article flows text across pages; Beamer places content in frames of fixed height. Overlays can generate several PDF pages from one frame, so frame numbers and PDF page numbers may differ.\n\nChoose aspectratio=169 for 16:9 or aspectratio=43 for 4:3. The default is 4:3. Select the ratio for the display and delivery requirements."
        }
      },
      {
        "title": {
          "zh": "标题与定位参数",
          "en": "Titles and vertical placement"
        },
        "body": {
          "zh": "frame 的花括号参数设置标题，也可在环境内使用 \\frametitle。选项 t、c、b 控制内容垂直定位；plain 隐藏主题的常规页眉页脚，常用于整页图形。\n\n将 \\titlepage 放进独立 frame。短标题可用 \\title[Short]{Long} 为页脚保留空间。",
          "en": "The braced frame argument sets its title; \\frametitle can also set it inside the environment. The t, c, and b options control vertical placement. plain suppresses the usual theme headers and footers and suits full-frame graphics.\n\nPlace \\titlepage in its own frame. Use \\title[Short]{Long} when the footer needs a shorter title."
        },
        "code": "\\begin{frame}[t]{Research design}\\framesubtitle{An identification strategy}One claim per frame.\\end{frame}"
      },
      {
        "title": {
          "zh": "章节结构与空间限制",
          "en": "Section structure and space limits"
        },
        "body": {
          "zh": "\\section 更新导航与目录，不自动产生正文页。使用 \\AtBeginSection 插入分节目录。过长内容优先拆分 frame；allowframebreaks 适合参考文献等线性文本，但不能与一般逐步显示方式混用。",
          "en": "\\section updates navigation and the table of contents without producing a content frame. Use \\AtBeginSection to insert section outlines. Split long content into frames. allowframebreaks suits linear text such as references, but is incompatible with ordinary overlays."
        }
      },
      {
        "title": {
          "zh": "目录与分节页",
          "en": "Outlines and section frames"
        },
        "body": {
          "zh": "tableofcontents 根据 section 信息生成目录，需要重新编译。AtBeginSection 中的空可选参数可避免为星号章节执行钩子；currentsection 只强调当前节。",
          "en": "tableofcontents reads section information and needs a rerun. An empty optional argument to AtBeginSection suppresses the hook for starred sections; currentsection emphasizes the current section."
        },
        "code": "\\AtBeginSection[]{\\begin{frame}{Outline}\\tableofcontents[currentsection]\\end{frame}}"
      },
      {
        "title": {
          "zh": "图表与参考文献",
          "en": "Figures, tables, and references"
        },
        "body": {
          "zh": "Beamer 图表保留 caption 与 label 接口，但不会按论文浮动机制移动。参考文献可用 thebibliography，或配合 BibTeX/Biber 工作链；含大量文献的 frame 可用 allowframebreaks。",
          "en": "Beamer figures and tables retain caption and label interfaces without article-style floating. Use thebibliography or a BibTeX/Biber workflow. A long bibliography frame can use allowframebreaks."
        }
      }
    ],
    "example": "ex-beamer-report",
    "packages": [
      "beamer"
    ],
    "level": "intermediate",
    "related": [
      "beamer-overlays",
      "error-beamer-overflow"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-themes",
    "module": "beamer",
    "title": {
      "zh": "主题、颜色主题与字体主题",
      "en": "Themes, color themes, and font themes"
    },
    "summary": {
      "zh": "主题由布局、颜色、字体和内部元素的多个层次组成。",
      "en": "A theme combines layout, colors, fonts, and inner elements."
    },
    "syntax": "\\usetheme{Madrid}\\usecolortheme{seahorse}\\usefonttheme{professionalfonts}",
    "sections": [
      {
        "title": {
          "zh": "主题层次",
          "en": "Theme layers"
        },
        "body": {
          "zh": "\\usetheme 载入完整主题；\\useinnertheme 控制列表和 block 等内部元素，\\useoutertheme 控制页眉、页脚和导航。\\usecolortheme 与 \\usefonttheme 可以覆盖颜色和字体配置。",
          "en": "\\usetheme loads a complete theme. \\useinnertheme controls lists and blocks; \\useoutertheme controls headers, footers, and navigation. \\usecolortheme and \\usefonttheme can override colors and fonts."
        }
      },
      {
        "title": {
          "zh": "公开配置接口",
          "en": "Public configuration interfaces"
        },
        "body": {
          "zh": "\\setbeamercolor{structure}{fg=teal} 调整结构色。\\setbeamerfont{frametitle}{series=\\bfseries} 设置标题字重。professionalfonts 保留用户的专业字体配置，所用字体需另行安装。",
          "en": "\\setbeamercolor{structure}{fg=teal} changes the structural color. \\setbeamerfont{frametitle}{series=\\bfseries} sets the title weight. professionalfonts preserves the user’s font configuration; the fonts themselves need to be installed."
        },
        "code": "\\setbeamercolor{structure}{fg=teal}\\setbeamerfont{frametitle}{series=\\bfseries}"
      },
      {
        "title": {
          "zh": "可读性与兼容性",
          "en": "Readability and compatibility"
        },
        "body": {
          "zh": "先在默认主题下验证内容，再调整视觉配置。保持投影下可辨认的正文大小，并检查主题页脚是否压缩正文。Beamer 已经加载 hyperref 和 xcolor；重复用不同选项加载可能造成 Option clash。",
          "en": "Verify content with the default theme before changing appearance. Keep text large enough for projection and check whether the footer reduces usable space. Beamer already loads hyperref and xcolor; loading them again with different options can cause an option clash."
        }
      },
      {
        "title": {
          "zh": "内部主题与外部主题",
          "en": "Inner and outer themes"
        },
        "body": {
          "zh": "内部主题控制项目符号、定理和框；外部主题控制导航条和页码。选择两个外部主题可能覆盖同一元素，应查看最终模板状态。",
          "en": "Inner themes control bullets, theorems, and blocks. Outer themes control navigation and page counters. Multiple outer themes may overwrite the same element, so inspect the final template."
        }
      },
      {
        "title": {
          "zh": "共享主题文件",
          "en": "Shared theme files"
        },
        "body": {
          "zh": "主题样式放入 beamerthemeAtelier.sty，避免各报告复制后逐渐分歧。主题文件应仅改变视觉接口，把研究内容、作者与日期留给主文件。",
          "en": "Keep common styling in beamerthemeAtelier.sty to avoid diverging copies. A theme should configure appearance; the main file supplies research content, author, and date."
        }
      }
    ],
    "example": "ex-beamer-theme",
    "packages": [
      "beamer"
    ],
    "level": "intermediate",
    "related": [
      "beamer-custom-theme",
      "error-option-clash"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-blocks-columns",
    "module": "beamer",
    "title": {
      "zh": "block 与 columns",
      "en": "Blocks and columns"
    },
    "summary": {
      "zh": "通过语义框和分栏组织一页中的论点与证据。",
      "en": "Organize a claim and its evidence with semantic blocks and columns."
    },
    "syntax": "\\begin{block}{Claim}...\\end{block}\\begin{columns}[T,onlytextwidth]\\begin{column}{.48\\textwidth}...\\end{column}\\end{columns}",
    "sections": [
      {
        "title": {
          "zh": "三种语义框",
          "en": "Three semantic blocks"
        },
        "body": {
          "zh": "block 用于一般内容，alertblock 用于需要强调的条件或限制，exampleblock 用于示例。主题决定实际配色。标题应说明框内信息，例如“识别假设”，比“重要”更便于读者检索。",
          "en": "block holds general content, alertblock highlights a condition or limitation, and exampleblock holds an example. The theme determines their colors. A title such as “Identification assumption” conveys more than “Important”."
        }
      },
      {
        "title": {
          "zh": "分栏尺寸",
          "en": "Column dimensions"
        },
        "body": {
          "zh": "columns 的 T 选项按首行顶部对齐。onlytextwidth 将总宽度约束为正文宽度。各 column 宽度之和需给栏间距留余量；示例用 0.54 与 0.42 的正文宽度组合。",
          "en": "The T option aligns columns at the first line. onlytextwidth constrains the total width to the text area. Leave room for separation between columns; the report example uses 0.54 and 0.42 of the text width."
        }
      },
      {
        "title": {
          "zh": "图形与表格尺寸",
          "en": "Graphic and table dimensions"
        },
        "body": {
          "zh": "栏内图片用 \\linewidth 作为宽度基准；它会随 column 改变。Beamer 的 figure 和 table 环境不按论文浮动体队列移动。一个复杂表格通常需要删减字段或改为图形，整表缩到难读的字号会损失信息。",
          "en": "Use \\linewidth for an image inside a column because it adapts to the column width. Beamer figure and table environments do not use the article-style float queue. Reduce a dense table to the needed fields or make a chart; scaling the entire table to tiny text loses information."
        }
      }
    ],
    "example": "ex-beamer-report",
    "packages": [
      "beamer"
    ],
    "level": "intermediate",
    "related": [
      "beamer-frames",
      "error-beamer-overflow"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-overlays",
    "module": "beamer",
    "title": {
      "zh": "overlay、pause、only 与 uncover",
      "en": "Overlays, pause, only, and uncover"
    },
    "summary": {
      "zh": "逐步显示控制每个 PDF 页出现哪些内容，以及隐藏内容是否保留位置。",
      "en": "Overlays control which material appears on each slide and whether hidden material reserves space."
    },
    "syntax": "\\item<2-> ...\\only<2>{...}\\uncover<2->{...}\\onslide<2->{...}\\pause",
    "sections": [
      {
        "title": {
          "zh": "编号与范围",
          "en": "Overlay numbers and ranges"
        },
        "body": {
          "zh": "<2> 仅在第二张 overlay 显示；<2-> 从第二张起显示；<1-3> 在前面三张显示。itemize 的 \\item 可以直接附带 overlay 规格。\\pause 从当前位置开始延迟后续材料，适合简单线性叙述。",
          "en": "<2> selects only overlay two; <2-> selects overlay two onward; <1-3> selects the first three overlays. An item in itemize can carry the specification directly. \\pause delays subsequent material and works well for simple linear explanations."
        }
      },
      {
        "title": {
          "zh": "占位与移除",
          "en": "Reserved space and removed material"
        },
        "body": {
          "zh": "\\only 在未选中的 overlay 上完全移除内容，因此可能使布局跳动。\\uncover 保留空间，默认隐藏未显示内容；\\setbeamercovered{transparent} 可让未显示内容淡化可见。\n\n\\onslide 不带星号时与 uncover 的占位语义相近；其无花括号形式会持续作用于后续内容，直到下一个状态切换。",
          "en": "\\only removes its material on unselected overlays and can shift the layout. \\uncover reserves its space; uncovered material is normally hidden. \\setbeamercovered{transparent} can make it faintly visible.\n\nThe unstarred \\onslide has space-preserving behavior similar to uncover. Its unbraced form changes the state for following material until another state change."
        },
        "code": "\\uncover<2->{A stable line.}\\only<3>{A line only on slide three.}"
      },
      {
        "title": {
          "zh": "相对规格与手稿",
          "en": "Relative specifications and handouts"
        },
        "body": {
          "zh": "<+-> 可以自动递增，减少手工重编号。对于关键论证，可显式写出编号以便检查内容顺序。handout 模式通常合并逐步显示；互斥的 only 内容需要 handout 规格避免重叠。",
          "en": "<+-> increments overlay numbers automatically. Explicit numbers can make a critical argument easier to inspect. handout mode usually collapses overlays; mutually exclusive only content may need handout specifications to prevent overlap."
        }
      },
      {
        "title": {
          "zh": "验证最终输出",
          "en": "Check the produced slides"
        },
        "body": {
          "zh": "逐张检查 overlay，包括每个 frame 的中间状态。表格高度、公式编号和引用计数可能随 overlay 改变。复杂公式中的显示顺序可用显式 overlay 命令控制，pause 更适合线性叙述。",
          "en": "Inspect each overlay, including intermediate states within a frame. Table height, equation numbers, and reference counters may change between overlays. Explicit overlay commands give control over complex equations; pause suits a linear explanation."
        }
      },
      {
        "title": {
          "zh": "计数器与互斥内容",
          "en": "Counters and mutually exclusive content"
        },
        "body": {
          "zh": "同一 frame 在每张 overlay 上重新排版，Beamer 对常见计数器做恢复处理。自定义计数器如需重置，可查阅 resetcounteronoverlays。互斥的 only 块高度不同会改变后续内容位置，overlayarea 可为它们固定空间。",
          "en": "Beamer typesets a frame for each overlay and restores common counters. For a custom counter, consult resetcounteronoverlays. Mutually exclusive only blocks can shift subsequent content when heights differ; overlayarea reserves a fixed region."
        }
      }
    ],
    "example": "ex-beamer-overlays",
    "packages": [
      "beamer"
    ],
    "level": "advanced",
    "related": [
      "beamer-fragile",
      "beamer-notes"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-fragile",
    "module": "beamer",
    "title": {
      "zh": "fragile frame 与原样代码",
      "en": "Fragile frames and verbatim code"
    },
    "summary": {
      "zh": "含 verbatim、listings 或 minted 的 frame 需要允许原样字符读取。",
      "en": "A frame containing verbatim, listings, or minted needs literal character handling."
    },
    "syntax": "\\begin{frame}[fragile]{Code}\\begin{verbatim}...\\end{verbatim}\\end{frame}",
    "sections": [
      {
        "title": {
          "zh": "错误的根源",
          "en": "Why the usual frame reader fails"
        },
        "body": {
          "zh": "普通 frame 先把正文读成宏参数，再进行排版。verbatim 需要改变字符类别，但内容读入后就不能重新解释。fragile 将正文经辅助文件保存和重新读取，使原样环境能工作。",
          "en": "An ordinary frame first reads its body as a macro argument. Verbatim needs to change character categories, which is too late once the text has been tokenized. fragile writes and rereads the body through an auxiliary file."
        }
      },
      {
        "title": {
          "zh": "终止行必须清楚",
          "en": "A clear terminating line"
        },
        "body": {
          "zh": "使用环境形式的 frame，并把 \\end{frame} 放在独立一行。将 \\verb 藏在标题、caption 或其他命令参数中仍会失败；fragile 不能解除这些参数本身的读取限制。",
          "en": "Use the frame environment and put \\end{frame} on a line by itself. \\verb inside a title, caption, or another command argument can still fail; fragile does not remove those argument-reading restrictions."
        },
        "code": "\\begin{frame}[fragile]{Code}\n\\begin{verbatim}\n\\% literal percent\n\\end{verbatim}\n\\end{frame}"
      },
      {
        "title": {
          "zh": "代码高亮和额外依赖",
          "en": "Highlighting and extra dependencies"
        },
        "body": {
          "zh": "listings 的高亮在 TeX 内执行；minted 调用外部高亮工具。两者都需要 fragile frame，但 minted 还需要正确配置 latexminted 和执行权限。移动代码到独立文件可以减少主稿的字符转义问题。",
          "en": "listings highlights within TeX; minted invokes an external highlighter. Both require fragile frames, while minted also needs a working latexminted setup and execution permissions. Keeping code in a separate file reduces escaping problems in the talk source."
        }
      }
    ],
    "example": "ex-beamer-fragile",
    "packages": [
      "beamer"
    ],
    "level": "intermediate",
    "related": [
      "code-listings",
      "code-minted"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-notes",
    "module": "beamer",
    "title": {
      "zh": "讲者备注、讲义与页码",
      "en": "Speaker notes, handouts, and frame numbers"
    },
    "summary": {
      "zh": "同一源码可以生成演示稿、带备注的 PDF 或打印讲义。",
      "en": "One source can produce slides, a notes PDF, or a printable handout."
    },
    "syntax": "\\note{...}\\setbeameroption{show notes on second screen=right}\\insertframenumber",
    "sections": [
      {
        "title": {
          "zh": "讲者备注输出",
          "en": "Outputting speaker notes"
        },
        "body": {
          "zh": "\\note 将讲述提示与 frame 绑定。hide notes 隐藏备注，show notes 显示备注页；载入 pgfpages 后可用 show notes on second screen=right 生成两屏布局。放映时还需在演讲软件中选择对应的双屏模式。",
          "en": "\\note associates speaking notes with a frame. hide notes suppresses notes, and show notes prints note pages. With pgfpages, show notes on second screen=right creates a two-screen layout. Select the corresponding display mode in the presentation software as well."
        }
      },
      {
        "title": {
          "zh": "打印讲义",
          "en": "Printable handouts"
        },
        "body": {
          "zh": "在文档类中加入 handout 可压缩逐步显示。pgfpages 的 2 on 1 等布局会把多个逻辑页面放在一张纸上。带 notes 的输出可能包含不宜公开的讲述提示，应根据交付对象生成版本。",
          "en": "The handout class option collapses overlays. A pgfpages layout such as 2 on 1 places several logical pages on one sheet. Notes may contain material intended only for the presenter, so produce the appropriate delivery version."
        }
      },
      {
        "title": {
          "zh": "frame 计数与导航",
          "en": "Frame counters and navigation"
        },
        "body": {
          "zh": "\\insertframenumber 和 \\inserttotalframenumber 可组成页脚计数；总数需要再次编译。标题或备份页可使用 noframenumbering。\\setbeamertemplate{navigation symbols}{} 隐藏导航图标。",
          "en": "\\insertframenumber and \\inserttotalframenumber form a footer counter; the total needs another compilation. Use noframenumbering for a title or backup frame when appropriate. \\setbeamertemplate{navigation symbols}{} hides the navigation icons."
        }
      }
    ],
    "example": "ex-beamer-notes",
    "packages": [
      "beamer",
      "pgfpages"
    ],
    "level": "intermediate",
    "related": [
      "beamer-overlays",
      "beamer-custom-theme"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-custom-theme",
    "module": "beamer",
    "title": {
      "zh": "自定义主题与学术报告结构",
      "en": "Custom themes and research talk structure"
    },
    "summary": {
      "zh": "使用公开接口集中定义视觉规则，并让报告按问题、方法、证据和解释展开。",
      "en": "Define visual rules through public interfaces and organize the talk around the question, method, evidence, and interpretation."
    },
    "syntax": "\\setbeamertemplate{footline}{...}\\setbeamercolor{frametitle}{fg=white,bg=teal}",
    "sections": [
      {
        "title": {
          "zh": "公开模板接口",
          "en": "Public template interfaces"
        },
        "body": {
          "zh": "setbeamertemplate 控制 footline、frametitle 和导航等元素。局部主题可写在导言区；可复用主题写为 beamerthemeAtelier.sty，通过 \\usetheme{Atelier} 加载。只设置实际需要改变的元素，继承其余默认行为。",
          "en": "setbeamertemplate controls elements such as the footline, frametitle, and navigation. Keep a local theme in the preamble; package a reusable theme as beamerthemeAtelier.sty and load it with \\usetheme{Atelier}. Inherit default behavior for elements you do not need to change."
        }
      },
      {
        "title": {
          "zh": "学术报告的叙述顺序",
          "en": "The order of a research argument"
        },
        "body": {
          "zh": "标题页说明问题和报告者，问题页界定研究对象，方法页给出识别方程或实验设计，结果页报告证据，讨论页解释适用范围。开题答辩还应明确研究计划、现有进度与可行性。",
          "en": "A title frame identifies the question and presenter. Define the population, explain the identification equation or experimental design, present the evidence, then interpret its scope. A proposal defense should also state the plan, completed work, and feasibility."
        }
      },
      {
        "title": {
          "zh": "完整示例的复用方式",
          "en": "Reusing the complete example"
        },
        "body": {
          "zh": "完整报告含公式、矢量插图和 booktabs 表格，参考文献用 thebibliography 排版，无需外部文献处理器。大型报告可改用 biblatex 与 Biber，并以 allowframebreaks 分页输出文献。表中估计值用于演示排版。",
          "en": "The talk includes equations, a vector illustration, and a booktabs table. References use thebibliography without an external bibliography processor. Larger talks can use biblatex with Biber and allowframebreaks for reference frames. The estimates demonstrate table formatting."
        }
      },
      {
        "title": {
          "zh": "备份材料与演练",
          "en": "Backup material and rehearsal"
        },
        "body": {
          "zh": "把推导、稳健性表和变量清单放在 appendix 后。正式演讲前按实际屏幕尺寸检查中文、长公式和页脚。PDF 页数会因 overlay 增加，演练应按 frame 的讲述时间安排。",
          "en": "Place derivations, robustness tables, and variable lists after appendix. Check Chinese text, long equations, and the footer at the actual display size. Overlays increase the PDF page count; plan speaking time around logical frames."
        }
      },
      {
        "title": {
          "zh": "演示稿中的引用",
          "en": "Citations in a talk"
        },
        "body": {
          "zh": "论点旁给出短引用，完整信息放在文献页。biblatex 的后端和 citation style 应与论文共享时保持一致。对字体较小的参考文献检查阅读距离，必要时拆分多页。",
          "en": "Place a short citation beside the claim and full information in reference frames. Keep the biblatex backend and citation style consistent when sharing sources with a paper. Check bibliography type at presentation distance and split long lists."
        }
      }
    ],
    "example": "ex-beamer-report",
    "packages": [
      "beamer",
      "booktabs",
      "tikz"
    ],
    "level": "advanced",
    "related": [
      "beamer-themes",
      "beamer-notes"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "beamer-chinese",
    "module": "beamer",
    "title": {
      "zh": "中文 Beamer 与字体设置",
      "en": "Chinese Beamer and font configuration"
    },
    "summary": {
      "zh": "在 Beamer 中加载 ctex 或使用 ctexbeamer，明确选择 Unicode 引擎与字体。",
      "en": "Load ctex with Beamer or use ctexbeamer, and choose a Unicode engine and fonts explicitly."
    },
    "syntax": "\\documentclass[aspectratio=169]{beamer}\\usepackage[fontset=fandol]{ctex}",
    "sections": [
      {
        "title": {
          "zh": "两种组织方法",
          "en": "Two document setups"
        },
        "body": {
          "zh": "beamer 加载 ctex 宏包保留标准演示类；ctexbeamer 文档类把中文设置与 Beamer 整合。使用其中一种即可。XeLaTeX 或 LuaLaTeX 更适合现代 Unicode 中文稿；本示例选择 XeLaTeX。",
          "en": "Loading ctex in beamer preserves the standard presentation class. The ctexbeamer class integrates Chinese configuration with Beamer. Choose one setup. XeLaTeX or LuaLaTeX suits modern Unicode Chinese; the example uses XeLaTeX."
        }
      },
      {
        "title": {
          "zh": "可移植的字体",
          "en": "Portable font choices"
        },
        "body": {
          "zh": "fontset=fandol 使用 TeX 发行版中的 Fandol 字体，避免依赖 Windows 或 macOS 独有字体。它要求安装 Fandol。若改用系统字体，应同时测试正文、加粗和无衬线标题的字形。",
          "en": "fontset=fandol uses Fandol from the TeX distribution instead of platform-specific fonts. Fandol must be installed. When choosing system fonts, test the body, bold text, and sans-serif titles."
        }
      },
      {
        "title": {
          "zh": "中文报告常见问题",
          "en": "Common Chinese talk problems"
        },
        "body": {
          "zh": "用 UTF-8 保存源文件。主题可能指定无衬线字体，应检查中文标题是否正常显示。使用 article 的 titlesec 或 fancyhdr 配置不能替代 Beamer 的主题接口；二者的页面机制不同。",
          "en": "Save the source as UTF-8. Themes often use sans-serif fonts, so inspect Chinese titles. article-style titlesec or fancyhdr settings do not replace Beamer theme interfaces because the page models differ."
        }
      },
      {
        "title": {
          "zh": "字体主题与数学",
          "en": "Font themes and mathematics"
        },
        "body": {
          "zh": "Beamer 默认无衬线外观与正文数学字体选择不是同一件事。中文字体中的数学字母未必适用于公式；保持数学宏包独立配置并检查希腊字母、粗体向量和中文公式注释。",
          "en": "Beamer’s sans-serif appearance and mathematical font choice are separate. Mathematical letters in a CJK font are not necessarily suitable for equations. Configure math separately and inspect Greek letters, bold vectors, and Chinese equation annotations."
        }
      },
      {
        "title": {
          "zh": "书签和 PDF 文本",
          "en": "Bookmarks and PDF text"
        },
        "body": {
          "zh": "标题中的公式可用 texorpdfstring 提供书签替代文本。中文链接与书签应在实际 PDF 阅读器中检查；如果只改字体没有正确编码，导出后复制文字仍可能不正常。",
          "en": "Use texorpdfstring for bookmark alternatives to mathematical titles. Test Chinese links and bookmarks in a PDF viewer. Font changes alone do not guarantee correct copied text when encoding is wrong."
        }
      }
    ],
    "example": "ex-beamer-chinese",
    "packages": [
      "beamer",
      "ctex"
    ],
    "level": "intermediate",
    "related": [
      "beamer-themes",
      "error-font",
      "error-engine"
    ],
    "sources": [
      {
        "label": "ctex documentation (CTAN)",
        "url": "https://ctan.org/pkg/ctex"
      }
    ],
    "engines": [
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "tikz-paths",
    "module": "tikz",
    "title": {
      "zh": "坐标、路径与箭头",
      "en": "Coordinates, paths, and arrows"
    },
    "summary": {
      "zh": "TikZ 用路径语法描述矢量图，坐标和样式分开配置。",
      "en": "TikZ describes vector graphics with paths, coordinates, and separate styles."
    },
    "syntax": "\\draw[->,thick] (0,0)--(2,1);\\fill (2,1) circle[radius=2pt];",
    "sections": [
      {
        "title": {
          "zh": "路径与分号",
          "en": "Paths and semicolons"
        },
        "body": {
          "zh": "\\draw 描边，\\fill 填充，\\filldraw 同时处理二者。每条 TikZ 路径都以分号结束。-- 连接直线段；.. controls .. 创建贝塞尔曲线；cycle 闭合路径。",
          "en": "\\draw strokes a path, \\fill fills it, and \\filldraw does both. End every TikZ path with a semicolon. -- joins straight segments; .. controls .. makes a Bézier curve; cycle closes a path."
        }
      },
      {
        "title": {
          "zh": "坐标与变换",
          "en": "Coordinates and transformations"
        },
        "body": {
          "zh": "默认 (2,1) 以 x、y 单位向量定位，通常相当于厘米。也可写 (20mm,10mm) 或极坐标 (30:2cm)。scope 的 shift、rotate 和 scale 局部变换图形；scale 通常不缩放节点文字。",
          "en": "By default, (2,1) uses the x and y basis vectors, usually in centimeters. Explicit dimensions such as (20mm,10mm) and polar coordinates such as (30:2cm) are also available. shift, rotate, and scale apply local transformations in a scope; scale normally leaves node text unchanged."
        }
      },
      {
        "title": {
          "zh": "现代箭头与输出",
          "en": "Modern arrows and output"
        },
        "body": {
          "zh": "arrows.meta 库提供 Stealth 等箭头。简单 TikZ 可由三个主流 PDF 引擎编译，不需要外部图片。缺少分号时，错误可能出现在后续节点位置，排查应从第一条出错路径开始。",
          "en": "The arrows.meta library provides tips such as Stealth. Basic TikZ works with the three main PDF engines and needs no external image. A missing semicolon may produce an error at a later node; start with the first failing path."
        }
      }
    ],
    "example": "ex-tikz-paths",
    "packages": [
      "tikz"
    ],
    "level": "intermediate",
    "related": [
      "tikz-nodes",
      "tikz-layers"
    ],
    "sources": [
      {
        "label": "PGF/TikZ manual",
        "url": "https://ctan.org/pkg/pgf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "tikz-nodes",
    "module": "tikz",
    "title": {
      "zh": "命名节点、锚点与相对定位",
      "en": "Named nodes, anchors, and relative placement"
    },
    "summary": {
      "zh": "节点把文字与几何位置组合，命名后可供其他路径引用。",
      "en": "Nodes combine text with geometry and can be named for later paths."
    },
    "syntax": "\\node[draw] (a) {Input};\\node[below=of a] (b) {Output};\\draw[->] (a)--(b);",
    "sections": [
      {
        "title": {
          "zh": "节点名与锚点",
          "en": "Names and anchors"
        },
        "body": {
          "zh": "\\node 的圆括号命名节点，花括号保存内容。路径中的 (a) 自动选择边界交点，(a.north) 指定上方锚点。anchor=west 把节点西侧放到给定坐标，适合沿线排文字。",
          "en": "The parenthesized argument names a node; the braced argument holds its text. A path to (a) finds the border intersection automatically; (a.north) selects the top anchor. anchor=west places the west side at the given coordinate."
        }
      },
      {
        "title": {
          "zh": "positioning 库",
          "en": "The positioning library"
        },
        "body": {
          "zh": "below=of a 和 right=12mm of a 依赖 positioning 库。node distance 设置默认间距。长文字可用 text width 限定宽度，并用 align 指定对齐，避免整张图变宽。",
          "en": "below=of a and right=12mm of a require the positioning library. node distance sets the default separation. Use text width and align for long labels to keep the diagram within the page."
        }
      },
      {
        "title": {
          "zh": "尺寸与复用样式",
          "en": "Dimensions and reusable styles"
        },
        "body": {
          "zh": "minimum width、minimum height 指定最小尺寸，inner sep 增加文本周围空隙。box/.style 统一流程图样式，修改它即可调整所有相关节点。每个节点使用唯一名称。",
          "en": "minimum width and minimum height set minimum dimensions; inner sep adds padding. A box/.style gives flowchart nodes a shared style that can be changed in one place. Give each node a unique name."
        }
      }
    ],
    "example": "ex-tikz-flow",
    "packages": [
      "tikz"
    ],
    "level": "intermediate",
    "related": [
      "tikz-flowcharts",
      "tikz-paths"
    ],
    "sources": [
      {
        "label": "PGF/TikZ manual",
        "url": "https://ctan.org/pkg/pgf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "tikz-flowcharts",
    "module": "tikz",
    "title": {
      "zh": "流程图与决策树",
      "en": "Flowcharts and decision trees"
    },
    "summary": {
      "zh": "选择流程节点或树状 child 结构来表达顺序与分支。",
      "en": "Use flowchart nodes or tree child structures for sequences and branches."
    },
    "syntax": "\\node{Root} child{node{Left}} child{node{Right}};",
    "sections": [
      {
        "title": {
          "zh": "流程图语义",
          "en": "Flowchart meaning"
        },
        "body": {
          "zh": "流程图的箭头表达依赖或执行顺序。使用命名节点和相对定位，能在修改文字后维持边的连接。shapes.geometric 库提供 diamond 等形状；菱形适合明确的分支判断。",
          "en": "Flowchart arrows represent dependencies or execution order. Named nodes and relative placement preserve connections when labels change. shapes.geometric provides shapes such as diamond for explicit branching decisions."
        }
      },
      {
        "title": {
          "zh": "树状图尺寸",
          "en": "Tree dimensions"
        },
        "body": {
          "zh": "child 语法描述层级；level distance 控制层间距，sibling distance 控制同层节点间距。各层可分别设 level 1/.style。宽树可能超过正文，需要缩减标签或调节间距。",
          "en": "child describes a hierarchy. level distance controls vertical separation, and sibling distance controls separation within a level. Set styles such as level 1/.style independently. Shorten labels or adjust spacing if the tree exceeds the text width."
        }
      },
      {
        "title": {
          "zh": "图形文字与注释",
          "en": "Diagram text and captions"
        },
        "body": {
          "zh": "节点中可以直接写公式。复杂图应放入 figure 并加 caption 和 label，正文解释图中的方向和分支。向读者说明示意图与观测数据图的区别。",
          "en": "Node text can include math. Put a substantial diagram in a figure with a caption and label, and explain its directions and branches in the prose. Identify a schematic as distinct from a chart of observed data."
        }
      }
    ],
    "example": "ex-tikz-tree",
    "packages": [
      "tikz"
    ],
    "level": "intermediate",
    "related": [
      "tikz-nodes",
      "tikz-networks"
    ],
    "sources": [
      {
        "label": "PGF/TikZ manual",
        "url": "https://ctan.org/pkg/pgf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "tikz-networks",
    "module": "tikz",
    "title": {
      "zh": "网络图与 Lua 图布局",
      "en": "Network diagrams and Lua graph layouts"
    },
    "summary": {
      "zh": "小网络可手工定位，大型自动布局需要关注库和引擎要求。",
      "en": "Place small networks manually; automatic layouts require checking libraries and engines."
    },
    "syntax": "\\node (a) at (0,0){A};\\node (b) at (2,1){B};\\draw (a)--(b);",
    "sections": [
      {
        "title": {
          "zh": "手工网络",
          "en": "Manual network diagrams"
        },
        "body": {
          "zh": "固定坐标适合小型网络，能精确控制节点位置。统一圆形节点样式，用箭头表示有向关系。节点标签与边标签之间留出空间。",
          "en": "Fixed coordinates give precise control over small networks. Use a shared circular style and arrows for directed relations. Leave space between node and edge labels."
        }
      },
      {
        "title": {
          "zh": "自动图布局的条件",
          "en": "Requirements for automatic layouts"
        },
        "body": {
          "zh": "TikZ graphdrawing 的自动布局通常由 Lua 执行，需要 LuaLaTeX。graphs 库与 Lua graphdrawing 提供不同功能；普通 TikZ 手工绘图可使用其他 PDF 引擎。",
          "en": "TikZ graphdrawing normally runs layout algorithms in Lua and requires LuaLaTeX. graphs and Lua graphdrawing provide different features; ordinary manual TikZ drawings work with other PDF engines."
        }
      },
      {
        "title": {
          "zh": "可复现图形",
          "en": "Reproducible diagrams"
        },
        "body": {
          "zh": "固定随机种子可使随机布局稳定，但算法或版本改变仍可能产生不同坐标。出版用图建议保存最终矢量输出及其源码。示例采用手工坐标，可以直接使用 pdfLaTeX。",
          "en": "Fixing a random seed stabilizes random layouts, though algorithm or version changes may still move nodes. Save both the final vector output and its source for publication. The example uses manual coordinates and compiles with pdfLaTeX."
        }
      }
    ],
    "example": "ex-tikz-network",
    "packages": [
      "tikz"
    ],
    "level": "advanced",
    "related": [
      "tikz-paths",
      "project-reproducibility"
    ],
    "sources": [
      {
        "label": "PGF/TikZ manual",
        "url": "https://ctan.org/pkg/pgf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "tikz-layers",
    "module": "tikz",
    "title": {
      "zh": "图层、颜色与循环",
      "en": "Layers, colors, and loops"
    },
    "summary": {
      "zh": "图层控制前后遮挡，循环减少重复图形代码。",
      "en": "Layers control drawing order and loops reduce repeated drawing code."
    },
    "syntax": "\\foreach \\x in {0,1,2}{...}\\begin{scope}[on background layer]...\\end{scope}",
    "sections": [
      {
        "title": {
          "zh": "绘制顺序与背景层",
          "en": "Drawing order and background layers"
        },
        "body": {
          "zh": "普通路径按源码顺序绘制，后画内容会遮住先画内容。backgrounds 库的 on background layer 把背景绘制放到主层后面，适合给节点组添加浅色背景。",
          "en": "Ordinary paths are drawn in source order, with later material covering earlier material. The backgrounds library moves on background layer material behind the main layer, which is useful for a shaded node group."
        }
      },
      {
        "title": {
          "zh": "循环变量的作用域",
          "en": "Loop variable scope"
        },
        "body": {
          "zh": "\\foreach \\x in {0,1,2} 在每次迭代设置变量。列表中可使用起点、第二点和省略号，例如 {0,2,...,10}。循环变量通常在迭代的局部分组中，需持久修改时要明确处理作用域。",
          "en": "\\foreach \\x in {0,1,2} sets the variable for each iteration. A list can use an initial value, next value, and ellipsis, such as {0,2,...,10}. Iteration variables normally live in a local group, so persistent changes need explicit scope handling."
        }
      },
      {
        "title": {
          "zh": "颜色与性能",
          "en": "Color and performance"
        },
        "body": {
          "zh": "teal!15 是 xcolor 的混色表达式。透明背景和颜色只应辅助区分，线型与标签也要能独立传递信息。大量节点会增加编译成本；先缩小图形确认结构，再考虑 externalization 的额外执行配置。",
          "en": "teal!15 is an xcolor color mix. Colors should supplement line styles and labels so the diagram remains readable without color. Many nodes increase compilation cost. Verify a small version before introducing the externalization workflow and its execution configuration."
        }
      }
    ],
    "example": "ex-tikz-layers",
    "packages": [
      "tikz",
      "xcolor"
    ],
    "level": "intermediate",
    "related": [
      "tikz-nodes",
      "fonts-color"
    ],
    "sources": [
      {
        "label": "PGF/TikZ manual",
        "url": "https://ctan.org/pkg/pgf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "pgfplots-axis",
    "module": "pgfplots",
    "title": {
      "zh": "axis、addplot 与兼容版本",
      "en": "axis, addplot, and compatibility versions"
    },
    "summary": {
      "zh": "PGFPlots 为 TikZ 添加坐标变换、刻度、图例与数据绘图。",
      "en": "PGFPlots adds coordinate transforms, ticks, legends, and data plotting to TikZ."
    },
    "syntax": "\\pgfplotsset{compat=1.18}\\begin{axis}[xlabel={$x$}]\\addplot[domain=-2:2]{x^2};\\end{axis}",
    "sections": [
      {
        "title": {
          "zh": "坐标轴环境",
          "en": "The axis environment"
        },
        "body": {
          "zh": "axis 放在 tikzpicture 内。width 和 height 调整尺寸，xlabel、ylabel 指定轴标题，xmin/xmax 等限制范围。默认尺寸可能包含轴外标签；scale only axis 可仅对绘图区应用尺寸。",
          "en": "Place axis inside tikzpicture. width and height set dimensions; xlabel and ylabel set titles; xmin/xmax and similar keys limit the range. Dimensions normally account for surrounding labels; scale only axis applies them to the plotting area."
        }
      },
      {
        "title": {
          "zh": "曲线与数据",
          "en": "Curves and data"
        },
        "body": {
          "zh": "\\addplot 可以接表达式、coordinates 或 table。表达式中使用 x，而不是 TikZ 普通循环变量 \\x。每条 addplot 路径以分号结束；addplot+ 会把选项附加到默认循环样式。",
          "en": "\\addplot accepts an expression, coordinates, or a table. Use x inside an expression, not the ordinary TikZ loop variable \\x. End each plot with a semicolon. addplot+ appends options to the default cycle style."
        }
      },
      {
        "title": {
          "zh": "兼容性设置",
          "en": "Compatibility settings"
        },
        "body": {
          "zh": "compat 固定兼容行为，防止发行版的默认设置改变图形。示例采用 compat=1.18 作为排版基线；compat 指定行为版本，宏包本身可为更高版本。升级时比较轴范围、刻度和标签位置。",
          "en": "compat fixes a behavior level so distribution defaults do not change the plot. The examples use compat=1.18 as their baseline; the installed package may be newer than that behavior level. Compare ranges, ticks, and label positions when upgrading."
        }
      },
      {
        "title": {
          "zh": "轴坐标注释",
          "en": "Annotations in axis coordinates"
        },
        "body": {
          "zh": "axis cs: 把 TikZ 点解释为数据坐标，rel axis cs: 使用绘图区相对坐标。边界外注释需检查 clip 和轴范围，并确认所需观测仍完整显示。",
          "en": "axis cs: interprets a TikZ point in data coordinates, while rel axis cs: uses coordinates relative to the plotting area. For annotations beyond the border, check clipping and ranges while keeping the relevant observations visible."
        }
      },
      {
        "title": {
          "zh": "对数轴与量纲",
          "en": "Logarithmic axes and units"
        },
        "body": {
          "zh": "semilogxaxis、semilogyaxis 和 loglogaxis 分别变换一个或两个轴。对数轴不能直接包含零或负值，需依据研究定义处理数据。图注需说清是在对数刻度显示，还是数据本身已取对数。",
          "en": "semilogxaxis, semilogyaxis, and loglogaxis transform one or both axes. Logarithmic axes cannot directly contain zero or negative values. Explain whether the axis is logarithmic or the data have already been logged."
        }
      }
    ],
    "example": "ex-pgfplots-functions",
    "packages": [
      "pgfplots"
    ],
    "level": "intermediate",
    "related": [
      "pgfplots-data",
      "pgfplots-multipanel"
    ],
    "sources": [
      {
        "label": "PGFPlots manual",
        "url": "https://mirrors.ctan.org/graphics/pgf/contrib/pgfplots/doc/pgfplots.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "pgfplots-data",
    "module": "pgfplots",
    "title": {
      "zh": "数据、散点与误差棒",
      "en": "Data, scatter plots, and error bars"
    },
    "summary": {
      "zh": "区分数据坐标、点样式和不确定性信息。",
      "en": "Separate data coordinates, marker styles, and uncertainty information."
    },
    "syntax": "\\addplot+[only marks,error bars/.cd,y dir=both,y explicit] coordinates {(1,2) +- (0,.3)};",
    "sections": [
      {
        "title": {
          "zh": "嵌入或读取数据",
          "en": "Embedded or external data"
        },
        "body": {
          "zh": "小型教学数据可写入 coordinates；实证图应使用 addplot table 从 CSV 或空白分隔数据读入，并明确列名。缺失值、分隔符和小数格式需要先核对，避免图形悄悄跳过数据。",
          "en": "Small teaching datasets can use coordinates. Empirical plots should read named columns through addplot table from CSV or whitespace-separated files. Check missing values, delimiters, and decimal formats to prevent silently skipped observations."
        }
      },
      {
        "title": {
          "zh": "散点与误差棒",
          "en": "Markers and error bars"
        },
        "body": {
          "zh": "only marks 关闭连线。error bars/.cd 进入误差棒键族；y dir=both 与 y explicit 指定显式双向纵向误差。对称误差在坐标后写 +- (0,.3)。误差棒代表什么由研究设计决定，例如是否为 95% 置信区间，应在图注中说明。",
          "en": "only marks removes connecting lines. error bars/.cd selects the error-bar key family; y dir=both and y explicit request explicit vertical errors in both directions. Write a symmetric error after a coordinate as +- (0,.3). The study defines its meaning, including whether it is a 95% confidence interval; state that definition in the caption."
        }
      },
      {
        "title": {
          "zh": "结果解释与可读性",
          "en": "Interpretation and readability"
        },
        "body": {
          "zh": "轴标签标明单位，图注定义样本和误差棒。大量散点可调整 mark size 与透明度；选定轴范围后检查它是否准确呈现数据差异。保留生成数据表的脚本，便于复现图形。",
          "en": "Label axes with units and define the sample and error bars in the caption. Adjust mark size or opacity for dense scatterplots, and check that the axis range presents the differences accurately. Keep the script that generates the plot data."
        }
      },
      {
        "title": {
          "zh": "外部表的列选择",
          "en": "Selecting columns in external tables"
        },
        "body": {
          "zh": "addplot table[x=time,y=value,col sep=comma]{series.csv} 按列名读取 CSV。把数据文件作为项目资源交付，检查引号、注释符和空单元格是否符合 PGFPlots 的读取规则。",
          "en": "addplot table[x=time,y=value,col sep=comma]{series.csv} reads named CSV columns. Deliver the data file and check quoted fields, comments, and empty cells against the reader’s rules."
        },
        "code": "\\addplot table[x=time,y=value,col sep=comma]{series.csv};"
      },
      {
        "title": {
          "zh": "样式与数据分开",
          "en": "Separate data from style"
        },
        "body": {
          "zh": "配色、marker 和图例配置保存在 pgfplotsset 中，数据生成脚本负责输出数据。更换估计方法时同步更新纵轴点、误差棒及图注中的不确定性定义。",
          "en": "Keep colors, markers, and legend settings in pgfplotsset and let scripts output the data. When changing the estimator, update the points, error bars, and caption’s uncertainty definition together."
        }
      }
    ],
    "example": "ex-pgfplots-scatter",
    "packages": [
      "pgfplots"
    ],
    "level": "intermediate",
    "related": [
      "pgfplots-axis",
      "project-reproducibility"
    ],
    "sources": [
      {
        "label": "PGFPlots manual",
        "url": "https://mirrors.ctan.org/graphics/pgf/contrib/pgfplots/doc/pgfplots.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "pgfplots-economics",
    "module": "pgfplots",
    "title": {
      "zh": "供需曲线与函数图",
      "en": "Supply and demand with function plots"
    },
    "summary": {
      "zh": "理论经济学图需要清楚区分轴、方程与示意关系。",
      "en": "A theoretical economics figure needs clear axes, equations, and schematic relationships."
    },
    "syntax": "\\addplot[domain=0:8]{8-x};\\addplot[domain=0:8]{x};",
    "sections": [
      {
        "title": {
          "zh": "理论图的坐标约定",
          "en": "Coordinates in theoretical diagrams"
        },
        "body": {
          "zh": "供需图通常以数量 Q 为横轴、价格 P 为纵轴。示例用需求 P=8-Q 与供给 P=Q，均衡为 (4,4)，演示理论关系的绘图方法。",
          "en": "Supply-and-demand diagrams usually put quantity Q on the horizontal axis and price P on the vertical axis. The example plots the theoretical relations P=8-Q and P=Q, with equilibrium at (4,4)."
        }
      },
      {
        "title": {
          "zh": "函数域与交点标记",
          "en": "Domains and equilibrium markers"
        },
        "body": {
          "zh": "domain 决定采样范围；samples 控制曲线采样密度。线性函数不需要密集采样，非线性函数应检查极点和端点。axis cs:4,4 将 TikZ 注释放在数据坐标的均衡位置。",
          "en": "domain sets the sampled range, and samples sets sampling density. Linear functions need few samples; inspect singularities and endpoints for nonlinear functions. axis cs:4,4 places a TikZ annotation at the data-coordinate equilibrium."
        }
      },
      {
        "title": {
          "zh": "位移与比较静态",
          "en": "Shifts and comparative statics"
        },
        "body": {
          "zh": "需求移动可增加一条虚线曲线，并标记两个均衡。先从方程求交点，再画辅助线。图例说明 D、D′ 和 S 的经济含义。",
          "en": "Add a dashed curve for a demand shift and mark both equilibria. Solve for the intersections before drawing guide lines. Define D, D′, and S in the legend or caption."
        }
      }
    ],
    "example": "ex-pgfplots-supply",
    "packages": [
      "pgfplots"
    ],
    "level": "intermediate",
    "related": [
      "pgfplots-axis",
      "pgfplots-data"
    ],
    "sources": [
      {
        "label": "PGFPlots manual",
        "url": "https://mirrors.ctan.org/graphics/pgf/contrib/pgfplots/doc/pgfplots.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "pgfplots-multipanel",
    "module": "pgfplots",
    "title": {
      "zh": "分类柱状图、图例与多子图",
      "en": "Categorical bars, legends, and group plots"
    },
    "summary": {
      "zh": "让比较图共享明确的尺寸、轴尺度与类别。",
      "en": "Give comparison plots clear dimensions, scales, and categories."
    },
    "syntax": "\\usepgfplotslibrary{groupplots}\\begin{groupplot}[group style={group size=2 by 1}]\\nextgroupplot...",
    "sections": [
      {
        "title": {
          "zh": "类别轴与柱状图",
          "en": "Categorical axes and bars"
        },
        "body": {
          "zh": "ybar 指定纵向柱状图；symbolic x coords 定义类别，xtick=data 在每个数据类别上显示刻度。nodes near coords 显示数值。数值比较用共同基线，正文说明绝对数还是比例。",
          "en": "ybar creates vertical bars. symbolic x coords defines categories, while xtick=data places ticks at data categories. nodes near coords displays values. Use a common baseline and identify whether values are counts or proportions."
        }
      },
      {
        "title": {
          "zh": "groupplots 库",
          "en": "The groupplots library"
        },
        "body": {
          "zh": "载入 groupplots 后，groupplot 的 group size 决定行列数。nextgroupplot 开始下一个轴。horizontal sep 和 vertical sep 调整间隔，轴标签和图例必须计入总宽度。",
          "en": "After loading groupplots, group size sets the number of rows and columns. nextgroupplot begins the next axis. horizontal sep and vertical sep control separation; include labels and legends when assessing the total width."
        }
      },
      {
        "title": {
          "zh": "可比性和图例",
          "en": "Comparability and legends"
        },
        "body": {
          "zh": "比较同一量的子图，建议显式共享 xmin/xmax 与 ymin/ymax。图例顺序与 addplot 顺序一致，用 addlegendentry 逐条声明。用子图编号配合总图注，可减少重复的长标题。",
          "en": "Set shared xmin/xmax and ymin/ymax for panels comparing the same quantity. Legend order follows addplot order, with entries declared by addlegendentry. Panel labels and an overall caption reduce repeated long titles."
        }
      }
    ],
    "example": "ex-pgfplots-group",
    "packages": [
      "pgfplots"
    ],
    "level": "intermediate",
    "related": [
      "pgfplots-axis",
      "pgfplots-data"
    ],
    "sources": [
      {
        "label": "PGFPlots manual",
        "url": "https://mirrors.ctan.org/graphics/pgf/contrib/pgfplots/doc/pgfplots.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-geometry",
    "module": "layout",
    "title": {
      "zh": "geometry 与页边距",
      "en": "geometry and page margins"
    },
    "summary": {
      "zh": "geometry 根据纸张和正文区域计算页面尺寸。",
      "en": "geometry calculates page dimensions from the paper and text areas."
    },
    "syntax": "\\usepackage[a4paper,margin=25mm,includeheadfoot]{geometry}",
    "sections": [
      {
        "title": {
          "zh": "纸张与正文区域",
          "en": "Paper and text areas"
        },
        "body": {
          "zh": "paperwidth/paperheight 控制实际纸张，textwidth/textheight 控制正文。margin 为四边设置共同值；inner 与 outer 适合双面装订，bindingoffset 增加装订侧空间。",
          "en": "paperwidth/paperheight define the physical paper; textwidth/textheight define the body. margin sets all margins together. inner and outer suit two-sided binding, and bindingoffset adds binding space."
        }
      },
      {
        "title": {
          "zh": "页眉页脚计入方式",
          "en": "Accounting for headers and footers"
        },
        "body": {
          "zh": "includeheadfoot 将页眉和页脚计入正文区域的尺寸计算；不启用时，边距与这两个区域的位置关系不同。showframe 可临时显示边界。由 geometry 管理边距时，通过它的配置调整奇偶页边距。",
          "en": "includeheadfoot includes headers and footers in the body-dimension calculation. Without it, margins relate differently to these regions. Use showframe to inspect boundaries. When geometry manages margins, adjust odd/even side margins through its configuration."
        }
      },
      {
        "title": {
          "zh": "局部版面调整",
          "en": "Local geometry changes"
        },
        "body": {
          "zh": "newgeometry 从新页开始改变正文尺寸；restoregeometry 恢复导言区配置。横向页面可结合 pdflscape；旋转 PDF 显示与实际改变纸张方向是两个层次。投稿模板可能管理尺寸，应优先使用模板接口。",
          "en": "newgeometry changes the body dimensions at a page break; restoregeometry restores the preamble settings. pdflscape can provide landscape pages. PDF display rotation and paper orientation operate at different levels. Use a publisher template’s own interfaces when it controls dimensions."
        }
      },
      {
        "title": {
          "zh": "尺寸冲突的诊断",
          "en": "Diagnosing dimension conflicts"
        },
        "body": {
          "zh": "同时指定 textwidth、left 和 right 可能形成过度约束。查看 geometry 日志中采用的尺寸，保留一组明确约束。showframe 显示的线条是诊断工具，交付前移除。",
          "en": "Specifying textwidth, left, and right together can overconstrain the layout. Read the dimensions chosen in the geometry log and retain one clear set of constraints. Remove diagnostic showframe rules before delivery."
        }
      },
      {
        "title": {
          "zh": "特殊纸张",
          "en": "Custom paper sizes"
        },
        "body": {
          "zh": "paperwidth 与 paperheight 可配置非标准纸张。确保驱动输出的 PDF MediaBox 与预期一致，打印时关闭不必要的自动缩放。海报示例使用标准 A3，独立 TikZ 图更适合 standalone 的紧边界。",
          "en": "paperwidth and paperheight configure custom paper. Verify the PDF MediaBox and disable unnecessary print scaling. The poster example uses A3; a standalone TikZ figure is better handled by a tight standalone boundary."
        }
      }
    ],
    "example": "ex-layout-geometry",
    "packages": [
      "geometry"
    ],
    "level": "intermediate",
    "related": [
      "layout-pages",
      "code-pdfpages"
    ],
    "sources": [
      {
        "label": "geometry documentation (CTAN)",
        "url": "https://ctan.org/pkg/geometry"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-fancyhdr",
    "module": "layout",
    "title": {
      "zh": "fancyhdr 与页面样式",
      "en": "fancyhdr and page styles"
    },
    "summary": {
      "zh": "页眉页脚需要兼顾单双面、章节标记和页眉高度。",
      "en": "Headers and footers depend on sidedness, marks, and header height."
    },
    "syntax": "\\pagestyle{fancy}\\fancyhf{}\\fancyhead[L]{...}\\fancyfoot[C]{\\thepage}",
    "sections": [
      {
        "title": {
          "zh": "位置与页面样式",
          "en": "Positions and page styles"
        },
        "body": {
          "zh": "L、C、R 指定左、中、右，E、O 区分偶数和奇数页。双面文档可用 LE、RO 把页码放在外侧。fancyhf 清空默认字段，避免旧元素混入。",
          "en": "L, C, and R select left, center, and right; E and O select even and odd pages. LE and RO place page numbers on outer edges in a two-sided document. fancyhf clears default fields."
        }
      },
      {
        "title": {
          "zh": "plain 页与章节标记",
          "en": "Plain pages and marks"
        },
        "body": {
          "zh": "标准 book 的章首页常采用 plain 样式，必须用 fancypagestyle{plain} 单独定义。leftmark/rightmark 的含义由文档类决定，nouppercase 防止自动转成大写。",
          "en": "Standard book chapter openings normally use plain, so define it separately with fancypagestyle{plain}. The class determines leftmark/rightmark; nouppercase prevents automatic uppercasing."
        }
      },
      {
        "title": {
          "zh": "高度与文档类接口",
          "en": "Height and class interfaces"
        },
        "body": {
          "zh": "日志提示 headheight too small 时增加 headheight，并检查正文位置。KOMA-Script 和 memoir 有自己的页眉接口；更换类后应重新核对配置。Beamer 的页脚需要 setbeamertemplate。",
          "en": "Increase headheight when the log reports that it is too small, then inspect the body position. KOMA-Script and memoir offer their own header interfaces; review settings after changing classes. Beamer footers use setbeamertemplate."
        }
      },
      {
        "title": {
          "zh": "单页覆盖与章节页",
          "en": "One-page overrides and chapter pages"
        },
        "body": {
          "zh": "thispagestyle{empty} 只影响当前页。maketitle 或 chapter 可能主动选择 plain，因此 pagestyle{fancy} 不会覆盖这些页面的设置。用命名页面样式集中定义页眉。",
          "en": "thispagestyle{empty} affects the current page. maketitle or chapter may explicitly choose plain, which pagestyle{fancy} does not override. Define headers through named page styles."
        }
      },
      {
        "title": {
          "zh": "标题长度与双面逻辑",
          "en": "Title length and two-sided logic"
        },
        "body": {
          "zh": "长章节名可通过可选短标题生成标记。LE/RO 等奇偶页字段在 twoside 文档中区分页面，适合镜像页眉；单面文档保留同一侧的布局。",
          "en": "Use an optional short chapter title for marks when the title is long. Even/odd fields such as LE/RO distinguish pages under twoside and suit mirrored headers; one-sided documents keep a single-sided layout."
        }
      }
    ],
    "example": "ex-layout-headers",
    "packages": [
      "fancyhdr"
    ],
    "level": "intermediate",
    "related": [
      "layout-geometry",
      "beamer-custom-theme"
    ],
    "sources": [
      {
        "label": "fancyhdr documentation (CTAN)",
        "url": "https://ctan.org/pkg/fancyhdr"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-headings",
    "module": "layout",
    "title": {
      "zh": "titlesec 与章节格式",
      "en": "titlesec and heading formats"
    },
    "summary": {
      "zh": "章节格式应由层级、字体、间距和编号共同控制。",
      "en": "Heading formats combine hierarchy, font, spacing, and numbering."
    },
    "syntax": "\\titleformat{\\section}{\\large\\bfseries}{\\thesection}{1em}{}\\titlespacing*{\\section}{0pt}{2ex}{1ex}",
    "sections": [
      {
        "title": {
          "zh": "格式参数",
          "en": "Format arguments"
        },
        "body": {
          "zh": "titleformat 的参数依次为章节命令、可选形状、字体格式、编号标签、标签间距、标题前代码。titlespacing 的三个尺寸控制左缩进、段前距与段后距。星号形式控制标题后首段不缩进。",
          "en": "titleformat takes the section command, an optional shape, formatting, label, separation, and before-title code. titlespacing sets left indentation, space before, and space after. Its starred form suppresses indentation of the following paragraph."
        }
      },
      {
        "title": {
          "zh": "类的管理边界",
          "en": "Class-owned heading behavior"
        },
        "body": {
          "zh": "article/report/book 可用 titlesec。KOMA-Script、memoir 与 ctex 提供各自的标题配置，通常在对应接口中设置即可。Beamer 的 section 用于演示结构，采用不同的排版机制。",
          "en": "titlesec can style article/report/book. KOMA-Script, memoir, and ctex provide heading interfaces of their own, which usually cover the required configuration. Beamer sections use the presentation’s own layout mechanism."
        }
      },
      {
        "title": {
          "zh": "编号、书签与长标题",
          "en": "Numbers, bookmarks, and long titles"
        },
        "body": {
          "zh": "section 保留文档的语义层级，titleformat 等接口调整外观。可选短标题为目录提供简短文本；公式的 PDF 书签可用 texorpdfstring。编号深度由 secnumdepth 控制。",
          "en": "section supplies the document hierarchy, while interfaces such as titleformat change its appearance. Use an optional short title for the contents and texorpdfstring for math in PDF bookmarks. secnumdepth controls numbering depth."
        },
        "code": "\\section[Short title]{A long descriptive title}"
      }
    ],
    "example": "ex-layout-headers",
    "packages": [
      "titlesec"
    ],
    "level": "intermediate",
    "related": [
      "layout-fancyhdr",
      "structure-appendix"
    ],
    "sources": [
      {
        "label": "titlesec documentation (CTAN)",
        "url": "https://ctan.org/pkg/titlesec"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-paragraphs",
    "module": "layout",
    "title": {
      "zh": "段落缩进、parskip 与行距",
      "en": "Indentation, parskip, and line spacing"
    },
    "summary": {
      "zh": "parindent 设置首行缩进，parskip 设置段间距；setspace 管理行距。",
      "en": "parindent sets first-line indentation, parskip sets paragraph separation, and setspace manages line spacing."
    },
    "syntax": "\\setlength{\\parindent}{2em}\\usepackage{setspace}\\onehalfspacing",
    "sections": [
      {
        "title": {
          "zh": "段落机制",
          "en": "Paragraph boundaries"
        },
        "body": {
          "zh": "空白行或 par 开始新段落；源文件单个换行通常只产生一个空格。parindent 是首行缩进，parskip 是段间垂直间距。用反复的双反斜线制造段落容易引入布局诊断。",
          "en": "A blank line or par ends a paragraph; a single source newline usually acts as a space. parindent controls first-line indentation and parskip controls vertical space between paragraphs. Repeated line-break commands are a poor substitute for paragraph structure."
        }
      },
      {
        "title": {
          "zh": "parskip 与 indentfirst",
          "en": "parskip and indentfirst"
        },
        "body": {
          "zh": "parskip 宏包在取消缩进时协调列表等相关间距，优于只修改一个长度。indentfirst 让章节后的首段也缩进。中文 ctex 常已有相应规则，应先查看其默认行为。",
          "en": "parskip coordinates list and related spacing when paragraphs lose indentation. indentfirst indents the first paragraph after a heading. ctex often provides Chinese-specific defaults, which should be checked first."
        }
      },
      {
        "title": {
          "zh": "行距的作用范围",
          "en": "The scope of line spacing"
        },
        "body": {
          "zh": "setspace 提供 singlespacing、onehalfspacing、doublespacing 和局部 spacing 环境。浮动体、脚注和表格可能有各自规则。提交要求中的“1.5 倍”应通过实际模板或 PDF 测量核对。",
          "en": "setspace supplies singlespacing, onehalfspacing, doublespacing, and a local spacing environment. Floats, footnotes, and tables may follow separate rules. Verify a submission’s “1.5 spacing” against its template or measured PDF."
        }
      }
    ],
    "example": "ex-layout-geometry",
    "packages": [
      "setspace",
      "parskip",
      "indentfirst"
    ],
    "level": "intermediate",
    "related": [
      "layout-geometry",
      "error-underfull"
    ],
    "sources": [
      {
        "label": "setspace documentation (CTAN)",
        "url": "https://ctan.org/pkg/setspace"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-enumitem",
    "module": "layout",
    "title": {
      "zh": "enumitem 与嵌套列表",
      "en": "enumitem and nested lists"
    },
    "summary": {
      "zh": "按标签宽度和层级设置列表，避免手工插入空格。",
      "en": "Configure lists by label width and depth rather than inserting spaces manually."
    },
    "syntax": "\\begin{enumerate}[label=(\\alph*),leftmargin=*]...\\end{enumerate}",
    "sections": [
      {
        "title": {
          "zh": "标签和计数器",
          "en": "Labels and counters"
        },
        "body": {
          "zh": "label 中的 arabic*、alph*、roman* 使用当前列表计数器。ref 可以与视觉标签不同，例如 label=(arabic*)、ref=arabic*。引用时 label 必须放在 item 后。",
          "en": "arabic*, alph*, and roman* in label use the current list counter. ref can differ from the printed label, for example label=(arabic*) with ref=arabic*. Place a cross-reference label after item."
        }
      },
      {
        "title": {
          "zh": "水平与垂直间距",
          "en": "Horizontal and vertical spacing"
        },
        "body": {
          "zh": "leftmargin=* 根据标签自动计算缩进；labelsep 控制标签与文字之间的距离。itemsep 控制条目间距，topsep 控制列表上下间距。nosep 适合紧凑列表，但长段落仍应保留足够间距。",
          "en": "leftmargin=* calculates indentation from the label; labelsep separates the label from the text. itemsep separates items, and topsep separates the list from surrounding prose. nosep suits compact lists, while paragraph-length items need space."
        }
      },
      {
        "title": {
          "zh": "续接与兼容性",
          "en": "Continuation and compatibility"
        },
        "body": {
          "zh": "resume 可延续前一列表编号，series 可给序列命名。嵌套列表应明确每层标签。Beamer 自己支持 overlay 列表，直接加载 enumitem 可能与其机制冲突；演示稿优先使用 Beamer 接口。",
          "en": "resume continues numbering, and series names a list sequence. Specify a distinct label for each nested level. enumitem can conflict with Beamer’s overlay-aware lists; prefer the Beamer list interfaces in presentations."
        }
      }
    ],
    "example": "ex-layout-lists",
    "packages": [
      "enumitem"
    ],
    "level": "intermediate",
    "related": [
      "beamer-overlays",
      "programming-counters"
    ],
    "sources": [
      {
        "label": "enumitem documentation (CTAN)",
        "url": "https://ctan.org/pkg/enumitem"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-columns",
    "module": "layout",
    "title": {
      "zh": "twocolumn、multicol 与栏宽",
      "en": "twocolumn, multicol, and column width"
    },
    "summary": {
      "zh": "全篇双栏和局部多栏采用不同的页面管理方式。",
      "en": "Document-wide two-column mode and local multicolumn text use different page-management mechanisms."
    },
    "syntax": "\\documentclass[twocolumn]{article}\\begin{multicols}{2}...\\end{multicols}",
    "sections": [
      {
        "title": {
          "zh": "全篇双栏",
          "en": "Document-wide two-column mode"
        },
        "body": {
          "zh": "twocolumn 文档类选项让页面采用两栏。figure* 和 table* 可跨两栏，但位置规则与单栏浮动体不同。columnwidth 指单栏宽度，textwidth 指整篇正文宽度。",
          "en": "The twocolumn class option creates two-column pages. figure* and table* span both columns but follow different placement rules from single-column floats. columnwidth is one column; textwidth is the whole body width."
        }
      },
      {
        "title": {
          "zh": "局部 multicols",
          "en": "Local multicols"
        },
        "body": {
          "zh": "multicol 的 multicols 环境可在单栏页面中局部建立多栏，末页通常平衡栏高。环境内普通单栏浮动体不受支持，适合简短连续文字或使用不浮动的插图。",
          "en": "The multicols environment creates local columns in a single-column page and normally balances the final columns. Ordinary single-column floats are unsupported inside it; use continuous text or nonfloating illustrations."
        }
      },
      {
        "title": {
          "zh": "动态宽度",
          "en": "Context-sensitive width"
        },
        "body": {
          "zh": "linewidth 随列表、minipage 和 column 等容器变化。局部图片或表格用 linewidth 更稳妥。长公式在窄栏中容易溢出，需要拆分推导或安排跨栏展示。",
          "en": "linewidth changes inside containers such as lists, minipage, and columns. Use it for local figures and tables. Long equations may overflow narrow columns, requiring split derivations or a wide display."
        }
      }
    ],
    "example": "ex-layout-columns",
    "packages": [
      "multicol"
    ],
    "level": "intermediate",
    "related": [
      "layout-geometry",
      "error-overfull"
    ],
    "sources": [
      {
        "label": "multicol documentation (CTAN)",
        "url": "https://ctan.org/pkg/multicol"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-pages",
    "module": "layout",
    "title": {
      "zh": "newpage、clearpage 与页码",
      "en": "newpage, clearpage, and page numbering"
    },
    "summary": {
      "zh": "换页、清空浮动体和改变编号是独立操作。",
      "en": "Page breaks, flushing floats, and changing numbering are separate operations."
    },
    "syntax": "\\newpage\\clearpage\\cleardoublepage\\pagenumbering{roman}",
    "sections": [
      {
        "title": {
          "zh": "换页与清空队列",
          "en": "Breaking a page and flushing floats"
        },
        "body": {
          "zh": "newpage 开始新页，但不强制输出所有等待的浮动体。clearpage 开始新页并清空浮动队列。双栏模式中 newpage 可能只开始下一栏；clearpage 完成当前页并处理浮动体。",
          "en": "newpage starts a new page without forcing all pending floats out. clearpage breaks the page and flushes the float queue. In two-column mode, newpage can move only to the next column, while clearpage completes the page and handles pending floats."
        }
      },
      {
        "title": {
          "zh": "双面空白页",
          "en": "Blank pages in two-sided documents"
        },
        "body": {
          "zh": "cleardoublepage 在双面文档中保证后续正文从适当的奇数页开始，必要时插入空白页。book 的 openright 章首页行为由类控制，openany 可允许从任意页开始。",
          "en": "cleardoublepage ensures that following content starts on the appropriate odd page in a two-sided document, inserting a blank page if needed. book controls chapter openings through openright; openany permits either page."
        }
      },
      {
        "title": {
          "zh": "页码与页样式",
          "en": "Numbering and page styles"
        },
        "body": {
          "zh": "pagenumbering{roman} 改变表示方式并把 page 计数器重置为 1；仅修改计数器用 setcounter{page}。thispagestyle 只影响当前页，pagestyle 影响后续页。切换编号可能产生重复超链接目标，应按完整文档检查日志。",
          "en": "pagenumbering{roman} changes the representation and resets page to 1. setcounter{page} changes only the counter. thispagestyle affects the current page; pagestyle affects following pages. Numbering changes can create duplicate hyperlink destinations, so inspect the complete document log."
        }
      }
    ],
    "example": "ex-academic-thesis",
    "packages": [],
    "level": "intermediate",
    "related": [
      "layout-fancyhdr",
      "structure-appendix"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "layout-microtype",
    "module": "layout",
    "title": {
      "zh": "microtype 与排版诊断",
      "en": "microtype and typesetting diagnostics"
    },
    "summary": {
      "zh": "微排版改善行末视觉和断行，效果受引擎与字体支持限制。",
      "en": "Microtypography improves line endings and breaks, with engine- and font-dependent support."
    },
    "syntax": "\\usepackage{microtype}",
    "sections": [
      {
        "title": {
          "zh": "悬挂标点与字体扩展",
          "en": "Protrusion and font expansion"
        },
        "body": {
          "zh": "protrusion 让特定字符略微超出行边界，改善视觉边缘。expansion 微调字符宽度以帮助断行。pdfTeX 与 LuaTeX 支持常见扩展功能；XeTeX 的支持范围不同，不能假设所有引擎输出一致。",
          "en": "Protrusion lets selected characters extend slightly beyond line boundaries. Expansion adjusts character widths to improve line breaking. pdfTeX and LuaTeX support common expansion features; XeTeX support differs, so outputs are not necessarily identical."
        }
      },
      {
        "title": {
          "zh": "配置与字体",
          "en": "Configuration and fonts"
        },
        "body": {
          "zh": "宏包为许多字体提供配置。选择自定义字体后应检查字符悬挂是否合适；微排版不能修复缺失字体或无法断开的长字符串。",
          "en": "The package includes settings for many fonts. Inspect protrusion after selecting a custom font. Microtypography cannot repair a missing font or an unbreakable long string."
        }
      },
      {
        "title": {
          "zh": "避免隐藏真实问题",
          "en": "Keep diagnostics useful"
        },
        "body": {
          "zh": "遇到 Overfull hbox，先检查不可断行内容、公式与局部宽度，再评估微排版。全局设置巨大的 hfuzz 只会隐藏日志。视觉检查和日志检查应一起使用。",
          "en": "For an overfull box, inspect unbreakable material, equations, and local width before relying on microtypography. A large global hfuzz merely hides the log message. Combine visual inspection with log review."
        }
      }
    ],
    "example": "ex-text-fonts",
    "packages": [
      "microtype"
    ],
    "level": "intermediate",
    "related": [
      "error-overfull",
      "fonts-fontspec"
    ],
    "sources": [
      {
        "label": "microtype documentation (CTAN)",
        "url": "https://ctan.org/pkg/microtype"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "fonts-families",
    "module": "fonts",
    "title": {
      "zh": "文本字体族、字重与字号",
      "en": "Text font families, weight, and size"
    },
    "summary": {
      "zh": "文字字体有族、系列、形状和尺寸几个独立维度。",
      "en": "Text fonts have independent family, series, shape, and size dimensions."
    },
    "syntax": "\\textsf{...}\\texttt{...}\\textbf{...}\\textit{...}{\\Large ...\\par}",
    "sections": [
      {
        "title": {
          "zh": "字体选择维度",
          "en": "Font selection dimensions"
        },
        "body": {
          "zh": "textrm、textsf、texttt 分别选择衬线、无衬线和等宽字体；textbf 选择粗体，textit 选择斜体，textsc 选择小型大写。实际效果取决于字体是否提供对应字形。",
          "en": "textrm, textsf, and texttt select serif, sans-serif, and monospaced families. textbf selects bold, textit italic, and textsc small capitals. The actual effect depends on available font shapes."
        }
      },
      {
        "title": {
          "zh": "声明与分组",
          "en": "Declarations and grouping"
        },
        "body": {
          "zh": "bfseries、itshape 和 Large 是声明，持续到所在分组结束。字号变化时在结束分组前加 par，使整段使用正确基线间距。textbf 等带参数命令适合短片段。",
          "en": "bfseries, itshape, and Large are declarations that last to the end of their group. End a paragraph with par before closing a size-changing group so its baseline spacing is applied correctly. Argument commands such as textbf suit short spans."
        }
      },
      {
        "title": {
          "zh": "文本与数学的界限",
          "en": "Text and math font boundaries"
        },
        "body": {
          "zh": "文本字体设置不会自动改变数学字母。数学粗体用 mathbf、boldsymbol 或 bm；OpenType 数学字体需 unicode-math。pdfLaTeX 的 T1 编码有助于拉丁文字断词，中文需要专门排版体系。",
          "en": "Text font changes do not automatically change mathematical alphabets. Use mathbf, boldsymbol, or bm in math; unicode-math selects OpenType math fonts. T1 encoding helps pdfLaTeX handle Latin hyphenation, while Chinese needs its own typesetting system."
        }
      }
    ],
    "example": "ex-text-fonts",
    "packages": [
      "fontenc",
      "lmodern"
    ],
    "level": "intermediate",
    "related": [
      "fonts-fontspec",
      "fonts-color"
    ],
    "sources": [
      {
        "label": "LaTeX font selection guide",
        "url": "https://www.latex-project.org/help/documentation/fntguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "fonts-fontspec",
    "module": "fonts",
    "title": {
      "zh": "fontspec 与 OpenType 字体",
      "en": "fontspec and OpenType fonts"
    },
    "summary": {
      "zh": "fontspec 在 XeLaTeX 或 LuaLaTeX 中选择系统或随项目分发的字体。",
      "en": "fontspec selects system or project-distributed fonts in XeLaTeX and LuaLaTeX."
    },
    "syntax": "\\usepackage{fontspec}\\setmainfont{Latin Modern Roman}\\setmonofont{Latin Modern Mono}",
    "sections": [
      {
        "title": {
          "zh": "引擎与查找方式",
          "en": "Engines and font lookup"
        },
        "body": {
          "zh": "fontspec 需要 XeTeX 或 LuaTeX，pdfLaTeX 无法加载它。setmainfont、setsansfont、setmonofont 分别设置主族、无衬线族和等宽族。按字体显示名称或按文件名选择时，应核对实际安装和路径。",
          "en": "fontspec requires XeTeX or LuaTeX and cannot run under pdfLaTeX. setmainfont, setsansfont, and setmonofont select the main, sans-serif, and monospaced families. Check installed names or file paths when selecting a font."
        }
      },
      {
        "title": {
          "zh": "可移植配置",
          "en": "Portable configuration"
        },
        "body": {
          "zh": "Latin Modern 随 TeX 发行版提供；系统专有字体的可用性因机器不同。按文件加载可使用 Path、Extension、UprightFont 等选项，并在项目中注明字体许可证。",
          "en": "Latin Modern ships with TeX distributions; proprietary system fonts vary between machines. File-based selection can use Path, Extension, and UprightFont, with the font license documented in the project."
        }
      },
      {
        "title": {
          "zh": "特性与中文",
          "en": "Features and Chinese text"
        },
        "body": {
          "zh": "Ligatures、Numbers 和 Scale 等选项控制 OpenType 特性与比例。中文 XeLaTeX 使用 xeCJK 或 ctex 来管理中西文分工和标点。字体不存在时，应修正名称或安装字体；FakeBold 不能替代缺失字体。",
          "en": "Ligatures, Numbers, and Scale configure OpenType features and proportions. Chinese under XeLaTeX uses xeCJK or ctex for CJK/Latin division and punctuation. If a font is absent, correct the name or install it; FakeBold cannot replace a missing font."
        }
      }
    ],
    "example": "ex-fontspec",
    "packages": [
      "fontspec"
    ],
    "level": "intermediate",
    "related": [
      "error-font",
      "error-engine",
      "beamer-chinese"
    ],
    "sources": [
      {
        "label": "fontspec documentation (CTAN)",
        "url": "https://ctan.org/pkg/fontspec"
      }
    ],
    "engines": [
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "fonts-color",
    "module": "fonts",
    "title": {
      "zh": "xcolor、颜色模型与 textcomp",
      "en": "xcolor, color models, and textcomp"
    },
    "summary": {
      "zh": "命名颜色与文本符号需分别设置依赖和语义。",
      "en": "Named colors and text symbols have separate dependencies and meanings."
    },
    "syntax": "\\definecolor{atelier}{HTML}{195C4E}\\textcolor{atelier}{Label}\\textdegree",
    "sections": [
      {
        "title": {
          "zh": "颜色模型",
          "en": "Color models"
        },
        "body": {
          "zh": "definecolor 支持 rgb 的 0 到 1 值、RGB 的 0 到 255 值、HTML 的十六进制值以及 cmyk。teal!20!white 混合命名颜色；颜色名大小写有区别。",
          "en": "definecolor accepts rgb values from 0 to 1, RGB values from 0 to 255, hexadecimal HTML values, and cmyk. teal!20!white mixes named colors. Color names are case-sensitive."
        }
      },
      {
        "title": {
          "zh": "作用域与选项",
          "en": "Scope and package options"
        },
        "body": {
          "zh": "textcolor 限定在一个参数内，color 声明持续至分组结束。表格行着色需要 xcolor 的 table 选项；在 Beamer 等已加载 xcolor 的类中应提前传递选项或使用类支持的选项，避免重复加载冲突。",
          "en": "textcolor applies to one argument; color lasts to the end of its group. Table row coloring needs the table option. When a class such as Beamer already loads xcolor, pass options before the load or use supported class options to avoid a clash."
        }
      },
      {
        "title": {
          "zh": "文本符号与可读性",
          "en": "Text symbols and readability"
        },
        "body": {
          "zh": "textdegree、textcopyright、textbackslash 等属于文本符号体系。现代 LaTeX 已整合大量 textcomp 功能，旧文档仍可能显式加载 textcomp。颜色配合文字标签与线型使用，可保留黑白打印时的信息区别。",
          "en": "textdegree, textcopyright, and textbackslash are text symbols. Modern LaTeX integrates much textcomp functionality, though older documents may still load it explicitly. Combine color with labels and line styles so distinctions survive black-and-white printing."
        }
      }
    ],
    "example": "ex-text-fonts",
    "packages": [
      "xcolor",
      "textcomp"
    ],
    "level": "intermediate",
    "related": [
      "tikz-layers",
      "accessibility-pdf"
    ],
    "sources": [
      {
        "label": "xcolor documentation (CTAN)",
        "url": "https://ctan.org/pkg/xcolor"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "code-listings",
    "module": "code",
    "title": {
      "zh": "listings 代码高亮",
      "en": "Source highlighting with listings"
    },
    "summary": {
      "zh": "listings 在 TeX 内部分析源码并提供标题、编号和样式。",
      "en": "listings analyzes source within TeX and supplies captions, numbering, and styles."
    },
    "syntax": "\\lstset{language=Python,numbers=left,breaklines=true}\\begin{lstlisting}...\\end{lstlisting}",
    "sections": [
      {
        "title": {
          "zh": "环境与外部文件",
          "en": "Environments and external files"
        },
        "body": {
          "zh": "lstlisting 原样读取环境中的字符，lstinputlisting 从文件读取源代码。lstinline 适合行内片段。caption 与 label 可组成引用；label 应随 caption 配置。",
          "en": "lstlisting reads literal characters from its body; lstinputlisting reads a source file. lstinline suits inline snippets. Use caption and label together for cross-references."
        }
      },
      {
        "title": {
          "zh": "样式与换行",
          "en": "Styles and line wrapping"
        },
        "body": {
          "zh": "basicstyle 设置字体，keywordstyle、commentstyle 和 stringstyle 控制各类语法样式。breaklines 允许长行折行，showstringspaces=false 隐藏字符串空格标记。listings 负责源码显示，程序运行与语义检查由相应编程工具完成。",
          "en": "basicstyle selects the font; keywordstyle, commentstyle, and stringstyle format token categories. breaklines wraps long lines, and showstringspaces=false hides string-space markers. listings displays source; execution and semantic checking belong to the programming tools."
        }
      },
      {
        "title": {
          "zh": "Unicode 与演示稿",
          "en": "Unicode and slides"
        },
        "body": {
          "zh": "listings 对复杂 Unicode 输入的支持有限，中文代码注释需要特定配置或选用更适合 Unicode 的工具。Beamer 内必须使用 fragile frame。要求无需外部工具的源码示例适合 listings。",
          "en": "listings has limited handling of complex Unicode input; Chinese comments need configuration or a more suitable Unicode tool. A Beamer frame must be fragile. listings suits projects that need highlighting without external tools."
        }
      },
      {
        "title": {
          "zh": "行范围与片段引用",
          "en": "Line ranges and excerpt references"
        },
        "body": {
          "zh": "lstinputlisting 的 firstline 与 lastline 选取行范围。源码变动后行号可能改变，可使用稳定标记工作流或重新检查选段。caption 应描述片段功能，label 用于正文引用。",
          "en": "firstline and lastline select a range for lstinputlisting. Source edits can shift line numbers, so use a stable marker workflow or recheck the excerpt. Describe the function in the caption and use label for references."
        }
      },
      {
        "title": {
          "zh": "代码与 TeX 混排",
          "en": "Mixing source and TeX"
        },
        "body": {
          "zh": "escapeinside 等接口允许在代码中插入 TeX 注释，可能改变原始源码的可复制性。教学材料应明确哪些是排版标记，完整程序最好另行提供原文件。",
          "en": "Interfaces such as escapeinside insert TeX material in code but may affect copyability. Identify typesetting markers in teaching material and provide an original source file for a complete program."
        }
      }
    ],
    "example": "ex-code-listings",
    "packages": [
      "listings"
    ],
    "level": "intermediate",
    "related": [
      "code-minted",
      "beamer-fragile"
    ],
    "sources": [
      {
        "label": "listings documentation (CTAN)",
        "url": "https://ctan.org/pkg/listings"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "code-minted",
    "module": "code",
    "title": {
      "zh": "minted 3 与外部高亮工具",
      "en": "minted 3 and external highlighting"
    },
    "summary": {
      "zh": "minted 使用 Pygments，通过 latexminted 协调高亮和缓存。",
      "en": "minted uses Pygments, with latexminted coordinating highlighting and caching."
    },
    "syntax": "\\usepackage{minted}\\begin{minted}[linenos,breaklines]{python}...\\end{minted}",
    "sections": [
      {
        "title": {
          "zh": "高亮工作链",
          "en": "The highlighting chain"
        },
        "body": {
          "zh": "minted 将原样代码交给 Python/Pygments，获取格式化结果后由 TeX 排版。语言名是 Pygments lexer 名称，例如 python。linenos 显示行号，breaklines 折行，inputminted 从独立文件读取。",
          "en": "minted sends literal source to Python/Pygments and typesets the formatted result in TeX. The language is a Pygments lexer name such as python. linenos shows line numbers, breaklines wraps lines, and inputminted reads a file."
        }
      },
      {
        "title": {
          "zh": "版本 3 的安装条件",
          "en": "Version 3 installation requirements"
        },
        "body": {
          "zh": "minted 3 使用 latexminted 可执行程序。发行版包管理器安装可包含所需 Python 库，运行时仍需要可用的 Python。手动安装时按官方手册配置 PATH 和运行环境。minted 2 直接依赖 pygmentize，安装步骤与版本 3 不同。",
          "en": "minted 3 uses the latexminted executable. A distribution package-manager installation can include the Python libraries, while execution still needs a working Python runtime. For a manual installation, follow the manual’s PATH and runtime setup. minted 2 used pygmentize directly and has different installation steps."
        }
      },
      {
        "title": {
          "zh": "受限与非受限 shell escape",
          "en": "Restricted and unrestricted shell escape"
        },
        "body": {
          "zh": "现代 TeX Live/MiKTeX 配置可将 latexminted 加入受信的受限执行列表，使 minted 3 不必统一要求 -shell-escape。旧版本或自定义配置仍可能需要额外授权；先检查版本、日志和官方配置说明。",
          "en": "Modern TeX Live/MiKTeX configurations can trust latexminted for restricted execution, so minted 3 does not universally require -shell-escape. Older or custom configurations may require additional permission. Check the version, log, and documented setup first."
        }
      },
      {
        "title": {
          "zh": "缓存、投稿与排错",
          "en": "Caching, submission, and diagnosis"
        },
        "body": {
          "zh": "缓存可以减少重复高亮。frozencache 工作流需要先生成并交付匹配缓存；选项和目录行为需按当前版本手册核对。投稿平台若限制外部工具，可采用 listings 或预生成结果。Beamer 中还需要 fragile。",
          "en": "Caching reduces repeated highlighting. A frozencache workflow requires prebuilt matching cache files, with options and directory behavior checked against the installed version. Use listings or prebuilt output when a submission platform restricts external tools. Beamer still requires fragile frames."
        }
      },
      {
        "title": {
          "zh": "执行权限与可信输入",
          "en": "Execution settings and trusted inputs"
        },
        "body": {
          "zh": "受限执行只允许受信程序，非受限 shell escape 可调用更广泛的命令。按项目来源和实际需求选择执行权限。网站提供源码和本地编译记录，完整高亮工作链在本地 TeX 环境运行。",
          "en": "Restricted execution permits trusted programs; unrestricted shell escape allows a broader range of commands. Choose execution settings according to the project source and its requirements. The website provides source and local build records; the full highlighting chain runs in a local TeX environment."
        }
      }
    ],
    "example": "ex-code-minted",
    "packages": [
      "minted"
    ],
    "level": "advanced",
    "related": [
      "code-listings",
      "beamer-fragile",
      "project-reproducibility"
    ],
    "sources": [
      {
        "label": "minted 3.8 manual",
        "url": "https://mirrors.ibiblio.org/pub/mirrors/CTAN/macros/latex/contrib/minted/minted.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "code-verbatim",
    "module": "code",
    "title": {
      "zh": "verbatim、fancyvrb 与原样文本",
      "en": "verbatim, fancyvrb, and literal text"
    },
    "summary": {
      "zh": "原样文本环境保存字符本身，适合源代码、日志和文件路径。",
      "en": "Literal-text environments preserve characters for code, logs, and paths."
    },
    "syntax": "\\verb|a_b%|\\begin{verbatim}...\\end{verbatim}\\begin{Verbatim}[numbers=left]...\\end{Verbatim}",
    "sections": [
      {
        "title": {
          "zh": "原样读取规则",
          "en": "Literal-reading rules"
        },
        "body": {
          "zh": "verb 用后续一个字符作为分隔符，分隔符不能出现在片段内，片段不能跨行。verbatim 适合多行内容。它们改变特殊字符的解释，因此不能像普通文本放进任意宏参数。",
          "en": "verb uses the next character as its delimiter. That delimiter cannot occur in the snippet, and the snippet cannot span lines. verbatim handles multiple lines. Both change character interpretation and cannot be placed in arbitrary macro arguments."
        }
      },
      {
        "title": {
          "zh": "fancyvrb 的接口",
          "en": "The fancyvrb interface"
        },
        "body": {
          "zh": "fancyvrb 的 Verbatim 区分大小写，支持 numbers、fontsize 和 frame 等设置。VerbatimInput 读取文件，SaveVerb 可保存行内片段。fvextra 提供更丰富的断行功能。",
          "en": "The case-sensitive Verbatim environment in fancyvrb accepts numbers, fontsize, and frame options. VerbatimInput reads a file, and SaveVerb stores an inline snippet. fvextra adds richer line breaking."
        }
      },
      {
        "title": {
          "zh": "文本真实性",
          "en": "Preserving literal content"
        },
        "body": {
          "zh": "日志的关键错误信息适合用原样文本保存。detokenize 将 token 转成可打印文本，但参数仍先按普通规则读取；百分号可能在这一阶段成为注释。",
          "en": "Preserve important log messages as literal text. detokenize converts tokens to printable text, but its argument is first read by ordinary rules; a percent sign may become a comment at that stage."
        }
      }
    ],
    "example": "ex-beamer-fragile",
    "packages": [
      "fancyvrb"
    ],
    "level": "intermediate",
    "related": [
      "beamer-fragile",
      "error-undefined-command"
    ],
    "sources": [
      {
        "label": "fancyvrb documentation (CTAN)",
        "url": "https://ctan.org/pkg/fancyvrb"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "code-boxes",
    "module": "code",
    "title": {
      "zh": "tcolorbox 与 mdframed",
      "en": "tcolorbox and mdframed"
    },
    "summary": {
      "zh": "文本框需要区分视觉样式、分页与源码高亮机制。",
      "en": "Text boxes have separate styling, page-breaking, and highlighting mechanisms."
    },
    "syntax": "\\usepackage[breakable]{tcolorbox}\\begin{tcolorbox}[title={Note},breakable]...\\end{tcolorbox}",
    "sections": [
      {
        "title": {
          "zh": "tcolorbox 的库",
          "en": "tcolorbox libraries"
        },
        "body": {
          "zh": "tcolorbox 可设置背景、边框、标题和左右对照区域。breakable 库允许框在页面间分开；listing 库可与 listings 或 minted 结合。选用哪个高亮库会改变编译依赖。",
          "en": "tcolorbox configures backgrounds, borders, titles, and side-by-side regions. Its breakable library allows page breaks inside a box. Listing libraries integrate with listings or minted, and the chosen backend changes compilation requirements."
        }
      },
      {
        "title": {
          "zh": "mdframed 的用途",
          "en": "Uses of mdframed"
        },
        "body": {
          "zh": "mdframed 适合给定理和说明加边框，并支持分页。外层 minipage 会把长框限制成不可分页的盒子；需要跨页时让框处于可分页的正文中。页面样式与框内段落间距保持一致。",
          "en": "mdframed frames theorems and explanations and supports page breaks. An outer minipage makes the whole frame unbreakable; keep a long frame in the page-breaking body when it needs to span pages. Coordinate the page style and paragraph spacing."
        }
      },
      {
        "title": {
          "zh": "语义与可访问性",
          "en": "Meaning and accessibility"
        },
        "body": {
          "zh": "框的标题说明内容类型，如假设、注意或例子。复杂皮肤和颜色不会自动产生 PDF 语义标记。长篇正文应保留正常段落与章节，避免把整篇文章都放进装饰性框中。",
          "en": "A box title identifies its role, such as assumption, note, or example. Complex skins and colors do not automatically create PDF semantic tags. Preserve normal paragraphs and headings in a long document."
        }
      }
    ],
    "example": "ex-code-boxes",
    "packages": [
      "tcolorbox",
      "mdframed"
    ],
    "level": "intermediate",
    "related": [
      "code-listings",
      "accessibility-pdf"
    ],
    "sources": [
      {
        "label": "tcolorbox documentation (CTAN)",
        "url": "https://ctan.org/pkg/tcolorbox"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "code-pdfpages",
    "module": "code",
    "title": {
      "zh": "pdfpages、landscape 与 pdflscape",
      "en": "pdfpages, landscape, and pdflscape"
    },
    "summary": {
      "zh": "导入 PDF 页面与旋转本文件的页面属于不同任务。",
      "en": "Importing PDF pages differs from rotating pages of the current document."
    },
    "syntax": "\\includepdf[pages={1,3-5}]{appendix.pdf}\\begin{landscape}...\\end{landscape}",
    "sections": [
      {
        "title": {
          "zh": "外部 PDF 页面",
          "en": "External PDF pages"
        },
        "body": {
          "zh": "pdfpages 的 includepdf 选择完整页面，pages=- 选择全部。pagecommand 可添加页样式，nup 可拼版。输入文件必须存在；此功能不会把外部 PDF 的章节自动加入当前目录。",
          "en": "pdfpages includepdf selects whole pages; pages=- selects all. pagecommand controls page style, and nup performs imposition. The input file must exist. Imported PDF headings do not automatically become current-document contents entries."
        }
      },
      {
        "title": {
          "zh": "横向排版与显示旋转",
          "en": "Landscape typesetting and display rotation"
        },
        "body": {
          "zh": "lscape 的 landscape 环境旋转正文区域；pdflscape 在此基础上设置 PDF 页面旋转，使阅读器以横向显示。两者都与 rotating 宏包的单个 sidewaystable 不同。",
          "en": "lscape landscape rotates the body area. pdflscape also sets PDF page rotation so viewers display it horizontally. Both differ from rotating a single sidewaystable with the rotating package."
        }
      },
      {
        "title": {
          "zh": "宽表和交付",
          "en": "Wide tables and delivery"
        },
        "body": {
          "zh": "长宽表可在 landscape 内使用 longtable，不能把 longtable 放进普通 table。外部 PDF 合并前检查纸张尺寸、书签和可访问性；被导入文件的原始语义不会自动转成完整的主文档结构。",
          "en": "A wide multipage table can use longtable inside landscape; longtable does not belong inside a normal table float. Before merging PDFs, inspect page sizes, bookmarks, and accessibility. Importing a PDF does not automatically integrate its semantics into the main document structure."
        }
      }
    ],
    "example": "ex-academic-poster",
    "packages": [
      "pdfpages",
      "pdflscape"
    ],
    "level": "intermediate",
    "related": [
      "layout-geometry",
      "structure-appendix"
    ],
    "sources": [
      {
        "label": "pdfpages documentation (CTAN)",
        "url": "https://ctan.org/pkg/pdfpages"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "algorithm-pseudocode",
    "module": "algorithms",
    "title": {
      "zh": "algorithm、algorithmicx 与 algpseudocode",
      "en": "algorithm, algorithmicx, and algpseudocode"
    },
    "summary": {
      "zh": "浮动体和伪代码语法由不同宏包负责。",
      "en": "Different packages provide the float and the pseudocode syntax."
    },
    "syntax": "\\usepackage{algorithm}\\usepackage{algpseudocode}\\begin{algorithm}\\begin{algorithmic}[1]...\\end{algorithmic}\\end{algorithm}",
    "sections": [
      {
        "title": {
          "zh": "依赖职责",
          "en": "Package responsibilities"
        },
        "body": {
          "zh": "algorithm 提供带标题的 algorithm 浮动体；algorithmicx 是可扩展的排版框架，algpseudocode 提供常用伪代码布局。algorithmic 是环境名称，不代表已自动载入旧 algorithmic 宏包。",
          "en": "algorithm provides the captioned algorithm float. algorithmicx is an extensible framework, and algpseudocode supplies a common pseudocode layout. algorithmic is the environment name; it does not mean the older algorithmic package is loaded."
        }
      },
      {
        "title": {
          "zh": "关键命令与大小写",
          "en": "Commands and capitalization"
        },
        "body": {
          "zh": "State、If/EndIf、For/EndFor、While/EndWhile 表达结构；Require、Ensure 描述输入与输出。可选参数 [1] 每行编号。旧 algorithmic 常用全大写 STATE 等命令，不能直接复制到 algpseudocode。",
          "en": "State, If/EndIf, For/EndFor, and While/EndWhile express structure. Require and Ensure specify inputs and outputs. The optional [1] numbers every line. Older algorithmic uses commands such as uppercase STATE, which do not transfer directly."
        }
      },
      {
        "title": {
          "zh": "引用与长算法",
          "en": "References and long algorithms"
        },
        "body": {
          "zh": "caption 后放 label，正文引用算法编号。algorithm 浮动体不能跨页；长伪代码可保留 algorithmic 环境并使用非浮动标题方案，或拆为有明确接口的步骤。伪代码不是可执行程序。",
          "en": "Place label after caption and cite the algorithm number in the text. An algorithm float cannot span pages. For long pseudocode, keep algorithmic with a nonfloating caption or split it into steps with clear interfaces. Pseudocode is not executable code."
        }
      },
      {
        "title": {
          "zh": "行号引用",
          "en": "Line references"
        },
        "body": {
          "zh": "algpseudocode 的行号依赖 algorithmic 的可选间隔；需要引用某行时在对应语句后设置标签并检查结果。算法编号与行号是两个计数体系。",
          "en": "Line numbering depends on the algorithmic optional interval. Place a label after a statement when referencing a line and inspect the result. Algorithm numbers and line numbers are separate counters."
        }
      },
      {
        "title": {
          "zh": "数学与普通文字",
          "en": "Math and prose in pseudocode"
        },
        "body": {
          "zh": "变量与赋值放在数学模式，解释性文字保留文本模式。算法描述需写出前置条件；例如，求均值时样本必须非空，才有可定义的分母。",
          "en": "Put variables and assignments in math mode and explanations in text. State the preconditions: a sample-mean procedure needs a nonempty sample for its denominator."
        }
      }
    ],
    "example": "ex-algorithm-pseudocode",
    "packages": [
      "algorithm",
      "algpseudocode"
    ],
    "level": "intermediate",
    "related": [
      "algorithm-algorithm2e",
      "code-listings"
    ],
    "sources": [
      {
        "label": "algorithmicx documentation (CTAN)",
        "url": "https://ctan.org/pkg/algorithmicx"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "algorithm-algorithm2e",
    "module": "algorithms",
    "title": {
      "zh": "algorithm2e 及语法冲突",
      "en": "algorithm2e and syntax conflicts"
    },
    "summary": {
      "zh": "algorithm2e 是独立的算法排版系统，不能把它的命令与 algpseudocode 混用。",
      "en": "algorithm2e is an independent algorithm system with its own commands."
    },
    "syntax": "\\usepackage[ruled,vlined]{algorithm2e}\\KwIn{...}\\KwOut{...}\\For{condition}{body}",
    "sections": [
      {
        "title": {
          "zh": "输入和语句终止",
          "en": "Inputs and statement termination"
        },
        "body": {
          "zh": "KwIn 与 KwOut 声明输入输出，普通语句以算法专用的反斜线分号结束。For、If 等命令用花括号包住条件和主体；EndFor 是 algpseudocode 的另一套语法。",
          "en": "KwIn and KwOut declare inputs and outputs; ordinary statements end with the package’s backslash-semicolon command. For and If take the condition and body in braces. EndFor belongs to the separate algpseudocode syntax."
        }
      },
      {
        "title": {
          "zh": "样式与语言",
          "en": "Styles and language"
        },
        "body": {
          "zh": "ruled 提供上下横线标题，vlined 为控制结构画竖线。SetKw 可定义关键词，SetKwInput 定义输入类标签。编号与标题通过宏包接口管理。",
          "en": "ruled adds rules around the caption, and vlined draws vertical guides for control structures. SetKw defines keywords, and SetKwInput defines input-like labels. Use the package interfaces for numbering and captions."
        }
      },
      {
        "title": {
          "zh": "宏包冲突",
          "en": "Package conflicts"
        },
        "body": {
          "zh": "algorithm2e 默认也定义 algorithm 环境，因此与 algorithm 宏包同时加载会名称冲突。需要共存时查阅 algo2e 选项，但一般一个项目选择一种算法系统即可。",
          "en": "algorithm2e also defines an algorithm environment by default, so loading it with algorithm creates a name conflict. Consult the algo2e option if coexistence is necessary; usually choose one algorithm system per project."
        }
      }
    ],
    "example": "ex-algorithm2e",
    "packages": [
      "algorithm2e"
    ],
    "level": "intermediate",
    "related": [
      "algorithm-pseudocode",
      "error-package-conflict"
    ],
    "sources": [
      {
        "label": "algorithm2e documentation (CTAN)",
        "url": "https://ctan.org/pkg/algorithm2e"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-newcommand",
    "module": "programming",
    "title": {
      "zh": "newcommand、renewcommand 与 providecommand",
      "en": "newcommand, renewcommand, and providecommand"
    },
    "summary": {
      "zh": "用语义命令集中管理重复符号和格式，同时防止误覆盖已有命令。",
      "en": "Use semantic commands for repeated notation and formatting while avoiding accidental redefinition."
    },
    "syntax": "\\newcommand{\\norm}[1]{\\lVert #1\\rVert}\\newcommand{\\note}[2][Note]{#1: #2}",
    "sections": [
      {
        "title": {
          "zh": "参数与默认值",
          "en": "Arguments and defaults"
        },
        "body": {
          "zh": "newcommand 的可选数字指定参数数量，正文中的 #1 到 #9 引用参数。再接一个可选默认值时，第一个参数成为可选参数，其余参数仍为必选。\n\n例子 norm 接一个必选参数；note 接一个默认值为 Note 的可选参数和一个必选参数。调用 note[Input]{...} 会替换默认标签。",
          "en": "An optional number sets the argument count, and #1 through #9 refer to arguments in the definition. A further optional default makes the first argument optional; the remaining arguments stay mandatory.\n\nThe example norm takes one mandatory argument. note takes an optional label defaulting to Note and one mandatory argument. note[Input]{...} replaces that label."
        }
      },
      {
        "title": {
          "zh": "定义冲突",
          "en": "Definition conflicts"
        },
        "body": {
          "zh": "newcommand 要求命令尚未定义，renewcommand 要求命令已经存在，providecommand 仅在未定义时创建。错误地使用 renewcommand 改写标准命令会影响宏包内部调用。为项目命令选择有前缀的名称。",
          "en": "newcommand requires a new command, renewcommand requires an existing one, and providecommand defines only if absent. Redefining a standard command can affect package internals. Choose project-prefixed names."
        }
      },
      {
        "title": {
          "zh": "数学与文本边界",
          "en": "Math and text boundaries"
        },
        "body": {
          "zh": "norm 的 lVert/rVert 需要 amsmath，并在数学模式中调用。ensuremath 可给单一数学记号提供文本接口，普通句子仍用文本模式。语义宏按内容命名，如 ExpectedValue，便于识别用途。",
          "en": "The lVert/rVert commands in norm require amsmath and math mode. ensuremath gives a single mathematical notation a text interface; ordinary sentences stay in text mode. Name semantic macros for their meaning, such as ExpectedValue."
        }
      },
      {
        "title": {
          "zh": "嵌套定义与作用域",
          "en": "Nested definitions and scope"
        },
        "body": {
          "zh": "在另一个宏定义内部定义宏，参数符号要加倍为 ##1，因为外层读取一次参数符号。分组内定义通常在组结束后失效。先用短 MWE 验证参数，再放进共享 sty 文件。",
          "en": "Inside another macro definition, double a parameter marker to ##1 because the outer definition reads it once. Definitions made in a group normally disappear at its end. Check arguments in a short MWE before moving them to a shared sty file."
        }
      },
      {
        "title": {
          "zh": "稳定命名与依赖",
          "en": "Stable naming and dependencies"
        },
        "body": {
          "zh": "记录共享命令的参数、适用模式与依赖。实现可更换字体或数学宏包，同时保留用户接口的语义。为项目命令选择未被占用的名称，保留已有重音和数学符号命令的含义。",
          "en": "Document each shared command’s arguments, mode, and dependencies. The implementation can change fonts or math packages while preserving the interface’s meaning. Use unoccupied project names and preserve existing accent and symbol commands."
        }
      }
    ],
    "example": "ex-programming-macros",
    "packages": [
      "amsmath"
    ],
    "level": "intermediate",
    "related": [
      "programming-document-commands",
      "programming-lowlevel",
      "programming-package-class"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-document-commands",
    "module": "programming",
    "title": {
      "zh": "NewDocumentCommand 参数接口",
      "en": "The NewDocumentCommand argument interface"
    },
    "summary": {
      "zh": "现代文档命令接口支持可选参数、星号与明确的参数规范。",
      "en": "The modern document-command interface supports optional arguments, stars, and explicit signatures."
    },
    "syntax": "\\NewDocumentCommand{\\Notice}{s O{Note} m}{...}",
    "sections": [
      {
        "title": {
          "zh": "参数规范",
          "en": "Argument signatures"
        },
        "body": {
          "zh": "m 表示必选花括号参数，o 表示无默认值的可选参数，O{default} 提供默认值，s 检测星号。现代 LaTeX 内核提供 NewDocumentCommand；较旧格式需要 xparse。",
          "en": "m takes a mandatory braced argument, o an optional argument without a default, O{default} an optional argument with a default, and s tests for a star. Modern LaTeX includes NewDocumentCommand in the kernel; older formats require xparse."
        }
      },
      {
        "title": {
          "zh": "判断可选状态",
          "en": "Testing optional values"
        },
        "body": {
          "zh": "IfBooleanTF 判断 s 得到的布尔值，IfNoValueTF 检查 o 参数是否未给出。未给出的 o 参数不是空字符串，不能随意拿来排版。RenewDocumentCommand 与 ProvideDocumentCommand 对应重定义和条件定义。",
          "en": "IfBooleanTF tests the boolean from s; IfNoValueTF checks whether an o argument was omitted. An omitted o argument is not an empty string and should not be typeset directly. RenewDocumentCommand and ProvideDocumentCommand handle redefinition and conditional definition."
        },
        "code": "\\NewDocumentCommand{\\Notice}{O{Note} m}{\\textbf{#1:} #2}"
      },
      {
        "title": {
          "zh": "接口与实现分开",
          "en": "Separating interface from implementation"
        },
        "body": {
          "zh": "文档接口负责读取用户参数，内部函数负责处理内容。避免为了一个简单单参宏设计复杂签名。宏参数中若允许段落，应选择相应的长参数机制并测试空行。",
          "en": "Let the document interface read user arguments and internal functions process content. Keep a simple one-argument macro simple. If arguments may contain paragraphs, use the appropriate long-argument mechanism and test blank lines."
        }
      }
    ],
    "example": "ex-programming-expl3",
    "packages": [],
    "level": "advanced",
    "related": [
      "programming-newcommand",
      "programming-expl3"
    ],
    "sources": [
      {
        "label": "LaTeX author guide: document commands",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-environments",
    "module": "programming",
    "title": {
      "zh": "newenvironment 与 NewDocumentEnvironment",
      "en": "newenvironment and NewDocumentEnvironment"
    },
    "summary": {
      "zh": "环境把起始操作、内容和结束操作封装在一个有作用域的接口中。",
      "en": "An environment packages setup, content, and closing operations in a scoped interface."
    },
    "syntax": "\\newenvironment{remark}{\\begin{quote}\\bfseries}{\\end{quote}}",
    "sections": [
      {
        "title": {
          "zh": "起始与结束代码",
          "en": "Opening and closing code"
        },
        "body": {
          "zh": "newenvironment 的两个必选定义参数分别在 begin 和 end 处运行。环境本身形成分组，字体和长度的局部修改在结束后恢复。参数在起始定义中读取，结束代码通常不能直接重新使用参数标记。",
          "en": "The two definition arguments run at begin and end. The environment creates a group, so local font and length changes are restored afterward. Arguments are read in the opening definition; the closing definition normally cannot reuse parameter markers directly."
        }
      },
      {
        "title": {
          "zh": "现代参数规范",
          "en": "Modern argument signatures"
        },
        "body": {
          "zh": "NewDocumentEnvironment 使用与 NewDocumentCommand 相同的参数规范；起始和结束代码都可访问已读取的参数。正文不是普通参数，除非使用明确的正文捕获类型；捕获原样文本仍需专用读取机制。",
          "en": "NewDocumentEnvironment uses the document-command signatures, and both opening and closing code can access its arguments. The body is not an ordinary argument unless an explicit body-capture type is used; literal text still requires specialized reading."
        }
      },
      {
        "title": {
          "zh": "定理系统的区别",
          "en": "Theorem environments are separate"
        },
        "body": {
          "zh": "newtheorem 创建编号和样式管理的定理环境；它比用 newenvironment 手写“定理 1”更适合交叉引用。证明环境使用 amsthm 的 proof。自定义环境应调用现有语义环境，避免绕开计数器。",
          "en": "newtheorem creates numbered theorem environments with style management and is preferable to manually writing “Theorem 1”. amsthm supplies proof. Build custom environments on established semantic environments instead of bypassing counters."
        }
      }
    ],
    "example": "ex-programming-macros",
    "packages": [],
    "level": "advanced",
    "related": [
      "programming-document-commands",
      "programming-counters"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-lowlevel",
    "module": "programming",
    "title": {
      "zh": "def、let、展开与分组",
      "en": "def, let, expansion, and grouping"
    },
    "summary": {
      "zh": "低层定义工具需要明确区分替换文本、当前含义和展开时机。",
      "en": "Low-level definitions distinguish replacement text, current meaning, and expansion timing."
    },
    "syntax": "\\def\\foo#1{...}\\let\\bar\\foo\\begingroup...\\endgroup",
    "sections": [
      {
        "title": {
          "zh": "def 与 let",
          "en": "def and let"
        },
        "body": {
          "zh": "def 定义替换文本和参数模式，不检查命令是否已存在。let 将一个控制序列当前的含义赋给另一个；以后重定义原命令不会自动更新别名。初学者通常使用 newcommand 的错误检查更稳妥。",
          "en": "def defines replacement text and a parameter pattern without checking for an existing name. let assigns the current meaning of one control sequence to another; later redefinition of the original does not update the alias. newcommand supplies useful checks for ordinary author macros."
        }
      },
      {
        "title": {
          "zh": "展开不是执行所有内容",
          "en": "Expansion is not arbitrary execution"
        },
        "body": {
          "zh": "TeX 会按上下文展开宏；排版赋值等操作不一定可展开。edef 在定义时尽量展开内容，可能意外展开 fragile 命令。需要可展开接口时应查阅 expl3 的函数属性和变体说明。",
          "en": "TeX expands macros according to context. Assignments and typesetting operations are not generally expandable. edef expands while defining and can expand fragile commands unexpectedly. Consult expl3 function properties and variants when an expandable interface is needed."
        }
      },
      {
        "title": {
          "zh": "局部与全局修改",
          "en": "Local and global changes"
        },
        "body": {
          "zh": "花括号或 begingroup/endgroup 限定多数赋值的作用域。global 使赋值越过分组，但会增加追踪难度。用受保护命令和现代 hook 接口扩展类，避免重写内核输出例程。",
          "en": "Braces or begingroup/endgroup scope most assignments. global makes an assignment persist beyond the group but complicates tracking. Use protected commands and modern hooks to extend a class instead of rewriting its output routine."
        }
      }
    ],
    "example": "ex-programming-macros",
    "packages": [],
    "level": "advanced",
    "related": [
      "programming-newcommand",
      "programming-expl3",
      "error-capacity"
    ],
    "sources": [
      {
        "label": "LaTeX3 interfaces",
        "url": "https://mirrors.ctan.org/macros/latex/required/l3kernel/interface3.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-counters",
    "module": "programming",
    "title": {
      "zh": "长度、计数器与条件判断",
      "en": "Lengths, counters, and conditionals"
    },
    "summary": {
      "zh": "将尺寸和编号保存为命名对象，使模板可配置且可引用。",
      "en": "Store dimensions and numbers as named objects for configurable, referenceable templates."
    },
    "syntax": "\\newlength{\\panelwidth}\\setlength{\\panelwidth}{.45\\linewidth}\\newcounter{step}\\refstepcounter{step}",
    "sections": [
      {
        "title": {
          "zh": "长度和单位",
          "en": "Lengths and units"
        },
        "body": {
          "zh": "newlength 创建长度，setlength 赋值，addtolength 增加尺寸。pt、mm 是绝对单位，em/ex 随当前字体变化。dimexpr 可执行长度运算，末尾使用 relax 清楚终止表达式。",
          "en": "newlength creates a length, setlength assigns it, and addtolength increases it. pt and mm are absolute; em and ex depend on the current font. dimexpr performs dimension arithmetic, with relax clearly ending the expression."
        }
      },
      {
        "title": {
          "zh": "计数与交叉引用",
          "en": "Counters and references"
        },
        "body": {
          "zh": "newcounter 可指定父计数器，使父级增加时子级归零。stepcounter 递增，refstepcounter 还设置随后 label 的引用目标。thecounter 的表示方式与整数值不同。",
          "en": "newcounter can name a parent that resets the child when incremented. stepcounter increments; refstepcounter also prepares the following label for a reference. The printed thecounter representation differs from the stored integer."
        }
      },
      {
        "title": {
          "zh": "条件与现代接口",
          "en": "Conditionals and modern interfaces"
        },
        "body": {
          "zh": "newif 定义布尔开关，ifnum 比较整数，ifdim 比较尺寸。条件必须用 fi 结束。expl3 的 int_compare:nNnTF 和 dim_compare:nNnTF 提供明确接口；应避免混淆整数和尺寸比较。",
          "en": "newif defines a boolean switch, ifnum compares integers, and ifdim compares dimensions. Close primitive conditionals with fi. expl3 int_compare:nNnTF and dim_compare:nNnTF provide explicit interfaces and help distinguish integer from dimension comparisons."
        }
      }
    ],
    "example": "ex-programming-macros",
    "packages": [],
    "level": "advanced",
    "related": [
      "programming-expl3",
      "layout-enumitem"
    ],
    "sources": [
      {
        "label": "LaTeX3 interfaces",
        "url": "https://mirrors.ctan.org/macros/latex/required/l3kernel/interface3.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-expl3",
    "module": "programming",
    "title": {
      "zh": "LaTeX3 / expl3 编程基础",
      "en": "LaTeX3 / expl3 programming basics"
    },
    "summary": {
      "zh": "expl3 提供类型明确的变量、函数命名约定和参数展开接口。",
      "en": "expl3 supplies typed variables, function naming conventions, and argument-expansion interfaces."
    },
    "syntax": "\\ExplSyntaxOn\\cs_new_protected:Npn \\atelier_list:n #1 {...}\\ExplSyntaxOff",
    "sections": [
      {
        "title": {
          "zh": "语法区与命名",
          "en": "Syntax regions and naming"
        },
        "body": {
          "zh": "ExplSyntaxOn 让下划线和冒号可用于命令名，并改变空格读取规则；ExplSyntaxOff 恢复普通语法。函数名用模块前缀，避免与其他宏包冲突。变量名的 l/g 表明局部或全局约定，类型后缀如 tl、int、seq 表明用途。",
          "en": "ExplSyntaxOn permits underscores and colons in command names and changes space handling; ExplSyntaxOff restores ordinary syntax. Use a module prefix to avoid collisions. Variable names conventionally use l/g for local/global and suffixes such as tl, int, and seq for type."
        }
      },
      {
        "title": {
          "zh": "签名与展开",
          "en": "Signatures and expansion"
        },
        "body": {
          "zh": "冒号后的 N 接一个不带花括号的 token，n 接不展开的花括号内容，V 取变量值，e 按规则展开参数。变体名称是接口的一部分，不能任意替换字母后假设该函数存在。",
          "en": "N after the colon takes one unbraced token, n a braced unexpanded argument, V a variable’s value, and e an expanded argument. Variants are part of the interface; changing signature letters does not guarantee an existing function."
        }
      },
      {
        "title": {
          "zh": "列表映射示例",
          "en": "A list-mapping example"
        },
        "body": {
          "zh": "clist_map_inline:nn 对逗号列表每项执行代码。在另一个函数定义内映射时用 ##1 引用列表元素。文档用户仍使用普通的 AtelierList{...} 命令，内部实现保持隔离。",
          "en": "clist_map_inline:nn runs code for each comma-list item. Inside an enclosing function definition, ##1 refers to the mapped item. Users call an ordinary AtelierList{...} command while the internal implementation remains separate."
        }
      },
      {
        "title": {
          "zh": "受保护与可展开",
          "en": "Protected and expandable functions"
        },
        "body": {
          "zh": "cs_new_protected:Npn 适合含排版或赋值操作的函数。纯展开计算使用手册标明可展开的函数。这里的保护控制 TeX 在特定上下文中的展开行为，与安全沙箱是不同概念。",
          "en": "cs_new_protected:Npn suits functions containing typesetting or assignments. For expansion-only computation, use functions documented as expandable. Protection controls TeX expansion in specific contexts and is distinct from a security sandbox."
        }
      },
      {
        "title": {
          "zh": "学习范围与调试",
          "en": "Scope of learning and diagnosis"
        },
        "body": {
          "zh": "从 tl、int、clist 开始，再按需要学习 seq、prop、keys 和 message。interface3 记录公开接口；带双下划线的函数属于内部实现，可能随版本变化。用短测试确认各函数的作用域和参数类型。",
          "en": "Begin with tl, int, and clist, then learn seq, prop, keys, and message as needed. interface3 documents the public interface; double-underscore functions are internal and may change between versions. Test scope and argument types in short examples."
        }
      }
    ],
    "example": "ex-programming-expl3",
    "packages": [],
    "level": "advanced",
    "related": [
      "programming-document-commands",
      "programming-lowlevel",
      "programming-package-class"
    ],
    "sources": [
      {
        "label": "LaTeX3 interfaces",
        "url": "https://mirrors.ctan.org/macros/latex/required/l3kernel/interface3.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "programming-package-class",
    "module": "programming",
    "title": {
      "zh": "自定义 .sty、.cls 与模板复用",
      "en": "Custom .sty, .cls, and reusable templates"
    },
    "summary": {
      "zh": "宏包添加功能，文档类选择整体结构；共享代码应放在合适层次。",
      "en": "Packages add features while classes choose the overall structure; place shared code at the appropriate level."
    },
    "syntax": "\\ProvidesPackage{ateliernotes}[date description]\\RequirePackage{xcolor}\\ProvidesClass{atelierreport}\\LoadClass{article}",
    "sections": [
      {
        "title": {
          "zh": "宏包文件",
          "en": "Package files"
        },
        "body": {
          "zh": "sty 文件用 NeedsTeXFormat 和 ProvidesPackage 声明格式与身份，再用 RequirePackage 载入依赖。endinput 结束读取。让公开命令名称清楚，避免定义一个与常见宏包重复的通用命令。",
          "en": "A sty file declares its format and identity with NeedsTeXFormat and ProvidesPackage, then loads dependencies with RequirePackage. endinput stops reading. Give public commands clear names that do not collide with common packages."
        }
      },
      {
        "title": {
          "zh": "文档类文件",
          "en": "Class files"
        },
        "body": {
          "zh": "cls 文件用 ProvidesClass 标识身份，以 LoadClass 继承 article 等基础类。DeclareOption* 与 PassOptionsToClass 转发未知选项，ProcessOptions 后再调用 LoadClass。共享数学记号通常放在宏包中。",
          "en": "A cls file declares its identity with ProvidesClass and inherits a base such as article through LoadClass. DeclareOption* and PassOptionsToClass forward unknown options, with ProcessOptions before LoadClass. Shared mathematical notation usually belongs in a package."
        }
      },
      {
        "title": {
          "zh": "分发与调试",
          "en": "Distribution and diagnosis"
        },
        "body": {
          "zh": "先将 sty/cls 放在主文件目录测试，稳定后再安装到本地 TEXMF 树。记录版本、依赖与引擎，连同主 tex 一起提供所需的独立文件。保留发行版文件原样，项目修改放在独立的 sty/cls 中。",
          "en": "Test sty/cls files beside the main document before installing them in a local TEXMF tree. Record versions, dependencies, and engines, and deliver required companion files with the main tex. Keep distribution files unchanged and put project changes in separate sty/cls files."
        }
      },
      {
        "title": {
          "zh": "模板升级",
          "en": "Template upgrades"
        },
        "body": {
          "zh": "将内容与版式分开，项目配置集中在一个文件。类升级时检查选项转发、标题、目录和引用；用一份代表性文档作为回归样稿。journal 的官方类有专属接口，应从它继承或直接使用。",
          "en": "Separate content from layout and centralize project configuration. On a class upgrade, inspect option forwarding, titles, contents, and references with a representative document. A journal’s class has its own interface; use or inherit it appropriately."
        }
      },
      {
        "title": {
          "zh": "选项设计",
          "en": "Option design"
        },
        "body": {
          "zh": "共享包需要选项时，为默认行为、合法值和作用范围写清说明。类的未知选项可转发到父类，宏包未知选项则应通过消息指出。复杂键值配置可使用 expl3 的 keys 接口。",
          "en": "Document defaults, allowed values, and scope for package options. Forward unknown class options to the base class where appropriate; a package should report unknown options clearly. Use expl3 keys for substantial key-value configuration."
        }
      }
    ],
    "example": "ex-custom-package",
    "packages": [],
    "level": "advanced",
    "related": [
      "project-multifile",
      "project-reproducibility",
      "programming-newcommand"
    ],
    "sources": [
      {
        "label": "LaTeX class and package guide",
        "url": "https://www.latex-project.org/help/documentation/clsguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "error-undefined-command",
    "module": "errors",
    "title": {
      "zh": "Undefined control sequence：未定义命令",
      "en": "Undefined control sequence: unknown command"
    },
    "summary": {
      "zh": "TeX 读到一个当前没有定义的控制序列。",
      "en": "TeX encountered a control sequence that has not been defined."
    },
    "syntax": "! Undefined control sequence.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：TeX 读到一个当前没有定义的控制序列。",
          "en": "Error: TeX encountered a control sequence that has not been defined."
        },
        "code": "! Undefined control sequence."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "正文用了 mathbb，导言区缺少提供该命令的宏包。",
          "en": "The body uses mathbb without loading a package that defines it."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n$\\mathbb{R}$\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "常见原因是命令拼错、缺少宏包或使用了另一套引用/算法系统的命令。例子中的 mathbb 需要 amssymb 或其他提供相同接口的宏包。",
          "en": "Common causes are a misspelling, a missing package, or a command from another citation or algorithm system. The example mathbb needs amssymb or another provider."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 找到日志里第一条 Undefined control sequence。\n\n2. 查看下一行展示的具体命令并核对拼写。\n\n3. 查明命令所属宏包，在导言区加载；如果属于另一套系统则改用当前系统的接口。",
          "en": "1. Locate the first occurrence in the log.\n\n2. Identify the command shown on the following line and check spelling.\n\n3. Load its provider in the preamble or use the interface of the selected system."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "导言区加载 amssymb 后，mathbb 可以输出黑板粗体。使用 pdflatex 编译。",
          "en": "Loading amssymb supplies mathbb for the blackboard-bold alphabet. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{amssymb}\n\\begin{document}\n$\\mathbb{R}$\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "为共享命令记录提供它的宏包与适用模式。切换引用或算法系统后，逐项核对旧命令并改为当前系统支持的接口。",
          "en": "Record each shared command’s provider and mode. After changing citation or algorithm systems, check old commands and convert them to the supported interface."
        }
      }
    ],
    "packages": [
      "amssymb"
    ],
    "level": "beginner",
    "related": [
      "programming-newcommand"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! Undefined control sequence.",
      "Error"
    ]
  },
  {
    "id": "error-missing-math",
    "module": "errors",
    "title": {
      "zh": "Missing $ inserted：数学模式不匹配",
      "en": "Missing $ inserted: math-mode mismatch"
    },
    "summary": {
      "zh": "TeX 尝试补一个数学分隔符，原代码往往在文本中用了数学专用字符。",
      "en": "TeX tried to insert a math delimiter, often because text contains a math-only token."
    },
    "syntax": "! Missing $ inserted.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：TeX 尝试补一个数学分隔符，原代码往往在文本中用了数学专用字符。",
          "en": "Error: TeX tried to insert a math delimiter, often because text contains a math-only token."
        },
        "code": "! Missing $ inserted."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "文件名 data_2026.csv 直接写在文本中，_ 被读作数学下标。",
          "en": "The filename data_2026.csv appears in text, where _ is read as a mathematical subscript."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nThe file is data_2026.csv.\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "文本下划线、上标符号或数学命令在文本模式中会触发错误；反过来，未关闭数学模式也会影响后续文本。",
          "en": "An underscore, superscript, or math command in text can trigger this error. An unclosed math delimiter can also affect later text."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 检查错误位置的 _、^ 和数学命令。\n\n2. 公式使用成对的数学分隔符，文件名使用转义或 verb。\n\n3. 回看前面的分隔符，核对配对位置后再编译。",
          "en": "1. Inspect underscores, superscripts, and math commands at the reported location.\n\n2. Use paired math delimiters for formulas and escaping or verb for filenames.\n\n3. Check where earlier delimiters open and close, then compile again."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "文件名的下划线改为转义字符，变量 x_i 放进数学模式。使用 pdflatex 编译。",
          "en": "The filename escapes its underscore, while the variable x_i uses math mode. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nThe file is \\texttt{data\\_2026.csv}. The parameter is $x_i$.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "文件名、网址和程序标识符属于文本，变量的下标属于数学。为这两种内容分别选接口，可以避免同一字符在不同模式中反复出错。",
          "en": "Treat filenames, URLs, and identifiers as text, and subscripts on variables as math. Separate interfaces prevent mode-dependent character mistakes."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "code-verbatim"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! Missing $ inserted.",
      "Error"
    ]
  },
  {
    "id": "error-alignment-tab",
    "module": "errors",
    "title": {
      "zh": "Extra alignment tab：列数超出定义",
      "en": "Extra alignment tab: too many columns"
    },
    "summary": {
      "zh": "一个对齐行中的分隔符数量超过所声明的列数。",
      "en": "A row contains more alignment separators than the declared columns."
    },
    "syntax": "! Extra alignment tab has been changed to \\cr.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：一个对齐行中的分隔符数量超过所声明的列数。",
          "en": "Error: A row contains more alignment separators than the declared columns."
        },
        "code": "! Extra alignment tab has been changed to \\cr."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "tabular 声明两列，正文一行却有三个单元格。",
          "en": "tabular declares two columns, but the row contains three cells."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\begin{tabular}{ll}A & B & C\\\\\\end{tabular}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "两列 tabular 一行只允许一个结构性 &。文本中的 & 未转义也会被当成列分隔符；矩阵和 align 中也有各自的列规则。",
          "en": "A two-column tabular row allows one structural &. An unescaped ampersand in text becomes a separator. Matrices and align also have their own alignment rules."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 数清列格式中的有效列。\n\n2. 检查每行的 &，把普通文本中的 & 改成反斜线转义。\n\n3. 修正列数或单元格数；multicolumn 的跨度也要计入。",
          "en": "1. Count effective columns in the specification.\n\n2. Inspect every & and escape literal ampersands.\n\n3. Correct the specification or cells, accounting for multicolumn spans."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "列格式扩展为三列，R&D 中的文字 ampersand 经过转义。使用 pdflatex 编译。",
          "en": "The specification has three columns, and the literal ampersand in R&D is escaped. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\begin{tabular}{lll}A & B & C\\\\R\\&D & 2 & 3\\\\\\end{tabular}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "编辑表格时按一行一行保存源码，保留清楚的列边界。包含机构名 R&D 等文字时显式转义，新增列后同步更新列格式和表头。",
          "en": "Keep table rows legible in the source. Escape literal ampersands in names such as R&D, and update the specification and header whenever adding a column."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! Extra alignment tab has been changed to \\cr.",
      "Error"
    ]
  },
  {
    "id": "error-file-not-found",
    "module": "errors",
    "title": {
      "zh": "File not found：缺失输入文件",
      "en": "File not found: missing input"
    },
    "summary": {
      "zh": "LaTeX 找不到请求读取的文件。",
      "en": "LaTeX cannot locate the requested input file."
    },
    "syntax": "! LaTeX Error: File `missing.tex' not found.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：LaTeX 找不到请求读取的文件。",
          "en": "Error: LaTeX cannot locate the requested input file."
        },
        "code": "! LaTeX Error: File `missing.tex' not found."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "input 请求读取 missing.tex，但这个文件没有随主文件提供。",
          "en": "input requests missing.tex, which is absent from the project."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\input{missing}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "文件名、扩展名、大小写或相对路径可能错误，也可能只复制了主 tex 而没有附带资源。宏包缺失时消息中的文件通常为 sty 或 cls。",
          "en": "The name, extension, case, or relative path may be wrong, or a copied project may lack companion files. Missing packages normally identify a sty or cls file."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 识别缺失的是项目文件还是宏包。\n\n2. 从主文件目录检查精确名称和大小写。\n\n3. 恢复项目资源；宏包则用发行版管理器安装，不能通过忽略错误生成有效文档。",
          "en": "1. Determine whether the file is project content or a package.\n\n2. Check its exact name and case relative to the main file directory.\n\n3. Restore companion resources or install the package with the distribution manager."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿将短段落放回主文件，可独立编译。多文件版本需同时提供被载入的文件。使用 pdflatex 编译。",
          "en": "The repair keeps the short passage in the main file for a standalone build. A multifile version needs its companion inputs. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\section{Methods}This standalone repair keeps the short content in the main file.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "在干净目录验证压缩包，能够发现本机路径依赖。主文件、章节、样式和数据应一同打包；安装在个人 TEXMF 中的样式也要在构建说明中注明。",
          "en": "Build the archive in a clean directory to expose local-path dependencies. Package content, styles, and data together and document styles installed only in a personal TEXMF tree."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "project-multifile"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: File `missing.tex' not found.",
      "Error"
    ]
  },
  {
    "id": "error-environment",
    "module": "errors",
    "title": {
      "zh": "Environment undefined：环境未定义",
      "en": "Environment undefined: missing environment"
    },
    "summary": {
      "zh": "当前格式或宏包没有定义所请求的环境。",
      "en": "The current format and packages do not define the requested environment."
    },
    "syntax": "! LaTeX Error: Environment align undefined.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：当前格式或宏包没有定义所请求的环境。",
          "en": "Error: The current format and packages do not define the requested environment."
        },
        "code": "! LaTeX Error: Environment align undefined."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "正文使用 align，导言区没有加载 amsmath。",
          "en": "The body uses align without loading amsmath."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\begin{align}a&=b+c\\end{align}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "环境名区分大小写；align 属于 amsmath。algpseudocode 和算法浮动体、Verbatim 和 verbatim 等名称相近，但来自不同接口。",
          "en": "Environment names are case-sensitive; align comes from amsmath. Algorithm floats and algpseudocode, or Verbatim and verbatim, belong to different interfaces."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 核对 begin/end 的名称、大小写和拼写。\n\n2. 找到定义环境的宏包并加载。\n\n3. 检查它与当前文档类和排版系统是否兼容。",
          "en": "1. Check matching begin/end names, capitalization, and spelling.\n\n2. Load the package that defines the environment.\n\n3. Check its compatibility with the selected class and typesetting system."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "导言区加入 amsmath，align 便能按等号对齐公式。使用 pdflatex 编译。",
          "en": "Adding amsmath defines align and lets the equations align at the equals sign. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\begin{align}a&=b+c\\end{align}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "环境名称同时出现在 begin 与 end，编辑器的括号匹配只能检查配对，不会证明环境已定义。维护依赖清单能让环境提供者清楚可见。",
          "en": "Matching begin/end names does not prove that an environment exists. Keep a dependency list that identifies its provider."
        }
      }
    ],
    "packages": [
      "amsmath"
    ],
    "level": "beginner",
    "related": [],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: Environment align undefined.",
      "Error"
    ]
  },
  {
    "id": "error-option-clash",
    "module": "errors",
    "title": {
      "zh": "Option clash for package：重复选项",
      "en": "Option clash for package: conflicting loads"
    },
    "summary": {
      "zh": "已加载的宏包再次收到当初没有启用的加载选项。",
      "en": "An already-loaded package received options not enabled at its first load."
    },
    "syntax": "! LaTeX Error: Option clash for package xcolor.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：已加载的宏包再次收到当初没有启用的加载选项。",
          "en": "Error: An already-loaded package received options not enabled at its first load."
        },
        "code": "! LaTeX Error: Option clash for package xcolor."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "第一次加载 xcolor 时没有 table 选项，第二次加载才要求启用它。",
          "en": "The first xcolor load omits table; the second load requests it."
        },
        "code": "\\documentclass{article}\n\\usepackage{xcolor}\\usepackage[table]{xcolor}\n\\begin{document}\nText.\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "类或其他宏包可能提前加载依赖。第二次 usepackage 不能重新初始化宏包选项。Beamer 预加载 xcolor 和 hyperref 是常见触发场景。",
          "en": "A class or another package may have loaded the dependency first. A second usepackage cannot reinitialize options. Beamer’s early xcolor and hyperref loads are common triggers."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 搜索所有加载该宏包的位置，包括文档类。\n\n2. 合并普通重复加载。\n\n3. 需要预传选项时把 PassOptionsToPackage 放在 documentclass 前；运行时可配置的属性用专属 setup 命令。",
          "en": "1. Find every load, including class dependencies.\n\n2. Merge ordinary duplicate loads.\n\n3. If options must arrive early, place PassOptionsToPackage before documentclass; use a setup command for runtime-configurable properties."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "将两次加载合并为一次带 table 选项的加载，表格行着色便有对应支持。使用 pdflatex 编译。",
          "en": "One xcolor load with the table option supplies row-coloring support. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\\usepackage[table]{xcolor}\n\\begin{document}\n\\begin{tabular}{ll}\\rowcolor{teal!10}A&B\\\\\\end{tabular}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "宏包加载与运行时配置要分开。把必须在首次加载时给出的选项集中管理，颜色和链接等可后改属性使用宏包 setup 接口。",
          "en": "Separate package loading from runtime configuration. Centralize first-load options and use setup interfaces for later-adjustable properties."
        }
      }
    ],
    "packages": [
      "xcolor"
    ],
    "level": "beginner",
    "related": [
      "fonts-color",
      "beamer-themes"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: Option clash for package xcolor.",
      "Error"
    ]
  },
  {
    "id": "error-missing-document",
    "module": "errors",
    "title": {
      "zh": "Missing begin document：导言区混入正文",
      "en": "Missing begin document: body text in the preamble"
    },
    "summary": {
      "zh": "正文被过早读入，或导言区结构被前面的语法错误破坏。",
      "en": "Body material was encountered too early, or an earlier syntax error damaged the preamble."
    },
    "syntax": "! LaTeX Error: Missing \\begin{document}.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：正文被过早读入，或导言区结构被前面的语法错误破坏。",
          "en": "Error: Body material was encountered too early, or an earlier syntax error damaged the preamble."
        },
        "code": "! LaTeX Error: Missing \\begin{document}."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "普通句子出现在 begin document 之前，被当作导言区内容读取。",
          "en": "A plain sentence appears before begin document and is read as preamble content."
        },
        "code": "\\documentclass{article}\nThis sentence is outside the document.\n\\begin{document}Body.\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "常见原因是忘记 begin document、导言区出现普通文字、命令花括号缺失或错误拼写导致剩余字母被当成正文。",
          "en": "Common causes are an omitted begin document, plain text in the preamble, a missing brace, or a misspelled command leaving letters as text."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 确认 documentclass 与 begin document 的顺序。\n\n2. 导言区只保留类、宏包和配置命令。\n\n3. 检查报错前一条命令的括号和拼写。",
          "en": "1. Check documentclass and begin document order.\n\n2. Keep class, package, and configuration commands in the preamble.\n\n3. Inspect braces and spelling in the preceding command."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "句子移入 document 环境，导言区保留文档类声明。使用 pdflatex 编译。",
          "en": "The sentence moves inside document, leaving the class declaration in the preamble. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nThis sentence belongs inside the document.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "共享 preamble.tex 只保存导言区命令，章节文件只保存正文。模板初次运行就验证边界，比在大型项目中追查被意外读入的文字更容易。",
          "en": "Keep only setup commands in preamble.tex and body content in chapter files. Validate these boundaries when creating the template."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: Missing \\begin{document}.",
      "Error"
    ]
  },
  {
    "id": "error-overfull",
    "module": "errors",
    "title": {
      "zh": "Overfull hbox：内容超过行宽",
      "en": "Overfull hbox: material exceeds the line width"
    },
    "summary": {
      "zh": "一行或盒子比可用宽度更宽，通常仍会产生 PDF。",
      "en": "A line or box exceeds the available width; a PDF is normally still produced."
    },
    "syntax": "Overfull \\hbox (...pt too wide) in paragraph at lines ...",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "排版诊断：一行或盒子比可用宽度更宽，通常仍会产生 PDF。",
          "en": "Typesetting diagnostic: A line or box exceeds the available width; a PDF is normally still produced."
        },
        "code": "Overfull \\hbox (...pt too wide) in paragraph at lines ..."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "makebox 的宽度设为 textwidth 的两倍，超过页面正文宽度。",
          "en": "The makebox width is twice textwidth and exceeds the text area."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\noindent\\makebox[2\\textwidth][l]{This box is deliberately too wide.}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "不可断行的 URL、长公式、过宽表格或错误的 linewidth 基准都可能造成溢出。pt 数值表示超出的宽度。",
          "en": "An unbreakable URL, long equation, wide table, or incorrect linewidth basis can overflow. The pt value measures the excess."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 按日志行号查看 PDF 对应位置。\n\n2. URL 使用 xurl，长公式拆行，宽表减少列宽或安排横向页。\n\n3. 临时设置 overfullrule 显示溢出边界，结合实际排版调整内容。",
          "en": "1. Inspect the PDF at the reported location.\n\n2. Use xurl for URLs, split long equations, and reduce table width or use landscape.\n\n3. Temporarily set overfullrule to expose overflow, then adjust the content after inspecting the page."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿用宽度为 .8\\linewidth 的 parbox，让文字在局部宽度内断行。使用 pdflatex 编译。",
          "en": "A parbox of width .8\\linewidth lets the text wrap within the local width. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\noindent\\parbox{.8\\linewidth}{This box uses the width of its local context and permits normal line breaking.}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "窄栏、旁注和幻灯片的可用宽度不同，复用内容时要重新检查。最终 PDF 中的边界比日志数量更能说明问题是否影响交付。",
          "en": "Recheck reused content in narrow columns, margin notes, and slides. Inspect the PDF boundary to judge the practical effect of a diagnostic."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "layout-microtype",
      "layout-columns"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "Overfull \\hbox (...pt too wide) in paragraph at lines ...",
      "Typesetting diagnostic / 排版诊断"
    ]
  },
  {
    "id": "error-underfull",
    "module": "errors",
    "title": {
      "zh": "Underfull hbox：行间空白过松",
      "en": "Underfull hbox: a poorly filled line"
    },
    "summary": {
      "zh": "断行后这一行的水平空白分配不理想；它不一定是编译错误。",
      "en": "The chosen line has poor horizontal spacing; this is not necessarily a compilation failure."
    },
    "syntax": "Underfull \\hbox (badness 10000) in paragraph at lines ...",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "排版诊断：断行后这一行的水平空白分配不理想；它不一定是编译错误。",
          "en": "Typesetting diagnostic: The chosen line has poor horizontal spacing; this is not necessarily a compilation failure."
        },
        "code": "Underfull \\hbox (badness 10000) in paragraph at lines ..."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "30mm 窄文本框中插入强制换行，使短行的两端对齐空白过松。",
          "en": "A forced break in a 30mm text box leaves a short justified line with loose spacing."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\noindent\\parbox{30mm}{Short words forced\\\\onto a short line.}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "强制换行、窄栏、无法断词的单词或过多空白可能触发。badness 衡量排版代价，不是错误数量。",
          "en": "Forced line breaks, narrow columns, unhyphenated words, or excessive space can trigger the message. badness measures spacing cost, not the number of errors."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 查看实际 PDF，判断是否影响阅读。\n\n2. 去掉不必要的强制换行，让 TeX 自动断行。\n\n3. 确实需要窄栏时使用合理的 raggedright，或设置语言断词规则。",
          "en": "1. Inspect the PDF and assess readability.\n\n2. Remove unnecessary forced breaks.\n\n3. For genuinely narrow text, use raggedright or appropriate language hyphenation."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿去掉强制换行，并在窄文本框内使用 raggedright。使用 pdflatex 编译。",
          "en": "The repair removes the forced break and uses raggedright in the narrow box. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\noindent\\parbox{30mm}{\\raggedright Short words in a narrow text column.}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "左对齐文字、手动断行和短末行可以产生可接受的疏松诊断。根据实际页面决定是否修复，不需把每一条排版诊断都改成零。",
          "en": "Ragged text, manual breaks, and short lines can yield acceptable spacing diagnostics. Decide from the page rather than requiring every diagnostic to disappear."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "layout-paragraphs"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "Underfull \\hbox (badness 10000) in paragraph at lines ...",
      "Typesetting diagnostic / 排版诊断"
    ]
  },
  {
    "id": "error-capacity",
    "module": "errors",
    "title": {
      "zh": "TeX capacity exceeded：资源耗尽",
      "en": "TeX capacity exceeded: resource exhaustion"
    },
    "summary": {
      "zh": "TeX 达到内部资源上限；递归失控是常见原因。",
      "en": "TeX reached an internal resource limit; runaway recursion is a common cause."
    },
    "syntax": "! TeX capacity exceeded, sorry [input stack size=...].",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：TeX 达到内部资源上限；递归失控是常见原因。",
          "en": "Error: TeX reached an internal resource limit; runaway recursion is a common cause."
        },
        "code": "! TeX capacity exceeded, sorry [input stack size=...]."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "again 的替换文本仍是 again，展开会不断调用自身。",
          "en": "again expands to again, so expansion repeatedly calls itself."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\def\\again{\\again}\\again\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "宏直接或间接调用自己且没有终止条件会填满输入栈。极大的 TikZ 图或深层嵌套也可能耗尽其他资源，括号缺失则可能导致 runaway argument。",
          "en": "A macro calling itself without a termination condition fills the input stack. Very large TikZ drawings or deep nesting may exhaust other resources; missing braces can produce a runaway argument."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 阅读方括号中的资源名称，分清栈、内存或其他限制。\n\n2. 将新增宏缩减到最小例子，追踪调用链。\n\n3. 先修复递归或分拆大型图形，再评估是否需要调整资源。",
          "en": "1. Read the resource name in brackets to distinguish stack, memory, and other limits.\n\n2. Reduce new macros to a minimal example and trace their calls.\n\n3. Fix recursion or split large drawings before assessing resource changes."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "again 改为有限的文字定义，调用可以正常结束。使用 pdflatex 编译。",
          "en": "again has a finite text definition, so the call terminates. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\newcommand{\\again}{A finite message.}\\again\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "为递归宏写清终止条件，避免用同名变量覆盖命令。大型图形分拆后保存中间矢量结果，也能降低每次完整编译的资源消耗。",
          "en": "Give recursive macros an explicit stopping condition and avoid overwriting commands with variable names. Splitting a large graphic and saving vector intermediates also reduces build cost."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "programming-lowlevel",
      "programming-expl3"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! TeX capacity exceeded, sorry [input stack size=...].",
      "Error"
    ]
  },
  {
    "id": "error-font",
    "module": "errors",
    "title": {
      "zh": "fontspec 字体找不到",
      "en": "A font cannot be found by fontspec"
    },
    "summary": {
      "zh": "字体选择器无法找到指定的字体名称或文件。",
      "en": "The font selector cannot locate the requested font name or file."
    },
    "syntax": "Package fontspec Error: The font \"Nonexistent Atelier Font\" cannot be found.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：字体选择器无法找到指定的字体名称或文件。",
          "en": "Error: The font selector cannot locate the requested font name or file."
        },
        "code": "Package fontspec Error: The font \"Nonexistent Atelier Font\" cannot be found."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "setmainfont 指定一个不存在的字体名称。",
          "en": "setmainfont requests a font name that does not exist."
        },
        "code": "\\documentclass{article}\n\\usepackage{fontspec}\\setmainfont{Nonexistent Atelier Font}\n\\begin{document}\nText.\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "字体未安装、名称与文件名混淆、路径错误或字形文件缺失。系统中看得到一个字体，并不保证 TeX 引擎使用同一字体缓存。",
          "en": "The font may be absent, its name may be confused with a filename, or a path or shape file may be missing. A system font listing does not guarantee the engine uses the same cache."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 用简短 fontspec 文档验证精确名称。\n\n2. 尝试发行版提供的 Latin Modern；中文可测试 Fandol。\n\n3. 需要项目字体时按文件配置 Path，并核对许可和每种字形。",
          "en": "1. Test the exact name in a short fontspec document.\n\n2. Try distribution-provided Latin Modern, or Fandol for Chinese.\n\n3. For project fonts, configure the file Path and check licensing and all shapes."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿使用 TeX Gyre 的字体文件，并明确配置粗体和斜体。使用 xelatex 编译。",
          "en": "The repair uses TeX Gyre font files with explicit bold and italic mappings. Compile with xelatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{fontspec}\\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]\n\\begin{document}\nPortable text.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "按字体文件名配置通常比依赖系统显示名称更容易移植，但文件仍需实际安装或允许随项目分发。保存字体来源与加粗、斜体的明确映射。",
          "en": "File-based selection is often more portable than system display names, but the files still need installation or permitted redistribution. Record font provenance and explicit bold/italic mappings."
        }
      }
    ],
    "packages": [
      "fontspec"
    ],
    "level": "beginner",
    "related": [
      "fonts-fontspec",
      "beamer-chinese"
    ],
    "sources": [
      {
        "label": "fontspec documentation (CTAN)",
        "url": "https://ctan.org/pkg/fontspec"
      }
    ],
    "engines": [
      "xelatex"
    ],
    "keywords": [
      "Package fontspec Error: The font \"Nonexistent Atelier Font\" cannot be found.",
      "Error"
    ]
  },
  {
    "id": "error-image-path",
    "module": "errors",
    "title": {
      "zh": "图片路径和格式错误",
      "en": "Image paths and format errors"
    },
    "summary": {
      "zh": "graphicx 找不到可识别的图片文件。",
      "en": "graphicx cannot find a supported graphic file."
    },
    "syntax": "! LaTeX Error: File `missing-plot' not found.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：graphicx 找不到可识别的图片文件。",
          "en": "Error: graphicx cannot find a supported graphic file."
        },
        "code": "! LaTeX Error: File `missing-plot' not found."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "includegraphics 请求 missing-plot，但项目里没有该图片。",
          "en": "includegraphics requests missing-plot, but the project lacks that image."
        },
        "code": "\\documentclass{article}\n\\usepackage{graphicx}\n\\begin{document}\n\\includegraphics[width=.5\\linewidth]{missing-plot}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "路径相对主文件工作目录；文件大小写和扩展名必须匹配。pdfLaTeX 通常使用 PDF、PNG、JPEG，直接使用 SVG 需要转换工作流。",
          "en": "Paths are relative to the main file working directory and must match case and extension. pdfLaTeX normally accepts PDF, PNG, and JPEG; SVG needs a conversion workflow."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 从编译工作目录确认文件存在。\n\n2. 显式写受支持的扩展名并检查 graphicspath。\n\n3. 修复资源路径或将图形转成兼容格式；下面修复 MWE 使用内嵌 TikZ 避免外部文件。",
          "en": "1. Confirm the file exists from the compilation directory.\n\n2. Specify a supported extension and inspect graphicspath.\n\n3. Repair the resource or convert its format; the repaired MWE uses inline TikZ to remove the external file requirement."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿在主文件中用 TikZ 绘图，可直接编译。使用外部图片时仍需修正路径或格式。使用 pdflatex 编译。",
          "en": "The repair draws the figure with TikZ in the main file. An external-image version still needs a correct path and format. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{tikz}\n\\begin{document}\n\\begin{figure}\\centering\\begin{tikzpicture}\\draw[->](0,0)--(2,1);\\end{tikzpicture}\\caption{An inline vector illustration}\\end{figure}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "图片统一放在项目资源目录，采用稳定且大小写一致的文件名。记录 SVG/EPS 等格式转换步骤，避免只在一台电脑上保留转好的 PDF。",
          "en": "Keep graphics in a project asset directory with consistent case. Record SVG/EPS conversion steps rather than preserving converted PDFs only on one machine."
        }
      }
    ],
    "packages": [
      "tikz"
    ],
    "level": "beginner",
    "related": [
      "tikz-paths",
      "project-multifile"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: File `missing-plot' not found.",
      "Error"
    ]
  },
  {
    "id": "error-bibliography",
    "module": "errors",
    "title": {
      "zh": "参考文献不显示",
      "en": "Bibliography does not appear"
    },
    "summary": {
      "zh": "引用尚未由文献数据和处理器生成，或引用键不匹配。",
      "en": "The citation has not been resolved from bibliography data, or its key does not match."
    },
    "syntax": "LaTeX Warning: Citation `demo' on page 1 undefined.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "警告：引用尚未由文献数据和处理器生成，或引用键不匹配。",
          "en": "Warning: The citation has not been resolved from bibliography data, or its key does not match."
        },
        "code": "LaTeX Warning: Citation `demo' on page 1 undefined."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "cite 使用 demo 键，bibliography 请求 refs 数据，但尚未获得已解析的文献信息。",
          "en": "cite uses the demo key and bibliography requests refs data, without resolved bibliography information."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nA citation \\cite{demo}.\\bibliographystyle{plain}\\bibliography{refs}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "bib 文件缺失、键拼写错误、没有运行 BibTeX/Biber，或选错后端。Biber 读取 bcf，BibTeX 读取 aux；工具不能互换。",
          "en": "The bib file may be missing, the key misspelled, the processor not run, or the backend wrong. Biber reads bcf while BibTeX reads aux; they are not interchangeable."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 检查文献数据中的精确键。\n\n2. 根据系统运行 LaTeX→BibTeX/Biber→LaTeX→LaTeX。\n\n3. 阅读 blg 中的真正错误；切换系统后清理不兼容辅助文件。下面修复稿使用手工文献环境，独立编译两次即可。",
          "en": "1. Check the exact bibliography key.\n\n2. Run LaTeX, the correct processor, then LaTeX twice.\n\n3. Inspect blg for the actual error and clean incompatible auxiliary files after switching systems. The repaired manual bibliography needs only two LaTeX runs."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿把 demo 文献放在主文件的 thebibliography 中。运行 pdflatex 两次即可解析引用。",
          "en": "The repair defines demo in the main file’s thebibliography. Run pdflatex twice to resolve the citation."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nA citation \\cite{demo}.\n\\begin{thebibliography}{9}\\bibitem{demo}A. Author. \\emph{A Demonstration Book}. Example Press, 2026.\\end{thebibliography}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "构建说明明确写出 natbib/BibTeX 或 biblatex/Biber 等系统。保留 bib 数据与处理器日志；有些投稿平台还要求匹配的 bbl。",
          "en": "Name the bibliography system in build instructions, such as natbib/BibTeX or biblatex/Biber. Preserve bib data and processor logs; some platforms require the matching bbl."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "LaTeX Warning: Citation `demo' on page 1 undefined.",
      "Warning"
    ]
  },
  {
    "id": "error-reference",
    "module": "errors",
    "title": {
      "zh": "引用显示 ??",
      "en": "A cross-reference displays ??"
    },
    "summary": {
      "zh": "标签还没有写入并重新读取，或标签不存在。",
      "en": "The label has not yet been written and reread, or does not exist."
    },
    "syntax": "LaTeX Warning: Reference `sec:method' on page 1 undefined.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "警告：标签还没有写入并重新读取，或标签不存在。",
          "en": "Warning: The label has not yet been written and reread, or does not exist."
        },
        "code": "LaTeX Warning: Reference `sec:method' on page 1 undefined."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "ref 请求 sec:method，而定义的标签写成了 sec:methods。",
          "en": "ref requests sec:method, while the label is written as sec:methods."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nSee Section~\\ref{sec:method}.\\section{Method}\\label{sec:methods}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "首次编译尚未解析、label 名字拼错、includeonly 跳过新章节、标签放在错误计数器位置。caption 前的 label 可能抓到上一计数器。",
          "en": "A first run, misspelled labels, includeonly omitting a new chapter, or a label at the wrong counter can cause this. A label before caption may capture the previous counter."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 搜索 label 与 ref 的精确字符串。\n\n2. 把标签放在 section 或 caption 后；公式放在编号环境内。\n\n3. 重编译到引用稳定，若仍缺失则检查辅助文件和被跳过的输入。",
          "en": "1. Compare exact label and ref strings.\n\n2. Put labels after section/caption and inside numbered equation environments.\n\n3. Recompile until stable; if unresolved, inspect auxiliary files and omitted inputs."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "ref 与 label 统一为 sec:method，标签放在 section 后。运行 pdflatex 两次，让辅助文件中的编号生效。",
          "en": "ref and label use sec:method, with the label after section. Run pdflatex twice to read back the recorded number."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\nSee Section~\\ref{sec:method}.\\section{Method}\\label{sec:method}A matching label.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "采用 sec:、fig:、tab:、eq: 等语义前缀，但前缀不是命令类型检查。复制段落后检查标签唯一性，重编译到日志不再要求引用更新。",
          "en": "Prefixes such as sec:, fig:, tab:, and eq: improve organization but do not type-check labels. Check copied labels for uniqueness and recompile until references stabilize."
        }
      }
    ],
    "packages": [],
    "level": "beginner",
    "related": [
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "LaTeX Warning: Reference `sec:method' on page 1 undefined.",
      "Warning"
    ]
  },
  {
    "id": "error-equation-number",
    "module": "errors",
    "title": {
      "zh": "公式编号重复或异常",
      "en": "Duplicate or unexpected equation numbers"
    },
    "summary": {
      "zh": "同一标签被重复定义；编号异常也可能来自手工计数或不编号环境。",
      "en": "The same label is defined twice; numbering problems can also come from manual counters or unnumbered environments."
    },
    "syntax": "LaTeX Warning: Label `eq:model' multiply defined.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "警告：同一标签被重复定义；编号异常也可能来自手工计数或不编号环境。",
          "en": "Warning: The same label is defined twice; numbering problems can also come from manual counters or unnumbered environments."
        },
        "code": "LaTeX Warning: Label `eq:model' multiply defined."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "两个 equation 环境使用同一个 eq:model 标签。",
          "en": "Two equation environments use the same eq:model label."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n\\begin{equation}a=b\\label{eq:model}\\end{equation}\\begin{equation}c=d\\label{eq:model}\\end{equation}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "标签复用、tag 手工覆盖编号、equation* 中放标签或手工 setcounter 都可能造成结果与预期不符。重复视觉编号未必产生错误消息。",
          "en": "Reused labels, manual tag, labels in equation*, or manual setcounter changes can mislead references. Duplicate printed numbers may produce no error message."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 查找重复 label，并给每个公式唯一名称。\n\n2. 确认 equation/align 与星号版本的编号区别。\n\n3. 若需按节编号，用 amsmath 的 numberwithin，避免逐条手写 tag。",
          "en": "1. Find repeated labels and assign unique names.\n\n2. Check numbered equation/align against starred variants.\n\n3. Use amsmath numberwithin for section numbering rather than manually tagging each equation."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "每个公式使用唯一标签，并用 amsmath 的 numberwithin 按节编号。运行 pdflatex 两次，再检查 eqref 输出。",
          "en": "Each equation has a unique label, and amsmath numberwithin numbers by section. Run pdflatex twice and check eqref output."
        },
        "code": "\\documentclass{article}\n\\usepackage{amsmath}\\numberwithin{equation}{section}\n\\begin{document}\n\\section{Model}\\begin{equation}a=b\\label{eq:first}\\end{equation}\n\\begin{equation}c=d\\label{eq:second}\\end{equation}\nEquations~\\eqref{eq:first} and~\\eqref{eq:second}.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "编号由计数器管理，引用由标签管理；视觉编号正确并不保证标签指向正确。每次手工 tag 后同时核对 eqref 输出和超链接目标。",
          "en": "Counters manage numbering and labels manage references. A correct printed number does not guarantee a correct label. Check eqref and hyperlink targets after a manual tag."
        }
      }
    ],
    "packages": [
      "amsmath"
    ],
    "level": "beginner",
    "related": [
      "programming-counters"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "LaTeX Warning: Label `eq:model' multiply defined.",
      "Warning"
    ]
  },
  {
    "id": "error-chinese",
    "module": "errors",
    "title": {
      "zh": "中文乱码、Unicode 与字形缺失",
      "en": "Chinese text, Unicode, and missing glyphs"
    },
    "summary": {
      "zh": "当前输入与字体体系不能处理中文字符。",
      "en": "The current input and font setup cannot handle the Chinese character."
    },
    "syntax": "! LaTeX Error: Unicode character 中 (U+4E2D) not set up for use with LaTeX.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：当前输入与字体体系不能处理中文字符。",
          "en": "Error: The current input and font setup cannot handle the Chinese character."
        },
        "code": "! LaTeX Error: Unicode character 中 (U+4E2D) not set up for use with LaTeX."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "普通 article 中直接输入中文，缺少配套的中文排版设置。",
          "en": "A plain article contains Chinese text without a CJK typesetting setup."
        },
        "code": "\\documentclass{article}\n\n\\begin{document}\n中文测试。\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "pdfLaTeX 的普通 article 不自动提供中文排版。乱码也可能来自非 UTF-8 文件；Unicode 引擎若字体缺字，日志可能显示 Missing character，而不是上述错误。",
          "en": "A plain pdfLaTeX article does not automatically supply Chinese typesetting. Non-UTF-8 files may produce mojibake; a Unicode engine with a missing glyph may instead log Missing character."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 用编辑器确认源文件保存为 UTF-8。\n\n2. 明确选择 XeLaTeX/LuaLaTeX 配合 ctex，或完整的 pdfLaTeX 中文方案。\n\n3. 选择包含中文的字体；修复稿使用 XeLaTeX 与 Fandol。",
          "en": "1. Confirm UTF-8 source encoding.\n\n2. Choose XeLaTeX/LuaLaTeX with ctex or a complete pdfLaTeX CJK setup.\n\n3. Select a font containing Chinese glyphs; the repair uses XeLaTeX and Fandol."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿使用 ctexart 与 fontset=fandol，按 Unicode 中文排版。使用 xelatex 编译。",
          "en": "The repair uses ctexart with fontset=fandol for Unicode Chinese text. Compile with xelatex."
        },
        "code": "\\documentclass[fontset=fandol]{ctexart}\n\n\\begin{document}\n中文测试：研究方法与结果。\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "字体缺字与输入乱码分别检查。日志出现 Missing character 时，确认选定字体是否包含该字符；编码问题则核对源文件的保存格式。",
          "en": "Check glyph coverage separately from encoding. For Missing character messages, verify that the selected font contains the character; for encoding problems, check the source file format."
        }
      }
    ],
    "packages": [
      "ctex"
    ],
    "level": "beginner",
    "related": [
      "beamer-chinese",
      "fonts-fontspec"
    ],
    "sources": [
      {
        "label": "ctex documentation (CTAN)",
        "url": "https://ctan.org/pkg/ctex"
      }
    ],
    "engines": [
      "xelatex"
    ],
    "keywords": [
      "! LaTeX Error: Unicode character 中 (U+4E2D) not set up for use with LaTeX.",
      "Error"
    ]
  },
  {
    "id": "error-beamer-overflow",
    "module": "errors",
    "title": {
      "zh": "Beamer 内容溢出",
      "en": "Beamer frame overflow"
    },
    "summary": {
      "zh": "frame 内容高于可用高度，底部可能被遮挡。",
      "en": "A frame exceeds its available height and the bottom may be clipped."
    },
    "syntax": "Overfull \\vbox (...pt too high) detected at line ...",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "排版诊断：frame 内容高于可用高度，底部可能被遮挡。",
          "en": "Typesetting diagnostic: A frame exceeds its available height and the bottom may be clipped."
        },
        "code": "Overfull \\vbox (...pt too high) detected at line ..."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "frame 中放入 12cm 高的矩形，超出幻灯片可用高度。",
          "en": "A frame contains a 12cm-high rule that exceeds the slide’s available height."
        },
        "code": "\\documentclass{beamer}\n\n\\begin{document}\n\\begin{frame}{Too tall}\\rule{1cm}{12cm}\\end{frame}\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "内容过多、表格太高、主题页脚占空间或 columns 中元素尺寸不当。日志不一定能精确定位每一个被遮挡元素。",
          "en": "Too much content, a tall table, footer space, or oversized column material can overflow. The log may not identify every clipped element precisely."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 查看整个 frame 和每张 overlay。\n\n2. 拆分内容、删去重复文字或改图表组织方式。\n\n3. 参考文献等连续材料可使用 allowframebreaks；谨慎用 shrink，缩小后要按投影尺寸检查。",
          "en": "1. Inspect the full frame and every overlay.\n\n2. Split content, remove repeated text, or reorganize the chart/table.\n\n3. allowframebreaks suits references and other linear material; inspect readability before using shrink."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "内容拆为两个 frame，各自讲述问题与证据。使用 pdflatex 编译，并检查实际投影尺寸。",
          "en": "The content is split into two frames for the question and evidence. Compile with pdflatex and inspect at projection size."
        },
        "code": "\\documentclass{beamer}\n\n\\begin{document}\n\\begin{frame}{Question}State the research question and population.\\end{frame}\n\\begin{frame}{Evidence}Present one informative result.\\end{frame}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "学术报告在投影尺寸下检查，正文缩小能减少溢出但可能无法阅读。每个 overlay 和备份页都应纳入演练检查。",
          "en": "Inspect the talk at projection size. Shrinking may remove overflow while making text unreadable. Review all overlays and backup frames during rehearsal."
        }
      }
    ],
    "packages": [
      "beamer"
    ],
    "level": "beginner",
    "related": [
      "beamer-frames",
      "beamer-blocks-columns"
    ],
    "sources": [
      {
        "label": "Beamer user guide",
        "url": "https://mirrors.ctan.org/macros/latex/contrib/beamer/doc/beameruserguide.pdf"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "Overfull \\vbox (...pt too high) detected at line ...",
      "Typesetting diagnostic / 排版诊断"
    ]
  },
  {
    "id": "error-package-conflict",
    "module": "errors",
    "title": {
      "zh": "宏包命令与环境冲突",
      "en": "Package command and environment conflicts"
    },
    "summary": {
      "zh": "两个系统尝试定义同名接口。",
      "en": "Two systems attempted to define the same interface."
    },
    "syntax": "! LaTeX Error: Command \\algorithm already defined.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：两个系统尝试定义同名接口。",
          "en": "Error: Two systems attempted to define the same interface."
        },
        "code": "! LaTeX Error: Command \\algorithm already defined."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "algorithm 和 algorithm2e 同时加载，都要定义 algorithm 环境。",
          "en": "algorithm and algorithm2e are loaded together, and both define the algorithm environment."
        },
        "code": "\\documentclass{article}\n\\usepackage{algorithm}\\usepackage{algorithm2e}\n\\begin{document}\nText.\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "算法排版系统、标题系统或文献系统重叠时容易冲突。加载顺序可能只是改变第一个报错，不会使两套接口自动兼容。",
          "en": "Overlapping algorithm, heading, or bibliography systems often collide. Changing load order may change the first error without making their interfaces compatible."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 在最小文档中逐一加入宏包，确认触发组合。\n\n2. 每项排版职责选择一个系统；需要共存时查阅官方兼容选项。\n\n3. 将正文命令统一为所选系统的接口，再重新编译。",
          "en": "1. Add packages one at a time to a minimal document to identify the triggering combination.\n\n2. Choose one system per typesetting role, or consult documented compatibility options if both are needed.\n\n3. Convert body commands to the selected interface and recompile."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿保留 algorithm2e，并统一使用它的输入、输出和语句语法。使用 pdflatex 编译。",
          "en": "The repair keeps algorithm2e and uses its input, output, and statement syntax throughout. Compile with pdflatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{algorithm2e}\n\\begin{document}\n\\begin{algorithm}\\caption{A short procedure}\\KwIn{Data}\\KwOut{Summary}Compute the summary\\;\\end{algorithm}\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "为标题、文献和算法选择各自的排版系统。引入另一系统的示例时，先将命令转换为当前接口，再检查新增依赖。",
          "en": "Choose the systems used for headings, bibliographies, and algorithms. Convert examples from another system to the current interface, then check any new dependencies."
        }
      }
    ],
    "packages": [
      "algorithm2e"
    ],
    "level": "beginner",
    "related": [
      "algorithm-algorithm2e",
      "algorithm-pseudocode"
    ],
    "sources": [
      {
        "label": "algorithm2e documentation (CTAN)",
        "url": "https://ctan.org/pkg/algorithm2e"
      }
    ],
    "engines": [
      "pdflatex"
    ],
    "keywords": [
      "! LaTeX Error: Command \\algorithm already defined.",
      "Error"
    ]
  },
  {
    "id": "error-engine",
    "module": "errors",
    "title": {
      "zh": "编译引擎与宏包不匹配",
      "en": "Engine and package mismatch"
    },
    "summary": {
      "zh": "选中的引擎不支持宏包所需字体接口。",
      "en": "The selected engine lacks the font interface required by the package."
    },
    "syntax": "Fatal Package fontspec Error: The fontspec package requires either XeTeX or LuaTeX.",
    "sections": [
      {
        "title": {
          "zh": "日志原文与级别",
          "en": "Log message and severity"
        },
        "body": {
          "zh": "编译错误：选中的引擎不支持宏包所需字体接口。",
          "en": "Error: The selected engine lacks the font interface required by the package."
        },
        "code": "Fatal Package fontspec Error: The fontspec package requires either XeTeX or LuaTeX."
      },
      {
        "title": {
          "zh": "最小复现代码",
          "en": "Minimal reproduction"
        },
        "body": {
          "zh": "fontspec 随文档加载，但编译器选为 pdfLaTeX。",
          "en": "The document loads fontspec while the selected engine is pdfLaTeX."
        },
        "code": "\\documentclass{article}\n\\usepackage{fontspec}\n\\begin{document}\nUnicode text.\n\\end{document}"
      },
      {
        "title": {
          "zh": "可能原因",
          "en": "Likely causes"
        },
        "body": {
          "zh": "使用 pdfLaTeX 编译含 fontspec 的源码，编辑器仍使用旧引擎配置，或 latexmkrc 覆盖了按钮设置。更换文件名不会更换引擎。",
          "en": "A fontspec source may be compiled with pdfLaTeX because of an old editor setting or a latexmkrc override. Renaming a file does not change the engine."
        }
      },
      {
        "title": {
          "zh": "逐步排查",
          "en": "Step-by-step repair"
        },
        "body": {
          "zh": "1. 阅读日志开头确认实际运行的是 pdfTeX、XeTeX 还是 LuaTeX。\n\n2. 把编辑器和自动构建配置改为匹配引擎。\n\n3. 清理受引擎影响的辅助产物再编译；若必须 pdfLaTeX，改用该引擎支持的字体宏包。",
          "en": "1. Read the log header for the actual engine.\n\n2. Align editor and automated build settings.\n\n3. Clean engine-dependent auxiliary output and recompile; if pdfLaTeX is required, use a compatible font package."
        }
      },
      {
        "title": {
          "zh": "修复后的完整代码",
          "en": "Complete repaired document"
        },
        "body": {
          "zh": "修复稿配置 fontspec 与 TeX Gyre 字体文件，使用 xelatex 编译。",
          "en": "The repair configures fontspec with TeX Gyre font files and uses xelatex."
        },
        "code": "\\documentclass{article}\n\\usepackage{fontspec}\\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]\n\\begin{document}\nUnicode text: café.\n\\end{document}"
      },
      {
        "title": {
          "zh": "避免再次发生",
          "en": "Prevent recurrence"
        },
        "body": {
          "zh": "在 README、编辑器与 latexmkrc 中统一引擎名称。检查日志的实际引擎，能识别按钮设置被项目构建配置覆盖的情况。",
          "en": "Keep the engine consistent in the README, editor, and latexmkrc. The log identifies the actual engine when a project build setting overrides a button."
        }
      }
    ],
    "packages": [
      "fontspec"
    ],
    "level": "beginner",
    "related": [
      "fonts-fontspec",
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "fontspec documentation (CTAN)",
        "url": "https://ctan.org/pkg/fontspec"
      }
    ],
    "engines": [
      "xelatex"
    ],
    "keywords": [
      "Fatal Package fontspec Error: The fontspec package requires either XeTeX or LuaTeX.",
      "Error"
    ]
  },
  {
    "id": "structure-notes",
    "module": "structure",
    "title": {
      "zh": "脚注、尾注与旁注",
      "en": "Footnotes, endnotes, and margin notes"
    },
    "summary": {
      "zh": "注释位置改变读者获取信息的方式，也会影响页面空间。",
      "en": "Note placement changes how readers encounter information and how page space is used."
    },
    "syntax": "\\footnote{...}\\endnote{...}\\marginpar{...}\\theendnotes",
    "sections": [
      {
        "title": {
          "zh": "脚注的计数与位置",
          "en": "Footnote numbering and placement"
        },
        "body": {
          "zh": "footnote 在正文插入标号，并在当前页面的脚注区域输出内容。footnotemark/footnotetext 分开标号与文字，适合受限制的环境，但需要保证计数对应。minipage 有自己的脚注计数和输出区域。",
          "en": "footnote inserts a mark and places the text in the page’s footnote area. footnotemark/footnotetext separate the two for restricted contexts, but their counters must match. A minipage has its own footnote counter and area."
        }
      },
      {
        "title": {
          "zh": "尾注与旁注",
          "en": "Endnotes and margin notes"
        },
        "body": {
          "zh": "endnotes 将 endnote 收集到 theendnotes 所在位置。marginpar 在边栏输出，双面文档的位置可能随奇偶页变化。边栏宽度由 marginparwidth 决定，正文边距需为它留空间。",
          "en": "endnotes collects endnote text at the location of theendnotes. marginpar places a note in the margin, with the side varying in a two-sided document. marginparwidth sets the note width, and the page margins must leave room."
        }
      },
      {
        "title": {
          "zh": "受限环境与长文档",
          "en": "Restricted contexts and long documents"
        },
        "body": {
          "zh": "table 内的脚注可能落在预期页面之外，可用 threeparttable 等专用表注。在章节标题等移动参数中加入注释时，先检查命令的参数读取规则。解释性注释放在适合的位置，主要论证保留在正文。",
          "en": "Footnotes within a table may appear on a different page; use dedicated table notes such as threeparttable. Check argument-reading rules when putting notes in moving arguments such as headings. Place explanatory notes where readers need them and keep the main argument in the body."
        }
      }
    ],
    "example": "ex-structure-notes",
    "packages": [
      "endnotes"
    ],
    "level": "intermediate",
    "related": [
      "layout-geometry",
      "structure-appendix"
    ],
    "sources": [
      {
        "label": "endnotes documentation (CTAN)",
        "url": "https://ctan.org/pkg/endnotes"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "structure-index",
    "module": "structure",
    "title": {
      "zh": "索引、imakeidx 与排序",
      "en": "Indexes, imakeidx, and sorting"
    },
    "summary": {
      "zh": "索引把概念与出现页关联，需要额外排序流程。",
      "en": "An index associates concepts with pages and needs a sorting step."
    },
    "syntax": "\\usepackage{imakeidx}\\makeindex\\index{estimator}\\printindex",
    "sections": [
      {
        "title": {
          "zh": "写入与输出",
          "en": "Recording and printing entries"
        },
        "body": {
          "zh": "makeindex 启用索引，index 在当前位置记录页码，printindex 输出排序结果。索引条目不会在正文中自动显示；正文仍需自己写概念文字。",
          "en": "makeindex enables an index, index records the current page, and printindex prints the sorted result. Index entries do not automatically appear in the prose, which still needs the concept text."
        }
      },
      {
        "title": {
          "zh": "层级和显示文本",
          "en": "Hierarchy and display text"
        },
        "body": {
          "zh": "! 表示子条目，@ 分开排序键与显示文本，| 指定页码格式。索引中的特殊字符按处理器规则转义。中文排序可能需要 xindy 或其他符合项目需求的工具。",
          "en": "! creates subentries, @ separates the sort key and display text, and | selects page-number formatting. Escape special index characters according to the indexer’s rules. Chinese sorting may require xindy or another suitable tool."
        }
      },
      {
        "title": {
          "zh": "处理器与编译",
          "en": "Indexer and compilation"
        },
        "body": {
          "zh": "手动流程为 LaTeX→makeindex→LaTeX。imakeidx 可自动调用处理器，是否允许取决于执行配置。示例采用 makeindex；中文全文索引必须另行设计排序方案。",
          "en": "The manual sequence is LaTeX, makeindex, then LaTeX. imakeidx can invoke an indexer automatically, subject to execution configuration. The example uses makeindex; a Chinese index needs a planned sorting scheme."
        }
      },
      {
        "title": {
          "zh": "页码区间",
          "en": "Page ranges"
        },
        "body": {
          "zh": "索引范围使用处理器规定的起止语法。只有真实连续讨论同一主题时才合并为范围；自动出现多个页码时应检查是否索引过于频繁。",
          "en": "Use the indexer’s opening and closing range syntax. Group pages only when they discuss one topic continuously. Many automatic page entries can signal excessive indexing."
        }
      },
      {
        "title": {
          "zh": "概念选择",
          "en": "Choosing concepts"
        },
        "body": {
          "zh": "索引应包含读者会查的术语、别名和交叉指向。相同概念统一排序键，避免 estimator、Estimator 和估计量成为不相连的三个条目。中英文索引可依据读者需求分别设计。",
          "en": "Index reader-relevant terms, aliases, and cross-references. Use consistent sort keys so case variants and translations do not become disconnected entries. Design bilingual indexes for their readers."
        }
      }
    ],
    "example": "ex-structure-index",
    "packages": [
      "imakeidx"
    ],
    "level": "intermediate",
    "related": [
      "structure-glossary",
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "imakeidx documentation (CTAN)",
        "url": "https://ctan.org/pkg/imakeidx"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "structure-glossary",
    "module": "structure",
    "title": {
      "zh": "术语表、缩略语与 glossaries",
      "en": "Glossaries and acronyms"
    },
    "summary": {
      "zh": "术语表统一定义、简称和首次展开形式。",
      "en": "A glossary centralizes definitions, acronyms, and first-use expansions."
    },
    "syntax": "\\newacronym{did}{DiD}{difference in differences}\\gls{did}\\printnoidxglossary",
    "sections": [
      {
        "title": {
          "zh": "词条与引用",
          "en": "Definitions and references"
        },
        "body": {
          "zh": "newglossaryentry 定义普通术语；newacronym 定义简称和完整表达。gls 根据首次使用状态选择输出，并记录词条是否使用。glspl 使用复数形式。直接写简称不会更新这套状态。",
          "en": "newglossaryentry defines an ordinary term; newacronym defines a short and long form. gls selects output by first-use state and records usage. glspl uses plural forms. Typing an acronym directly does not update this state."
        }
      },
      {
        "title": {
          "zh": "有索引与无索引工作流",
          "en": "Indexed and no-index workflows"
        },
        "body": {
          "zh": "makeglossaries 使用外部排序流程，通常通过 makeglossaries 工具完成。makenoidxglossaries 与 printnoidxglossary 在 TeX 内排序，适合小型术语表；它仍需要多次编译以收集使用信息。",
          "en": "makeglossaries uses an external sorting workflow, usually through the makeglossaries tool. makenoidxglossaries with printnoidxglossary sorts within TeX and suits small glossaries. It still needs multiple runs to collect usage information."
        }
      },
      {
        "title": {
          "zh": "作用范围与结构",
          "en": "State and document structure"
        },
        "body": {
          "zh": "glsreset 重置一个术语的首次使用状态，glsresetall 重置全部。按文档需要在各章开头重置，并为术语标签和文献引用键分别制定命名规则。",
          "en": "glsreset resets first-use state for one term; glsresetall resets all terms. Reset at chapter boundaries when needed, and give term labels and bibliography keys separate naming conventions."
        }
      },
      {
        "title": {
          "zh": "首次使用重置",
          "en": "Resetting first-use state"
        },
        "body": {
          "zh": "glsreset{did} 让下次使用重新展开全称。章节独立阅读时可重置，连续论文中通常保留全篇状态。标题和摘要中的使用可能影响正文首次输出，需按稿件要求处理。",
          "en": "glsreset{did} expands the acronym at its next use. Reset for independently read chapters, while a continuous paper may keep document-wide state. A use in the title or abstract may affect the first body use."
        }
      },
      {
        "title": {
          "zh": "未使用词条",
          "en": "Unused entries"
        },
        "body": {
          "zh": "默认输出通常仅含已使用的条目。glsadd 可记录词条而不在正文显示，glsaddall 可包含全部。正文首次出现缩略语时给出解释，术语表提供集中查询。",
          "en": "Output normally includes used entries. glsadd records an entry without printing it in the body; glsaddall includes all. Explain an acronym when it first appears, with the glossary providing a central reference."
        }
      }
    ],
    "example": "ex-structure-glossary",
    "packages": [
      "glossaries"
    ],
    "level": "intermediate",
    "related": [
      "structure-index",
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "glossaries documentation (CTAN)",
        "url": "https://ctan.org/pkg/glossaries"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "structure-appendix",
    "module": "structure",
    "title": {
      "zh": "附录、前置部分与后置部分",
      "en": "Appendices, front matter, and back matter"
    },
    "summary": {
      "zh": "长文档的部分切换同时改变编号和内容组织。",
      "en": "Long-document divisions affect both numbering and organization."
    },
    "syntax": "\\frontmatter\\mainmatter\\appendix\\backmatter",
    "sections": [
      {
        "title": {
          "zh": "appendix 的行为",
          "en": "What appendix changes"
        },
        "body": {
          "zh": "appendix 是声明，后续 section 或 chapter 改用附录编号。article 通常按 section 分附录，book/report 按 chapter。它不自动创建标题“附录”，也不结束文档。",
          "en": "appendix is a declaration that changes subsequent section or chapter numbering. article uses section-level appendices; book/report use chapters. It does not automatically create an “Appendix” heading or end the document."
        }
      },
      {
        "title": {
          "zh": "书籍式结构",
          "en": "Book-style divisions"
        },
        "body": {
          "zh": "book/ctexbook 的 frontmatter 使用前置编号并通常不编号章，mainmatter 恢复正文编号，backmatter 使后续章不编号。report 没有同样的标准接口，应依据类组织。",
          "en": "book/ctexbook frontmatter uses preliminary page numbering and normally unnumbered chapters; mainmatter restores main numbering, and backmatter makes subsequent chapters unnumbered. report does not provide the same standard interface."
        }
      },
      {
        "title": {
          "zh": "目录、标签和补充材料",
          "en": "Contents, labels, and supplements"
        },
        "body": {
          "zh": "附录仍使用正常 chapter/section 与 label，交叉引用可得到字母编号。数据字典、完整推导和补充检验适合附录；正文需指出读者何时需要它。页码与超链接应检查重复目标。",
          "en": "Use normal chapter/section commands and labels in appendices so references obtain lettered numbers. Data dictionaries, derivations, and additional checks suit appendices, with pointers from the main text. Check page numbers and hyperlink destinations."
        }
      }
    ],
    "example": "ex-academic-thesis",
    "packages": [],
    "level": "intermediate",
    "related": [
      "structure-notes",
      "layout-pages"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "structure-manuals",
    "module": "structure",
    "title": {
      "zh": "大型书籍与技术手册",
      "en": "Large books and technical manuals"
    },
    "summary": {
      "zh": "将章节、统一记号、索引和构建规则组织成可维护的工程。",
      "en": "Organize chapters, common notation, indexing, and build rules as a maintainable project."
    },
    "syntax": "\\include{chapters/introduction}\\includeonly{chapters/methods}",
    "sections": [
      {
        "title": {
          "zh": "内容拆分",
          "en": "Splitting content"
        },
        "body": {
          "zh": "一章一个文件适合 include；它会前后清页并为每章保存 aux。input 只插入文本，适合小节或共享配置。共享宏包在主导言区载入，章节文件保留纯内容。",
          "en": "include suits chapter-sized files: it clears pages around the input and writes a chapter aux file. input simply inserts text and suits sections or shared configuration. Load packages in the main preamble and keep chapter files focused on content."
        }
      },
      {
        "title": {
          "zh": "部分编译",
          "en": "Partial builds"
        },
        "body": {
          "zh": "includeonly 只排版指定章节，并利用已有辅助文件保持其他章的编号信息。首次完整编译前，这些信息可能不存在。定期全编译以验证目录、索引、书签和跨章引用。",
          "en": "includeonly typesets selected chapters and uses existing aux data to preserve numbering from others. That data may be absent before a full build. Run full builds regularly to verify contents, indexes, bookmarks, and cross-chapter references."
        }
      },
      {
        "title": {
          "zh": "稳定的组织方式",
          "en": "Stable organization"
        },
        "body": {
          "zh": "标签按内容命名，如 ch:methods 和 eq:likelihood。术语、数学记号与代码框放在共享 sty 中，图片和数据输出按章节归档。固定编译工作目录，使相对路径保持一致。",
          "en": "Name labels by content, such as ch:methods and eq:likelihood. Keep terms, notation, and code boxes in a shared sty and organize graphics and generated data by chapter. Use a fixed compilation directory for consistent relative paths."
        }
      }
    ],
    "example": "ex-project-input",
    "packages": [],
    "level": "advanced",
    "related": [
      "project-multifile",
      "structure-index",
      "programming-package-class"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "academic-thesis",
    "module": "academic",
    "title": {
      "zh": "中文学位论文与复杂报告",
      "en": "Chinese theses and substantial reports"
    },
    "summary": {
      "zh": "先确定结构、模板与提交要求，再配置字体和版面。",
      "en": "Set the structure, template, and submission requirements before configuring fonts and layout."
    },
    "syntax": "\\documentclass[fontset=fandol,openany]{ctexbook}",
    "sections": [
      {
        "title": {
          "zh": "结构与院校规范",
          "en": "Structure and institutional rules"
        },
        "body": {
          "zh": "摘要、目录、正文、文献、附录和致谢通常分属不同部分。ctexbook 示例展示通用结构；封面、边距和匿名评审格式按院校要求设置。使用本校维护的模板时，核对版本与提交说明。",
          "en": "Abstracts, contents, chapters, references, appendices, and acknowledgments usually form separate divisions. The ctexbook example demonstrates a general structure; follow institutional requirements for the cover, margins, and anonymous review. Check the version and instructions of the maintained university template."
        }
      },
      {
        "title": {
          "zh": "中文与数学搭配",
          "en": "Chinese and mathematical typography"
        },
        "body": {
          "zh": "明确 UTF-8、Unicode 引擎和中文字体；Fandol 提供可移植基线。数学字体由独立体系控制，采用 unicode-math 时需同时核对中文与数学字号。长表、图注和文献也要验证中英文混排。",
          "en": "Specify UTF-8, a Unicode engine, and Chinese fonts; Fandol gives a portable baseline. Math fonts are configured separately. With unicode-math, inspect both Chinese and mathematical sizes, along with long tables, captions, and bilingual references."
        }
      },
      {
        "title": {
          "zh": "工程与交付",
          "en": "Project and delivery"
        },
        "body": {
          "zh": "章节拆分、共享配置与 latexmk 可简化编译。提交前移除无关草稿信息，检查引用、字体嵌入、图片质量和 PDF 页尺寸。备份源码、bib、图形、生成脚本和构建说明。",
          "en": "Split chapters and use shared configuration with latexmk. Before submission, inspect references, embedded fonts, graphics, and PDF dimensions, and remove irrelevant draft material. Preserve source, bibliography, graphics, scripts, and build instructions."
        }
      },
      {
        "title": {
          "zh": "匿名与多种交付版本",
          "en": "Anonymous and alternate delivery versions"
        },
        "body": {
          "zh": "评审版、归档版和打印版可能不同。通过一个清楚的项目开关控制作者信息与致谢，而非临提交前全局搜索替换。PDF 元数据也可能包含姓名，需要随版本检查。",
          "en": "Review, archive, and print versions may differ. Use a clear project switch for author information and acknowledgments instead of last-minute global replacements. PDF metadata may also contain names and needs checking."
        }
      },
      {
        "title": {
          "zh": "长表与专业数据",
          "en": "Long tables and research data"
        },
        "body": {
          "zh": "附录数据表适合 longtable 重复表头；回归表适合 booktabs、threeparttable 与 siunitx。表格脚注定义聚类层级、显著性标记和缺失值。宽表改横向页面时检查打印可读性。",
          "en": "Use repeated longtable headers for appendix datasets and booktabs, threeparttable, and siunitx for regression tables. Define clustering, significance marks, and missing values in notes. Inspect print readability for landscape tables."
        }
      }
    ],
    "example": "ex-academic-thesis",
    "packages": [
      "ctex"
    ],
    "level": "intermediate",
    "related": [
      "structure-appendix",
      "project-reproducibility",
      "fonts-fontspec"
    ],
    "sources": [
      {
        "label": "ctex documentation (CTAN)",
        "url": "https://ctan.org/pkg/ctex"
      }
    ],
    "engines": [
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "academic-journal",
    "module": "academic",
    "title": {
      "zh": "英文期刊投稿与论文结构",
      "en": "English journal submissions and paper structure"
    },
    "summary": {
      "zh": "期刊模板管理格式，作者需要保持内容、文献和图表可移植。",
      "en": "A journal template controls format while authors maintain portable content, references, and graphics."
    },
    "syntax": "\\documentclass{article}\\title{...}\\author{...}\\begin{abstract}...\\end{abstract}",
    "sections": [
      {
        "title": {
          "zh": "模板选择",
          "en": "Choosing a template"
        },
        "body": {
          "zh": "从期刊官网获取当前模板，核对投稿版与出版版要求。amsart、elsarticle 等类各有作者和标题接口，不能仅改 documentclass 后假设全部宏兼容。投稿版常需要行号、匿名或单独图注。",
          "en": "Obtain the current template from the journal and distinguish submission from production requirements. Classes such as amsart and elsarticle have their own author and title interfaces. Submission versions may require line numbers, anonymity, or separate captions."
        }
      },
      {
        "title": {
          "zh": "实证论文组织",
          "en": "Organizing an empirical paper"
        },
        "body": {
          "zh": "围绕问题、相关研究、数据、方法、结果和解释组织可追踪的论证。表格交代样本量、单位与标准误定义，图注说明数据来源。用文档的章节和编号接口组织内容。",
          "en": "Organize the argument around the question, literature, data, method, results, and interpretation so readers can follow it. Tables specify sample size, units, and the standard-error definition; captions identify data sources. Organize content through the document’s heading and numbering interfaces."
        }
      },
      {
        "title": {
          "zh": "平台限制",
          "en": "Platform restrictions"
        },
        "body": {
          "zh": "检查平台接受的引擎、图片格式和 bib/bbl 文件。需要外部工具的 minted 或 TikZ externalization 可能不被允许，应准备平台兼容版本。保持作者引用命令与指定文献系统一致。",
          "en": "Check supported engines, image formats, and bib/bbl requirements. External-tool workflows such as minted or TikZ externalization may be restricted, requiring a compatible version. Use citation commands from the required bibliography system."
        }
      }
    ],
    "example": "ex-project-input",
    "packages": [],
    "level": "intermediate",
    "related": [
      "project-reproducibility",
      "code-minted"
    ],
    "sources": [
      {
        "label": "elsarticle documentation (CTAN)",
        "url": "https://ctan.org/pkg/elsarticle"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "academic-cv",
    "module": "academic",
    "title": {
      "zh": "学术简历与正式信件",
      "en": "Academic CVs and formal letters"
    },
    "summary": {
      "zh": "简历强调信息层级，信件强调收件人、日期、称呼与结束语。",
      "en": "CVs emphasize information hierarchy; letters need recipient, date, salutation, and closing."
    },
    "syntax": "\\section*{Education}\\begin{letter}{Recipient}\\opening{Dear ...}\\closing{Sincerely,}\\end{letter}",
    "sections": [
      {
        "title": {
          "zh": "简历的信息结构",
          "en": "CV information structure"
        },
        "body": {
          "zh": "教育、研究、成果、教学和技能按稳定标题组织，日期用表格或对齐布局排列。正文保持可选择与复制；图形化布局需检查招聘系统能否正确读取。",
          "en": "Use stable headings for education, research, publications, teaching, and skills, and align dates with a table or layout. Keep text selectable and copyable, and check automated reading when using a graphical layout."
        }
      },
      {
        "title": {
          "zh": "类与风格",
          "en": "Classes and style"
        },
        "body": {
          "zh": "标准 article 可制作易维护的简历。moderncv 等专用类提供简历接口，同时增加字体和图标依赖。成果明确标为 working paper、accepted 或 published，页数调整后检查字号和间距。",
          "en": "A standard article gives a maintainable CV. Classes such as moderncv add dedicated interfaces along with font and icon dependencies. Mark work accurately as working paper, accepted, or published, and inspect type size and spacing after adjusting the length."
        }
      },
      {
        "title": {
          "zh": "正式信件",
          "en": "Formal letters"
        },
        "body": {
          "zh": "letter 类在 document 内建立 letter 环境，以 opening 和 closing 生成称呼及结束语；address 和 signature 配置发信人信息。KOMA scrlttr2 有更丰富的变量接口，两者语法不可混用。",
          "en": "The letter class creates a letter environment inside document, with opening and closing for salutation and ending. address and signature configure sender details. KOMA scrlttr2 provides a richer variable interface with different syntax."
        }
      }
    ],
    "example": "ex-academic-cv",
    "packages": [
      "hyperref"
    ],
    "level": "intermediate",
    "related": [
      "fonts-families",
      "layout-geometry"
    ],
    "sources": [
      {
        "label": "moderncv documentation (CTAN)",
        "url": "https://ctan.org/pkg/moderncv"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "academic-exams-posters",
    "module": "academic",
    "title": {
      "zh": "试卷、答案与研究海报",
      "en": "Examinations, solutions, and research posters"
    },
    "summary": {
      "zh": "专业文档需要按阅读场景选择结构和纸张。",
      "en": "Specialized documents need structures and paper sizes chosen for their reading context."
    },
    "syntax": "\\documentclass{exam}\\question[5] ...\\begin{solution}...\\end{solution}",
    "sections": [
      {
        "title": {
          "zh": "exam 类的题目结构",
          "en": "Questions in the exam class"
        },
        "body": {
          "zh": "questions 环境包含 question，方括号指定分值，parts 可组织子题。printanswers 显示 solution 内容，不加时隐藏。addpoints 启用分值累计；核对题面、答案版和评分表一致。",
          "en": "questions contains question entries with optional point values, and parts organizes subquestions. printanswers reveals solution content; otherwise it is hidden. addpoints enables point totals. Check consistency across question, solution, and grading versions."
        }
      },
      {
        "title": {
          "zh": "海报尺寸",
          "en": "Poster dimensions"
        },
        "body": {
          "zh": "研究海报可用 beamerposter/tikzposter，也可用 geometry 与 multicols。按纸张尺寸和观看距离选择字号；A3 示例放大为会议海报时，需要重新检查文字尺寸。",
          "en": "Use beamerposter/tikzposter or geometry with multicols for a research poster. Choose type size for the paper dimensions and viewing distance, and reassess it when adapting an A3 example to a full-size poster."
        }
      },
      {
        "title": {
          "zh": "结果和视觉层级",
          "en": "Evidence and visual hierarchy"
        },
        "body": {
          "zh": "海报的读者需要迅速看出问题、方法和结论。精选一张主要结果图，并给出样本、单位和不确定性说明。二维码可提供补充材料，但核心解释仍应在海报上。",
          "en": "Poster readers need to identify the question, method, and conclusion quickly. Select a main results figure and define the sample, units, and uncertainty. A QR code can link supplements while the central explanation remains on the poster."
        }
      }
    ],
    "example": "ex-academic-exam",
    "packages": [
      "exam"
    ],
    "level": "intermediate",
    "related": [
      "layout-columns",
      "beamer-custom-theme"
    ],
    "sources": [
      {
        "label": "exam documentation (CTAN)",
        "url": "https://ctan.org/pkg/exam"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "project-multifile",
    "module": "projects",
    "title": {
      "zh": "input、include 与项目路径",
      "en": "input, include, and project paths"
    },
    "summary": {
      "zh": "多文件项目以一个主文档控制导言区和编译目录。",
      "en": "A multifile project uses one main document to control the preamble and working directory."
    },
    "syntax": "\\input{methods}\\include{chapters/introduction}\\includeonly{chapters/methods}",
    "sections": [
      {
        "title": {
          "zh": "插入与独立辅助文件",
          "en": "Insertion and separate auxiliary files"
        },
        "body": {
          "zh": "input 近似把文件内容插入当前读取位置，不自动换页。include 前后清页并建立独立 aux，通常用于正文中的整章而不嵌套。documentclass 与 document 环境由主文件保留，章节文件只写内容。",
          "en": "input inserts content at the current reading position without a page break. include clears surrounding pages and creates a separate aux; it normally handles body chapters without nesting. Keep documentclass and document in the main file, with content in chapter files."
        }
      },
      {
        "title": {
          "zh": "路径与编辑器",
          "en": "Paths and editors"
        },
        "body": {
          "zh": "相对路径通常相对编译工作目录，而不自动相对每个章节文件。固定从主文件目录编译，或使用构建工具的 cd 选项。编辑器的 root 设置有助于从章节启动主文件编译，但它是编辑器配置而非 TeX 命令。",
          "en": "Relative paths normally refer to the compilation working directory rather than each chapter’s directory. Build from the main directory or use the build tool’s cd option. An editor root setting helps launch the main build from a chapter but is not a TeX command."
        }
      },
      {
        "title": {
          "zh": "资源和导出",
          "en": "Resources and export"
        },
        "body": {
          "zh": "交付时打包 tex、sty、cls、bib 和图片，记录生成数据或图形的步骤。示例附带 methods.tex；只下载主 tex 不会复制此文件。项目压缩包应保持相对目录结构。",
          "en": "Deliver tex, sty, cls, bib, and graphics together and document generated resources. The example includes methods.tex, which a main-file-only download does not copy. Preserve relative directory structure in a project archive."
        }
      }
    ],
    "example": "ex-project-input",
    "packages": [],
    "level": "intermediate",
    "related": [
      "programming-package-class",
      "structure-manuals",
      "project-latexmk"
    ],
    "sources": [
      {
        "label": "LaTeX author guide",
        "url": "https://www.latex-project.org/help/documentation/usrguide.pdf"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "project-latexmk",
    "module": "projects",
    "title": {
      "zh": "latexmk 与自动构建",
      "en": "latexmk and automated builds"
    },
    "summary": {
      "zh": "latexmk 根据辅助文件和依赖自动运行引擎与文献工具。",
      "en": "latexmk uses auxiliary data and dependencies to run the engine and bibliography tools."
    },
    "syntax": "latexmk -pdf main.tex\\nlatexmk -xelatex main.tex\\nlatexmk -lualatex main.tex",
    "sections": [
      {
        "title": {
          "zh": "构建目标",
          "en": "Build targets"
        },
        "body": {
          "zh": "-pdf 选择常见的 pdfLaTeX 流程，-xelatex 与 -lualatex 选择 Unicode 引擎。latexmk 调用已安装的工具，重复编译直到引用和文献稳定。运行前需准备相应的 Biber、字体等依赖。",
          "en": "-pdf selects the usual pdfLaTeX workflow; -xelatex and -lualatex select Unicode engines. latexmk calls installed tools and repeats runs until references and bibliographies stabilize. Install the required Biber, fonts, and other dependencies beforehand."
        }
      },
      {
        "title": {
          "zh": "配置与输出目录",
          "en": "Configuration and output directories"
        },
        "body": {
          "zh": "latexmkrc 可保存项目编译规则。-outdir=build 分离输出，但部分宏包与外部工具需配合输出目录配置。-cd 先切换到主文件目录。-pvc 监视文件变化，适合本地编辑。",
          "en": "latexmkrc stores project rules. -outdir=build separates output, though some packages and external tools need matching settings. -cd changes to the main file directory. -pvc watches for file changes during local editing."
        }
      },
      {
        "title": {
          "zh": "清理与诊断",
          "en": "Cleanup and diagnosis"
        },
        "body": {
          "zh": "-c 清理多数辅助文件，-C 还删除最终输出；使用前核对手工维护的文件。诊断时阅读第一条引擎错误和 blg 中的信息。切换文献后端或引擎后，清理不兼容的旧辅助文件再编译。",
          "en": "-c removes most auxiliary files; -C also removes final output, so check hand-maintained files first. Read the first engine error and the blg when diagnosing a build. Clean incompatible auxiliary data after changing engines or bibliography backends."
        }
      },
      {
        "title": {
          "zh": "文献和索引的额外工具",
          "en": "Bibliography and indexing tools"
        },
        "body": {
          "zh": "latexmk 按已选宏包探测 BibTeX/Biber 工作链。glossaries 和部分索引系统可能需要自定义依赖规则。将项目规则与 README 一起交付，使其他机器也能采用相同配置。",
          "en": "latexmk detects BibTeX/Biber workflows from the selected packages. glossaries and some indexing systems may need custom dependency rules. Deliver project rules with the README so another machine can use the same configuration."
        }
      },
      {
        "title": {
          "zh": "失败后保留日志",
          "en": "Keep logs after failure"
        },
        "body": {
          "zh": "-halt-on-error 让引擎停在第一条错误，适合自动构建。保留失败日志，查看实际引擎和加载文件。修复后再运行 latexmk，完成剩余的引用更新。",
          "en": "-halt-on-error stops at the first engine error and suits automated builds. Keep failed logs to identify the actual engine and loaded files. After a repair, rerun latexmk to complete reference updates."
        }
      }
    ],
    "example": "ex-project-input",
    "packages": [],
    "level": "intermediate",
    "related": [
      "project-reproducibility",
      "error-bibliography",
      "error-reference"
    ],
    "sources": [
      {
        "label": "latexmk documentation (CTAN)",
        "url": "https://ctan.org/pkg/latexmk"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "project-reproducibility",
    "module": "projects",
    "title": {
      "zh": "Git、版本与可复现编译",
      "en": "Git, versions, and reproducible builds"
    },
    "summary": {
      "zh": "可复现项目保存输入、构建配置、工具版本和最终 PDF。",
      "en": "A reproducible project preserves inputs, build configuration, tool versions, and the final PDF."
    },
    "syntax": "\\listfiles\\nlatexmk -pdf -interaction=nonstopmode -halt-on-error main.tex",
    "sections": [
      {
        "title": {
          "zh": "版本管理",
          "en": "Version control"
        },
        "body": {
          "zh": "Git 跟踪 tex、bib、样式、类和生成脚本；通常忽略 aux、log、toc 等可再生文件。是否保留 bbl 和最终 PDF 取决于投稿或归档需求。只提交需要的资产，避免大文件反复变动拖慢历史。",
          "en": "Track tex, bib, styles, classes, and generation scripts in Git; usually ignore regenerable aux, log, and toc files. Whether to retain bbl and the final PDF depends on submission or archiving needs. Manage large changing assets deliberately."
        }
      },
      {
        "title": {
          "zh": "构建环境记录",
          "en": "Recording the build environment"
        },
        "body": {
          "zh": "listfiles 在 log 中列出宏包版本；记录 TeX Live/MiKTeX 版本、引擎和 BibTeX/Biber 版本。容器或固定发行版有助于稳定输出，但字体文件、外部工具和数据仍需保存。",
          "en": "listfiles records package versions in the log. Record the distribution, engine, and BibTeX/Biber versions. A container or pinned distribution stabilizes output, but fonts, external tools, and data must still be preserved."
        }
      },
      {
        "title": {
          "zh": "生成资产与持续验证",
          "en": "Generated assets and continuous validation"
        },
        "body": {
          "zh": "图形和表格尽量由脚本从明确的数据版本生成。CI 使用非交互模式并遇错误停止，保存日志。编译成功后还应检查未定义引用、缺字和溢出诊断；PDF 字节完全相同并非跨环境排版稳定的唯一标准。",
          "en": "Generate figures and tables from identified data versions through scripts. CI should run noninteractively, stop on errors, and save logs. After a successful build, inspect unresolved references, missing glyphs, and overflow. Byte-identical PDFs are not the sole measure of stable typesetting."
        }
      },
      {
        "title": {
          "zh": "图形和字体的来源",
          "en": "Graphic and font provenance"
        },
        "body": {
          "zh": "记录外部图片的来源与许可，字体按文件交付时附上允许分发的许可证。标明哪些图表来自数据、哪些只是示意，避免模板中的演示数据混入正式稿。",
          "en": "Record graphic sources and licenses, and include redistribution permission for file-based fonts. Distinguish data charts from schematics so demonstration values do not enter a final paper."
        }
      },
      {
        "title": {
          "zh": "归档的最小闭包",
          "en": "A complete archive"
        },
        "body": {
          "zh": "在干净目录中解压项目并编译，是检查资源完整性的直接方法。归档说明主文件、引擎、后端与构建命令。需要离线重建时还应说明发行版和包安装条件。",
          "en": "Extract and compile the archive in a clean directory to test resource completeness. Document the main file, engine, bibliography backend, and build command, plus distribution and package requirements for offline rebuilding."
        }
      }
    ],
    "example": "ex-project-input",
    "packages": [],
    "level": "advanced",
    "related": [
      "project-latexmk",
      "programming-package-class",
      "pgfplots-data"
    ],
    "sources": [
      {
        "label": "TeX Live guide",
        "url": "https://tug.org/texlive/doc/texlive-en/texlive-en.html"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  },
  {
    "id": "accessibility-pdf",
    "module": "accessibility",
    "title": {
      "zh": "可访问 PDF、语义与验证",
      "en": "Accessible PDFs, semantics, and validation"
    },
    "summary": {
      "zh": "可读的视觉排版与可访问的 PDF 结构需要分别验证。",
      "en": "Readable visual typography and accessible PDF structure need separate validation."
    },
    "syntax": "\\hypersetup{pdftitle={Research report},pdflang={en-US}}",
    "sections": [
      {
        "title": {
          "zh": "文档语义",
          "en": "Document semantics"
        },
        "body": {
          "zh": "使用正常标题层级、列表和有意义的链接文本，为图表提供说明。颜色配合文字或线型传递信息。语义结构帮助读者与辅助技术理解文档。",
          "en": "Use proper headings, lists, and meaningful link text, and explain figures and tables. Pair color with text or line styles. Semantic structure helps readers and assistive technologies understand the document."
        }
      },
      {
        "title": {
          "zh": "PDF 标记与当前支持",
          "en": "PDF tagging and current support"
        },
        "body": {
          "zh": "hyperref 元数据和书签并不等于完整的 Tagged PDF。LaTeX Project 的 PDF 管理与标记工作持续演进，宏包兼容状态受版本影响。需要合规交付时按当前官方 tagging 文档配置，并检查使用类与宏包的支持。",
          "en": "hyperref metadata and bookmarks do not create a fully tagged PDF. LaTeX Project PDF management and tagging continue to evolve, with version-sensitive package compatibility. Follow current official tagging guidance and inspect class/package support for a compliance deliverable."
        }
      },
      {
        "title": {
          "zh": "验证范围",
          "en": "Validation scope"
        },
        "body": {
          "zh": "示例提供语义标题、描述性链接和 PDF 元数据。最终 PDF 是否符合 PDF/UA，需要用 PDF 检查工具和屏幕阅读器测试阅读顺序、语言、替代文本和数学表示。网页 MathJax 显示与导出 PDF 的可访问性分别验证。",
          "en": "The example provides headings, descriptive links, and PDF metadata. Assess PDF/UA compliance in the final PDF with inspection tools and a screen reader, testing reading order, language, alternatives, and math. Validate web MathJax output and exported PDF accessibility separately."
        }
      },
      {
        "title": {
          "zh": "数学与表格的语义",
          "en": "Math and table semantics"
        },
        "body": {
          "zh": "公式的视觉正确与辅助技术可读性不同，复杂数学需要检查替代表示或阅读器支持。表格要有清楚表头，避免用布局表假扮数据表。当前支持取决于实际标记工作流。",
          "en": "Visual mathematical correctness differs from assistive readability. Check alternatives or reader support for complex math. Use clear table headers and distinguish layout tables from data tables. Support depends on the actual tagging workflow."
        }
      },
      {
        "title": {
          "zh": "读者测试",
          "en": "Testing with readers"
        },
        "body": {
          "zh": "检查屏幕阅读器的章节导航、链接名称和阅读顺序，放大时查看图表文字。工具自动报告只能覆盖部分问题，实际任务测试可发现阅读路径和说明不足。",
          "en": "Test heading navigation, link names, and reading order with a screen reader, and inspect chart text under magnification. Automated reports cover part of the problem; task-based reading tests expose navigation and explanation gaps."
        }
      }
    ],
    "example": "ex-accessibility-structure",
    "packages": [
      "hyperref"
    ],
    "level": "advanced",
    "related": [
      "fonts-color",
      "structure-manuals"
    ],
    "sources": [
      {
        "label": "LaTeX Project tagged PDF documentation",
        "url": "https://latex3.github.io/tagging-project/"
      }
    ],
    "engines": [
      "pdflatex",
      "xelatex",
      "lualatex"
    ],
    "keywords": []
  }
]);
 D.examples.push(...[
  {
    "id": "ex-beamer-report",
    "title": {
      "zh": "完整经济学学术报告",
      "en": "Complete economics research talk"
    },
    "description": {
      "zh": "包含主题、目录、识别方程、矢量插图、结果表、逐步显示与参考文献；所有图形都在源码中生成。",
      "en": "A themed talk with an outline, identification equation, vector illustration, results table, overlays, and references; graphics are generated in the source."
    },
    "engine": "pdflatex",
    "code": "\\documentclass[aspectratio=169]{beamer}\n\\usetheme{Madrid}\n\\usecolortheme{seahorse}\n\\usefonttheme{professionalfonts}\n\\usepackage{amsmath,booktabs,tikz}\n\\usetikzlibrary{arrows.meta}\n\\setbeamertemplate{navigation symbols}{}\n\\renewcommand{\\appendixname}{\\texorpdfstring{\\translate{Appendix}}{Appendix}}\n\\title[Policy evaluation]{Evaluating a Training Policy}\n\\author{Research Group}\n\\institute{Department of Economics}\n\\date{Research Seminar}\n\\AtBeginSection[]{\\begin{frame}{Road map}\\tableofcontents[currentsection]\\end{frame}}\n\\begin{document}\n\\begin{frame}\\titlepage\\end{frame}\n\\begin{frame}{Outline}\\tableofcontents\\end{frame}\n\\section{Question and design}\n\\begin{frame}{Research question}\n\\begin{block}{Question}Does training raise participants' earnings?\\end{block}\n\\begin{itemize}\n\\item<1-> Compare eligible and ineligible workers.\n\\item<2-> Observe earnings before and after implementation.\n\\item<3-> Check the plausibility of parallel trends.\n\\end{itemize}\n\\note{Distinguish the policy effect from selection into training.}\n\\end{frame}\n\\begin{frame}{Identification}\n\\begin{equation}\nY_{it}=\\alpha_i+\\lambda_t+\\beta(D_i\\times Post_t)+\\varepsilon_{it}.\n\\label{eq:did}\n\\end{equation}\nFor an applied discussion, see \\cite{angrist}.\n\\begin{alertblock}{Assumption}In the absence of treatment, groups would have parallel trends.\\end{alertblock}\n\\end{frame}\n\\begin{frame}{Design in one picture}\n\\begin{columns}[T,onlytextwidth]\n\\begin{column}{.54\\textwidth}\n\\centering\n\\begin{tikzpicture}[x=.6cm,y=.65cm,>=Stealth]\n\\draw[->] (0,0)--(6,0) node[right]{Time};\n\\draw[->] (0,0)--(0,4) node[above]{Earnings};\n\\draw[dashed] (3,0)--(3,3.8);\n\\draw[teal,thick] (1,1)--(3,1.5)--(5,3);\n\\draw[gray,thick] (1,.5)--(3,1)--(5,1.5);\n\\node[teal,right] at (4.3,3.5){Eligible};\n\\node[gray,right] at (4.3,.6){Control};\n\\end{tikzpicture}\n\\end{column}\n\\begin{column}{.42\\textwidth}\nThe dashed line marks implementation. The drawing is schematic and contains no empirical observations.\n\\end{column}\n\\end{columns}\n\\end{frame}\n\\section{Results}\n\\begin{frame}{Illustrative estimates}\n\\centering\n\\begin{table}\n\\caption{Demonstration results, not research findings}\n\\begin{tabular}{lrr}\n\\toprule & Baseline & Controls \\\\\n\\midrule Training effect & 0.12 & 0.10 \\\\\nStandard error & 0.04 & 0.03 \\\\\nObservations & 800 & 800 \\\\\n\\bottomrule\n\\end{tabular}\n\\end{table}\n\\medskip\n\\uncover<2->{Report standard errors, units, sample restrictions, and the estimation method.}\n\\end{frame}\n\\begin{frame}{Interpretation and limitations}\n\\begin{itemize}\n\\item An estimate is meaningful only with a credible design.\n\\item Test alternative windows and inspect pre-treatment trends.\n\\item State the population to which the result applies.\n\\end{itemize}\n\\end{frame}\n\\begin{frame}{References}\n\\begin{thebibliography}{9}\n\\bibitem{angrist} Angrist, J. D. and Pischke, J.-S. (2009).\n\\newblock \\emph{Mostly Harmless Econometrics}. Princeton University Press.\n\\end{thebibliography}\n\\end{frame}\n\\begin{frame}{Takeaway}\nDesign, evidence, and interpretation should answer the same research question.\n\\end{frame}\n\\appendix\n\\begin{frame}{Backup: the contrast}\n\\[\\widehat\\beta=(\\overline Y_{T,post}-\\overline Y_{T,pre})-(\\overline Y_{C,post}-\\overline Y_{C,pre}).\\]\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer",
      "academic"
    ]
  },
  {
    "id": "ex-beamer-overlays",
    "title": {
      "zh": "逐步显示与稳定布局",
      "en": "Overlays with stable layout"
    },
    "description": {
      "zh": "同一 frame 生成多个 PDF 页，对比占位与移除内容。",
      "en": "One frame produces multiple PDF pages and contrasts reserved space with removed content."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{beamer}\n\\setbeamertemplate{navigation symbols}{}\n\\begin{document}\n\\begin{frame}{A stable explanation}\n\\begin{itemize}\n\\item<1-> Define $x$.\n\\item<2-> Compute $f(x)$.\n\\item<3-> Interpret the result.\n\\end{itemize}\n\\uncover<2->{This line reserves its height on every overlay.}\n\\only<3>{This line exists only on overlay three.}\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer"
    ]
  },
  {
    "id": "ex-beamer-fragile",
    "title": {
      "zh": "Beamer 中展示代码",
      "en": "Code in a fragile frame"
    },
    "description": {
      "zh": "verbatim 原样读取字符；fragile 改变 frame 的读取方式。",
      "en": "Verbatim reads literal characters; fragile changes how Beamer reads a frame."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{beamer}\n\n\\begin{document}\n\\begin{frame}[fragile]{Literal source}\n\\begin{verbatim}\nfor x in range(3):\n    print(x) # literal comment\n\\end{verbatim}\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer",
      "code"
    ]
  },
  {
    "id": "ex-beamer-theme",
    "title": {
      "zh": "轻量自定义主题",
      "en": "A small custom theme"
    },
    "description": {
      "zh": "使用公开模板接口设置标题和页脚。",
      "en": "Use the public template interface for titles and a frame counter."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{beamer}\n\\definecolor{atelier}{RGB}{25,92,78}\n\\setbeamercolor{structure}{fg=atelier}\n\\setbeamercolor{frametitle}{fg=white,bg=atelier}\n\\setbeamerfont{frametitle}{series=\\bfseries}\n\\setbeamertemplate{navigation symbols}{}\n\\setbeamertemplate{footline}{\\hfill\\insertframenumber/\\inserttotalframenumber\\hspace{1em}\\vspace{2mm}}\n\\begin{document}\n\\begin{frame}{A readable custom theme}\n\\begin{block}{One claim}Theme settings belong in the preamble.\\end{block}\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer"
    ]
  },
  {
    "id": "ex-beamer-notes",
    "title": {
      "zh": "讲者备注与讲义",
      "en": "Speaker notes and handouts"
    },
    "description": {
      "zh": "源码保存讲者备注；此示例隐藏备注，可以改为右侧备注输出。",
      "en": "Keep speaker notes in the source; notes are hidden here and can be moved to a second screen."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{beamer}\n\\usepackage{pgfpages}\n\\setbeameroption{hide notes}\n% For a two-screen PDF: \\setbeameroption{show notes on second screen=right}\n\\begin{document}\n\\begin{frame}{A talk with notes}\n\\begin{itemize}\\item State the question.\\item Show the evidence.\\end{itemize}\n\\note{Allow two minutes for this frame. Explain the sample before showing the estimate.}\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer"
    ]
  },
  {
    "id": "ex-beamer-chinese",
    "title": {
      "zh": "中文研究报告",
      "en": "A Chinese research presentation"
    },
    "description": {
      "zh": "XeLaTeX 与 Fandol 字体提供可移植中文示例。",
      "en": "XeLaTeX with Fandol fonts provides a portable Chinese example."
    },
    "engine": "xelatex",
    "code": "\\documentclass[aspectratio=169]{beamer}\n\\usepackage[fontset=fandol]{ctex}\n\\usetheme{Madrid}\n\\title{政策评估：研究设计与证据}\n\\author{研究团队}\n\\date{学术报告}\n\\begin{document}\n\\begin{frame}\\titlepage\\end{frame}\n\\begin{frame}{研究问题}\n\\begin{block}{目标}解释政策如何影响收入。\\end{block}\n\\[y_{it}=\\alpha_i+\\lambda_t+\\beta D_{it}+\\varepsilon_{it}.\\]\n\\end{frame}\n\\end{document}\n",
    "modules": [
      "beamer",
      "chinese"
    ]
  },
  {
    "id": "ex-tikz-paths",
    "title": {
      "zh": "TikZ 坐标与路径",
      "en": "TikZ coordinates and paths"
    },
    "description": {
      "zh": "展示路径终止符、箭头与文字节点。",
      "en": "Shows path terminators, arrows, and text nodes."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{tikz}\\usetikzlibrary{arrows.meta}\n\\begin{document}\n\\begin{tikzpicture}[>=Stealth]\n\\draw[->] (0,0)--(4,0) node[right]{$x$};\n\\draw[->] (0,0)--(0,3) node[above]{$y$};\n\\fill[teal] (2,1) circle[radius=2pt];\n\\node[above right] at (2,1){$A=(2,1)$};\n\\draw[thick,blue] (0,0)--(2,1)--(3,2);\n\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "tikz"
    ]
  },
  {
    "id": "ex-tikz-flow",
    "title": {
      "zh": "研究流程图",
      "en": "Research workflow diagram"
    },
    "description": {
      "zh": "相对定位和命名节点使流程容易维护。",
      "en": "Relative placement and named nodes keep a workflow maintainable."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{tikz}\\usetikzlibrary{positioning,arrows.meta}\n\\begin{document}\n\\begin{tikzpicture}[node distance=12mm,>=Stealth,\nbox/.style={draw,rounded corners,minimum width=28mm,minimum height=9mm,fill=teal!8}]\n\\node[box] (data){Collect data};\n\\node[box,below=of data] (clean){Clean data};\n\\node[box,below=of clean] (estimate){Estimate model};\n\\node[box,below=of estimate] (check){Check assumptions};\n\\draw[->] (data)--(clean);\\draw[->] (clean)--(estimate);\\draw[->] (estimate)--(check);\n\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "tikz"
    ]
  },
  {
    "id": "ex-tikz-tree",
    "title": {
      "zh": "简单决策树",
      "en": "A simple decision tree"
    },
    "description": {
      "zh": "child 语法适合小型层级图。",
      "en": "The child syntax suits small hierarchical diagrams."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{tikz}\n\\begin{document}\n\\begin{tikzpicture}[level distance=15mm,sibling distance=42mm,\nevery node/.style={draw,rounded corners,fill=blue!5},edge from parent/.style={draw,->}]\n\\node{Policy}\n child{node{Adopt} child{node{High benefit}} child{node{Low benefit}}}\n child{node{Delay} child{node{Collect evidence}}};\n\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "tikz"
    ]
  },
  {
    "id": "ex-tikz-network",
    "title": {
      "zh": "小型网络图",
      "en": "A small network diagram"
    },
    "description": {
      "zh": "固定坐标控制节点位置，用 pdfLaTeX 编译。",
      "en": "Fixed coordinates control node placement; compile with pdfLaTeX."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{tikz}\n\\begin{document}\n\\begin{tikzpicture}[every node/.style={circle,draw,fill=teal!10,minimum size=8mm}]\n\\node (a) at (0,1){A};\\node (b) at (2,2){B};\n\\node (c) at (4,1){C};\\node (d) at (2,0){D};\n\\draw (a)--(b)--(c)--(d)--(a);\\draw (b)--(d);\n\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "tikz"
    ]
  },
  {
    "id": "ex-tikz-layers",
    "title": {
      "zh": "背景层与重复节点",
      "en": "Background layers and repeated nodes"
    },
    "description": {
      "zh": "绘制顺序与背景层控制元素遮挡。",
      "en": "Drawing order and a background layer control overlap."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{tikz}\\usetikzlibrary{backgrounds}\n\\begin{document}\n\\begin{tikzpicture}\n\\foreach \\x in {0,1,2}{\\node[draw,circle,fill=white] (n\\x) at (\\x*1.5,0){\\x};}\n\\draw (n0)--(n1)--(n2);\n\\begin{scope}[on background layer]\n\\fill[teal!15,rounded corners] (-.5,-.6) rectangle (3.5,.6);\n\\end{scope}\n\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "tikz"
    ]
  },
  {
    "id": "ex-pgfplots-functions",
    "title": {
      "zh": "函数曲线与图例",
      "en": "Function plots and legends"
    },
    "description": {
      "zh": "使用显式采样域绘制线性与二次函数。",
      "en": "Plot linear and quadratic functions over explicit sampling domains."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{pgfplots}\\pgfplotsset{compat=1.18}\n\\begin{document}\n\\begin{tikzpicture}\n\\begin{axis}[width=.85\\linewidth,xlabel={$x$},ylabel={$f(x)$},grid=major,legend pos=north west]\n\\addplot[blue,domain=-2:2,samples=80]{x^2};\\addlegendentry{$x^2$}\n\\addplot[teal,domain=-2:2]{x+1};\\addlegendentry{$x+1$}\n\\end{axis}\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "pgfplots"
    ]
  },
  {
    "id": "ex-pgfplots-supply",
    "title": {
      "zh": "供给、需求与均衡",
      "en": "Supply, demand, and equilibrium"
    },
    "description": {
      "zh": "理论曲线使用数量横轴、价格纵轴，并标明均衡点。",
      "en": "A theoretical chart places quantity on the horizontal axis and price on the vertical axis."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{pgfplots}\\pgfplotsset{compat=1.18}\n\\begin{document}\n\\begin{tikzpicture}\n\\begin{axis}[width=.85\\linewidth,xmin=0,xmax=8,ymin=0,ymax=9,\nxlabel={Quantity $Q$},ylabel={Price $P$},axis lines=left,legend pos=north east]\n\\addplot[blue,thick,domain=0:8]{8-x};\\addlegendentry{Demand}\n\\addplot[teal,thick,domain=0:8]{x};\\addlegendentry{Supply}\n\\addplot[only marks,mark=*,black] coordinates {(4,4)};\n\\draw[dashed] (axis cs:4,0)--(axis cs:4,4)--(axis cs:0,4);\n\\node[above right] at (axis cs:4,4){$E$};\n\\end{axis}\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "pgfplots",
      "academic"
    ]
  },
  {
    "id": "ex-pgfplots-scatter",
    "title": {
      "zh": "散点与误差棒",
      "en": "Scatter points and error bars"
    },
    "description": {
      "zh": "坐标数据与对称纵向误差分别输入。",
      "en": "Input coordinates and symmetric vertical errors separately."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{pgfplots}\\pgfplotsset{compat=1.18}\n\\begin{document}\n\\begin{tikzpicture}\\begin{axis}[width=.85\\linewidth,xlabel={Dose},ylabel={Response},grid=major]\n\\addplot+[only marks,error bars/.cd,y dir=both,y explicit]\ncoordinates {(1,2) +- (0,.3) (2,3.2) +- (0,.4) (3,3.8) +- (0,.2)};\n\\end{axis}\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "pgfplots"
    ]
  },
  {
    "id": "ex-pgfplots-bars",
    "title": {
      "zh": "统计柱状图",
      "en": "A statistical bar chart"
    },
    "description": {
      "zh": "使用分类坐标轴排列柱状数据。",
      "en": "Places bars along a categorical axis."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{pgfplots}\\pgfplotsset{compat=1.18}\n\\begin{document}\n\\begin{tikzpicture}\\begin{axis}[width=.85\\linewidth,ybar,bar width=18pt,\nymin=0,ylabel={Count},symbolic x coords={A,B,C},xtick=data,nodes near coords]\n\\addplot coordinates {(A,12) (B,18) (C,9)};\n\\end{axis}\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "pgfplots"
    ]
  },
  {
    "id": "ex-pgfplots-group",
    "title": {
      "zh": "对齐的多子图",
      "en": "Aligned group plots"
    },
    "description": {
      "zh": "groupplots 共享尺寸和间距而保持独立坐标轴。",
      "en": "Group plots share dimensions and spacing while retaining independent axes."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{pgfplots}\\pgfplotsset{compat=1.18}\\usepgfplotslibrary{groupplots}\n\\begin{document}\n\\begin{tikzpicture}\n\\begin{groupplot}[group style={group size=2 by 1,horizontal sep=16mm},width=.43\\linewidth,height=5cm,xlabel={$x$}]\n\\nextgroupplot[title={Linear}]\\addplot[domain=0:2]{x};\n\\nextgroupplot[title={Quadratic}]\\addplot[domain=0:2]{x^2};\n\\end{groupplot}\\end{tikzpicture}\n\\end{document}\n",
    "modules": [
      "pgfplots"
    ]
  },
  {
    "id": "ex-layout-geometry",
    "title": {
      "zh": "页边距与行距",
      "en": "Margins and line spacing"
    },
    "description": {
      "zh": "A4 页面、页眉区域与局部单倍行距。",
      "en": "A4 margins, header space, and locally single-spaced text."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[a4paper,margin=25mm,includeheadfoot]{geometry}\\usepackage{setspace}\\onehalfspacing\n\\begin{document}\n\\section{Page geometry}\nThis paragraph uses one-and-a-half spacing. The margins are measured from the paper edges.\n\\begin{singlespace}A compact note can use single spacing locally.\\end{singlespace}\n\\end{document}\n",
    "modules": [
      "layout"
    ]
  },
  {
    "id": "ex-layout-headers",
    "title": {
      "zh": "页眉、页脚与章节标记",
      "en": "Headers, footers, and marks"
    },
    "description": {
      "zh": "fancyhdr 的页眉高度和 plain 页面样式单独配置。",
      "en": "Configure the header height and plain pages explicitly."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[a4paper,margin=25mm,headheight=15pt]{geometry}\n\\usepackage{fancyhdr}\n\\pagestyle{fancy}\\fancyhf{}\n\\fancyhead[L]{Research notes}\\fancyhead[R]{\\nouppercase{\\leftmark}}\n\\fancyfoot[C]{\\thepage}\n\\fancypagestyle{plain}{\\fancyhf{}\\fancyfoot[C]{\\thepage}}\n\\begin{document}\n\\section{Methods}The header shows the current section; the footer contains the page number.\n\\newpage A second page keeps the same style.\n\\end{document}\n",
    "modules": [
      "layout"
    ]
  },
  {
    "id": "ex-layout-lists",
    "title": {
      "zh": "嵌套列表与标签",
      "en": "Nested lists and labels"
    },
    "description": {
      "zh": "enumitem 控制标签宽度与缩进。",
      "en": "enumitem controls label width and indentation."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{enumitem}\n\\begin{document}\n\\begin{enumerate}[label=\\arabic*.,leftmargin=*]\n\\item Design the study.\n\\begin{enumerate}[label=(\\alph*),leftmargin=*]\n\\item Define the population.\\item Define the outcome.\n\\end{enumerate}\n\\item Report uncertainty.\n\\end{enumerate}\n\\begin{description}[style=nextline]\\item[Identification]The assumptions that connect the estimate to a causal effect.\\end{description}\n\\end{document}\n",
    "modules": [
      "layout"
    ]
  },
  {
    "id": "ex-layout-columns",
    "title": {
      "zh": "局部多栏文本",
      "en": "Local multicolumn text"
    },
    "description": {
      "zh": "multicols 在正文中创建平衡的栏布局。",
      "en": "multicols creates balanced columns within a document."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{multicol}\n\\begin{document}\n\\section{A short reference sheet}\n\\begin{multicols}{2}\n\\subsection*{Inputs}Record data sources and units. Check identifiers before merging data.\n\\subsection*{Estimation}State the model. Explain the sample and the treatment definition.\n\\subsection*{Output}Keep figure and table generation reproducible. Record software versions.\n\\end{multicols}\n\\end{document}\n",
    "modules": [
      "layout"
    ]
  },
  {
    "id": "ex-text-fonts",
    "title": {
      "zh": "文本字体族与颜色",
      "en": "Text font families and color"
    },
    "description": {
      "zh": "字重、字体族、局部字号与颜色语义独立控制。",
      "en": "Control weight, family, local size, and color independently."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[T1]{fontenc}\\usepackage{lmodern}\\usepackage{xcolor}\\definecolor{atelier}{HTML}{195C4E}\n\\begin{document}\nRoman text, \\textsf{sans serif}, and \\texttt{monospaced text}.\n\n\\textbf{Bold}, \\textit{italic}, and \\textsc{small capitals}.\n\n{\\Large A local heading\\par}\n\\textcolor{atelier}{A colored label} and ordinary black body text.\n\\end{document}\n",
    "modules": [
      "fonts"
    ]
  },
  {
    "id": "ex-fontspec",
    "title": {
      "zh": "可移植的 OpenType 字体",
      "en": "Portable OpenType fonts"
    },
    "description": {
      "zh": "使用 TeX 发行版提供的 TeX Gyre 字体文件。",
      "en": "Uses TeX Gyre font files supplied by the TeX distribution."
    },
    "engine": "xelatex",
    "code": "\\documentclass{article}\n\\usepackage{fontspec}\n\\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]\n\\setsansfont{texgyreheros-regular.otf}[BoldFont=texgyreheros-bold.otf,ItalicFont=texgyreheros-italic.otf]\n\\setmonofont{texgyrecursor-regular.otf}[BoldFont=texgyrecursor-bold.otf,ItalicFont=texgyrecursor-italic.otf]\n\\begin{document}\n\\section{Unicode typography}\nText contains café, naïve, and Ω. \\textsf{Sans serif} and \\texttt{monospaced} fonts are set independently.\n\nText font selection does not set the mathematical font: $\\alpha+\\beta=\\gamma$.\n\\end{document}\n",
    "modules": [
      "fonts"
    ]
  },
  {
    "id": "ex-code-listings",
    "title": {
      "zh": "listings 源码清单",
      "en": "Source listings with listings"
    },
    "description": {
      "zh": "在 TeX 内为 Python 源码设置高亮样式。",
      "en": "Styles Python source within TeX."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{xcolor,listings}\n\\lstset{language=Python,basicstyle=\\ttfamily\\small,keywordstyle=\\color{blue},commentstyle=\\color{teal},numbers=left,breaklines=true,frame=single,showstringspaces=false}\n\\begin{document}\n\\begin{lstlisting}[caption={A transparent calculation},label={lst:mean}]\ndef mean(values):\n    return sum(values) / len(values)\n\\end{lstlisting}\nListing~\\ref{lst:mean} assumes a nonempty input.\n\\end{document}\n",
    "modules": [
      "code"
    ]
  },
  {
    "id": "ex-code-minted",
    "title": {
      "zh": "minted 3 高亮示例",
      "en": "Highlighting with minted 3"
    },
    "description": {
      "zh": "需要 latexminted 与 Python；现代受限 shell escape 配置可直接编译。",
      "en": "Requires latexminted and Python; modern restricted shell-escape configurations can compile directly."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{minted}\n\\begin{document}\n\\begin{minted}[linenos,breaklines,frame=single]{python}\ndef mean(values):\n    return sum(values) / len(values)\n\\end{minted}\n\\end{document}\n",
    "modules": [
      "code"
    ]
  },
  {
    "id": "ex-code-boxes",
    "title": {
      "zh": "可分页的提示框",
      "en": "Breakable explanatory boxes"
    },
    "description": {
      "zh": "tcolorbox 的 breakable 库允许长文本框跨页。",
      "en": "The breakable library lets long explanatory boxes span pages."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[breakable]{tcolorbox}\n\\begin{document}\n\\begin{tcolorbox}[title={Check the sample},colback=teal!5,colframe=teal!60!black,breakable]\nA restriction changes the population represented by an estimate. Report the restriction in the text and table notes.\n\\end{tcolorbox}\n\\end{document}\n",
    "modules": [
      "code"
    ]
  },
  {
    "id": "ex-algorithm-pseudocode",
    "title": {
      "zh": "algorithm 与 algpseudocode",
      "en": "algorithm with algpseudocode"
    },
    "description": {
      "zh": "浮动体负责标题，algorithmic 环境负责伪代码结构。",
      "en": "The float supplies a caption; algorithmic supplies pseudocode structure."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{algorithm}\\usepackage{algpseudocode}\n\\begin{document}\n\\begin{algorithm}\n\\caption{Compute a sample mean}\\label{alg:mean}\n\\begin{algorithmic}[1]\n\\Require Nonempty vector $x_1,\\ldots,x_n$\n\\Ensure Sample mean $\\bar x$\n\\State $s\\gets 0$\n\\For{$i\\gets 1$ to $n$}\\State $s\\gets s+x_i$\\EndFor\n\\State \\Return $s/n$\n\\end{algorithmic}\n\\end{algorithm}\nAlgorithm~\\ref{alg:mean} uses one pass.\n\\end{document}\n",
    "modules": [
      "algorithms"
    ]
  },
  {
    "id": "ex-algorithm2e",
    "title": {
      "zh": "algorithm2e 独立语法",
      "en": "The independent algorithm2e syntax"
    },
    "description": {
      "zh": "algorithm2e 包含浮动体和自己的关键词接口。",
      "en": "algorithm2e supplies both the float and its own keyword interface."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[ruled,vlined]{algorithm2e}\n\\begin{document}\n\\begin{algorithm}\n\\caption{Compute a sample mean}\n\\KwIn{Nonempty vector $x_1,\\ldots,x_n$}\n\\KwOut{Sample mean}\n$s\\gets 0$\\;\n\\For{$i\\gets 1$ \\KwTo $n$}{$s\\gets s+x_i$\\;}\n\\Return{$s/n$}\\;\n\\end{algorithm}\n\\end{document}\n",
    "modules": [
      "algorithms"
    ]
  },
  {
    "id": "ex-programming-macros",
    "title": {
      "zh": "有参数的语义命令",
      "en": "Semantic commands with arguments"
    },
    "description": {
      "zh": "默认可选参数和分组保存样式边界。",
      "en": "A default optional argument and grouping preserve style boundaries."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{amsmath}\n\\newcommand{\\norm}[1]{\\lVert #1\\rVert}\n\\newcommand{\\warning}[2][Note]{{\\bfseries #1:} #2\\par}\n\\begin{document}\n\\section{Reusable notation}\n\\warning[Input]{The vector must be nonempty.}\nThe norm is $\\norm{x}$, and the next paragraph has ordinary styling.\n\\end{document}\n",
    "modules": [
      "programming"
    ]
  },
  {
    "id": "ex-programming-expl3",
    "title": {
      "zh": "expl3 字符串列表接口",
      "en": "An expl3 comma-list interface"
    },
    "description": {
      "zh": "公开文档命令调用带模块前缀的 expl3 函数。",
      "en": "A public document command calls an expl3 function with a module prefix."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\ExplSyntaxOn\n\\cs_new_protected:Npn \\atelier_list:n #1\n  { \\clist_map_inline:nn {#1} { \\texttt{##1}\\quad } }\n\\NewDocumentCommand{\\AtelierList}{m}{\\atelier_list:n{#1}}\n\\ExplSyntaxOff\n\\begin{document}\n\\section{Generated labels}\n\\AtelierList{alpha,beta,gamma}\n\\AtelierList{data,model,results}\n\\end{document}\n",
    "modules": [
      "programming"
    ]
  },
  {
    "id": "ex-custom-package",
    "title": {
      "zh": "复用的自定义 .sty",
      "en": "A reusable custom .sty package"
    },
    "description": {
      "zh": "额外文件 ateliernotes.sty 定义共享命令。",
      "en": "The additional ateliernotes.sty file defines a shared command."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{ateliernotes}\n\\begin{document}\n\\StudyNote{Use the same notation in every chapter.}\n\\end{document}\n",
    "modules": [
      "programming",
      "projects"
    ],
    "files": {
      "ateliernotes.sty": "\\NeedsTeXFormat{LaTeX2e}\n\\ProvidesPackage{ateliernotes}[2026/10/09 Shared study notes]\n\\RequirePackage{xcolor}\n\\newcommand{\\StudyNote}[1]{\\par\\noindent\\textcolor{teal}{\\textbf{Note:}} #1\\par}\n\\endinput\n"
    }
  },
  {
    "id": "ex-custom-class",
    "title": {
      "zh": "基于 article 的自定义 .cls",
      "en": "A custom .cls based on article"
    },
    "description": {
      "zh": "额外类文件向 article 转发未知选项。",
      "en": "The additional class file forwards unknown options to article."
    },
    "engine": "pdflatex",
    "code": "\\documentclass[11pt]{atelierreport}\n\\title{Reusable Report}\\author{Research Group}\\date{}\n\\begin{document}\n\\section{An inherited structure}This class retains article sectioning.\n\\end{document}\n",
    "modules": [
      "programming",
      "projects"
    ],
    "files": {
      "atelierreport.cls": "\\NeedsTeXFormat{LaTeX2e}\n\\ProvidesClass{atelierreport}[2026/10/09 A small report class]\n\\DeclareOption*{\\PassOptionsToClass{\\CurrentOption}{article}}\n\\ProcessOptions\\relax\n\\LoadClass{article}\n\\RequirePackage[a4paper,margin=25mm]{geometry}\n\\endinput\n"
    }
  },
  {
    "id": "ex-structure-notes",
    "title": {
      "zh": "脚注、尾注与旁注",
      "en": "Footnotes, endnotes, and margin notes"
    },
    "description": {
      "zh": "三种注释有不同阅读位置；尾注在文末输出。",
      "en": "The three note types have different reading locations; endnotes print at the end."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[margin=30mm,marginparwidth=22mm]{geometry}\\usepackage{endnotes}\n\\begin{document}\nA definition\\footnote{Footnotes stay close to the page where they are called.} belongs in the text.\nA source note\\endnote{Endnotes are collected for later reading.} can be collected.\n\\marginpar{\\raggedright Check the units.}\n\\section*{Notes}\\theendnotes\n\\end{document}\n",
    "modules": [
      "structure"
    ]
  },
  {
    "id": "ex-structure-index",
    "title": {
      "zh": "一个可编译索引",
      "en": "A compilable index"
    },
    "description": {
      "zh": "imakeidx 调用索引程序；受限执行配置允许 makeindex。",
      "en": "imakeidx invokes the index processor; restricted execution can allow makeindex."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{imakeidx}\\makeindex\n\\begin{document}\n\\section{Concepts}\nAn estimator\\index{estimator} maps data to an estimate.\nA confidence interval\\index{confidence interval} reports uncertainty.\n\\printindex\n\\end{document}\n",
    "modules": [
      "structure"
    ]
  },
  {
    "id": "ex-structure-glossary",
    "title": {
      "zh": "不需要外部索引程序的术语表",
      "en": "A glossary without an external indexer"
    },
    "description": {
      "zh": "使用 glossaries 的 no-index 工作流，需要两次 LaTeX 编译。",
      "en": "Use the glossaries no-index workflow, with two LaTeX runs."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[acronym]{glossaries}\n\\makenoidxglossaries\n\\newacronym{did}{DiD}{difference in differences}\n\\begin{document}\nThe \\gls{did} estimator compares group changes.\n\nLater uses can display \\gls{did}.\n\\printnoidxglossary[type=\\acronymtype,title={Glossary}]\n\\end{document}\n",
    "modules": [
      "structure"
    ]
  },
  {
    "id": "ex-academic-thesis",
    "title": {
      "zh": "中文学位论文结构示例",
      "en": "A Chinese thesis structure"
    },
    "description": {
      "zh": "展示书籍式前置部分、正文、附录和后置部分的通用结构。",
      "en": "Shows a general book-style structure with front matter, chapters, appendices, and back matter."
    },
    "engine": "xelatex",
    "code": "\\documentclass[fontset=fandol,openany]{ctexbook}\n\\usepackage{lmodern,amsmath}\n\\begin{document}\n\\frontmatter\n\\title{政策评估研究}\\author{研究者}\\date{}\\maketitle\n\\chapter{摘要}本文展示学位论文的结构组织方法。\n\\tableofcontents\n\\mainmatter\n\\chapter{研究问题}\\label{ch:intro}说明问题、文献和研究贡献。\n\\chapter{研究方法}\\[y_{it}=\\alpha_i+\\lambda_t+\\beta D_{it}+\\varepsilon_{it}.\\]\n\\chapter{结果与讨论}报告估计、标准误和研究限制。\n\\appendix\\chapter{补充材料}变量定义和额外检验。\n\\backmatter\\chapter{致谢}感谢提供建议的读者。\n\\end{document}\n",
    "modules": [
      "academic",
      "chinese",
      "structure"
    ]
  },
  {
    "id": "ex-academic-cv",
    "title": {
      "zh": "朴素学术简历",
      "en": "A restrained academic CV"
    },
    "description": {
      "zh": "用标准 article 维护教育、研究与成果信息。",
      "en": "Maintain education, research, and publications with a standard article."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[margin=22mm]{geometry}\\usepackage{enumitem}\\usepackage[hidelinks]{hyperref}\\pagestyle{empty}\n\\begin{document}\n\\begin{center}{\\LARGE Researcher Name}\\par\\href{mailto:name@example.org}{name@example.org}\\end{center}\n\\section*{Education}\n\\textbf{University Name}\\hfill 2022--2026\\\\PhD in Economics\n\\section*{Research interests}Applied econometrics; labor economics.\n\\section*{Working papers}\\begin{enumerate}[leftmargin=*]\\item A policy evaluation study. Working paper.\\end{enumerate}\n\\section*{Teaching}Introduction to Econometrics, teaching assistant.\n\\section*{Skills}R, Python, and LaTeX.\n\\end{document}\n",
    "modules": [
      "academic"
    ]
  },
  {
    "id": "ex-academic-exam",
    "title": {
      "zh": "带分值与答案的试卷",
      "en": "An examination with points and solutions"
    },
    "description": {
      "zh": "exam 类可切换答案显示并自动累计分值。",
      "en": "The exam class switches solutions on or off and tracks point values."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{exam}\n\\printanswers\\addpoints\n\\begin{document}\n\\begin{center}\\Large Methods Examination\\end{center}\n\\begin{questions}\n\\question[5] Define the sample mean.\n\\begin{solution}\\(\\bar{x}=n^{-1}\\sum_{i=1}^{n}x_i\\).\\end{solution}\n\\question[5] Explain why standard errors are reported.\n\\begin{solution}They quantify sampling uncertainty under stated assumptions.\\end{solution}\n\\end{questions}\n\\end{document}\n",
    "modules": [
      "academic"
    ]
  },
  {
    "id": "ex-academic-poster",
    "title": {
      "zh": "A3 研究海报",
      "en": "An A3 research poster"
    },
    "description": {
      "zh": "使用 geometry 与 multicols 制作可独立编译的静态海报。",
      "en": "Create a standalone static poster with geometry and multicols."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[a3paper,landscape,margin=20mm]{geometry}\\usepackage{multicol,amsmath}\\pagestyle{empty}\n\\begin{document}\n\\begin{center}{\\Huge Evaluating a Policy}\\par\\bigskip{\\Large Research Group}\\end{center}\n\\begin{multicols}{2}\n\\section*{Question}How does training affect earnings?\n\\section*{Design}\\[Y_{it}=\\alpha_i+\\lambda_t+\\beta D_{it}+\\varepsilon_{it}.\\]\n\\section*{Evidence}Use an informative graph and a compact results table. This template contains illustrative text only.\n\\section*{Interpretation}Explain assumptions, uncertainty, and limits.\n\\end{multicols}\n\\end{document}\n",
    "modules": [
      "academic"
    ]
  },
  {
    "id": "ex-project-input",
    "title": {
      "zh": "多文件研究报告",
      "en": "A research report in multiple files"
    },
    "description": {
      "zh": "主文件通过 input 载入 methods.tex；从主文件目录编译。",
      "en": "The main file inputs methods.tex; compile from the main file directory."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage{amsmath}\n\\begin{document}\n\\title{Reproducible Research Notes}\\author{Research Group}\\date{}\\maketitle\n\\section{Question}State the population and outcome.\n\\input{methods}\n\\section{Conclusion}State the supported conclusion.\n\\end{document}\n",
    "modules": [
      "projects"
    ],
    "files": {
      "methods.tex": "\\section{Methods}\\label{sec:methods}\nThe model is \\(y_i=\\alpha+\\beta x_i+\\varepsilon_i\\).\nRecord the data version and estimation settings.\n"
    }
  },
  {
    "id": "ex-accessibility-structure",
    "title": {
      "zh": "语义结构与 PDF 元数据",
      "en": "Semantic structure and PDF metadata"
    },
    "description": {
      "zh": "提供章节和描述性链接文本；最终 PDF 的标记结构需单独验证。",
      "en": "Provides headings and descriptive link text; validate the final PDF’s tagging structure separately."
    },
    "engine": "pdflatex",
    "code": "\\documentclass{article}\n\\usepackage[hidelinks,pdftitle={A Clearly Structured Report},pdfauthor={Research Group},pdflang={en-US}]{hyperref}\n\\begin{document}\n\\title{A Clearly Structured Report}\\author{Research Group}\\date{}\\maketitle\n\\section{Question}Does the policy affect the outcome?\n\\section{Evidence}The figure caption must explain the variables and units.\n\\section{Further reading}\\href{https://www.latex-project.org/}{LaTeX Project documentation} supplies current guidance.\n\\end{document}\n",
    "modules": [
      "accessibility"
    ]
  }
]);
 D.dictionary.push(...[
  {
    "id": "advanced-command-1",
    "module": "beamer",
    "category": "document",
    "command": "frame",
    "title": {
      "zh": "幻灯片框架",
      "en": "Presentation frame"
    },
    "detail": {
      "zh": "一个逻辑 frame 可因逐步显示生成多个 PDF 页。",
      "en": "One logical frame may produce several PDF slides through overlays."
    },
    "example": "\\begin{frame}[t]{Question}What changes?\\end{frame}",
    "package": "beamer",
    "entry": "beamer-frames"
  },
  {
    "id": "advanced-command-2",
    "module": "beamer",
    "category": "document",
    "command": "\\frametitle",
    "title": {
      "zh": "框架标题",
      "en": "Frame title"
    },
    "detail": {
      "zh": "在当前 frame 内设置幻灯片标题。",
      "en": "Sets the slide title within the current frame."
    },
    "example": "\\frametitle{Identification}",
    "package": "beamer",
    "entry": "beamer-frames"
  },
  {
    "id": "advanced-command-3",
    "module": "beamer",
    "category": "document",
    "command": "\\framesubtitle",
    "title": {
      "zh": "框架副标题",
      "en": "Frame subtitle"
    },
    "detail": {
      "zh": "补充标题下面的短说明。",
      "en": "Adds a short subtitle below the frame title."
    },
    "example": "\\framesubtitle{Assumptions and estimator}",
    "package": "beamer",
    "entry": "beamer-frames"
  },
  {
    "id": "advanced-command-4",
    "module": "beamer",
    "category": "document",
    "command": "\\titlepage",
    "title": {
      "zh": "演示标题页",
      "en": "Presentation title page"
    },
    "detail": {
      "zh": "读取 title、author 和 institute 等元数据，放进独立 frame。",
      "en": "Uses title, author, and institute metadata inside a separate frame."
    },
    "example": "\\begin{frame}\\titlepage\\end{frame}",
    "package": "beamer",
    "entry": "beamer-frames"
  },
  {
    "id": "advanced-command-5",
    "module": "beamer",
    "category": "document",
    "command": "\\usetheme",
    "title": {
      "zh": "完整主题",
      "en": "Complete presentation theme"
    },
    "detail": {
      "zh": "载入完整主题，可由颜色和字体主题继续覆盖。",
      "en": "Loads a complete theme that color and font themes can override."
    },
    "example": "\\usetheme{Madrid}",
    "package": "beamer",
    "entry": "beamer-themes"
  },
  {
    "id": "advanced-command-6",
    "module": "beamer",
    "category": "document",
    "command": "\\usecolortheme",
    "title": {
      "zh": "颜色主题",
      "en": "Color theme"
    },
    "detail": {
      "zh": "配置主题颜色，保留现有布局结构。",
      "en": "Configures colors while retaining the current layout."
    },
    "example": "\\usecolortheme{seahorse}",
    "package": "beamer",
    "entry": "beamer-themes"
  },
  {
    "id": "advanced-command-7",
    "module": "beamer",
    "category": "document",
    "command": "\\usefonttheme",
    "title": {
      "zh": "字体主题",
      "en": "Font theme"
    },
    "detail": {
      "zh": "控制演示字体；professionalfonts 保留用户专业字体设置。",
      "en": "Controls presentation fonts; professionalfonts preserves professional font settings."
    },
    "example": "\\usefonttheme{professionalfonts}",
    "package": "beamer",
    "entry": "beamer-themes"
  },
  {
    "id": "advanced-command-8",
    "module": "beamer",
    "category": "document",
    "command": "block",
    "title": {
      "zh": "一般语义框",
      "en": "General semantic block"
    },
    "detail": {
      "zh": "使用简短标题组织一个论点或定义。",
      "en": "Organizes a claim or definition under a short title."
    },
    "example": "\\begin{block}{Assumption}Parallel trends.\\end{block}",
    "package": "beamer",
    "entry": "beamer-blocks-columns"
  },
  {
    "id": "advanced-command-9",
    "module": "beamer",
    "category": "document",
    "command": "alertblock",
    "title": {
      "zh": "强调框",
      "en": "Alert block"
    },
    "detail": {
      "zh": "按主题的强调色呈现限制或关键条件。",
      "en": "Uses the theme’s alert styling for a condition or limitation."
    },
    "example": "\\begin{alertblock}{Limit}Small sample.\\end{alertblock}",
    "package": "beamer",
    "entry": "beamer-blocks-columns"
  },
  {
    "id": "advanced-command-10",
    "module": "beamer",
    "category": "document",
    "command": "exampleblock",
    "title": {
      "zh": "示例框",
      "en": "Example block"
    },
    "detail": {
      "zh": "把示例内容与一般论证区分。",
      "en": "Distinguishes an example from the surrounding argument."
    },
    "example": "\\begin{exampleblock}{Example}$n=100$.\\end{exampleblock}",
    "package": "beamer",
    "entry": "beamer-blocks-columns"
  },
  {
    "id": "advanced-command-11",
    "module": "beamer",
    "category": "document",
    "command": "columns",
    "title": {
      "zh": "演示分栏",
      "en": "Presentation columns"
    },
    "detail": {
      "zh": "T 顶部对齐，onlytextwidth 约束总宽度。",
      "en": "T top-aligns columns; onlytextwidth constrains their combined width."
    },
    "example": "\\begin{columns}[T,onlytextwidth]...\\end{columns}",
    "package": "beamer",
    "entry": "beamer-blocks-columns"
  },
  {
    "id": "advanced-command-12",
    "module": "beamer",
    "category": "document",
    "command": "\\pause",
    "title": {
      "zh": "顺序逐步显示",
      "en": "Sequential reveal"
    },
    "detail": {
      "zh": "延迟后续材料，适合简单线性叙述。",
      "en": "Delays following material in a simple linear explanation."
    },
    "example": "First point.\\pause Second point.",
    "package": "beamer",
    "entry": "beamer-overlays"
  },
  {
    "id": "advanced-command-13",
    "module": "beamer",
    "category": "document",
    "command": "\\only",
    "title": {
      "zh": "只在指定页出现",
      "en": "Overlay-only content"
    },
    "detail": {
      "zh": "未选中时完全移除内容，可能改变布局。",
      "en": "Removes content on unselected overlays and may shift the layout."
    },
    "example": "\\only<2>{A second-slide detail.}",
    "package": "beamer",
    "entry": "beamer-overlays"
  },
  {
    "id": "advanced-command-14",
    "module": "beamer",
    "category": "document",
    "command": "\\uncover",
    "title": {
      "zh": "保留空间的显示",
      "en": "Space-preserving reveal"
    },
    "detail": {
      "zh": "隐藏时保留占位，避免内容上下跳动。",
      "en": "Keeps the content’s space while hiding it."
    },
    "example": "\\uncover<2->{The estimate is positive.}",
    "package": "beamer",
    "entry": "beamer-overlays"
  },
  {
    "id": "advanced-command-15",
    "module": "beamer",
    "category": "document",
    "command": "\\onslide",
    "title": {
      "zh": "逐步显示状态",
      "en": "Overlay visibility state"
    },
    "detail": {
      "zh": "不带花括号时作用于后续材料直到下一次状态切换。",
      "en": "The unbraced form affects following material until another state change."
    },
    "example": "\\onslide<2-> Second and later slides.",
    "package": "beamer",
    "entry": "beamer-overlays"
  },
  {
    "id": "advanced-command-16",
    "module": "beamer",
    "category": "document",
    "command": "\\note",
    "title": {
      "zh": "讲者备注",
      "en": "Speaker note"
    },
    "detail": {
      "zh": "附着于当前 frame，按 notes 配置选择输出。",
      "en": "Associates a note with the frame; notes settings control output."
    },
    "example": "\\note{Explain the sample before the model.}",
    "package": "beamer",
    "entry": "beamer-notes"
  },
  {
    "id": "advanced-command-17",
    "module": "beamer",
    "category": "document",
    "command": "\\setbeameroption",
    "title": {
      "zh": "演示输出选项",
      "en": "Presentation output options"
    },
    "detail": {
      "zh": "配置隐藏备注或双屏备注布局。",
      "en": "Configures hidden notes or a two-screen notes layout."
    },
    "example": "\\setbeameroption{hide notes}",
    "package": "beamer",
    "entry": "beamer-notes"
  },
  {
    "id": "advanced-command-18",
    "module": "beamer",
    "category": "document",
    "command": "\\setbeamertemplate",
    "title": {
      "zh": "主题模板接口",
      "en": "Theme template interface"
    },
    "detail": {
      "zh": "通过公开接口设置 footline 等主题元素。",
      "en": "Sets elements such as footline through a public interface."
    },
    "example": "\\setbeamertemplate{navigation symbols}{}",
    "package": "beamer",
    "entry": "beamer-custom-theme"
  },
  {
    "id": "advanced-command-19",
    "module": "beamer",
    "category": "document",
    "command": "\\setbeamercolor",
    "title": {
      "zh": "主题颜色接口",
      "en": "Theme color interface"
    },
    "detail": {
      "zh": "用 fg 和 bg 设置命名主题元素的颜色。",
      "en": "Sets foreground and background colors of a named theme element."
    },
    "example": "\\setbeamercolor{structure}{fg=teal}",
    "package": "beamer",
    "entry": "beamer-themes"
  },
  {
    "id": "advanced-command-20",
    "module": "beamer",
    "category": "document",
    "command": "\\insertframenumber",
    "title": {
      "zh": "当前框架编号",
      "en": "Current frame number"
    },
    "detail": {
      "zh": "框架编号不同于带 overlay 的 PDF 页码。",
      "en": "A frame number differs from the page number of an overlay PDF."
    },
    "example": "\\insertframenumber/\\inserttotalframenumber",
    "package": "beamer",
    "entry": "beamer-notes"
  },
  {
    "id": "advanced-command-21",
    "module": "tikz",
    "category": "document",
    "command": "tikzpicture",
    "title": {
      "zh": "矢量绘图环境",
      "en": "Vector drawing environment"
    },
    "detail": {
      "zh": "容纳路径和节点，普通用法兼容三种 PDF 引擎。",
      "en": "Holds paths and nodes; ordinary use supports the three PDF engines."
    },
    "example": "\\begin{tikzpicture}\\draw (0,0)--(1,1);\\end{tikzpicture}",
    "package": "tikz",
    "entry": "tikz-paths"
  },
  {
    "id": "advanced-command-22",
    "module": "tikz",
    "category": "document",
    "command": "\\draw",
    "title": {
      "zh": "描边路径",
      "en": "Stroke a path"
    },
    "detail": {
      "zh": "路径以分号结束，-- 连接直线。",
      "en": "End the path with a semicolon; -- joins straight segments."
    },
    "example": "\\draw[thick,->] (0,0)--(2,1);",
    "package": "tikz",
    "entry": "tikz-paths"
  },
  {
    "id": "advanced-command-23",
    "module": "tikz",
    "category": "document",
    "command": "\\fill",
    "title": {
      "zh": "填充路径",
      "en": "Fill a path"
    },
    "detail": {
      "zh": "填充封闭路径，不自动描边。",
      "en": "Fills a closed path without automatically stroking it."
    },
    "example": "\\fill[teal] (0,0) circle[radius=2pt];",
    "package": "tikz",
    "entry": "tikz-paths"
  },
  {
    "id": "advanced-command-24",
    "module": "tikz",
    "category": "document",
    "command": "\\filldraw",
    "title": {
      "zh": "填充并描边",
      "en": "Fill and stroke"
    },
    "detail": {
      "zh": "同时设置内部填充和边缘线条。",
      "en": "Applies both an interior fill and an outline."
    },
    "example": "\\filldraw[fill=teal!10,draw=teal] (0,0) rectangle (2,1);",
    "package": "tikz",
    "entry": "tikz-paths"
  },
  {
    "id": "advanced-command-25",
    "module": "tikz",
    "category": "document",
    "command": "\\node",
    "title": {
      "zh": "文字节点",
      "en": "Text node"
    },
    "detail": {
      "zh": "节点可命名并通过 north、west 等锚点引用。",
      "en": "Name a node and reference anchors such as north and west."
    },
    "example": "\\node[draw] (a) at (0,0){Input};",
    "package": "tikz",
    "entry": "tikz-nodes"
  },
  {
    "id": "advanced-command-26",
    "module": "tikz",
    "category": "packages",
    "command": "\\usetikzlibrary",
    "title": {
      "zh": "TikZ 库加载",
      "en": "Load TikZ libraries"
    },
    "detail": {
      "zh": "positioning、arrows.meta 等库扩展绘图接口。",
      "en": "Libraries such as positioning and arrows.meta extend the interface."
    },
    "example": "\\usetikzlibrary{positioning,arrows.meta}",
    "package": "tikz",
    "entry": "tikz-nodes"
  },
  {
    "id": "advanced-command-27",
    "module": "tikz",
    "category": "document",
    "command": "\\foreach",
    "title": {
      "zh": "图形循环",
      "en": "Drawing loop"
    },
    "detail": {
      "zh": "迭代列表，循环中的赋值通常是局部的。",
      "en": "Iterates over a list, with normally local iteration assignments."
    },
    "example": "\\foreach \\x in {0,1,2}{\\node at (\\x,0){\\x};}",
    "package": "tikz",
    "entry": "tikz-layers"
  },
  {
    "id": "advanced-command-28",
    "module": "tikz",
    "category": "document",
    "command": "scope",
    "title": {
      "zh": "局部绘图设置",
      "en": "Local drawing scope"
    },
    "detail": {
      "zh": "局部应用 shift、rotate 和样式。",
      "en": "Applies shift, rotate, and styles locally."
    },
    "example": "\\begin{scope}[rotate=30]\\draw (0,0)--(1,0);\\end{scope}",
    "package": "tikz",
    "entry": "tikz-layers"
  },
  {
    "id": "advanced-command-29",
    "module": "pgfplots",
    "category": "document",
    "command": "axis",
    "title": {
      "zh": "数据坐标轴",
      "en": "Data axes"
    },
    "detail": {
      "zh": "在 tikzpicture 内管理数据坐标和刻度。",
      "en": "Manages data coordinates and ticks inside tikzpicture."
    },
    "example": "\\begin{axis}[xlabel={$x$},ylabel={$y$}]...\\end{axis}",
    "package": "pgfplots",
    "entry": "pgfplots-axis"
  },
  {
    "id": "advanced-command-30",
    "module": "pgfplots",
    "category": "document",
    "command": "\\addplot",
    "title": {
      "zh": "添加曲线或数据",
      "en": "Add a curve or dataset"
    },
    "detail": {
      "zh": "接受函数表达式、coordinates 或 table。",
      "en": "Accepts a function, coordinates, or table data."
    },
    "example": "\\addplot[domain=0:2]{x^2};",
    "package": "pgfplots",
    "entry": "pgfplots-axis"
  },
  {
    "id": "advanced-command-31",
    "module": "pgfplots",
    "category": "document",
    "command": "\\pgfplotsset",
    "title": {
      "zh": "绘图全局配置",
      "en": "Plot defaults"
    },
    "detail": {
      "zh": "compat 固定兼容行为；其数值是行为版本，宏包本身可能已更新。",
      "en": "compat fixes a behavior version; the installed package may be newer."
    },
    "example": "\\pgfplotsset{compat=1.18,width=8cm}",
    "package": "pgfplots",
    "entry": "pgfplots-axis"
  },
  {
    "id": "advanced-command-32",
    "module": "pgfplots",
    "category": "document",
    "command": "\\addlegendentry",
    "title": {
      "zh": "图例项",
      "en": "Legend entry"
    },
    "detail": {
      "zh": "通常放在对应 addplot 后，按绘图顺序生成图例。",
      "en": "Normally placed after the corresponding addplot, with legends following plot order."
    },
    "example": "\\addlegendentry{Demand}",
    "package": "pgfplots",
    "entry": "pgfplots-axis"
  },
  {
    "id": "advanced-command-33",
    "module": "pgfplots",
    "category": "document",
    "command": "groupplot",
    "title": {
      "zh": "对齐多子图",
      "en": "Aligned plot group"
    },
    "detail": {
      "zh": "需加载 groupplots 库并设 group size。",
      "en": "Requires the groupplots library and a group size."
    },
    "example": "\\begin{groupplot}[group style={group size=2 by 1}]...\\end{groupplot}",
    "package": "pgfplots",
    "entry": "pgfplots-multipanel"
  },
  {
    "id": "advanced-command-34",
    "module": "pgfplots",
    "category": "document",
    "command": "\\nextgroupplot",
    "title": {
      "zh": "下一个子图",
      "en": "Next group plot"
    },
    "detail": {
      "zh": "在 groupplot 中开始独立坐标轴。",
      "en": "Begins the next independent axis in a groupplot."
    },
    "example": "\\nextgroupplot[title={Quadratic}]\\addplot{x^2};",
    "package": "pgfplots",
    "entry": "pgfplots-multipanel"
  },
  {
    "id": "advanced-command-35",
    "module": "layout",
    "category": "packages",
    "command": "geometry",
    "title": {
      "zh": "页边距宏包",
      "en": "Page geometry package"
    },
    "detail": {
      "zh": "根据纸张和正文区域计算边距。",
      "en": "Computes margins from paper and body dimensions."
    },
    "example": "\\usepackage[a4paper,margin=25mm]{geometry}",
    "package": "geometry",
    "entry": "layout-geometry"
  },
  {
    "id": "advanced-command-36",
    "module": "layout",
    "category": "layout",
    "command": "\\newgeometry",
    "title": {
      "zh": "局部页面几何",
      "en": "Change page geometry"
    },
    "detail": {
      "zh": "从新页起改变正文尺寸，不用于更换纸张尺寸。",
      "en": "Changes body dimensions at a new page; it does not change paper size."
    },
    "example": "\\newgeometry{left=20mm,right=20mm}",
    "package": "geometry",
    "entry": "layout-geometry"
  },
  {
    "id": "advanced-command-37",
    "module": "layout",
    "category": "layout",
    "command": "\\restoregeometry",
    "title": {
      "zh": "恢复版面",
      "en": "Restore page geometry"
    },
    "detail": {
      "zh": "恢复导言区的 geometry 配置。",
      "en": "Restores the geometry configuration from the preamble."
    },
    "example": "\\restoregeometry",
    "package": "geometry",
    "entry": "layout-geometry"
  },
  {
    "id": "advanced-command-38",
    "module": "layout",
    "category": "layout",
    "command": "\\fancyhf",
    "title": {
      "zh": "清除页眉页脚",
      "en": "Clear header and footer fields"
    },
    "detail": {
      "zh": "空参数清除默认字段，便于建立一致页面样式。",
      "en": "An empty argument clears existing fields for a consistent page style."
    },
    "example": "\\fancyhf{}",
    "package": "fancyhdr",
    "entry": "layout-fancyhdr"
  },
  {
    "id": "advanced-command-39",
    "module": "layout",
    "category": "layout",
    "command": "\\fancyhead",
    "title": {
      "zh": "页眉字段",
      "en": "Header fields"
    },
    "detail": {
      "zh": "L、C、R 指位置，E、O 指页的奇偶。",
      "en": "L/C/R specify position and E/O specify even/odd pages."
    },
    "example": "\\fancyhead[LE,RO]{\\thepage}",
    "package": "fancyhdr",
    "entry": "layout-fancyhdr"
  },
  {
    "id": "advanced-command-40",
    "module": "layout",
    "category": "layout",
    "command": "\\fancyfoot",
    "title": {
      "zh": "页脚字段",
      "en": "Footer fields"
    },
    "detail": {
      "zh": "独立设置页脚内容。",
      "en": "Sets footer content independently."
    },
    "example": "\\fancyfoot[C]{\\thepage}",
    "package": "fancyhdr",
    "entry": "layout-fancyhdr"
  },
  {
    "id": "advanced-command-41",
    "module": "layout",
    "category": "layout",
    "command": "\\fancypagestyle",
    "title": {
      "zh": "命名页面样式",
      "en": "Named page style"
    },
    "detail": {
      "zh": "可单独定义章首页常用的 plain 样式。",
      "en": "Defines named styles including plain for chapter openings."
    },
    "example": "\\fancypagestyle{plain}{\\fancyhf{}\\fancyfoot[C]{\\thepage}}",
    "package": "fancyhdr",
    "entry": "layout-fancyhdr"
  },
  {
    "id": "advanced-command-42",
    "module": "layout",
    "category": "layout",
    "command": "\\titleformat",
    "title": {
      "zh": "章节格式",
      "en": "Heading format"
    },
    "detail": {
      "zh": "设置标题字体、标签和间距，章节层级由 section 保留。",
      "en": "Sets the heading font, label, and separation, with section retaining the document hierarchy."
    },
    "example": "\\titleformat{\\section}{\\large\\bfseries}{\\thesection}{1em}{}",
    "package": "titlesec",
    "entry": "layout-headings"
  },
  {
    "id": "advanced-command-43",
    "module": "layout",
    "category": "layout",
    "command": "\\titlespacing",
    "title": {
      "zh": "章节间距",
      "en": "Heading spacing"
    },
    "detail": {
      "zh": "依次设置左缩进、段前距、段后距。",
      "en": "Sets left indentation, before-space, and after-space."
    },
    "example": "\\titlespacing*{\\section}{0pt}{2ex}{1ex}",
    "package": "titlesec",
    "entry": "layout-headings"
  },
  {
    "id": "advanced-command-44",
    "module": "layout",
    "category": "layout",
    "command": "\\onehalfspacing",
    "title": {
      "zh": "一倍半行距",
      "en": "One-and-a-half spacing"
    },
    "detail": {
      "zh": "setspace 管理行距，脚注和浮动体可能另有规则。",
      "en": "setspace manages spacing, with distinct rules possible for notes and floats."
    },
    "example": "\\onehalfspacing",
    "package": "setspace",
    "entry": "layout-paragraphs"
  },
  {
    "id": "advanced-command-45",
    "module": "layout",
    "category": "layout",
    "command": "\\setstretch",
    "title": {
      "zh": "自定义行距因子",
      "en": "Custom spacing factor"
    },
    "detail": {
      "zh": "把基线间距调整到指定比例。",
      "en": "Adjusts baseline spacing by a specified factor."
    },
    "example": "\\setstretch{1.2}",
    "package": "setspace",
    "entry": "layout-paragraphs"
  },
  {
    "id": "advanced-command-46",
    "module": "layout",
    "category": "layout",
    "command": "\\parindent",
    "title": {
      "zh": "首行缩进长度",
      "en": "First-line indentation length"
    },
    "detail": {
      "zh": "用长度值设置段落首行缩进。",
      "en": "Sets first-line paragraph indentation through a length value."
    },
    "example": "\\setlength{\\parindent}{2em}",
    "package": "LaTeX kernel",
    "entry": "layout-paragraphs"
  },
  {
    "id": "advanced-command-47",
    "module": "layout",
    "category": "layout",
    "command": "\\parskip",
    "title": {
      "zh": "段间距长度",
      "en": "Paragraph separation length"
    },
    "detail": {
      "zh": "为段落增加垂直空白；可用 parskip 宏包协调列表。",
      "en": "Adds paragraph space; parskip coordinates related list spacing."
    },
    "example": "\\setlength{\\parskip}{.5em}",
    "package": "LaTeX kernel",
    "entry": "layout-paragraphs"
  },
  {
    "id": "advanced-command-48",
    "module": "layout",
    "category": "layout",
    "command": "\\setlist",
    "title": {
      "zh": "列表默认配置",
      "en": "List defaults"
    },
    "detail": {
      "zh": "按列表类型或层级集中设置标签与间距。",
      "en": "Sets label and spacing defaults by list type or depth."
    },
    "example": "\\setlist[itemize]{leftmargin=*,itemsep=2pt}",
    "package": "enumitem",
    "entry": "layout-enumitem"
  },
  {
    "id": "advanced-command-49",
    "module": "layout",
    "category": "layout",
    "command": "multicols",
    "title": {
      "zh": "局部多栏环境",
      "en": "Local multicolumn environment"
    },
    "detail": {
      "zh": "末页通常平衡栏高，环境内不支持普通单栏浮动体。",
      "en": "Normally balances final columns and does not support ordinary single-column floats."
    },
    "example": "\\begin{multicols}{2}Text.\\end{multicols}",
    "package": "multicol",
    "entry": "layout-columns"
  },
  {
    "id": "advanced-command-50",
    "module": "layout",
    "category": "layout",
    "command": "\\newpage",
    "title": {
      "zh": "开始新页",
      "en": "Start a new page"
    },
    "detail": {
      "zh": "不强制清空浮动队列，双栏中可能只切到下一栏。",
      "en": "Does not flush floats and may advance only a column in two-column mode."
    },
    "example": "Text.\\newpage More text.",
    "package": "LaTeX kernel",
    "entry": "layout-pages"
  },
  {
    "id": "advanced-command-51",
    "module": "layout",
    "category": "layout",
    "command": "\\clearpage",
    "title": {
      "zh": "清空浮动体并换页",
      "en": "Flush floats and break page"
    },
    "detail": {
      "zh": "输出等待中的浮动体，再进入后续页面。",
      "en": "Outputs pending floats before proceeding."
    },
    "example": "\\clearpage",
    "package": "LaTeX kernel",
    "entry": "layout-pages"
  },
  {
    "id": "advanced-command-52",
    "module": "layout",
    "category": "layout",
    "command": "\\cleardoublepage",
    "title": {
      "zh": "双面文档换页",
      "en": "Two-sided page break"
    },
    "detail": {
      "zh": "必要时插空白页，使后续内容从奇数页开始。",
      "en": "May insert a blank page so content starts on an odd page."
    },
    "example": "\\cleardoublepage",
    "package": "LaTeX kernel",
    "entry": "layout-pages"
  },
  {
    "id": "advanced-command-53",
    "module": "layout",
    "category": "layout",
    "command": "\\pagenumbering",
    "title": {
      "zh": "页码表示形式",
      "en": "Page-number representation"
    },
    "detail": {
      "zh": "同时将 page 计数器重置为 1。",
      "en": "Also resets the page counter to 1."
    },
    "example": "\\pagenumbering{roman}",
    "package": "LaTeX kernel",
    "entry": "layout-pages"
  },
  {
    "id": "advanced-command-54",
    "module": "layout",
    "category": "layout",
    "command": "\\thispagestyle",
    "title": {
      "zh": "当前页样式",
      "en": "Current page style"
    },
    "detail": {
      "zh": "只改变当前页面，其他页保留 pagestyle 设置。",
      "en": "Affects only the current page."
    },
    "example": "\\thispagestyle{empty}",
    "package": "LaTeX kernel",
    "entry": "layout-pages"
  },
  {
    "id": "advanced-command-55",
    "module": "fonts",
    "category": "document",
    "command": "\\textsf",
    "title": {
      "zh": "无衬线文本",
      "en": "Sans-serif text"
    },
    "detail": {
      "zh": "选择文本字体族，不自动改变数学字体。",
      "en": "Selects the text family without setting a math font."
    },
    "example": "\\textsf{A clear label}",
    "package": "LaTeX kernel",
    "entry": "fonts-families"
  },
  {
    "id": "advanced-command-56",
    "module": "fonts",
    "category": "document",
    "command": "\\texttt",
    "title": {
      "zh": "等宽文本",
      "en": "Monospaced text"
    },
    "detail": {
      "zh": "适合短代码片段，但特殊字符仍需转义。",
      "en": "Suits short code spans, but special characters still need escaping."
    },
    "example": "\\texttt{data\\_2026.csv}",
    "package": "LaTeX kernel",
    "entry": "fonts-families"
  },
  {
    "id": "advanced-command-57",
    "module": "fonts",
    "category": "document",
    "command": "\\textbf",
    "title": {
      "zh": "粗体文本",
      "en": "Bold text"
    },
    "detail": {
      "zh": "选择粗体字形；数学向量应使用数学字体命令。",
      "en": "Selects a bold text shape; use math commands for mathematical vectors."
    },
    "example": "\\textbf{Assumption}",
    "package": "LaTeX kernel",
    "entry": "fonts-families"
  },
  {
    "id": "advanced-command-58",
    "module": "fonts",
    "category": "document",
    "command": "\\textsc",
    "title": {
      "zh": "小型大写",
      "en": "Small capitals"
    },
    "detail": {
      "zh": "字体必须提供对应字形。",
      "en": "Requires a matching font shape."
    },
    "example": "\\textsc{Methods}",
    "package": "LaTeX kernel",
    "entry": "fonts-families"
  },
  {
    "id": "advanced-command-59",
    "module": "fonts",
    "category": "document",
    "command": "\\setmainfont",
    "title": {
      "zh": "主 OpenType 字体",
      "en": "Main OpenType font"
    },
    "detail": {
      "zh": "XeLaTeX/LuaLaTeX 通过已安装字体的名称选择主字体。",
      "en": "XeLaTeX/LuaLaTeX select the main font by its installed name."
    },
    "example": "\\setmainfont{texgyretermes-regular.otf}[BoldFont=texgyretermes-bold.otf,ItalicFont=texgyretermes-italic.otf]",
    "package": "fontspec",
    "entry": "fonts-fontspec"
  },
  {
    "id": "advanced-command-60",
    "module": "fonts",
    "category": "document",
    "command": "\\setsansfont",
    "title": {
      "zh": "无衬线 OpenType 字体",
      "en": "Sans-serif OpenType font"
    },
    "detail": {
      "zh": "单独选择无衬线族，便于控制标题字形。",
      "en": "Selects the sans-serif family separately."
    },
    "example": "\\setsansfont{texgyreheros-regular.otf}",
    "package": "fontspec",
    "entry": "fonts-fontspec"
  },
  {
    "id": "advanced-command-61",
    "module": "fonts",
    "category": "document",
    "command": "\\setmonofont",
    "title": {
      "zh": "等宽 OpenType 字体",
      "en": "Monospaced OpenType font"
    },
    "detail": {
      "zh": "为等宽字体族选择 OpenType 字体。",
      "en": "Selects an OpenType font for the monospaced family."
    },
    "example": "\\setmonofont{texgyrecursor-regular.otf}",
    "package": "fontspec",
    "entry": "fonts-fontspec"
  },
  {
    "id": "advanced-command-62",
    "module": "fonts",
    "category": "document",
    "command": "\\definecolor",
    "title": {
      "zh": "定义命名颜色",
      "en": "Define a named color"
    },
    "detail": {
      "zh": "按所选模型的数值范围定义颜色；RGB 与 rgb 的范围不同。",
      "en": "Defines a color within the selected model’s range; RGB and rgb use different ranges."
    },
    "example": "\\definecolor{atelier}{HTML}{195C4E}",
    "package": "xcolor",
    "entry": "fonts-color"
  },
  {
    "id": "advanced-command-63",
    "module": "fonts",
    "category": "document",
    "command": "\\textcolor",
    "title": {
      "zh": "局部文字颜色",
      "en": "Local text color"
    },
    "detail": {
      "zh": "给参数中的文字设置局部颜色。",
      "en": "Sets a local color for the text in its argument."
    },
    "example": "\\textcolor{teal}{A label}",
    "package": "xcolor",
    "entry": "fonts-color"
  },
  {
    "id": "advanced-command-64",
    "module": "code",
    "category": "document",
    "command": "lstlisting",
    "title": {
      "zh": "源码高亮环境",
      "en": "Source listing environment"
    },
    "detail": {
      "zh": "原样读取内容，高亮在 TeX 内执行。",
      "en": "Reads literal source and highlights within TeX."
    },
    "example": "\\begin{lstlisting}[language=Python]\nprint(1)\n\\end{lstlisting}",
    "package": "listings",
    "entry": "code-listings"
  },
  {
    "id": "advanced-command-65",
    "module": "code",
    "category": "document",
    "command": "\\lstinputlisting",
    "title": {
      "zh": "读取代码文件",
      "en": "Read a source file"
    },
    "detail": {
      "zh": "文件路径相对编译目录。",
      "en": "Resolves the path from the compilation directory."
    },
    "example": "\\lstinputlisting[language=Python]{analysis.py}",
    "package": "listings",
    "entry": "code-listings"
  },
  {
    "id": "advanced-command-66",
    "module": "code",
    "category": "document",
    "command": "\\lstinline",
    "title": {
      "zh": "行内源码",
      "en": "Inline source listing"
    },
    "detail": {
      "zh": "用分隔符包围短片段。",
      "en": "Uses delimiters for a short source span."
    },
    "example": "\\lstinline!x = 1!",
    "package": "listings",
    "entry": "code-listings"
  },
  {
    "id": "advanced-command-67",
    "module": "code",
    "category": "document",
    "command": "\\lstset",
    "title": {
      "zh": "代码高亮默认值",
      "en": "Listing defaults"
    },
    "detail": {
      "zh": "集中定义语言、字号和换行方式。",
      "en": "Centralizes language, type size, and wrapping settings."
    },
    "example": "\\lstset{basicstyle=\\ttfamily\\small,breaklines=true}",
    "package": "listings",
    "entry": "code-listings"
  },
  {
    "id": "advanced-command-68",
    "module": "code",
    "category": "document",
    "command": "minted",
    "title": {
      "zh": "外部语法高亮环境",
      "en": "External highlighting environment"
    },
    "detail": {
      "zh": "minted 3 通过 latexminted 调用 Pygments。",
      "en": "minted 3 uses latexminted to run Pygments."
    },
    "example": "\\begin{minted}{python}\nprint(1)\n\\end{minted}",
    "package": "minted",
    "entry": "code-minted"
  },
  {
    "id": "advanced-command-69",
    "module": "code",
    "category": "document",
    "command": "\\inputminted",
    "title": {
      "zh": "外部文件高亮",
      "en": "Highlight a file"
    },
    "detail": {
      "zh": "明确语言和文件名，仍需高亮工具配置。",
      "en": "Names a language and file and still needs the highlighter setup."
    },
    "example": "\\inputminted[linenos]{python}{analysis.py}",
    "package": "minted",
    "entry": "code-minted"
  },
  {
    "id": "advanced-command-70",
    "module": "code",
    "category": "document",
    "command": "\\mintinline",
    "title": {
      "zh": "minted 行内高亮",
      "en": "Inline minted highlighting"
    },
    "detail": {
      "zh": "适合短代码，依赖与 minted 环境相同。",
      "en": "Suits short code and has the same tooling dependencies."
    },
    "example": "\\mintinline{python}{x = 1}",
    "package": "minted",
    "entry": "code-minted"
  },
  {
    "id": "advanced-command-71",
    "module": "code",
    "category": "document",
    "command": "Verbatim",
    "title": {
      "zh": "可配置原样环境",
      "en": "Configurable verbatim environment"
    },
    "detail": {
      "zh": "环境名大小写敏感，可设置行号和边框。",
      "en": "The case-sensitive environment supports line numbers and frames."
    },
    "example": "\\begin{Verbatim}[numbers=left]\na_b%\n\\end{Verbatim}",
    "package": "fancyvrb",
    "entry": "code-verbatim"
  },
  {
    "id": "advanced-command-72",
    "module": "code",
    "category": "document",
    "command": "\\VerbatimInput",
    "title": {
      "zh": "原样读取文件",
      "en": "Read a file literally"
    },
    "detail": {
      "zh": "不做 TeX 宏展开，适合日志。",
      "en": "Does not expand TeX macros and suits logs."
    },
    "example": "\\VerbatimInput{build.log}",
    "package": "fancyvrb",
    "entry": "code-verbatim"
  },
  {
    "id": "advanced-command-73",
    "module": "code",
    "category": "document",
    "command": "tcolorbox",
    "title": {
      "zh": "彩色文本框",
      "en": "Colored text box"
    },
    "detail": {
      "zh": "breakable 需要相应库，允许长框跨页。",
      "en": "breakable needs its library and permits page breaks."
    },
    "example": "\\begin{tcolorbox}[breakable,title={Note}]Text.\\end{tcolorbox}",
    "package": "tcolorbox",
    "entry": "code-boxes"
  },
  {
    "id": "advanced-command-74",
    "module": "code",
    "category": "document",
    "command": "mdframed",
    "title": {
      "zh": "可分页边框",
      "en": "Breakable frame"
    },
    "detail": {
      "zh": "为说明或定理建立边框，不自动定义定理编号。",
      "en": "Frames text or theorems without defining theorem numbering."
    },
    "example": "\\begin{mdframed}A remark.\\end{mdframed}",
    "package": "mdframed",
    "entry": "code-boxes"
  },
  {
    "id": "advanced-command-75",
    "module": "code",
    "category": "document",
    "command": "\\includepdf",
    "title": {
      "zh": "导入 PDF 页面",
      "en": "Import PDF pages"
    },
    "detail": {
      "zh": "pages=- 选择所有页，需要外部 PDF 文件。",
      "en": "pages=- selects all pages and requires the PDF resource."
    },
    "example": "\\includepdf[pages=-]{supplement.pdf}",
    "package": "pdfpages",
    "entry": "code-pdfpages"
  },
  {
    "id": "advanced-command-76",
    "module": "code",
    "category": "document",
    "command": "landscape",
    "title": {
      "zh": "横向正文页",
      "en": "Landscape body pages"
    },
    "detail": {
      "zh": "pdflscape 同时设置 PDF 阅读器旋转属性。",
      "en": "pdflscape also sets the viewer’s PDF rotation property."
    },
    "example": "\\begin{landscape}A wide table.\\end{landscape}",
    "package": "pdflscape",
    "entry": "code-pdfpages"
  },
  {
    "id": "advanced-command-77",
    "module": "algorithms",
    "category": "document",
    "command": "algorithm",
    "title": {
      "zh": "算法浮动体",
      "en": "Algorithm float"
    },
    "detail": {
      "zh": "标题与位置由 algorithm 管理，主体语法另选。",
      "en": "algorithm manages caption and placement; body syntax is separate."
    },
    "example": "\\begin{algorithm}\\caption{Compute}\\begin{algorithmic}...\\end{algorithmic}\\end{algorithm}",
    "package": "algorithm",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-78",
    "module": "algorithms",
    "category": "document",
    "command": "algorithmic",
    "title": {
      "zh": "伪代码主体",
      "en": "Pseudocode body"
    },
    "detail": {
      "zh": "algpseudocode 为环境提供 State 等命令。",
      "en": "algpseudocode supplies commands such as State for this environment."
    },
    "example": "\\begin{algorithmic}[1]\\State $s\\gets 0$\\end{algorithmic}",
    "package": "algpseudocode",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-79",
    "module": "algorithms",
    "category": "document",
    "command": "\\State",
    "title": {
      "zh": "伪代码语句",
      "en": "Pseudocode statement"
    },
    "detail": {
      "zh": "命令大小写与旧 algorithmic 的 STATE 不同。",
      "en": "Capitalization differs from the older algorithmic STATE."
    },
    "example": "\\State $s\\gets s+x_i$",
    "package": "algpseudocode",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-80",
    "module": "algorithms",
    "category": "document",
    "command": "\\Require",
    "title": {
      "zh": "算法输入条件",
      "en": "Algorithm precondition"
    },
    "detail": {
      "zh": "表达输入或前置条件，不自动检查运行数据。",
      "en": "States inputs or preconditions without executing a check."
    },
    "example": "\\Require Nonempty vector $x$",
    "package": "algpseudocode",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-81",
    "module": "algorithms",
    "category": "document",
    "command": "\\Ensure",
    "title": {
      "zh": "算法输出条件",
      "en": "Algorithm postcondition"
    },
    "detail": {
      "zh": "声明算法应返回的结果。",
      "en": "States the expected result."
    },
    "example": "\\Ensure Sample mean",
    "package": "algpseudocode",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-82",
    "module": "algorithms",
    "category": "document",
    "command": "\\EndFor",
    "title": {
      "zh": "循环结束",
      "en": "End a pseudocode loop"
    },
    "detail": {
      "zh": "结束 algpseudocode 中与之配对的 For；algorithm2e 使用另一套循环语法。",
      "en": "Ends the paired For in algpseudocode; algorithm2e uses a separate loop syntax."
    },
    "example": "\\For{$i=1$ to $n$}\\State Update.\\EndFor",
    "package": "algpseudocode",
    "entry": "algorithm-pseudocode"
  },
  {
    "id": "advanced-command-83",
    "module": "algorithms",
    "category": "document",
    "command": "\\KwIn",
    "title": {
      "zh": "algorithm2e 输入",
      "en": "algorithm2e input"
    },
    "detail": {
      "zh": "属于 algorithm2e 的关键词接口。",
      "en": "Belongs to algorithm2e’s keyword interface."
    },
    "example": "\\KwIn{Nonempty sample}",
    "package": "algorithm2e",
    "entry": "algorithm-algorithm2e"
  },
  {
    "id": "advanced-command-84",
    "module": "algorithms",
    "category": "document",
    "command": "\\KwOut",
    "title": {
      "zh": "algorithm2e 输出",
      "en": "algorithm2e output"
    },
    "detail": {
      "zh": "用于 algorithm2e 的输出声明；algpseudocode 使用自己的关键词接口。",
      "en": "Declares output in algorithm2e; algpseudocode has its own keyword interface."
    },
    "example": "\\KwOut{Sample mean}",
    "package": "algorithm2e",
    "entry": "algorithm-algorithm2e"
  },
  {
    "id": "advanced-command-85",
    "module": "programming",
    "category": "document",
    "command": "\\newcommand",
    "title": {
      "zh": "定义新命令",
      "en": "Define a new command"
    },
    "detail": {
      "zh": "检查命令尚未存在，并用 #1 引用参数。",
      "en": "Checks that the command is new and uses #1 for an argument."
    },
    "example": "\\newcommand{\\Mean}[1]{\\overline{#1}}",
    "package": "LaTeX kernel",
    "entry": "programming-newcommand"
  },
  {
    "id": "advanced-command-86",
    "module": "programming",
    "category": "document",
    "command": "\\renewcommand",
    "title": {
      "zh": "重定义已有命令",
      "en": "Redefine an existing command"
    },
    "detail": {
      "zh": "要求命令已经定义，修改标准命令前核对影响。",
      "en": "Requires an existing command; check effects before changing standard commands."
    },
    "example": "\\renewcommand{\\contentsname}{Contents}",
    "package": "LaTeX kernel",
    "entry": "programming-newcommand"
  },
  {
    "id": "advanced-command-87",
    "module": "programming",
    "category": "document",
    "command": "\\providecommand",
    "title": {
      "zh": "条件定义命令",
      "en": "Define only if absent"
    },
    "detail": {
      "zh": "已有定义时保留当前含义。",
      "en": "Preserves an existing definition."
    },
    "example": "\\providecommand{\\StudyLabel}{Note}",
    "package": "LaTeX kernel",
    "entry": "programming-newcommand"
  },
  {
    "id": "advanced-command-88",
    "module": "programming",
    "category": "document",
    "command": "\\NewDocumentCommand",
    "title": {
      "zh": "现代参数命令",
      "en": "Modern argument command"
    },
    "detail": {
      "zh": "用 m、o、O 和 s 等规范读取用户参数。",
      "en": "Reads arguments with signatures such as m, o, O, and s."
    },
    "example": "\\NewDocumentCommand{\\Note}{O{Note} m}{\\textbf{#1:} #2}",
    "package": "LaTeX kernel",
    "entry": "programming-document-commands"
  },
  {
    "id": "advanced-command-89",
    "module": "programming",
    "category": "document",
    "command": "\\IfNoValueTF",
    "title": {
      "zh": "检测未给的可选参数",
      "en": "Test an omitted optional argument"
    },
    "detail": {
      "zh": "用于 o 参数，未给值不同于空值。",
      "en": "Tests an o argument; omission differs from an empty value."
    },
    "example": "\\IfNoValueTF{#1}{Default}{#1}",
    "package": "LaTeX kernel",
    "entry": "programming-document-commands"
  },
  {
    "id": "advanced-command-90",
    "module": "programming",
    "category": "document",
    "command": "\\newenvironment",
    "title": {
      "zh": "定义环境",
      "en": "Define an environment"
    },
    "detail": {
      "zh": "封装起始与结束操作，并形成局部分组。",
      "en": "Packages opening and closing operations in a local group."
    },
    "example": "\\newenvironment{remark}{\\begin{quote}}{\\end{quote}}",
    "package": "LaTeX kernel",
    "entry": "programming-environments"
  },
  {
    "id": "advanced-command-91",
    "module": "programming",
    "category": "document",
    "command": "\\NewDocumentEnvironment",
    "title": {
      "zh": "现代环境接口",
      "en": "Modern environment interface"
    },
    "detail": {
      "zh": "起始和结束代码均可访问已读取参数。",
      "en": "Opening and closing code can access the read arguments."
    },
    "example": "\\NewDocumentEnvironment{remark}{O{Note}}{\\par\\textbf{#1:}}{\\par}",
    "package": "LaTeX kernel",
    "entry": "programming-environments"
  },
  {
    "id": "advanced-command-92",
    "module": "programming",
    "category": "document",
    "command": "\\def",
    "title": {
      "zh": "低层宏定义",
      "en": "Primitive macro definition"
    },
    "detail": {
      "zh": "直接定义或覆盖宏，已有名称不会触发检查。",
      "en": "Defines or overwrites a macro without checking whether the name exists."
    },
    "example": "\\def\\StudyWord{Evidence}",
    "package": "LaTeX kernel",
    "entry": "programming-lowlevel"
  },
  {
    "id": "advanced-command-93",
    "module": "programming",
    "category": "document",
    "command": "\\let",
    "title": {
      "zh": "复制当前含义",
      "en": "Copy the current meaning"
    },
    "detail": {
      "zh": "后来修改原命令不会自动更新这个别名。",
      "en": "Later changes to the original do not update this alias."
    },
    "example": "\\let\\OriginalSection\\section",
    "package": "LaTeX kernel",
    "entry": "programming-lowlevel"
  },
  {
    "id": "advanced-command-94",
    "module": "programming",
    "category": "document",
    "command": "\\newlength",
    "title": {
      "zh": "创建长度",
      "en": "Create a length"
    },
    "detail": {
      "zh": "用命名长度保存可配置尺寸。",
      "en": "Stores a configurable dimension in a named length."
    },
    "example": "\\newlength{\\panelwidth}",
    "package": "LaTeX kernel",
    "entry": "programming-counters"
  },
  {
    "id": "advanced-command-95",
    "module": "programming",
    "category": "document",
    "command": "\\setlength",
    "title": {
      "zh": "设置长度",
      "en": "Set a length"
    },
    "detail": {
      "zh": "接受绝对或相对字体单位。",
      "en": "Accepts absolute or font-relative dimensions."
    },
    "example": "\\setlength{\\panelwidth}{.45\\linewidth}",
    "package": "LaTeX kernel",
    "entry": "programming-counters"
  },
  {
    "id": "advanced-command-96",
    "module": "programming",
    "category": "document",
    "command": "\\newcounter",
    "title": {
      "zh": "创建计数器",
      "en": "Create a counter"
    },
    "detail": {
      "zh": "可声明父计数器以自动重置。",
      "en": "Can name a parent counter that resets it."
    },
    "example": "\\newcounter{exercise}[section]",
    "package": "LaTeX kernel",
    "entry": "programming-counters"
  },
  {
    "id": "advanced-command-97",
    "module": "programming",
    "category": "document",
    "command": "\\refstepcounter",
    "title": {
      "zh": "递增并建立引用",
      "en": "Increment and prepare a reference"
    },
    "detail": {
      "zh": "让随后 label 捕获该计数器。",
      "en": "Makes a following label capture the counter."
    },
    "example": "\\refstepcounter{exercise}\\label{ex:one}",
    "package": "LaTeX kernel",
    "entry": "programming-counters"
  },
  {
    "id": "advanced-command-98",
    "module": "programming",
    "category": "document",
    "command": "\\ExplSyntaxOn",
    "title": {
      "zh": "进入 expl3 语法",
      "en": "Enter expl3 syntax"
    },
    "detail": {
      "zh": "改变命令名字符和空格读取规则，之后要恢复。",
      "en": "Changes name characters and space handling; restore ordinary syntax afterward."
    },
    "example": "\\ExplSyntaxOn ... \\ExplSyntaxOff",
    "package": "LaTeX3",
    "entry": "programming-expl3"
  },
  {
    "id": "advanced-command-99",
    "module": "programming",
    "category": "document",
    "command": "\\cs_new_protected:Npn",
    "title": {
      "zh": "定义受保护函数",
      "en": "Define a protected function"
    },
    "detail": {
      "zh": "适合排版和赋值函数，保护指展开控制。",
      "en": "Suits typesetting or assignments; protection controls expansion."
    },
    "example": "\\cs_new_protected:Npn \\atelier_show:n #1 {\\texttt{#1}}",
    "package": "LaTeX3",
    "entry": "programming-expl3"
  },
  {
    "id": "advanced-command-100",
    "module": "programming",
    "category": "document",
    "command": "\\clist_map_inline:nn",
    "title": {
      "zh": "逗号列表映射",
      "en": "Map over a comma list"
    },
    "detail": {
      "zh": "嵌套定义中列表元素使用 ##1。",
      "en": "Use ##1 for the item inside an enclosing definition."
    },
    "example": "\\clist_map_inline:nn {a,b,c}{\\texttt{#1}}",
    "package": "LaTeX3",
    "entry": "programming-expl3"
  },
  {
    "id": "advanced-command-101",
    "module": "programming",
    "category": "document",
    "command": "\\ProvidesPackage",
    "title": {
      "zh": "宏包身份声明",
      "en": "Declare package identity"
    },
    "detail": {
      "zh": "记录名称、日期和说明以供日志诊断。",
      "en": "Records a name, date, and description in the log."
    },
    "example": "\\ProvidesPackage{ateliernotes}[2026/10/09 Shared notes]",
    "package": "LaTeX kernel",
    "entry": "programming-package-class"
  },
  {
    "id": "advanced-command-102",
    "module": "programming",
    "category": "document",
    "command": "\\RequirePackage",
    "title": {
      "zh": "加载宏包依赖",
      "en": "Load a package dependency"
    },
    "detail": {
      "zh": "适合 sty 或 cls 中声明依赖。",
      "en": "Declares dependencies inside sty or cls files."
    },
    "example": "\\RequirePackage{xcolor}",
    "package": "LaTeX kernel",
    "entry": "programming-package-class"
  },
  {
    "id": "advanced-command-103",
    "module": "programming",
    "category": "document",
    "command": "\\LoadClass",
    "title": {
      "zh": "继承文档类",
      "en": "Load a base class"
    },
    "detail": {
      "zh": "在 cls 中载入基础类，配合选项转发。",
      "en": "Loads a base class in a cls with option forwarding."
    },
    "example": "\\LoadClass{article}",
    "package": "LaTeX kernel",
    "entry": "programming-package-class"
  },
  {
    "id": "advanced-command-104",
    "module": "structure",
    "category": "document",
    "command": "\\footnote",
    "title": {
      "zh": "脚注",
      "en": "Footnote"
    },
    "detail": {
      "zh": "在当前页脚注区域输出解释。",
      "en": "Places the note in the current page’s footnote area."
    },
    "example": "A term\\footnote{A definition.}",
    "package": "LaTeX kernel",
    "entry": "structure-notes"
  },
  {
    "id": "advanced-command-105",
    "module": "structure",
    "category": "document",
    "command": "\\endnote",
    "title": {
      "zh": "尾注",
      "en": "Endnote"
    },
    "detail": {
      "zh": "收集到 theendnotes 输出位置。",
      "en": "Collects a note for theendnotes."
    },
    "example": "A term\\endnote{A later explanation.}",
    "package": "endnotes",
    "entry": "structure-notes"
  },
  {
    "id": "advanced-command-106",
    "module": "structure",
    "category": "document",
    "command": "\\marginpar",
    "title": {
      "zh": "旁注",
      "en": "Margin note"
    },
    "detail": {
      "zh": "需要边栏宽度和可用页边距。",
      "en": "Needs adequate margin width and space."
    },
    "example": "\\marginpar{Check units.}",
    "package": "LaTeX kernel",
    "entry": "structure-notes"
  },
  {
    "id": "advanced-command-107",
    "module": "structure",
    "category": "document",
    "command": "\\index",
    "title": {
      "zh": "索引记录",
      "en": "Index entry"
    },
    "detail": {
      "zh": "记录概念和当前页，不在正文输出词条。",
      "en": "Records a concept and page without printing body text."
    },
    "example": "estimator\\index{estimator}",
    "package": "imakeidx",
    "entry": "structure-index"
  },
  {
    "id": "advanced-command-108",
    "module": "structure",
    "category": "document",
    "command": "\\printindex",
    "title": {
      "zh": "输出索引",
      "en": "Print the index"
    },
    "detail": {
      "zh": "需要索引处理器生成排序结果。",
      "en": "Needs sorted output from the indexer."
    },
    "example": "\\printindex",
    "package": "imakeidx",
    "entry": "structure-index"
  },
  {
    "id": "advanced-command-109",
    "module": "structure",
    "category": "document",
    "command": "\\newacronym",
    "title": {
      "zh": "定义缩略语",
      "en": "Define an acronym"
    },
    "detail": {
      "zh": "给出键、简称和完整名称。",
      "en": "Takes a label, short form, and long form."
    },
    "example": "\\newacronym{did}{DiD}{difference in differences}",
    "package": "glossaries",
    "entry": "structure-glossary"
  },
  {
    "id": "advanced-command-110",
    "module": "structure",
    "category": "document",
    "command": "\\gls",
    "title": {
      "zh": "引用术语",
      "en": "Use a glossary term"
    },
    "detail": {
      "zh": "按首次使用状态选择展开形式。",
      "en": "Selects output according to first-use state."
    },
    "example": "\\gls{did}",
    "package": "glossaries",
    "entry": "structure-glossary"
  },
  {
    "id": "advanced-command-111",
    "module": "structure",
    "category": "document",
    "command": "\\printnoidxglossary",
    "title": {
      "zh": "无外部排序术语表",
      "en": "Print a no-index glossary"
    },
    "detail": {
      "zh": "与 makenoidxglossaries 配合，需要重复编译。",
      "en": "Pairs with makenoidxglossaries and requires repeated runs."
    },
    "example": "\\printnoidxglossary",
    "package": "glossaries",
    "entry": "structure-glossary"
  },
  {
    "id": "advanced-command-112",
    "module": "structure",
    "category": "document",
    "command": "\\appendix",
    "title": {
      "zh": "切换附录编号",
      "en": "Switch to appendix numbering"
    },
    "detail": {
      "zh": "后续 section 或 chapter 使用附录编号。",
      "en": "Changes numbering of subsequent sections or chapters."
    },
    "example": "\\appendix\\section{Derivation}",
    "package": "LaTeX kernel",
    "entry": "structure-appendix"
  },
  {
    "id": "advanced-command-113",
    "module": "structure",
    "category": "document",
    "command": "\\frontmatter",
    "title": {
      "zh": "前置部分",
      "en": "Front matter"
    },
    "detail": {
      "zh": "book 类接口，通常使用罗马页码和不编号章。",
      "en": "A book interface with preliminary numbering and normally unnumbered chapters."
    },
    "example": "\\frontmatter\\tableofcontents",
    "package": "book",
    "entry": "structure-appendix"
  },
  {
    "id": "advanced-command-114",
    "module": "structure",
    "category": "document",
    "command": "\\mainmatter",
    "title": {
      "zh": "正文部分",
      "en": "Main matter"
    },
    "detail": {
      "zh": "恢复书籍正文编号和阿拉伯页码。",
      "en": "Restores main chapter numbering and Arabic page numbers."
    },
    "example": "\\mainmatter\\chapter{Methods}",
    "package": "book",
    "entry": "structure-appendix"
  },
  {
    "id": "advanced-command-115",
    "module": "structure",
    "category": "document",
    "command": "\\backmatter",
    "title": {
      "zh": "后置部分",
      "en": "Back matter"
    },
    "detail": {
      "zh": "书籍中常用于不编号的后置章节。",
      "en": "Normally introduces unnumbered final chapters in a book."
    },
    "example": "\\backmatter\\chapter{Acknowledgments}",
    "package": "book",
    "entry": "structure-appendix"
  },
  {
    "id": "advanced-command-116",
    "module": "projects",
    "category": "workflow",
    "command": "\\input",
    "title": {
      "zh": "插入文本文件",
      "en": "Insert a text file"
    },
    "detail": {
      "zh": "不强制换页，路径相对编译工作目录。",
      "en": "Does not force a page break; paths use the working directory."
    },
    "example": "\\input{methods}",
    "package": "LaTeX kernel",
    "entry": "project-multifile"
  },
  {
    "id": "advanced-command-117",
    "module": "projects",
    "category": "workflow",
    "command": "\\include",
    "title": {
      "zh": "载入整章",
      "en": "Include a chapter"
    },
    "detail": {
      "zh": "前后清页并维护独立辅助文件。",
      "en": "Clears surrounding pages and maintains a separate aux file."
    },
    "example": "\\include{chapters/introduction}",
    "package": "LaTeX kernel",
    "entry": "project-multifile"
  },
  {
    "id": "advanced-command-118",
    "module": "projects",
    "category": "workflow",
    "command": "\\includeonly",
    "title": {
      "zh": "部分章节编译",
      "en": "Compile selected chapters"
    },
    "detail": {
      "zh": "利用已有 aux 保留被跳过章节的编号。",
      "en": "Uses existing aux data to preserve omitted chapter numbering."
    },
    "example": "\\includeonly{chapters/methods}",
    "package": "LaTeX kernel",
    "entry": "structure-manuals"
  },
  {
    "id": "advanced-command-119",
    "module": "projects",
    "category": "workflow",
    "command": "\\listfiles",
    "title": {
      "zh": "记录宏包版本",
      "en": "List package versions"
    },
    "detail": {
      "zh": "把文件版本写入日志，帮助复现与排错。",
      "en": "Writes file versions to the log for reproduction and diagnosis."
    },
    "example": "\\listfiles",
    "package": "LaTeX kernel",
    "entry": "project-reproducibility"
  },
  {
    "id": "advanced-command-120",
    "module": "projects",
    "category": "workflow",
    "command": "latexmk",
    "title": {
      "zh": "自动构建工具",
      "en": "Automated build tool"
    },
    "detail": {
      "zh": "调用安装好的引擎和文献工具，直到引用稳定。",
      "en": "Runs installed engines and processors until references stabilize."
    },
    "example": "latexmk -xelatex main.tex",
    "package": "latexmk",
    "entry": "project-latexmk"
  }
]);
})();
