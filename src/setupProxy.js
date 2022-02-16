const {createProxyMiddleware} = require ('http-proxy-middleware');

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware ({
      target: "https://dev-app.hustlegotreal.com",
      changeOrigin: true
    })
  );
};