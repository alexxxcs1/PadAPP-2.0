import React, { Component } from "react";
import style from "./GsoAnswerCheckList.scss";
import LayerBox from "./components/LayerBox";
import html2canvas from 'html2canvas';
import websqlapi from 'common/websqlapi'

export class GsoAnswerCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refreshProps = this.refreshProps.bind(this);
    this.savetoCollection = this.savetoCollection.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  savetoCollection(){
    html2canvas(this.refs.checklist,{
      scale:1,
    }).then(canvas => {
      websqlapi.savetoCollection({id:new Date().getTime(),route:window.location.hash,value:canvas.toDataURL("image/jpg")},()=>{
        alert('已保存至收藏');
      });
    });
  }
  render() {
    return (
      <div className={style.AnswerBox}>
        <div className={style.CheckListBox} ref={'checklist'}>
          <div className={style.TableTitle}>GSO 评估 Check List</div>
          <div className={style.FillerInfo}>
            <LayerBox width={18}>
              <div className={style.LeftTitle} />
            </LayerBox>

            <LayerBox width={82} flexdirection="column">
              <LayerBox width={100} height={54}>
                <LayerBox width={72} flexdirection="column">
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>实地协访日期：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>代表姓名：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>观察者/辅导者姓名：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>BU / 产品：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>区域/城市：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>拜访医生数量：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                </LayerBox>
                <LayerBox width={28}>
                  <div className={style.placeholderBox}>
                    <span> 每次拜访后各项达成情况</span>
                    <span>可在此列打勾标记</span>
                  </div>
                </LayerBox>
              </LayerBox>
              <LayerBox width={100} height={9}>
                <div className={style.RowTitleRect}>VEEVA Report</div>
              </LayerBox>
              <LayerBox width={100} height={36}>
                <LayerBox width={72} flexdirection="column">
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>观察拜访数量：</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      %获取最佳拜访成果 (GSO)
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      %商业导向拜访目标 (CoCo)
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      %S锁定生意机会点 (SOB)
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                </LayerBox>
                <LayerBox width={28} flexdirection="column">
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                </LayerBox>
              </LayerBox>
            </LayerBox>
          </div>
          <div className={style.targetInfo}>
            <LayerBox width={18}>
              <div
                className={style.LeftTitle}
                style={{ background: "#501F7F" }}>
                <span>COCO</span>
                <span>商业导向拜访目标</span>
              </div>
            </LayerBox>

            <LayerBox width={82} flexdirection="column">
              <LayerBox width={100} height={21}>
                <div className={style.RowTitleRect}>
                  访前准备（商业导向目标）
                </div>
              </LayerBox>
              <LayerBox width={100} height={79}>
                <LayerBox width={72} flexdirection="column">
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>关联上一次拜访</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>锁定目标患者群</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>品牌关键信息</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>替代方案</div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                </LayerBox>
                <LayerBox width={28} flexdirection="column">
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                </LayerBox>
              </LayerBox>
            </LayerBox>
          </div>
          <div className={style.SobInfo}>
            <LayerBox width={18}>
              <div
                className={style.LeftTitle}
                style={{ background: "#501F7F" }}>
                <span>COCO</span>
                <span>商业导向拜访目标</span>
              </div>
            </LayerBox>

            <LayerBox width={82} flexdirection="column">
              <LayerBox width={100} height={7.4}>
                <div className={style.RowTitleRect}>开场白</div>
              </LayerBox>
              <LayerBox width={100} height={9.5}>
                <LayerBox width={72} flexdirection="column">
                  <div className={style.InputRowBox} style={{ height: "42px" }}>
                    <div className={style.InputTitle}>
                      阐述拜访目的, 与coco保持一致（竞品、目标患者和拜访目标）
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                </LayerBox>
                <LayerBox width={28} flexdirection="column">
                  <div
                    className={style.InputRowBox}
                    style={{ style: "100%" }}
                  />
                </LayerBox>
              </LayerBox>
              <LayerBox width={100} height={7.4}>
                <div className={style.RowTitleRect}>发现机会</div>
              </LayerBox>
              <LayerBox width={100} height={79.2} flexdirection="column">
                <LayerBox width={100} height={10}>
                  <div
                    className={style.RowTitleRect}
                    style={{ background: "#E9E3F1", color: "#501F7F" }}>
                    有洞察力的提问
                  </div>
                </LayerBox>
                <LayerBox width={100} height={40}>
                  <LayerBox width={72} flexdirection="column">
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>
                        探询客户使用竞品的用法用量
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>
                        理解患者/ HCP的治疗期望（诊疗目标）
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>
                        了解客户使用竞品的原因（诊疗现状）
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div
                      className={style.InputRowBox}
                      style={{ height: "42px" }}>
                      <div className={style.InputTitle}>
                        理解实现患者/客户治疗目标的障碍（明确诊疗痛点）
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                  </LayerBox>
                  <LayerBox width={28} flexdirection="column">
                    <div className={style.InputRowBox} />
                    <div className={style.InputRowBox} />
                    <div className={style.InputRowBox} />
                    <div
                      className={style.InputRowBox}
                      style={{ height: "42px" }}
                    />
                  </LayerBox>
                </LayerBox>
                <LayerBox width={100} height={10}>
                  <div
                    className={style.RowTitleRect}
                    style={{ background: "#E9E3F1", color: "#501F7F" }}>
                    对接品牌处理异议
                  </div>
                </LayerBox>
                <LayerBox width={100} height={40}>
                  <LayerBox width={72} flexdirection="column">
                    <div
                      className={style.InputRowBox}
                      style={{ height: "42px" }}>
                      <div className={style.InputTitle}>
                        讨论而不是告知(在整个拜访中与医生的互动分享至少40-50%)
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>
                        目标患者群/合适的患者群
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>明确替代的竞品</div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={style.InputRowBox}>
                      <div className={style.InputTitle}>
                        向客户传递与市场策略相匹配的关键信息
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                      <div className={style.InputDetial}>
                        <input type="text" />
                      </div>
                    </div>
                  </LayerBox>
                  <LayerBox width={28} flexdirection="column">
                    <div
                      className={style.InputRowBox}
                      style={{ height: "42px" }}
                    />
                    <div className={style.InputRowBox} />
                    <div className={style.InputRowBox} />
                    <div className={style.InputRowBox} />
                  </LayerBox>
                </LayerBox>
              </LayerBox>
            </LayerBox>
          </div>
          <div className={style.GsoInfo}>
            <LayerBox width={18}>
              <div
                className={style.LeftTitle}
                style={{ background: "#501F7F" }}>
                <span>GSO</span>
                <span>行为改变的缔结</span>
              </div>
            </LayerBox>

            <LayerBox width={82} flexdirection="column">
              <LayerBox width={100} height={21}>
                <div className={style.RowTitleRect}>行为改变的缔结</div>
              </LayerBox>
              <LayerBox width={100} height={79}>
                <LayerBox width={72} flexdirection="column">
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      客户同意在特定的患者群使用GSK的产品（开始处方，增加处方）
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      跟进提问确保使用 （何时、如何、什么、为什么）
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                  <div className={style.InputRowBox}>
                    <div className={style.InputTitle}>
                      同意与同事分享他的经验
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                    <div className={style.InputDetial}>
                      <input type="text" />
                    </div>
                  </div>
                </LayerBox>
                <LayerBox width={28} flexdirection="column">
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                  <div className={style.InputRowBox} />
                </LayerBox>
              </LayerBox>
            </LayerBox>
          </div>
          <div className={style.OtherInfo}>
            <LayerBox width={18}>
              <div
                className={style.LeftTitle}
                style={{ background: "#501F7F" }}
              />
            </LayerBox>

            <LayerBox width={82} flexdirection="column">
              <LayerBox width={100} height={30}>
                <div className={style.RowTitleRect}>其他建议</div>
              </LayerBox>
              <LayerBox width={100} height={70}>
                  <textarea className={style.textareaBox} name="" id="" cols="100" rows="10" />
              </LayerBox>
            </LayerBox>
          </div>
        </div>
        <div className={style.clicktosave} onClick={this.savetoCollection}>一键保存</div>
      </div>
    );
  }
}
export default GsoAnswerCheckList;
