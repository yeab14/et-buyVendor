import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: "nav-item active",  
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const sessionStr = localStorage.getItem('vendorSession');
  let vendorSession = null;
  
  try {
    vendorSession = sessionStr ? JSON.parse(sessionStr) : null;
  } catch (e) {
    console.warn('Invalid vendorSession JSON:', e);
    localStorage.removeItem('vendorSession');
  }

  const isLoggedIn = !!(vendorSession?.jwt);
  const publicPages = ['/signup', '/vendor/login'];
  const authRequired = to.matched.some(record => record.meta.requiresAuth);

  if (isLoggedIn && publicPages.includes(to.path)) {
    return next('/vendor/overview');
  }

  if (!isLoggedIn && authRequired) {
    return next('/signup');
  }

  next();
});

export default router; 