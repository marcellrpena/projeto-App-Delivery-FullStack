import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../service/request';

export default function OrderDetails() {
  const { id: idVenda } = useParams();
  const [orders, setOrders] = useState({ products: [] });
  const [select, setSelect] = useState();

  const { seller, totalPrice } = orders;

  async function getOrders() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.get.getSaleById(idVenda, token);
    setSelect(data.status);
    setOrders({ ...data });
  }

  const updateStatus = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    if (select) {
      await api.put.updateStatus(token, select, idVenda);
    }
  };

  useEffect(() => updateStatus(), [select]);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <NavBar />
      <h2 className="text-center py-4">Order Details</h2>

      <div className="card border-warning mb-3">

        <div className="card-header">
          <h4 data-testid="customer_order_details__element-order-details-label-order-id">
            Order Number:
            {' '}
            {orders.id}
          </h4>
        </div>

        <div className="card-body">

          <h5
            className="card-title"
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`Seller: ${seller && seller.name}`}
          </h5>

          <h5
            data-testid={
              'customer_order_details__'
              + 'element-order-details-label-order-date'
            }
          >
            Date:
            {' '}
            {moment(orders.saleDate).format('DD/MM/YYYY')}
          </h5>

          <h5
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status
              ${orders.status}`
            }
          >
            Status:
            {' '}
            {select && (select || 'Pendente')}
          </h5>
        </div>
      </div>

      <table className="table">
        <thead className="text-center">
          <tr>
            <th>item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders.products.map((product, index = 1) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.SalesProducts.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                R$
                {' '}
                {product.price}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                R$
                {' '}
                {(
                  parseFloat(product.price) * product.SalesProducts.quantity
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="input-group mb-3 justify-content-center pt-4 gap-3">
        <div
          className="btn text-dark bg-warning"
          data-testid="customer_products__button-cart"
        >
          <p
            className="mb-0"
            data-testid="customer_order_details__element-order-total-price"
          >
            Total Price: R$
            {' '}
            {totalPrice && totalPrice.replace('.', ',')}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-success"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ select !== 'Em Trânsito' }
          onClick={ () => setSelect('Entregue') }
        >
          MARK AS DELIVERED
        </button>
      </div>
    </>
  );
}
