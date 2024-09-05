import React, { FC } from "react";
import headTar from "../assets/images/headTar.png";
import right from "../assets/images/right.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navigation = styled.div`
  width: 100%;
  .tar {
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    .tar-fl {
      display: flex;
      h3 {
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
`;

interface BaseProps {
  title: string;
  pathname?: string;
}

const NavigationBox: FC<BaseProps> = function NavigationBox({
  title,
  pathname,
}) {
  const navigate = useNavigate();

  const gotoPath = () => {
    navigate({ pathname });
  };

  return (
    <Navigation>
      <div className="tar" onClick={gotoPath}>
        <div className="tar-fl">
          <img src={headTar} alt="" />
          <h3>{title}</h3>
        </div>
        <img src={right} alt="" />
      </div>
    </Navigation>
  );
};

export default NavigationBox;
