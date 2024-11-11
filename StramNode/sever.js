const cluster = require('cluster');

const os = require('os')

const totalcluster = os.cpus().length;

console.log(totalcluster);
