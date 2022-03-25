const usersRouter = require('express').Router();
const {getAllUsers, getOneUser, createOneUser, deleteUser, updateUser, getUserById} = require('../../controllers/user-controller');

usersRouter.route('/')
           .get(getAllUsers)
           .post(createOneUser);

usersRouter.route('/:id')
           .all(getUserById)
           .get(getOneUser)
           .delete(deleteUser)
           .patch(updateUser);

module.exports = usersRouter;