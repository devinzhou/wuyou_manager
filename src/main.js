import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.http.options.emulateJSON = false;
Vue.http.options.crossOrigin = true;

Vue.http.options.headers={
    'Content-Type': 'application/json;charset=UTF-8'
};

new Vue({
  el: '#app',
  render: h => h(App)
})
