import React, { Component } from "react";
import style from "./Collection.scss";

const req = require.context("./img", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/); //引入所有图片
const reqlib = {};
req.keys().map((currentValue, index, arr) => {
  reqlib[currentValue.split("/")[1].split(".")[0]] = req(
    currentValue,
    index,
    arr
  );
}); //生成图片合集;

export class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
    this.HistoryBack = this.HistoryBack.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HistoryBack(){
      this.props.history.goBack();
  }
  render() {
    return (
      <div className={style.CollectionBox}>
        <div className={style.ContentBox}>
          <div className={style.HandleGroup}>
            <div className={style.HandleTipsBox}>
              *APP更新时，IGSK会清空收藏内容，请及时备份至iPad本地
            </div>
            <div className={style.HandleButtonBox}>
                <img src={reqlib.ok} alt=""/>
                <img src={reqlib.upload} alt=""/>
                <img src={reqlib.returnback} onClick={this.HistoryBack}/>
            </div>
          </div>
          <div className={style.CollectionDetialBox}>
            <div className={style.DetialGrowBox}>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
                <div className={style.CollectionImageBox}></div>
            </div>
          </div>
          <div className={style.HandleGroup}>
            <div className={style.SubmitButton}>
                确定
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Collection;
