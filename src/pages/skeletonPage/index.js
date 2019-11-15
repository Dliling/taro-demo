import Taro, {Component} from '@tarojs/taro';
import {View, Image, Text} from '@tarojs/components';
import Skeleton from '../../components/skeleton';
import List from '../../components/list';

export default class SkeletonPage extends Component {

    state = {
        userInfo: {
            avatarUrl: '',
            nickName: 'Jack'
        },
        list: [
            'aslkdnoakjbsnfkajbfk',
            'qwrwfhbfdvndgndghndeghsdfh',
            'qweqwtefhfhgmjfgjdfghaefdhsdfgdfh'
        ],
        showSkeleton: true,
        systemInfo: Taro.getSystemInfoSync()
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                showSkeleton: false
            });
        }, 3000);
    }

    render () {
        const {userInfo, list, showSkeleton} = this.state;
        return (
            <View className='container' style={{fontSize: '20PX'}}>
                {
                    showSkeleton && <Skeleton
                        selector='skeleton'
                        bgColor='pink'
                        itemColor='skyblue'
                    />
                }
                <View className='skeleton'>
                    <View className='userInfo'>
                        <Image
                            src={userInfo.avatarUrl}
                            alt='用户头像'
                            className='userInfo-avatar skeleton-radius'
                        />
                        <Text>{userInfo.nickName}</Text>
                    </View>
                    <View>
                        {
                            list.map(item => (
                                <View className='skeleton-rect' style={{marginBottom: '30PX'}}>{item}</View>
                            ))
                        }
                    </View>
                    {/* 自定义组件外层没有元素包裹，否则微信小程序无法识别，但是H5可以识别 */}
                    <List />
                </View>
            </View>
        );
    }
}
