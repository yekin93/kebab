import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.svg':'image/svg+xml','.png':'image/png'};
http.createServer(async(req,res)=>{try{const target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}const info=await stat(target);const file=info.isDirectory()?path.join(target,'index.html'):target;res.writeHead(200,{'Content-Type':types[path.extname(file)]??'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404).end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('Static build at http://127.0.0.1:4173 (no SPA fallback)'));
