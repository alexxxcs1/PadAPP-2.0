import React, { Component } from "react";
import style from "./RowQuestionBox.scss";

export class RowQuestionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      selected: null,
      color:'#fff',
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createValue = this.createValue.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    this.state.value =
      this.props.value != undefined ? props.value : this.state.value;
    this.state.selected = props.selected!=undefined?props.selected:this.state.selected;
    this.state.color = props.color!=undefined?props.color:this.state.color;

    
    this.setState(this.state);
  }
  createValue() {
    if (this.state.value.length == 0) return;
    var cont = this;
    var itemNodes = this.state.value.map(function(itemBase, index) {
      return (
        <div
          key={'answer'+index}
          onClick={cont.onSelect.bind(cont, index)}
          className={[
            style.AnswersButton,
            cont.state.selected == index ? style.activAnswer : ""
          ].join(" ")}
          style={{
            minWidth: "calc(" + 100 / cont.state.value.length + "%" + " - 40px)",
            color:cont.state.color,
          }}>
          {itemBase}
        </div>
      );
    });
    return itemNodes;
  }
  onSelect(index) {
    if (this.props.onSelect == undefined) return;
    this.props.onSelect(index);
  }
  render() {
    return (
      <div className={style.RowQuestionBox}>
        <div className={style.Question}>{this.props.question}</div>
        <div className={style.AnswersButtonGroup}>{this.createValue()}</div>
      </div>
    );
  }
}
export default RowQuestionBox;
