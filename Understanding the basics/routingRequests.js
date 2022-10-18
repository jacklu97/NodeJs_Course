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
        const body = [];
        // Create an event listener to use a buffer and fetch data chunks
        req.on('data', (data) => {
            console.log(data)
            body.push(data);
        })
        // 'End' event will be triggered when data has been recieved
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message)
        });
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