<template>
    <div class="mt-3">
        <span class="h3">{{ tasks.length }} Tasks |</span>
        <span class="h3"> {{ dataListRemain.length }} Remain</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                remain: 0,
            }
        },
        created() {
            
        },
        computed: {
            dataListRemain() {
                return this.tasks.filter(item => !item.status)
            },
            tasks() {
                return this.$store.getters.getAllTasks;
            }
        }
    }
</script>