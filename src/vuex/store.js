import Vue from 'vue'
import Vuex from 'vuex'
import cookie from './modules/cookie'
import ajax from './modules/ajax'
import location from './modules/location'

Vue.use(Vuex)

const state = {
}

const mutations = {
}

export default new Vuex.Store({state, mutations, modules: {cookie, ajax, location}})