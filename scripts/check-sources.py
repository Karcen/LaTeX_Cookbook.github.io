"""Record primary-reference reachability without treating timeouts as broken links."""
import json,subprocess,urllib.request,concurrent.futures,sys
from pathlib import Path
R=Path(__file__).resolve().parent.parent
D=json.loads(Path(sys.argv[1]).read_text()) if len(sys.argv)>1 else json.loads(subprocess.check_output(['node',str(R/'scripts/export-content.cjs')]))
urls=sorted({s['url'] for e in D['entries'] for s in e['sources']})
def check(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'LaTeX-Atelier-reference-check/2.0'},method='GET')
  with urllib.request.urlopen(req,timeout=15) as response:
   response.read(256)
   return {'url':url,'status':response.status,'final':response.url,'available':True}
 except Exception as e:return {'url':url,'reason':str(e),'available':False}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:results=list(pool.map(check,urls))
report={'checked':len(urls),'available':sum(r['available'] for r in results),'unavailable':[r for r in results if not r['available']],'results':results}
(R/'tests/source-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='results'},ensure_ascii=False,indent=2))
