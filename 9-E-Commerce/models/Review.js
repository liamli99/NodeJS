const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Review is required'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required']
  },
  user: {
    type: mongoose.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User is required']
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  }
}, { timestamps: true });

// https://mongoosejs.com/docs/api/schema.html#Schema.prototype.index()
// Create a compound unique index! It means that a user can only leave one review per product!!!
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);