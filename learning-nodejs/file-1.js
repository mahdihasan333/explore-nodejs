// const var1 =  require("./file-2.js")
const {a, add, b} =  require("./file-2.js")
const {a : a3, add : add3, b : b3} = require("./file-3.js")


// console.log(var1)
// console.log(var1.a)
// console.log(var1.add(2, 3))

console.log(a)
console.log(add(5, 10))
console.log(b)

console.log(a3)
console.log(add3(5, 5, 5))
console.log(b3)