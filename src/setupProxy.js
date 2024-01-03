const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/apiv5',
    createProxyMiddleware({
      target: 'https://plus.shiptrackapi.com',
      changeOrigin: true,
    })
  );
};