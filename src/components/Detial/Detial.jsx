import React, { Component } from "react";
import style from "./Detial.scss";
import { api } from "common/app";
import TabNav from "components/TabNav";
import returnback from "./img/returnback.png";
import websqlapi from 'common/websqlapi'

export class Detial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:null,

      ContentID: null,
      Title: null,
      Type: null,
      TabGroup:null,
      url:'',
      Content: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.switchType = this.switchType.bind(this);
    this.createImgContent = this.createImgContent.bind(this);
    this.HandleDetialRoute = this.HandleDetialRoute.bind(this);
    this.HandleUrlRoute = this.HandleUrlRoute.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.page = props.match.url.split('/')[1];
    this.state.catalog = props.match.params.catalog;
    this.state.ContentID = props.match.params.section;
    this.setState(this.state);
    this.getDetial();
  }
  getDetial() {
    if (this.state.ContentID == null) return;
    websqlapi.getDetialInfo(this.state.page,(parseInt(this.state.catalog)+1),this.state.ContentID,(res)=>{
      if (res.length>0) {
          this.state.Type = res[0].type;
          this.state.TabGroup = res[0].tabgroup;
          this.state.Content = res;
          this.state.url = res[0].url
          this.setState(this.state);
      }
    });
  }
  createImgContent() {
    // if (this.state.Content.length == 0) return;
    // var cont = this;
    // var itemNodes = this.state.Content.map(function(itemBase, index) {
    //   return ;
    // });
    return <img src={this.state.url} alt=""/>;
  }
  switchType() {
    switch (this.state.Type) {
      case "img":
        return this.createImgContent();
      case "tab":
        return (
          <TabNav
            data={this.state.Content}
            // title={this.state.Title}
            url={this.state.url}
            tabgroup={this.state.TabGroup}
            handleroute={this.HandleDetialRoute}
            contentid={this.state.ContentID}
          />
        );
      default:
        break;
    }
  }
  HandleDetialRoute(index) {
    this.props.history.push(
      "/" +
        this.props.location.pathname.split("/")[1] +
        "/" +
        this.props.location.pathname.split("/")[2] +
        "/" +
        this.props.location.pathname.split("/")[3] +
        "/" +
        index
    );
  }
  HandleUrlRoute(){
    this.props.history.push(
      "/" +
        this.props.location.pathname.split("/")[1] +
        "/list/" +
        this.props.location.pathname.split("/")[3]
    );
  }
  render() {
    return (
      <div className={style.DetialBox}>
        <div className={style.ContentBox}>
          {this.switchType()}
          <div className={style.ReturnButton} onClick={this.HandleUrlRoute}>
            <img src={returnback} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Detial;
