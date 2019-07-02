/**
 * @file 左滑列表项
 */

import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { getEvents, globalEventsName } from '../../../common/events'

import './index.less'

export default class SwipeItem extends Component {
  static defaultProps = {
    item: {},
    index: '',
    currentIndex: '',
    onSetCurIndex: () => {}
  }

  state = {
    hasTransition: false
  }

  componentWillMount () {
    getEvents('global').on(globalEventsName.EVENT_LISTEN_SCROLL, () => {
      this.setState({
        hasTransition: true
      })
      this.moveX = 0
    })
  }

  componentDidMount () {
    this.startX = 0
    this.currentX = 0
    this.moveX = 0
    this.moveY = 0
  }

  handleTouchStart = e => {
    this.startX = e.touches[0].pageX
    this.startY = e.touches[0].pageY
  }

  handleTouchMove (index, e) {
    // 若想阻止冒泡且最外层盒子为scrollView，不可用e.stopPropogagation()，否则页面卡死
    this.currentX = e.touches[0].pageX
    this.moveX = this.currentX - this.startX
    this.moveY = e.touches[0].pageY - this.startY
    // 纵向移动时return
    if (Math.abs(this.moveY) > Math.abs(this.moveX)) {
      return
    }
    // 滑动超过一定距离时，才触发
    if (Math.abs(this.moveX) < 10 ) {
      return
    }
    else {
      // 否则没有动画效果
      this.setState({
        hasTransition: true
      })
    }
    this.props.onSetCurIndex(index)
  }

  handleTouchEnd = e => {
    // 结束时，置为true，否则render时不生效
    this.setState({
      hasTransition: true
    })
  }

  render () {
    const { item, index, currentIndex } = this.props
    const { hasTransition } = this.state
    // 左滑时，出现del，右滑时，恢复原位，距离为操作按钮大小
    // 也可以将滑动距离作为移动距离，但是效果不太好
    const distance = this.moveX >= 0 ? 0 : -32
    const prefix = 'swipe-item'
    let moveStyle = {}
    // 排他性，若某一个处于滑动状态时，其他都回归原位
    if (hasTransition && currentIndex === index) {
      moveStyle.transform = `translateX(${distance}PX)`
      moveStyle.webkitTransform = `translateX(${distance}PX)`
      moveStyle.transition = 'transform 0.3s ease'
      moveStyle.WebkitTransition = 'transform 0.3s ease'
    }

    return (
      <View className={prefix}>
        <View className={`${prefix}-wrap`} style={moveStyle}>
          <View
            className={`${prefix}-left`}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove.bind(this, index)}
            onTouchEnd={this.handleTouchEnd}
          >
            <View>{item.title}</View>
          </View>
          <View className={`${prefix}-right`}>
            <View className={`${prefix}-del`}>del</View>
          </View>
        </View>
      </View>
    )
  }
}