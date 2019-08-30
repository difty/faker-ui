<template>
  <div class="h-radio-group">
    <slot></slot>
  </div>
</template>
<script>
/*
  重点 父组件需要将v-modal 数据传给子组件，子组件更新数据需要触发父组件的更新
  子组件需要派发数据给父组件，触发父组件的Input，并且需要获取父组件的 value
*/
export default {
  name: 'HRadioGroup',
  props: {
    value: {}
  }
}
</script>
<style module>
</style>
