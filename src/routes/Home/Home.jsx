import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import style from "./Home.scss";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <div className={style.Box} />;
  }
}

export default Home;
