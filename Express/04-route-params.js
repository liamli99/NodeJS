const express = require('express');
const app = express();

const { products } = require('./resources/data');

app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href="/api/products">products</a>
    `);
});

app.get('/api/products', (req, res) => {
    // Only need id, name, and image properties
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts);
});

// Single route parameter
app.get('/api/products/:productId', (req, res) => {
    // If 'localhost:5001/api/products/1', then { productId: '1' }
    console.log(req.params);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const singleProduct = products.find((product) => product.id === Number(req.params.productId));
    if (!singleProduct) {
        res.status(404).send('Product Not Exist');
    } else {
        res.json(singleProduct);
    }
});

// Multiple route parameters
app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
    // If 'localhost:5001/api/products/1/reviews/a', then { productId: '1', reviewId: 'a' }
    console.log(req.params);

    res.send('Hello World');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});