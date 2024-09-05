import React, { FC } from "react";
import NavBarAction from "../components/NavBarAction";
import SelectBarBox from "../components/SelectBarBox";

import "./Monitor.less";
import SlotBox from "../components/SlotBox";

import WaterSrc from "../assets/images/water-icon.png";
import FlvPlayer from "../components/FlvPlayer";

const Monitor: FC = function Monitor() {
  const flvSrc = "http://47.106.33.141:8080/live/plants.flv";

  return (
    <div className="monitor-box">
      <NavBarAction title="监控管理" />
      <div className="monitor-items">
        <div className="items_bar">
          <SelectBarBox />
          <span className="ups">监控小窗模式</span>
        </div>
        <div className="items_con">
          <FlvPlayer url={flvSrc} />
        </div>
      </div>
      <div className="abnormalBox">
        <p className="abnormal_title">异常信息</p>
        <SlotBox>
          <div className="abnormal-item">
            <div className="abnormal-item-fl">
              <img src={WaterSrc} alt="" />
              <p>
                03号大棚土壤湿度<span className="redColor">过高</span>
              </p>
            </div>
            <p className="check">查看</p>
          </div>
        </SlotBox>
        <SlotBox>
          <div className="abnormal-item">
            <div className="abnormal-item-fl">
              <img src={WaterSrc} alt="" />
              <p>
                03号大棚土壤湿度<span className="redColor">过高</span>
              </p>
            </div>
            <p className="check">查看</p>
          </div>
        </SlotBox>
      </div>
    </div>
  );
};

export default Monitor;
