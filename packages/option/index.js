import Option from './src/main'

Option.install = function(Vue) {
  Vue.component(Option.name, Option)
}
export default Option
