import Vue from 'vue';
import App from './App';
import Saber from "../common/Saber";

global.Saber = Saber;

global.mini_app = new Vue({
  el: '#app',
  render: h => h(App)
});