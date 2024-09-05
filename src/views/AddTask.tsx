import React, { FC, useEffect, useState } from "react";
import NavBarAction from "../components/NavBarAction";

import "./AddTask.less";
import { RightOutline } from "antd-mobile-icons";
import { Input, Picker, Switch, Toast } from "antd-mobile";
import SlotBox from "../components/SlotBox";

import sunOptions from "../assets/images/sunOptions.png";
import off from "../assets/images/off.png";
import ButtonAgain from "../components/ButtonAction";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import ButtonAction from "../components/ButtonAction";
import { TaskDataType } from "../api/type";
import api from "../api";
import { NavigateFunction } from "react-router-dom";
import userStore from "../state";

interface BaseProps {
  navigate: NavigateFunction;
}

// 执行周期
interface DateType {
  id: number;
  text: string;
  check: boolean;
}
// 执行事件数据
interface EventType {
  id: number;
  task: string;
  check: boolean;
  src: string;
}
const event_data: EventType[] = [
  {
    id: 1,
    task: "补光灯",
    check: true,
    src: off,
  },
  {
    id: 2,
    task: "排气扇",
    check: false,
    src: off,
  },
  {
    id: 3,
    task: "灌溉器",
    check: false,
    src: off,
  },
  {
    id: 4,
    task: "传感器",
    check: false,
    src: off,
  },
];
// 控制条件
interface Control_data {
  id: number;
  task: string;
  name: string;
  range: string;
  value: number;
  unit: string;
}
const control_data: Control_data[] = [
  {
    id: 1,
    task: "光照强度",
    name: "sunLight",
    range: ">",
    value: 0,
    unit: "lux",
  },
  {
    id: 2,
    task: "风力",
    name: "wind",
    range: "=",
    value: 0,
    unit: "级",
  },
  {
    id: 3,
    task: "湿度",
    name: "humidity",
    range: ">",
    value: 0,
    unit: "%",
  },
  {
    id: 4,
    task: "温度",
    name: "temperature",
    range: ">",
    value: 0,
    unit: "°C",
  },
];

// Picker 选择时长
const basicColumns = [
  [
    { label: "5分钟", value: 5 },
    { label: "10分钟", value: 10 },
    { label: "15分钟", value: 15 },
    { label: "20分钟", value: 20 },
    { label: "25分钟", value: 25 },
    { label: "30分钟", value: 30 },
  ],
];
// Picker 选择范围
const rangeColumns = [
  [
    { label: "<", value: "<" },
    { label: ">", value: ">" },
    { label: "=", value: "=" },
  ],
];

// 大棚
interface GreenType {
  id: number;
  name: string;
  check: boolean;
}

const AddTask: FC<BaseProps> = function AddTask({ navigate }) {
  // 执行周期
  const [date, setDate] = useState<DateType[]>([
    {
      id: 1,
      text: "一",
      check: true,
    },
    {
      id: 2,
      text: "二",
      check: false,
    },
    {
      id: 3,
      text: "三",
      check: false,
    },
    {
      id: 4,
      text: "四",
      check: false,
    },
    {
      id: 5,
      text: "五",
      check: false,
    },
    {
      id: 6,
      text: "六",
      check: false,
    },
    {
      id: 7,
      text: "日",
      check: false,
    },
  ]);

  let [objBtnCheck, setObjBtnCheck] = useState(false),
    [diyData, setDiyData] = useState<GreenType[]>([]),
    [eventData, setEventData] = useState<EventType[]>(event_data),
    [controlData, setControlData] = useState<Control_data[]>(control_data),
    [visible, setVisible] = useState(false),
    [visibleBtn, setVisibleBtn] = useState(false),
    [delay, setDelay] = useState(5),
    [index, setIndex] = useState(1),
    [taskName, setTaskName] = useState<string>("");

  const userId = userStore((state: any) => state.userId);

  // 选择大棚
  const changeObjBtn = (value: number) => {
    if (value === 1) {
      setObjBtnCheck(true);
      let newData = diyData.map((item) => ({
        ...item,
        check: true,
      }));
      setDiyData(newData);
    } else {
      setObjBtnCheck(false);
    }
  };

  // 添加控制条件
  const addConditional = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let newData = [...controlData];
    newData[--index].value = +e.target.value;
    setControlData(newData);
  };

  // 执行事件 单选
  const handleSwitchChange = (index: number) => {
    const newData = eventData.map((item) => ({
      ...item,
      check: item.id === index,
    }));
    setEventData(newData);
    setIndex(index);
    const newControlData: Control_data[] = controlData.map((item) => ({
      ...item,
      value: 0,
    }));
    setControlData(newControlData);
  };

  // 获取用户所有的大棚
  const queryAllGreenHouse = async (userId: string) => {
    try {
      let {
        code,
        data: { Name },
      } = await api.queryAllGreen("2");
      if (code === 200) {
        let greenData: { id: number; name: string }[] = Name;
        let newData = greenData.map((item) => {
          let { id, name } = item;
          return {
            id,
            name,
            check: false,
          };
        });
        setDiyData(newData);
      }
    } catch (_) {}
  };

  // 添加任务
  const addTask = async () => {
    console.log(diyData);

    const dateList = date
      .filter((item) => item.check === true)
      .map((item) => {
        return item.id;
      });

    const conditional = controlData
      .filter((item) => item.value !== 0)
      .map((item) => item.range);

    const greenList = diyData
      .filter((item) => item.check === true)
      .map((item) => {
        const { id, name } = item;
        return {
          id,
          name,
        };
      });
    console.log(greenList);

    const controlEvent = controlData.filter((item) => item.value !== 0);

    let req: TaskDataType = {
      deviceid: 28,
      date: dateList,
      state: 0,
      conditional: conditional[0],
      delay,
      greenhouseid: greenList,
      conditionalobject: controlEvent[0].task,
      isonce: 1,
      conditionaldata: controlEvent[0].value,
      devicestate: 1,
      userid: 2,
    };

    try {
      if (taskName.trim() === "") {
        Toast.show({
          icon: "fail",
          content: "任务名称不能为空！",
        });
        return;
      }
      let { code, message } = await api.addUserTask(req);
      if (code !== 200 || message !== "success") {
        Toast.show({
          icon: "fail",
          content: "添加任务失败！",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "添加任务成功,3秒后自动跳转",
      });
      setTimeout(() => navigate(-1), 3000);
    } catch (_) {}
  };

  useEffect(() => {
    queryAllGreenHouse(userId);
  }, []);

  return (
    <div className="addTask-box">
      <NavBarAction title="添加" />
      <div className="addTaskItems">
        <Input
          placeholder="请输入任务名称"
          clearable
          value={taskName}
          onChange={(value: string) => {
            let val = value.trim();
            setTaskName(val);
          }}
        />

        <SlotBox title="重复">
          <ul className="repeat">
            {date.map((item, index) => {
              let { id, text, check } = item;
              return (
                <li
                  key={id}
                  className={check ? "active-date" : ""}
                  onClick={() => {
                    const newData = [...date];
                    newData[index].check = !check;
                    setDate(newData);
                  }}
                >
                  {text}
                </li>
              );
            })}
          </ul>
        </SlotBox>

        <div className="objOptions">
          <div className="optionsItem">
            <p className="objTitle">对象</p>
            <button
              className={objBtnCheck ? "active-btn" : ""}
              onClick={() => changeObjBtn(1)}
            >
              所有大棚
            </button>
            <button
              className={!objBtnCheck ? "active-btn" : ""}
              onClick={() => changeObjBtn(2)}
            >
              自定义
            </button>{" "}
          </div>
          <div className="diyBtn">
            {objBtnCheck
              ? null
              : diyData.map((item, index) => {
                  let { id, name, check } = item;
                  return (
                    <button
                      key={id}
                      className={check ? "active-btn" : ""}
                      onClick={() => {
                        const newData = [...diyData];
                        newData[index].check = !check;
                        setDiyData(newData);
                      }}
                    >
                      {name}
                    </button>
                  );
                })}
          </div>
        </div>

        <SlotBox title="执行事件">
          <div className="eventItemsBox">
            <div className="eventlOptions">
              <ul>
                {eventData.map((item) => {
                  let { id, task, check, src } = item;
                  return (
                    <li key={id}>
                      <img src={src} alt="" />
                      <div>
                        {task}：
                        <Switch
                          checked={check}
                          uncheckedText="关"
                          checkedText="开"
                          style={{
                            "--checked-color": "#56B790",
                            "--height": "36px",
                            "--width": "60px",
                          }}
                          onChange={() => handleSwitchChange(id)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </SlotBox>

        <SlotBox title="执行条件">
          <div className="eventItemsBox">
            <ul className="eventItems">
              {controlData.map((item) => {
                let { id, task, range, value, unit } = item;
                if (value !== 0) {
                  return (
                    <li key={id}>
                      <img src={sunOptions} alt="" />
                      <p style={{ fontSize: 16 }}>
                        {task}:{range}
                        {value}
                        {unit}
                      </p>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="eventlOptions">
              {controlData.map((item, i) => {
                let { id, task, range } = item;
                if (id === index) {
                  return (
                    <div className="formItem" key={id}>
                      <img src={sunOptions} alt="" />
                      <p>{task}</p>
                      <ButtonAgain
                        onClick={() => {
                          const flag = !visibleBtn;
                          setVisibleBtn(flag);
                          setIndex(id);
                        }}
                      >
                        {range}
                      </ButtonAgain>
                      <Input
                        onBlur={addConditional}
                        onFocus={() => {
                          setIndex(index);
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </SlotBox>

        <SlotBox title="高级选项">
          <div className="topOptions">
            <ul>
              <li
                className="top-item"
                onClick={() => {
                  let flag = !visible;
                  setVisible(flag);
                }}
              >
                <div className="item-fl">
                  <p className="itemName">延迟执行</p>
                  <p>当条件满足一段时间后执行</p>
                </div>
                <div className="item-fr">
                  {delay}分钟
                  <RightOutline />
                </div>
              </li>
              <li className="top-item">
                <div className="item-fl">
                  <p className="itemName">仅执行一次</p>
                  <p>任务仅执行一个周期</p>
                </div>
                <div className="item-fr">
                  <Switch
                    style={{
                      "--checked-color": "#56B790",
                      "--height": "36px",
                      "--width": "60px",
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </SlotBox>

        <ButtonAction
          block
          size="large"
          style={{
            "--background-color": "#56B790",
            marginTop: 37,
            "--text-color": "#fff",
            "--border-radius": "15px",
          }}
          onClick={addTask}
        >
          添加任务
        </ButtonAction>
      </div>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(v) => {
          console.log(v);
          let value = v[0];
          setDelay(+value!);
        }}
      />
      <Picker
        columns={rangeColumns}
        visible={visibleBtn}
        onClose={() => {
          setVisibleBtn(false);
        }}
        onConfirm={(value: PickerValue[]) => {
          console.log(index);
          const newdata = [...control_data];
          if (value[0]) {
            newdata[--index].range = value[0] as string;
          }
          setControlData(newdata);
        }}
      />
    </div>
  );
};

export default AddTask;
