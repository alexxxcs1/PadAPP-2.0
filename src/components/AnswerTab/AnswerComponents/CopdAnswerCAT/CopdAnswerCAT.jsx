import React, { Component } from "react";
import style from "./CopdAnswerCAT.scss";
import tips from "./img/tips.png";

export class CopdAnswerCAT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          start: "我从不咳嗽",
          end: "我一直咳嗽"
        },
        {
          start: "我一点痰也没有",
          end: "我有很多很多痰"
        },
        {
          start: "我一点也没有胸闷的感觉",
          end: "我有很重的胸闷的感觉"
        },
        {
          start: "当我爬坡或爬一层楼时我并不感到喘不过气来",
          end: "当我爬坡或爬一层楼时我感觉非常喘不过气来"
        },
        {
          start: "我在家里的任何劳动都不受慢阻肺的影响",
          end: "我在家里的任何活动都很受慢阻肺的影响"
        },
        {
          start: "尽管我有肺病，我还是有信心外出",
          end: "因为我有慢阻肺我所以从来没有外出过"
        },
        {
          start: "我睡眠非常好",
          end: "因为我有慢阻肺我的睡眠非常不好"
        },
        {
          start: "我精力旺盛",
          end: "我一点精力都没有"
        }
      ],
      answer: [null, null, null, null, null, null, null, null],
      resultOption: {
        show: false,
        score: 0
      }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createOption = this.createOption.bind(this);
    this.handleSetOption = this.handleSetOption.bind(this);
    this.submit = this.submit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  createOption() {
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
      result.push(
        <div className={style.battlerow}>
          <div className={style.box}>{this.state.data[z].start}</div>
          <div className={style.OptionGroup}>
            <div
              onClick={this.handleSetOption.bind(this, z, 1)}
              className={[
                style.OptionBox,
                this.state.answer[z] == 1 ? style.ActOption : ""
              ].join(" ")}>
              1
            </div>
            <div
              onClick={this.handleSetOption.bind(this, z, 2)}
              className={[
                style.OptionBox,
                this.state.answer[z] == 2 ? style.ActOption : ""
              ].join(" ")}>
              2
            </div>
            <div
              onClick={this.handleSetOption.bind(this, z, 3)}
              className={[
                style.OptionBox,
                this.state.answer[z] == 3 ? style.ActOption : ""
              ].join(" ")}>
              3
            </div>
            <div
              onClick={this.handleSetOption.bind(this, z, 4)}
              className={[
                style.OptionBox,
                this.state.answer[z] == 4 ? style.ActOption : ""
              ].join(" ")}>
              4
            </div>
            <div
              onClick={this.handleSetOption.bind(this, z, 5)}
              className={[
                style.OptionBox,
                this.state.answer[z] == 5 ? style.ActOption : ""
              ].join(" ")}>
              5
            </div>
          </div>
          <div className={style.box}>{this.state.data[z].end}</div>
        </div>
      );
    }
    return result;
  }
  handleSetOption(index, value) {
    this.state.answer[index] = value;
    this.setState(this.state);
  }
  submit() {
    let score = 0;
    for (let z = 0; z < this.state.answer.length; z++) {
      score += this.state.answer[z];
      if (this.state.answer[z] == null) {
        alert('请选择完整的信息')
        return;
      }
    }
    this.state.resultOption.show = true;
    this.state.resultOption.score = score;
    this.setState(this.state);
  }
  handleAlert(boolean) {
    this.state.resultOption.show = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.AnswerBox}>
        {this.state.resultOption.show ? (
          <div className={style.DarkBox}>
            <div className={style.ResultBox}>
              <div
                className={style.closebutton}
                onClick={this.handleAlert.bind(this, false)}>
                X
              </div>
              <div className={style.TotalScore}>
                总分：
                <div className={style.score}>
                  {this.state.resultOption.score}
                </div>
              </div>
              <div className={style.tips}>CAT评分结果参考表</div>
              <div className={style.tipsimgbox}>
                <img src={tips} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={style.title}>
          以下每一项请选择能最好地描述您目前状况的方框
        </div>
        {this.createOption()}
        <div className={style.SubmitButton} onClick={this.submit}>
          提交
        </div>
      </div>
    );
  }
}
export default CopdAnswerCAT;
