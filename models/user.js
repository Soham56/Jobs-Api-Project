const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email address"
        ],
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: [true,'Please provide your password'],
        minLength: 8
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createToken = function (){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

userSchema.methods.checkPassword = async function(givenPassword){
    const isMatched = await bcrypt.compare(givenPassword, this.password);
    return isMatched;
}

module.exports = mongoose.model('User', userSchema);