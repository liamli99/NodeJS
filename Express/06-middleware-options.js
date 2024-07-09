const express = require('express');
const app = express();

const morgan = require('morgan'); // npm install morgan

// Third-party middleware: https://www.npmjs.com/package/morgan
// Output request information to console
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});