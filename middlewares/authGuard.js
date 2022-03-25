const jwt = require('jsonwebtoken');
const catchAsync = require('../middlewares/catchAsync');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse')

const authGuard = catchAsync(async (req, res, next) => {
    let token;

    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) next(new ErrorResponse(401, 'Unauthenticated access'));

    const decodedToken = jwt.decode(token, process.env.JWT_KEY);

    const user = await User.findById(decodedToken.id);

    if(user === null){
        next(new ErrorResponse(401, 'Unauthenticated access'));
    }
    req.user = user;
    next();
})

const authorize = (...roles) => (req, res, next) => {
    if(roles.includes(req.user.role)) next();
    next(new ErrorResponse(401, 'Unauthenticated access'));
}

module.exports = {
    authGuard,
    authorize
}