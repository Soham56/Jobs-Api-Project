const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (error, req, res, next)=>{
    const customError = {};
    customError.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    customError.message = error.message || `Something went wrong, Try again later !`;


   if(error.code && error.code===11000){
        customError.message = `Duplicate ${Object.keys(error.keyValue)} error`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    else if(error.name==='ValidationError'){
        customError.message = `Invalid ${Object.keys(error.errors)}`;
        customError.statusCode = StatusCodes.UNAUTHORIZED;
    }
    else if(error.name === 'CastError'){
        customError.message = `No resource found, for id ${error.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    // return res.status(customError.statusCode).json({error});
    return res.status(customError.statusCode).json({msg: customError.message});
}

module.exports = errorHandlerMiddleware;