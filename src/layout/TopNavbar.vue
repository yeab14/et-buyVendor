<template>
  <nav class="navbar navbar-expand-lg">
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
            <a class="nav-link" href="#" @click="markNotificationRead">
              <i class="nc-icon nc-bell"></i> Notifications
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/vendor/user">
              <i class="nc-icon nc-user"></i> Account
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/vendor/login">
              <i class="nc-icon nc-button-power"></i> Log Out
            </router-link>
          </li>
          <li class="nav-item time">
            <span>{{ formattedTime }}</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentTime: this.getCurrentTime(),
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    markNotificationRead() {
      console.log("Notification clicked");
    },
    getCurrentTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${year} | ${hours}:${minutes}:${seconds}`;
    },
  },
  computed: {
    formattedTime() {
      return this.currentTime;
    },
  },
  mounted() {
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ee5858;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.navbar-brand {
  font-size: 26px;
  font-weight: 700;
  color: white !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.navbar-brand:hover {
  color: #ffcd39;
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
  color: white !important;
  font-size: 16px;
  padding: 12px 18px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
}

.navbar-nav .nav-item .nav-link:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-weight: 600;
  color: #ffcd39;
}

.navbar-nav .nav-item .nav-link i {
  margin-right: 10px;
}

.navbar-nav .nav-item .nav-link i.nc-bell {
  color: white !important;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-nav .nav-item .nav-link:hover i.nc-bell {
  transform: scale(1.1);
  color: #ffcd39;
}

.navbar-nav .nav-item.time {
  font-size: 16px;
  color: white !important;
  padding: 12px 18px;
  font-weight: 500;
  letter-spacing: 1px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-nav .nav-item.time span {
  font-weight: 600;
  color: white !important;
  font-size: 18px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.navbar-nav .nav-item .nav-link.active {
  color: white !important;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.navbar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
