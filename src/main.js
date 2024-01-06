import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import './index.css'
import store from './state'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
