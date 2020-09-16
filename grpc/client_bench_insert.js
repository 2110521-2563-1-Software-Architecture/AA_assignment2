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

const insertBookPromise = (i) => new Promise(function(resolve, reject) {
  var book = { id: i, title: "Example Title", author: "Example Author" };
	client.insert(book, function(error, empty) {
	  resolve({});
	});
});

const insertManyBook = async i => {
  for (var l=0;l<10;l++) {
    await insertBookPromise(l);
  }
}

async function runner_list() {
  console.log("INSERT")
  const things = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  for (var i=0;i<things.length;i++) {
    for(var i2=0;i2<4096;i2++)
        await deleteBookPromise(i2);
  	var timers = []
		for(var i2=0;i2<things[i];i2++) {
	    var starter = new Date().getTime()
	    var books = await insertBookPromise(i2);
	    timers.push((new Date().getTime()) - starter);
	  }
	  console.log("Synchronous Iterations:", things[i], "max:", max(timers), "ms min:", min(timers), "ms avg:", average(timers))
  }
  //console.log(timers)
}
//for running insert book list
async function runner_multilist() {
  console.log("INSERT")
  const things = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  for (var i=0;i<things.length;i++) {
    for(var i2=0;i2<4096;i2++)
        await deleteBookPromise(i2);
  	var timers = []
		for(var i2=0;i2<things[i];i2++) {
      var starter = new Date().getTime()
	    var books = await insertManyBook(i2);
	    timers.push((new Date().getTime()) - starter);
	  }
	  console.log("Synchronous Iterations:", things[i], "max:", max(timers), "ms min:", min(timers), "ms avg:", average(timers))
  }
  //console.log(timers)
}

// add the following section
runner_list();
//runner_multilist();
