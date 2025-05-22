import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import LightBootstrap from "./light-bootstrap-main";
import routes from "./routes/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import BootstrapVue, { BToast } from "bootstrap-vue";
import '@fortawesome/fontawesome-free/css/all.css';

import "./registerServiceWorker";

Vue.use(VueRouter);
Vue.use(LightBootstrap);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes,
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
