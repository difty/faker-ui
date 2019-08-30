<template>
  <label class="h-radio">
    <span class="h-radio-input" :class="{'is-checked': label === model, 'is-disabled': disabled}">
      <span class="h-radio-inner"></span>
      <input
        ref="radio"
        class="h-radio-origin"
        type="radio"
        :disabled="disabled"
        v-model="model"
        :value="label"
        @change="handleChange">
    </span>
    <span class="h-radio-text">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
//v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。因此，Input 上面可以写 value
/*
text 和 textarea 元素使用 value 属性和 input 事件；
checkbox 和 radio 使用 checked 属性和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。

<input v-model="searchText">

<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>

在组件上使用 v-model
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>

*/
import Emitter from 'src/mixins/emitter.js'
export default {
  name: 'HRadio',
  mixins: [Emitter],
  props: {
    label: {},
    value: {},
    disabled: Boolean,
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        // radio group 触发父元素的 input 更新数据
        if (this.isGroup) {
          this.dispatch('HRadioGroup', 'input', [val]);
        } else {
          // 触发组件的 input 事件
          this.$emit('input', val)
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
      }
    },
    isGroup() {
      let parent = this.$parent
      while(parent) {
        if (parent.$options.name === 'HRadioGroup') {
          this._radioGroup = parent
          return true
        } else {
          parent = parent.$parent
        }
      }
      return false
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', this.model)
      this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model);
    }
  }
}
</script>
<style module>
</style>
