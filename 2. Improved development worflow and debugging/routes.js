const fs = require('fs');

const requestHandler = (req, res) => {
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
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
    
            // This function stops the running application until it finishes. Is not the best practice
            // fs.writeFileSync('message.txt', message)
    
            // This function doesn't block the operation of the server
            // Third argument is a callback that will be called when the operation is done
            // error will be null if the operation was successful
            fs.writeFile('message.txt', message, err => {
                res.writeHead(302, {'Location': '/'})
                return res.end();
            })
        });
    }
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>My first page</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;