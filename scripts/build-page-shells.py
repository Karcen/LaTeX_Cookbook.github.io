from pathlib import Path
pages={
 'index':('home','latex.cookbook · 交互式百科全书','<main id="home-content" class="page-shell"></main>','home'),
 'encyclopedia':('encyclopedia','百科全书 · Encyclopedia | latex.cookbook','<main id="encyclopedia-root" class="page-shell"></main>','encyclopedia'),
 'courses':('courses','学习路径 · Learning paths | latex.cookbook','<main class="page-shell container"><section class="inner-hero"><h1 data-zh="从第一份文档到学术项目。" data-en="From your first document to an academic project.">从第一份文档到学术项目。</h1><p data-zh="四条学习路径。每课都有目标、源码、实践任务与深入查询入口。" data-en="Four learning paths with goals, code, practical tasks, and links for deeper reading.">四条学习路径。</p></section><div id="course-topbar" class="course-topbar"></div><div class="course-layout"><aside id="lesson-sidebar" class="lesson-sidebar" aria-label="Learning paths"></aside><article id="lesson-panel" class="lesson-panel"></article></div></main>','courses'),
 'practice':('practice','交互练习 · Practice | latex.cookbook','<main class="page-shell container"><section class="inner-hero"><h1 data-zh="理解机制，再检查答案。" data-en="Understand the mechanism. Then check your answer.">理解机制，再检查答案。</h1><p data-zh="选择主题与题型，练习真实排版问题。每道题都提供答案解释与相关知识入口。" data-en="Choose a topic and question type to practice real typesetting problems. Every question includes an explanation and related reading.">每道题都提供解析。</p></section><div class="practice-grid"><section id="quiz-container" class="quiz-card"></section><aside id="quiz-side" class="quiz-side"></aside></div></main>','practice'),
 'playground':('playground','LaTeX 实验室 · Playground | latex.cookbook','<main class="page-shell container"><section class="inner-hero"><h1 data-zh="在源码里做一次实验。" data-en="Experiment with the source.">在源码里做一次实验。</h1><p data-zh="编辑代码、切换示例并导出 .tex。数学公式实时渲染，文档结构提供教学预览。" data-en="Edit source, switch examples, and export .tex files. Render mathematics live or inspect document structure in a teaching preview.">编辑代码、切换示例并导出 .tex。数学公式实时渲染，文档结构提供教学预览。</p></section><div class="workbench-top"><div id="mode-tabs" class="segmented"></div><div id="workbench-actions" class="playground-actions"></div></div><div id="quick-inserts" class="quick-inserts"></div><div id="workbench" class="workbench"></div><div id="source-diagnostics" class="source-diagnostics" role="status"></div><div class="snippet-header"><h2 data-zh="快速示例" data-en="Quick examples">快速示例</h2></div><div id="snippets" class="snippet-grid"></div><div id="work-info" class="work-info" role="note"></div><section id="character-lab" class="character-lab"></section></main>','playground')
}
for name in ['reference','symbols','packages','classes','examples','templates','troubleshooting']:
 pages[name]=(name,f'{name.title()} | latex.cookbook','<main class="page-shell container"><div id="library-root"></div></main>','library')
common=['data','content-base','content-core','content-advanced','content-theorems','content-exercises','content-symbols','content-supplement','catalog','compilation','app']
for file,(page,title,body,script) in pages.items():
 js='\n'.join(f'  <script defer src="assets/js/{x}.js"></script>' for x in common+(['latex-tools','character-lab'] if script=='playground' else [])+[script])
 html=f'''<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f8f8f4">
  <meta name="description" content="中英文 LaTeX 交互式百科：文档类、数学、表格、参考文献、Beamer、TikZ、错误排查与完整示例。Bilingual interactive LaTeX encyclopedia.">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <script>try{{if(JSON.parse(localStorage.getItem('atelier:theme'))==='dark')document.documentElement.dataset.theme='dark'}}catch(e){{}}</script>
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/atelier.css">
  <title>{title}</title>
  <script src="assets/js/math-config.js"></script>
  <script defer src="assets/vendor/mathjax-tex-svg-full.js"></script>
  <script defer src="assets/vendor/prism.js"></script>
  <script defer src="assets/vendor/prism-latex.js"></script>
{js}
</head>
<body data-page="{page}">
  <a class="sr-only" href="#main-content" data-zh="跳转到正文" data-en="Skip to content">跳转到正文</a>
  <header id="site-header" class="site-header"></header>
  <div id="main-content">{body}</div>
  <footer id="site-footer" class="site-footer"></footer>
</body>
</html>
'''
 Path(file+'.html').write_text(html)
