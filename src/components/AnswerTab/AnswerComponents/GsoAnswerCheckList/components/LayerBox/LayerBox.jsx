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
      props.width != undefined ? props.width : this.state.width;
    this.state.height =
      props.height != undefined ? props.height : this.state.height;
    this.state.flexdirection =
      props.flexdirection != undefined
        ? props.flexdirection
        : this.state.flexdirection;
    this.state.flexgrow =
      props.flexgrow != undefined ? props.flexgrow : this.state.flexgrow;
    this.state.flexshrink =
      props.flexshrink != undefined ? props.flexshrink : this.state.flexshrink;
    this.setState(this.state);
  }
  render() {
    return (
      <div
        className={style.LayerBox}
        style={{
          width: this.state.width + "%",
          height: this.state.height + "%",
          flexDirection: this.state.flexdirection,
          flexGrow: this.state.flexgrow,
          flexShrink: this.state.flexShrink
        }}>
        {this.props.children}
      </div>
    );
  }
}
export default LayerBox;
