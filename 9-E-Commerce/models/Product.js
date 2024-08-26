const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  price: {
    type: Number, 
    required: [true, 'Price is required']
  },
  description: {
    type: String, 
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  // uploaded image url
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['office', 'kitchen', 'bedroom']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    enum: {
      values: ['ikea', 'liddy', 'marcos'],
      message: '{VALUE} is not supported'
    }
  },
  colors: {
    type: [String],
    required: [true, 'Color is required'],
  },
  featured: {
    type: Boolean,
    default: false
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  inventory: {
    type: Number, 
    default: 10
  },
  averageRating: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);