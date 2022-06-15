<template>
  <router-view v-if="isRouterAlive"/>
</template>

<script>
// 刷新頁面
export default {
  provide(){    
    return {
      reload: this.reload      
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    reload () {
      // console.log('reload occure')
      this.isRouterAlive = false;
      this.$nextTick( ()=> { this.isRouterAlive=true } ) ;
    }
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
