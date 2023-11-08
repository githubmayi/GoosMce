module.exports = {
    plugins: {
        // 兼容浏览器，添加前缀
        autoprefixer: {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions", // 所有主流浏览器最近10版本用
            ],
            grid: true,
        },
        "postcss-pxtorem": {
            rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ["*"], 
            unitPrecision: 5, 
            replace: true, 
            mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
            minPixelValue: 12, //px小于12的不会被转换
        },
    },
};