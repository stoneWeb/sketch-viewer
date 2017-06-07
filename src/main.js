// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import Dialogs from './components/Dialogs'
import Spinner from './components/Spinner'
import './css.css'
import './iconfont.css'

Vue.config.productionTip = false
Vue.component('Dialogs', Dialogs)
Vue.component('Spinner', Spinner)

const preventDetault = (e) => {
  e.preventDefault();
  return false;
}

window.addEventListener('dragover', preventDetault, !1);
window.addEventListener('drop', preventDetault, !1);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
