const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const {url, method} = req;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY')
        res.writeHead(302, {'Location': '/'})
        return res.end();
    }
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>My first page</h1></body>');
    res.write('</html>');
    res.end();
})


server.listen(3000);