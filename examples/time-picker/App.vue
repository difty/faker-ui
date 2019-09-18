<template>
  <div class="demo">
    <TimePicker
      v-model="value1"
      :picker-options="{
        selectableRange: '18:30:00 - 20:30:00'
      }"
      placeholder="任意时间点">
    </TimePicker>
    <TimePicker
      arrow-control
      v-model="value2"
      :picker-options="{
        selectableRange: '18:30:00 - 20:30:00'
      }"
      placeholder="任意时间点">
    </TimePicker>
  </div>
</template>
<script>
import TimePicker from '../../packages/time-picker'
export default {
  components: { TimePicker },
  data() {
    return {
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40)
    };
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
