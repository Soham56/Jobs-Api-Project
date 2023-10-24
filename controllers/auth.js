const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticationError } = require('../errors');

const register = async (req,res)=>{
    const user = await User.create(req.body);
    const token = user.createToken();

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}

const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) throw new BadRequestError('Please provide email and password');

    const user = await User.findOne({email});
    if(!user) throw new UnauthenticationError('Invalid email provided');

    const isValidPassword = await user.checkPassword(password);
    if(!isValidPassword) throw new UnauthenticationError('Invalid password provided');

    const token = user.createToken();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
}

module.exports = {
    register,
    login
}