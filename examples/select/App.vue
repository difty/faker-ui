<template>
  <div class="demo">
    <Select v-model="value" placeholder="请选择">
      <Option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
      </Option>
    </Select>
  </div>
</template>
<script>
import Select from '../../packages/select'
import Option from '../../packages/option'
export default {
  components: { Select, Option },
  data() {
    return {
      value: '选项3',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }, {
        value: '选项6',
        label: '黄金糕'
      }, {
        value: '选项7',
        label: '双皮奶'
      }, {
        value: '选项8',
        label: '蚵仔煎'
      }, {
        value: '选项9',
        label: '龙须面'
      }, {
        value: '选项10',
        label: '北京烤鸭'
      }],
    }
  }
}
</script>
<style>
.demo {
  width: 200px;
  padding: 20px;
}
</style>
