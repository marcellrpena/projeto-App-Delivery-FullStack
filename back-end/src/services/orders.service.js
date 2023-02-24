const { Sale } = require('../database/models');

const getAllBySeller = async (sellerId) => {
  const orders = await Sale.findAll({ where: { sellerId } });
  return orders;
};

module.exports = { getAllBySeller };
