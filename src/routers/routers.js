import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Auth/Register.vue'
import Login from '../components/Auth/Login.vue'
import Task from '../components/Tasks/Index.vue'
// import firebase from 'firebase';
import store from '../store/store.js';

Vue.use(VueRouter); 

const routes = [
        {
            path: '/tasks',
            component: Task,
            meta: { authRequired: true }
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/login',
            component: Login
        },
    ];
    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes,
    });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (store.state.user.uid) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/login',
            });
        }
    } else {
        next();
    }
});

export default router;