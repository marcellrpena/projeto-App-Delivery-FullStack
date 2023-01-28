const { Sale } = require('../database/models');
const { getProductById } = require('./product.service');
const { newSaleProduct } = require('./salesProducts.service');

const totalPrice = async (products) => {
  const totalPerProduct = products.map(async (product) => {
    const { price } = await getProductById(product.id);
    return price * product.quantity;
  });

  const total = await Promise.all(totalPerProduct);
  return total.reduce((acc, curr) => acc + curr, 0);
};

const newSale = async (body) => {
  const { user, sellerId, deliveryAddress, deliveryNumber, products } = body;
  const sale = await Sale.create({
    userId: user.id,
    sellerId,
    deliveryAddress,
    deliveryNumber,
    totalPrice: await totalPrice(products),
    status: 'Pendente',
  });

  await newSaleProduct(sale.id, products);

  return {
    id: sale.dataValues.id,
    ...sale,
  };
};

const getAllSalesByUser = async (userId) => {
  const sale = await Sale.findAll({ userId });
  return sale;
};

// const getSaleById = async (saleId) => {
//   const sale = await SalesProducts.findOne({ saleId }, {attributes: include: []} );
//   return sale;
// };

module.exports = { newSale, getAllSalesByUser };
