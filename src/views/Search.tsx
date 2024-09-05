import React, { FC } from "react";
import NavBarAction from "../components/NavBarAction";
import "./Search.less";

import SearchBarAction from "../components/SearchBarAction";
import GreenHouseSrc from "../assets/images/greenHouseSrc.png";
import { Grid } from "antd-mobile";

const Search: FC = function Search() {
  return (
    <div className="search-box">
      <NavBarAction>
        <SearchBarAction />
      </NavBarAction>
      <div className="search-result">
        <ul>
          <li>
            <div className="item-fl">
              <img src={GreenHouseSrc} alt="" />
              <p className="name">03号大棚</p>
              <p>
                状态：<span>已连接</span>
              </p>
            </div>
            <div className="item-fr">
              <Grid columns={2} gap={4}>
                <Grid.Item>
                  <div>
                    设备状态：<span>良好</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    主要作物：<span>大白菜、甘蓝、萝卜、大葱、大蒜、韭菜</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    异常情况：<span>3个</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    面积：<span>2亩</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    温湿度：<span>正常</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    采收：<span>10月下旬</span>
                  </div>
                </Grid.Item>
              </Grid>
            </div>
          </li>
          <li>
            <div className="item-fl">
              <img src={GreenHouseSrc} alt="" />
              <p className="name">03号大棚</p>
              <p>
                状态：<span>已连接</span>
              </p>
            </div>
            <div className="item-fr">
              <Grid columns={2} gap={4}>
                <Grid.Item>
                  <div>
                    设备状态：<span>良好</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    主要作物：<span>大白菜、甘蓝、萝卜、大葱、大蒜、韭菜</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    异常情况：<span>3个</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    面积：<span>2亩</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    温湿度：<span>正常</span>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div>
                    采收：<span>10月下旬</span>
                  </div>
                </Grid.Item>
              </Grid>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Search;
