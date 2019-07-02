/**
 * @file 左滑删除
 */

import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import SwipeCard from '../../components/swipeCard/index'
import { getEvents, globalEventsName } from '../../common/events'

let list = [];
for (let i = 0; i < 30; i++) {
  const item = {
    title: `list${i}`,
    id: i + 1
  }
  list.push(item)
}

export default class Swipe extends Component {
  config = {
    navigationBarTitleText: '左滑删除'
  }

  state = {
    data: list,
    isScroll: true
  }

  componentWillMount () {
    // 有时候props值改变后，未重新渲染，可以注册一个全局事件
    // getEvents('global').trigger(globalEventsName.EVENT_CHANGE_COM_DATA, this.state.data)
    // 监听touchmove事件时，scrollview禁止滚动
    getEvents('global').on(globalEventsName.EVENT_LISTEN_TOUCH_MOVE, () => {
      this.setState({
        isScroll: false
      })
    })
    // touchmove结束时，恢复滚动
    getEvents('global').on(globalEventsName.EVENT_LISTEN_TOUCH_END, () => {
      this.setState({
        isScroll: true
      })
    })
  }

  handleScroll = () => {
    // 滚动时，关闭所有滑动效果
    getEvents('global').trigger(globalEventsName.EVENT_LISTEN_SCROLL)
  }

  render () {
    const { data, isScroll } = this.state;
    const prefix = 'swipe'
    // scrollview在某些手机上滚动不流畅，可以加overflow:auto，若想不滚动，除了设置scrollY之外，在h5上还需设置overflow:hidden
    return (
      <ScrollView
        scrollY={isScroll}
        style={`overflow: ${isScroll ? 'auto' : 'hidden'}; height: 100vh;`}
        onScroll={this.handleScroll}
      >
        <SwipeCard data={data} />
      </ScrollView>
    )
  }
}