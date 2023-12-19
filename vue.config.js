const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:44376/", // 后端服务器地址
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          "^/api": "", // 如果API路径有前缀，可以进行重写
        },
      },
    },
  },
});
