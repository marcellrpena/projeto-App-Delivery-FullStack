import React, { useEffect, useState } from 'react';
import SaleOrdersCard from '../../components/SaleOrdersCard';
import api from '../../service/request';
import NavSeller from '../../components/NavBar/NavSeller';

export default function SaleOrders() {
  const [listSaleOrders, setListSaleOrders] = useState([]);

  const requestApi = async () => {
    const getStorage = JSON.parse(localStorage.getItem('user'));
    const { data } = await api.get.getAllSaleOrders(getStorage.token);
    return setListSaleOrders(data);
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <>
      <NavSeller />
      <div className="d-flex flex-wrap card-group-w-60 justify-content-center gap-3 w-80">
        {
          listSaleOrders.map((order, index) => (<SaleOrdersCard
            key={ index }
            order={ order }
          />))
        }
      </div>

    </>
  );
}
