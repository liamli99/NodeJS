# Packages
- `npm install mongoose`
- `npm install express`
- `npm install express-async-errors`
- `npm install dotenv`
- `npm install nodemon -D`

# .env
- MONGO_URI

# HTTP Methods
## GET
- /api/v1/products/test: This is for testing!
- /api/v1/products: This is the actual implementation!

## Example usage
- /api/v1/products?name=table
- /api/v1/products?featured=true
- /api/v1/products?company=ikea
- /api/v1/products?numericFilters=price>90,rating>=4.5
- /api/v1/products?sort=-name price
- /api/v1/products?select=name price
- /api/v1/products?page=2&limit=10

# Populate
Remember to run `node db/populate.js` to populate the mongoDB database with products.json in the beginning!