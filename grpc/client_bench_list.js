var grpc = require('grpc');

var booksProto = grpc.load('books.proto');

var client = new booksProto.books.BookService('127.0.0.1:50051', 
  grpc.credentials.createInsecure());

const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
const min = arr => arr.reduce((min,val) => Math.min(min,val), arr[0]);
const max = arr => arr.reduce((max,val) => Math.max(max,val), arr[0]);

const deleteBookPromise = (id) => new Promise(function(resolve, reject) {
   client.delete({ id: id }, function(error, empty) {
    resolve({})
  });
});

const listBookPromise = () => new Promise(function(resolve, reject) {
   client.list({}, function(error, books) {
    resolve(books);
   });
});

const insertBookPromise = (i) => new Promise(function(resolve, reject) {
  var book = { id: i, title: "Example Title", author: "Example Author" };
	client.insert(book, function(error, empty) {
	  resolve({});
	});
});

async function runner_add_4096() {
	for(var i2=0;i2<4096;i2++) {
    var books = await insertBookPromise(i2);
  }
}

async function runner_list() {
	console.log("LIST")
  const things = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  for (var i=0;i<things.length;i++) {
    for(var i2=0;i2<4096;i2++)
			await deleteBookPromise(i2);
		await runner_add_4096();
  	var timers = []
		for(var i2=0;i2<things[i];i2++) {
	    var starter = new Date().getTime()
	    var books = await listBookPromise();
	    timers.push((new Date().getTime()) - starter);
	  }
	  console.log("Synchronous Iterations:", things[i], "max:", max(timers), "ms min:", min(timers), "ms avg:", average(timers))
  }
  //console.log(timers)
}

// add the following section
runner_list();
