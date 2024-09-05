import { FC } from "react";
import NavBarAction from "../components/NavBarAction";
import "./Assess.less";
import SlotBox from "../components/SlotBox";
import DemoBullet from "../components/DemoBullet";
import DemoRadar from "../components/DemoRadar";
import CircleEcharts from "../components/CircleEcharts";

const Assess: FC = () => {
  return (
    <div className="assess-box">
      <NavBarAction title="大棚评估" />
      <SlotBox>
        <div className="assess-text">
          <p>植物生长评估：</p>
          <p className="summary">良好</p>
        </div>
      </SlotBox>
      <div className="assess-total">
        <SlotBox>
          <div className="assess-rate">
            <p>大棚得分：85</p>
            <CircleEcharts />
          </div>
        </SlotBox>
        <SlotBox>
          <div className="assess-item">
            <p>各项指标：</p>
            <DemoBullet />
          </div>
        </SlotBox>
      </div>
    </div>
  );
};
export default Assess;
