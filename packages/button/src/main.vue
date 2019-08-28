<template>
  <button class="h-button"
    @click="handleClick"
    :disabled="disabled"
    :class="[
      type ? 'h-button-' + type : '',
      size ? 'h-button-' + size : '',
      {
      'is-round': round,
      'is-disabled': disabled
      }]">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'HButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    round: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  },
}
</script>
