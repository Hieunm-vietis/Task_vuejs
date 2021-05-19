
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

// import * as Cookies from 'js-cookie'
// import createPersistedState from 'vuex-persistedstate'
// import firebase from 'firebase'
import firebase from "../config/firebaseconfig";
import store from "./store";
const dataTask = firebase.ref("/tasks");
const state = {
    tasks: {},
    success: ''
};

const getters = {
    getAllTasks(state) {
        return state.tasks;
    },
};

const actions = {
    getAllTask({ commit }) {
        console.log(2112112);
        const tasksData = []
        dataTask.orderByChild("status").on("child_added", snap => {
            tasksData.push({
                key: snap.key,
                name: snap.val().name,
                status: snap.val().status,
                user_id: snap.val().user_id
            });
        });
        commit('SetDataTasks', tasksData);
    },
    createTask({ commit }, newTask) {
        dataTask.push(newTask);
        commit('SetSucess', 'success');
        store.dispatch('getAllTask');
    },
    removeTask({ commit }, key) {
        dataTask.child(key).remove();
        commit('SetSucess', 'success');
        store.dispatch('getAllTask');
    },
    updateStatus({ commit }, task) {
        dataTask.child(task.key).set({
            status: !task.status,
            name: task.name,
            user_id: task.user_id,
        });
        commit('SetSucess', 'success');
        store.dispatch('getAllTask');
    }
};

const mutations = {
    SetDataTasks(state, data) {
        state.tasks = data;
    },
    SetSucess(state, success) {
        state.success = success;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};