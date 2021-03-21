import Vue from 'vue'
import App from './App.vue'
import './styles/generic.scss';
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')