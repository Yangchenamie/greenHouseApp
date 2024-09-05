import React, { FC, useEffect, useState } from "react";
import { Pie, Rose } from "@ant-design/plots";
import NavBarAction from "../components/NavBarAction";
import SlotBox from "../components/SlotBox";
import "./Abnormal.less";

import WaterSrc from "../assets/images/water-icon.png";
import { JumboTabs } from "antd-mobile";
import useWebSocket from "../assets/webSocket";

const pie_data = [
  {
    type: "设备正常",
    value: 27,
  },
  {
    type: "设备异常",
    value: 25,
  },
];

const rose_data = [
  {
    type: "分类一",
    value: 66.6,
  },
  {
    type: "分类二",
    value: 33.3,
  },
  {
    type: "分类三",
    value: 33.3,
  },
];
const pie_config = {
  appendPadding: 10,
  data: pie_data,
  angleField: "value",
  colorField: "type",
  radius: 0.8,
  height: 141,
  interactions: [
    {
      type: "pie-legend-active",
    },
    {
      type: "element-active",
    },
  ],
};
const rose_config = {
  data: rose_data,
  xField: "type",
  yField: "value",
  seriesField: "type",
  radius: 0.9,
  height: 300,
  interactions: [
    {
      type: "element-active",
    },
  ],
  label: {
    offset: -15,
  },
};

const Abnormal: FC = function Abnormal() {
  const [abnormalList, setAbnormalList] = useState<string[]>([]),
    [count, setCount] = useState(0);

  // websocket
  const [webSocket, sendMessage, isConnected] = useWebSocket({
    url: "ws://47.106.33.141:8062/ws",
    onOpen: () => {
      //连接成功
      console.log("WebSocket connected");
    },
    onClose: () => {
      //连接关闭
      console.log("WebSocket disconnected");
    },
    onError: (event: any) => {
      //连接异常
      console.error("WebSocket error:", event);
    },
    onMessage: (message) => {
      //收到消息
      console.log("WebSocket received message:", message);

      let val: string = "";
      if (typeof message === "string") {
        val = message;
      }
      console.log(typeof message);

      if (typeof message === "object") {
        val = message.chatMsg.msg;
      }

      const res = val.split(",");

      setAbnormalList([...abnormalList, ...res]);
    },
  });

  const send = () => {
    if (count === 0) {
      sendMessage({
        action: 1,
        chatMsg: {
          senderId: 2,
          receiverId: 2024,
          msg: "null",
          msgId: "null",
        },
        extand: "null",
      });
    }
    setCount(1);
  };

  return (
    <div className="abnormal-box" onClick={send}>
      <NavBarAction title="异常管理" />
      <SlotBox title="设备异常">
        <div className="device-box">
          <div className="device-text">
            <p>当前异常：</p>
            <p>03号大棚1个灌溉器异常</p>
            <p className="repair">点此一键报修</p>
          </div>
          <div className="device-charts">
            <Pie {...pie_config} />
            <p>目前设备情况</p>
          </div>
        </div>
      </SlotBox>
      <SlotBox title="数据异常">
        <div className="data-box">
          <ul>
            {abnormalList.map((item, index) => {
              return index % 2 === 0 ? (
                <li>
                  <img src={WaterSrc} alt="" />
                  <div>
                    <p>
                      {item}
                      <span className="redColor">
                        {item.slice(item.length - 2)}
                      </span>
                    </p>
                    <p className="redColor">{abnormalList[index + 1]}</p>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </SlotBox>
      <SlotBox title="异常分析">
        <div className="analysis-box">
          <JumboTabs>
            <JumboTabs.Tab
              title="年报"
              description=""
              key="year"
              className="active"
            >
              <div className="analysis-chart">
                <p className="analysis_num">
                  本月异常共有<span className="num">3</span>处
                </p>
                <Rose {...rose_config} className="rose_chart" />
                <p className="analysis-title">本月异常分析</p>
              </div>
            </JumboTabs.Tab>
            <JumboTabs.Tab title="季报" description="" key="season">
              西红柿
            </JumboTabs.Tab>
            <JumboTabs.Tab title="月报" description="" key="month">
              蚂蚁
            </JumboTabs.Tab>
            <JumboTabs.Tab title="日报" description="" key="day">
              蚂蚁
            </JumboTabs.Tab>
          </JumboTabs>
        </div>
      </SlotBox>
    </div>
  );
};

export default Abnormal;
