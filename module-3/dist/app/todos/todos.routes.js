"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get('/', (req, res) => {
    // console.log(req.query)
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    // console.log(data)
    console.log('From Todos Router');
    res.json({
        message: 'From todos Router',
        data
    });
});
exports.todosRouter.post('/create-todo', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('Hello World');
});
exports.todosRouter.get('/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('Hello World');
});
exports.todosRouter.put('/update-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('Hello World');
});
exports.todosRouter.delete('/delete-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('Hello World');
});
