const fs=require('fs'),vm=require('vm'),path=require('path');
const sandbox={window:{}};vm.createContext(sandbox);
const names=['data','content-base','content-core','content-advanced','content-theorems','content-exercises','content-symbols','content-supplement','catalog','content-teaching-foundations','content-teaching-math','content-teaching-tables','content-teaching-courses','compilation'];
for(const name of names)vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/js',name+'.js'),'utf8'),sandbox,{filename:name+'.js'});
const D=sandbox.window.ATELIER;D.lessons=sandbox.window.LATEX_DATA.lessons;
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(D,null,2));else process.stdout.write(JSON.stringify(D));
