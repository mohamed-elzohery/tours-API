const usersRouter = require('express').Router();
const {authGuard, authorize} = require('../../middlewares/authGuard')
const {getAllUsers, getOneUser, createOneUser, deleteUser, updateUser, getUserById, uploadPhoto} = require('../../controllers/user-controller');

usersRouter.use(authGuard);
usersRouter.patch( '/:id/photo', uploadPhoto);
usersRouter.use(authorize('admin'));

usersRouter.route('/')
           .get(getAllUsers)
           .post(createOneUser);

usersRouter.route('/:id')
           .all(getUserById)
           .get(getOneUser)
           .delete(deleteUser)
           .patch(updateUser);

module.exports = usersRouter;