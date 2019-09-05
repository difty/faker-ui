<template>
  <div>
    <CheckboxGroup v-model="checkList">
      <Checkbox label="复选框 A"></Checkbox>
      <Checkbox label="复选框 B"></Checkbox>
      <Checkbox label="复选框 C"></Checkbox>
    </CheckboxGroup>
    <Checkbox v-model="test" true-label="yes" false-label="no">test1</Checkbox>
    <Checkbox v-model="test">test2</Checkbox>
  </div>
</template>
<script>
import CheckboxGroup from '../../packages/checkboxGroup'
import Checkbox from '../../packages/checkbox'
export default {
  components: { CheckboxGroup, Checkbox },
  data() {
    return {
      checkList: ['复选框 A', '复选框 C'],
      test: ''
    }
  }
}
</script>
<style>
</style>
