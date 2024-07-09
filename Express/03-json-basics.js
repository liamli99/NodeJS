const express = require('express');
const app = express();

const { products } = require('./resources/data');

app.get('/', (req, res) => {
    // Send a JSON response, the Content-Type is 'application/json'
    // https://expressjs.com/en/api.html#res.json
    // res.json([{name: 'Liam'}, {name: 'Amy'}]);

    // No need to use readFileSync because we already import the module!
    // Note that res.send and res.json can end the request-response cycle, so that it is a good practice to include 'return' before res.send and res.json to prevent further execution. Including 'return' can exit the function immediately after sending the response!
    res.json(products);
});


app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});