var request = require("request");
const average = (arr) => arr.reduce((sume, el) => sume + el, 0) / arr.length;
const max = (arr) => arr.reduce((max, val) => Math.max(max, val), arr[0]);

function printResponse(status_code, response) {
  if (![200, 201, 204].includes(status_code))
    console.log("Error: ", status_code, response);
  else console.log(response);
}

function listBooks() {
  let start = Date.now();
  return new Promise(function (resolve, reject) {
    request.get("http://localhost:3000/books", function (error, res) {
      let end = Date.now();
      resolve(end - start);
    });
  });
}

function insertBook(id, title, author) {
  var clientServerOptions = {
    uri: "http://localhost:3000/books",
    body: JSON.stringify({
      id,
      title,
      author,
    }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(clientServerOptions, function (error, res) {
    printResponse(res.statusCode, res.body);
  });
}

function getBook(id) {
  request.get(`http://localhost:3000/books/${id}`, function (error, res) {
    printResponse(res.statusCode, res.body);
  });
}

function deleteBook(id) {
  request.delete(`http://localhost:3000/books/${id}`, function (error, res) {
    printResponse(res.statusCode, res.body);
  });
}

function concurrent(calls) {
  let result = [];
  for (let i = 0; i < calls; i++) {
    let a = listBooks();
    result.push(a);
  }
  result = Promise.all(result).then((values) => {
    console.log(average(values));
    console.log(`time used : ${max(values)} ms `);
  });
}

// add the following section
var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBooks();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);
else if (command == "concurrent") concurrent(process.argv[0]);
