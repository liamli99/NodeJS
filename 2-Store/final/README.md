# HTTP Methods
## GET
1. /api/v1/products/test: Just for testing!
2. /api/v1/products: 
Example usage
(1) /api/v1/products?name=table:
(2) /api/v1/products?featured=true:
(3) /api/v1/products?company=ikea:
(4) /api/v1/products?sort=-name price:
(5) /api/v1/products?select=name price:
(6) /api/v1/products?page=2&limit=10:
(7) /api/v1/products?numericFilters=price>90,rating>=4.5:



# Packages
`npm install dotenv`
`npm install express`
`npm install mongoose`
`npm install express-async-errors`
`npm install nodemon -D`

# .env
MONGO_URI is the connection string, remember to include the user, password, and database name in the right place!

# Populate
Remember to first run `node populate.js` to populate the mongoDB database with products.json!