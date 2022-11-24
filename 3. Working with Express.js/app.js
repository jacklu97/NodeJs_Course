const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    
    console.log("In antoher middleware!")
    res.send('<h1>Hello From Express!</h1>')
})

// Keeps the server alive
app.listen(3000, () => console.log("Server running..."));