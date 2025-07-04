import Vue from "vue";
import App from "./App.vue";
import LightBootstrap from "./light-bootstrap-main";
import router from "./router/index.js";  
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue, { BToast } from "bootstrap-vue";
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles/tailwind.css'
import "./registerServiceWorker";

Vue.use(LightBootstrap);
Vue.use(BootstrapVue);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router  
});

