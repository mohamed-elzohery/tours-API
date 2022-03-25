const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let {message, statusCode} = err;

    const error = new ErrorResponse( statusCode || 500, message || 'Server Error');
    //handle non-mongoose-ObjectID-like values.
    if(err.name && err.name === 'CastError'){
        error.message = 'Cannot find',
        error.statusCode = 404;
    }

    //Schema validation errors
    //handle normal validation errors.
    if(err.name && err.name === 'ValidationError'){
        error.message = Object.keys(err.errors).map(error => err.errors[error].properties.message),
        error.statusCode = 400
    }

    //handle duplicate key error.
    if(err.code && err.code === 11000){
        error.message = `${Object.keys(err.keyValue).join('')} is duplicate`,
        error.statusCode = 400;
    }

    //handle unique key validation
    res.json({error, success: false});
}

module.exports = errorHandler;