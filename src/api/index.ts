import http from "./http";
import { GreenDataType, TaskDataType } from "./type";

const baseUrl = "http://47.106.33.141:80";

// 添加大棚
const addGreenHouse = (data: GreenDataType) =>
  http.post(`/api/hub/greenhouse`, data);

// 查看大棚
const queryGreenHouse = (greenId: string) =>
  http.get(`/api/hub/greenhouse/${greenId}`);

// 查看用户所有大棚
const queryAllGreen = (userId: string) =>
  http.get(`/api/hub/greenhouse/selectName/${userId}`);

// 修改大棚
const setGreenHouse = (greenId: number) =>
  http.post(`/api/greenhouse/${greenId}`, {});

// 查询用户所有任务
const queryUserTask = (userId: string) =>
  http.get(`/api/hub/task/selectAll/${userId}`);

// 添加任务
const addUserTask = (data: TaskDataType) =>
  http.post(`/api/hub/task`, { ...data });

// 发送二维码
const sendCode = (phone: string) => http.get(`/api/user/send/${phone}`);

// 短信登录
const login = (username: string, password: string) =>
  http.post(`/api/user/login/phone`, { username, password });

const api = {
  addGreenHouse,
  queryGreenHouse,
  setGreenHouse,
  queryUserTask,
  queryAllGreen,
  addUserTask,
  sendCode,
  login,
};

export default api;
