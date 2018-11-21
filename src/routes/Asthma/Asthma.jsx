import React, { Component } from "react";
import style from "./Asthma.scss";
import TopBanner from "components/TopBanner";
import BotBanner from "components/BotBanner";
import Detial from "components/Detial";
import CatalogList from "components/CatalogList";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import contentkv from "./img/contentkv.png";

export class Asthma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kvover:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.refs.kv.addEventListener("animationstart", ()=>{
      this.state.kvover = true;
      this.setState(this.state);
    });
  }
  render() {
    return (
      <div className={style.AsthmaBox}>
        <TopBanner />
        <div className={style.ContentBox}>
          <div className={style.ContentKV} ref={'kv'}>
            <img src={contentkv} alt="" />
          </div>
          <Switch>
            {/*哮喘*/}
            <Route path="/asthma/list/:catalog" component={CatalogList} />
            <Route path="/asthma/detial/:section" component={Detial} />
            <Redirect from="/asthma" to="/asthma/list/0" />
          </Switch>
        </div>
        <BotBanner inverse={this.state.kvover?true:false}/>
      </div>
    );
  }
}
export default Asthma;
