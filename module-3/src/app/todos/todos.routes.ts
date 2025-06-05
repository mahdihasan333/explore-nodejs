import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


const filePath = path.join(__dirname, "../../../db/todo.json");

export const todosRouter = express.Router();

todosRouter.get('/', (req : Request, res : Response) => {
  // console.log(req.query)
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data)
  console.log('From Todos Router')
  res.json({
    message: 'From todos Router',
    data
  })
})


todosRouter.post('/create-todo', (req: Request, res: Response) => {
  const {title, body} = req.body;
  console.log(title, body)
  res.send('Hello World')
})



todosRouter.get('/:title', (req: Request, res: Response) => {
  const {title, body} = req.body;
  console.log(title, body)
  res.send('Hello World')
})


todosRouter.put('/update-todo/:title', (req: Request, res: Response) => {
  const {title, body} = req.body;
  console.log(title, body)
  res.send('Hello World')
})


todosRouter.delete('/delete-todo/:title', (req: Request, res: Response) => {
  const {title, body} = req.body;
  console.log(title, body)
  res.send('Hello World')
})