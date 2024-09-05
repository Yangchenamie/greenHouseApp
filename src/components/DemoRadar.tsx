import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const DemoRadar = () => {
  const option = {
    tooltip: {},
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "销售（sales）", max: 6500 },
        { name: "管理（Administration）", max: 16000 },
        { name: "信息技术（Information Techology）", max: 30000 },
        { name: "客服（Customer Support）", max: 38000 },
        { name: "研发（Development）", max: 52000 },
        { name: "市场（Marketing）", max: 25000 },
      ],
    },
    series: [
      {
        name: "预算 vs 开销（Budget vs spending）",
        type: "radar",
        // areaStyle: {normal: {}},
        data: [
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: "实际开销（Actual Spending）",
          },
        ],
      },
    ],
  };

  let timer: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  const loadingOption = {
    text: "加载中...",
    color: "#4413c2",
    textColor: "#270240",
    maskColor: "rgba(194, 88, 86, 0.3)",
    zlevel: 0,
  };

  function onChartReady(echarts: { hideLoading: () => void; }) {
    timer = setTimeout(function () {
      echarts.hideLoading();
    }, 2000);
  }

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}
      onChartReady={onChartReady}
      loadingOption={loadingOption}
      showLoading={true}
    />
  );
};

export default DemoRadar;
