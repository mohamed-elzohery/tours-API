const { Schema, model }  = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userSchema = new Schema({
    name: {
        type: String,
        maxlength: [50, 'name length is max 50 chars'],
        required: [true, 'user name is required'],
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        validate: {
            validator: isEmail,
            message: 'Cannot be a valid email'
        }
    },
    role: {
        required: [true, 'user role is required'],
        type: String,
        enum: ['admin', 'user', 'guide', 'lead-guide'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    password: {
        required: [true, 'user password is required'],
        type: String,
        minlength: [8, 'password cannot be less than 8 characters'],
    },
    photo: {
        type: String,
        default: 'default-photo.jpg'
    },
},{ timestamps: true });


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.createToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRY
    });
}

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = model('User', userSchema);

module.exports = User;