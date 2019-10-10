<template>
  <div class="h-date-picker">
    <HInput
      ref="reference"
      v-model="input"
      :placeholder="placeholder"
      clearable
      @focus="handleInputFocus"></HInput>
      <div
        class="h-date-panel"
        ref="popper"
        v-show="showPopper">
        <div class="date-panel-header">
          <span class="header-icon el-icon-d-arrow-left" @click="handleClick('year', 'pre')"></span>
          <span class="header-icon el-icon-arrow-left" @click="handleClick('month', 'pre')"></span>
          <span class="time">{{currentYear}}年{{currentMonth + 1}}月</span>
          <span class="header-icon el-icon-arrow-right" @click="handleClick('month', 'next')"></span>
          <span class="header-icon el-icon-d-arrow-right" @click="handleClick('year', 'next')"></span>
        </div>
        <div class="date-panel-body">
          <div class="panel-body-head">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
          <div class="panel-body-content" @click="selectDate">
            <span
              v-for="(item, index) in dateList"
              :key="index"
              :class="{'today': item.type === 'current' && isCurrentMonth && item.value === dayOfToday, 'disabled': item.type !== 'current', 'current': item.type === 'current' && isSelectedMonth && item.value === dayOfSelectedDate }"
              >{{item.value}}</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import HInput from 'packages/input';
import popperMixin from 'src/mixins/popper'
import dayjs from 'dayjs'
import { debounce } from 'throttle-debounce'
const isLeapYear = year => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const leapDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export default {
  name: 'HDatePicker',
  mixins: [popperMixin],
  components: {
    HInput,
  },
  props: {
    value: {},
    pickerOptions: {},
    placeholder: String,
  },
  data() {
    return {
      currentDate: new Date(),
      today: new Date()
    }
  },
  computed: {
    input: {
      get() {
        if (!this.value) return ''
        return `${this.value.getFullYear()}-${this.value.getMonth() + 1}-${this.value.getDate()}`
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    yearOfSelectedDate() {
      if (!this.value) return ''
      return this.value.getFullYear()
    },
    monthOfSelectedDate() {
      if (!this.value) return ''
      return this.value.getMonth()
    },
    dayOfSelectedDate() {
      if (!this.value) return ''
      return this.value.getDate()
    },
    isSelectedMonth() {
      return this.yearOfSelectedDate === this.currentYear && this.monthOfSelectedDate === this.currentMonth
    },
    yearOfToday() {
      return this.today.getFullYear()
    },
    monthOfToday() {
      return this.today.getMonth()
    },
    dayOfToday() {
      return this.today.getDate()
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    currentMonth() {
      return this.currentDate.getMonth()
    },
    currentDay() {
      return this.currentDate.getDate()
    },
    isCurrentMonth() {
      return this.yearOfToday === this.currentYear && this.monthOfToday === this.currentMonth
    },
    dateList() {
      let list = []
      const daysOfEachMonth = isLeapYear(this.currentYear) ? leapDays : days
      let time = new Date(this.currentYear, this.currentMonth, 1)
      // 当月1号是星期几
      const day = time.getDay()
      // 当月的天数
      const daysOfMonth = daysOfEachMonth[this.currentMonth]
      let daysOfPreMonth = daysOfEachMonth[this.currentMonth - 1 < 0 ? 11 : this.currentMonth - 1]
      // 用上个月补齐前面的部分
      for (let i = day; i > 0; i--) {
        list.unshift({
          value: daysOfPreMonth--,
          type: 'previos'
        })
      }
      for (let j = 1; j <= daysOfMonth; j++) {
        list.push({ value: j, type: 'current' })
      }
      let k = 1
      // 用下个月补齐后面的部分
      while(list.length < 42) {
        list.push({ value: k, type: 'next' })
        k++
      }
      return list
    }
  },
  created() {
  },
  methods: {
    handleInputFocus() {
      // 使用初始日期初始化当前月份
      if (this.value) {
        this.currentDate = this.value
      }
      this.showPopperFn()
    },
    handleClick(type, condition) {
      let time
      if (type === 'year') {
        if (condition === 'pre') {
          time = new Date(this.currentYear - 1, this.currentMonth, this.currentDay)
        } else if (condition === 'next') {
          time = new Date(this.currentYear + 1, this.currentMonth, this.currentDay)
        }
      } else if (type === 'month') {
        if (condition === 'pre') {
          time = new Date(this.currentYear, this.currentMonth - 1, this.currentDay)
        } else if (condition === 'next') {
          time = new Date(this.currentYear, this.currentMonth + 1, this.currentDay)
        }
      }
      this.currentDate = time
    },
    selectDate(e) {
      const day = +e.target.innerHTML
      const selectedDate = new Date(this.currentYear, this.currentMonth, day)
      this.$emit('input', selectedDate)
      this.hidePopperFn()
    }
  }
}
</script>
<style module>
</style>
