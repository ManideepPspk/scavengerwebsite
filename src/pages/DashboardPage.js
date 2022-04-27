import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from '../components/Dashboard/Dashboard';

function DashboardPage(props) {
    return (
        <>
        <Router>
            <Switch>
               <Route path={"/"} component={Dashboard} />
            </Switch>
        </Router>
        </>
    )
}
export default DashboardPage;
