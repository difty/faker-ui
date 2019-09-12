<template>
  <div class="h-select">
    <HInput ref="reference" readonly v-model="input" @focus="handleFocus"></HInput>
    <div
      class="h-select-list"
      ref="popper"
      :class="popperClass"
      :style="{width: listWidth}"
      v-show="showPopper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * 这个组件和autocomplete类似，elementUI里使用 select 包裹 option，需要在 input 里显示label的值，label的值又是与value一一对应的，但这两个值又在option组件上，因此存在问题是如何在 select 组件里获取 value 对应的 label，这里采用 provide 和 inject 将 select 组件注入 option 组件，在option组件里把值push到select组件。
 *
 * 但其实做的时候觉得并不是一个好的方法，不如类似 autocomplete 的做法直接在 select 组件上传入 list，目前不知道为什么要那样做，或许是因为原生组件是 select 和 option结合的？
 */
import HInput from 'packages/input';
import PopperJs from 'popper.js';

export default {
  name: 'HSelect',
  components: {
    HInput,
  },
  provide() {
    return {
      'select': this
    };
  },
  props: {
    value: {},
    popperClass: String,
    placeholder: String,
    placement: {
      type: String,
      default: 'bottom-start'
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      options: [], // inject 这个值，搜集option上的值
      showPopper: false,
      listWidth: ''
    }
  },
  computed: {
    input() {
      return this.getLabel(this.value)
    }
  },
  created() {
    this.$on('handleOptionClick', this.handleOptionSelect);
  },
  mounted() {
    this.referenceElement = this.$refs.reference.$el;
    this.popperElement = this.$refs.popper;
    this.listWidth = this.referenceElement.offsetWidth + 'px'
    if (this.popperAppendToBody) {
      document.body.appendChild(this.popperElement);
    }
    this.popper = new PopperJs(this.referenceElement, this.popperElement, {
      placement: this.placement
    });
    document.addEventListener('click', this.handleClick)
  },
  methods: {
    getLabel(val) {
      return (this.options.filter(item => item.value === val)[0] || {}).label || ''
    },
    handleClick(e) {
      if (this.referenceElement.contains(e.target)) return
      this.showPopper = false
    },
    handleFocus() {
      this.showPopper = true
    },
    handleOptionSelect(value) {
      this.$emit('input', value)
      this.showPopper = false
    }
  }
}
</script>
<style module>
</style>
