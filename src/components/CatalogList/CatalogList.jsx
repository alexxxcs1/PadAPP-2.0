import React, { Component } from "react";
import style from "./CatalogList.scss";
import { Link } from "react-router-dom";

import CatalogBKG from "./img/CatalogBKG.png";
import { api } from "common/app";
import websqlapi from "common/websqlapi";
import unread from './img/unread.png'
import readhalf from './img/readhalf.png'
import reading from './img/reading.png'
import readall from './img/readall.png'

export class CatalogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListIndex: 0,
      page: null,
      apidata: [],
      sectiondata: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createListButton = this.createListButton.bind(this);
    this.createSectionButton = this.createSectionButton.bind(this);
    this.getCatelogList = this.getCatelogList.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    websqlapi.setHistory({
      href: window.location.hash,
      time: new Date().getTime()
    });
  }
  refreshProps(props) {
    this.state.ListIndex =
      props.match.params.catalog != undefined
        ? props.match.params.catalog
        : this.state.ListIndex;
    this.state.page = props.match.url.split("/")[1];
    // this.state.apidata = apidata;
    this.getCatelogList();

    this.setState(this.state);
  }
  getCatelogList() {
    let self = this;
    websqlapi.getListInfo(this.state.page, res => {
      self.state.apidata = res;
      self.setState(this.state);
    });
    websqlapi.getSectionInfo(this.state.page, this.state.ListIndex, res => {
      self.state.sectiondata = res;
      self.setState(this.state);
    });
    // api.getCatalogList(this.state.page.toUpperCase()).then(
    //   res => {
    //     if (res.code == 200) {
    //       this.state.apidata = res.data;
    //       this.setState(this.state);
    //     }
    //   },
    //   err => {}
    // );
  }
  createListButton() {
    if (this.state.apidata.length == 0) return;
    var cont = this;
    var itemNodes = this.state.apidata.map(function(itemBase, index) {
      return (
        <Link
          to={"/" + cont.state.page + "/list/" + index}
          key={"listbutton" + index}>
          <div
            className={[
              style.ListButton,
              cont.state.ListIndex == index ? style.ActButton : ""
            ].join(" ")}>
            <div className={style.Catalog}>{itemBase.catalog}</div>
            <div className={style.Value} dangerouslySetInnerHTML={{__html:itemBase.value}}>
              {/* {itemBase.value.split("|")[0]} <br />
              {itemBase.value.split("|")[1]} */}
              
            </div>
          </div>
        </Link>
      );
    });
    return itemNodes;
  }
  createSectionButton() {
    if (this.state.sectiondata.length == 0) return;
    let data = this.state.sectiondata;
    var cont = this;
    if (!window.localStorage.ReadRate) {
      window.localStorage.ReadRate = JSON.stringify({});
    }
    let readrate = JSON.parse(window.localStorage.ReadRate);
    var itemNodes = data.map(function(itemBase, index) {
      // if (!itemBase.is_child) {
      return (
        <Link
          to={
            "/" +
            cont.state.page +
            "/detial/" +
            cont.state.ListIndex +
            "/" +
            itemBase.to
          }
          key={"seciton" + index}>
          <div className={style.Section}>
            {readrate[
              cont.state.page + "-" + cont.state.ListIndex + "-" + itemBase.to
            ] == undefined
              ? <img src={unread} alt=""/>
              : (readrate[
                  cont.state.page +
                    "-" +
                    cont.state.ListIndex +
                    "-" +
                    itemBase.to
                ]<0.5?<img src={reading} alt=""/>:readrate[
                  cont.state.page +
                    "-" +
                    cont.state.ListIndex +
                    "-" +
                    itemBase.to
                ]==1?<img src={readall} alt=""/>:<img src={readhalf} alt=""/>)}{" "}
            <div dangerouslySetInnerHTML={{__html:itemBase.value}}></div> 
          </div>
        </Link>
      );
      // } else {
      //   return <div key={'section' + index} className={style.Section}>{itemBase.title}</div>;
      // }
    });
    return itemNodes;
  }
  render() {
    return (
      <div className={style.CatalogList}>
        {this.state.apidata.length > 0 ? (
          [
            <div key={this.state.page+'listbox'} className={style.ListBox}>{this.createListButton()}</div>,
            <div key={this.state.page+'sectionbox'} className={style.SectionBox}>
              <div className={style.CatalogSection}>
                <img src={CatalogBKG} className={style.SectionBkg} alt="" />
                <div className={style.SectionDetial}>
                  {this.createSectionButton()}
                </div>
              </div>
            </div>
          ]
        ) : (
          <div className={style.Empty}>该板块尚未开放</div>
        )}
      </div>
    );
  }
}
export default CatalogList;
