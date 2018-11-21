import React, { Component } from "react";
import style from "./TabNav.scss";

export class TabNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContentData: [],
      id:null,
      CustomIndex:0,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createTabList = this.createTabList.bind(this);
    this.createTabContent = this.createTabContent.bind(this);
    this.handleJumpurl = this.handleJumpurl.bind(this);
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
    this.state.Title =
      props.title != undefined ? props.title : this.state.Title;
    this.state.id = props.contentid!=undefined?props.contentid:null;
    this.setState(this.state);
  }
  createTabContent() {
    if (this.state.ContentData.length == 0) return;
    var cont = this;
    var itemNodes = this.state.ContentData.map(function(itemBase, index) {
        if (cont.state.id==itemBase.id) {
            return <img src={itemBase.value} alt="" key={"detial" + index} />;
        }
    });
    return itemNodes;
  }
  createTabList() {
    if (this.state.ContentData.length == 0) return;
    var cont = this;
    var itemNodes = this.state.ContentData.map(function(itemBase, index) {
      return <div className={[style.Button,cont.state.id==itemBase.id?style.act:''].join(' ')} onClick={cont.handleJumpurl.bind(cont,itemBase.id)}>{itemBase.title}</div>;
    });
    return itemNodes;
  }
  handleJumpurl(detialid){
    this.props.handleroute(detialid);
    // window.location.pathname = '/#' +'/'+ window.location.hash.split("/")[1]+'/'+window.location.hash.split("/")[2]+'/'+detialid;
  }
  render() {
    return (
      <div className={style.TabNavBox}>
        <div className={style.TitleBox}>{this.state.Title}</div>
        <div className={style.NavButtonBox}>{this.createTabList()}</div>
        <div className={style.NavContent}>
            {this.createTabContent()}
        </div>
      </div>
    );
  }
}
export default TabNav;
