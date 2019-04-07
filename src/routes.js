import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BeefForm from  './components/BeefForm/BeefForm';
import Home from './components/Home/Home'


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/beef' component={BeefForm} />
    </Switch>
)