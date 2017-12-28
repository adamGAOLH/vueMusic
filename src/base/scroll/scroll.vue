<template lang="html">
  <div class="" ref="wrapper">
    <slot>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click

      });
  // 1、父组件可以使用 props 把数据传给子组件。
  // 2、子组件可以使用 $emit 触发父组件的自定义事件。
  // vm.$emit( event, arg ) //触发当前实例上的事件
  // vm.$on( event, fn );//监听event事件后运行
      if (this.listenScroll) {
        let me = this;
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        });
      }
    },

    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // apply()方法能劫持另外一个对象的方法，继承另外一个对象的属性
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 监听data变化，如果变化从新调用
    data() {
      setTimeout(() => {
        this._initScroll();
      }, 20);
    }
  }

};
</script>

<style lang="css">
</style>
