import React, { Component } from "react";
import style from "./TabNav.scss";
import websqlapi from "common/websqlapi";

export class TabNav extends Component {
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
    this.createTabContent = this.createTabContent.bind(this);
    this.handleJumpurl = this.handleJumpurl.bind(this);
    this.getTablist = this.getTablist.bind(this);
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
  createTabContent() {
    return <img src={this.state.url} alt="" />;
  }
  createTabList() {
    if (this.state.TabList.length == 0) return;
    var cont = this;
    var itemNodes = this.state.TabList.map(function(itemBase, index) {
      return (
        <div
          key={"nav" + index}
          className={[
            style.Button,
            cont.state.id == itemBase.id.split("-")[1] ? style.act : ""
          ].join(" ")}
          onClick={cont.handleJumpurl.bind(cont, itemBase.id.split("-")[1])} dangerouslySetInnerHTML={{__html:itemBase.value}}>
        </div>
      );
    });
    return itemNodes;
  }
  handleJumpurl(detialid) {
    this.props.handleroute(detialid);
    // window.location.pathname = '/#' +'/'+ window.location.hash.split("/")[1]+'/'+window.location.hash.split("/")[2]+'/'+detialid;
  }
  render() {
    return (
      <div className={style.TabNavBox}>
        <div className={style.TitleBox} dangerouslySetInnerHTML={{__html:this.state.Title != null ?this.state.Title:''}}>
          
        </div>
        <div className={style.NavButtonBox}>{this.createTabList()}</div>
        <div className={style.NavContent}>{this.createTabContent()}</div>
      </div>
    );
  }
}
export default TabNav;
