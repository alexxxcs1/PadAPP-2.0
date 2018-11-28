import React, { Component } from "react";
import style from "./CanvasBox.scss";
import { Scene, Sprite, Group } from "spritejs";

import poscursor from "./img/poscursor.png";
import pen from "./img/pen.png";
import scaleup from "./img/scaleup.png";
import scaledown from "./img/scaledown.png";
import returnback from './img/returnback.png'

const req = require.context(
  "./img/handlebutton",
  true,
  /^\.\/.*\.(?:png|jpg|gif|bmp)$/
); //引入所有图片
const handlebutton = {};
req.keys().map((currentValue, index, arr) => {
  handlebutton[currentValue.split("/")[1].split(".")[0]] = req(
    currentValue,
    index,
    arr
  );
}); //生成图片合集;

export class CanvasBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: null,
      layer: null,
      _layer: null,
      pen_layer: null,
      pen_group: null,
      layer_sprite: null,
      sprite_group: null,
      cursorStyle: 1,
      history: [],
      basescale: 1,
      penstyle: {
        linewidth: 10,
        color: "#333"
      },
      touchStartPos: [0, 0],
      _deviationPos: [0, 0],
      deviationPos: [0, 0],
      emptyCanvas: true,
      linewidthArray: [5, 10, 15, 20, 25, 30, 35, 40],
      colorArray: [
        "#333",
        "#f1f1f1",
        "#eb491d",
        "#f6ff00",
        "#06ff00",
        "#1d06fe",
        "#fe06e4",
        "#06fecc"
      ]
    };
    this.renderSpriteImg = this.renderSpriteImg.bind(this);
    this.refreshProps = this.refreshProps.bind(this);
    this.onCMoveStart = this.onCMoveStart.bind(this);
    this.onCMove = this.onCMove.bind(this);
    this.onCMoveEnd = this.onCMoveEnd.bind(this);
    this.ticker = this.ticker.bind(this);
    this.HandleCursorStyle = this.HandleCursorStyle.bind(this);
    this.initPenGroup = this.initPenGroup.bind(this);
    this.HandleScale = this.HandleScale.bind(this);
    this.DrawtoSprite = this.DrawtoSprite.bind(this);
    this.clearPencontext = this.clearPencontext.bind(this);
    this.HandleUndo = this.HandleUndo.bind(this);
    this.createLinewidthHandleIcon = this.createLinewidthHandleIcon.bind(this);
    this.createColorHandleIcon = this.createColorHandleIcon.bind(this);
    this.HandleLinewidth = this.HandleLinewidth.bind(this);
    this.HandleLineColor = this.HandleLineColor.bind(this);
    this.HandleReturnBack = this.HandleReturnBack.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);

    this.state.scene = new Scene(this.refs.canvas, {
      viewport: ["auto", "auto"],
      resolution: [
        1024 * (this.props.imglib.length + 1),
        552 * (this.props.imglib.length + 1)
      ]
    });
    
    //收藏图片层
    this.state.layer_sprite = this.state.scene.layer("img", {
      zIndex: 1
    });
    this.renderSpriteImg();

    //原生绘画层
    this.state.layer = this.state.scene.layer("pen", {
      zIndex: 3
    });

    //原生绘图Sprite对象层
    this.state.pen_layer = this.state.scene.layer("pen_sprite", {
      zIndex: 2
    });
    this.initPenGroup();

    //原生绘画层监听
    this.state.layer.on("touchstart", this.onCMoveStart);
    this.state.layer.on("touchmove", this.onCMove);
    this.state.layer.on("touchend", this.onCMoveEnd);
    this.ticker();
    this.setState(this.state);
  }
  //原生绘画层touchstart
  onCMoveStart(evt) {
    switch (this.state.cursorStyle) {
      case 0:
        this.state.touchStartPos = [evt.layerX, evt.layerY];
        break;
      case 1:
        this.state.layer.context.beginPath();
        this.state.layer.context.moveTo(evt.layerX, evt.layerY);
        break;
      case 2:
        //橡皮擦预留
        break;
    }

    this.setState(this.state);
  }
  //原生绘画层touchmove
  onCMove(evt) {
    switch (this.state.cursorStyle) {
      case 0:
        this.state._deviationPos[0] = evt.layerX - this.state.touchStartPos[0];
        this.state._deviationPos[1] = evt.layerY - this.state.touchStartPos[1];

        
        break;
      case 1:
        this.state.emptyCanvas = false;
        const ctx = this.state.layer.context;
        ctx.save();
        ctx.lineWidth = this.state.penstyle.linewidth * this.state.basescale;
        ctx.strokeStyle = this.state.penstyle.color;
        ctx.lineTo(evt.layerX, evt.layerY);
        ctx.stroke();
        ctx.restore();
        break;
      case 2:
        //橡皮擦预留
        let lsctx = this.state.pen_layer.context;
        lsctx.clearRect(
          evt.layerX - 10,
          evt.layerY - 10,
          evt.layerX + 10,
          evt.layerY + 10
        );
        break;
    }
    this.setState(this.state);
  }
  //原生绘画层touchend
  onCMoveEnd() {
    switch (this.state.cursorStyle) {
      case 0:
        let ctx = this.state.layer_sprite;
        this.state.deviationPos[0] += this.state._deviationPos[0];
        this.state.deviationPos[1] += this.state._deviationPos[1];
        this.state._deviationPos[0] = 0;
        this.state._deviationPos[1] = 0;
        
        this.state.deviationPos[0] = Math.max(Math.min(this.state.deviationPos[0],this.state.scene.resolution[0]/2),-this.state.scene.resolution[0]/2);
        this.state.deviationPos[1] = Math.max(Math.min(this.state.deviationPos[1],this.state.scene.resolution[1]/2),-this.state.scene.resolution[1]/2);
        break;
      case 1:
        this.state.layer.context.closePath();
        //undo使用删除layer.child实现
        // this.state.history.push(
        //   this.state.layer.context.getImageData(
        //     0,
        //     0,
        //     this.refs.outcon.clientWidth,
        //     this.refs.outcon.clientHeight
        //   )
        // );
        break;
      case 2:
        //橡皮擦预留
        // this.state.pen_layer.context.closePath();
        // let penlayer = this.state.pen_layer;
        // let pencanvas = penlayer.canvas;
        // let cleardonedata = pencanvas.toDataURL("image/jpg");
        // penlayer.children[0].clear();
        // let sprite = new Sprite(cleardonedata);
        // sprite.attr({
        //   pos: [0, 0]
        // });
        // this.state.pen_group.append(sprite);

        break;
    }
    this.setState(this.state);
  }
  initPenGroup() {
    this.state.pen_group = new Group();
    this.state.pen_layer.append(this.state.pen_group);
  }
  //加载收藏图片层
  renderSpriteImg() {
    let ctx = this.state.layer_sprite;
    let halflenght = Math.round(this.props.imglib.length / 2);
    this.state.sprite_group = new Group();
    this.state.sprite_group.attr();
    for (let z = 0; z < this.props.imglib.length; z++) {
      let sprite = new Sprite(this.props.imglib[z]);
      sprite.attr({
        anchor: [0.5, 0.5],
        pos: [
          ctx.resolution[0] / 2 +
            (1024 * (z - this.props.imglib.length / 2) + 552) +
            this.state.deviationPos[0],
          ctx.resolution[1] / 2 + this.state.deviationPos[1]
        ],
        scale: [1, 1]
      });
      this.state.sprite_group.append(sprite);
    }
    ctx.append(this.state.sprite_group);
  }
  refreshProps(props) {}
  ticker() {
    if (
      !(
        this.state.sprite_group ||
        this.state.sprite_group ||
        this.state.layer_sprite ||
        this.state.layer
      )
    )
      return;
    this.state.sprite_group.attr({
      scale: [this.state.basescale, this.state.basescale],
      pos: [
        this.state.deviationPos[0] + this.state._deviationPos[0],
        this.state.deviationPos[1] + this.state._deviationPos[1]
      ]
    });
    this.state.pen_group.attr({
      scale: [this.state.basescale, this.state.basescale],
      pos: [
        this.state.deviationPos[0] + this.state._deviationPos[0],
        this.state.deviationPos[1] + this.state._deviationPos[1]
      ]
    });
    requestAnimationFrame(this.ticker);
  }
  HandleCursorStyle(style) {
    this.DrawtoSprite();

    this.state.cursorStyle = style;
    this.setState(this.state);
  }
  clearPencontext() {
    this.DrawtoSprite();
    if (window.confirm("将清楚本次所有笔记！")) {
      this.state.pen_group.clear();
    }
  }
  DrawtoSprite() {
    if (this.state.emptyCanvas) return;
    let pencontext = this.state.layer;
    let tmp_pensprite = new Sprite(pencontext.canvas.toDataURL("image/jpg"));
    tmp_pensprite.attr({
      scale: [1 / this.state.basescale, 1 / this.state.basescale],
      pos: [
        ((-this.state.deviationPos[0] + this.state._deviationPos[0]) * 1) /
          this.state.basescale,
        ((-this.state.deviationPos[1] + this.state._deviationPos[1]) * 1) /
          this.state.basescale
      ]
    });

    this.state.pen_group.append(tmp_pensprite);
    this.state.layer.clearContext(this.state.layer.context);
    this.state.emptyCanvas = true;
    this.setState(this.state);
  }
  HandleScale(num) {
    this.DrawtoSprite();
    this.state.basescale = Math.max(Math.min(this.state.basescale + num, 6), 1);
    this.setState(this.state);
  }
  HandleUndo() {
    this.DrawtoSprite();
    if (this.state.pen_group.children.length >= 1) {
      this.state.pen_group.removeChild(
        this.state.pen_group.children[this.state.pen_group.children.length - 1]
      );
    }
  }
  createLinewidthHandleIcon() {
    if (this.state.linewidthArray.length == 0) return;
    var cont = this;
    var itemNodes = this.state.linewidthArray.map(function(itemBase, index) {
      return (
        <div
          className={[
            style.handleicon,
            cont.state.penstyle.linewidth == itemBase ? style.actbutton : ""
          ].join(" ")}
          onClick={cont.HandleLinewidth.bind(cont, itemBase)}>
          {itemBase}
        </div>
      );
    });
    return itemNodes;
  }
  createColorHandleIcon() {
    if (this.state.colorArray.length == 0) return;
    var cont = this;
    var itemNodes = this.state.colorArray.map(function(itemBase, index) {
      return (
        <div
          className={[
            style.handleicon,
            cont.state.penstyle.color == itemBase ? style.actbutton : ""
          ].join(" ")}
          style={{ background: itemBase }}
          onClick={cont.HandleLineColor.bind(cont, itemBase)}
        />
      );
    });
    return itemNodes;
  }
  HandleLinewidth(linewidth) {
    this.state.penstyle.linewidth = linewidth;
    this.setState(this.state);
  }
  HandleLineColor(color) {
    this.state.penstyle.color = color;
    this.setState(this.state);
  }
  HandleReturnBack(){
    this.props.handleroute();
  }
  render() {
    return (
      <div className={style.CanvasBox} ref={"outcon"}>
        <div className={style.HandleGroup}>
          <div className={style.returnback} onClick={this.HandleReturnBack}>
            <img src={returnback} alt=""/>
          </div>
          <div
            className={style.HandlePosButton}
            onClick={this.HandleCursorStyle.bind(this, 0)}>
            <img src={poscursor} alt="" />
          </div>
          {/* <div
            className={style.HandlePosButton}
            style={{ top: "200px" }}
            >
            <img src={pen} alt="" />
          </div> */}
          <div
            className={style.scaleUp}
            onClick={this.HandleScale.bind(this, 0.3)}>
            <img src={scaleup} alt="" />
          </div>
          <div
            className={style.scaleDown}
            onClick={this.HandleScale.bind(this, -0.3)}>
            <img src={scaledown} alt="" />
          </div>
          <div className={style.HandlePenBox}>
            <div className={style.PenButtonBox}>
              <img
                src={handlebutton.pen}
                onClick={this.HandleCursorStyle.bind(this, 1)}
              />
            </div>
            <div className={style.PenButtonBox} tabIndex={-1}>
              <div className={style.DropBox}>
                {this.createColorHandleIcon()}
              </div>
              <img src={handlebutton.color} alt="" />
            </div>
            <div className={style.PenButtonBox}>
              <img
                src={handlebutton.clearrect}
                alt=""
                onClick={this.clearPencontext}
              />
            </div>
            <div className={style.PenButtonBox} tabIndex={-1}>
              <div className={style.DropBox}>
                {this.createLinewidthHandleIcon()}
              </div>
              <img src={handlebutton.linewidth} alt="" />
            </div>
            <div className={style.PenButtonBox}>
              <img src={handlebutton.undo} onClick={this.HandleUndo} />
            </div>
            <div className={style.PenButtonBox}>
              <img src={handlebutton.save} alt="" />
            </div>
          </div>
        </div>
        <div
          ref={"canvas"}
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      </div>
    );
  }
}
export default CanvasBox;
