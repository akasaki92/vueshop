import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {        
    },
    mutations: {       
    },
    getters: {        
    },
    modules: {
        cart,
        alert,
    }
})
