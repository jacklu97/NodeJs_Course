const routeHandler = (req, res) => {
    const {url} = req;

    switch(url) {
        case '/':
            homeRespose(res);
            break;
        case '/users':
            usersResponse(res);
            break;
        case '/create-user':
            createUserHandler(req, res);
            break;
    }
}

const createUserHandler = (req, res) => {
    if (req.method === 'POST') {
        const body = [];

        req.on('data', (data) => {
            body.push(data);
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=').pop();
            console.log(`Message from request: ${message}`);

            res.writeHead(302, {'Location': '/'});
            return res.end();
        })
    }
}

const homeRespose = (res) => {
    res.write("<html>")
    res.write("<head><title>Home</title></head>")
    res.write(`
        <body>
            <h1>
                Welcome to my page!
            </h1>
            <form method="post" action="/create-user">
                <input type="text" name="username">
                <button type="submit">Send data</button>
            </form>
        </body>
    `)
    res.write("</html>")
    res.end();
}

const usersResponse = (res) => {
    res.write("<html>")
    res.write("<head><title>Users list</title></head>")
    res.write(`
        <body>
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
                <li>User 4</li>
                <li>User 5</li>
            </ul>
        </body>
    `)
    res.write("</html>")
    res.end();
}

module.exports = routeHandler;