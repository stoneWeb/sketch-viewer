import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
    file: null,
    dropState: '',
    sketchData: null,
    property: null
}

export default new Vuex.Store({ 
    mutations: mutations(state), 
    actions: actions(state),
    state, 
    getters 
})