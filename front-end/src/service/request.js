import axios from 'axios';

require('dotenv').config();

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
const api = {
  delete: {
    async deleteUser(id, authorization) {
      const response = await axios
        .delete(
          `${PROTOCOL}://${HOST}/users/admin/${id}`,
          { headers: { authorization } },
        );
      return response;
    },
  },
  post: {
    async newAdminRegister(userData, token) {
      const response = await axios.post(
        `${PROTOCOL}://${HOST}/register/admin`,
        userData,
        { headers: { authorization: token } },
      );
      return response;
    },
    async login(userData) {
      const response = await axios.post(
        `${PROTOCOL}://${HOST}/login`,
        userData,
      );
      return response;
    },
    async register(userData) {
      const response = await axios.post(
        `${PROTOCOL}://${HOST}/register`,
        userData,
      );
      return response;
    },

    async createSale(token, saleData) {
      const response = await axios.post(
        `${PROTOCOL}://${HOST}/sales`,
        saleData,
        { headers: { authorization: token } },
      );
      return response;
    },
  },
  get: {
    async getAllProducts() {
      const response = await axios.get(`${PROTOCOL}://${HOST}/products`);
      return response;
    },
    async getById(id) {
      const response = await axios.get(`${PROTOCOL}://${HOST}/products/${id}`);
      return response;
    },
    async getSales(token) {
      const response = await axios.get(`${PROTOCOL}://${HOST}/sales/`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getSaleById(id, token) {
      const response = await axios.get(`${PROTOCOL}://${HOST}/sales/${id}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response;
    },
    async getAllUsers() {
      const response = await axios.get(`${PROTOCOL}://${HOST}/users`);
      return response;
    },
    async getAllSaleOrders(token) {
      const response = await axios
        .get(`${PROTOCOL}://${HOST}/seller/orders`, {
          headers: {
            authorization: `${token}`,
          },
        });
      return response;
    },
  },
  put: {
    async updateStatus(token, status, id) {
      const response = await axios.put(
        `${PROTOCOL}://${HOST}/sales/${id}`,
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
