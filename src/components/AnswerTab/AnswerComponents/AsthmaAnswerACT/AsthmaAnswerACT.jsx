import React, { Component } from "react";
import style from "./AsthmaAnswerACT.scss";
import RowQuestionBox from "../components/RowQuestionBox";
import returnbutton from "./img/return.png";

export class AsthmaAnswerACT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      scoreAlertShow: false,
      questiondata: [
        {
          question:
            "1. 在过去的4周内， 在工作、学习或家中， 您有多少时候因哮喘发作妨碍日常生活？",
          value: ["所有时间", "绝大部分时间", "有的时候", "很少的时候", "从不"]
        },
        {
          question: "2. 在过去4周内， 您有多少次呼吸困难？",
          value: [
            "每天不止一次",
            "一天一次",
            "每周3至6次",
            "每周一次或两次",
            "完全没有"
          ]
        },
        {
          question:
            "3. 在过去4周内， 因为哮喘症状 （喘息、咳嗽、呼吸困难、胸闷或疼痛）， 您有多少次在夜间醒来或早上比平时早醒？",
          value: [
            "4晚或更多 ",
            "每周二、三夜",
            "每周一次",
            "一次或两次",
            "没有"
          ]
        },
        {
          question:
            "4.在过去的4周内， 您有多少次使用急救药物治疗 （如沙丁胺醇）？",
          value: [
            "每天三次或更多 ",
            "每日1或2次",
            "每周2或3次",
            "每周一次或以下",
            "没有"
          ]
        },
        {
          question: "5.您如何评估过去4周内， 您的哮喘控制情况",
          value: ["没有受控 ", "控制不佳", "有点控制", "控制较好", "完全控制"]
        }
      ],
      answerdata: []
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.initAnswerdata = this.initAnswerdata.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.onQuestionAnswerSelect = this.onQuestionAnswerSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.HandleScoreAlertShow = this.HandleScoreAlertShow.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.initAnswerdata();
  }
  initAnswerdata() {
    this.state.answerdata = [];
    for (let z = 0; z < this.state.questiondata.length; z++) {
      this.state.answerdata.push(null);
    }
    this.setState(this.state);
  }
  onQuestionAnswerSelect(index, result) {
    this.state.answerdata[index] = result;
    this.setState(this.state);
  }
  createQuestion() {
    if (this.state.questiondata.length == 0) return;
    var cont = this;
    var itemNodes = this.state.questiondata.map(function(itemBase, index) {
      return (
        <RowQuestionBox
          key={"question" + index}
          selected={cont.state.answerdata[index]}
          onSelect={cont.onQuestionAnswerSelect.bind(this, index)}
          question={itemBase.question}
          value={itemBase.value}
        />
      );
    });
    return itemNodes;
  }
  refreshProps(props) {}
  onSubmit() {
    let score = 0;
    for (let z = 0; z < this.state.answerdata.length; z++) {
      if (this.state.answerdata[z] == null) {
        alert("请回答第" + (z + 1) + "道题");
        return;
      }
      score += this.state.answerdata[z] + 1;
    }
    this.state.score = score;
    this.state.scoreAlertShow = true;
    this.setState(this.state);
  }
  HandleScoreAlertShow(boolean) {
    this.state.scoreAlertShow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.AnswerBox}>
        {this.state.scoreAlertShow ? (
          <div className={style.AlertBox}>
            <div className={style.Alert}>
              <div
                className={style.ReturnBack}
                onClick={this.HandleScoreAlertShow.bind(this, false)}>
                <img src={returnbutton} alt="" />
              </div>
              总分：<div className={style.Score}>{this.state.score}</div>{" "}
              {this.state.score < 20
                ? "哮喘没有得到控制，需要求助医生。"
                : this.state.score != 25
                ? "哮喘没完全控制，可求助医生。"
                : "哮喘完全控制"}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.RowTextBox}>
          哮喘控制测试（ACT）包含有五个项目，每个项目总分5分。
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>评估方法</span>:每四周进行一次测试
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>评定标准</span>
          :25分是完全控制；20到24分是还没完全控制，可求助医生；20分以下说明哮喘没有得到控制，需要求助医生。
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>适用人群</span>:12岁以上的哮喘患者
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>特点</span>
          :是一个简易实用、经过验证的评估哮喘是否控制的工具，通过提供具体数值区分哮喘控制程度，与肺功能测定有良好的相关性，为一些无肺功能设备的基层医院提供了比较理想的哮喘患者管理工具。
        </div>
        {this.createQuestion()}
        <div className={style.SubmitBox}>
          <div className={style.SubmitButton} onClick={this.onSubmit}>
            提交
          </div>
        </div>
      </div>
    );
  }
}
export default AsthmaAnswerACT;
