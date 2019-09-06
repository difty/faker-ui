<template>
  <div class="h-checkbox">
    <label>
      <span class="h-checkbox-input" :class="{'is-disabled': disabled, 'is-checked': isChecked}">
        <span class="h-checkbox-inner"></span>
        <input
          class="h-checkbox-original"
          v-if="trueLabel || falseLabel"
          type="checkbox"
          :value="label"
          :true-value="trueLabel"
          :false-value="falseLabel"
          v-model="model" />
        <input
          v-else
          class="h-checkbox-original"
          type="checkbox"
          :value="label"
          v-model="model" />
      </span>
      <span class="h-checkbox-text">
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
      </span>
    </label>
  </div>
</template>
<script>
// checkbox 绑定 v-model时会自动处理与 value 中的值比较
// https://github.com/vuejs/vue/blob/dev/src/platforms/web/compiler/directives/model.js#L67
import Emitter from 'src/mixins/emitter.js'

export default {
  name: 'HCheckbox',
  mixins: [Emitter],
  props: {
    label: {},
    value: {},
    disabled: Boolean,
    trueLabel: {},
    falseLabel: {},
    disabled: Boolean,
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this._checkboxGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('HCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val)
        }
      }
    },
    isGroup() {
      let parent = this.$parent
      while(parent) {
        if (parent.$options.name === 'HCheckboxGroup') {
          this._checkboxGroup = parent
          return true
        } else {
          parent = parent.$parent
        }
      }
      return false
    },
    isChecked() {
      if (typeof this.model === 'boolean') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', this.model)
      this.isGroup && this.dispatch('HCheckboxGroup', 'handleChange', this.model);
    }
  }
}
</script>
<style module>
</style>
