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
                <div v-for="task in tasks" v-bind:key="task['.key']">
                    <div class="row ">
                        <span class="text-start col-6  mt-1 mb-1">
                            <span class="align-middle ">
                                <input  class="form-check-input align-middle mr-4" type="checkbox" :checked="task.status == true">
                                <span class="h5 align-middle ml-4">{{ task.name }} </span>
                            </span>
                        </span>
                        <span class="text-end mt-1 mb-1 col-6">
                            <button type="button" class="btn btn-secondary float-end" v-on:click="updateStatus(task)" style="margin-left:10px">
                                ChangeStt
                            </button>
                            <button type="button" class="btn btn-danger float-end" v-on:click="removeTask(task.key)">
                                Delete
                            </button>
                        </span>
                    </div>
                    <hr>
                </div>
            </div>
            <my-addTask></my-addTask>
        </div>
    </div>
</template>

<script>
    import Header from './Partials/Header'
    import AddTask from './Partials/Add'
    import store from "../../store/store";
    export default {
        components:{
            'my-header': Header,
            'my-addTask': AddTask,
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
            
        },
        beforeRouteEnter(to, from, next) {
            store.dispatch('getAllTask');
            next();
        },
        methods: {
            
            removeTask(key) {
                this.$store
                .dispatch('removeTask', key)
                .then(() => {
                    console.log(1111);
                    this.newTask.name = ''
                })
                .catch(err => {
                    console.log(err);
                });
            },
            updateStatus(task) {
                this.$store
                .dispatch('updateStatus', task)
                .then(() => {
                    this.newTask.name = ''
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        mounted() {
            
        },
        computed: {
            tasks() {
                return store.getters.getAllTasks;
            }
        }
    }
</script>