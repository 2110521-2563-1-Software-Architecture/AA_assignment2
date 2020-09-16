var grpc = require("grpc");

var booksProto = grpc.load("books.proto");

var client = new booksProto.books.BookService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);

const average = (arr) => arr.reduce((sume, el) => sume + el, 0) / arr.length;
const max = (arr) => arr.reduce((max, val) => Math.max(max, val), arr[0]);

function printResponse(error, response) {
  if (error) console.log("Error: ", error);
  else console.log(response);
}

function listBooks() {
  let start = Date.now();
  return new Promise(function (resolve, reject) {
    client.list({}, function (error, books) {
      let end = Date.now();
      resolve(end - start);
    });
  });
}

function insertBook(id, title, author) {
  var book = { id: parseInt(id), title: title, author: author };
  client.insert(book, function (error, empty) {
    printResponse(error, empty);
  });
}

function getBook(id) {
  client.get({ id: parseInt(id) }, function (error, book) {
    printResponse(error, book);
  });
}

function deleteBook(id) {
  client.delete({ id: parseInt(id) }, function (error, empty) {
    printResponse(error, empty);
  });
}

function watchBooks() {
  var call = client.watch({});
  call.on("data", function (book) {
    console.log(book);
  });
}

function concurrent(calls) {
  result = [];
  for (let i = 0; i < calls; i++) {
    a = listBooks();
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
else if (command == "watch") watchBooks();
else if (command == "concurrent") concurrent(process.argv[0]);
