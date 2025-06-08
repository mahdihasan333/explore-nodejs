import { IncomingMessage, ServerResponse } from "http";
import { products } from '../data/product';
import { parseBody } from "../utils/parseBody";
import { IProduct } from "../types/product";

export const handleProducts = async(req : IncomingMessage, res : ServerResponse) => {
    const url = req.url
    const idMatch = url?.match(/\/products\/(\d+)/);
    const id = idMatch ? Number(idMatch[1]) : null;

    if(url === '/products' && req.method === 'GET'){
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify(products))
    }
    else if(url === '/products' && req.method === 'POST'){
        try {
            const body =  await parseBody(req)
            const newProduct : IProduct = {id: 3, name: body.name}
            products.push(newProduct)
            res.writeHead(201, {'content-type' : 'application/json'})
            res.end(JSON.stringify(products))
        } catch (err) {
            res.writeHead(400)
            res.end('Error Occurred')
        }
    }
    else if(idMatch && req.method === 'PUT'){
        const body = await parseBody(req)
        const index = products.findIndex(p => p.id === id)
        if(index !== -1){
            products[index].name = body.name;
            res.writeHead(200, {'content-type' : 'application/json'})
            res.end(JSON.stringify(products))
        }
        else{
            res.writeHead(404)
            res.end('Product Not Found')
        }
    }
    else if(idMatch && req.method === 'DELETE'){
        const index = products.findIndex(p => p.id === id)
        if(index !== -1){
            products.splice(index, 1)
            res.writeHead(200, {'content-type' : 'application/json'})
            res.end(JSON.stringify({message : 'Deleted Successfully'}))
        }
        else{
            res.writeHead(404)
            res.end('Product Not Found')
        }
    }


}