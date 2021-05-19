<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">My Task</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/tasks" class="nav-link">Tasks</router-link>
                </div>
            </div>
            <div class="float-right">
                <a class="text-secondary" @click="logout()"  href="#">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
import firebase from "firebase";
    export default {
        methods: {
            logout() {
                firebase.auth().signOut().then(() => {
                    firebase.auth().onAuthStateChanged(() => {
                        this.$store.commit('SetUserLogin', null);
                        this.$router.push('/login')
                    })
                })
            }
        }
    }
</script>