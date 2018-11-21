import React, { Component } from "react";
import style from "./CatalogList.scss";
import { Link } from "react-router-dom";

import CatalogBKG from "./img/CatalogBKG.png";
import { api } from "common/app";

const apidata = [
  {
    catalog: "第一章",
    value: "哮喘疾病基础知识篇",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: " - 1. ACT",
        to: 1
      },
      {
        title: " - 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: " - 3.AQLQ ",
        to: 1
      },
      {
        title: " - 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  },
  {
    catalog: "第二章",
    value: "舒利迭®产品知识篇",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: "- 1. ACT",
        to: 1
      },
      {
        title: "- 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: "- 3.AQLQ ",
        to: 1
      },
      {
        title: "- 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  },
  {
    catalog: "第三章",
    value: "舒利迭®成人哮喘|市场推广篇",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: "- 1. ACT",
        to: 1
      },
      {
        title: "- 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: "- 3.AQLQ ",
        to: 1
      },
      {
        title: "- 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  },
  {
    catalog: "第四章",
    value: "应对竞争产品篇",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: "- 1. ACT",
        to: 1
      },
      {
        title: "- 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: "- 3.AQLQ ",
        to: 1
      },
      {
        title: "- 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  },
  {
    catalog: "第五章",
    value: "APACT",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: "- 1. ACT",
        to: 1
      },
      {
        title: "- 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: "- 3.AQLQ ",
        to: 1
      },
      {
        title: "- 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  },
  {
    catalog: "附录",
    value: "",
    list: [
      {
        title: "哮喘控制的调查问卷",
        to: 1
      },
      {
        title: "- 1. ACT",
        to: 1
      },
      {
        title: "- 2.ACQ和ACQ-5",
        to: 1
      },
      {
        title: "- 3.AQLQ ",
        to: 1
      },
      {
        title: "- 4.ATAQ",
        to: 1
      },
      {
        title: "哮喘相关医学名词",
        to: 1
      },
      {
        title: "Q＆A",
        to: 1
      },
      {
        title: "舒利迭®关键产品安全性信息",
        to: 1
      }
    ]
  }
];

export class CatalogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListIndex: 0,
      page: null,
      apidata: []
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
    api.getCatalogList(this.state.page.toUpperCase()).then(
      res => {
        if (res.code == 200) {
          this.state.apidata = res.data;
          this.setState(this.state);
        }
      },
      err => {}
    );
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
            <div className={style.Catalog}>{itemBase.title}</div>
            <div className={style.Value}>
              {itemBase.remake.split("|")[0]} <br />{" "}
              {itemBase.remake.split("|")[1]} 
            </div>
          </div>
        </Link>
      );
    });
    return itemNodes;
  }
  createSectionButton() {
    if (this.state.apidata.length == 0) return;
    let data = this.state.apidata[this.state.ListIndex].child;
    var cont = this;
    var itemNodes = data.map(function(itemBase, index) {
      if (!itemBase.is_child) {
        return (
          <Link
            to={"/" + cont.state.page + "/detial/"+cont.state.ListIndex+"/" + itemBase.id}
            key={"seciton" + index}>
            <div className={style.Section}>{itemBase.title}</div>
          </Link>
        );
      } else {
        return <div key={'section' + index} className={style.Section}>{itemBase.title}</div>;
      }
    });
    return itemNodes;
  }
  render() {
    return (
      <div className={style.CatalogList}>
        <div className={style.ListBox}>{this.createListButton()}</div>
        <div className={style.SectionBox}>
          <div className={style.CatalogSection}>
            <img src={CatalogBKG} className={style.SectionBkg} alt="" />
            <div className={style.SectionDetial}>
              {this.createSectionButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CatalogList;
