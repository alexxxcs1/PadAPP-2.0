import React, { Component } from "react";
import style from "./Copd.scss";
import TopBanner from "components/TopBanner";
import BotBanner from "components/BotBanner";
import Detial from "components/Detial";
import Collection from "components/Collection";
import CatalogList from "components/CatalogList";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import contentkv from "./img/contentkv.png";

export class Copd extends Component {
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
      <div className={style.CopdBox}>
        <TopBanner />
        <div className={style.ContentBox}>
          <div className={style.ContentKV} ref={'kv'} key={'copdkv'}>
            <img src={contentkv} alt="" />
          </div>
          <Switch>
            <Route path="/copd/list/:catalog" component={CatalogList} />
            <Route path="/copd/detial/:catalog/:section" component={Detial} />
            <Route path="/copd/collection" component={Collection} />
            <Redirect from="/copd" to="/copd/list/0" />
          </Switch>
        </div>
        <BotBanner inverse={this.state.kvover?true:false}/>
      </div>
    );
  }
}
Copd.contextTypes = {
  DB: PropTypes.func,
};
export default Copd;
