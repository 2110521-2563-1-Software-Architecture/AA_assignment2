const { spawn } = require('child_process');

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var server = process.argv.shift();

var ls;
if (server == 'grpc')
    ls = spawn('node', ["client.js"].concat(process.argv), {cwd:"./grpc"});
else if (server=='rest')
    ls = spawn('node', ["client.js"].concat(process.argv), {cwd:"./rest"});


ls.stdout.on('data', (data) => {
  console.log(`${data}`);
});


