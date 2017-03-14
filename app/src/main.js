import Vue from 'vue';
import App from './App';
import store from './store';
require("./events");

global.Saber = require("./Saber");

Saber.__vue_store = store;
Saber.emit = (...args)=>{
  Saber.__vue_store.dispatch.apply(Saber.___vue_store, args);
}
Saber.commit = (...args)=>{
  Saber.__vue_store.commit.apply(Saber.___vue_store, args);
}
global.App = new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
