import React, { Component } from "react";
import style from "./AsthmaAnswerATAQ.scss";
import RowQuestionBox from "../components/RowQuestionBox";
import returnbutton from "./img/return.png";

export class AsthmaAnswerATAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      scoreAlertShow: false,
      questiondata: [
        [
          "a.是否 在活动时出现喘息或者呼吸困难？",
          "b.是否在白天不活动时出现喘息？",
          "c.晚上是否因为喘息或者呼吸困难而醒来？",
          "d.是否因为哮喘而不能去上学？",
          "e.是否因为哮喘而不能进行日常活动？（比如玩耍，去朋友家，或者任何家庭活动）"
        ],
        ["2.您的孩子是否使用吸入装置或者雾化装置来快速缓解哮喘症状？"],
        [
          {
            question:
              "如果回答为“是”那么在过去4周内您的孩子在使用吸入装置或者雾化装置时，在1天内最多使用几次？",
            value: ["0次", "1-2次", "3-4次", "5-6次", "6次以上"]
          }
        ],
        ["3.您是否认为您的孩子的哮喘情况在过去4周内控制良好？"]
      ],
      answerdata: [[null, null, null, null, null], [null], [null], [null]]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.initAnswerdata = this.initAnswerdata.bind(this);
    this.onQuestionAnswerSelect = this.onQuestionAnswerSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.HandleScoreAlertShow = this.HandleScoreAlertShow.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.HandleAnswer = this.HandleAnswer.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.initAnswerdata();
  }
  initAnswerdata() {
    this.state.answerdata = [
      [null, null, null, null, null],
      [null],
      [null],
      [null]
    ];
    this.setState(this.state);
  }
  onQuestionAnswerSelect(index, result) {
    this.state.answerdata[index] = result;
    this.setState(this.state);
  }
  refreshProps(props) {}
  onSubmit() {
    let score = 0;
    for (let z = 0; z < this.state.answerdata.length; z++) {
      for (let x = 0; x < this.state.answerdata[z].length; x++) {
        if (this.state.answerdata[z][x] == null) {
          alert("请回答第" + (z + 1) + "道题的第");
          return;
        }

        switch (z) {
          case 0:
            if (this.state.answerdata[z][x] == 0) {
              score = 1;
            }
            break;
          case 1:
            if (this.state.answerdata[z][x] == 0) {
              score +=1;
            }
            break;
          case 2:
            if (this.state.answerdata[z][x] != 0) {
              score +=1;
            }
            break;
          case 3:
            if (this.state.answerdata[z][x] == 0) {
              score += 1;
            }
            break;
          default:
            break;
        }
      }
    }
    this.state.score = score;
    this.state.scoreAlertShow = true;
    this.setState(this.state);
  }
  HandleScoreAlertShow(boolean) {
    this.state.scoreAlertShow = boolean;
    this.setState(this.state);
  }
  HandleAnswer(pos, value) {
    this.state.answerdata[pos[0]][pos[1]] = value;
    this.setState(this.state);
  }
  createQuestion(index) {
    switch (index) {
      case 0:
        if (this.state.questiondata[0].length == 0) return;
        var cont = this;
        var itemNodes = this.state.questiondata[0].map(function(
          itemBase,
          index
        ) {
          return (
            <div className={style.InLineQuestionBox}>
              <div className={style.questionTitle}>{itemBase}</div>
              <div className={style.questionButtonGroup}>
                <div
                  onClick={cont.HandleAnswer.bind(this, [0, index], 0)}
                  className={[
                    style.Button,
                    cont.state.answerdata[0][index] == 0 ? style.ActButton : ""
                  ].join(" ")}>
                  是
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [0, index], 1)}
                  className={[
                    style.Button,
                    cont.state.answerdata[0][index] == 1 ? style.ActButton : ""
                  ].join(" ")}>
                  否
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [0, index], 2)}
                  className={[
                    style.Button,
                    cont.state.answerdata[0][index] == 2 ? style.ActButton : ""
                  ].join(" ")}>
                  不确定
                </div>
              </div>
            </div>
          );
        });
        return itemNodes;
      case 1:
        if (this.state.questiondata[1].length == 0) return;
        var cont = this;
        var itemNodes = this.state.questiondata[1].map(function(
          itemBase,
          index
        ) {
          return (
            <div
              className={style.InLineQuestionBox}
              style={{ margin: "30px 0px" }}>
              <div className={style.questionTitle}>
                <span className={style.BoldFont}>{itemBase}</span>
              </div>
              <div className={style.questionButtonGroup}>
                <div
                  onClick={cont.HandleAnswer.bind(this, [1, index], 0)}
                  className={[
                    style.Button,
                    cont.state.answerdata[1][index] == 0 ? style.ActButton : ""
                  ].join(" ")}>
                  是
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [1, index], 1)}
                  className={[
                    style.Button,
                    cont.state.answerdata[1][index] == 1 ? style.ActButton : ""
                  ].join(" ")}>
                  否
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [1, index], 2)}
                  className={[
                    style.Button,
                    cont.state.answerdata[1][index] == 2 ? style.ActButton : ""
                  ].join(" ")}>
                  不确定
                </div>
              </div>
            </div>
          );
        });
        return itemNodes;
      case 2:
        if (this.state.questiondata[2].length == 0) return;
        var cont = this;
        var itemNodes = this.state.questiondata[2].map(function(
          itemBase,
          index
        ) {
          return (
            <div style={{ fontWeight: "bold" }}>
              <RowQuestionBox
                question={itemBase.question}
                selected={cont.state.answerdata[2][index]}
                onSelect={cont.HandleAnswer.bind(this, [2, index])}
                value={itemBase.value}
                color="#4F1F7F"
              />
            </div>
          );
        });
        return itemNodes;
      case 3:
        if (this.state.questiondata[3].length == 0) return;
        var cont = this;
        var itemNodes = this.state.questiondata[3].map(function(
          itemBase,
          index
        ) {
          return (
            <div
              className={style.InLineQuestionBox}
              style={{ margin: "30px 0px" }}>
              <div className={style.questionTitle}>
                <span className={style.BoldFont}>{itemBase}</span>
              </div>
              <div className={style.questionButtonGroup}>
                <div
                  onClick={cont.HandleAnswer.bind(this, [3, index], 0)}
                  className={[
                    style.Button,
                    cont.state.answerdata[3][index] == 0 ? style.ActButton : ""
                  ].join(" ")}>
                  是
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [3, index], 1)}
                  className={[
                    style.Button,
                    cont.state.answerdata[3][index] == 1 ? style.ActButton : ""
                  ].join(" ")}>
                  否
                </div>
                <div
                  onClick={cont.HandleAnswer.bind(this, [3, index], 2)}
                  className={[
                    style.Button,
                    cont.state.answerdata[3][index] == 2 ? style.ActButton : ""
                  ].join(" ")}>
                  不确定
                </div>
              </div>
            </div>
          );
        });
        return itemNodes;
    }
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
              {this.state.score !=0
                ? "哮喘未得到控制，请咨询儿科医生。"
                : "哮喘完全控制"}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={style.RowTextBox}>
          哮喘治疗评估问卷（ATAQ）问卷包含4个问题，每个问题采用0-1分评分方法。总分为0-4分。0分表示哮喘控制；1-4分表示哮喘未控制
        </div>
        <div className={style.RowTextBox}>ATAQ问卷（哮喘治疗评估问卷）</div>
        <div className={style.RowTextBox}>由家长或孩子的监护人完成此问卷</div>
        <div className={style.RowTextBox}>
          每个问题只有1个答案，将得分（0分或1分）写在右侧的线上
        </div>
        <div className={style.RowTextBox}>
          <span className={style.BoldFont}>1.在过去的4周内您的孩子:</span>
        </div>

        {this.createQuestion(0)}
        {this.createQuestion(1)}
        {this.createQuestion(2)}
        {this.createQuestion(3)}

        <div className={style.SubmitBox}>
          <div className={style.SubmitButton} onClick={this.onSubmit}>
            提交
          </div>
        </div>
      </div>
    );
  }
}
export default AsthmaAnswerATAQ;
