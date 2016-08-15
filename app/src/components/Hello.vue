<template>
  <div class="hello">
    <h1 @click="cll">{{ msg }}</h1>
    <h3>{{tt}}</h3>
  

  <p>
      Welcome to Saber app!
    </p>
    <p>
      A empty toolkit, for you to order.
    </p>
    <p>
      You may also want to checkout
      <ul class="checkout">
        <li><a href="https://github.com/vuejs/vue-router/">How to develop a Saber plugin.</a> </li>
        <li><a href="https://github.com/vuejs/vuex/">How to use Saber for better.</a></li>
      </ul>
      
    </p>
    <button @click="setStatus"> 测试 sstatusMSG</button>
    </div> 
</template>

<script>
import {setStatusMsg} from '../store/action'
export default {
  vuex:{
    actions :{
      setStatusMsg
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initiadl state.
      msg: 'Saber',
      tt : "winys"
    }
  },
  methods:{
    cll () {
      this.msg = "Hello World!";
    },
    setStatus () {
      this.setStatusMsg( "测试" );
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
