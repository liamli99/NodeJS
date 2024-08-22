const mongoose = require('mongoose');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'], 
        unique: true 
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        minlength: 6
    },

    // Additional fields
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'lastName',
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
});

UserSchema.pre('save', async function() {
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password, salt);
});

UserSchema.methods.createJWT = function() {
    const payload = {
        userId: this._id,
        userName: this.name
    };
    
    const secret = process.env.JWT_SECRET;
    
    const token = jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_LIFETIME
    });

    return token;
} 

UserSchema.methods.comparePassword = function(password) {
    const isMatch = bcript.compare(password, this.password);
    
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);