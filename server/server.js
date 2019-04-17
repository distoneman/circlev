const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();
const beefCtrl = require ('./beefController')

const { SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));


app.post('/beef/save', beefCtrl.addBeef);
app.get('/beef/prices', beefCtrl.beefPrices);
