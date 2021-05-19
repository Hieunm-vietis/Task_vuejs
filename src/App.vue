<template>
  <div id="app mt-0">
    <my-header></my-header>
    <div class="row justify-content-md-center">
        <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './layouts/Header'

export default {
    name: 'App',
    components:{
        'my-header': Header,
    },
    data() {
        return {
            data: {},
            tasks: {},
        }
    },
    created() {
    },
    methods: {
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
