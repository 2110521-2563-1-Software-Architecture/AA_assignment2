// In-memory array of book objects
var books = [ 
  { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
];

const express = require('express');

const app = express();
app.use(express.json());

app.get('/books', (req, res) => {
    res.json(books)
});

app.get('/books/:id', (req, res) => {
    for (var i = 0; i < books.length; i++)
            if (books[i].id == req.params.id)
                return res.json(books[i]);
    return res.status(404).send('Not Found')
});

app.post('/books', (req, res) => {
    var book = req.body;
    books.push(book);
    return res.status(201).json({})
});

app.delete('/books/:id', (req, res) => {
    for (var i = 0; i < books.length; i++) {
        if (books[i].id == req.params.id) {
            books.splice(i, 1);
            return res.status(204).json({})
        }
    }
    return res.status(404).send('Not Found')
});

const port = 3000
app.listen(port, () => console.log(`Listening on port ${port}...`) );
