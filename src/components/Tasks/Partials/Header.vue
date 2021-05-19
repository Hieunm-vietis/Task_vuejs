<template>
    <div class="mt-3">
        <span class="h3">{{ $store.state.tasks.length }} Tasks |</span>
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
            dataList() {
                return this.$store.state.tasks;
            },
            dataListRemain() {
                return this.dataList.filter(item => !item.status)
            }
        }
    }
</script>