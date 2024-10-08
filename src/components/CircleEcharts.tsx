import { FC } from "react";
import ReactECharts from "echarts-for-react";

const CircleEcharts: FC = () => {
  // mock数据
  const mockData = {
    value: 85,
    name: "得分",
  };
  // 渐变色
  var color = [
    { offset: 0, color: "rgba(15, 255, 171, 0.2)" },
    { offset: 0.6, color: "rgba(15, 255, 171, 0.6)" },
    { offset: 0.95, color: "rgba(15, 255, 171, 0.7)" },
    { offset: 1, color: "rgba(15, 255, 171, 0.9)" },
  ];

  // 圆环宽度
  const barMaxWidth = 40;

  // 坐标轴
  const angleAxis = {
    show: false,
    max: (100 * 360) / 270,
    type: "value",
    startAngle: 225,
    splitLine: { show: false },
  };

  // 坐标轴
  const radiusAxis = {
    show: false,
    type: "category",
  };

  //圆环位置和大小
  const polar = {
    center: ["50%", "50%"],
    radius: "135%",
  };
  const series = [
    {
      type: "bar",
      data: [
        {
          //上层圆环，显示数据
          value: mockData.value,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: color,
            },
          },
        },
      ],
      label: {
        show: true,
        formatter: (params: { value: any; }) => {
          return `{a|${params.value}}\n\n\n{c|${mockData.name}}`;
        },
        rich: {
          a: { fontSize: 48, verticalAlign: "center" },
          c: { fontSize: 28 },
        },
      },
      barGap: "-100%",
      coordinateSystem: "polar",
      roundCap: true,
      z: 2,
    },
    {
      type: "bar",
      data: [
        {
          value: 100,
          itemStyle: { color: "rgba(168, 255, 255, .35)" },
        },
      ],
      barGap: "-100%",
      coordinateSystem: "polar",
      roundCap: true,
      z: 1,
    },
  ];
  // 渲染
  const option = {
    barMaxWidth,
    radiusAxis,
    polar,
    angleAxis,
    series,
  };
  return <ReactECharts option={option}></ReactECharts>;
};

export default CircleEcharts;
