"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const todosRouter = express_1.default.Router();
app.use('/', todosRouter);
todosRouter.get('/todos', (req, res) => {
    // console.log(req.query)
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // console.log(data)
    console.log('From Todos Router');
    res.json({
        message: 'From todos Router',
        data
    });
});
const filePath = path_1.default.join(__dirname, "../db/todo.json");
app.get('/', (req, res) => {
    res.send('Welcome to Todos App!');
});
// GET DATA
app.get('/todos', (req, res) => {
    // console.log(req.query)
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // console.log(data)
    res.json(data);
});
// GET Single DATA
app.get('/todo/:title/:body', (req, res) => {
    console.log('From Query', req.query);
    console.log('From params', req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // console.log(data)
    res.json(data);
});
app.post('/todos/create-todo', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('Hello World');
});
// [app] [express.json()]-[todosRouter]=[Root Route "/"]-[GET "/todos"]-[POST Create ToDo]
exports.default = app;
/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */ 
