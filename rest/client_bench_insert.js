var request = require('request');

const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;
const min = arr => arr.reduce((min,val) => Math.min(min,val), arr[0]);
const max = arr => arr.reduce((max,val) => Math.max(max,val), arr[0]);

const deleteBookPromise = (id) => new Promise(function(resolve, reject) {
   request.delete(`http://localhost:3000/books/${id}`, function(error, res) {
    resolve({});
  });
});

const insertBookPromise = (i) => new Promise(function(resolve, reject) {
  var clientServerOptions = {
        uri: "http://localhost:3000/books",
        body: JSON.stringify({
            id: i,
            name: "Example Book",
            author: "Example Author"
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, res) {
        resolve(res.body);
    });
});

const insertManyBookPromise = async i => {
  for (var l=0;l<10;l++) {
    await insertBookPromise(`${i}-${l}`)
  }
}

async function runner_small_list() {
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

async function runner_big_list() {
  console.log("INSERT")
  const things = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096];
  for (var i=0;i<things.length;i++) {
    for(var i2=0;i2<4096;i2++)
        await deleteBookPromise(i2);
  	var timers = []
		for(var i2=0;i2<things[i];i2++) {
	    var starter = new Date().getTime()
	    var books = await insertManyBookPromise(i2);
	    timers.push((new Date().getTime()) - starter);
	  }
	  console.log("Synchronous Iterations:", things[i], "max:", max(timers), "ms min:", min(timers), "ms avg:", average(timers))
  }
  //console.log(timers)
}
// add the following section
//runner_small_list()
runner_big_list();
