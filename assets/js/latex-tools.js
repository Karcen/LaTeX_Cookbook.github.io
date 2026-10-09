/* Heuristic checks for braces, environment order, and package combinations. */
window.LatexTools={
 diagnose(source,lang='zh'){
 const result=[],say=(z,e)=>lang==='zh'?z:e;
 const stripped=source.split('\n').map(l=>l.replace(/(?<!\\)%.*$/,'')).join('\n');
 const stack=[];let depth=0;
 for(let i=0;i<stripped.length;i++){const c=stripped[i];let slash=0;for(let j=i-1;j>=0&&stripped[j]==='\\';j--)slash++;if(slash%2)continue;if(c==='{')depth++;if(c==='}'){depth--;if(depth<0){result.push(say('检测到多余的右花括号。','An extra closing brace was detected.'));break}}}
 if(depth>0)result.push(say('花括号尚未闭合。检查最后一次修改处。','A brace is not closed. Check the most recent edit.'));
 for(const m of stripped.matchAll(/\\(begin|end)\{([^{}]+)\}/g)){if(m[1]==='begin')stack.push(m[2]);else if(stack.pop()!==m[2]){result.push(say('环境结束顺序不匹配：','Environment order does not match: ')+m[2]);break}}
 if(stack.length)result.push(say('环境尚未结束：','An environment is not closed: ')+stack.join(', '));
 if(/\\(?:mathbb|mathfrak)\b/.test(stripped)&&/\\documentclass/.test(stripped)&&!/(?:amsfonts|amssymb|unicode-math)/.test(stripped))result.push(say('mathbb/mathfrak 需要 amsfonts、amssymb 或合适的 unicode-math 配置。','mathbb/mathfrak needs amsfonts, amssymb, or a suitable unicode-math setup.'));
 if(/\\usepackage.*\{[^}]*fontspec/.test(stripped))result.push(say('使用 XeLaTeX 或 LuaLaTeX 编译 fontspec 文档。','Compile fontspec documents with XeLaTeX or LuaLaTeX.'));
 if(/\\begin\{longtable\}/.test(stripped)&&/\\begin\{table\}/.test(stripped))result.push(say('检查 longtable 是否被包在 table 内；跨页表不能放在浮动体中。','Check whether longtable is inside table; a multipage table cannot be wrapped in a float.'));
 if(/natbib/.test(stripped)&&/biblatex/.test(stripped))result.push(say('选择 natbib 或 biblatex，并使用所选系统的宏包与引用命令。','Choose either natbib or biblatex and use that system’s package and citation commands.'));
 return [...new Set(result)];
 },
 match(source,position){let index=position;if(!'{}[]()'.includes(source[index]))index--;const c=source[index],pairs={'{':'}','[':']','(':')','}':'{',']':'[',')':'('};if(!pairs[c])return null;const forward='{[('.includes(c),step=forward?1:-1;let level=0;for(let i=index;i>=0&&i<source.length;i+=step){if(source[i-1]==='\\')continue;if(source[i]===c)level++;if(source[i]===pairs[c])level--;if(level===0)return {from:index,to:i,line:source.slice(0,i).split('\n').length}}return {from:index,to:-1};}
};
