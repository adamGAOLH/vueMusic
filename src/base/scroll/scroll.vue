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
    propType: {
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
        propType: this.propType,
        click: this.click

      });
    },

    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
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
