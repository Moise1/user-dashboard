const {createProxyMiddleware} = require ('http-proxy-middleware');

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware ({
      target: `${process.env.REACT_APP_HGR_WEB_URL}`,
      changeOrigin: true
    })
  );
};