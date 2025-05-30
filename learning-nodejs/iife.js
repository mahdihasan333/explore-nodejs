// ((name) => {
//     console.log(`Learning ${name}`)
// })("nodejs")

// let a = 5;
// ((name) => {
//     let a = 10;  //block scope
//     console.log(`Learning ${name}`);
// })("nodejs");

// console.log(a);

((require, module, __dirname, __filename) => {
  let a = 5;
  ((name) => {
    let a = 10; //block scope
    console.log(`Learning ${name}`);
  })("nodejs");

  console.log(a);
  console.log(module);
  console.log(__dirname);
})(require, module, "./utils/add.js")
