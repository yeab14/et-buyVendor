<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-etbuy-creamywhite px-6 py-12 text-center font-public-sans">
    <main class="max-w-lg bg-etbuy-white shadow-etbuy-light rounded-3xl p-12 space-y-8">
      <h1 class="text-7xl font-extrabold text-etbuy-red-dark tracking-wide animate-pulse select-none">404</h1>

      <h2 class="text-3xl font-semibold text-etbuy-red-dark leading-snug">
        Oops! Page Not Found
      </h2>

      <p class="text-gray-700 text-lg leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <button
        @click="goHome"
        class="mt-6 inline-flex items-center gap-3 px-10 py-4 rounded-full bg-topbar-bg text-white font-semibold shadow-etbuy-button hover:bg-etbuy-red-dark transition duration-300 focus:outline-none focus:ring-4 focus:ring-etbuy-red-light"
        aria-label="Go to homepage"
      >
        <i class="fas fa-home text-xl"></i>
        Back to Home
      </button>

      <div class="mt-10 text-sm text-gray-500 italic">
        Need assistance? Contact our
        <button
          @click="openSupportForm"
          class="text-etbuy-red-dark underline hover:text-etbuy-red-light focus:outline-none"
        >
          support team
        </button>
        .
      </div>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
  goHome() {
    this.$router.push({ name: 'Overview' });
  },
  openSupportForm() {
    this.$router.push({ name: 'support-form' });
  }
}
};
</script>

<style scoped>

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}
.animate-pulse {
  animation: pulse 2.5s ease-in-out infinite;
}
</style>
