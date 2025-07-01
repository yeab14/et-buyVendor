<template>
  <div class="flex min-h-screen font-public-sans bg-transparent text-etbuy-white overflow-x-hidden">
    <Sidebar>
      <template #bottom-links>
        <router-link
        to="/vendor/login"
        class="group flex items-center justify-center gap-3 px-6 py-3 mt-6 w-full 
               bg-topbar-bg text-white font-semibold rounded-full 
               shadow-etbuy-button hover:bg-etbuy-red-dark 
               transition-colors duration-300 ease-in-out 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-etbuy-red-light"
        aria-label="Logout"
      >
        <i class="fa fa-power-off fa-lg group-hover:rotate-12 transition-transform duration-300 ease-in-out"></i>
        <span class="text-base whitespace-nowrap group-hover:underline">Logout</span>
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

<style scoped>
html, body {
  overflow-x: hidden;
}
</style>
