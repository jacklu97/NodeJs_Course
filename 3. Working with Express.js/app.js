const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

// Adding a path on this use, matches all the paths starting with that pattern
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '/views/page-not-found.html'));
})

// Keeps the server alive
app.listen(3000, () => console.log("Server running..."));