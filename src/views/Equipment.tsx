import React, { FC, useState } from "react";
import NavBarAction from "../components/NavBarAction";
import "./Equipment.less";

import on from "../assets/images/on.png";
import off from "../assets/images/off.png";
import SlotBox from "../components/SlotBox";

const Equipment: FC = function Equipment() {
  const [controlData, setControlData] = useState([
    {
      id: 1,
      status: 1,
      title: "摄像头",
    },
    {
      id: 2,
      status: 0,
      title: "补光灯",
    },
    {
      id: 3,
      status: 1,
      title: "传感器",
    },
    {
      id: 4,
      status: 0,
      title: "排气扇",
    },
    {
      id: 5,
      status: 1,
      title: "卷帘器",
    },
  ]);

  return (
    <div className="equipment-box">
      <NavBarAction title="设备管理" />
      <div className="content">
        <div className="data">
          <div className="dataItem">
            <p>
              <span className="num">65</span>个
            </p>
            <p>设备总数</p>
          </div>
          <div className="dataItem">
            <p>
              <span className="num">64</span>个
            </p>
            <p>设备正常数</p>
          </div>
          <div className="dataItem">
            <p>
              <span className="num">1</span>个
            </p>
            <p>设备异常数</p>
          </div>
        </div>
        <div className="control">
          <SlotBox title="设备管理">
            <div className="controlItems">
              {controlData.map((item,index) => {
                return (
                  <div
                    className="controlItem"
                    key={item.id}
                    onClick={() => {
                      let newData = controlData;
                      newData[index].status = item.status === 1 ? 0 : 1;
                      setControlData([...newData]);
                    }}
                  >
                    <img src={item.status === 1 ? on : off} alt="" />
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </SlotBox>
        </div>
        <div className="status">
          <SlotBox title="设备状态">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>设备总数</th>
                  <th>正常数量</th>
                  <th>异常数量</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>摄像头</th>
                  <td>13</td>
                  <td>13</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>摄像头</th>
                  <td>13</td>
                  <td>13</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>摄像头</th>
                  <td>13</td>
                  <td>13</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>摄像头</th>
                  <td>13</td>
                  <td>13</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>摄像头</th>
                  <td>13</td>
                  <td>13</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </SlotBox>
        </div>
        <div className="abnormal">
          <SlotBox title="异常定位">
            <p className="text">
              <span>1</span>个<span>灌溉器</span>异常，位于<span>03</span>
              号大棚，建议立即处理
            </p>
          </SlotBox>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
