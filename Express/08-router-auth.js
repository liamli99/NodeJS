// Auth router groups all routes whose route path starts with '/login'!

const express = require('express');
const router = express.Router();

// Note that in the main file, the mount path of this router is '/login', so that all the following route paths should be relative to '/login'!

// /login
router.post('/', (req, res) => {
    console.log(req.body);
    
    const { name } = req.body;
    if (name) {
        res.status(200).send(`Welcome ${name}`);
    } else {
        res.status(401).send('Please provide your name');
    }
});

module.exports = router;