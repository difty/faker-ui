<template>
  <div>
    <RadioGroup v-model="radio">
      <Radio :label="3">备选项</Radio>
      <Radio :label="6">备选项</Radio>
      <Radio :label="9">备选项</Radio>
    </RadioGroup>
  </div>
</template>
<script>
import RadioGroup from '../../packages/radio-group'
import Radio from '../../packages/radio'
export default {
  components: { RadioGroup, Radio },
  data() {
    return {
      radio: 3,
    }
  }
}
</script>
<style>
</style>
