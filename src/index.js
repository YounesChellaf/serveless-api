const express = require('express');
const cors = require('cors');
const route = require('./routes/getPossibilities');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/get_shipping_possibilities',route.getPossibilities);

module.exports = app;

