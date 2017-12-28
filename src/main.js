// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import 'common/stylus/index.styl';
import VueLazyLoad from 'vue-lazyload';
Vue.config.productionTip = false;
fastclick.attach(document.body); // 阻止300毫秒延迟
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
