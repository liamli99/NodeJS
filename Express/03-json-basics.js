const express = require('express');
const app = express();

const { products } = require('./resources/data');

app.get('/', (req, res) => {
    // Send a JSON response, the Content-Type is 'application/json'. Note that it accepts most of the data types and converts them to JSON!
    // https://expressjs.com/en/api.html#res.json
    // res.json([{name: 'Liam'}, {name: 'Amy'}]);

    // No need to use readFileSync because we already import the module!
    // Note that res.send/res.json can only be called once per request because they can end the request-response cycle, so that it is a good practice to include 'return' before res.send/res.json to prevent further execution. Including 'return' can exit the function immediately after sending the response!
    res.json(products);
});


app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});