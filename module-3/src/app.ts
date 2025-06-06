import express, { Application, NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { todosRouter } from "./app/todos/todos.routes";
const app: Application = express();

app.use(express.json());

// const todosRouter = express.Router();
const userRouter = express.Router();

app.use("/todos", todosRouter);
app.use("/users", userRouter);

const filePath = path.join(__dirname, "../db/todo.json");

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("I am custom middleware");
    console.log({
      url: req.url,
      method: req.method,
      header: req.header
    })
    next();
  },

  (req: Request, res: Response) => {
    res.send("Welcome to Todos App!");
  }
);

// GET Single DATA
app.get("/todo/:title/:body", (req: Request, res: Response) => {
  console.log("From Query", req.query);
  console.log("From params", req.params);
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // console.log(data)
  res.json(data);
});

// [app] [express.json()]-[todosRouter]=[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
// [todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]

export default app;

/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */
