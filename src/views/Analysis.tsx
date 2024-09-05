import React, { FC, useState } from "react";
import { Grid } from "antd-mobile";
import { Liquid, Line } from "@ant-design/plots";
import _ from "../assets/utils";

import NavBarAction from "../components/NavBarAction";
import "./Analysis.less";
import SlotBox from "../components/SlotBox";
import SelectBarBox from "../components/SelectBarBox";

const data = [
  {
    time: "0:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "0:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "1:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "1:00",
    value: 29,
    category: "室外空气温度",
  },
  {
    time: "2:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "2:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "3:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "3:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "4:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "4:00",
    value: 34,
    category: "室外空气温度",
  },
  {
    time: "5:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "5:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "6:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "6:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "7:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "7:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "8:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "8:00",
    value: 29,
    category: "室外空气温度",
  },
  {
    time: "9:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "9:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "10:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "10:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "11:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "11:00",
    value: 34,
    category: "室外空气温度",
  },
  {
    time: "12:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "12:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "13:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "13:00",
    value: 29,
    category: "室外空气温度",
  },
  {
    time: "14:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "14:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "15:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "15:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "16:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "16:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "17:00",
    value: 34,
    category: "室外空气温度",
  },
  {
    time: "17:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "18:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "18:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "19:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "19:00",
    value: 20,
    category: "室内空气温度",
  },
  {
    time: "20:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "20:00",
    value: 23,
    category: "室内空气温度",
  },
  {
    time: "21:00",
    value: 29,
    category: "室外空气温度",
  },
  {
    time: "21:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "22:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "22:00",
    value: 22,
    category: "室内空气温度",
  },
  {
    time: "23:00",
    value: 30,
    category: "室外空气温度",
  },
  {
    time: "23:00",
    value: 23,
    category: "室内空气温度",
  },
];

const liquid_config = {
  width: 100,
  height: 100,
  percent: 0.75,
  wave: {
    length: 128,
  },
  liquidStyle: {
    fill: "#56B790",
    stroke: "#93CCB5",
    fontSize: 120,
  },
};

const Analysis: FC = function () {
  let [lineData, setLineData] = useState(data);

  const config = {
    data: lineData,
    xField: "time",
    yField: "value",
    seriesField: "category",
    yAxis: {
      /*  label: {
        formatter: (v: number) => `${(v / 10e8).toFixed(1)} B`,
      }, */
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
    padding: [50, 22, 30, 30],
    position: "top-right",
  };

  return (
    <div className="analysisBox">
      <NavBarAction title="数据分析" />
      <div className="analysisTar">
        <SelectBarBox />
      </div>
      <div className="analysisItems">
        <div className="item">
          <p className="item-title">土壤</p>
          <SlotBox>
            <div className="item-box">
              <div className="liquid-box">
                <Liquid {...liquid_config} />
                <p>湿度</p>
              </div>
              <div className="item-text">
                <Grid columns={2} gap={10}>
                  <Grid.Item>
                    <div>
                      最高温度：<span>24.5°</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item>
                    <div>
                      PH值：<span>6.6</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item span={2}>
                    <div>
                      最低温度：<span>19.3°</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item span={2}>
                    <div>
                      平均温度：<span>20.4°</span>
                    </div>
                  </Grid.Item>
                </Grid>
              </div>
            </div>
          </SlotBox>
        </div>
        <div className="item">
          <p className="item-title">空气</p>
          <SlotBox>
            <div className="item-box">
              <div className="liquid-box">
                <Liquid {...liquid_config} />
                <p>湿度</p>
              </div>
              <div className="item-text">
                <Grid columns={2} gap={8}>
                  <Grid.Item>
                    <div>
                      最高温度：<span>24.5°</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item>
                    <div>
                      CO2浓度：<span>0.07%</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item>
                    <div>
                      最低温度：<span>19.3°</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item>
                    <div>
                      平均温度：<span>20.4°</span>
                    </div>
                  </Grid.Item>
                  <Grid.Item span={2}>
                    <div>
                      光照强度：<span>15027lux</span>
                    </div>
                  </Grid.Item>
                </Grid>
              </div>
            </div>
          </SlotBox>
        </div>
        <div className="changeBox">
          <SlotBox>
            <Line {...config} />
          </SlotBox>
        </div>
      </div>
    </div>
  );
};
export default Analysis;
