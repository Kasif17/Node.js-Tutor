const readline = require('readline');

// Create an interface to read lines from the standard input (stdin)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Use the question method to ask for user input
rl.question('Please enter your name: ', (name) => {
    console.log(`Hello, ${name}!`);
    
    // Close the readline interface to end the program
    rl.close();
});
