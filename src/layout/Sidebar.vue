<template>
    <aside
      class="flex flex-col w-64 min-h-screen bg-etbuy-black text-etbuy-white shadow-etbuy-footer-glow select-none"
      role="navigation"
      aria-label="Primary Sidebar Navigation"
    >
      <nav
        class="flex flex-col flex-grow overflow-y-auto pt-8 pb-6 px-2" 
        aria-label="Sidebar menu"
      >
      
        <p
          class="mb-4 px-3 text-xs font-bold tracking-widest text-etbuy-red-light uppercase select-none"
          aria-label="Main section"
        >
          Main
        </p>
  
        <router-link
          v-for="item in mainMenuItems"
          :key="item.to"
          :to="item.to"
          class="group flex items-center px-4 py-3 mb-2 rounded-lg
                 text-etbuy-white text-sm font-semibold uppercase tracking-wide
                 transition-colors duration-300 ease-in-out
                 hover:bg-etbuy-red-dark hover:text-white no-underline
                 cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-etbuy-red-light focus-visible:ring-offset-1 focus-visible:ring-offset-etbuy-black
                 relative"
          active-class="bg-etbuy-red-dark text-etbuy-creamywhite shadow-etbuy-light border-r-4 border-etbuy-red-light"
        >
          <i
            :class="[
              item.icon,
              'fa-lg w-5 min-w-[20px] transition-colors duration-300',
              { 'text-etbuy-white': isActiveRoute(item.to), 'text-etbuy-red-light group-hover:text-white': !isActiveRoute(item.to) }
            ]"
            aria-hidden="true"
          ></i>
  
        
          <span
            class="ml-3 leading-snug whitespace-nowrap"
            aria-label="Sidebar link label"
          >
            {{ item.label }}
          </span>
  
          <span
            v-if="$route.path === item.to"
            class="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-etbuy-red-light shadow-[0_0_10px_rgba(238,88,88,0.7)]"
            aria-hidden="true"
          ></span>
        </router-link>
  
        
        <hr class="border-etbuy-red-dark my-5" />
        <p
        class="mb-4 px-3 text-xs font-bold tracking-widest text-etbuy-red-light uppercase select-none"
        aria-label="Main section"
      >
        Engagement
      </p>

        <router-link
          v-for="item in engagementMenuItems"
          :key="item.to"
          :to="item.to"
          class="group flex items-center px-4 py-3 mb-2 rounded-lg
                 text-etbuy-white text-sm font-semibold uppercase tracking-wide
                 transition-colors duration-300 ease-in-out
                 hover:bg-etbuy-red-dark hover:text-white no-underline
                 cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-etbuy-red-light focus-visible:ring-offset-1 focus-visible:ring-offset-etbuy-black
                 relative"
          active-class="bg-etbuy-red-dark text-etbuy-creamywhite shadow-etbuy-light border-r-4 border-etbuy-red-light"
        >
          <i
            :class="[
              item.icon,
              'fa-lg w-5 min-w-[20px] transition-colors duration-300',
              { 'text-etbuy-white': isActiveRoute(item.to), 'text-etbuy-red-light group-hover:text-white': !isActiveRoute(item.to) }
            ]"
            aria-hidden="true"
          ></i>
  
          <span
            class="ml-3 leading-snug whitespace-nowrap"
            aria-label="Sidebar link label"
          >
            {{ item.label }}
          </span>
  
          <span
            v-if="$route.path === item.to"
            class="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-etbuy-red-light shadow-[0_0_10px_rgba(238,88,88,0.7)]"
            aria-hidden="true"
          ></span>
        </router-link>
      </nav>
  
      <div
        class="mt-auto border-t border-etbuy-red-dark px-6 py-4 bg-etbuy-black text-etbuy-white"
        role="complementary"
      >
        <slot name="bottom-links"></slot>
      </div>
    </aside>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
    data() {
      return {
        mainMenuItems: [
          { to: "/vendor/overview", label: "Dashboard", icon: "fa fa-chart-pie" },
          { to: "/vendor/ProductManagement", label: "Products", icon: "fa fa-box-open" },
          { to: "/vendor/OrderManagement", label: "Orders", icon: "fa fa-shipping-fast" },
          { to: "/vendor/Financial", label: "Financials", icon: "fa fa-coins" },
          { to: "/vendor/CustomerInteraction", label: "Customers", icon: "fa fa-users" },
          { to: "/vendor/StoreSetting", label: "Store Settings", icon: "fa fa-cogs" },
          { to: "/vendor/FAQ", label: "Support & Help", icon: "fa fa-question-circle" },
        ],
        engagementMenuItems: [
          { to: "/vendor/messaging", label: "Messaging", icon: "fa fa-comments" },
          { to: "/vendor/follow-requests", label: "Followers", icon: "fa fa-user-plus" },
          { to: "/vendor/membership-requests", label: "Memberships", icon: "fa fa-users-cog" },
        ],
      };
    },
    methods: {
      isActiveRoute(route) {
        return this.$route.path === route;
      },
    },
  };
  </script>
  

  <style scoped>

.router-link-active:hover,
.group:hover {
  text-decoration: none !important;
}
</style>
