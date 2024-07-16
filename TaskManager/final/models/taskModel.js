const mongoose = require('mongoose');

// Schema: https://mongoosejs.com/docs/guide.html
const TaskSchema = new mongoose.Schema({
    // SchemaType: https://mongoosejs.com/docs/schematypes.html
    // All SchemaTypes have built-in validators!
    name: {
        type: String, 
        required: [true, 'Name is required'], // The value of name must be provided, if not, then the error message will come up!
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false // If the value of completed is not provided, then it will be false!
    }
});

// Model: https://mongoosejs.com/docs/models.html
// The model name is 'Task', so that the name of the collection associated with this model should be 'tasks'!
// Note that one model is for one collection! The collection name is the plural, lowercased version of the model name!
module.exports = mongoose.model('Task', TaskSchema);