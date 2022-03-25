const tourRouter = require('express').Router();
const adjustRes = require('../../middlewares/adjustRes');
const Tour = require('../../models/Tour');
const {authGuard, authorize} = require('../../middlewares/authGuard')

const {getOneTour,
    getAllTours,
    updateTour,
    deleteTour,
    createOneTour,
    getTourById} = require('../../controllers/tour-controller');

tourRouter.route('/')
           .get(adjustRes(Tour), getAllTours)
           .post(authGuard, authorize('admin'), createOneTour);

tourRouter.route('/:id')
           .all(getTourById)
           .get(getOneTour)
           .delete(authGuard, authorize('admin'), deleteTour)
           .patch(authGuard, authorize('admin'), updateTour);

module.exports = tourRouter;