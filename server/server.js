const express = require('express');
const massive = require('massive');
// const moment = require('moment')
require('dotenv').config();
const beefCtrl = require ('./beefController');
const porkCtrl = require('./porkController');
const sheepCtrl = require('./sheepController');
const circleVCtrl = require('./circleVController');
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

// PORK
app.get('/pork/prices', porkCtrl.porkPrices);
app.post('/pork/save', porkCtrl.addPork);
app.delete('/pork/delete/:ID', porkCtrl.porkDelete);
app.put('/pork/update', porkCtrl.updatePork)

// SHEEP
app.get('/sheep/prices', sheepCtrl.sheepPrices);
app.post('/sheep/save', sheepCtrl.addSheep)
app.delete('/sheep/delete/:ID', sheepCtrl.sheepDelete);
app.put('/sheep/update', sheepCtrl.updateSheep);

// CIRCLEV
app.post('/circlev/save', circleVCtrl.addCircleV);
app.delete('/circlev/delete/:ID', circleVCtrl.circleVDelete);
app.put(`/circlev/update`, circleVCtrl.updateCircleV)

// SEARCH
app.get('/search/beefCustomer/:customer', searchCtrl.beefCustomer);
app.get('/search/beefSoldBy/:soldBy', searchCtrl.beefSoldBy);
app.get('/search/beefID/:ID', searchCtrl.beefID);
app.get('/search/beefInvoiceDate/', searchCtrl.beefInvoiceDate);
app.get(`/search/porkCustomer/:customer`, searchCtrl.porkCustomer);
app.get(`/search/porkSoldBy/:soldBy`, searchCtrl.porkSoldBy);
app.get('/search/porkID/:ID', searchCtrl.porkID);
app.get('/search/porkInvoiceDate/', searchCtrl.porkInvoiceDate);
app.get('/search/sheepCustomer/:customer', searchCtrl.sheepCustomer);
app.get('/search/sheepSoldBy/:soldBy', searchCtrl.sheepSoldBy);
app.get('/search/sheepID/:ID', searchCtrl.sheepID);
app.get('/search/sheepInvoiceDate/', searchCtrl.sheepInvoiceDate);
app.get('/search/circlevCustomer/:customer', searchCtrl.circleVCustomer)
app.get('/search/circlevSoldBy/:soldBy', searchCtrl.circleVSoldBy);
app.get('/search/circlevID/:ID', searchCtrl.circleVID);
app.get('/search/circleVInvoiceDate/', searchCtrl.circleVInvoiceDate);