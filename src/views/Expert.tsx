import React, { FC } from "react";
import { Dropdown, Image } from "antd-mobile";
import NavBarAction from "../components/NavBarAction";
import SlotBox from "../components/SlotBox";

import Pic from "../assets/images/pic.png";
import { RightOutline, MessageOutline } from "antd-mobile-icons";

import "./Expert.less";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SelectBarbox = styled.div`
  margin-top: 12px;
  .adm-dropdown-nav {
    margin: 10px;
    width: 230px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
    border-radius: 13px;
    font-size: 13px;
    .adm-dropdown-item {
      flex: auto;
      &:first-child {
        .adm-dropdown-item-title-arrow {
          display: none;
        }
        .adm-dropdown-item-title {
          color: #000;
        }
      }
      .adm-dropdown-item-title {
        color: #56b790;
      }
    }
  }
`;

const Expert: FC = () => {
  const navigate = useNavigate();
  const gotoChat = () => {
    navigate("/dialog/10086");
  };
  const right = <MessageOutline onClick={gotoChat} />;

  return (
    <div className="expert-box">
      <NavBarAction title="专家咨询" right={right} />
      <SlotBox title="专家推荐">
        <div
          className="topBox"
          onClick={() => {
            navigate("/dialog/1");
          }}
        >
          <div className="topBox-fl">
            <Image src={Pic} />
            <p className="name">王小明</p>
            <p className="hot">hot</p>
          </div>
          <div className="topBox-fr">
            <p className="description">
              擅长病虫害的判断和处理，现就职于农业局
            </p>
            <p className="IPAddress">位于广东省</p>
          </div>
          <RightOutline style={{ fontSize: 28 }} />
        </div>
      </SlotBox>

      <div className="expert-items">
        <SlotBox title="专家目录">
          <>
            <SelectBarbox>
              <Dropdown>
                <Dropdown.Item key="sift" title="筛选" />
                <Dropdown.Item key="excel" title="擅长">
                  <div style={{ padding: 12 }}>
                    商机筛选内容
                    <br />
                    商机筛选内容
                    <br />
                    商机筛选内容
                    <br />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item key="region" title="地区">
                  <div style={{ padding: 12 }}>
                    更多筛选内容
                    <br />
                    更多筛选内容
                    <br />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item key="posts" title="职位">
                  <div style={{ padding: 12 }}>
                    更多筛选内容
                    <br />
                    更多筛选内容
                    <br />
                  </div>
                </Dropdown.Item>
              </Dropdown>
            </SelectBarbox>
            <ul>
              <li className="topBox">
                <div className="topBox-fl">
                  <Image src={Pic} />
                </div>
                <div className="topBox-fr">
                  <p className="name">王小明</p>
                  <p className="description">
                    擅长病虫害的判断和处理，现就职于农业局
                  </p>
                  <p className="IPAddress">IP：广东</p>
                </div>
              </li>
              <li className="topBox">
                <div className="topBox-fl">
                  <Image src={Pic} />
                </div>
                <div className="topBox-fr">
                  <p className="name">王小明</p>
                  <p className="description">
                    擅长病虫害的判断和处理，现就职于农业局
                  </p>
                  <p className="IPAddress">IP：广东</p>
                </div>
              </li>
              <li className="topBox">
                <div className="topBox-fl">
                  <Image src={Pic} />
                </div>
                <div className="topBox-fr">
                  <p className="name">王小明</p>
                  <p className="description">
                    擅长病虫害的判断和处理，现就职于农业局
                  </p>
                  <p className="IPAddress">IP：广东</p>
                </div>
              </li>
              <li className="topBox">
                <div className="topBox-fl">
                  <Image src={Pic} />
                </div>
                <div className="topBox-fr">
                  <p className="name">王小明</p>
                  <p className="description">
                    擅长病虫害的判断和处理，现就职于农业局
                  </p>
                  <p className="IPAddress">IP：广东</p>
                </div>
              </li>
            </ul>
          </>
        </SlotBox>
      </div>
    </div>
  );
};

export default Expert;
