import Vue from 'vue'
import App from './comment.vue'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
