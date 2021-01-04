import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'
import auth from './auth'
import dialog from './dialog'
import region from './region'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'vueshop',
    storage: localStorage
});

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        prevUrl: '',
        payment:[]        
    },
    mutations: {    
        setPrevUrl: (state, value) => {
            state.prevUrl = value
        },
        setPayment: (state, value) => {
            state.payment = value
        }   
    },
    actions: {
        setPrevUrl: ({commit}, value) => {
            commit('setPrevUrl', value)
        },
        setPayment: ({commit}, value) => {
            commit('setPayment', value)
        }
    },
    getters: {   
        prevUrl: state => state.prevUrl,
        payment: state => state.payment,
    },
    modules: {
        cart,
        alert,
        auth,
        dialog,
        region
    }
})
