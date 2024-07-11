// Rewrite 07-http-methods.js using express router!!!
// This is the main file!

const express = require('express');
const app = express();

// 1. Import router module!
const peopleRouter = require('./08-router-people');
const authRouter = require('./08-router-auth');

// Built-in middleware
app.use(express.static('./resources/methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 2. Mount router module on a specific path
app.use('/api/people', peopleRouter);
app.use('/login', authRouter);

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});

