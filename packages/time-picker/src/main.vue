<template>
  <div class="h-time-picker">
    <HInput
      ref="reference"
      v-model="input"
      placeholder="请输入"
      clearable
      @focus="handleInputFocus"></HInput>
    <div
      ref="popper"
      class="h-time-panel"
      :style="{width: listWidth}"
      v-show="showPopper">
      <div class="h-time-spinner">
        <div
          class="h-time-scroll"
          v-for="(value, name) in timeList"
          :key="name"
          @click.stop="handleTimeClick(name, $event)"
          @mouseenter="handleMouseOver(name)"
          :ref="name">
          <ul>
            <li :class="{ 'active': currentTime[name] === n, 'disabled': !isDisabled }" v-for="(isDisabled, n) in value" :key="n">{{n}}</li>
          </ul>
        </div>
      </div>
      <div class="h-time-footer">
        <button type="button" @click="cancel" class="h-time-btn">取消</button>
        <button type="button" @click="confirm" class="h-time-btn confirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import HInput from 'packages/input';
import popperMixin from 'src/mixins/popper'
import dayjs from 'dayjs'
import { debounce } from 'throttle-debounce'
import { getArray, setRangeData } from 'src/utils/time'
export default {
  name: 'HTimePicker',
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
      items: {
        hour: 24,
        minute: 60,
        second: 60
      },
      oldValue: null,
      ItemHeight: 32,
      tempValue: null
    }
  },
  computed: {
    input: {
      get() {
        // TODO
        // 这里判断 tempValue 由于输入的时候如果值不正确，会将值设为 this.value 但此时和之前的无变化，computed 不会更新，输入框的值还是 tempValue，但是实际的值是 this.value，这里这样做达到要求，思考下还有没有更好的做法？
        return this.tempValue ? this.tempValue : this.value ? dayjs(new Date(this.value)).format('HH:mm:ss') : null
      },
      set(val) {
        // val 不为空则是手动输入的
        if (val) {
          this.tempValue = val
        } else {
          // 点击清空按钮时
          this.$emit('input', this.showPopper ? new Date : null)
        }
      }
    },
    currentTime() {
      const time = new Date(this.value)
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    },
    // '18:30:00 - 20:30:00'
    // ['18:30:00 - 20:30:00', '21:30:00 - 23:30:00']
    rangeTime() {
      const obj = {
        0: 'start',
        1: 'end'
      }
      let range = this.pickerOptions.selectableRange
      if (range) {
        if (typeof range == 'string') {
          range = [range]
        }
        return range.map(item => {
          const [start, end] = item.split('-').map(item1 => {
            return item1.split(':').map(item2 => + item2)
          })
          return { start, end }
        })
      }
      return []
    },
    /* 计算时间列表，并根据时间范围设置是否为 disable
       hour 是将时间段内的小时数设为 true
       minute 是根据时间段和当前的hour 来计算，分为4种情况
       second 根据 hour 和 minute 来计算
    */
    timeList() {
      const currentHour = this.currentTime.hour
      const currentMinute = this.currentTime.minute
      // 把在范围内的所有小时数放在数组里
      let enableHour = []
      let hour = []
      let minute = new Array(60)
      let second = new Array(60).fill(true)
      this.rangeTime.forEach(item => {
        const { start, end } = item
        enableHour = enableHour.concat(getArray(start[0], end[0]))
        if (start[0] === currentHour && currentHour !== end[0]) {
          setRangeData(minute, start[1], 60, true)
          if (start[1] === currentMinute) {
            setRangeData(second, 0, start[2], false)
          }
        } else if (start[0] === currentHour && end[0] === currentHour) {
          setRangeData(minute, start[1], end[1]+1, true)
          if (start[1] === currentMinute && end[1] === currentMinute) {
            setRangeData(second, 0, start[2], false)
            setRangeData(second, end[2]+1, 60, false)
          } else if (start[1] === currentMinute && end[1] !== currentMinute) {
            setRangeData(second, 0, start[2], false)
          } else if (start[1] !== currentMinute && end[1] === currentMinute) {
            setRangeData(second, end[2]+1, 60, false)
          }
        } else if (start[0] !== currentHour && end[0] === currentHour) {
          setRangeData(minute, 0, end[1]+1, true)
          if (end[1] === currentMinute) {
            setRangeData(second, end[2]+1, 60, false)
          }
        } else if (start[0] < currentHour && currentHour < end[0]) {
          setRangeData(minute, 0, 60, true)
        }
      })
      for (let i = 0; i < 24; i++) {
        hour[i] = enableHour.indexOf(i) !== -1;
      }

      return {
        hour,
        minute,
        second
      }
    }
  },
  watch: {
    currentTime: {
      handler(obj) {
        this.$nextTick(() => this.adjustScroll(obj))
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(this.bindScrollEvent)
  },
  methods: {
    // 选中input里的值
    handleMouseOver(type) {
      if (type === 'hour') {
        this.setSelect(0, 2)
      } else if (type === 'minute') {
        this.setSelect(3, 5)
      } else if (type === 'second') {
        this.setSelect(6, 8)
      }
    },
    setSelect(start, end) {
      this.$refs.reference.$el.querySelector('input').setSelectionRange(start, end)
    },
    bindScrollEvent() {
      const bindFunction = type => {
        this.$refs[type][0].onscroll = debounce(200, e => {
          this.handleScroll(type, e)
        })
      }
      bindFunction('hour');
      bindFunction('minute');
      bindFunction('second');
    },
    // 滚动的时候将最近的一个时间设为当前时间
    handleScroll(type, e) {
      const value = Math.floor(e.target.scrollTop / this.ItemHeight)
      if (this.checkAble(type, value)) {
        this.$emit('input', dayjs(this.value).set(type, value).toDate())
      } else {
        // 不被选中，也要滚动到合适的位置
        this.adjustScroll({ ...this.currentTime, [type]: value })
      }
    },
    // 检查改值是否在取值范围内
    checkAble(type, value) {
      return this.timeList[type][value]
    },
    handleInputFocus() {
      if (this.value) {
        this.oldValue = this.value
      }
      if (!this.value) {
        this.$emit('input', new Date())
      }
      this.showPopperFn()
      this.$nextTick(() => this.adjustScroll(this.currentTime))
    },
    handleTimeClick(type, event) {
      const value = +event.target.innerHTML
      if (this.checkAble(type, value)) {
        this.$emit('input', dayjs(this.value).set(type, value).toDate())
      } else {
        // 不在范围内的值也要调整滚动位置
        this.adjustScroll({ ...this.currentTime, [type]: value })
      }
    },
    cancel() {
      if (this.tempValue) {
        this.$emit('input', this.value)
        this.tempValue = null
      } else {
        // 取消时检查值是否合法
        this.$emit('input', this.oldValue && this.checkTime(this.oldValue) ? this.oldValue : null)
      }
      this.hidePopperFn()
    },
    confirm() {
      let confirmValue = this.value
      if (this.tempValue) {
        // 手动输入的值合法就将值赋值
        const result = this.checkValue(this.tempValue)
        if (result) {
          const [hour, minute, second] = result
          confirmValue = dayjs(this.value.setHours(hour, minute, second)).toDate()
        }
        this.tempValue = null
      }
      // 值不在范围则用 old 值，如果old也不在范围则设为null， 一般在初始化的时候就不在范围或者点清空后当前时间不在范围才有这种情况
      if (!this.checkTime(confirmValue)) {
        if (this.oldValue && this.checkTime(this.oldValue)) {
          confirmValue = this.oldValue
        } else {
          confirmValue = null
        }
      }
      this.$emit('input', confirmValue)
      this.hidePopperFn()
    },
    // 检查时间是否在时间段内
    checkTime(date) {
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return this.checkAble('hour', hour) && this.checkAble('minute', minute) && this.checkAble('minute', minute)
    },
    clickOutsideCallback() {
      this.confirm()
    },
    adjustScroll(obj) {
      Object.keys(obj).forEach(key => {
        if (this.$refs[key]) {
          // 和 v-for 一起用返回的数组
          // 上下加2.5个li高度的空白
          this.$refs[key][0].scrollTop = obj[key] * this.ItemHeight
        }
      })
    },
    //12:11:11 检查输入的值是否合法
    checkValue(val) {
      if (!/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(val)) return false
      let arr = val.split(':')
      if (+arr[0] > 23 || +arr[1] > 59 || +arr[2] > 59) return false
      return [+arr[0], +arr[1], +arr[2]]
    },
  }
}
</script>
<style module>
</style>
