import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
// import style from  './App.scss';
import Asthma from './Asthma'
import Copd from './Copd'
import Home from 'routes/Home'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      db:null,
    };
    this.createDataBase = this.createDataBase.bind(this);
    this.getDataBase = this.getDataBase.bind(this);
  }
  componentDidMount(){
    this.createDataBase();
  }
  getChildContext() {
    return {
      DB: this.getDataBase,
    };
  }
  createDataBase(){
    this.state.db = openDatabase('APPDB', '1.0', '-APPDB', 50 * 1024 * 1024);
    this.state.db.transaction(function (tx) {  
      tx.executeSql('CREATE TABLE IF NOT EXISTS Collection (id unique)');
    });
    this.setState(this.state);
  }
  getDataBase(){
    return this.state.db;
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <HashRouter >
          <div style={{height: '100%'}}>
              <Switch>
                  <Route path='/asthma' component={Asthma} />
                  <Route path='/copd' component={Copd} />
                  <Route path='/gso' component={Asthma} />
                  <Route path='/study' component={Asthma} />
                  <Route path='/reference' component={Asthma} />
  

                  {/*默认路由 */}
                  <Redirect from="/" to="/asthma" />
              </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}
App.childContextTypes = {
  DB: PropTypes.func,
  createDataBase:PropTypes.func,
};
export default App;
