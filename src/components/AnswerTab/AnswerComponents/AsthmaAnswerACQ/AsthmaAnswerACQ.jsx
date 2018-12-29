import React, { Component } from "react";
import style from "./AsthmaAnswerACQ.scss";
import RowQuestionBox from "../components/RowQuestionBox";
import returnbutton from "./img/return.png";

export class AsthmaAnswerACQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      scoreAlertShow: false,
      questiondata: [
        {
          question:
            "1. 在过去的4周内， 在工作、学习或家中， 您有多少时候因哮喘发作妨碍日常生活？",
          value: ["从来没有", "几乎没有", "少数几次", "有几次", "许多次", "绝大多数时间", "因哮喘而无法入睡 "]
        },
        {
          question: "2. 平均说来， 在过去1周中， 当你早上醒来时， 你的哮喘症状平均有多严重？",
          value: [
            "没有症状",
            "很轻微的症状",
            "轻微的症状",
            "中等程度的症状",
            "较严重的症状",
            "严重的症状",
            "很严重的症状 ",
          ]
        },
        {
          question:
            "3.总体来说， 在过去1周中， 你的日常活动因哮喘受到何种程度的限制？",
          value: [
            "无任何限制 ",
            "很轻微地受限制",
            "轻微受限制",
            "中等度受限制",
            "很受限制",
            "极度受限制",
            "完全受限制",
          ]
        },
        {
          question:
            "4.总体来说， 在过去1周中， 你因为哮喘而呼吸困难吗？",
          value: [
            "没有呼吸困难 ",
            "很少呼吸困难",
            "有些呼吸困难",
            "中等程度呼吸困难",
            "较严重的呼吸困难",
            "很严重呼吸困难",
            "非常严重的呼吸困难 ",
          ]
        },
        {
          question: "5.总体来说， 在过去1周中， 你有多少时候出现喘息？",
          value: ["没有 ", "几乎没有", "有些时候", "经常", "许多时候","绝大部分时间","所有时间"]
        },
        {
          question: "6.平均说来， 在过去1周中， 你每天使用多少次 （喷） 短效支气管舒张剂 （如万托林、舒喘灵）",
          value: ["没有 ", "1－2喷", "3－4喷", "5－8喷", "9－12喷","13－16喷","16喷以上"]
        },
        {
          question: "7.支气管舒张剂使用前FEV1：(    )      FEV1预计值：(   )       FEV1占预计值百分比 : (   )",
          value: [">95%预计值", "95-90％", "89-80％", " 79-70％", "69-60％","59-50%","<50%预计值"]
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
      if (this.state.answerdata[z]==null) {
        alert('请回答第' +(z+1)+ '道题' );
        return;
      }
      score += this.state.answerdata[z];
    }
    this.state.score = Math.floor(score/this.state.answerdata.length * 100) / 100;
    this.state.scoreAlertShow = true;
    this.setState(this.state);
  }
  HandleScoreAlertShow(boolean) {
    this.state.scoreAlertShow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.AnswerBox} ref={'answerbox'}>
        {this.state.scoreAlertShow ? (
          <div className={style.AlertBox}>
            <div className={style.Alert}>
              <div
                className={style.ReturnBack}
                onClick={this.HandleScoreAlertShow.bind(this, false)}>
                <img src={returnbutton} alt="" />
              </div>
              平均分值：<div className={style.Score}>{this.state.score}</div>{" "}
              {this.state.score < 0.75
                ? "哮喘已完全得到控制"
                : this.state.score >1.5
                ? "哮喘未得到控制"
                : "哮喘得到良好控制"}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.RowTextBox}>
          哮喘控制问卷（ACQ）包括7个最具代表性的问题，每个问题的得分从0-6，分7个等级。ACQ-5:ACQ问卷中的前5个问题即构成ACQ-5问卷
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>评估方法</span>
          :前6道题由患者自己完成，最后一道肺功能测试由医务人员填写。对这7个问题的评分取均值，即得到患者的ACQ得分。
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>评定标准</span>
          :7个问题的平均分值＜0.75分表示哮喘已完全得到控制，0.75~1.50分表示哮喘得到良好控制，＞1.50分表示哮喘未得到控制。
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>适用人群</span>
          :更适合于哮喘专科医生的门诊应用。
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>特点</span>
          ：该问卷基本是由知名哮喘专家完成，且附有肺功能的检测情况，所获得的信息量较全面，不仅有患者的生活质量受影响情况，还有客观的肺功能指标。该问卷不太适合患者自我评估，且定性多于定量，主观影响更多。
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
export default AsthmaAnswerACQ;
