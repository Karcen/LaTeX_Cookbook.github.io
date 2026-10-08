/* SVG-only math rendering: no remote fonts or requests. */
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    packages: {'[-]': ['noerrors','noundefined']}
  },
  svg: { fontCache: 'local' },
  startup: { typeset: false },
  options: { enableMenu: false }
};
