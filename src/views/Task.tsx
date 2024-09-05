import React, { FC, useEffect, useState } from "react";
import NavBarAction from "../components/NavBarAction";
import SlotBox from "../components/SlotBox";
import { Switch, Modal } from "antd-mobile";

import "./Task.less";
import { NavigateFunction } from "react-router-dom";
import userStore from "../state";
import api from "../api";

interface BaseProps {
  navigate: NavigateFunction;
}

interface TaskList {
  id: number;
  name: string;
  target: string;
  cycle: string;
  event: string;
  delay: number;
  isonce: boolean;
}

const Task: FC<BaseProps> = function Task({ navigate }) {
  const [taskList, setTaskList] = useState<TaskList[]>([]);

  // 获取userId
  const userId = userStore((state: any) => state.userId);
  // 获取全部任务
  const queryAllTask = async () => {
    try {
      let {
        code,
        data: { Object },
      } = await api.queryUserTask(userId);
      if (code === 200) {
        let newData = Object;
        let val = "";
        let flag = true;
        let taskData = newData.map(
          (item: {
            id: number;
            day: string;
            conditionalobject: string;
            conditional: string;
            conditionaldata: number;
            delay: number;
            isonce: number;
          }) => {
            const {
              id,
              day,
              conditionalobject,
              conditional,
              conditionaldata,
              delay,
              isonce,
            } = item;
            if (conditionalobject === "风力") {
              val = "排气扇";
            } else if (conditionalobject === "光照强度") {
              val = "补光灯";
            } else if (conditionalobject === "湿度") {
              val = "灌溉器";
            } else {
              val = "温度传感器";
            }
            if (isonce === 0) {
              flag = false;
            }
            return {
              id,
              name: val,
              target: "1号大棚",
              cycle: day,
              event: `${conditionalobject}${conditional}${conditionaldata}`,
              delay,
              isonce: flag,
            };
          }
        );
        setTaskList(taskData);
      }
    } catch (_) {}
  };

  // 点击跳转到添加任务页面
  const AddTask = () => navigate("/addTask");

  useEffect(() => {
    queryAllTask();
  }, []);

  return (
    <div className="task-box">
      <NavBarAction title="任务日志" />
      {taskList.map((item) => {
        const { id, name, target, cycle, event, delay, isonce } = item;
        return (
          <SlotBox>
            <div
              className="taskItem"
              onClick={() => {
                Modal.show({
                  content: (
                    <>
                      <p className="title">
                        <span>打开{name}</span>任务详情
                      </p>
                      <p>
                        重复：<span>{cycle}</span>
                      </p>
                      <p>
                        执行条件：<span>{event}</span>
                      </p>
                      <p>
                        延时执行：<span>条件满足延迟{delay}分钟后执行</span>
                      </p>
                      <p>
                        仅执行一次：<span>{isonce ? "打开" : "关闭"}</span>
                      </p>
                    </>
                  ),
                  showCloseButton: true,
                  actions: [
                    {
                      key: "change",
                      text: "修改",
                      className: "changeBtn",
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              <div className="item">
                <p className="taskName">打开{name}</p>
                <div className="task-options">
                  <p>{target}</p>
                  <p>{cycle}</p>
                  <p>{event}</p>
                </div>
              </div>
              <Switch
                defaultChecked
                style={{
                  "--checked-color": "#00b578",
                  "--height": "36px",
                  "--width": "60px",
                }}
              />
            </div>
          </SlotBox>
        );
      })}
      <div className="addTask" onClick={AddTask}>
        +
      </div>
    </div>
  );
};

export default Task;
