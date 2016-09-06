import Vue from 'vue'
import App from './App'
import Saber from "./Saber"
require("./events");
/* target,sources */
global.Saber = Saber;

/* eslint-disable no-new */
global.App =  new Vue({
  el: 'body',
  components: { App }
})
