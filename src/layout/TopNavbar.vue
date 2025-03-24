<!-- Top Bar -->
<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">

      <!-- Logo with Animated Glow -->
      <router-link class="navbar-brand" to="/vendor/overview">
        <img src="img/et-buy.png" alt="">
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

          <!-- Interactive Search Bar -->
          <!-- <li class="nav-item search-item">
            <input type="text" class="form-control search-input" placeholder="Search...">
            <i class="nc-icon nc-zoom-split search-icon"></i>
          </li> -->

          <!-- Notification with Subtle Pulsing Animation -->
          <li class="nav-item notification-item">
            <a class="nav-link" href="#" @click="markNotificationRead">
              <i class="nc-icon nc-bell-55"></i>
              <span class="notification-count" v-if="notificationCount > 0">{{ notificationCount }}</span>
            </a>
          </li>

          <!-- Profile Link -->
          <li class="nav-item">
            <router-link class="nav-link profile-link" to="/vendor/user">
              <i class="nc-icon nc-single-02"></i>Profile
            </router-link>
          </li>

          <!-- Logout Button -->
          <li class="nav-item">
            <router-link class="nav-link logout-link" to="/vendor/login">
              <i class="nc-icon nc-button-power"></i>Logout
            </router-link>
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
    };
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
/* Global Styles */
.navbar {
  background-color: #ee5858;
  color: #fff;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  padding: 15px 20px;
  position: relative; /* Required for pseudo-element */
  z-index: 10; /* Ensure navbar is above content */
}

.container-fluid {
  padding-left: 20px;
  padding-right: 20px;
}

/* Animated Background Line */
.navbar::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
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

/* Logo & Brand Styling */
.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative; /* For logo pulse */
}

.logo {
  height: 45px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

/* Pulse effect on logo hover */
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    margin-left:1vh; 
}


/* Search Input */
.search-item {
  position: relative;
  margin-right: 15px;
}

.search-input {
  border-radius: 25px;
  padding: 8px 35px 8px 15px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  transition: background-color 0.3s ease;
  width: 180px; /* Initial width */
}

.search-input:focus {
  background-color: rgba(255, 255, 255, 0.4);
  width: 220px; /* Expand on focus */
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  opacity: 0.7;
  cursor: pointer;
}

/* Navbar Items */
.navbar-nav .nav-item .nav-link {
  color: #fff !important;
  font-size: 16px;
  padding: 12px 18px;
  transition: all 0.3s ease;
  text-transform: uppercase;
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

/* Notification Icon */
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
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Profile and Logout Links */
.profile-link,
.logout-link {
  transition: color 0.3s ease, transform 0.3s ease;
}

.profile-link:hover,
.logout-link:hover {
  color: #ffcd39 !important;
  transform: translateY(-2px);
}

/* Time Display */
.navbar-nav .nav-item.time {
  font-size: 16px;
  color: #fff !important;
  padding: 12px 18px;
  font-weight: 500;
  letter-spacing: 1px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

/* Navbar Toggler - Animated Icon */
.animated-icon {
  width: 30px;
  height: 20px;
  position: relative;
  margin: 0px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

.animated-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

.animated-icon span:nth-child(1) {
  top: 0px;
}

.animated-icon span:nth-child(2),
.animated-icon span:nth-child(3) {
  top: 10px;
}

.animated-icon span:nth-child(3) {
  top: 20px;
}

.animated-icon.open span:nth-child(1) {
  top: 10px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

.animated-icon.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.animated-icon.open span:nth-child(3) {
  top: 10px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

/* Responsiveness */
@media (max-width: 768px) {
  .search-item {
    display: none;
  }

  .navbar-brand {
    font-size: 22px;
  }

  .logo {
    height: 40px;
  }
}
</style>
