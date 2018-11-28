import React, { Component } from "react";
import style from "./Asthma.scss";
import TopBanner from "components/TopBanner";
import BotBanner from "components/BotBanner";
import Detial from "components/Detial";
import CatalogList from "components/CatalogList";
import Collection from "components/Collection";
import SearchBox from "components/SearchBox";
import HistoryBox from "components/HistoryBox";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import contentkv from "./img/contentkv.png";

export class Asthma extends Component {
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
  refreshProps(props) {
    this.refs.kv.addEventListener("animationstart", () => {
      this.state.kvover = true;
      this.setState(this.state);
    });
  }
  getChildContext() {
    return {
      getScreenshotsBody:this.getScreenshotsBody,
    };
  }
  getScreenshotsBody(){
    return this.refs.ContentBox;
  }
  render() {
    return (
      <div className={style.AsthmaBox}>
        <TopBanner />
        <div className={style.ContentKV} ref={"kv"}>
          <img src={contentkv} alt="" />
        </div>
        <div className={style.ContentBox} ref={'ContentBox'}>
          <Switch>
            {/*哮喘*/}
            <Route path="/asthma/list/:catalog" component={CatalogList} />
            <Route path="/asthma/detial/:catalog/:section" component={Detial} />
            <Route path="/asthma/collection" component={Collection} />
            <Route path="/asthma/search" component={SearchBox} />
            <Route path="/asthma/history" component={HistoryBox} />
            <Redirect from="/asthma" to="/asthma/list/0" />
          </Switch>
        </div>
        <BotBanner inverse={this.state.kvover ? true : false} />
      </div>
    );
  }
}
Asthma.childContextTypes = {
  getScreenshotsBody:PropTypes.func
};
export default Asthma;
