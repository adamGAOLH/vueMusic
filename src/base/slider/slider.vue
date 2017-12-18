<template lang="html">
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentpageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {
  addClass
} from 'common/js/dom';
export default {
  data() {
    return {
      dots: [],
      currentpageIndex: 0
    };
  },
  //  轮播：1.先设置属性，设置功能
  props: {
    // 循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autPlay: {
      type: Boolean,
      default: true
    },
    // 轮播间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  // 利用钩子进行初始化渲染better-scroll，
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autPlay) {
        this.play();
      }
    }, 20);

    // 监听resize事件
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    // 2设置计算slider宽度，
    _setSliderWidth(isResize) {
      // 获取列表元素
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      // 获取当前宽度
      let sliderWidth = this.$refs.slider.clientWidth;
      // 遍历children,添加classname，设置child宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      // 循环轮播为true克隆两个
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // 初始化slider
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false, // 惯性
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX; // 为第几个子元素
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentpageIndex = pageIndex;
        if (this.autPlay) {
          // 清除settimeout
          clearTimeout(this.timer);
          this.play();
        }
      });
    },
    // 设置下苗点
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    play() {
      let pageIndex = this.currentpageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  },
  // 清除
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
