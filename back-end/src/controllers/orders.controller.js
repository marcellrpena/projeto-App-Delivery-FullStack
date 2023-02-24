const ordersService = require('../services/orders.service');

const getAllBySeller = async (req, res, next) => {
  const { id } = req.body.user;
  try {
    const orders = await ordersService.getAllBySeller(id);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBySeller };
