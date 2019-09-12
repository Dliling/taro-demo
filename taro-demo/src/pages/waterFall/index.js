/**
 * @file 瀑布流
 */

import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import API from '../../common/api';

import './index.less';

export default class WaterFall extends Component {
  config = {
    navigationBarTitleText: '瀑布流'
  }

  state = {
    leftList: [],
    rightList: [],
    hasMore: false,
    noNetWork: false
  }

  pageNum = 1;
  pageSize = 10;
  leftHeight = 0;
  rightHeight = 0;

  componentWillMount () {
    Taro.showLoading({
      title: '正在获取数据'
    });
    Taro.getSystemInfo({
      success: (res) => {
        let wid = res.windowWidth;
        let hei = res.windowHeight;
        this.setState({
          imgWidth: wid * 0.48,
          scrollH: hei
        })
      }
    });
    this.fetchImg();
  }

  fetchImg () {
    Taro.request({
      url: API.IMG_LIST,
      data: {
        pageNum: this.pageNum
      }
    })
      .then(res => {
        Taro.hideLoading();
        const list = res.data.data.list;
        if (!list || list.length === 0) {
          this.setState({
            hasMore: false
          });
          return;
        }
        this.setState({
          hasMore: true
        });
        const newList = [...list, ...list, ...list];
        this.dealListData(newList);
        this.pageNum += 1;
      })
      .catch(err => {
        Taro.hideLoading();
        if (this.pageNum === 1) {
          this.setState({
            noNetWork: true
          });
        }
        else {
          this.setState({
            hasMore: false
          });
        }
      });
  }

  dealListData (list) {
    const screenW = Taro.getSystemInfoSync().screenWidth;
    const itemW = 352 * ( screenW / 750 );
    let leftList = [];
    let rightList = [];
    list.forEach(item => {
      if (!item.imgW || !item.imgH) {
        return;
      }
      if (this.leftHeight <= this.rightHeight) {
        const itemH = parseInt((itemW / item.imgW) * item.imgH, 10);
        item.itemH = itemH;
        leftList.push(item);
        this.leftHeight += itemH;
      }
      else {
        const itemH = parseInt((itemW / item.imgW) * item.imgH, 10);
        item.itemH = itemH;
        rightList.push(item);
        this.rightHeight += itemH;
      }
    });
    
    this.setState({
      leftList: this.state.leftList.concat(leftList),
      rightList: this.state.rightList.concat(rightList)
    });
  }

  handleScrollToLower = () => {
    this.fetchImg();
  }

  render () {
    const { leftList, rightList } = this.state;
    const prefix = 'waterfall';

    return (
      <View className={prefix}>
        <ScrollView
          scrollY
          className={`${prefix}-wrapper`}
          lowerThreshold={100}
          onScrollToLower={this.handleScrollToLower}
        >
          <View className={`${prefix}-left`}>
            {
              leftList && leftList.length && leftList.map((item, index) => (
                <View style={{height: `${item.itemH}Px`, marginBottom: '10Px'}}>
                  <Image
                    className={`${prefix}-item`}
                    mode='scaleToFill'
                    style={{height: `${item.itemH}Px`}}
                    src={item.imgSrc}
                  />
                </View>
              ))
            }
          </View>
          <View className={`${prefix}-right`}>
            {
              rightList && rightList.length && rightList.map((item, index) => (
                <View style={{height: `${item.itemH}Px`, marginBottom: '10Px'}}>
                  <Image
                    className={`${prefix}-item`}
                    mode='scaleToFill'
                    style={{height: `${item.itemH}Px`}}
                    src={item.imgSrc}
                  />
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}