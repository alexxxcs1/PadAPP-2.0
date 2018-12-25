import React, { Component } from "react";
import style from "./AnswerTab.scss";
import websqlapi from "common/websqlapi";
import {
  AsthmaAnswerACT,
  AsthmaAnswerACQ,
  AsthmaAnswerAQLQ,
  AsthmaAnswerATAQ,
  GsoAnswerCheckList,
  CopdAnswerCAT
} from "./AnswerComponents/";

export class AnswerTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: null,
      TabList: [],
      ContentData: [],
      id: null,
      tabid: null,
      CustomIndex: 0
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createTabList = this.createTabList.bind(this);
    this.handleJumpurl = this.handleJumpurl.bind(this);
    this.switchAnswerTab = this.switchAnswerTab.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.ContentData =
      props.data != undefined ? props.data : this.state.ContentData;
    // this.state.Title =
    //   props.title != undefined ? props.title : this.state.Title;
    this.state.id = props.contentid != undefined ? props.contentid : null;
    this.state.tabid = props.tabgroup != undefined ? props.tabgroup : null;
    this.state.url = props.url != undefined ? props.url : null;
    this.getTablist();
    console.log(this.state);

    this.setState(this.state);
  }
  getTablist() {
    websqlapi.getTabList(this.state.tabid, res => {
      if (res.length > 0) {
        this.state.Title = res[0].title;
        this.state.TabList = res[0].tablist;
        this.setState(this.state);
      }
    });
  }
  createTabList() {
    if (this.state.TabList.length == 0||this.state.TabList.length == 1) return;
    var cont = this;
    var itemNodes = this.state.TabList.map(function(itemBase, index) {
      return (
        <div
          key={"nav" + index}
          className={[
            style.Button,
            cont.state.id == itemBase.id.split("-")[1] ? style.act : ""
          ].join(" ")}
          onClick={cont.handleJumpurl.bind(cont, itemBase.id.split("-")[1])}>
          {itemBase.value}
        </div>
      );
    });
    return itemNodes;
  }
  handleJumpurl(detialid) {
    this.props.handleroute(detialid);
    // window.location.pathname = '/#' +'/'+ window.location.hash.split("/")[1]+'/'+window.location.hash.split("/")[2]+'/'+detialid;
  }
  switchAnswerTab() {
    if (this.state.ContentData.length == 0) return;
    switch (this.state.ContentData[0].id) {
      case "asthma6-1":
        return <AsthmaAnswerACT />;
      case "asthma6-2":
        return <AsthmaAnswerACQ />;
      case "asthma6-3":
        return <AsthmaAnswerAQLQ />;
      case "asthma6-4":
        return <AsthmaAnswerATAQ />;
      case "gso2-3":
        return <GsoAnswerCheckList />;
      case "copd6-1":
        return <CopdAnswerCAT />;
      default:
        break;
    }
  }
  render() {
    return (
      <div className={style.TabNavBox}>
        <div className={style.TitleBox}>{this.state.Title}</div>
        {(this.state.TabList.length <= 1)?'':<div className={style.NavButtonBox}>{this.createTabList()}</div>}
        <div className={style.NavContent}>
          {this.switchAnswerTab()}
        </div>
      </div>
    );
  }
}
export default AnswerTab;
