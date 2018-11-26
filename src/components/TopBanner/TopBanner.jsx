import React, { Component } from "react";
import style from "./TopBanner.scss";
import PropTypes from "prop-types";
import IconBox from "components/IconBox";
import websqlapi from 'common/websqlapi'
import html2canvas from 'html2canvas'
const req = require.context("./img", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/); //引入所有图片
const reqlib = {};
req.keys().map((currentValue, index, arr) => {
  reqlib[currentValue.split("/")[1].split(".")[0]] = req(
    currentValue,
    index,
    arr
  );
}); //生成图片合集;
export class TopBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.SaveToCollection = this.SaveToCollection.bind(this);
    this.GotoCollection = this.GotoCollection.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
  }
  SaveToCollection(){
    html2canvas(this.context.getScreenshotsBody()).then(canvas => {
      websqlapi.savetoCollection({id:new Date().getTime(),route:window.location.hash,value:canvas.toDataURL("image/jpg")},()=>{
        alert('收藏成功');
      });
    });
  }
  GotoCollection(){
    window.location.hash = window.location.hash.split('/')[0] + '/' + window.location.hash.split('/')[1] + '/collection';
  }
  render() {
    return (
      <div className={style.TopBannerBox}>
        <div className={style.LeftBox}>
          <IconBox inverse={true} img={reqlib.home}  />
        </div>
        <div className={style.RightBox}>
          <IconBox inverse={true} img={reqlib.save} onClick={this.SaveToCollection} />
          <IconBox inverse={true} img={reqlib.favorites} onClick={this.GotoCollection} />
          <IconBox inverse={true} img={reqlib.display}  />
          <IconBox inverse={true} img={reqlib.search}  />
          <IconBox inverse={true} img={reqlib.history}  />
        </div>
      </div>
    );
  }
}
TopBanner.contextTypes = {
  getScreenshotsBody: PropTypes.func,
};
export default TopBanner;
