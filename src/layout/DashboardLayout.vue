<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/vendor/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/vendor/ProductManagement">
        <i class="fa fa-shopping-bag"></i>
        <p>Product Management</p>
      </sidebar-link>
      
      <sidebar-link to="/vendor/OrderManagement">
        <i class="nc-icon nc-delivery-fast"></i>
        <p>Order Management</p>
      </sidebar-link>
      <sidebar-link to="/vendor/Financial">
        <i class="nc-icon nc-money-coins"></i>
        <p>Financials</p>
      </sidebar-link>
      <sidebar-link to="/vendor/CustomerInteraction">
        <i class="nc-icon nc-single-02"></i>
        <p>Customer Interaction</p>
      </sidebar-link>
      <sidebar-link to="/vendor/StoreSetting">
        <i class="nc-icon nc-settings-gear-64"></i>
        <p>Store Settings</p>
      </sidebar-link>
      <!-- <sidebar-link to="/vendor/notifications">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Analytics & Reports</p>
      </sidebar-link> -->
      <sidebar-link to="/vendor/FAQ">
        <i class="nc-icon nc-support-17"></i>
        <p>Support & Help</p>
      </sidebar-link>
      
      <template slot="bottom-links">
        <sidebar-link class="active" to="/vendor/login">
          <i class="nc-icon nc-button-power"></i>
          <p>Logout</p>
        </sidebar-link>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">
      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>


<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
