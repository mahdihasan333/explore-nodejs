const http = require('http')


const data = [
    {
        title: 'prisma',
        body: 'learning node',
        createdAt: '5/18/2025, 1:25:02 AM'
    },
    {
        title: 'typescript',
        body: 'learning node',
        createdAt: '5/18/2025, 1:25:12 AM'
    }
]

const server = http.createServer((req, res) => {
    // console.log({req, res});
    // console.log(req.url, req.method)
    // res.end('Welcome to ToDo App Server')
    if(req.url === '/todos' && req.method === "GET"){
        res.writeHead(200, {
            // "content-type" : "application/json"
            "content-type" : "text/html"
            // "email" : "ph@gmail.com"
        })

        // res.setHeader('content-type', 'text/plain')
        // res.setHeader('email', 'ph2@gmail.com')
        // res.statusCode = 201
        // res.end("Hello todos")

        // res.end(JSON.stringify(data))

        res.end(`<h1>Hello World!</h1> <h2>Hello World!</h2> <h3>Hello World!</h3>`)
    }
    else if(req.url === '/todos/create-todo' && req.method === "POST"){
        res.end('Todo Created')
    }
    else{
        res.end("Route Not Found")
    }
})

server.listen(5000, '127.0.0.1', () => {
    console.log('✅ Server listening to port 5000')
})



/**
 * /todos - GET - ALL Todo
 * /todos/create-todo POST Create Todo
 */