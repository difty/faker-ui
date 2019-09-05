<template>
  <div>
    <Checkbox v-model="checked">备选项</Checkbox>
  </div>
</template>
<script>
import Checkbox from '../../packages/checkbox'
export default {
  components: { Checkbox },
  data() {
    return {
      checked: true,
    }
  }
}
</script>
<style>
</style>
