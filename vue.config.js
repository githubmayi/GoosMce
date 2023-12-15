const { defineConfig } = require('@vue/cli-service')

require('events').EventEmitter.defaultMaxListeners = 20;
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:44376/', // 后端服务器地址
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          '^/api': '' // 如果API路径有前缀，可以进行重写
        }
      }
    }
  }
}