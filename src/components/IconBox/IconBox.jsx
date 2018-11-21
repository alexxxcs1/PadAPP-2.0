import React, { Component } from "react";
import style from "./IconBox.scss";

export class IconBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      act:true,
      inverse:false,
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
    this.state.act = props.act!=undefined?props.act:this.state.act;
    this.state.inverse = props.inverse != undefined?props.inverse:this.state.inverse
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.IconBox} onClick={this.props.onClick}>
        <div className={[style.ImgBox,this.state.act?style.act:''].join(' ')} style={{'--bright':this.state.inverse?'1000%':'100%'}}>
          <img src={this.props.img} alt="" />
        </div>
      </div>
    );
  }
}
export default IconBox;
