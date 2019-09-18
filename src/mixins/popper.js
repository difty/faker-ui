import PopperJs from 'popper.js';

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      showPopper: false,
      listWidth: ''
    }
  },
  mounted() {
    this.referenceElement = this.$refs.reference.$el;
    this.popperElement = this.$refs.popper;
    this.listWidth = this.referenceElement.offsetWidth + 'px'
    if (this.popperAppendToBody) {
      document.body.appendChild(this.popperElement);
    }
    this.popper = new PopperJs(this.referenceElement, this.popperElement, {
      placement: this.placement
    });
    document.addEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(e) {
      if (this.referenceElement.contains(e.target) ||
        this.popperElement.contains(e.target) ||
        this.popperElement === e.target
      ) return
      if (this.showPopper) {
        this.hidePopperFn()
          if (this.clickOutsideCallback) {
            this.clickOutsideCallback()
          }
        }
      },
    showPopperFn() {
      this.showPopper = true
    },
    hidePopperFn() {
      this.showPopper = false
    },
  }
}
