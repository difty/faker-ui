<template>
  <div class="demo">
    <DatePicker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </DatePicker>
  </div>
</template>
<script>
import DatePicker from '../../packages/date-picker'
export default {
  components: { DatePicker },
  data() {
    return {
      value1: new Date(2019, 8, 10)
    }
  }
}
</script>
<style>
.demo {
  display: flex;
}
.demo div {
  margin: 20px;
}
</style>
