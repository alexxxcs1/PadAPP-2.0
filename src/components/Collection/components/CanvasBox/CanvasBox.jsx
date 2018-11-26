import React, { Component } from "react";
import style from "./CanvasBox.scss";
import { Scene, Sprite } from "spritejs";

export class CanvasBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    let scene = new Scene(this.refs.canvas, {
      viewport: ["auto", "auto"],
      resolution: [this.refs.outcon.clientWidth,this.refs.outcon.clientHeight]
    });
    const layer = scene.layer();

    layer.on('touchmove',(evt)=>{
        let line = new Sprite({
            width:''
        })
        
    })
  }
  refreshProps(props) {}
  render() {
    return (
      <div className={style.CanvasBox} ref={'outcon'}>
        <div
          ref={"canvas"}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    );
  }
}
export default CanvasBox;
