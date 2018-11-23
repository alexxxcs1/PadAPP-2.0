import React, { Component } from "react";
import style from "./AsthmaAnswerAQLQ.scss";
import RowQuestionBox from "../components/RowQuestionBox";
import returnbutton from "./img/return.png";

export class AsthmaAnswerAQLQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      scoreAlertShow: false,
      activeOption: [
        "（1）骑自行车",
        "（2）室内打扫",
        "（3）推自行车",
        "（4）快步走",
        "（5）慢步走",
        "（6）儿童游戏",
        "（7）唱歌",
        "（8）跳舞",
        "（9）亲戚家、朋友家串门",
        "（10）乘公共汽车",
        "（11）上楼梯或爬坡",
        "（12）日常身体锻炼",
        "（13）搽地板",
        "（14）闲聊",
        "（15）商店购物"
      ],
      resultOption: [
        "1）完全受限",
        "2）极度受限",
        "3）重度受限",
        "4）中度受限",
        "5）轻度受限",
        "6）很少受限",
        "7）受限"
      ],
      resultOption2: [
        "1）一直",
        "2）非常频繁",
        "3）频繁",
        "4）经常化",
        "5）有时侯",
        "6）偶尔",
        "7）从未有"
      ],
      answerBindPos: [null, null],
      answer: [
        [null, null, null, null, null],
        [null, null],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ]
      ],
      questionend:[
        '在上2周中，您因身边或周围环境中香烟气味而走开；',
        '在上2周中，您因身边或周围环境中有异味或香水味而走开',
        '在上2周中，您因身边或周围环境中灰尘而走开',
        '在上2周中，您因身边或周围环境中有煤烟味或炒菜油烟而走开；',
        '在上2周中，悠因身边或周围环境中烟雾或气候变化而被迫呆在家中或被迫外出；',
        '在上2周中，您常因哮喘而上气不接下气；',
        '在上2周中，您的气喘发作是',
        '在上2周中，您因咳嗽而觉得不适；',
        '在上2周中，您有窒息感或濒死感；',
        '在上2周中，您觉得胸闷；',
        '在上2周中，您在早晨醒来时哮喘发作；',
        '在上2周中，您因哮喘发作而惊醒',
        '在上2周中，您因哮喘发作而影响睡眠；',
        '在上2周中，您因哮喘发作而心情烦躁',
        '在上2周中，您因哮喘而感到悲观或心情压抑',
        '在上2周中，您因哮喘反复发作而对治疗失去信心',
        '在上2周中，您当着别人面吸入气雾剂感到难为情',
        '在上2周中，您总担心身边没有哮喘防治药物',
        '在上2周中，您担心哮喘发作；',
        '在上2周中，您因接触到香烟而引起哮喘发作；',
        '在上2周中，您因灰尘引起的哮喘发作；',
        '在上2周中，您因接触到煤烟气味或炒菜油烟引起的哮喘发作；',
        '在上2周中，您因接触到异味或香水味引起哮喘发作；',
        '在上2周中，您因气候变化或烟雾引起哮喘发作；',
        '在上2周中，您因哮喘担心目前的健康状况',
        '在上2周中，您因哮喘担心将来的健康状况；',
        '在上2周中，您担心哮喘缩短自己的寿命；',
        '在上2周中，您担心自己对药物有依赖；',
      ]
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.HandleScoreAlertShow = this.HandleScoreAlertShow.bind(this);
    this.createOptionButton = this.createOptionButton.bind(this);
    this.createResultButton = this.createResultButton.bind(this);
    this.createQuestionSelect = this.createQuestionSelect.bind(this);
    this.bindData = this.bindData.bind(this);
    this.blurData = this.blurData.bind(this);
    this.changeStateValue = this.changeStateValue.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  onSubmit() {}
  HandleScoreAlertShow(boolean) {
    this.state.scoreAlertShow = boolean;
    this.setState(this.state);
  }
  createOptionButton() {
    if (this.state.activeOption.length == 0) return;
    var cont = this;
    var itemNodes = this.state.activeOption.map(function(itemBase, index) {
      return (
        <div className={style.ButtonBox} style={{ width: "33%" }}>
          <div className={style.OptionButton}>{itemBase}</div>
        </div>
      );
    });
    return itemNodes;
  }
  createResultButton(key) {
    switch (key) {
      case 0:
        if (this.state.resultOption.length == 0) return;
        var cont = this;
        var itemNodes = this.state.resultOption.map(function(itemBase, index) {
          return (
            <div className={style.ButtonBox} style={{ width: "33%" }}>
              <div
                className={[style.OptionButton, style.resultButton].join(" ")}>
                {itemBase}
              </div>
            </div>
          );
        });
        return itemNodes;
      case 1:
        if (this.state.resultOption2.length == 0) return;
        var cont = this;
        var itemNodes = this.state.resultOption2.map(function(itemBase, index) {
          return (
            <div className={style.ButtonBox} style={{ width: "33%" }}>
              <div
                className={[style.OptionButton, style.resultButton].join(" ")}>
                {itemBase}
              </div>
            </div>
          );
        });
        return itemNodes;

      default:
        break;
    }
  }
  bindData(posindex) {
    console.log(posindex);

    this.state.answerBindPos = posindex;
    this.setState(this.state);
  }
  blurData() {
    this.state.answerBindPos = [null, null];
    this.setState(this.state);
  }
  changeStateValue(value) {
    if (
      this.state.answerBindPos[0] != null &&
      this.state.answerBindPos[1] != null
    ) {
      this.state.answer[this.state.answerBindPos[0]][
        this.state.answerBindPos[1]
      ] = value;
      this.setState(this.state);
    }
  }
  createQuestionSelect(key) {
    switch (key) {
      case 0:
        if (this.state.answer[0].length == 0) return;
        var cont = this;
        var itemNodes = this.state.answer[0].map(function(itemBase, index) {
          return (
            <div className={style.RowSelect}>
              {index + 1}.在上2周中，
              <div className={style.activeSelectInput}>
                <input type="text" />
              </div>
              受哮喘的影响如何？
              <div
                className={style.activeSelectOption}
                tabIndex="-1"
                onFocus={cont.bindData.bind(cont, [0, index])}
                onBlur={cont.blurData}>
                {cont.state.resultOption[cont.state.answer[0][index]]}
                <div className={style.ActiveDropBox}>
                  <div onClick={cont.changeStateValue.bind(cont, 0)}>
                    {" "}
                    1）完全受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 1)}>
                    {" "}
                    2）极度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 2)}>
                    {" "}
                    3）重度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 3)}>
                    {" "}
                    4）中度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 4)}>
                    {" "}
                    5）轻度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 5)}>
                    {" "}
                    6）很少受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 6)}>
                    {" "}
                    7）受限
                  </div>
                </div>
              </div>
            </div>
          );
        });
        return itemNodes;
      case 1:
        if (this.state.answer[1].length == 0) return;
        var cont = this;
        var itemNodes = this.state.answer[1].map(function(itemBase, index) {
          return (
            <div className={style.RowSelect}>
              {6 + index}.
              {index == 0
                ? "上2周在您必须参加的活动中，哮喘对您的影响程度是"
                : "上2周中，您应该参加的活动中，受哮喘的影响如何"}
              <div
                className={style.activeSelectOption}
                tabIndex="-1"
                onFocus={cont.bindData.bind(cont, [1, index])}
                onBlur={cont.blurData}>
                {cont.state.resultOption[cont.state.answer[1][index]]}
                <div className={style.ActiveDropBox}>
                  <div onClick={cont.changeStateValue.bind(cont, 0)}>
                    {" "}
                    1）完全受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 1)}>
                    {" "}
                    2）极度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 2)}>
                    {" "}
                    3）重度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 3)}>
                    {" "}
                    4）中度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 4)}>
                    {" "}
                    5）轻度受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 5)}>
                    {" "}
                    6）很少受限
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 6)}>
                    {" "}
                    7）受限
                  </div>
                </div>
              </div>
            </div>
          );
        });
        return itemNodes;
      case 2:
        if (this.state.answer[2].length == 0) return;
        var cont = this;
        var itemNodes = this.state.answer[2].map(function(itemBase, index) {
          return (
            <div className={style.RowSelect}>
              <div style={{flexGrow:'1'}}>{8 + index}.{cont.state.questionend[index]}</div>
              <div
                style={{flexShrink:'0'}}
                className={style.activeSelectOption}
                tabIndex="-1"
                onFocus={cont.bindData.bind(cont, [2, index])}
                onBlur={cont.blurData}>
                {cont.state.resultOption2[cont.state.answer[2][index]]}
                <div className={style.ActiveDropBox}>
                  <div onClick={cont.changeStateValue.bind(cont, 0)}>
                    {" "}
                    1）一直
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 1)}>
                    {" "}
                    2）非常频繁
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 2)}>
                    {" "}
                    3）频繁
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 3)}>
                    {" "}
                    4）经常化
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 4)}>
                    {" "}
                    5）有时侯
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 5)}>
                    {" "}
                    6）偶尔
                  </div>
                  <div onClick={cont.changeStateValue.bind(cont, 6)}>
                    {" "}
                    7）从未有
                  </div>
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
          哮喘生存质量量表（AQLQ）内容包括5个面:活动受限（12项）、哮喘症状（8项）、对刺激原反应（6项）、心理情绪（5项）、自我健康的关心（4项）共计35条项目，原采用7分制现改为5分制评分方法，评分越低，受影响程度越重。该量表常用于科研。
        </div>
        <div className={style.RowTextBox}>
          AQLQ包括35个项目，包括活动受限（1～12），哮喘症状（13-21），心理状况（22-26），对刺激原的反应（27-31），对自身健康的关心（32—35）。
        </div>
        <div className={style.RowTextBox}>
          按7分制评分，1分为最差，7分为最好，请逐项选钩
        </div>
        <div className={style.RowTextBox}>
          下面是人们最常见的日常活动，请指出您平时最经常参与的5项活动，若您平时生活中的活动未列于下列表中，请您另选，然后将您选出的5个项目填到下列5个空格中，并逐项打分
        </div>

        <div className={[style.ContentBox, style.OptionBox].join(" ")}>
          {this.createOptionButton()}
        </div>
        <div className={style.RowTextBox}>第1-7个问题的选项均为:</div>
        <div className={[style.ContentBox].join(" ")}>
          {this.createResultButton(0)}
        </div>

        <div className={style.ContentBox}>{this.createQuestionSelect(0)}</div>
        <div className={style.ContentBox}>{this.createQuestionSelect(1)}</div>
        <div className={style.RowTextBox}>第8-35个问题的选项均为:</div>
        <div className={[style.ContentBox].join(" ")}>
          {this.createResultButton(1)}
        </div>
        <div className={style.ContentBox}>{this.createQuestionSelect(2)}</div>

        <div className={style.SubmitBox}>
          <div className={style.SubmitButton} onClick={this.onSubmit}>
            提交
          </div>
        </div>
      </div>
    );
  }
}
export default AsthmaAnswerAQLQ;
