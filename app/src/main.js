import Vue from 'vue'
import App from './App'
import Config from "./config"
import Util from "./util"

global.Saber = Object.assign( Config , Util );

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
