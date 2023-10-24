const { BadRequestError, UnauthenticationError } = require('../errors');
const jwt = require('jsonwebtoken');

const authenticateMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticationError('Invalid Token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        throw new UnauthenticationError('Invalid Authentication');
    }

}

module.exports = authenticateMiddleware;