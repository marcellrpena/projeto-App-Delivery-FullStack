const express = require('express');
const loginRouter = require('./login.router');
const productRouter = require('./product.router');
const { saleRouter } = require('./sale.router');
const userRouter = require('./user.router');
const ordersRouter = require('./orders.router');
const { tokenValidation } = require('../middlewares/tokenValidation');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/register',userRouter);
routers.use('/users', userRouter);
routers.use('/products', productRouter);
routers.use('/sales', saleRouter);

routers.use('/seller/orders', tokenValidation, ordersRouter);

module.exports = routers;
