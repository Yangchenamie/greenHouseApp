import React, { FC, useEffect, useState } from "react";
import NavBarAction from "../components/NavBarAction";
import "./GreenhouseManagement.less";
import SlotBox from "../components/SlotBox";
import { Selector, Stepper, Toast } from "antd-mobile";
import { Select, Input } from "tdesign-react";
import { AddIcon } from "tdesign-icons-react";

import api from "../api";

import QuoteBox from "../components/QuoteBox";
import TagAction from "../components/TagAction";
import ButtonAgain from "../components/ButtonAction";

import { GreenDataType } from "../api/type";
import userStore from "../state";
import { NavigateFunction } from "react-router-dom";

type TagCornType = { id: number; name: string };
type SoilType = {
  id: number;
  category: string;
  top: number;
  bottom: number;
  digitsNum: number;
  valueTop: number;
  valueBottom: number;
  step?: number;
};
const soil_category: SoilType[] = [
  {
    id: 1,
    category: "温度（°C）",
    top: 30,
    bottom: 5,
    digitsNum: 0,
    valueTop: 30,
    valueBottom: 5,
  },
  {
    id: 2,
    category: "湿度（%）",
    top: 90,
    bottom: 15,
    digitsNum: 0,
    valueTop: 90,
    valueBottom: 15,
  },
  {
    id: 3,
    category: "ph值",
    top: 7.8,
    bottom: 6.1,
    digitsNum: 1,
    valueTop: 7.8,
    valueBottom: 6.1,
    step: 0.1,
  },
];
type AirType = {
  id: number;
  category: string;
  top: number;
  bottom: number;
  digitsNum: number;
  valueTop: number;
  valueBottom: number;
};
const air_category: AirType[] = [
  {
    id: 1,
    category: "温度（°C）",
    top: 30,
    bottom: 5,
    digitsNum: 0,
    valueTop: 30,
    valueBottom: 5,
  },
  {
    id: 2,
    category: "湿度（%）",
    top: 90,
    bottom: 15,
    digitsNum: 0,
    valueTop: 90,
    valueBottom: 15,
  },
  {
    id: 3,
    category: "光照强度（W）",
    top: 2,
    bottom: 1,
    digitsNum: 0,
    valueTop: 2,
    valueBottom: 1,
  },
  {
    id: 4,
    category: "CO2浓度（%）",
    top: 90,
    bottom: 15,
    digitsNum: 0,
    valueTop: 90,
    valueBottom: 15,
  },
];
interface OptionType {
  label: string;
  value: string;
}

interface BaseProps {
  navigate: NavigateFunction;
}

const GreenhouseManagement: FC<BaseProps> = function GreenhouseManagement({
  navigate,
}) {
  let [value, setValue] = useState("1"),
    [Inputvalue, setInputvalue] = useState(""),
    [inputVisible, toggleInputVisible] = useState(false),
    [flag, setFlag] = useState(false),
    [soil_data, setSoilData] = useState(soil_category),
    [air_data, setAirData] = useState(air_category),
    [tagList, setTagList] = useState<TagCornType[]>([]),
    [selectOption, setSelectOption] = useState<OptionType[]>([]);

  // 获取userId
  const userId = userStore((state: any) => state.userId);

  // 获取用户全部大棚
  const queryAllGreen = async () => {
    try {
      let {
        code,
        data: { Name },
      } = await api.queryAllGreen(userId);
      if (code === 200) {
        let resData: OptionType[] = Name.map(
          (item: { id: number; name: string }) => {
            const { id, name } = item;
            return {
              label: name,
              value: id.toString(),
            };
          }
        );
        setSelectOption(resData);
      }
    } catch (_) {}
  };

  // 查看单个大棚信息
  const queryGreenList = async (greenId: string) => {
    try {
      let {
        code,
        data: { hub },
      } = await api.queryGreenHouse(greenId);
      if (code === 200) {
        // 种植作物
        let cornData = hub.crops.map((item: { id: number; name: string }) => {
          const { id, name } = item;
          return {
            id,
            name,
          };
        });
        setTagList(cornData);

        // 土壤
        let newSoilData = [...soil_data];
        newSoilData[0].valueTop = hub.maxsoiltem;
        newSoilData[0].valueBottom = hub.minsoiltem;
        newSoilData[1].valueTop = hub.maxsoilhum;
        newSoilData[1].valueBottom = hub.minsoilhum;
        newSoilData[2].valueTop = hub.maxsoilph;
        newSoilData[2].valueBottom = hub.minsoilph;
        setSoilData(newSoilData);

        // 空气
        let newAirData = [...air_data];
        air_data[0].valueTop = hub.maxairtem;
        air_data[0].valueBottom = hub.minairtem;
        air_data[1].valueTop = hub.maxairhum;
        air_data[1].valueBottom = hub.minairhum;
        air_data[2].valueTop = hub.maxairsun;
        air_data[2].valueBottom = hub.minairsun;
        air_data[3].valueTop = hub.maxairco2;
        air_data[3].valueBottom = hub.minairco2;
        setAirData(newAirData);
      }
    } catch (_) {}
  };

  // 删除农作物选项
  const deleteTag = (arr: TagCornType[], i: number) => {
    const newtagList = [...arr];
    newtagList.splice(i, 1);
    setTagList(newtagList);
  };

  // 添加大棚
  const addGreenHouse = async () => {
    const crops = tagList.map((item) => {
      const { id, name } = item;
      return {
        id,
        name,
        greenhouseid: 0,
      };
    });
    let obj: GreenDataType = {
      id: 0,
      userid: 2,
      crops: crops,
      area: 8,
      collection: "",
      state: 0,
      name: Inputvalue,
      maxsoiltem: soil_data[0].valueTop,
      minsoiltem: soil_data[0].valueBottom,
      maxsoilhum: soil_data[1].valueTop,
      minsoilhum: soil_data[1].valueBottom,
      maxsoilph: soil_data[2].valueTop,
      minsoilph: soil_data[2].valueBottom,
      minairtem: air_data[0].valueBottom,
      maxairtem: air_data[0].valueTop,
      maxairhum: air_data[1].valueTop,
      minairhum: air_data[1].valueBottom,
      minairsun: air_data[2].valueBottom,
      maxairsun: air_data[2].valueTop,
      maxairco2: air_data[3].valueTop,
      minairco2: air_data[3].valueBottom,
    };
    try {
      if (Inputvalue.trim() === "") {
        Toast.show({
          icon: "fail",
          content: "大棚名称不能为空",
        });
        return;
      }
      const { code } = await api.addGreenHouse(obj);
      if (code !== 200) {
        Toast.show({
          icon: "fail",
          content: "添加大棚失败！",
        });
        return;
      }
      Toast.show({
        icon: "success",
        content: "添加大鹏成功！",
      });
      navigate(-1);
    } catch (_) {}
  };

  // 新增加农作物
  const handleClickAdd = () => {
    toggleInputVisible(true);
  };
  const handleInputEnter = (value: string) => {
    toggleInputVisible(false);
    if (value)
      setTagList((currentList) =>
        currentList.concat([{ id: tagList.length + 1, name: value }])
      );
  };
  // Select切换
  const onChange = (value: any) => {
    console.log(value);
    setValue(value);
    if (value == 2) {
      setAirData(air_category);
      setSoilData(soil_category);
      setTagList([]);
      setFlag(true);
      return;
    }
    setFlag(false);
  };

  // 调节空气的数据
  const onChangeStep = (index: number, value: number, flag: boolean) => {
    let soil = [...soil_data];
    if (flag) {
      soil[index].valueTop = value;
    } else {
      soil[index].valueBottom = value;
    }
    setSoilData(soil);
  };

  // 调节土壤的数据
  const onChangeAirStep = (index: number, value: number, flag: boolean) => {
    let air = [...air_data];
    if (flag) {
      air[index].valueTop = value;
    } else {
      air[index].valueBottom = value;
    }
    setAirData(air);
  };

  useEffect(() => {
    queryAllGreen();
  }, []);

  useEffect(() => {
    if (selectOption.length > 0) {
      queryGreenList(selectOption[0].value);
    }
  }, [selectOption]);

  return (
    <div className="management-box">
      <NavBarAction title="大棚管理" />
      <SlotBox>
        <div className="greenhouse_box">
          <Select
            value={value}
            onChange={onChange}
            style={{ width: "50%" }}
            clearable
            options={[
              { label: "选择大棚", value: "1" },
              { label: "新建大棚", value: "2" },
            ]}
          />
          <div
            className="selectBox"
            style={{ display: !flag ? "block" : "none" }}
          >
            <div
              className="tagBox"
              style={{ display: "flex", flexWrap: "wrap", width: 300 }}
            >
              <Selector
                options={selectOption}
                defaultValue={["67"]}
                onChange={(arr, extend) => console.log(arr, extend.items)}
              />
            </div>
          </div>
          <Input
            className="inputName"
            style={{ display: flag ? "block" : "none" }}
            placeholder="请输入大棚名称"
            value={Inputvalue}
            clearable
            onChange={(value) => {
              setInputvalue(value);
            }}
            onClear={() => {
              console.log("onClear");
            }}
          />
        </div>
      </SlotBox>
      <SlotBox>
        <div className="planting-box">
          <div className="planting-title">种植作物：</div>
          <div className="selectBox">
            <div
              className="tagBox"
              style={{ display: "flex", flexWrap: "wrap", width: "80%" }}
            >
              {tagList.map((tag, i) => (
                <TagAction
                  key={i}
                  closable
                  onClose={() => {
                    deleteTag(tagList, i);
                  }}
                >
                  {tag.name}
                </TagAction>
              ))}
            </div>
            <div style={{ display: "flex", cursor: "pointer" }}>
              {inputVisible ? (
                <Input
                  onBlur={handleInputEnter}
                  onEnter={handleInputEnter}
                  style={{ width: "94px" }}
                />
              ) : (
                <TagAction onClick={handleClickAdd} icon={<AddIcon />}>
                  添加作物
                </TagAction>
              )}
            </div>
          </div>
        </div>
      </SlotBox>
      <div className="soil-box">
        <div className="soil-title">
          <h3>土壤</h3>
          <p>超过所设定范围后触发异常警报</p>
        </div>
        <SlotBox>
          <div className="soil-items">
            {soil_data.map((item, index) => {
              let { id, category, top, bottom, digitsNum, step } = item;
              return (
                <div className="soil-item" key={id}>
                  <p className="soil-item-title">{category}</p>
                  <QuoteBox />
                  <div className="stepBox">
                    <div className="stepItem">
                      <p>最高值：</p>
                      <Stepper
                        digits={digitsNum}
                        step={step}
                        style={{
                          "--button-background-color": "#56B790",
                          "--button-text-color": "#fff",
                          "--border-radius": "5px",
                          "--input-font-color": "#56B790",
                          "--input-background-color": "transparent",
                        }}
                        defaultValue={top}
                        onChange={(value) => {
                          onChangeStep(index, value, true);
                        }}
                      />
                    </div>
                    <div className="stepItem">
                      <p>最低值：</p>
                      <Stepper
                        digits={digitsNum}
                        step={step}
                        style={{
                          "--button-background-color": "#56B790",
                          "--button-text-color": "#fff",
                          "--border-radius": "5px",
                          "--input-font-color": "#56B790",
                          "--input-background-color": "transparent",
                        }}
                        defaultValue={bottom}
                        onChange={(value) => {
                          onChangeStep(index, value, false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SlotBox>
      </div>
      <div className="soil-box">
        <div className="soil-title">
          <h3>空气</h3>
          <p>超过所设定范围后触发异常警报</p>
        </div>
        <SlotBox>
          <div className="soil-items">
            {air_data.map((item, index) => {
              let { id, category, top, bottom, digitsNum } = item;
              return (
                <div className="soil-item" key={id}>
                  <p className="soil-item-title">{category}</p>
                  <QuoteBox />
                  <div className="stepBox">
                    <div className="stepItem">
                      <p>最高值：</p>
                      <Stepper
                        digits={digitsNum}
                        style={{
                          "--button-background-color": "#56B790",
                          "--button-text-color": "#fff",
                          "--border-radius": "5px",
                          "--input-font-color": "#56B790",
                          "--input-background-color": "transparent",
                        }}
                        defaultValue={top}
                        onChange={(value) => {
                          onChangeAirStep(index, value, true);
                        }}
                      />
                    </div>
                    <div className="stepItem">
                      <p>最低值：</p>
                      <Stepper
                        digits={digitsNum}
                        style={{
                          "--button-background-color": "#56B790",
                          "--button-text-color": "#fff",
                          "--border-radius": "5px",
                          "--input-font-color": "#56B790",
                          "--input-background-color": "transparent",
                        }}
                        defaultValue={bottom}
                        onChange={(value) => {
                          onChangeAirStep(index, value, true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SlotBox>
      </div>
      <ButtonAgain
        block
        size="large"
        style={{
          "--background-color": "#56B790",
          marginTop: 37,
          "--text-color": "#fff",
          "--border-radius": "15px",
        }}
        onClick={addGreenHouse}
      >
        保存
      </ButtonAgain>
    </div>
  );
};
export default GreenhouseManagement;
