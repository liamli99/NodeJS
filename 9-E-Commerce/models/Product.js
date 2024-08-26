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
  numOfReviews: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User is required']
  }
}, { timestamps: true, toJSON: { virtuals: true } } ); // By default virtuals will not be included when we pass a document to res.json!

// https://mongoosejs.com/docs/tutorials/virtuals.html
// https://mongoosejs.com/docs/populate.html#populate-virtuals
// https://mongoosejs.com/docs/api/schema.html#Schema.prototype.virtual()
// A virtual is a property that is not stored in MongoDB, it is typically used for computed properties on documents!
// A review has only one product, so that Review model can have product field; However, a product can have many reviews, so that Product model cannot have all their reviews because it can lead to performance issues! To solve the problem, we can use virtual populate to call populate on a virtual property that has a ref option!
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
})

// Different from save, document.deleteOne() does not trigger deleteOne middleware for legacy reasons! We need to add { document: true, query: false }!
ProductSchema.pre('deleteOne', { document: true, query: false }, async function() {
  await this.model('Review').deleteMany({ product: this._id });
})

module.exports = mongoose.model('Product', ProductSchema);