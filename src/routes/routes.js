import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// vendor pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import ProductManagement from 'src/pages/ProductManagement.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
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
        path: 'table-list',
        name: 'Table List',
        component: TableList
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
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
