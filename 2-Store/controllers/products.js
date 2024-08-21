const Product = require('../models/product');

// Note that there is no need to include try catch block in the async function! This is because we load 'express-async-errors' in app.js which can automatically catch errors (rejected or thrown) in async function and passing them to the next error-handling middleware!!! So that we only need to keep the code in 'try'!

// GET /api/v1/products/test
// This is only used for testing!
const getAllProductsTest = async (req, res) => { 
    // 1. Model.find(): Find documents that match the condition
    // https://mongoosejs.com/docs/api/model.html#Model.find()

    // const products = await Product.find({ featured: 'true', company: 'ikea' }); // req.query
    // const products = await Product.find({ featured: true, company: 'ikea' }); // JavaScript Object
    // const products = await Product.find({ "featured": true, "company": "ikea" }); // JSON

    // const products = await Product.find({ name: { $regex: 'table', $options: 'i' } });
    
    const products = await Product.find({ price: { $gt: 100 } });
    
    // 2. Query.sort(): Sort documents based on the condition
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()

    // const products = await Product.find({}).sort('-name price');
    // const products = await Product.find({}).sort({ "name": -1, "price": 1 });

    // 3. Query.select(): Specify which document fields to include or exclude
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.select()

    // const products = await Product.find({}).select('name price');
    // const products = await Product.find({}).select('-name -price');
    // const products = await Product.find({}).select({ "name": 1, "price": 1 });
    // const products = await Product.find({}).select({ "name": 0, "price": 0 });

    // 4. Query.skip(): Specify the number of documents to skip
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.skip()

    // 5. Query.limit(): Specify the maximum number of documents the query will return
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.limit()
    // const products = await Product.find({}).skip(1).limit(3);

    res.status(200).json({ products });
    
}

// GET /api/v1/products
const getAllProducts = async (req, res) => {
    // If '/api/v1/products?featured=true&limit=1', then { featured: 'true', limit: '1' }! These are Params in Postman!
    console.log(req.query);

    // const products = await Product.find(req.query);
    // The return value of Model.find() is Query! Note that Queries are not Promises, but we can use them as Promises! The resolved value is an array of all documents that match the condition!
    // However, if req.query includes sort, select, and more complexed functions, we need to destructure all the properties of req.query and deal with them one by one!!!

    // 1. Find

    const queryObject = {};
    const { name, featured, company, numericFilters, sort, select } = req.query;

    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex
    // Find all documents whose 'name' field contains 'req.query.name' and is case-insensitive!
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    // Find all documents whose 'featured' and 'company' must be the same as 'req.query.featured' and 'req.query.company'!
    if (featured) {
        // queryObject.featured = featured === 'true' ? true : false;
        queryObject.featured = featured;
    }
    if (company) {
        queryObject.company = company;
    }

    // Find all documents whose 'price' and 'rating' satisfy the numeric filters!
    // An example request can be '/api/v1/products?numericFilters=price<=50,rating>4', so that numericFilters is 'price<=50,rating>4', we want to transform it to { price: { $lte: 50 }, rating: { $gt: 4 } }
    if (numericFilters) {
        // This is a JavaScript Object whose keys are strings, note that keys can be symbols or strings!
        // Comparison query operators: https://www.mongodb.com/docs/manual/reference/operator/query/
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        // Regular expression pattern that includes '>', '>=', '=', '<', '<='
        const regex = /\b(>|>=|=|<|<=)\b/g;
        // Replace substrings of numericFilters that match the pattern with corresponding query operators!
        let filters = numericFilters.replace(regex, (match) => {
            return `-${operatorMap[match]}-`
        });
        
        // If '/api/v1/products?numericFilters=price<=50,rating>4', then filters is 'price-$lte-50,rating-$gt-4'!
        console.log(filters);

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            // Array destructuring
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                // Bracket notation 
                // We want to get something like { price: { $lte: 50 } }
                // The following code can be shortened using dynamic object key: queryObject[field]= { [operator]: Number(value) };
                queryObject[field]= {};
                queryObject[field][operator] = Number(value);
            }
        });

    }

    console.log(queryObject);

    // Note that result is Query because the return value of Model.find() is Query!
    // https://mongoosejs.com/docs/api/model.html#Model.find()
    let result = Product.find(queryObject);

    // 2. Sort

    if (sort) {
        // Note that result is also Query because the return value of Query.sort() is Query!
        // An example request can be '/api/v1/products?sort=-name price'!
        // If we want the request to be '/api/v1/products?sort={"name": -1, "price": 1}', we can write result = result.sort(JSON.parse(sort))!!!
        // https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()
        result = result.sort(sort);
    // Sort by 'createAt' in ascending order by default!
    } else {
        result = result.sort('createAt');
    }
    
    // 3. Select

    if (select) {
        // Note that result is also Query because the return value of Query.select() is Query!
        // An example request can be '/api/v1/products?select=name price'!
        // If we want the request to be '/api/v1/products?select={"name": 1, "price": 1}', we can write result = result.select(JSON.parse(select))!!!
        // https://mongoosejs.com/docs/api/query.html#Query.prototype.select()
        result = result.select(select);
    }

    // 4. Skip + Limit, the following is used for pagination! 

    const page = Number(req.query.page) || 1; // Current page number
    const limit = Number(req.query.limit) || 10; // The maximum number of documents on a page
    
    const skip = (page - 1) * limit; // The number of documents to skip, this is calculated by page and limit, not provided by user!!!

    // Note that result is also Query because the return value of Query.skip().limit() is Query!
    // Page 1: [1, limit]; Page 2: [limit + 1, 2 * limit]; ...
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.skip()
    // https://mongoosejs.com/docs/api/query.html#Query.prototype.limit()
    result.skip(skip).limit(limit);


    // The resolved value is an array of all documents that match all the above conditions or empty array!
    const products = await result;

    res.status(200).json({ products });
}

module.exports = { getAllProductsTest, getAllProducts };