const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

const loginController = catchAsync(async (req, res, next) => {
    const { email , password} = req.body;
    if(!(email && password)){
        return next(new ErrorResponse(400, 'missing email or password'));
    }
    
    const user = await User.findOne({email});
    if(user === null || !await user.isPasswordMatched(password)){
        return next(new ErrorResponse(401, 'email or password are not valid'));
    }

    const token = user.createToken();
    res.json({success: true, data: user, token, message: 'User is logged in successfully'});
})

const registerController = catchAsync( async (req, res, next) => {
    const { name , password, email, role} = req.body;
    const user = await User.create({name , password, email, role});
    const token = user.createToken();
    res.json({success: true, data: user, token, message: 'User is created successfully'});
})

module.exports = {loginController ,registerController}