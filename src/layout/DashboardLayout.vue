<template>
  <div class="flex min-h-screen font-public-sans bg-transparent text-etbuy-white">
    <Sidebar>
      <template #bottom-links>
        <router-link
          to="/vendor/login"
          class="flex items-center px-6 py-4 mt-4 bg-etbuy-red-light hover:bg-etbuy-red-dark text-etbuy-white font-semibold rounded-t-md transition-colors duration-300 shadow-etbuy-button select-none focus:outline-none focus:ring-2 focus:ring-etbuy-red-light focus:ring-offset-1 focus:ring-offset-etbuy-black"
          aria-label="Logout"
        >
          <i class="fa fa-power-off fa-lg w-6"></i>
          <p class="ml-3 text-base whitespace-nowrap">Logout</p>
        </router-link>
      </template>
    </Sidebar>

    <div class="flex-1 flex flex-col min-h-screen bg-transparent">
      <TopNavbar />
      <DashboardContent @click="toggleSidebar" class="flex-grow" />
      <ContentFooter />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import ContentFooter from "./Footer.vue";

export default {
  components: {
    Sidebar,
    TopNavbar,
    DashboardContent,
    ContentFooter,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar?.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
