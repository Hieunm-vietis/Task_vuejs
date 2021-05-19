import Vue from 'vue'
import Vuex from 'vuex'
import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        tasks: [],
        user: []
    },
    getters: {
    },
    mutations: {
        SetDataTasks(state, data) {
            state.tasks = data;
        },
        SetUserLogin(state, data) {
            state.user = data;
        }
    },
    plugins: [
        createPersistedState({
            getState: (user) => Cookies.getJSON(user),
            setState: (user, state) => Cookies.set(user, state, { expires: 3, secure: true })
        })
    ]
})
