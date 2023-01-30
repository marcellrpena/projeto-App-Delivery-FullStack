const express = require('express');
const ordersController = require('../controllers/orders.controller');

const ordersRouter = express.Router();

ordersRouter.get('/', ordersController.getAllBySeller);

module.exports = ordersRouter;
