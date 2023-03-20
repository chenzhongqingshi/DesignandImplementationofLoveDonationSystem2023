import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import store from './vuex/store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  VDistpicker  from 'v-distpicker';
Vue.component('v-distpicker',VDistpicker)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router,
  store:store
}).$mount('#app')
