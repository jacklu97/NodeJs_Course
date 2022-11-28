const path = require('path')

const express = require('express');

const homeRoutes = require('./routes/home')
const usersRoutes = require('./routes/users')

const app = express();

const SERVER_PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoutes);
app.use(usersRoutes);


app.listen(SERVER_PORT, () => console.log('listening on port ' + SERVER_PORT))