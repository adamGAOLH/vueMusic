import Vue from 'vue';
import Router from 'vue-router';
import Recommend from 'components/recommend/recommend';
import Rank from 'components/rank/rank';
import Search from 'components/search/search';
import Singer from 'components/singer/singer';
import SingerDetail from 'components/singer-detail/singer-detail';
Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend' // 默认根属性
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        // :id 表示已id为变量
        path: ':id',
        component: SingerDetail
      }]
    }
  ]
});
