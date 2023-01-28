const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/', userController.newUser);
userRouter.get('/', userController.getUsers);

module.exports = userRouter;
