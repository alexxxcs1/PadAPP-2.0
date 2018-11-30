import React, { Component } from "react";
import style from "./Detial.scss";
import { api } from "common/app";
import AnswerTab from "components/AnswerTab";
import TabNav from "components/TabNav";
import returnback from "./img/returnback.png";
import websqlapi from "common/websqlapi";

let interval;
export class Detial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      catalog: null,
      ContentID: null,
      Title: null,
      Type: null,
      TabGroup: null,
      url: "",
      Content: []
    };
    this.addScrollListener = this.addScrollListener.bind(this);
    this.refreshProps = this.refreshProps.bind(this);
    this.switchType = this.switchType.bind(this);
    this.createImgContent = this.createImgContent.bind(this);
    this.HandleDetialRoute = this.HandleDetialRoute.bind(this);
    this.HandleUrlRoute = this.HandleUrlRoute.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.addScrollListener();
    websqlapi.setHistory({
      href: window.location.hash,
      time: new Date().getTime()
    });
    
  }
  refreshProps(props) {
    this.state.Content = [];
    this.state.page = props.match.url.split("/")[1];
    this.state.catalog = props.match.params.catalog;
    this.state.ContentID = props.match.params.section;
    this.setState(this.state);
    this.getDetial();
    clearTimeout(interval);
    interval = setTimeout(() => {
      console.log(this.refs.contentbox.clientHeight,this.refs.contentbox.scrollHeight);
      if (this.refs.contentbox.scrollHeight - this.refs.contentbox.clientHeight<50) {
        websqlapi.setReadRate(
          this.state.page + "-" + this.state.catalog + "-" + this.state.ContentID,
          1,
          () => {}
        );
      }
    }, 3000);
  }
  addScrollListener() {
    this.refs.contentbox.addEventListener("scroll", this.onScroll);
  }
  onScroll() {
    if (
      (this.refs.contentbox.scrollTop + this.refs.contentbox.clientHeight) /
      this.refs.contentbox.scrollHeight
    ) {
      let rate =
        (this.refs.contentbox.scrollTop + this.refs.contentbox.clientHeight) /
        this.refs.contentbox.scrollHeight;
      websqlapi.setReadRate(
        this.state.page + "-" + this.state.catalog + "-" + this.state.ContentID,
        rate,
        () => {}
      );
    } else {
    }
  }
  componentWillUnmount() {
    clearTimeout(interval);
    this.refs.contentbox.removeEventListener("scroll", this.onScroll);
  }
  getDetial() {
    if (this.state.ContentID == null) return;
    websqlapi.getDetialInfo(
      this.state.page,
      parseInt(this.state.catalog) + 1,
      this.state.ContentID,
      res => {
        if (res.length > 0) {
          this.state.Type = res[0].type;
          this.state.TabGroup = res[0].tabgroup;
          this.state.Content = res;
          this.state.url = res[0].url;
          this.setState(this.state);
        }
      }
    );
  }
  createImgContent() {
    return <img src={this.state.url} alt="" />;
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
      case "answer":
        return (
          <AnswerTab
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
  HandleUrlRoute() {
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
          <div
            className={style.ContentDetial}
            ref={"contentbox"}>
            {this.switchType()}
          </div>

          <div className={style.ReturnButton} onClick={this.HandleUrlRoute}>
            <img src={returnback} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
export default Detial;
