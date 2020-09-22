import Vue from 'vue'
import App from './detail.vue'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
