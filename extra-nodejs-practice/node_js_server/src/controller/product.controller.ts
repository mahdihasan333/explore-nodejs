import { IncomingMessage, ServerResponse } from "http";
import { products } from "../data/product";

export const handleProducts = async(req : IncomingMessage, res : ServerResponse) => {
    const url = req.url

    if(url === '/products' && req.method === 'GET'){
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify(products))
    }
}