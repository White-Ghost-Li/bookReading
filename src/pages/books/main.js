import Vue from 'vue'
import App from './book'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
