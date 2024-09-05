import React, { FC } from "react";
import { Image } from "antd-mobile";

import TabBarAction from "../components/TabBarAction";

import navTaskSrc from "../assets/images/task.png";
import navDataSrc from "../assets/images/data.png";
import navGreenSrc from "../assets/images/GreenHouse.png";
import navEquipmentSrc from "../assets/images/equipment.png";
import green1 from "../assets/images/green1.jpg";
import green2 from "../assets/images/green2.jpg";
import green3 from "../assets/images/green3.jpg";
import green4 from "../assets/images/green4.jpg";


import "./GreenHouse.less";
import NavigationBox from "../components/NavigationBox";
import { NavLink, NavigateFunction } from "react-router-dom";

interface BaseProps {
  navigate: NavigateFunction;
}

const GreenHouses: FC<BaseProps> = function GreenHouses({ navigate }) {
  return (
    <div className="greenHouse-box">
      <div className="navTar">
        <NavLink to="/task">
          <div className="navTar-item">
            <div>任务日志</div>
            <img src={navTaskSrc} alt="" />
          </div>
        </NavLink>
        <NavLink to="/analysis">
          <div
            className="navTar-item"
            style={{
              background:
                " linear-gradient(162.36deg, rgba(117, 164, 217, 1) 0%, rgba(204, 204, 204, 0) 100%)",
            }}
          >
            <div>数据分析</div>
            <img src={navDataSrc} alt="" />
          </div>
        </NavLink>
        <NavLink to="/greenhouseManagement">
          <div
            className="navTar-item"
            style={{
              background:
                " linear-gradient(172.94deg, rgba(209, 204, 105, 1) 0%, rgba(204, 204, 204, 0) 100%)",
            }}
          >
            <div>大棚管理</div>
            <img src={navGreenSrc} alt="" />
          </div>
        </NavLink>
        <NavLink to="/equipment">
          <div
            className="navTar-item"
            style={{
              background:
                "linear-gradient(172.35deg, rgba(91, 98, 186, 1) 0%, rgba(204, 204, 204, 0) 100%)",
            }}
          >
            <div>设备管理</div>
            <img src={navEquipmentSrc} alt="" />
          </div>
        </NavLink>
      </div>
      <div className="monitorBox">
        <NavigationBox title="监控管理" pathname="/monitor" />
        <div className="monitorBoxItems">
          <Image src={green1} />
          <Image src={green2} />
          <Image src={green3} />
          <Image src={green4} />
        </div>
      </div>
      <div className="abnormalBox" onClick={() => navigate("/abnormal")}>
        <h2>异常管理</h2>
        <span>大棚有待处理异常，建议马上查看</span>
      </div>
      <TabBarAction />
    </div>
  );
};

export default GreenHouses;
