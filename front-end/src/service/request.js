import axios from 'axios';

// require('dotenv').config();

console.log(process.env.API);
const api = {
  delete: {
    async deleteUser(id, authorization) {
      const response = await axios
        .delete(`${process.env.API}/users/admin/${id}`, { headers: { authorization } });
      return response;
    },
  },
  post: {
    async newAdminRegister(userData, token) {
      const response = await axios.post(
        `${process.env.API}/register/admin`,
        userData,
        { headers: { authorization: token } },
      );
      return response;
    },
    async login(userData) {
      const response = await axios.post(
        `${process.env.API}/login`,
        userData,
      );
      console.log(process.env.API);
      return response;
    },
    async register(userData) {
      const response = await axios.post(
        `${process.env.API}/register`,
        userData,
      );
      return response;
    },

    async createSale(token, saleData) {
      const response = await axios.post(
        `${process.env.API}/sales`,
        saleData,
        { headers: { authorization: token } },
      );
      return response;
    },
  },
  get: {
    async getAllProducts() {
      const response = await axios.get(`${process.env.API}/products`);
      return response;
    },
    async getById(id) {
      const response = await axios.get(`${process.env.API}/products/${id}`);
      return response;
    },
    async getSales(token) {
      const response = await axios.get(`${process.env.API}/sales/`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getSaleById(id, token) {
      const response = await axios.get(`${process.env.API}/sales/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getAllUsers() {
      const response = await axios.get(`${process.env.API}/users`);
      return response;
    },
    async getAllSaleOrders() {
      const response = await axios.get(`${process.env.API}/seller/orders`);
      return response;
    },
  },
  put: {
    async updateStatus(token, status, id) {
      const response = await axios.put(
        `${process.env.API}/sales/${id}`,
        { status },
        {
          headers: {
            authorization: token,
          },
        },
      );
      return response;
    },
  },
};

export default api;
