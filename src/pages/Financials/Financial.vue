<template>
  <div class="min-h-screen px-content-px py-content-py bg-etbuy-creamywhite text-etbuy-black font-public-sans">
    <main class="max-w-7xl mx-auto bg-etbuy-white shadow-etbuy-light rounded-2xl p-10 space-y-16">
      
      <!-- Header -->
      <header class="text-center space-y-3">
        <h2 class="text-3xl font-semibold text-etbuy-red-dark">Vendor Financial Analysis</h2>
        <p class="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Analyze your business performance across revenue streams, settlements, and sales metrics.
        </p>
      </header>

      <!-- KPI Section - Row 1 -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-etbuy-red-light bg-etbuy-white rounded-xl shadow-etbuy-light overflow-hidden">
        <!-- Current Balance -->
        <article class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-etbuy-red-dark">Current Balance</h3>
            <i class="fas fa-coins text-xl text-etbuy-red-darken"></i>
          </div>
          <p class="text-3xl font-bold text-etbuy-black">ETB 15,000.00</p>
          <p class="text-sm text-gray-700">Liquid funds available for immediate withdrawal.</p>
          <div class="space-y-1 mt-2">
            <div class="flex justify-between text-xs font-medium text-etbuy-black">
              <span>Available</span><span>65%</span>
            </div>
            <div class="w-full h-2 bg-etbuy-red-light rounded-full">
              <div class="h-full bg-etbuy-red-dark rounded-full w-[65%] transition-all duration-700"></div>
            </div>
          </div>
        </article>

        <!-- Monthly Earnings -->
        <article class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-etbuy-red-dark">Monthly Earnings</h3>
            <i class="fas fa-chart-bar text-xl text-etbuy-red-darken"></i>
          </div>
          <p class="text-3xl font-bold text-etbuy-black">ETB 45,000.00</p>
          <p class="text-sm text-gray-700">Gross revenue from fulfilled orders this month.</p>
          <ul class="mt-3 text-xs text-etbuy-black space-y-1">
            <li><strong class="text-etbuy-red-dark">Fulfilled Orders:</strong> 45</li>
            <li><strong class="text-etbuy-red-dark">Platform Commission:</strong> ETB 4,500.00</li>
            <li><strong class="text-etbuy-red-dark">Net Payout (Est.):</strong> ETB 40,500.00</li>
          </ul>
        </article>

        <!-- Pending Payouts -->
        <article class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-etbuy-red-dark">Pending Payouts</h3>
            <i class="fas fa-clock text-xl text-etbuy-red-darken"></i>
          </div>
          <p class="text-3xl font-bold text-etbuy-black">ETB 7,200.00</p>
          <p class="text-sm text-gray-700">Expected in 2–3 business days.</p>
          <div class="mt-3 text-xs text-etbuy-black space-y-1">
            <p><strong class="text-etbuy-red-dark">Last Transfer:</strong> 2025-06-28</p>
            <p><strong class="text-etbuy-red-dark">Bank:</strong> CBE ****4321</p>
          </div>
        </article>
      </section>

      <!-- KPI Section - Row 2 -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-etbuy-red-light bg-etbuy-white rounded-xl shadow-etbuy-light overflow-hidden">
        <!-- Last Payout -->
        <article class="p-6 space-y-3">
          <div class="flex items-start gap-3">
            <i class="fas fa-calendar-check text-2xl text-etbuy-red-dark mt-1"></i>
            <div>
              <h3 class="text-lg font-semibold text-etbuy-red-dark">Last Payout</h3>
              <p class="text-sm text-etbuy-black mt-1">2025-02-10</p>
              <p class="text-xs text-gray-700 mt-1">
                Last successful settlement. Funds were confirmed as transferred.
              </p>
            </div>
          </div>
        </article>

        <!-- Orders Summary -->
        <article class="p-6 space-y-3 text-center">
          <h3 class="text-lg font-semibold text-etbuy-red-dark flex items-center justify-center gap-2">
            <i class="fas fa-shopping-cart text-etbuy-red-darken"></i> Orders Summary
          </h3>
          <div class="flex justify-around font-semibold text-etbuy-black mt-4">
            <div><p class="text-2xl">45</p><p class="text-sm text-etbuy-red-dark">Completed</p></div>
            <div><p class="text-2xl">8</p><p class="text-sm text-etbuy-red-dark">Pending</p></div>
            <div><p class="text-2xl">2</p><p class="text-sm text-etbuy-red-dark">Canceled</p></div>
          </div>
          <p class="mt-4 text-xs text-gray-700 leading-relaxed max-w-[80%] mx-auto">
            Orders processed in the last 30 days.
          </p>
        </article>

        <!-- Revenue Growth -->
        <article class="p-6 space-y-3">
          <div class="flex items-start gap-3">
            <i class="fas fa-arrow-up-right-dots text-2xl text-etbuy-red-dark mt-1"></i>
            <div>
              <h3 class="text-lg font-semibold text-etbuy-red-dark">Revenue Growth</h3>
              <p class="text-sm text-etbuy-black mt-1">+12.5% MoM</p>
              <p class="text-xs text-gray-700 mt-1">
                Positive monthly growth trend—keep up the performance.
              </p>
            </div>
          </div>
        </article>
      </section>

      <!-- CTA -->
      <section class="text-center pt-4">
        <button
          @click="contactSupport"
          class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-topbar-bg text-etbuy-white font-semibold shadow-etbuy-button transition-all duration-300 hover:bg-etbuy-red-dark hover:text-white hover:shadow-etbuy-light-hover"
        >
          <i class="fas fa-headset"></i>
          Contact Support
        </button>
      </section>
      

    </main>
  </div>
</template>

<script setup>
function contactSupport() {
  alert("Redirecting to support...");
}
</script>
