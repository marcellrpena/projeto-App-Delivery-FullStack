const md5 = require("md5");

const userMock = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  password: md5("123456"),
  role: "customer",
};

const tokenMock = "token";

const userMockWithToken = {
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
  token: {},
};

const userMockInput = {
  email: "zebirita@email.com",
  password: "123456",
};

const userMockInputInvalid = {
  email: "zebirita@email.com",
  password: "xablau123",
};

const mockUsers = [
  {
    id: 1,
    name: "Delivery App Admin",
    email: "adm@deliveryapp.com",
    role: "administrator",
  },
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
];
module.exports = {
  userMock,
  userMockInput,
  tokenMock,
  userMockWithToken,
  userMockInputInvalid,
  mockUsers,
};
