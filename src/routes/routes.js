import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// vendor pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import OrderManagement from 'src/pages/OrderManagement.vue'
import ProductManagement from 'src/pages/ProductManagement/ProductManagement.vue'
import Icons from 'src/pages/Icons.vue'
import CustomerInteraction from 'src/pages/CustomerInteraction.vue'
import StoreSetting  from 'src/pages/StoreSetting.vue'
import FAQ from 'src/pages/FAQ.vue'
import Financial from 'src/pages/Financial.vue'
import Signup from 'src/pages/Signup.vue'
import Login from 'src/pages/Login.vue'

const routes = [
 
  {
    path: '/',
    redirect: '/vendor/signup',  
  },
  {
    path: '/vendor/signup',
    component: Signup,
    name: 'Signup',
    meta: { requiresAuth: false }
  },

  {
    path: '/vendor/login',
    component: Login,
    name: 'Login',
    meta: { requiresAuth: false }
  },
  
  {
    path: '/vendor',
    component: DashboardLayout,
    redirect: '/vendor/signup',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'OrderManagement',
        name: 'OrderManagement',
        component: OrderManagement
      },
      {
        path: 'ProductManagement',
        name: 'ProductManagement',
        component: ProductManagement
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'CustomerInteraction',
        name: 'CustomerInteraction',
        component: CustomerInteraction
      },
      {
        path: 'FAQ',
        name: 'FAQ',
        component: FAQ
      },
      {
        path: 'Financial',
        name: 'Financial ',
        component: Financial
      },
      {
        path: 'StoreSetting',
        name: 'StoreSetting',
        component: StoreSetting 
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
