<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- Logo with Animated Glow -->
      <router-link class="navbar-brand" to="/vendor/overview">
        <img src="img/et-buy.png" alt="" class="logo" />
        <span class="brand-text">EtBuy Vendor Portal</span>
      </router-link>

      <!-- Animated Toggler -->
      <button type="button" class="navbar-toggler" @click="toggleSidebar">
        <div class="animated-icon" :class="{ open: $sidebar.showSidebar }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <!-- Notification Icon -->
          <li class="nav-item notification-item">
            <a class="nav-link" href="#" @click.prevent="markNotificationRead">
              <i class="nc-icon nc-bell-55"></i>
              <span class="notification-count" v-if="notificationCount > 0">{{ notificationCount }}</span>
            </a>
          </li>

          <!-- Profile Link -->
          <li class="nav-item">
            <router-link class="nav-link profile-link" to="/vendor/user">
              <i class="nc-icon nc-single-02"></i>
              {{ vendorName }}
            </router-link>
          </li>

          <!-- Logout Link -->
          <li class="nav-item">
            <a class="nav-link logout-link" href="#" @click.prevent="logout">
              <i class="nc-icon nc-button-power"></i> Logout
            </a>
          </li>

          <!-- Time Display -->
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
      notificationCount: 5,
      vendor: null,
    };
  },
  computed: {
    vendorName() {
      return this.vendor
        ? `${this.vendor.firstName} ${this.vendor.lastName} (${this.vendor.businessName})`
        : "Profile";
    },
    formattedTime() {
      return this.currentTime;
    },
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    markNotificationRead() {
      console.log("Notification clicked");
      this.notificationCount = 0;
    },
    getCurrentTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${month} ${year} | ${hours}:${minutes}:${seconds}`;
    },
    logout() {
      this.vendor = null;
      localStorage.removeItem("vendorData");
      this.$router.push("/vendor/login");
    },
  },
  mounted() {
    const vendorData = localStorage.getItem("vendorData");
    if (vendorData) {
      try {
        const sessionData = JSON.parse(vendorData);
        this.vendor = sessionData.vendor;
      } catch (error) {
        console.error("Error parsing vendor data:", error);
      }
    }

    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
};
</script>

<style scoped>
.navbar {
  background-color: #ee5858;
  color: #fff;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  position: relative;
  z-index: 10;
}

.container-fluid {
  padding: 0 20px;
}

.navbar::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #fff, #fdd, #fff);
  background-size: 200% auto;
  animation: animateGlow 4s linear infinite;
  border-radius: 3px;
}

@keyframes animateGlow {
  0% {
    background-position: right center;
  }
  100% {
    background-position: left center;
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.logo {
  height: 45px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.navbar-brand:hover .logo {
  transform: scale(1.1);
  animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.brand-text {
  font-size: 16px;
  color: #fff !important;
  padding: 12px 18px;
  font-weight: 500;
  letter-spacing: 1px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  margin-left: 1vh;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.navbar-nav .nav-item .nav-link {
  color: #fff !important;
  font-size: 16px;
  padding: 12px 18px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.navbar-nav .nav-item .nav-link:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  font-weight: 600;
}

.navbar-nav .nav-item i {
  margin-right: 8px;
  font-size: 1.1em;
  vertical-align: middle;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.notification-item {
  position: relative;
}

.notification-count {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff4444;
  color: white;
  font-size: 0.7em;
  padding: 2px 6px;
  border-radius: 50%;
  animation: pulseNotification 2s ease infinite;
}

@keyframes pulseNotification {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.profile-link,
.logout-link {
  transition: color 0.3s ease, transform 0.3s ease;
}

.profile-link:hover,
.logout-link:hover {
  color: #ffcd39 !important;
  transform: translateY(-2px);
}

.navbar-nav .nav-item.time {
  font-size: 16px;
  color: #fff !important;
  padding: 12px 18px;
  font-weight: 500;
  letter-spacing: 1px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.animated-icon {
  width: 30px;
  height: 20px;
  position: relative;
  margin-top: 5px;
  cursor: pointer;
}

.animated-icon span {
  background: white;
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  border-radius: 2px;
  opacity: 1;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.animated-icon span:nth-child(1) {
  top: 0;
}

.animated-icon span:nth-child(2) {
  top: 8px;
}

.animated-icon span:nth-child(3) {
  top: 16px;
}

.animated-icon.open span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.animated-icon.open span:nth-child(2) {
  opacity: 0;
}

.animated-icon.open span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}
</style>
