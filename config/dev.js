const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      before(app) {
        apiMocker(app, path.resolve(__dirname, '../mocker/index.js'));
      },
      disableHostCheck: true,
      host: '127.0.0.1',
      port: '8090',
      proxy: {
      }
    }
  }
}
