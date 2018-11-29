import React, { Component } from "react";
import style from "./Collection.scss";
import websqlapi from "common/websqlapi";

import CanvasBox from './components/CanvasBox'

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
    this.state = {
      customRoute:0,
      CollectionList: [],
      SelectedData: [],
      canvasdata: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HistoryBack = this.HistoryBack.bind(this);
    this.getCollectionList = this.getCollectionList.bind(this);
    this.createCollectionList = this.createCollectionList.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.HandleSelectedtoCanvas = this.HandleSelectedtoCanvas.bind(this);
    this.CustomRoute = this.CustomRoute.bind(this);
    this.HandlecustomRoute = this.HandlecustomRoute.bind(this);
    this.uploadimg = this.uploadimg.bind(this);
    this.fileonChange = this.fileonChange.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.getCollectionList();
    websqlapi.setHistory({href:window.location.hash,time:new Date().getTime()});
  }
  refreshProps(props) {}
  HistoryBack() {
    this.props.history.goBack();
  }
  getCollectionList() {
    websqlapi.getCollection(res => {
      this.state.CollectionList = res;
      this.state.SelectedData = [];
      for (let z = 0; z < res.length; z++) {
        this.state.SelectedData.push(null);
      }
      this.setState(this.state);
    });
  }
  handleSelected(index, value) {
    if (this.state.SelectedData[index]) {
      this.state.SelectedData[index] = null;
    } else {
      this.state.SelectedData[index] = value;
    }
    this.setState(this.state);
  }
  createCollectionList() {
    if (this.state.CollectionList.length == 0) return;
    var cont = this;
    var itemNodes = this.state.CollectionList.map(function(itemBase, index) {
      return (
        <div
          key={"ImageBox" + index}
          className={[style.CollectionImageBox].join(" ")}
          onClick={cont.handleSelected.bind(cont, index, itemBase.value)}>
          <img src={itemBase.value} style={{userSelect:'all'}} alt="" />
          <div
            className={[
              style.StatusBox,
              cont.state.SelectedData[index] ? style.ActStatus : ""
            ].join(" ")}
          />
        </div>
      );
    });
    return itemNodes;
  }
  HandleSelectedtoCanvas() {
    this.state.canvasdata = [];
    for (let z = 0; z < this.state.SelectedData.length; z++) {
      if (this.state.SelectedData[z]) {
        this.state.canvasdata.push(this.state.SelectedData[z]);
      }
    }
    if (this.state.canvasdata.length == 0) {
      alert("请选择要编辑的图片");
      return;
    } else {
      this.state.customRoute = 1;
    }
    this.setState(this.state);
  }
  HandlecustomRoute(index){
    this.getCollectionList();
    this.state.customRoute = index;
    this.setState(this.state);
  }
  uploadimg(){
      this.refs.uploadfile.click();
  }
  fileonChange(e){
    let self = this;
    let file = e.target.files[0];
    if (file.size / 1024 > 5 * 1024) {
      alert("图片过大，请选择5M以内的图片上传");
    } else {
      e.target.value = "";
      //判断类型是不是图片
      if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        let newcoll = {id:new Date().getTime(),route:window.location.hash,value:this.result};
        websqlapi.savetoCollection(newcoll,()=>{
          self.state.CollectionList.push(newcoll);
          self.setState(self.state);
        });
      };
    }
  }
  CustomRoute(){
    switch (this.state.customRoute) {
      case 0:
        return [
          <div className={style.HandleGroup}>
            <div className={style.HandleTipsBox}>
              *APP更新时，IGSK会清空收藏内容，请及时备份至iPad本地
            </div>
            <div className={style.HandleButtonBox}>
              {/* <img src={reqlib.ok} alt="" /> */}
              <img src={reqlib.upload} onClick={this.uploadimg} alt="" />
              <img src={reqlib.returnback} onClick={this.HistoryBack} />
              <input style={{display:'none'}} type="file" accept={'image/*'} ref={'uploadfile'} onChange={this.fileonChange}/>
            </div>
          </div>,
          <div className={style.CollectionDetialBox}>
            <div className={style.DetialGrowBox}>
              {this.state.CollectionList.length != 0 ? (
                this.createCollectionList()
              ) : (
                <div className={style.EmptyTips}>
                  这里什么都没有，快去收藏点东西吧？
                </div>
              )}
            </div>

          </div>,
          <div className={style.HandleGroup}>
            <div
              className={style.SubmitButton}
              onClick={this.HandleSelectedtoCanvas}>
              确定
            </div>
          </div>
        ]
      case 1:
        return <CanvasBox imglib={this.state.canvasdata} handleroute={this.HandlecustomRoute.bind(this,0)}/>
      default:
        break;
    }
  }
  render() {
    return (
      <div className={style.CollectionBox}>
        <div className={style.ContentBox}>
            {this.CustomRoute()}
        </div>
      </div>
    );
  }
}
export default Collection;
