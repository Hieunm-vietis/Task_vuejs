<template>
    <div class="col col-lg-4 wrapper">
        <h1>Login</h1>
        <form @submit.prevent="loginUser">
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
    export default {
        name: 'Register',
        data(){
            return{
                userData: {
                    email: '',
                    password: ''
                },
                successMessage: '',
                errorMessage: ''
            }
        },
        methods: {
            loginUser() {
                this.$store
                .dispatch('login', this.userData)
                .then(() => this.$router.push('/'));
                
                
                // firebase.auth()
                // .signInWithEmailAndPassword(this.userData.email, this.userData.password)
                // .then(() => {
                //     this.$store.commit('SetUserLogin', firebase.auth().currentUser);
                //     this.$router.push('/')
                // })
                // .catch((error) => {
                //     alert(error.message);
                // });
            }
        }
    }
</script>