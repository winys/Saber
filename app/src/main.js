import Vue from 'vue'
import App from './App'
import Saber from "./Saber"
/* target,sources */
global.Saber = Saber;

/* eslint-disable no-new */
global.app =  new Vue({
  el: 'body',
  components: { App }
})
