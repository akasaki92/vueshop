import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import alert from './alert'
import auth from './auth'
import dialog from './dialog'
import region from './region'

Vue.use(Vuex)

export default new Vuex.Store({
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
