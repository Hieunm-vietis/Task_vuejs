<template>
    <div class="col col-lg-4 wrapper">
        <h1>Register component</h1>
        <form @submit.prevent="registerUser">
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Firstname" v-model="userData.firstname" /><br>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Lastname" v-model="userData.lastname" /><br>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Username" v-model="userData.username" /><br>
            </div>
            <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email" v-model="userData.email" /><br>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="Choose a password" v-model="userData.password" /><br>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary">Create account</button>
            </div>
      </form>
   </div>
</template>

<script>
    import db from "../../config/firebaseconfig";
    import firebase from 'firebase'
    const users = db.ref("/users");

    export default {
        name: 'Register',
        data(){
            return{
                userData: {
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    password: ''
                },
                successMessage: '',
                errorMessage: ''
            }
        },
        methods: {
            registerUser(){
                firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
                .then((user) => {
                    console.log(user);
                    firebase.auth().currentUser.updateProfile({
                        displayName: this.userData.username
                    }).then(() => {
                        this.userData.password = '';
                        users.push(this.userData);
                    }).catch(err => {
                        this.errorMessage = err.message;
                    });
                })
                .catch(err => {
                    this.errorMessage = err.message
                });
            }
        }
    }
</script>