/* 
  封装一个公共的盒子 使用插槽技术
*/

import React, { FC } from "react";
import styled from "styled-components";

const Slotbox = styled.div`
  height: 100%;
  .slot-box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    margin-top: 13px;
    border-radius: 14px;
    box-shadow: 0px 2px 4px rgba(147, 204, 181, 1);
    .title {
      margin-left: 24px;
      font-size: 16px;
    }
  }
`;

interface BaseProps {
  title?: string;
  children: JSX.Element;
}

const SlotBox: FC<BaseProps> = function SlotBox({ title, children }) {
  return (
    <Slotbox>
      <div className="slot-box">
        <p className="title">{title}</p>
        {children}
      </div>
    </Slotbox>
  );
};

export default SlotBox;
