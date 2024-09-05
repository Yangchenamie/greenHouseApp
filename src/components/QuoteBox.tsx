/* 
  封装一个大括号组件
*/


import React from "react";
import styled from "styled-components";

const Quotebox = styled.div`
  .quote {
    position: relative;
    height: 80px;
    width: 12px;
  }
  .quote::before,
  .quote::after,
  .quote ::before,
  .quote ::after {
    content: "";
    display: block;
    position: absolute;
    height: calc(50% - 12px);
    width: 12px;
    border-style: solid;
    border-color: #56b790;
    border-width: 0;
  }
  .quote ::before,
  .quote ::after {
    right: 0;
    /* left: 0; */
  }
  .quote::before,
  .quote::after {
    right: 12px;
    border-right-width: 2px;
  }
  .quote ::before,
  .quote ::after {
    right: 0;
    border-left-width: 2px;
  }
  .quote::before,
  .quote::after {
    right: 12px;
    border-right-width: 2px;
  }
  .quote ::before {
    right: 0;
    border-top-left-radius: 12px;
  }
  .quote ::after {
    bottom: 0;
    border-bottom-left-radius: 12px;
  }
  .quote::before {
    top: 12px;
    border-bottom-right-radius: 12px;
  }
  .quote::after {
    bottom: 12px;
    border-top-right-radius: 12px;
  }
`;

const QuoteBox = function QuoteBox(): JSX.Element {
  return (
    <Quotebox>
      <div className="quote">
        <div></div>
      </div>
    </Quotebox>
  );
};

export default QuoteBox;
