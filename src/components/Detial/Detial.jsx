import React, { Component } from "react";
import style from "./Detial.scss";
import { api } from "common/app";
import TabNav from "components/TabNav";
import returnback from "./img/returnback.png";

export class Detial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContentID: null,
      Title: null,
      Type: null,
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
    this.state.ContentID = props.match.params.section;
    this.setState(this.state);
    this.getDetial();
  }
  getDetial() {
    if (this.state.ContentID == null) return;
    api.getSectionDetial(this.state.ContentID).then(
      res => {
        if (res.code == 200) {
          this.state.Title = res.data.title;
          this.state.Type = res.data.type;
          this.state.Content = res.data.content;
          this.setState(this.state);
        } else {
          alert(res.msg);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  createImgContent() {
    if (this.state.Content.length == 0) return;
    var cont = this;
    var itemNodes = this.state.Content.map(function(itemBase, index) {
      return <img src={itemBase.value} alt="" key={"detial" + index} />;
    });
    return itemNodes;
  }
  switchType() {
    switch (this.state.Type) {
      case "img":
        return this.createImgContent();
      case "tab":
        return (
          <TabNav
            data={this.state.Content}
            title={this.state.Title}
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
