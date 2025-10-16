const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const customerRouter = require('./routes/customer.routes.js');
const orderRouter = require('./routes/orders.routes.js');

require('./db.js')

const app = express();


app.use(cors({ origin: "https://cmardev.netlify.app" }));
app.use(bodyParser.json());

app.use('/api/customers',customerRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 4000



app.listen( PORT, ()=> console.log("Server is running on",PORT))