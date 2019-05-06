const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();
const beefCtrl = require ('./beefController');
const searchCtrl = require('./searchController');

const { SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());

app.use( express.static( `${__dirname}/../build` ) )

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));

// BEEF
app.post('/beef/save', beefCtrl.addBeef);
app.get('/beef/prices', beefCtrl.beefPrices);
app.delete('/beef/delete/:ID', beefCtrl.beefDelete);
app.put('/beef/update', beefCtrl.beefUpdate);

// SEARCH
app.get('/search/beefCustomer/:customer', searchCtrl.beefCustomer);
app.get('/search/beefSoldBy/:soldBy', searchCtrl.beefSoldBy);
app.get('/search/beefID/:ID', searchCtrl.beefID);
app.get('/search/beefInvoiceDate/', searchCtrl.beefInvoiceDate);