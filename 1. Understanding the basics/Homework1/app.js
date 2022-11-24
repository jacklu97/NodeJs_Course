const http = require('http');

const router = require('./router')

const APP_PORT = 3000;

const app = http.createServer(router);

app.listen(APP_PORT, () => console.log('listening on port ' + APP_PORT));