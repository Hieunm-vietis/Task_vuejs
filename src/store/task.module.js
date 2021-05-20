import firebase from "../config/firebaseconfig";
import store from "./store";

const state = {
    tasks: {},
    success: ''
};

const getters = {
    getAllTasks(state) {
        return state.tasks;
    },
    getAllTaskscalendar(state) {
        const taskCalendar = [];
        state.tasks.forEach((x) => {
            taskCalendar.push({
                dates: x.date_end,
                customData: {
                    name: x.name
                },
                name: x.name
            });
        });

        return taskCalendar;
    }
};

const actions = {
    getAllTask({ commit }) {
        const dataTask = firebase.ref("/tasks")
        const tasksData = []
        dataTask.orderByChild("status").on("child_added", snap => {
            tasksData.push({
                key: snap.key,
                name: snap.val().name,
                status: snap.val().status,
                user_id: snap.val().user_id,
                date_end: snap.val().date_end,
                dates: snap.val().dates
            });
        });
        commit('SetDataTasks', tasksData);
    },
    createTask({ commit }, newTask) {
        const dataTask = firebase.ref("/tasks")
        dataTask.push(newTask);
        commit('SetSucess', 'success');
        store.dispatch('getAllTask');
    },
    removeTask({ commit }, key) {
        const dataTask = firebase.ref("/tasks")
        dataTask.child(key).remove();
        commit('SetSucess', 'success');
        store.dispatch('getAllTask');
    },
    updateStatus({ commit }, task) {
        const dataTask = firebase.ref("/tasks")
        dataTask.child(task.key).set({
            status: !task.status,
            name: task.name,
            user_id: task.user_id,
            date_end: task.date_end,
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