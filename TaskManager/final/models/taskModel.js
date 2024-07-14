const mongoose = require('mongoose');

// Schema: https://mongoosejs.com/docs/guide.html
const TaskSchema = new mongoose.Schema({
    // SchemaType: https://mongoosejs.com/docs/schematypes.html
    // All SchemaTypes have built-in validators!
    name: {
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Model: https://mongoosejs.com/docs/models.html
module.exports = mongoose.model('Task', TaskSchema);