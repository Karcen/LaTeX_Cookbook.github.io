/* SVG-only math rendering: no remote fonts or requests. */
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    maxBuffer: 20000,
    maxMacros: 1000,
    packages: {'[-]': ['noerrors','noundefined','autoload','require','html']}
  },
  svg: { fontCache: 'local' },
  startup: { typeset: false },
  options: { enableMenu: false }
};
