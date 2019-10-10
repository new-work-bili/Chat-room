// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import animated from 'animate.css'
import moment from 'moment'
import store from './store'

import './style/reset.css'
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
