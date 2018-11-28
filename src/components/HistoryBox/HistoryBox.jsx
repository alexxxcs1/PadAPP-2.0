import React, { Component } from "react";
import style from "./HistoryBox.scss";
import webapi from "common/websqlapi";
import returnback from './img/returnback.png'

export class HistoryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: [],
      historyListString: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createHistoryList = this.createHistoryList.bind(this);
    this.translateHref = this.translateHref.bind(this);
    this.jumpurl = this.jumpurl.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    webapi.getHistory(res => {
      this.state.historyList = res;
      this.translateHref(res);
    });
  }
  jumpurl(hash){
    window.location.hash = hash;
  }
  createHistoryList() {
    if (this.state.historyListString.length == 0||this.state.historyList.length == 0) return;
    var cont = this;
    var itemNodes = this.state.historyListString.map(function(itemBase, index) {
      return (
        <div className={style.HistoryResultRow} onClick={cont.jumpurl.bind(cont,cont.state.historyList[index].href)}>
          <div className={style.TableResultColumn}>{itemBase.href}</div>
          <div className={style.TableResultColumn}>
            {new Date(itemBase.time).format("MM月dd日 hh:mm:ss")}
          </div>
        </div>
      );
    });
    return itemNodes;
  }
  translateHref(res) {
    for (let z = 0; z < res.length; z++) {
      let hasharray = res[z].href.split("/");
      switch (hasharray[2]) {
        case "list":
          this.state.historyListString[z] = {
            href: hasharray[1] + "列表页",
            time: res[z].time
          };
          this.setState(this.state);
          break;
        case "detial":
          webapi.getSectionName(
            hasharray[1],
            hasharray[3],
            hasharray[4],
            result => {
              this.state.historyListString[z] = {
                href: result[0].value,
                time: res[z].time
              };
              this.setState(this.state);
            }
          );
          break;
        case "collection":
          this.state.historyListString[z] = {
            href: "我的收藏页",
            time: res[z].time
          };
          this.setState(this.state);
        case "search":
          this.state.historyListString[z] = {
            href: "搜索页",
            time: res[z].time
          };
          this.setState(this.state);
        default:
          break;
      }
    }
  }
  clearHistory(){
    webapi.clearHistory(()=>{
      this.state.historyList = [];
      this.state.historyListString = [];
      this.setState(this.state);
    });
  }
  render() {
    return (
      <div className={style.HistoryBox}>
        <div className={style.Content}>
          <div className={style.clearHistory} onClick={this.clearHistory}>清除历史记录</div>
          <div className={style.returnback} onClick={this.props.history.goBack}>
            <img src={returnback} alt=""/>
          </div>
          <div className={style.TableHead}>
            <div className={style.TableHeadColumn}>历史页面</div>
            <div className={style.TableHeadColumn}>时间</div>
          </div>
          <div className={style.HistoryResultBox}>
            {this.createHistoryList()}
          </div>
        </div>
      </div>
    );
  }
}
export default HistoryBox;
