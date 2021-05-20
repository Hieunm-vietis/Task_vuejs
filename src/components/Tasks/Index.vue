<template>
<div class="col-12">
    <div class="row justify-content-md-center">
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
                                <a href="" style="text-decoration: none" @click="handleClickDetail(task)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <span class="align-middle ">
                                        <input  class="form-check-input align-middle mr-4" type="checkbox" :checked="task.status == true">
                                        <span class="h5 align-middle ml-4">{{ task.name }} </span>
                                    </span>
                                </a>
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
    </div>
    <div class="col-12 mt-3">
        <v-calendar
        class="custom-calendar max-w-full" style="height: 100% important;"
        :masks="masks"
        :attributes="dataCalendar"
        disable-page-swipe
        is-expanded
        >
            <template v-slot:day-content="{ day, attributes }">
                <div class="flex flex-col h-full z-10 overflow-hidden day-celendar">
                <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                <div class="flex-grow overflow-y-auto overflow-x-auto">
                    <div
                    v-for="attr in attributes"
                    :key="attr.key"
                    class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                    style="color: red !important;"
                    >
                        {{ attr.customData.name }}
                    </div>
                </div>
                </div>
            </template>
        </v-calendar>
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
                masks: {
                    weekdays: 'WWW',
                },
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
            },
            handleClickDetail() {
            }
        },
        mounted() {
            
        },
        computed: {
            tasks() {
                return store.getters.getAllTasks;
            },
            dataCalendar() {
                return store.getters.getAllTaskscalendar;
            }
        }
    }
</script>
<style >
.day-celendar {
    border: 1px  solid #DDDDDD;
    height: 150px;
    width: 100%;
}
.vc-weeks {
    width: 100%;
}
.vc-container {
    max-width: 100% !important;
}
</style>