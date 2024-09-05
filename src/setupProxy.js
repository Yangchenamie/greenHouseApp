const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://47.106.33.141:80",
      changeOrigin: true,
      ws: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
