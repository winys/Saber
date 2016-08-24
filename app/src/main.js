import Vue from 'vue'
import App from './App'
import Config from "./config"
import Util from "./util"
/* target,sources */
global.Saber = Object.assign( Config , Util );

/* eslint-disable no-new */
global.app = new Vue({
  el: 'body',
  components: { App }
})
