"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const todosRouter = express.Router();
const userRouter = express_1.default.Router();
app.use('/todos', todos_routes_1.todosRouter);
app.use('/users', userRouter);
const filePath = path_1.default.join(__dirname, "../db/todo.json");
app.get('/', (req, res) => {
    res.send('Welcome to Todos App!');
});
// GET DATA
// app.get('/todos', (req : Request, res : Response) => {
//   // console.log(req.query)
//   const data = fs.readFileSync(filePath, { encoding: "utf-8" });
//   // console.log(data)
//   res.json(data)
// })
// GET Single DATA
app.get('/todo/:title/:body', (req, res) => {
    console.log('From Query', req.query);
    console.log('From params', req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // console.log(data)
    res.json(data);
});
// [app] [express.json()]-[todosRouter]=[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
// [todosRouter]-[get all todos /todos GET]-[create todo /todos/create-todo POST todo]
exports.default = app;
/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */ 
