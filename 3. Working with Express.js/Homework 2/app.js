const SERVER_PORT = 3000;

const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     console.log("First middleware!");
//     next()
// })

// app.use((req, res, next) => {
//     console.log("Second middleware!");
//     res.send("<h1>Hello from the middleware</h1>")
// })

app.use('/users', (req, res, next) => {
    console.log("Accessing users...");
    res.send("<h1>This is the users area</h1>")
})

app.use('/', (req, res, next) => {
    console.log("Accessing root...");
    res.send("<h1>This is the root area</h1>")
})

app.listen(SERVER_PORT, () => console.log('listening on port ' + SERVER_PORT))
