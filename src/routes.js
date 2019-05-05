import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import BeefForm from  './components/BeefForm/BeefForm';
import PorkForm from './components/PorkForm/PorkForm';
import SheepForm from './components/SheepForm/SheepForm';
import OtherForm from './components/OtherForm/OtherForm';
import Search from './components/Search/Search';
import BeefInvoice from './components/BeefForm/BeefInvoice';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/beef/:ID?' component={BeefForm}/>
        <Route path='/pork' component={PorkForm}/>
        <Route path='/sheep' component={SheepForm}/>
        <Route path='/other' component={OtherForm}/>
        <Route path='/search' component={Search}/>
        <Route path='/beef-invoice/:beef-id' component={BeefInvoice}/>
    </Switch>
)