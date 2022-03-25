const Tour = require('../models/Tour');
const catchAsync = require('../middlewares/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

const getTourById = catchAsync(async(req, res, next) => {
    const {id} = req.params;
    const tour = await Tour.findById(id);
    if(tour === null){
        console.log("no id found")
        next(new ErrorResponse(404, 'user not found'));
    }
    req.tour = tour;
    next();
})

const getAllTours = catchAsync(async (req, res) => {
    res.json(res.adjustRes);
});

const getOneTour = catchAsync(async (req, res, next) => {
    res.json({data: req.tour, success: true});
})

const createOneTour = catchAsync(async (req, res) => {
    const newTour = req.body;
    await Tour.create(newTour);
    res.status(201).json({message: 'tour is added', data: newTour, success: true});
})

const updateTour = catchAsync(async (req, res, next) => {
    const tourChanges = req.body;
    const updatedTour = await Tour.updateOne(req.tour, tourChanges, {new: true});
    res.json({message: 'updated successfully', data: updatedTour, success: true});
})

const deleteTour = catchAsync(async (req, res) => {
    const tour = await Tour.deleteOne(req.tour);
    res.json({data: tour, message: 'deleted successfully', success: true});
});

module.exports = {
    getOneTour,
    getAllTours,
    updateTour,
    deleteTour,
    createOneTour,
    getTourById
}