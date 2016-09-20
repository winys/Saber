<template>
  <div id="app">
    <statusbar></statusbar>
    <div id="main">
    <toolmanager></toolmanager>
    <toolbar></toolbar>
    <workink></workink>
    </div>
    <message></message>
  </div>
</template>

<script>
import statusbar from './components/Statusbar';
import toolbar from './components/Toolbar';
import toolmanager from './components/ToolManager';
import workink from './components/Workink';
import message from './components/Message';
export default {
  components: {
    statusbar,toolbar,workink,message,toolmanager
  }
}
</script>

<style>
div,section,ul,p,input{
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
@media screen and (min-width: 1500px) {
  body{
    zoom: 1.25;
  }
}
#app{
  display: flex;
  background: #1e1e1e;
  width:100%;
  height:100%;
  flex-direction: column-reverse;
  justify-content: space-around;
}
#main{
  display:flex;
  flex:1;
  flex-direction: row;
  align-items: stretch; 
}
a:focus {
    outline: none;
}
::-webkit-scrollbar-thumb {
    background: #6b6b6b;
}
::-webkit-scrollbar {
    background: #1e1e1e;
    width: 5px;
    height: 5px;
}
input:focus{
    outline: 1px solid rgba(14,99,156,.6);
}
.app, .toolbar, .statusbar, .workink, .tablist, .tabpage, .toolManager, .PluginWrapper{
  -webkit-user-select:none
}
</style>
