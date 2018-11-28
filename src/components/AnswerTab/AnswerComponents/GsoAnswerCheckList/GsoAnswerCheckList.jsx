import React, { Component } from "react";
import style from "./GsoAnswerCheckList.scss";

export class GsoAnswerCheckList extends Component {
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
  }
  refreshProps(props) {}
  render() {
    return (
      <div className={style.AnswerBox}>
        <div className={style.CheckListBox}>
          <div className={style.TableTitle}>GSO 评估 Check List</div>
        </div>
      </div>
    );
  }
}
export default GsoAnswerCheckList;
