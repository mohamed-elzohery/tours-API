const tourRouter = require('express').Router();
const adjustRes = require('../../middlewares/adjustRes');
const Tour = require('../../models/Tour');

const {getOneTour,
    getAllTours,
    updateTour,
    deleteTour,
    createOneTour,
    getTourById} = require('../../controllers/tour-controller');

tourRouter.route('/')
           .get(adjustRes(Tour), getAllTours)
           .post(createOneTour);

tourRouter.route('/:id')
           .all(getTourById)
           .get(getOneTour)
           .delete(deleteTour)
           .patch(updateTour);

module.exports = tourRouter;