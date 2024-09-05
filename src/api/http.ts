import { Toast } from "antd-mobile";
import _ from "../assets/utils";
import qs from "qs";

interface HttpRequest {
  (config: any): Promise<any>;
  get(url: string, config?: any): Promise<any>;
  post(url: string, body: any, config?: any): Promise<any>;
  put(url: string, body: any, config?: any): Promise<any>;
  patch(url: string, body: any, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
  head(url: string, config?: any): Promise<any>;
  options(url: string, config?: any): Promise<any>;
}

// 核心方法
const http: HttpRequest = function http(config: any) {
  if (!_.isPlainObject(config)) config = {};
  config = Object.assign(
    {
      url: "",
      method: "GET",
      credentials: "include",
      headers: null,
      body: null,
      params: null,
      responseType: "json",
      signal: null,
    },
    config
  );

  if (!config.url) throw new Error("url must be required");
  if (!_.isPlainObject(config.headers)) config.headers = {};
  if (config.params !== null && !_.isPlainObject(config.params))
    config.params = null;

  let {
    url,
    method,
    credentials,
    headers,
    body,
    params,
    responseType,
    signal,
  } = config;
  if (params) {
    url += `${url.includes("?") ? "&" : "?"}${qs.stringify(params)}`;
  }

  if (_.isPlainObject(body)) {
    // console.log(body);

    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  // let token = localStorage.getItem('tk')
  // if (token) headers['authorization'] = token

  /*   let token = _.storage.get("tk"),
    safeList = [
      "/user_info",
      "/user_update",
      "/store",
      "/store_remove",
      "/store_list",
    ];
  if (token) {
    let reg = /^\/api(\/[^?#]+)/,
      [, $1] = reg.exec(url) || [];
    let isSafe = safeList.some((item) => {
      return $1 === item;
    });
    if (isSafe) headers["authorization"] = token;
  } */

  method = method.toUpperCase();
  config = {
    method,
    credentials,
    headers,
    cache: "no-cache",
    signal,
  };

  if (/^(PUT|POST|PATCH)$/i.test(method) && body) config.body = body;
  return fetch(url, config)
    .then((response) => {
      let { status, statusText } = response;
      if (/^(2|3)\d{2}$/.test(status.toString())) {
        let result;
        switch (responseType.toLowerCase()) {
          case "text":
            result = response.text();
            break;
          case "arraybuffer":
            result = response.arrayBuffer();
            break;
          case "blob":
            result = response.blob();
            break;
          default:
            result = response.json();
        }
        return result;
      }
      return Promise.reject({
        code: -100,
        status,
        statusText,
      });
    })
    .catch((reason) => {
      Toast.show({
        icon: "fail",
        content: "网络繁忙，请稍后再试!",
      });
      return Promise.reject(reason);
    });
}; // 这里要添加分隔符 否则会跟后面的合并在一起了！！！

http.get = (url: string, config?: any) => {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["method"] = "GET";
  return http(config);
};

http.post = function (url, body, config) {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["body"] = body;
  config["method"] = "POST";
  return http(config);
};

http.put = function (url, body, config) {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["body"] = body;
  config["method"] = "PUT";
  return http(config);
};

http.patch = function (url, body, config) {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["body"] = body;
  config["method"] = "PATCH";
  return http(config);
};

http.delete = (url: string, config?: any) => {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["method"] = "DELETE";
  return http(config);
};

http.head = (url: string, config?: any) => {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["method"] = "HEAD";
  return http(config);
};

http.options = (url: string, config?: any) => {
  if (!_.isPlainObject(config)) config = {};
  config["url"] = url;
  config["method"] = "OPTIONS";
  return http(config);
};

export default http;
