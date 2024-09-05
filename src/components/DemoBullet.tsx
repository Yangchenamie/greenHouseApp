import React from "react";
import ReactECharts from "echarts-for-react";
import styled from "styled-components";

const BulletBox = styled.div`
  .echarts-for-react  {
    height: 150px !important;
  }
`;

function generateBulletChart(
  title: string,
  categories: string[],
  actualValue: number,
  targetValue: number,
  ranges: number[]
) {
  return {
    title: {
      text: title,
    },

    yAxis: [
      {
        type: "category",
        data: categories,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      {
        type: "category",
        data: [""],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      formatter: "{a}: {c}",
    },
    grid: {
      containLabel: true,
      width: "99%",
      height: 100,
      left: 0,
    },
    legend: {
      data: [
        '',
        '',
        '',
        '',
        {
          name: '',
          icon: 'z',
        },
      ],
      selectedMode: false,
    },
    series: [
      {
        name: "差",
        data: [ranges[0]],
        type: "bar",
        yAxisIndex: 0,
        stack: "range",
        silent: true,
        barWidth: 30,
        color: "#F5B4AE",
      },
      {
        name: "良",
        data: [ranges[1]],
        type: "bar",
        yAxisIndex: 0,
        stack: "range",
        silent: true,
        barWidth: 30,
        color: "#FADCA9",
      },
      {
        name: "优",
        data: [ranges[2]],
        type: "bar",
        yAxisIndex: 0,
        stack: "range",
        silent: true,
        barWidth: 30,
        color: "#BFE9C3",
      },
      {
        name: "实际值",
        data: [actualValue],
        type: "bar",
        yAxisIndex: 1,
        barWidth: 20,
        color: "#434778",
        z: 3,
      },
      {
        name: "目标值",
        type: "scatter",
        symbol: "rect",
        symbolSize: [8, 40],
        data: [targetValue],
        color: "#000000",
        hoverAnimation: false,
        z: 4,
      },
    ],
  };
}

const option1 = generateBulletChart("", ["生长温度"], 75, 85, [60, 30, 10]);
const option2 = generateBulletChart("", ["CO2浓度"], 50, 60, [40, 30, 30]);
const option3 = generateBulletChart("", ["空气湿度"], 75, 85, [60, 30, 10]);
const option4 = generateBulletChart("", ["光照强度"], 50, 60, [40, 30, 30]);
const option5 = generateBulletChart("", ["肥料浓度"], 75, 85, [60, 30, 10]);
const option6 = generateBulletChart("", ["土壤湿度"], 50, 60, [40, 30, 30]);
const option7 = generateBulletChart("", ["生长状况"], 50, 60, [40, 30, 30]);
const data = [option1, option2, option3, option4, option5, option6, option7];

const DemoBullet: React.FC = () => {
  return (
    <BulletBox className="buller-box">
      {data.map((item,index) => {
        if(index ===0){
          item={
            ...item,
            legend: {
              data: [
                '差',
                '良',
                '优',
                '实际值',
                {
                  name: '目标值',
                  icon: 'path://M0 0M443.733333 0 h145.066667 v1024 H443.733333z',
                },
              ],
              selectedMode: false,
            },
          }
        }
        return <ReactECharts option={item} />;
      })}
    </BulletBox>
  );
};

export default DemoBullet;
