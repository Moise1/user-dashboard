const {createProxyMiddleware} = require ('http-proxy-middleware');

const {REACT_APP_HGR_WEB_URL} = process.env;
module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware ({
      target: `${REACT_APP_HGR_WEB_URL}`,
      changeOrigin: true
    })
  );
};