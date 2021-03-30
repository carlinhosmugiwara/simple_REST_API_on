const express = require('express')
const app = express()

let books = [
    {bookId: 1, name: "Harry Potter", author: 'JK Rowling' },
    {bookId: 2, name: "Good to Great", author: 'Jim Collins' }
];

app.use(express.json())


app.get('/', (req, res) =>{
    res.send('Mudança')
});

app.get('/api/books', (req, res) =>{
    res.send(books)
});

app.get('/api/books/:name/:author', (req, res) =>{
    let book = books.find(c => c.name === req.params.name && c.author === req.params.author)
    res.send(book)
    // find is a method available globally
});

const port = process.env.PORT || 3000 /* the port is going to be dynamic allocated in 
a reallife situation, so this is the right way to declare it */

app.listen(port, () => console.log(`Deu certo e tá rodando no port ${port}`))