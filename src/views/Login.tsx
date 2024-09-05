import React, { FC, useEffect, useState } from "react";
import { Form, Input, Radio, Divider, Toast } from "antd-mobile";

import _ from "../assets/utils";

import qqSrc from "../assets/images/qq.png";
import wechat from "../assets/images/wechat.png";
import "./Login.less";
import ButtonAgain from "../components/ButtonAction";
import { CheckCircleFill } from "antd-mobile-icons";
import api from "../api";
import { NavigateFunction } from "react-router-dom";
import userStore from "../state";

// 手机号码 验证码检验项
const validate = {
  phone(_: Object, val: string) {
    val = val.trim();
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (val.length === 0) return Promise.reject(new Error("手机号码是必填项!"));
    if (!reg.test(val)) return Promise.reject(new Error("手机号码格式有误!"));
    return Promise.resolve();
  },
  code(_: Object, val: string) {
    val = val.trim();
    let reg = /^\d{4}$/;
    if (val.length === 0) return Promise.reject(new Error("验证码是必填项!"));
    if (!reg.test(val)) return Promise.reject(new Error("验证码格式有误!"));
    return Promise.resolve();
  },
};

interface BaseProps {
  navigate: NavigateFunction;
  usp: URLSearchParams;
}

const Login: FC<BaseProps> = function Login({ navigate, usp }) {
  const updateUserId = userStore((state: any) => state.updateUserId);

  let [formIns] = Form.useForm(),
    [sendText, setSendText] = useState("发送验证码"),
    [disabled, setDisabled] = useState(false);

  let timer: NodeJS.Timeout | null = null,
    num = 31;
  // 倒计时
  const countDown = () => {
    num--;
    if (num == 0) {
      if (timer) {
        clearInterval(timer);
        timer = null;
        setSendText("发送验证码");
        setDisabled(false);
        return;
      }
    }
    setSendText(`${num}秒后重发`);
  };
  // 发送验证码
  const sendCode = async () => {
    try {
      let { phone } = formIns.getFieldsValue(["phone"]);
      if (phone === undefined) {
        Toast.show({
          icon: "×",
          content: "请输入手机号码",
        });
        return;
      }
      try {
        // 调获取验证码的接口
        let { code } = await api.sendCode(phone);
        if (+code !== 200) {
          Toast.show({
            icon: "fail",
            content: "发送验证码失败",
          });
          return;
        }
        setDisabled(true);
        countDown();
        if (!timer) timer = setInterval(countDown, 1000);
      } catch (_) {}
    } catch (_) {}
  };
  // 提交表单
  const sumbit = async () => {
    try {
      await formIns.validateFields();
      let { phone, code } = formIns.getFieldsValue();
      console.log(phone);

      let {
        code: httpCode,
        data: { id },
      } = await api.login(phone, code);
      if (+httpCode !== 200) {
        Toast.show({
          icon: "fail",
          content: "登录失败",
        });
        formIns.resetFields(["code"]);
        return;
      }

      Toast.show({
        icon: "success",
        content: "登录成功",
      });
      updateUserId(id);
      let to = usp.get("to");
      to ? navigate(to, { replace: true }) : navigate("/greenHouses");
    } catch (_) {}
  };
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);
  return (
    <div className="login-box">
      <h1>登录</h1>
      <div className="login-content">
        <Form
          form={formIns}
          layout="vertical"
          requiredMarkStyle="none"
          footer={
            <ButtonAgain
              block
              type="submit"
              style={{
                "--background-color": "rgba(86, 183, 144, 0.5)",
                "--border-radius": "20px",
                "--text-color": "#fff",
                height: 58,
              }}
              size="large"
              onClick={sumbit}
            >
              提交
            </ButtonAgain>
          }
        >
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ validator: validate.phone }]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item
            name="code"
            label="验证码"
            rules={[
              {
                validator: validate.code,
              },
            ]}
            extra={
              <ButtonAgain
                className="sendBtn"
                disabled={disabled}
                onClick={sendCode}
              >
                {sendText}
              </ButtonAgain>
            }
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <p className="tips">首次登录时将自动注册</p>
        </Form>
        <Radio
          value="1"
          block
          className="agreeRadio"
          icon={(checked) =>
            checked ? (
              <CheckCircleFill style={{ color: "#56b790" }} />
            ) : (
              <CheckCircleFill style={{ color: "#e5e5e5" }} />
            )
          }
        >
          同意<span>《服务协议》</span>和<span>《用户协议》</span>
        </Radio>
        <Divider>第三方登录</Divider>
        <div className="third-logins">
          <img src={qqSrc} alt="" />
          <img src={wechat} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
