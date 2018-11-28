import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
// import style from  './App.scss';
import Asthma from "./Asthma";
import Copd from "./Copd";
import Gso from "./Gso";
import Home from "routes/Home";
import websqlapi from 'common/websqlapi'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: null
    };
    this.createDataBase = this.createDataBase.bind(this);
    websqlapi.createWebSql();
  }
  componentDidMount() {
    this.createDataBase();
  }
  getChildContext() {
    return {};
  }
  createDataBase() {
    
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        <HashRouter>
          <div style={{ height: "100%" }}>
            <Switch>
              <Route path="/asthma" component={Asthma} />
              <Route path="/copd" component={Copd} />
              <Route path="/gso" component={Gso} />
              <Route path="/study" component={Asthma} />
              <Route path="/reference" component={Asthma} />

              {/*默认路由 */}
              <Redirect from="/" to="/asthma" />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}
App.childContextTypes = {};
export default App;
