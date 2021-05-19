<template>
    <div class="col col-lg-4 border rounded border-5 border-primary">
        <div>
            <h2>Task</h2>
            <my-header></my-header>
            <br>
            <hr>
        </div>
        <div>
            <div style="overflow-y: auto;overflow-x: hidden; height:300px;">
                <div v-for="task in tasksData" v-bind:key="task['.key']">
                    <div class="row ">
                        <span class="text-start col-6  mt-1 mb-1">
                            <span class="align-middle ">
                                <input v-show="task.status == true" class="form-check-input align-middle mr-4" type="checkbox" checked>
                                <input v-show="task.status == false" class="form-check-input align-middle mr-4" type="checkbox">
                                <span class="h5 align-middle ml-4">{{ task.name }} </span>
                            </span>
                        </span>
                        <span class="text-end mt-1 mb-1 col-6">
                            <button v-show="task.status == true" type="button" class="btn btn-secondary float-end" v-on:click="updateStatus(task)" style="margin-left:10px">
                                Pending
                            </button>
                            <button v-show="task.status == false" type="button" class="btn btn-success float-end" v-on:click="updateStatus(task)" style="margin-left:10px">
                                Done
                            </button>
                            <button type="button" class="btn btn-danger float-end" v-on:click="removeBook(task.key)">
                                Delete
                            </button>
                        </span>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="row mt-2">
                <div class="text-start col-9">
                    <div class="input-group mb-3">
                        <input type="text" v-model="newTask.name" class="form-control" placeholder="New Task" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="text-start col-3">
                    <button type="button" @click="CreateTask()" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './Partials/Header'
    import firebase from "../../config/firebaseconfig";
    const dataTask = firebase.ref("/tasks");
    export default {
        components:{
            'my-header': Header,
        },
        data() {
            return {
                task: {
                    name: '',
                    status: false
                }, 
                newTask: {
                    name : '',
                    decription : '',
                    status : false,
                    user_id: ''
                },
                tasksData: [],
                currentUser: ''
            }
        },
        created() {
            this.tasksData = []
            this.currentUser = this.$store.state.user
            dataTask.orderByChild("status").on("child_added", snap => {
                this.tasksData.push({
                    key: snap.key,
                    name: snap.val().name,
                    status: snap.val().status,
                    user_id: snap.val().user_id
                });
            });
            this.$store.commit('SetDataTasks', this.tasksData);

            // dataTask.get()
            // .then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //         this.tasksData.push({
            //             key: doc.key,
            //             name: doc.val().name,
            //             status: doc.val().status
            //         });
            //     });
            //     this.$store.commit('SetDataTasks', this.tasksData);
            // })
            // .catch((error) => {
            //     console.log("Error getting documents: ", error);
            // });
        },
        methods: {
            CreateTask() {
                this.newTask.user_id = this.currentUser.uid;
                console.log(this.currentUser.uid);
                if (this.newTask.name != null) {
                    dataTask.push(this.newTask);
                    this.newTask.name = '';
                    this.getAllTasks();
                }
            },
            getAllTasks() {
                this.tasksData = []
                dataTask.orderByChild("status").on("child_added", snap => {
                    this.tasksData.push({
                        key: snap.key,
                        name: snap.val().name,
                        status: snap.val().status,
                        user_id: snap.val().user_id
                    });
                });
                this.$store.commit('SetDataTasks', this.tasksData);
            },
            removeBook(key) {
                console.log(key);
                dataTask.child(key).remove();
                console.log('success');
                this.getAllTasks();
            },
            updateStatus(task) {
                console.log(task);
                dataTask.child(task.key).set({
                    status: !task.status,
                    name: task.name,
                    user_id: task.user_id,
                });
                this.getAllTasks();
            }
        },
        mounted() {
            
        },
        computed: {
            tasks() {
                return this.$store.state.tasks;
            }
        }
    }
</script>