const express = require('express');
const ordersController = require('../controllers/orders.controller');
const { tokenValidation } = require('../middlewares/tokenValidation');

const ordersRouter = express.Router();

ordersRouter.get('/', tokenValidation, ordersController.getAllBySeller);

module.exports = ordersRouter;
