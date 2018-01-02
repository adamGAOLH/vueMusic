import {
  playMode
} from 'common/js/config';
// 定义原始数据 相关模块数据
// 1.写states.js
// 2.写getting.js
// 3.写mutation-types.js
// 4.写mutation.js
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequencelist: [],
  mode: playMode.sequence,
  currentIndex: -1

};

export default state;
