import React, { Component } from "react";
import style from "./Copd.scss";
import TopBanner from "components/TopBanner";
import BotBanner from "components/BotBanner";
import Detial from "components/Detial";
import Collection from "components/Collection";
import CatalogList from "components/CatalogList";
import SearchBox from "components/SearchBox";
import HistoryBox from 'components/HistoryBox'

import PropTypes from "prop-types";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import contentkv from "./img/contentkv.png";

export class Copd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kvover: false
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getScreenshotsBody = this.getScreenshotsBody.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  getChildContext() {
    return {
      getScreenshotsBody:this.getScreenshotsBody,
    };
  }
  getScreenshotsBody(){
    return this.refs.ContentBox;
  }
  refreshProps(props) {
    this.refs.kv.addEventListener("animationstart", () => {
      this.state.kvover = true;
      this.setState(this.state);
    });
  }
  render() {
    return (
      <div className={style.CopdBox}>
        <TopBanner />
        <div className={style.ContentKV} ref={"kv"} key={"copdkv"}>
          <img src={contentkv} alt="" />
        </div>
        <div className={style.ContentBox} ref={'ContentBox'}>
          <Switch>
            <Route path="/copd/list/:catalog" component={CatalogList} />
            <Route path="/copd/detial/:catalog/:section" component={Detial} />
            <Route path="/copd/collection" component={Collection} />
            <Route path="/copd/search" component={SearchBox} />
            <Route path="/copd/history" component={HistoryBox} />
            <Redirect from="/copd" to="/copd/list/0" />
          </Switch>
        </div>
        <BotBanner inverse={this.state.kvover ? true : false} />
      </div>
    );
  }
}
Copd.childContextTypes = {
  getScreenshotsBody:PropTypes.func
};
export default Copd;
