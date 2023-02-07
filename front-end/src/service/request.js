import axios from 'axios';

// require('dotenv').config();
console.log(process.env.REACT_APP_API_PORT);
const api = {
  delete: {
    async deleteUser(id, authorization) {
      const response = await axios
        .delete(
          `${process.env.REACT_APP_API_PORT}users/admin/${id}`,
          { headers: { authorization } },
        );
      return response;
    },
  },
  post: {
    async newAdminRegister(userData, token) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PORT}register/admin`,
        userData,
        { headers: { authorization: token } },
      );
      return response;
    },
    async login(userData) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PORT}login`,
        userData,
      );
      return response;
    },
    async register(userData) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PORT}register`,
        userData,
      );
      return response;
    },

    async createSale(token, saleData) {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PORT}sales`,
        saleData,
        { headers: { authorization: token } },
      );
      return response;
    },
  },
  get: {
    async getAllProducts() {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}products`);
      return response;
    },
    async getById(id) {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}products/${id}`);
      return response;
    },
    async getSales(token) {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}sales/`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getSaleById(id, token) {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}sales/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getAllUsers() {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}users`);
      return response;
    },
    async getAllSaleOrders() {
      const response = await axios.get(`${process.env.REACT_APP_API_PORT}seller/orders`);
      return response;
    },
  },
  put: {
    async updateStatus(token, status, id) {
      const response = await axios.put(
        `${process.env.REACT_APP_API_PORT}sales/${id}`,
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
