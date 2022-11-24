const http = require('http');

// It is possible to create a server using an explicit function like this

// function rqListener(req, res) {
// }
// http.createServer(rqListener);


// But it is possible to use annonimous functions as well using arrow functions or traditional functions
// createServer returns a server
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)

    // Response object doesn't contain too many information from scratch
    // but it gets interesting when we add information

    // We can set our headers as we need
    res.setHeader('Content-Type', 'text/html');

    // Response gets its body in chunks, this means piece by piece
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>My first page</h1></body>');
    res.write('</html>');

    // When we are done, we use end method. If we try to write more data after it, we get an error
    res.end();
});

// Keeps the server alive
server.listen(3000, () => console.log("Server running..."));