<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ET-Buy Vendor Dashboard</a>
      <button type="button" class="navbar-toggler" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="nc-icon nc-bell"></i> Notifications
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="nc-icon nc-user"></i> Account
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="nc-icon nc-button-power"></i> Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      }
    }
  }
</script>

<style scoped>
.navbar {
  background-color: #ee5858;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.navbar-toggler {
  border-color: white;
}

.navbar-toggler-bar {
  background-color: white;
  height: 3px;
  margin: 5px 0;
}

.navbar-nav .nav-item .nav-link {
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  transition: all 0.3s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  font-weight: 600;
}

.navbar-nav .nav-item .nav-link i {
  margin-right: 8px;
}
</style>
