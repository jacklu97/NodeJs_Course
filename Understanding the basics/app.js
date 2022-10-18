const http = require('http');

// It is possible to create a server using an explicit function like this

// function rqListener(req, res) {
// }
// http.createServer(rqListener);


// But it is possible to use annonimous functions as well using arrow functions or traditional functions
// createServer returns a server
const server = http.createServer((req, res) => {
    console.log(req)
});

// Keeps the server alive
server.listen(3000);