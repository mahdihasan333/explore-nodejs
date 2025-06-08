import { IncomingMessage, ServerResponse } from "http";
import { handleProducts } from "../controller/product.controller";

export const routeHandler = async(req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    if(url === '/' && req.method === 'GET'){
        res.writeHead(200, {'Content-type': 'text/plain'})
        res.end('Welcome to Node js Server!!!')
    }
    else if(url?.startsWith('/products')){
        await handleProducts(req, res)
    }
    
    else{
        res.writeHead(404)
        res.end('Bhai to poth vul korechen!!!')
    }
}