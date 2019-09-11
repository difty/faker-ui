<template>
  <div
    ref="input"
    class="h-input"
    :class="{'is-disabled': disabled}">
    <textarea
      class="h-input-textarea"
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      v-model="model"
      :disabled="disabled"
      :maxlength="maxlength"
      :rows="rows"
      @focus="handleFocus"
      @blur="handleBlur">
    </textarea>
    <input
      v-else
      @focus="handleFocus"
      @blur="handleBlur"
      :maxlength="maxlength"
      class="h-input-inner"
      :placeholder="placeholder"
      v-model="model"
      :disabled="disabled"
      :type="showPassword ? (passwordVisible ? 'password' : 'text') : type">
    <span class="h-input-suffix">
      <i
        @click="clear"
        v-if="showClearIcon"
        class="h-input-icon el-icon-circle-close"></i>
      <i
        @click="togglePassword"
        v-if="showPw"
        class="h-input-icon el-icon-view"></i>
    </span>
  </div>
</template>
<script>
// element 的 textarea 可以自适应高度，根据输入的内容创建一个隐藏的 textarea，然后根据这个的高度来赋值给真实的
export default {
  name: 'HInput',
  props: {
    value: {},
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    type: String,
    showPassword: Boolean,
    rows: Number,
    maxlength: Number,
  },
  data() {
    return {
      passwordVisible: true
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    showClearIcon() {
      return this.model && this.clearable
    },
    showPw() {
      return this.model && this.showPassword
    }
  },
  methods: {
    clear() {
      this.$emit('input', '')
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible
    },
    handleFocus() {
      this.$emit('focus')
    },
    handleBlur() {
      this.$emit('blur')
    }
  }
}
</script>
<style module>
</style>
