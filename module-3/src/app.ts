import express, { Application, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
const app : Application = express()

app.use(express.json())

const todosRouter = express.Router();

app.use('/', todosRouter)

todosRouter.get('/todos', (req : Request, res : Response) => {
  // console.log(req.query)
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data)
  console.log('From Todos Router')
  res.json({
    message: 'From todos Router',
    data
  })
})

const filePath = path.join(__dirname, "../db/todo.json");


app.get('/', (req : Request, res : Response) => {
  res.send('Welcome to Todos App!')
})
// GET DATA
app.get('/todos', (req : Request, res : Response) => {
  // console.log(req.query)
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data)
  res.json(data)
})

// GET Single DATA
app.get('/todo/:title/:body', (req : Request, res : Response) => {
  console.log('From Query', req.query)
  console.log('From params', req.params)
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data)
  res.json(data)
})

app.post('/todos/create-todo', (req: Request, res: Response) => {
  const {title, body} = req.body;
  console.log(title, body)
  res.send('Hello World')
})


// [app] [express.json()]-[todosRouter]=[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]




export default app;

/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */