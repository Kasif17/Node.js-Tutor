const { error, log } = require('console');
const fs = require('fs');

//fs.writeFileSync('./khan.txt', 'Hey VScode This my Node.js Practice Time\n');

//fs.writeFile('./khan2.txt',"Hello VScode this Async ", (error)=>{});

// const result =fs.readFileSync('./khan.txt','utf-8');
// console.log(result);


// fs.readFile('./khan2.txt','utf-8',(err,result)=>{
//     if(!result){
//         console.log(err);
//     }
//     console.log(result);
// });
const append = ()=>{
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
fs.appendFileSync('./khan.txt',`${formattedDate} This new time\n`)

}
append();