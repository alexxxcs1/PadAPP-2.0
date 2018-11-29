import React, { Component } from "react";
import style from "./Reference.scss";
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

export class Reference extends Component {
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
      <div className={style.ReferenceBox}>
        <TopBanner />
        <div className={style.ContentKV} ref={"kv"}>
          <img src={contentkv} alt="" />
        </div>
        <div className={style.ContentBox} ref={'ContentBox'}>
          <Switch>
            {/*哮喘*/}
            <Route path="/reference/list/:catalog" component={CatalogList} />
            <Route path="/reference/detial/:catalog/:section" component={Detial} />
            <Route path="/reference/collection" component={Collection} />
            <Route path="/reference/search" component={SearchBox} />
            <Route path="/reference/history" component={HistoryBox} />
            <Redirect from="/reference" to="/reference/list/0" />
          </Switch>
        </div>
        <BotBanner inverse={this.state.kvover ? true : false} />
      </div>
    );
  }
}
Reference.childContextTypes = {
  getScreenshotsBody:PropTypes.func
};
export default Reference;
