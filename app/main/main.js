import Vue from 'vue';
import App from './App';
import Saber from '../common/Saber';
require("./events");

global.Saber = Saber;

global.Store = require( './store').default;

Store.emit = (...args)=>{
  Store.dispatch.apply(Saber.__vue_store, args);
}

// Object.freeze(Saber);

global.App = new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
});
