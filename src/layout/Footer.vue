<template>
  <footer
    class="w-full bg-etbuy-black text-etbuy-text-light shadow-etbuy-footer-glow mt-auto select-none"
    role="contentinfo"
    aria-label="Site footer"
  >
    <div
      class="container mx-auto px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl"
    >
      <span
        class="text-sm font-semibold tracking-wide cursor-default"
        aria-label="Copyright notice"
      >
        &copy; {{ currentYear }} Cedora Technology (Hong Kong) Limited. All rights reserved.
      </span>

      <nav class="flex flex-wrap justify-center gap-8" aria-label="Footer navigation">
        <a
          href="#"
          class="text-sm font-semibold tracking-wide text-etbuy-red-dark hover:text-etbuy-red-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-etbuy-red-light focus-visible:ring-offset-2 focus-visible:ring-offset-etbuy-black rounded"
          aria-label="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          class="text-sm font-semibold tracking-wide text-etbuy-red-dark hover:text-etbuy-red-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-etbuy-red-light focus-visible:ring-offset-2 focus-visible:ring-offset-etbuy-black rounded"
          aria-label="Terms of Service"
        >
          Terms of Service
        </a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ContentFooter",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
