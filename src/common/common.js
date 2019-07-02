/**
 * @file 公共方法
 */
import Taro from '@tarojs/taro'

export const IS_ENV_H5 = process.env.TARO_ENV === 'h5'
export const IS_ENV_SWAN = process.env.TARO_ENV === 'swan'