var request = require('request');

function printResponse(status_code, response) {
  if (![200, 201, 204].includes(status_code))
    console.log('Error: ', status_code, response);
  else
    console.log(response);
}

function listBooks() {
  request.get("http://localhost:3000/books", function(error, res) {
    printResponse(res.statusCode, res.body);
  });
}

function insertBook(id, title, author) {
  var clientServerOptions = {
        uri: "http://localhost:3000/books",
        body: JSON.stringify({
            id,
            title,
            author
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, res) {
        printResponse(res.statusCode, res.body);
    });
}

function getBook(id) {
  request.get(`http://localhost:3000/books/${id}`, function(error, res) {
    printResponse(res.statusCode, res.body);
  });
}

function deleteBook(id) {
  request.delete(`http://localhost:3000/books/${id}`, function(error, res) {
    printResponse(res.statusCode, res.body);
  });
}

// add the following section
var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
  listBooks();
else if (command == 'insert')
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
  getBook(process.argv[0]);
else if (command == 'delete')
  deleteBook(process.argv[0]);
