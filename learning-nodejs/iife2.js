let a = 5;
((name) => {
    let a = 10;  //block scope
    console.log(`Learning ${name}`);
})("nodejs");

// console.log(a);
console.log(global);
console.log(module);
console.log(__dirname);
console.log(__filename);