<template>
  <div class="h-autocomplete">
    <HInput ref="reference" v-model="input" @focus="handleFocus" :placeholder="placeholder"></HInput>
    <div
      class="h-autocomplete-list"
      :class="popperClass"
      ref="popper"
      v-show="showPopper && suggestions.length"
      :style="{width: listWidth}">
      <ul>
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          @click="select(item)">
          {{item.value}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/**
 * 这里使用简单的方式实现，elementUI 把 popper 封装成了 mixin, clickoutside 封装成了 directive
 */
import PopperJs from 'popper.js';
import { debounce } from 'throttle-debounce';
import HInput from 'packages/input';
export default {
  name: 'HAutocomplete',
  components: {
    HInput
  },
  props: {
    value: {},
    fetchSuggestions: Function,
    popperClass: String,
    placeholder: String,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 300
    },
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
      showPopper: false,
      suggestions: [],
      listWidth: ''
    }
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    input(val, oldVal) {
      if (val !== oldVal) {
        this.debounceGetData(val)
        this.showPopper = true
      }
    }
  },
  mounted() {
    this.debounceGetData = debounce(this.debounce, this.getData);
    this.referenceElement = this.$refs.reference.$el;
    this.popperElement = this.$refs.popper;
    this.listWidth = this.referenceElement.offsetWidth + 'px'
    if (this.popperAppendToBody) {
      document.body.appendChild(this.popperElement);
    }
    this.popper = new PopperJs(this.referenceElement, this.popperElement, {
      placement: this.placement
    });
    // 点击元素之外隐藏
    document.addEventListener('click', this.handleClick)
  },
  methods: {
    handleClick(e) {
      if (this.referenceElement.contains(e.target)) return
      this.showPopper = false
    },
    handleFocus() {
      // focus 或 内容不为空的时候显示列表
      if (this.triggerOnFocus || this.input) {
        this.debounceGetData(this.input)
        this.showPopper = true
      }
    },
    handleBlur() {
      this.showPopper = false
    },
    getData(queryString) {
      this.fetchSuggestions(queryString, (suggestions) => {
        if (Array.isArray(suggestions)) {
          this.suggestions = suggestions;
        }
      });
    },
    select(item) {
      this.input = item.value
      this.$emit('select', item)
      this.$nextTick(() => {
        this.showPopper = false
        this.suggestions = []
      })
    }
  }
}
</script>
<style module>
</style>
