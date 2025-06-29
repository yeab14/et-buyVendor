<template>
  <nav
    class="bg-etbuy-red-darken shadow-etbuy-light sticky top-0 z-50 font-public-sans select-none relative"
    aria-label="Primary Navigation"
  >
    <div class="container mx-auto px-6 py-3 flex items-center justify-between">
      
 
      <router-link
        to="/vendor/overview"
        class="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-etbuy-red-light rounded"
      >
        <img
          src="img/et-buy.png"
          alt="EtBuy Logo"
          class="h-12 w-auto transition-transform duration-300 ease-in-out hover:scale-110 drop-shadow-md"
          loading="lazy"
          decoding="async"
        />
        <span
          class="text-white text-xl font-extrabold tracking-widest uppercase border-l-4 border-etbuy-red-light pl-3 drop-shadow-xl select-text"
        >
          EtBuy Vendor Portal
        </span>
      </router-link>

     
      <button
        @click="toggleSidebar"
        aria-label="Toggle menu"
        aria-expanded="$sidebar.showSidebar.toString()"
        class="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-etbuy-red-light"
      >
        <span
          :class="[
            'block relative w-7 h-0.5 bg-white transition-transform duration-300 ease-in-out',
            $sidebar.showSidebar ? 'rotate-45 top-2.5 absolute scale-110' : ''
          ]"
        ></span>
        <span
          :class="[
            'block w-7 h-0.5 bg-white my-1 transition-opacity duration-300 ease-in-out',
            $sidebar.showSidebar ? 'opacity-0' : 'opacity-100'
          ]"
        ></span>
        <span
          :class="[
            'block relative w-7 h-0.5 bg-white transition-transform duration-300 ease-in-out',
            $sidebar.showSidebar ? '-rotate-45 top-2.5 absolute scale-110' : ''
          ]"
        ></span>
      </button>

  
      <ul
        class="hidden sm:flex items-center space-x-8 text-white text-sm font-semibold uppercase tracking-wide"
      >
       
        <li class="relative group">
          <button
            @click.prevent="markNotificationRead"
            aria-label="Notifications"
            class="relative p-2 rounded-md hover:bg-etbuy-red-light focus:outline-none focus:ring-2 focus:ring-etbuy-red-light transition duration-300"
          >
            <i class="fas fa-bell fa-lg drop-shadow-sm"></i>
            <span
              v-if="notificationCount > 0"
              class="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5 animate-pulse shadow-md"
              aria-live="polite"
            >
              {{ notificationCount }}
            </span>
          </button>
          <span
            class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-etbuy-white-transparent select-none"
            >Notifications</span
          >
        </li>

        
        <li>
          <router-link
            to="/vendor/user"
            class="flex items-center gap-2 hover:text-etbuy-red-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-etbuy-red-light rounded select-text"
          >
            <i class="fas fa-user fa-lg drop-shadow-sm"></i>
            <span class="truncate max-w-[12rem]" :title="vendorName">{{ vendorName }}</span>
          </router-link>
        </li>

  
        <li>
          <button
            @click.prevent="logout"
            class="flex items-center gap-2 hover:text-etbuy-red-light transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-etbuy-red-light rounded"
            aria-label="Logout"
          >
            <i class="fas fa-power-off fa-lg drop-shadow-sm"></i> Logout
          </button>
        </li>

        
        <li
          class="text-etbuy-white-transparent font-mono text-xs px-4 py-1 border border-etbuy-white-transparent rounded select-none backdrop-blur-sm bg-etbuy-dark-glass"
          aria-live="polite"
        >
          {{ formattedTime }}
        </li>
      </ul>
    </div>

    
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-0 w-full h-1 rounded-t-lg bg-gradient-to-r from-etbuy-red-light via-etbuy-red-dark to-etbuy-red-light animate-gradient-x"
    ></div>
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
      this.notificationCount = 0;
    },
    getCurrentTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
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
@keyframes gradient-x {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 4s ease infinite;
}
</style>
