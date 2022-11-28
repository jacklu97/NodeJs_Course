const path = require('path');

const router = require('./baseRouter')
const rootDir = require('../utils/path')

router.get('/users', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'users.html'))
})

module.exports = router