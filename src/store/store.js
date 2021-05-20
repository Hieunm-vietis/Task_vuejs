// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as Cookies from 'js-cookie'
// import createPersistedState from 'vuex-persistedstate'

// Vue.use(Vuex)
// export default new Vuex.Store({
//     state: {
//         tasks: [],
//         user: []
//     },
//     getters: {
//     },
//     mutations: {
//         SetDataTasks(state, data) {
//             state.tasks = data;
//         },
//         SetUserLogin(state, data) {
//             state.user = data;
//         }
//     },
//     plugins: [
//         createPersistedState({
//             getState: (user) => Cookies.getJSON(user),
//             setState: (user, state) => Cookies.set(user, state, { expires: 3, secure: true })
//         })
//     ]
// })


import Vue from "vue";
import Vuex from "vuex";
import task from "./task.module";
import user from "./user.module";
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
        task,
        user,
    },
    // plugins: [
    //     createPersistedState({
	// 		paths: ['user'],
    //         storage: {
    //             getState: (user) => Cookies.getJSON(user),
    //             setState: (user, state) => Cookies.set(user, state, { expires: 3, secure: true })
    //         }
    //     })
    // ]
});