<template lang="html">
<div class="singer">
  <list-view :data='singers' @select="selectSinger"></list-view>
  <router-view></router-view>
</div>
</template>

<script>
import {
  getSingerList
} from 'api/singer';
import {
  ERR_OK
} from 'api/config';
import Singer from 'common/js/singer';
import ListView from 'base/listview/listview';
import {
  mapMutations
} from 'vuex';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }));
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }));
      });
      // 为得到有序列表，需要处理map
      let hot = [];
      let ret = [];
      let other = [];
      for (let k in map) {
        let val = map[k];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        } else {
          val.title = '#';
          other.push(val);
        }
      }
      ret.sort((a, b) => {
        // 如果A-b为正数则为true，所以就是正序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      let aa = hot.concat(ret);
      return aa.concat(other);
    },
    selectSinger(singer) {
      // $router 编程试跳转接口
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
