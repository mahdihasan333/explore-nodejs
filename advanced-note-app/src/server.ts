import  {Server}  from "http";
import app from "./app";
import mongoose from "mongoose";

let server : Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://todoapp:5vG7CX9gLfqqWxTk@cluster0.qgrba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB Using Mongoose!')
        server = app.listen(PORT, ()=> {
            console.log(`App is listening on post ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()