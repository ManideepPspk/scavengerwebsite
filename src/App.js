
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import DashboardPage from "./components/Dashboard/Dashboard";
import Loginpage from "./components/Loginpage/LoginLayout";
import Notification from "./Notification/Notification";
import Header from "./components/Global/Header/Header";
import NotificationRecord from "./Notification/NotificationRecord";
function App(props) {

const [item ,setitem] = useState("")
console.log(props ,item, "esets")

return (
<>
<Router>
{(item || sessionStorage.getItem('authToken'))?(
  <div className="container-fluid">
    <div className="row">
      <div className="col p-0">
        <Header  setitem = {setitem}/>
        <div className="mainLayout">
          <Switch>
            <Route path={'/dashboard'} render={props => <DashboardPage {...props} />} />
            <Route path={'/notifications'} component={Notification} />
            <Route path={"/notificationrecord"} component={NotificationRecord} />
          </Switch>
        </div>
      </div>
    </div>

  </div>):(

  <Loginpage setitem = {setitem}/>
)}
</Router>
</>);
}

export default App;
