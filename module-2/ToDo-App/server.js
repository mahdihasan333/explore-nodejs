const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");



// const data = [
//     {
//         title: 'prisma',
//         body: 'learning node',
//         createdAt: '5/18/2025, 1:25:02 AM'
//     },
//     {
//         title: 'typescript',
//         body: 'learning node',
//         createdAt: '5/18/2025, 1:25:12 AM'
//     }
// ]

// const server = http.createServer((req, res) => {
// console.log({req, res});
// console.log(pathname, req.method)
// res.end('Welcome to ToDo App Server')
// if(pathname === '/todos' && req.method === "GET"){
//     res.writeHead(200, {
// "content-type" : "application/json"
// "content-type" : "text/html"
// "email" : "ph@gmail.com"
// })

// res.setHeader('content-type', 'text/plain')
// res.setHeader('email', 'ph2@gmail.com')
// res.statusCode = 201
// res.end("Hello todos")

// res.end(JSON.stringify(data))

// res.end(`<h1>Hello World!</h1> <h2>Hello World!</h2> <h3>Hello World!</h3>`)
// }
// })

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathname = url.pathname
  // console.log(url, "url")
  // GET All Todos
  if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }

  // POST A Todo
  else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      // console.log(data);
      const { title, body } = JSON.parse(data);
      // console.log({ title, body });


      const createdAt = new Date().toLocaleString()

      const allTodos = fs.readFileSync(filePath, {encoding : "utf-8"})
      const parsedAllTodos = JSON.parse(allTodos)

      console.log(parsedAllTodos)

      parsedAllTodos.push({title, body, createdAt})

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding : 'utf-8'})

      res.end(JSON.stringify({title, body, createdAt}, null, 2))

    });

    // const allTodos = fs.readFileSync(filePath, {encoding : "utf-8"})

    // res.end(JSON.stringify(allTodos));
  }
  else if (pathname === '/todo' && req.method === "GET") {
    const title = url.searchParams.get('title')
    console.log(title, 'title')
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data)

    const todo = parsedData.find((todo) => todo.title === title)

    const stringifiedTodo = JSON.stringify(todo)

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(stringifiedTodo);

    res.end('Single todo')
  }

  else {
    res.end("Route Not Found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✅ Server listening to port 5000");
});

/**
 * /todos - GET - ALL Todo
 * /todos/create-todo POST Create Todo
 */
