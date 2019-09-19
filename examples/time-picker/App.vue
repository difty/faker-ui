<template>
  <div class="demo">
    <TimePicker
      v-model="value1"
      :picker-options="{
        selectableRange: '18:30:10 - 20:30:50'
      }"
      placeholder="任意时间点">
    </TimePicker>
    <TimePicker
      v-model="value3"
      :picker-options="{
        selectableRange: '18:30:10 - 18:30:50'
      }"
      placeholder="任意时间点">
    </TimePicker>
    <TimePicker
      arrow-control
      v-model="value2"
      :picker-options="{
        selectableRange: ['8:30:00 - 11:30:00', '21:18:09 - 23:35:10']
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
      value2: new Date(2016, 9, 10, 18, 40),
      value3: new Date(2016, 9, 10, 18, 40),
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
