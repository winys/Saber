<template>
  <div id="app">      
    <link rel="stylesheet" :href="theme">
    <statusbar></statusbar>
    <div id="main">      
      <div class="background">
          欢迎使用 Saber! <br>
          <span class="giturl">
            <a saber-href="https://github.com/winys/Saber.git">(https://github.com/winys/Saber.git)</a>
          </span>
      </div>
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
  },
  computed: {
      theme () {return "../static/css/" + Saber.config.theme +".css"}
  },
}
</script>

<style>
/*------------------公共样式开始-----------------*/
html,body,div,section,ul,p,input{
  box-sizing:border-box;
  margin: 0;
  padding: 0;  
  color: var(--fontColor);
}
html,body{
  height: 100%;
  width: 100%;  
  font-family: var(--fontFamily);
}
input[type=text]{
    width: 100%;
    height: 28px;
    line-height: 18px;
    box-sizing: border-box;
    padding: 4px;
    border: 1px solid var(--input_border);
    -webkit-appearance: textfield;
    background-color: var(--input_background);
}
input:focus{
    outline:1px solid var(--input_outline);
    outline-offset: -1px;
}
input[type="checkbox"].switch{
    width:40px;
    height: 20px;
    vertical-align: middle;
}
input[type="checkbox"]:focus{
    outline:none;
}
input[type="checkbox"].switch::before {
    content: '\a0';
    background: #eaeaea;
    width: 40px;
    height: 20px;
    display: inline-block;
    border-radius: 10px;
    background-image: radial-gradient(20px 20px,#ffffff 0,#ffffff 45%, rgba(76, 74, 74, 0.03) 50%),linear-gradient(to right, #007acc 0,#0082d1 50%, #ccc5c5 50%);
    background-size: 40px,80px;
    background-position: -10px,-40px;
    background-repeat: no-repeat,no-repeat;
    transition: background-position .4s;
    cursor: pointer;
}
input[type="checkbox"].switch:checked:before {
    background-position: 10px,0px;
}
a{    
    color: var(--linkColor);
}
a:focus {
    outline: none;
}
.btn{
    background: var(--btn_background);
    color: var(--btn_color);
    cursor: pointer;
}
.icon{
    user-select: none;    
}
::selection{
    background: var(--selection);
    color: var(--selection_color);
}
::-webkit-scrollbar-thumb {
    background: var(--scorllerbar);
}
.hover_scroll ::-webkit-scrollbar-thumb {
    background: transparent;
}
.hover_scroll:hover ::-webkit-scrollbar-thumb {
    background: var(--scorllerbar);
}
::-webkit-scrollbar {
    background: transparent;
    width: 3px;
    height: 3px;
}

.loading{        
    position: relative;
    overflow: hidden;
}
.loading::before{
    content: ' ';
    width: 7px;
    background-color: var(--loading_color);
    height: 3px;
    position: absolute;
    animation: loading 3s linear infinite;
}
@keyframes loading{
    from{left:0%;width:7px;}
    50%{left:50%;width:15px;}
    to{left:100%;width:7px}
}
textarea{
    width: 100%;
    height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 18px;
    box-sizing: border-box;
    padding: 4px;
    border: 1px solid var(--textarea_border);
    -webkit-appearance: textfield;
    background-color: var(--textarea_bgColor);
    color: var(--textarea_color);
}
textarea:focus{
    outline-offset: -1px;
    outline:1px solid rgba(14,99,156,.6);
}
select{
    background: var(--select_bgColor);
    color: var(--select_color);
    border: 1px solid var(--select_border);
}
select:focus{
    outline:1px solid var(--input_outline);
    outline-offset: -1px;
}
/*------------------公共样式结束-----------------*/

#app{
  display: flex;
  background: var(--mainColor);
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
.app, .toolbar, .statusbar, .workink, .tablist, .tabpage, .toolManager, .PluginWrapper{
    user-select:none
}
.background{
  position: fixed;
  top: 50%;
  left: 50%;
  color: var(--backgroudFont);
  z-index: 0;
  transform: translate(-50%,-50%);
  font-size: 31px;
  font-weight: 600;
  -webkit-font-smoothing: subpixel-antialiased;
  text-align: center;
}
.background .giturl{
  cursor: pointer;
  font-size: 20px;
}
</style>
