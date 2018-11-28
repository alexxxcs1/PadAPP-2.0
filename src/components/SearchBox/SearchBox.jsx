import React, { Component } from "react";
import style from "./SearchBox.scss";
import searchicon from "./img/searchicon.png";
import webapi from "common/websqlapi";
import returnback from './img/returnback.png'

export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchResult: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.SearchStart = this.SearchStart.bind(this);
    this.HandleSearchValue = this.HandleSearchValue.bind(this);
    this.createSearchResult = this.createSearchResult.bind(this);
    this.jumpurl = this.jumpurl.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    webapi.setHistory({
      href: window.location.hash,
      time: new Date().getTime()
    });
  }
  refreshProps(props) {}
  SearchStart() {
    webapi.searchList(this.state.searchValue, res => {
      this.state.searchResult = res;
      this.setState(this.state);
      console.log(res);
    });
  }
  HandleSearchValue(e) {
    this.state.searchValue = e.target.value;
    this.setState(this.state);
  }
  createSearchResult() {
    if (this.state.searchResult.length == 0) return;
    var cont = this;
    var itemNodes = this.state.searchResult.map(function(itemBase, index) {
      return (
        <div
          key={"searchresult" + index}
          className={style.SearchResultRow}
          onClick={cont.jumpurl.bind(
            cont,
            "#/" +
              itemBase.father +
              "/detial/" +
              itemBase.belonged +
              "/" +
              itemBase.to
          )}>
          {itemBase.value}
        </div>
      );
    });
    return itemNodes;
  }
  jumpurl(hash) {
    window.location.hash = hash;
  }
  render() {
    return (
      <div className={style.SearchBox}>
        <div className={style.ContentBox}>
          <div className={style.returnback} onClick={this.props.history.goBack}>
            <img src={returnback} alt="" />
          </div>
          <div className={style.SearchInputBox}>
            <div className={style.SearchIcon}>
              <img src={searchicon} alt="" />
            </div>
            <div className={style.SearchInput}>
              <input
                type="text"
                value={this.state.searchValue}
                className={style.SInput}
                placeholder={"请输入搜索内容"}
                onChange={this.HandleSearchValue}
              />
            </div>
            <div className={style.SearchButton} onClick={this.SearchStart}>
              搜索
            </div>
          </div>
          <div className={style.SearchResultBox}>
            {this.createSearchResult()}
          </div>
        </div>
      </div>
    );
  }
}
export default SearchBox;
