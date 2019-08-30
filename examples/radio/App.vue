<template>
  <div>
    <Radio :label="1" v-model="radio">选项1</Radio>
    <Radio :label="2" v-model="radio">选项2</Radio>
    <Radio :label="2" v-model="radio" disabled>选项2</Radio>
    <Radio :label="4" v-model="radio" disabled>选项4</Radio>
  </div>
</template>
<script>
import Radio from '../../packages/radio'
export default {
  components: { Radio },
  data() {
    return {
      radio: 2
    }
  }
}
</script>
<style>
</style>
