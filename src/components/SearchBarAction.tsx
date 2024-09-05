import React, { FC } from "react";
import { SearchBar } from "antd-mobile";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchBarBox = styled.div`
  .searchBar-box {
    padding: 0 11px;
    height: 41px;
    .adm-search-bar {
      height: 100%;
    }
    .adm-search-bar-input-box {
      height: 100%;
      border-radius: 20px;
      .adm-search-bar-input-box-icon {
        font-size: 21px;
        margin-left: 14px;
        margin-right: 10px;
      }
    }
  }
`;


const SearchBarAction:FC = function SearchBarAction() {
  const navigate = useNavigate();
  return (
    <SearchBarBox>
      <div className="searchBar-box">
        <SearchBar
          onFocus={() => navigate("/search")}
          placeholder="输入需要查找品种、地块或植物"
        />
      </div>
    </SearchBarBox>
  );
};

export default SearchBarAction;
