# Assignment #2: gRPC and REST API benchmarking

**Member**
* Poompatai Puntitpong 		      6031318421
* Nuttrawanee Kitwatthanachai 	6030184421
* Wiwanna Phaithoonongkon 	    5931060021
* Rattapong Whangthamrongwit 	  6030499121
* Mawin Siangyai 			          6030475021
* Nathabordine Wonghirundacha 	6030183821

## 1. Graphs showing the benchmarking results with the explanation of your experimental settings. 
### a. 	Single client with a small call to insert a book item, a bigger call to insert a list of multiple book items. 
![GitHub Logo](/aa_insert.png)
### b. 	Multiple clients with different kind of calls.
![GitHub Logo](/DELETE.png)
![GitHub Logo](/GET.png)
![GitHub Logo](/LIST.png)
### c. 	Vary the number of concurrent calls from 1 to 4096 calls.
## 2. Discussion of the results why one method is better the other in which scenarios. 
 From the results of the graphs, It's shown that gRPC has better performance in most scenarios because of the concurrent request in a different connection. HTTP/1.1 which is required by REST does not support The concurrent requests. The responses have to be sent back in the same order as the requests came in. One the other hand, The concurrent request in HTTP/2 that is required by gRPC supports request multiplexing.

## 3. Comparison of the gRPC and REST API from the aspects of language neutral, ease of use, and performance.
  * In term of language neutral, While we were eventually able to build everything we wanted with gRPC and Protocol Buffers in the languages we were working with, JSON definitely has much better support and documentation in most of these languages. 
  * In term of ease of use, JSON is easier because the payload are in text while gRPC is binary.
  * In term of performance, gRPC is better since gRPC uses HTTP/2 which is much faster than HTTP/1.1 used in REST by default. And also, gRPC uses Protocol buffer to serialize payload data, which is binary and smaller, while REST uses JSON, which is text and larger.

## 4. Does your results comply with the results in https://medium.com/@bimeshde/grpc-vs-rest-performance-simplified-fd35d01bbd4
  Yes, it has the same results.
