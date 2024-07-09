const express = require('express');
const app = express();

const { products } = require('./resources/data');

app.get('/', (req, res) => {
    // Send a JSON response, the Content-Type is 'application/json'
    // https://expressjs.com/en/api.html#res.json
    // res.json([{name: 'Liam'}, {name: 'Amy'}]);

    // No need to use readFileSync because we already import the module!
    res.json(products);
});


app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});