<template>
  <div class="hello">
    <h1 @click="cll">{{ msg }}</h1>
    <h3>{{tt}}</h3>
    </div>
  </body>  
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initiadl state.
      msg: 'Hello World!',
      tt : "winys"
    }
  },
  methods:{
    cll (){
      this.msg = "Hello World!";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: green;
}
</style>
