const User = require('../models/User');
const catchAsync = require('../middlewares/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

const getUserById = catchAsync(async(req, res, next) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if(user === null){
        next(new ErrorResponse(404, `Cannot find user of id ${id}`));
    }
    req.user = user;
    next();
})

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.json({data: users, success: true});
});

const getOneUser = catchAsync(async (req, res, next) => {
    res.json({data: req.user, success: true});
})

const createOneUser = catchAsync(async (req, res) => {
    const newUser = req.body;
    const user = await User.create(newUser);
    res.status(201).json({message: 'user is added', data: user, success: true});
})

const updateUser = catchAsync(async (req, res, next) => {
    const userChanges = req.body;
    const updatedUser = await User.updateOne(req.user, userChanges, {new: true});
    res.json({code: 200, message: 'updated successfully', data: updatedUser, success: true});
});

const deleteUser = catchAsync(async (req, res) => {
        const user = await User.deleteOne(req.user);
        res.json({data: user, message: 'deleted successfully', success: true});
});

module.exports = {
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser,
    createOneUser,
    getUserById
}