"""Produce a deployable static folder and a self-contained archive, without developer setup."""
import shutil,zipfile,sys
from pathlib import Path
R=Path(__file__).resolve().parent.parent;OUT=R/'deliverables';SITE=OUT/'LaTeX-Cookbook';OUT.mkdir(exist_ok=True)
if SITE.exists():shutil.rmtree(SITE)
SITE.mkdir()
for file in R.glob('*.html'):shutil.copy2(file,SITE/file.name)
for name in ['assets','examples']:
 shutil.copytree(R/name,SITE/name)
for name in ['README.md','CONTENT_INDEX.md','TECHNICAL_NOTES.md','QA_REPORT.md','LANGUAGE_REVIEW.md','THIRD_PARTY_NOTICES.md','.nojekyll']:
 if (R/name).exists():shutil.copy2(R/name,SITE/name)
# Preserve compile evidence but omit volatile TeX caches and auxiliary files from hosting.
for file in (SITE/'examples').rglob('*'):
 if file.is_file() and (file.suffix in ['.aux','.bcf','.run.xml','.toc','.nav','.snm','.fdb_latexmk','.fls','.out','.xdv','.vrb','.ent','.idx','.ilg','.synctex.gz'] or file.name.endswith(('.run.xml','.synctex.gz')) or file.name=='missfont.log'):file.unlink()
if '--site-only' not in sys.argv:
 for name in ['scripts','tests','.github']:shutil.copytree(R/name,SITE/name,ignore=shutil.ignore_patterns('__pycache__','exported-equation.tex'))
 shutil.copy2(R/'.gitignore',SITE/'.gitignore')
 archive=OUT/'LaTeX-Cookbook.zip'
 with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=8) as z:
  for file in SITE.rglob('*'):
   if file.is_file():z.write(file,Path('LaTeX-Cookbook')/file.relative_to(SITE))
 print(archive,archive.stat().st_size)
print(SITE)
