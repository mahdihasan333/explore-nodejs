"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use("/todos", todos_routes_1.todosRouter);
app.use("/users", userRouter);
const filePath = path_1.default.join(__dirname, "../db/todo.json");
app.get("/", (req, res, next) => {
    console.log("I am custom middleware");
    console.log({
        url: req.url,
        method: req.method,
        header: req.header,
    });
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Welcome to Todos App!");
    }
    catch (error) {
        next(error);
    }
}));
app.get("/error", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Welcome to error World!");
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route Not Found' });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Someting went wrong from global error handler", error });
    }
});
// GET Single DATA
app.get("/todo/:title/:body", (req, res) => {
    console.log("From Query", req.query);
    console.log("From params", req.params);
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
