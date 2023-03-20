import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import user from './user.js'
import administrators from './administrators.js'
import courier from './courier.js'
const store=new Vuex.Store({
    modules:{
        user,
        administrators,
        courier
    }
})
export default store