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


// https://plus.shiptrackapi.com/apiv5/shipment.asmx/Create
// https://plus.shiptrackapi.com/apiv5/shipment.asmx/Create