import React, { FC } from "react";
import styled from "styled-components";
import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
const NavBarBox = styled.div`
  width: 100%;
  .navBar-box {
    .adm-nav-bar {
      width: 100%;
      height: 70px;
      background-color: #fafafa;
      box-sizing: border-box;
    }
    .antd-mobile-icon,
    .adm-nav-bar-title {
      color: #56b790;
      font-size: 20px;
    }
  }
`;

interface BaseProps {
  title?: string;
  children?: JSX.Element;
  right?: JSX.Element;
  style?: any;
}

const NavBarAction: FC<BaseProps> = function NavBarAction({
  title,
  children,
  right,
  style,
}) {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <NavBarBox>
      <div className="navBar-box">
        <NavBar onBack={back} right={right} style={style}>
          {title ? title : children}
        </NavBar>
      </div>
    </NavBarBox>
  );
};

export default NavBarAction;
