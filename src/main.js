import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import LightBootstrap from "./light-bootstrap-main";
import routes from "./routes/routes";


import "./registerServiceWorker";

Vue.use(VueRouter);
Vue.use(LightBootstrap);


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
