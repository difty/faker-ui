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
          v-for="(value, name) in items"
          :key="name"
          @click.stop="handleTimeClick(name, $event)"
          @mouseenter="handleMouseOver(name)"
          :ref="name">
          <ul>
            <li :class="{ 'active': currentTime[name] === n-1 }" v-for="n in value" :key="n">{{n-1}}</li>
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
    }
  },
  computed: {
    input: {
      get() {
        return this.value ? dayjs(new Date(this.value)).format('HH:mm:ss') : null
      },
      set(val) {
        this.$emit('input', val ? val : (this.showPopper ? new Date : null))
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
      this.$emit('input', dayjs(this.value).set(type, value).toDate())
    },
    handleInputFocus() {
      this.oldValue = this.value
      if (!this.value) {
        this.$emit('input', new Date())
      }
      this.showPopperFn()
      this.$nextTick(() => this.adjustScroll(this.currentTime))
    },
    handleTimeClick(type, event) {
      this.$emit('input', dayjs(this.value).set(type, +event.target.innerHTML).toDate())
    },
    cancel() {
      this.$emit('input', this.oldValue)
      this.hidePopperFn()
    },
    confirm() {
      this.hidePopperFn()
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
  }
}
</script>
<style module>
</style>
