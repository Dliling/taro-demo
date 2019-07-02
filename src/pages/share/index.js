/**
 * @file 分享
 */
import Taro, {Component} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { IS_ENV_H5, IS_ENV_SWAN } from '../../common/common'

if (IS_ENV_H5) {
  var NativeShare = require('nativeshare').default
}

export default class ShareDemo extends Component {
  config = {
    navigationBarTitleText: '分享'
  }

  onShareAppMessage () {
    return {
      title: '分享',
      content: '右上角系统分享',
      path: '/pages/share/index'
    }
  }

  handleBaiduShare = () => {
    // 先判断环境
    if (IS_ENV_SWAN) {
      swan.openShare({
        title: '分享',
        content: '手百分享',
        path: '/pages/share/index',
        success: function (res) {
          Taro.showToast({
            title: 'share success'
          })
        },
        fail: function (err) {
          Taro.showToast({
            title: 'share fail'
          })
        }
      })
    }
  }

  handleH5Share = () => {
    // 目前自测发现可以调起UC、搜狗、手百
    const nativeShare = new NativeShare();
    nativeShare.setShareData({
      title: '分享',
      desc: 'h5专用分享',
      link: '/pages/share/index'
    })
    try {
      nativeShare.call()
    }
    catch (err) {
      Taro.showToast({
        title: '请使用浏览器自带的分享'
      })
    }
  }

  render () {
    return (
      <View>
        <Button
          size='mini'
          type='primary'
          open-type='share'
          style={{marginRight: '30PX'}}
        >share</Button>
        <Button size='mini' type='primary' onClick={this.handleBaiduShare}>手百share</Button>
        <Button
          size='mini'
          type='primary'
          style={`display: ${IS_ENV_H5 ? 'block' : 'none'};`}
          onClick={this.handleH5Share}
        >h5专用share</Button>
      </View>
    )
  }
}