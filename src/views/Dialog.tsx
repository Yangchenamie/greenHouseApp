import React, { useEffect, useState } from "react";

import { TextArea } from "antd-mobile";
import {
  AudioOutline,
  SmileOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import ButtonAction from "../components/ButtonAction";
import NavBarAction from "../components/NavBarAction";

import Dialogue from "../components/Dialogue";
import "./Dialog.less";
import PicSrc from "../assets/images/pic.png";
import TimgSrc from "../assets/images/timg.jpg";
import useWebSocket from "../assets/webSocket";
import userStore from "../state";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";

//假数据，如果是真实数据的话，可以在TODO那里请求
//id 聊天记录的id
//color：聊天记录的颜色
//icon：这个是双方的头像，我用ixon来表示了，可以换成图片
//position：聊天记录的位置，在左边还是右边
//info：聊天内容 如果是图片，会在里面再包一层image（这个是根据quill的本身属性来的）
interface DialogData {
  id: number | string;
  icon: string;
  position: string;
  info: { insert: string } | { insert: { image?: string } };
}

interface BaseProps {
  params: Readonly<Params<string>>;
}

const Dialog: React.FC<BaseProps> = function Dialog({ params }) {
  const userId = userStore((stata: any) => stata.userId);

  const rightSrc = userId === 2 ? TimgSrc : PicSrc;
  const leftSrc = rightSrc === TimgSrc ? PicSrc : TimgSrc;
  const dialogList = [
    {
      id: 1,
      icon: leftSrc,
      position: "left",
      info: {
        insert: {
          image:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621122252%2F210416122252-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671784849&t=891f79c11335b0717366ef0105852e68",
        },
      },
    },
    {
      id: 2,
      icon: rightSrc,
      position: "right",
      info: { insert: "你好呀🌹" },
    },
    {
      id: 3,
      icon: leftSrc,
      position: "left",
      info: { insert: "你叫什么名字" },
    },
    {
      id: 4,
      icon: rightSrc,
      position: "right",
      info: { insert: "我叫Mary" },
    },
    {
      id: 5,
      icon: leftSrc,
      position: "left",
      info: { insert: "我叫jack" },
    },
    {
      id: 6,
      icon: rightSrc,
      position: "right",
      info: { insert: "你是哪里人" },
    },
    {
      id: 7,
      icon: leftSrc,
      position: "left",
      info: { insert: "我是外国人" },
    },
    {
      id: 8,
      icon: rightSrc,
      position: "right",
      info: { insert: "我也是外国人" },
    },
    {
      id: 9,
      icon: leftSrc,
      position: "left",
      info: { insert: "好巧" },
    },
    {
      id: 10,
      icon: rightSrc,
      position: "right",
      info: { insert: "好巧" },
    },
    {
      id: 11,
      icon: leftSrc,
      position: "left",
      info: { insert: "再见" },
    },
    {
      id: 12,
      icon: rightSrc,
      position: "right",
      info: { insert: "好的，我也要走了" },
    },
    {
      id: 13,
      icon: rightSrc,
      position: "right",
      info: { insert: "下次再聊" },
    },
    {
      id: 14,
      icon: rightSrc,
      position: "right",
      info: {
        insert: {
          image:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621122252%2F210416122252-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671784849&t=891f79c11335b0717366ef0105852e68",
        },
      },
    },
    {
      id: 15,
      icon: rightSrc,
      position: "right",
      info: { insert: "下次再聊" },
    },
    {
      id: 16,
      icon: rightSrc,
      position: "right",
      info: {
        insert: {
          image:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621122252%2F210416122252-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671784849&t=891f79c11335b0717366ef0105852e68",
        },
      },
    },
  ];
  let [openFlag, setOpenFlag] = useState<boolean>(false),
    [sendFlag, setSendFlag] = useState<boolean>(false),
    [imageFlag, setImageFlag] = useState<boolean>(false),
    [messageList, setMessageList] = useState<DialogData[]>(dialogList),
    [messageVal, setMessageVal] = useState<string>(""),
    [count, setCount] = useState(0),
    [title, setTitle] = useState<string>("");
  let receiverId: number | null = null;

  if (params.id === "10086") {
    receiverId = +params.id;
  } else if (userId === 1) {
    receiverId = 2;
  } else {
    receiverId = 1;
  }
  // 发送消息
  const send = () => {
    const id = uuidv4();
    let newMessage: DialogData = {
      id,
      icon: rightSrc,
      position: "right",
      info: { insert: messageVal },
    };
    let data = [...messageList, newMessage];
    setMessageList(data);
    if (count == 0) {
      sendMessage({
        action: 1,
        chatMsg: {
          senderId: 2,
          receiverId,
          msg: "null",
          msgId: "null",
        },
        extand: "null",
      });
      setCount(1);
    }
    let action = 0;
    if (receiverId === 10086) {
      action = 6;
    } else {
      action = 2;
    }

    sendMessage({
      action,
      chatMsg: {
        senderId: 2,
        receiverId,
        msg: messageVal,
        msgId: "null",
      },
      extand: "null",
    });
    setMessageVal("");
  };

  // 监听多行文本框
  const textAreaOnChange = (value: string) => {
    let val = value.trim();

    if (val.length !== 0) {
      setSendFlag(true);
      setMessageVal(val);
      return;
    }
    setSendFlag(false);
  };

  // 切换表情包栏
  const onEmojiClick = (event: { emoji: string }) => {
    let message = messageVal + event.emoji;
    setMessageVal(message);
  };

  // websocket
  const [webSocket, sendMessage, isConnected] = useWebSocket({
    url: "ws://47.106.33.141:8062/ws",
    onOpen: () => {
      //连接成功
      console.log("WebSocket connected");
    },
    onClose: () => {
      //连接关闭
      console.log("WebSocket disconnected");
    },
    onError: (event) => {
      //连接异常
      console.error("WebSocket error:", event);
    },
    onMessage: (message) => {
      //收到消息
      console.log("WebSocket received message:", message);
      let val: string = "";
      if (typeof message === "string") {
        val = message;
      }
      console.log(typeof message);

      if (typeof message === "object") {
        val = message.chatMsg.msg;
      }
      const id = uuidv4();
      let newMessage: DialogData = {
        id,
        icon: leftSrc,
        position: "left",
        info: { insert: val },
      };
      let data = [...messageList, newMessage];
      setMessageList(data);
    },
  });

  useEffect(() => {
    console.log(userId);

    if (receiverId === 10086) {
      setTitle("智能助理");
    } else if (userId === 1) {
      setTitle("阿咩_");
    } else {
      setTitle("王小明");
    }
  }, [receiverId]);

  return (
    <div className="dialog-box">
      <NavBarAction
        title={title}
        style={{ position: "fixed", top: 0, zIndex: 999 }}
      />
      <div
        className="dialog-content"
        style={{
          height: openFlag
            ? "calc(100vh - 70px - 452px)"
            : " calc(100vh - 70px)",
        }}
      >
        <Dialogue data={messageList} />
      </div>
      <div className="dialog-foot">
        <div className="dialog-footer">
          <AudioOutline style={{ fontSize: 32, margin: "0 8px" }} />
          <TextArea
            value={messageVal}
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={(value: string) => textAreaOnChange(value)}
          />
          <div className="footer-fr">
            <div className="more">
              <SmileOutline
                style={{ fontSize: 30, margin: "0 8px" }}
                onClick={() => {
                  let flag = !openFlag;
                  setOpenFlag(flag);
                }}
              />
              <AddCircleOutline
                style={{
                  fontSize: 30,
                  margin: "0 8px",
                  display: !sendFlag ? "block" : "none",
                }}
                onClick={() => setImageFlag(!imageFlag)}
              />
              <ButtonAction
                onClick={send}
                style={{
                  background: "#56B790",
                  color: "#fff",
                  width: 60,
                  display: sendFlag ? "block" : "none",
                }}
              >
                发送
              </ButtonAction>
            </div>
          </div>
        </div>
        <EmojiPicker
          skinTonesDisabled={true}
          searchDisabled={true}
          onEmojiClick={onEmojiClick}
          width="100%"
          open={openFlag}
        />
      </div>
    </div>
  );
};

export default Dialog;
