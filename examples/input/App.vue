<template>
  <div class="demo">
    <HInput v-model="input" placeholder="请输入"></HInput>
    <HInput v-model="input" placeholder="请输入" :maxlength="11"></HInput>
    <HInput v-model="input" placeholder="请输入" :disabled="true"></HInput>
    <HInput v-model="input" placeholder="请输入" clearable></HInput>
    <HInput v-model="password" placeholder="请输入" show-password></HInput>
    <HInput v-model="textarea" placeholder="请输入" :rows="5" type="textarea"></HInput>
  </div>
</template>
<script>
import HInput from '../../packages/input'
export default {
  components: { HInput },
  data() {
    return {
      input: '',
      textarea: '',
      password: ''
    }
  }
}
</script>
<style>
.demo {
  width: 200px;
}
.demo div {
  margin: 20px;
}
</style>
