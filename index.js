const express = require('express')
const Joi = require('joi') // input validation module
const app = express()

let books = [
    {bookId: 1, name: "Harry Potter", author: 'JK Rowling', price: 15.07 },
    {bookId: 2, name: "Good to Great", author: 'Jim Collins', price: 12.90 }
];

app.use(express.json())


app.get('/', (req, res) =>{
    res.send('Welcome to my book store')
});

app.get('/api/books', (req, res) =>{
    res.send(books)
});

app.get('/api/books/:name/:author', (req, res) =>{
    let book = books.find(c => c.name === req.params.name && c.author === req.params.author)
    if(!book) res.status(404).send('Book not found')
    res.send(book)
    // find is a method available globally
});

app.post('/api/books', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        author: Joi.string().min(2).required(),
        price: Joi.number().min(1).required()
        
    })
    const validation = schema.validate(req.body)
    if(validation.error){
        res.status(400).send(validation.error)
        return
    } 
    let book = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,
        price: parseFloat(req.body.price)
    }
    books.push(book)
    res.send(book)
})


const port = process.env.PORT || 3000 /* the port is going to be dynamic allocated in 
a reallife situation, so this is the right way to declare it */

app.listen(port, () => console.log(`It's running on port ${port}`))