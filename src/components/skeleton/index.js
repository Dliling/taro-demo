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
        // 百度小程序目前不支持跨自定义组件的后代选择器: >>>
        // 但是H5使用后代选择器(.the-ancestor .the-descendant)的时候，可以自动识别自定义组件内的后代
        // 微信小程序支持跨自定义组件的后代选择器(.the-ancestor >>> .the-descendant)，可修改为如`.${this.props.selector} >>> .${this.props.selector}-radius`
        // if (process.env.TARO_ENV === 'weapp') {
        //     Taro.createSelectorQuery().selectAll(`.${this.props.selector} >>> .${this.props.selector}-radius`)
        //         .boundingClientRect().exec(rect => {
        //             that.setState({
        //                 radiusList: rect[0]
        //             });
        //         });
        // }
        // else {
        //     Taro.createSelectorQuery().selectAll(`.${this.props.selector} .${this.props.selector}-radius`)
        //     .boundingClientRect().exec(rect => {
        //         that.setState({
        //             radiusList: rect[0]
        //         });
        //     });
        // }
        this.getGraphList(this.props.selector, `${this.props.selector}-radius`)
            .then(res => {
                that.setState({
                    radiusList: res
                });
            });
        this.getGraphList(this.props.selector, `${this.props.selector}-rect`)
            .then(res => {
                that.setState({
                    rectList: res
                });
            });
    }

    getGraphList(ancestor, descendant) {
        const that = this;
        return new Promise((resolve, reject) => {
            if (process.env.TARO_ENV === 'weapp') {
                Taro.createSelectorQuery().selectAll(`.${ancestor} >>> .${descendant}`)
                    .boundingClientRect().exec(rect => {
                        resolve(rect[0]);
                    });
            }
            else {
                Taro.createSelectorQuery().selectAll(`.${ancestor} .${descendant}`)
                .boundingClientRect().exec(rect => {
                    resolve(rect[0]);
                });
            }     
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