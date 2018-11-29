import React, { Component } from "react";
import style from "./LayerBox.scss";

export class LayerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      flexdirection: "row",
      flexgrow: 1,
      flexshrink: 0
    };
    this.refreshProps = this.refreshProps.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.width =
      this.props.width != undefined ? this.props.width : this.state.width;
    this.state.height =
      this.props.height != undefined ? this.props.height : this.state.height;
    this.state.flexdirection =
      this.props.flexdirection != undefined
        ? this.props.flexdirection
        : this.state.flexdirection;
    this.state.flexgrow =
      this.props.flexgrow != undefined
        ? this.props.flexgrow
        : this.state.flexgrow;
    this.state.flexshrink =
      this.props.flexshrink != undefined
        ? this.props.flexshrink
        : this.state.flexshrink;
  }
  render() {
    return (
      <div
        className={style.LayerBox}
        style={{
          width: this.state.width + "%",
          height: this.state.height + "%",
          flexDirection:this.state.flexdirection,
          flexGrow:this.state.flexgrow,
          flexShrink:this.state.flexShrink
        }}>
        {this.props.children}
      </div>
    );
  }
}
export default LayerBox;
