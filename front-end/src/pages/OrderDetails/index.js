import moment from 'moment/moment';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import api from '../../service/request';

export default function OrderDetails() {
  const { id: idVenda } = useParams();
  const [orders, setOrders] = useState({ products: [] });
  const [select, setSelect] = useState('Pendente');

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
    <section>
      <NavBar />
      <h2>Detalhe do Pedido</h2>
      <div>
        <div>
          <h3
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {orders.id}
          </h3>
          <h3
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vend: ${seller && seller.name}`}
          </h3>
          <h3
            data-testid={ 'customer_order_details__'
              + 'element-order-details-label-order-date' }
          >
            {moment(orders.saleDate).format('DD/MM/YYYY')}

          </h3>
          <h3
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status${
                orders.status}`
            }
          >
            {select}

          </h3>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ select === 'Entregue' }
            onClick={ () => setSelect('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
      <table className="score-board-table">
        <thead>
          <tr>
            <th>item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.products.map((product, index = 1) => (
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
                  {product.price}

                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(
                    parseFloat(product.price) * product.SalesProducts.quantity)
                    .toFixed(2)}
                </td>
              </tr>))
          }
        </tbody>
      </table>
      <div>

        <p>
          Total: R$

        </p>
        <p data-testid="customer_order_details__element-order-total-price">
          {totalPrice && totalPrice.replace('.', ',')}
        </p>
      </div>
    </section>
  );
}
