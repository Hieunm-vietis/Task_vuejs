<template>
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
</template>

<script>
    export default {
        data() {
            // const month = new Date().getMonth();
            // const year = new Date().getFullYear();
            // const day = new Date().getDay();
            // const date = new Date(year, month, day).toString();
            var d = new Date();
            var date = d.toString();
            return {
                newTask: {
                    name : '',
                    decription : '',
                    status : false,
                    user_id: '',
                    date_end: date,
                },
            }
        },
        methods: {
            CreateTask() {
                this.newTask.user_id = 'vPO1OCs95GdNrGp65TFT56GlvtZ2';
                this.$store
                .dispatch('createTask', this.newTask)
                .then(() => {
                    this.newTask.name = ''
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },
        created() {
        }
    }
</script>