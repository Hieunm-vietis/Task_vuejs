import Vue from "vue";
import Vuex from "vuex";
import task from "./task.module";
import user from "./user.module";
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