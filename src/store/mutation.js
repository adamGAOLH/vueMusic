import * as types from './mutation-types';
// (所有export属性) as (到) types (types变量) from (从)
const matutaions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  }
};

export default matutaions;
