import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import BeefForm from './components/BeefForm/BeefForm';
import PorkForm from './components/PorkForm/PorkForm';
import SheepForm from './components/SheepForm/SheepForm';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';
import Search from './components/Search/Search';
import CircleVForm from './components/CircleVForm/CircleVForm';
import Reports from './components/Reports/Reports';
import Settings from './components/Settings/Setting';
import GrindingLog from './components/Reports/GrindingLog';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/beef/:ID?' component={BeefForm} />
        <Route path='/pork/:ID?' component={PorkForm} />
        <Route path='/sheep/:ID?' component={SheepForm} />
        <Route path='/circlev/:ID?' component={CircleVForm} />
        <Route path='/invoice/:ID?' component={InvoiceForm} />
        <Route path='/search' component={Search} />
        <Route exact path='/reports' component={Reports} />
        <Route path='/reports/grinding_log' component={GrindingLog} />
        <Route path='/settings' component={Settings} />
        {/* <Route path='/beef-invoice/:beef-id' component={BeefInvoice}/> */}
    </Switch>
)