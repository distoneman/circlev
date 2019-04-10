const express = require('express');
const massive = require('massive');
require('dotenv').config();
const testCtrl = require ('./controller')
const beefCtrl = require ('./beefController')

const { SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err => console.log(err));


app.get('/api/test', testCtrl.getAllTest);
app.post('/beef/save', beefCtrl.addOne);
app.get('/beef/prices', beefCtrl.beefPrices)
