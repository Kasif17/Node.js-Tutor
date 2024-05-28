const fs = require('fs');
console.log('1');

// Blocking Operation
// const result = fs.readFileSync('./contact1.txt','utf-8');
// console.log(result);

// console.log("2");

// output 
// 1
// Detait
// 2

// Non Blocking Opration

fs.readFile('./contact1.txt','utf-8',(err,result)=>{
  console.log(result);
})

console.log('2');
console.log("3");
console.log('4');

//Output 

// 1
// 2
// 3
// 4
// Detail