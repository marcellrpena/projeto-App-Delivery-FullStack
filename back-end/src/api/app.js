const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/errorMiddleware');
const routers = require('../routes/index.router');

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(routers);
app.use(errorMiddleware);

module.exports = app;
