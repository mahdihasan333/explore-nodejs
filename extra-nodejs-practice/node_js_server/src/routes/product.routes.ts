import { IncomingMessage, ServerResponse } from "http";

export const routeHandler = async(req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    if(url === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-type': 'text/plain'})
        res.end('Welcome to Nodejs Server!!!')
    }else{
        
    }
}