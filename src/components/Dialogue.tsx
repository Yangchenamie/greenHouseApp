import React, { useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { Image } from "antd-mobile";
import styled from "styled-components";
interface DialogData {
  id: number | string;
  icon: string;
  position: string;
  info: { insert: string } | { insert: { image?: string } };
}

interface DialogueProps {
  data: DialogData[];
}

const DialogStyles = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background-color: #f5f5f5;
  padding: 12px 13px 0px;
  box-sizing: border-box;

  .avatar {
    display: inline-block;
    width: 38px;
    height: 38px;
    border-radius: 7px;
    img {
      width: 100%;
      border-radius: 7px;
    }
  }

  .dialogue_text {
    display: inline-block;
    max-width: 80%;
    vertical-align: top;
    border-radius: 6px;
    overflow-wrap: break-word;
  }
  .dialogue_fr {
    background-color: #56b790;
    margin-right: 10px;
    color: #fff;
  }
  .dialogue_fl {
    background-color: #fff;
    margin-left: 10px;
    color: #000;
  }
`;

const Dialogue: React.FC<DialogueProps> = ({ data }) => {
  let messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚到最底部
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* 踩坑 scrollIntoView*/
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }, [data]);
  /* 
  useEffect(()=>{
    const current = chatListRef.current!
    console.log(current.scrollHeight);
    //scrollHeight是页面的高度
    current.scrollTop = current.scrollHeight
  },[data]) */

  return (
      <DialogStyles>
        {data.map((item) => {
          let { id, icon, position, info } = item;

          return (
            <div key={id} style={{ width: "100%", padding: "10px 0px" }}>
              <Row>
                <Col
                  span={position === "left" ? 24 : 0}
                  style={{
                    visibility: position === "left" ? "visible" : "hidden",
                    width: "100%",
                  }}
                >
                  <div className="avatar">
                    <img src={icon} alt="" />
                  </div>
                  <div className="dialogue_text dialogue_fl">
                    <div style={{ margin: "9px 10px" }}>
                      {position === "left" &&
                      typeof info.insert === "object" ? (
                        <Image
                          src={info.insert.image}
                          style={{
                            objectFit: "contain",
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                          alt=""
                        />
                      ) : typeof info.insert === "string" ? (
                        <span>{info.insert}</span>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col
                  span={position === "right" ? 24 : 0}
                  style={{
                    textAlign: "right",
                    visibility: position === "right" ? "visible" : "hidden",
                    width: "100%",
                  }}
                >
                  <div className="dialogue_text dialogue_fr">
                    <div
                      style={{
                        margin: "9px 10px",
                        textAlign: "left",
                      }}
                    >
                      {position === "right" &&
                      typeof info.insert === "object" ? (
                        <Image
                          src={info.insert.image}
                          style={{
                            objectFit: "contain",
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                        />
                      ) : typeof info.insert === "string" ? (
                        <span>{info.insert}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="avatar">
                    <img src={icon} alt="" />
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </DialogStyles>
  );
};
export default Dialogue;
