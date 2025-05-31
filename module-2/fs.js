// synchronous
// 1. file read / I/O intensive task -> single thread -> not go thread pool ->


// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task completion

const fs = require("fs")


// console.log('Task 1')


// const text = 'Learning File System'

// fs.writeFileSync('./hello.txt', text)

// console.log('Task 3')

// const data = fs.readFileSync('./hello.txt', {encoding: "utf-8"})

// console.log('Task 4')

// console.log(data);

// console.log('Task 1');
// let text = 'node js';



// fs.writeFile('./hello-world.txt', text, {encoding : 'utf8'}, (err) => {
//     if(err){
//         console.log('Something went wrong!', err)
//         return
//     }

//     console.log('Written successfully')

// })

// fs.readFile('./hello.txt', {encoding: 'utf-8'}, (err, data) => {
//     if(err){
//         console.log('Something went wrong!', err)
//         return
//     }
//     text = data;
//     console.log(data, 'inside readfile callback')
// });


// console.log(text)

// console.log('Task 3')


const readstream = fs.createReadStream('./hello-world.txt', {encoding : 'utf-8'});
const writestream = fs.createWriteStream('./hello.txt', {encoding : 'utf-8'});


readstream.on('data', (data) => {
    console.log(data)

    writestream.write(data, (err) => {
        if(err){
            throw Error('Error', err)
        }
    })
})


readstream.on('error', (err) => {
    if(err){
        throw Error('Error', err)
    }
})

writestream.on('error', (err) => {
    if(err){
        throw Error('Error', err)
    }
})


readstream.on('end', () => {
    console.log('reading ended')
    writestream.end()
})

writestream.on('finish', () => {
    console.log('Written successfully')
})