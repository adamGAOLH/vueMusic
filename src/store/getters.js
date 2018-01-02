// 对数据的映射 计算属性 可以是函数 根据state.js不同值计算新的值
export const singer = state => state.singer;

export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playList = state => state.playList;

export const sequencelist = state => state.sequencelist;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {};
};
