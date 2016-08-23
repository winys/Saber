<template>
  <div id="app">
    <statusbar></statusbar>
    <div id="main">
    <toolbar></toolbar>
    <workink>
      <vue-router></vue-router>
    </workink>
    </div>
    
  </div>
  <message></message>
</template>

<script>
import statusbar from './components/Statusbar';
import toolbar from './components/Toolbar';
import workink from './components/Workink';
import message from './components/Message';
export default {
  components: {
    statusbar,workink,toolbar,message
  }
}
</script>

<style>
div,section,ul,p{
  box-sizing:border-box;
  margin: 0;
  padding: 0;
}
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,HelveticaNeue-Light,Ubuntu,Droid Sans,sans-serif;
}
::selection{
  background: #ff8f00;
}
#app{
  background: #1e1e1e;
  width:100%;
  height:100%;
  flex-direction: column-reverse;
  justify-content: space-around;
}
#main{
  flex:1;
  flex-direction: row;
  justify-content: space-around;
}
</style>
