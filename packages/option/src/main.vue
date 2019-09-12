<template>
  <li class="h-option" @click.stop="selectItem" :class="{'select': select.value === value }">
    <slot><span>{{label}}</span></slot>
  </li>
</template>
<script>
import Emitter from 'src/mixins/emitter.js'

export default {
  name: 'HOption',
  mixins: [Emitter],
  inject: ['select'],
  props: {
    label: {},
    value: {}
  },
  created() {
    this.select.options.push({
      value: this.value,
      label: this.label
    })
  },
  methods: {
    selectItem() {
      this.dispatch('HSelect', 'handleOptionClick', this.value);
    }
  }
}
</script>
<style module>
</style>
