"""Export every example and compile using local TeX. Never infer compilation from static checks."""
import json,subprocess,concurrent.futures,re,shutil,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
D=json.loads(Path(sys.argv[1]).read_text()) if len(sys.argv)>1 else json.loads(subprocess.check_output(['node',str(ROOT/'scripts/export-content.cjs')]))
OUT=ROOT/'examples';OUT.mkdir(exist_ok=True)

def compile_one(x):
    target=OUT/x['id'];target.mkdir(exist_ok=True)
    (target/'main.tex').write_text(x['code'],encoding='utf-8')
    for name,code in x.get('files',{}).items():
        file=target/name
        if '..' in Path(name).parts or Path(name).is_absolute():raise ValueError('Unsafe example file path')
        file.parent.mkdir(exist_ok=True,parents=True);file.write_text(code,encoding='utf-8')
    engine=x['engine'].lower().replace('latex','latex')
    flag={'pdflatex':'-pdf','xelatex':'-xelatex','lualatex':'-lualatex'}.get(engine)
    if not flag:return x['id'],{'compiled':False,'reason':'Unknown engine: '+engine,'reasonZh':'编译引擎未识别'}
    if not shutil.which('latexmk'):return x['id'],{'compiled':False,'reason':'latexmk is not installed','reasonZh':'环境未安装 latexmk'}
    try:
        process=subprocess.run(['latexmk',flag,*(['-g'] if results.get(x['id'],{}).get('compiled') is False else []),'-interaction=nonstopmode','-halt-on-error','-file-line-error','main.tex'],cwd=target,capture_output=True,text=True,errors='replace',timeout=90)
        (target/'build.txt').write_text(process.stdout+process.stderr,encoding='utf-8')
        log=(target/'main.log').read_text(errors='replace') if (target/'main.log').exists() else ''
        warnings=[l.strip() for l in log.splitlines() if re.search(r'Warning|Overfull|Underfull|Missing character',l)]
        ok=process.returncode==0 and (target/'main.pdf').exists()
        preview=False
        if ok and shutil.which('pdftoppm'):
            p=subprocess.run(['pdftoppm','-f','1','-singlefile','-scale-to','960','-png','main.pdf','preview'],cwd=target,capture_output=True,timeout=30)
            preview=p.returncode==0
        errors=[l.strip() for l in (process.stdout+process.stderr).splitlines() if re.search(r'^!|Error|not found|Undefined control|^.*\.tex:\d+:',l)]
        return x['id'],{'compiled':ok,'preview':preview,'engine':engine,'warnings':warnings,'reason':'; '.join(errors[:3]) if not ok else '', 'reasonZh':'本地编译未通过，请查看 build.txt' if not ok else '', 'status':'compiled' if ok else 'failed'}
    except subprocess.TimeoutExpired:return x['id'],{'compiled':False,'reason':'Compilation timed out','reasonZh':'编译超时','status':'timeout'}

results=json.loads((ROOT/'tests/latex-results.json').read_text()) if (ROOT/'tests/latex-results.json').exists() else {}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for id,status in pool.map(compile_one,D['examples']):
        results[id]=status
        print(id+': '+('PASS' if status['compiled'] else 'FAIL '+status.get('reason','')),flush=True)
(ROOT/'assets/js/compilation.js').write_text('/* Actual local TeX compilation results. */\nwindow.ATELIER.compilation='+json.dumps(results,ensure_ascii=False)+';\n',encoding='utf-8')
(ROOT/'tests/latex-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('Compiled',sum(v['compiled'] for v in results.values()),'of',len(results),flush=True)
