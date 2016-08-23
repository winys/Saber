<template>
  <div id="app">
    <message></message>
    <statusbar></statusbar>
  </div>
</template>

<script>
import statusbar from './components/Statusbar';
import message from './components/Message';
export default {
  components: {
    statusbar,message
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
}
a:focus {
    outline: none;
}
</style>
