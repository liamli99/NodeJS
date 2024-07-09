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
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image }
    })
    res.json(newProducts);
});

// Query string
app.get('/api/v1/search', (req, res) => {
    // If 'localhost:5001/api/v1/search?name=Liam&limit=1', then { name: 'Liam', limit: '1' }
    console.log(req.query);

    // Shallow copy!
    // OR let sortedProducts = products.slice();
    let sortedProducts = [...products];
    // Suppose we want to find products whose name starts with 'name' and the number of results is 'limit'
    const { name, limit } = req.query;
    if (name) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        sortedProducts = sortedProducts.filter((product) => product.name.startsWith(name));
    }
    if (limit) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if (sortedProducts.length < 1) {
        res.status(200).json({ success: true, data: [] })
    } else {
        res.status(200).json(sortedProducts);
    }
})

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});