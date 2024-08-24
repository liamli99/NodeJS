const mongoose = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Name is required'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        
        // match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'], 
        
        // An alternative approach to validate email using validator package:
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        unique: true 
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        minlength: 6
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

UserSchema.pre('save', async function() {
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password, salt);
});

// createJWT method is moved to utils/jwt.js!

UserSchema.methods.comparePassword = function(password) {
    const isMatch = bcript.compare(password, this.password);
    
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);