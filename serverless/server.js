const readline = require('readline');

const L1 = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
});

L1.question('Enter the name',(name)=>{
    console.log(`My Name is ${name}`);
    
    L1.close();
})