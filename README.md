#taro-demo
taro-demo,附上一些简单的小效果
1. 分享
2. 左滑删除
3. 瀑布流
4. 骨架屏

##启动步骤：
1. npm i -g @tarojs/cli@1.3.0
2. npm i
3. 编译h5：npm run dev:h5

##参考链接
[taro](https://nervjs.github.io/taro/)
[taro-ui](https://taro-ui.aotu.io/#/) (目前没用到)
[nativeshare](https://www.npmjs.com/package/nativeshare)

##瀑布流效果
1. 直接读取本地mock数据，启动npm run dev:h5:mock

##骨架屏
由于目前百度小程序不支持跨自定义组件的后代选择器，所以在百度小程序中可以直接使用。
在微信小程序中支持，可以修改组件代码，如`.${this.props.selector} >>> .${this.props.selector}-radius`.