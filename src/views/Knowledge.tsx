import React, { FC } from "react";
import NavBarAction from "../components/NavBarAction";
import SlotBox from "../components/SlotBox";
import { Swiper, Image, Grid } from "antd-mobile";
import swiper from "../assets/images/swiper.png";
import "./Knowledge.less";

import taskOne from "../assets/images/taskOne.png";
import taskTwo from "../assets/images/taskTwo.png";
import taskThree from "../assets/images/taskThree.png";
import taskFour from "../assets/images/taskFour.png";

const Knowledge: FC = function Knowledge() {
  return (
    <div className="task-box">
      <NavBarAction title="农业知识" />
      <div className="swiper-box">
        <Swiper autoplay={true} loop={true}>
          <Swiper.Item>
            <Image src={swiper} lazy />
            <div className="desc">高效农业助增收</div>
          </Swiper.Item>
          <Swiper.Item>
            <Image src={swiper} lazy />
            <div className="desc">高效农业助增收</div>
          </Swiper.Item>
          <Swiper.Item>
            <Image src={swiper} lazy />
            <div className="desc">高效农业助增收</div>
          </Swiper.Item>
        </Swiper>
      </div>
      <SlotBox>
        <div className="taskNav">
          <Grid columns={2} gap={2}>
            <Grid.Item>
              <div className="item">
                <img src={taskOne} alt="" />
                <p>病虫害知识</p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="item">
                <img src={taskTwo} alt="" />
                <p>实用技术</p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="item">
                <img src={taskThree} alt="" />
                <p>嫁接迁苗</p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="item">
                <img src={taskFour} alt="" />
                <p>种子处理</p>
              </div>
            </Grid.Item>
          </Grid>
        </div>
      </SlotBox>
    </div>
  );
};

export default Knowledge;
