import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';

import './index.less';

export default class Skeleton extends Component {
    static defaultProps = {
        selector: '',
        bgColor: '',
        itemColor: ''
    }

    state = {
        radiusList: [],
        rectList: []
    }

    componentDidMount() {
        const that = this;
        // 百度小程序目前不支持跨自定义组件的后代选择器
        // 微信小程序, H5中支持，可修改为如`.${this.props.selector} >>> .${this.props.selector}-radius`
        Taro.createSelectorQuery().selectAll(`.${this.props.selector} .${this.props.selector}-radius`)
            .boundingClientRect().exec(rect => {
                that.setState({
                    radiusList: rect[0]
                });
            });
        Taro.createSelectorQuery().selectAll(`.${this.props.selector} .${this.props.selector}-rect`)
            .boundingClientRect().exec(rect => {
                that.setState({
                    rectList: rect[0]
                });
            });
    }

    render() {
        const {sHeight, sWidth, radiusList, rectList} = this.state;
        const {bgColor, itemColor} = this.props;
        return(
            <View className='skeleton-container' style={{background: `${bgColor}`}}>
                {
                    radiusList.map(radiusItem => (
                        <View className='skeleton-item skeleton-item-radius' style={{width: `${radiusItem.width}PX`, height: `${radiusItem.height}PX`,
                            background: `${itemColor}`, top: `${radiusItem.top}PX`, left: `${radiusItem.left}PX`}}
                        />
                    ))
                }
                {
                    rectList.map(rectItem => (
                        <View className='skeleton-item' style={{width: `${rectItem.width}PX`, height: `${rectItem.height}PX`,
                            background: `${itemColor}`, top: `${rectItem.top}PX`, left: `${rectItem.left}PX`}}
                        />
                    ))
                }
            </View>
        )
    }
}