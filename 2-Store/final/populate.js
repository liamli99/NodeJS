// Populate a MongoDB database with product.json

require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const data = require('./products.json'); // An array of JSON!

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // https://mongoosejs.com/docs/api/model.html#Model.deleteMany()
        // Delete all documents that match the condition, if no condition, then delete all documents!
        await Product.deleteMany();
        // https://mongoosejs.com/docs/api/model.html#Model.create()
        // Create one document (one JSON or JavaScript Object) or multiple documents (an array of JSON or JavaScript Objects)!
        await Product.create(data);
        console.log('Success');
        // Exit the process with exit code 0 (success)
        process.exit(0);
    } catch (error) {
        console.log(error);
        // Exit the process with exit code 1 (error)
        process.exit(1);
    }
}
start();