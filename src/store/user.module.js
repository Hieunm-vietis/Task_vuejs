
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

import * as Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'
const state = {
    user: {},
    errorAuth: {}
};

const getters = {
    currentUser(state) {
      return state.user;
    },
};

const actions = {
    login({ commit }, user) {
        firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            commit('SetUserLogin', firebase.auth().currentUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    },
    register({ commit }, user) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            firebase.auth().currentUser.updateProfile({
                displayName: user.username
            })
        })
        .catch(err => {
            commit('SetErrorAuth', err.message);
        });
    },
    logout({ commit }) {
        firebase.auth().signOut().then(() => {
            firebase.auth().onAuthStateChanged(() => {
                commit('SetUserLogin', null);
            })
        })
    }
};

const mutations = {
    SetUserLogin(state, data) {
        state.user = data;
    },
    SetErrorAuth(state, errorAuth) {
        state.errorAuth = errorAuth;
    }
};

const plugins = [
    createPersistedState({
        getState: (user) => Cookies.getJSON(user),
        setState: (user, state) => Cookies.set(user, state, { expires: 3, secure: true })
    })
];


export default {
    state,
    actions,
    mutations,
    getters,
    plugins
};