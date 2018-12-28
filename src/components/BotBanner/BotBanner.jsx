import React, { Component } from "react";
import style from "./BotBanner.scss";
import IconBox from "components/IconBox";
import { Link } from "react-router-dom";

const req = require.context("./img", true, /^\.\/.*\.(?:png|jpg|gif|bmp)$/); //引入所有图片
const reqlib = {};
req.keys().map((currentValue, index, arr) => {
  reqlib[currentValue.split("/")[1].split(".")[0]] = req(
    currentValue,
    index,
    arr
  );
}); //生成图片合集;

export class BotBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
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
    let splitelocation = window.location.hash.split("/");
    this.state.location = splitelocation;
    this.state.inverse = props.inverse;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.BotBannerBox}>
        <div className={style.LeftBox}>
          <Link to={'/asthma/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.asthma}
              act={this.state.location[1] == "asthma" ? true : false}
            />
          </Link>
          <Link to={'/copd/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.copd}
              act={this.state.location[1] == "copd" ? true : false}
            />
          </Link>
          <Link to={'/paediatricasthma/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.paediatricasthma}
              act={this.state.location[1] == "paediatricasthma" ? true : false}
            />
          </Link>
          <Link to={'/gso/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.gso}
              act={this.state.location[1] == "gso" ? true : false}
            />
          </Link>
          <Link to={'/study/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.study}
              act={this.state.location[1] == "study" ? true : false}
            />
          </Link>
          <Link to={'/reference/list/0'}>
            <IconBox
              inverse={this.state.inverse}
              img={reqlib.reference}
              act={this.state.location[1] == "reference" ? true : false}
            />
          </Link>
        </div>
        <div className={style.RightBox} >
          <img src={reqlib.logo} className={style.Logo} alt=""/>
        </div>
      </div>
    );
  }
}
export default BotBanner;
