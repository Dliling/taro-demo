/**
 * @file 左滑删除卡片
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SwipeItem from './swipeItem/index'
import { getEvents, globalEventsName } from '../../common/events'

export default class SwipeCard extends Component {
  static defaultProps = {
    data: []
  }

  state = {
    // datas: this.props.data
    currentIndex: ''
  }

  componentWillMount () {
    // 有时候props值改变后，未重新渲染，可以注册一个全局事件
    // getEvents('global').on(globalEventsName.EVENT_CHANGE_COM_DATA, data => {
    //   this.setState({
    //     datas: data
    //   })
    // })
  }

  handleCurIndex = index => {
    // 设置当前滑动项，做排他性
    this.setState({
      currentIndex: index
    })
  }

  render () {
    const { data } = this.props
    const { currentIndex } = this.state
    const prefix = 'swipe-card'

    return (
      <View className={prefix}>
        {
          data && data.length && data.map((item, index) => (
            <SwipeItem
              item={item}
              key={item.id}
              index={index}
              currentIndex={currentIndex}
              onSetCurIndex={this.handleCurIndex}
            />
          ))
        }
      </View>
    )
  }
}