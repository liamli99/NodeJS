const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    featured: {
        type: Boolean,
        default: false // If the value of featured is not provided, then it will be false!
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        // The value of company is restricted to these values, otherwise, an error message will come up!
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
});

// The model name is 'Product', so that the collection name is 'products'! 
module.exports = mongoose.model('Product', ProductSchema);