# Assignment #1: gRPC and REST API Implementation

**Member**
* Poompatai Puntitpong 		      6031318421
* Nuttrawanee Kitwatthanachai 	6030184421
* Wiwanna Phaithoonongkon 	    5931060021
* Rattapong Whangthamrongwit 	  6030499121
* Mawin Siangyai 			          6030475021
* Nathabordine Wonghirundacha 	6030183821

## 1. Screenshots of Swagger for your APIs in 2. 

![GitHub Logo](/swagger.png)

## 2. Source codes of 2 and 3. 

* https://github.com/2110521-2563-1-Software-Architecture/AA_assignment1/blob/master/rest/client.js -client
* https://github.com/2110521-2563-1-Software-Architecture/AA_assignment1/blob/master/rest/server.js -server


## 3. Compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a Table format as shown below. 


Functions | gRPC | REST API
------------ | ------------- | -------------
List books | client.list({}, function(error, books){ printResponse(error, books);}); | node client.js list
Insert books | client.insert(book, function(error, empty) { printResponse(error, empty);}); | node client.js insert <book>
Get books | client.get({ id: parseInt(id) }, function(error, book) { printResponse(error, book); }); | node client.js get <id>
Delete books | client.delete({ id: parseInt(id) }, function(error, empty) { printResponse(error, empty); }); | node client.js delete <id>
Watch books | call.on(‘data’, function(book) { console.log(book); }); | -

## 4. What are the main differences between REST API and gRPC? 
The main differences between REST API and gRPC is the format of the payload. REST API use json as the format for messages but gRPC use protobuf messages that usually send as binary which make it a lot faster and more efficient.

## 5. What is the benefits of introduce interface in front of the gRPC and REST API of the book services. 
It provides multiple inheritance so that a class can achieve total abstraction and reduce coupling between classes. Moreover, it also provided user transparency.

## 6. Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a Table format as shown below. 

Functions | gRPC | REST API
------------ | ------------- | -------------
List books | node interface.js grpc list | node interface.js rest list
Insert books | node interface.js grpc insert <id> <title> <author> | node interface.js rest insert <id> <title> <author> 
Get books | node interface.js grpc get <id> | node interface.js rest get <id>
Delete books | node interface.js grpc delete <id> | node interface.js rest delete <id>
Watch books | Node interface.js grpc watch | -

## 7. Draw a component diagram representing the book services with and without interfaces. 

![GitHub Logo](/with_interface.png)
![GitHub Logo](/without_interface.png)
