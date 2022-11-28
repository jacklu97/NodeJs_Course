const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="post"><input type="text" name="title"><button type="submit">Submit</button></form>');
})

// It is possible to limit the HTTP method using the proper one instead of "use" method
router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

module.exports = router;