// synchronous
// 1. file read / I/O intensive task -> single thread -> not go thread pool ->


// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task completion

const fs = require("fs")


console.log('Task 1')


const text = 'Learning File System'

fs.writeFileSync('./hello.txt', text)

console.log('Task 3')

const data = fs.readFileSync('./hello.txt', {encoding: "utf-8"})

console.log('Task 4')

console.log(data);