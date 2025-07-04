import DashboardLayout from '@/layout/DashboardLayout.vue';
import NotFound from '@/pages/NotFoundPage.vue';


import Overview from '@/pages/Overview.vue';
import UserProfile from '@/pages/UserProfile.vue';
import OrderManagement from '@/pages/OrderManagement/OrderManagement.vue';
import ProductManagement from '@/pages/ProductManagement/ProductManagement.vue';
import Icons from '@/pages/Icons.vue';
// import CustomerInteraction from '@/pages/CustomerInteraction.vue';
import StoreSetting from '@/pages/Store/StoreSetting.vue';
import FAQ from '@/pages/FAQ/FAQ.vue';
import Financial from '@/pages/Financials/Financial.vue';
import DynamicInput from '@/pages/ProductManagement/DynamicInput.vue';
import Message from '@/pages/Message/Message.vue';
import Follower from '@/pages/Followers/Follower.vue';
import MembershipRequest from '@/pages/Membership/Membership-request.vue';


import Signup from '@/pages/Authentication/Signup.vue';
import Login from '@/pages/Authentication/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/signup',
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    component: Signup,
    name: 'Signup',
    meta: { requiresAuth: false },
  },
  {
    path: '/vendor/login',
    component: Login,
    name: 'Login',
    meta: { requiresAuth: false },
  },
  {
    path: '/vendor',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    redirect: '/vendor/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
      },
      {
        path: 'OrderManagement',
        name: 'OrderManagement',
        component: OrderManagement,
      },
      {
        path: 'ProductManagement',
        name: 'ProductManagement',
        component: ProductManagement,
      },
      // {
      //   path: 'DynamicInput',
      //   name: 'DynamicInput',
      //   component: DynamicInput,
      // },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons,
      },
      // {
      //   path: 'CustomerInteraction',
      //   name: 'CustomerInteraction',
      //   component: CustomerInteraction,
      // },
      {
        path: 'FAQ',
        name: 'FAQ',
        component: FAQ,
      },
      {
        path: 'Financial',
        name: 'Financial',
        component: Financial,
      },
      {
        path: 'StoreSetting',
        name: 'StoreSetting',
        component: StoreSetting,
      },
      {
        path: 'Messaging',
        name: 'Message',
        component: Message,
      },
      {
        path: 'Followers',
        name: 'Follower',
        component: Follower,
      },
      {
        path: 'membership-requests',
        name: 'MembershipRequest',
        component: MembershipRequest,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
