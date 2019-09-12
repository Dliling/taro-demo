/**
 * @file api
 */
const DEMO_ORIGIN = process.env.TARO_ENV === 'h5' ? '' : 'http://127.0.0.1';

const IMG_LIST = `${DEMO_ORIGIN}/demo/imgList`;

export default {
  IMG_LIST
};
