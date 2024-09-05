import { FC } from "react";
import NavBarAction from "../components/NavBarAction";

import SlotBox from "../components/SlotBox";
import { Selector, Image, Toast } from "antd-mobile";
import "./BindDevice.less";
import QRCodeSrc from "../assets/images/QRCode.png";
import cameraActiveSrc from "../assets/images/camera-active.png";
import ButtonAgain from "../components/ButtonAction";
import { NavigateFunction } from "react-router-dom";

const options = [
  {
    label: "1号大棚",
    value: "1",
  },
  {
    label: "2号大棚",
    value: "2",
  },
  {
    label: "3号大棚",
    value: "3",
  },
  {
    label: "4号大棚",
    value: "4",
  },
  {
    label: "5号大棚",
    value: "5",
  },
];
// ID随机生成
function generateRandomNumber() {
  // 生成两位大写英文字母
  const firstTwoLetters =
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // 生成四位随机数
  const lastFourDigits = Math.floor(1000 + Math.random() * 9000);

  const randomNumber = firstTwoLetters + lastFourDigits;
  return randomNumber;
}

interface BindDeviceProps {
  navigate: NavigateFunction;
  location: { state: { data: string } };
}

const BindDevice: FC<BindDeviceProps> = ({
  navigate,
  location: {
    state: { data },
  },
}) => {
  const bindDevice = () => {
    Toast.show({
      icon: "success",
      content: "绑定成功，三秒后自动跳转",
    });
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

  return (
    <div className="bindDevice-box">
      <NavBarAction title="绑定设备"></NavBarAction>
      <div className="bind-content">
        <div className="bindDevice-header">
          <img src={cameraActiveSrc} />
          <div className="text">
            <p>设备名：{data}</p>
            <p>ID:{generateRandomNumber()}</p>
          </div>
        </div>
        <SlotBox>
          <div className="selectBox">
            <h3>选择大棚</h3>
            <div className="tagBox">
              <Selector
                options={options}
                defaultValue={["1"]}
                onChange={(arr, extend) => console.log(arr, extend.items)}
              />
            </div>
          </div>
        </SlotBox>
        <div className="code-box">
          <Image src={QRCodeSrc} />
        </div>
        <ButtonAgain
          block
          size="large"
          style={{
            "--background-color": "#56B790",
            marginTop: 57,
            "--text-color": "#fff",
            "--border-radius": "15px",
          }}
          onClick={bindDevice}
        >
          绑定设备
        </ButtonAgain>
      </div>
    </div>
  );
};

export default BindDevice;
