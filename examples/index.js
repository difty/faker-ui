import Vue from 'vue'
import './index.css'
import App from './autocomplete/App.vue'
import '../packages/theme-default/index.scss'
new Vue({
  el: '#app',
  render: h => h(App),
})
