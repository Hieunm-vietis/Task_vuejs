<template>
    <div class="col-12">
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
</template>

<script>
    export default {
        data() {
            
        },
        methods: {
            
        },
        created() {
        },
        computed: {
            dataCalendar() {
                return this.$store.getters.getAllTaskscalendar;
            }
        }
    }
</script>