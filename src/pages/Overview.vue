<template>
  <div class="min-h-screen bg-etbuy-creamywhite p-8 font-public-sans text-etbuy-black">
    <div class="container mx-auto space-y-12">

      <!-- Stats Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          icon="fas fa-dollar-sign"
          label="Total Revenue"
          :value="totalRevenue"
          class="border-l-4 border-etbuy-red-dark shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <span class="text-xs text-etbuy-red-dark font-semibold tracking-wide uppercase">Last 30 Days</span>
        </StatCard>

        <StatCard
          icon="fas fa-box"
          label="Total Products"
          :value="totalProducts"
          class="border-l-4 border-etbuy-blue shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <span class="text-xs text-etbuy-blue font-semibold tracking-wide uppercase">Active & Inactive</span>
        </StatCard>

        <StatCard
          icon="fas fa-shopping-cart"
          label="Pending Orders"
          :value="pendingOrders"
          class="border-l-4 border-etbuy-orange shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <span class="text-xs text-etbuy-orange font-semibold tracking-wide uppercase">Awaiting Processing</span>
        </StatCard>

        <StatCard
          icon="fas fa-star"
          label="Customer Rating"
          :value="customerRating + ' / 5'"
          class="border-l-4 border-light-salmon shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <span class="text-xs text-light-salmon font-semibold tracking-wide uppercase">Overall Satisfaction</span>
        </StatCard>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ChartCard
          title="Sales Performance"
          subtitle="Weekly Revenue Trend"
          class="shadow-xl rounded-xl border border-[#ffe7e7] bg-white"
        >
          <LineChart :chart-data="salesTrend.data" :options="salesTrend.options" />
        </ChartCard>

        <ChartCard
          title="Customer Feedback"
          subtitle="Daily Satisfaction Score"
          class="shadow-xl rounded-xl border border-[#e0f1ff] bg-white"
        >
          <LineChart :chart-data="feedbackTrend.data" :options="feedbackTrend.options" />
        </ChartCard>

        <ChartCard
          title="Product Categories"
          subtitle="Distribution by Category"
          class="shadow-xl rounded-xl border border-[#fff3e6] bg-white"
        >
          <PieChart :chart-data="productDistribution.data" />
        </ChartCard>
      </div>

      <!-- Pending Tasks List -->
      <section
        aria-labelledby="pending-tasks-title"
        class="bg-white rounded-2xl shadow-2xl p-8 border border-[#ffe7e7]"
      >
        <h3
          id="pending-tasks-title"
          class="text-2xl font-extrabold mb-6 tracking-tight text-etbuy-red-dark"
        >
          Pending Tasks
        </h3>

        <ul class="space-y-4">
          <li
            v-for="(task, idx) in taskData"
            :key="idx"
            class="flex items-center justify-between p-4 rounded-lg bg-etbuy-creamywhite hover:bg-[#ffe7e7] transition-colors duration-300"
          >
            <label
              class="flex items-center space-x-4 cursor-pointer select-none"
              :for="'task-' + idx"
            >
              <input
                type="checkbox"
                :id="'task-' + idx"
                v-model="task.checked"
                class="form-checkbox h-6 w-6 text-etbuy-red-dark border-etbuy-red-dark rounded focus:ring-etbuy-red-dark"
              />
              <span
                :class="{
                  'line-through text-gray-400': task.checked,
                  'text-etbuy-red-dark': !task.checked
                }"
                class="text-lg font-medium transition-colors duration-200"
              >
                {{ task.title }}
              </span>
            </label>

            <div class="flex space-x-6 text-etbuy-red-dark">
              <button
                class="hover:text-etbuy-blue focus:outline-none focus:ring-2 focus:ring-etbuy-blue rounded"
                aria-label="Edit Task"
              >
                <i class="fas fa-edit fa-lg"></i>
              </button>
              <button
                class="hover:text-etbuy-orange focus:outline-none focus:ring-2 focus:ring-etbuy-orange rounded"
                aria-label="Delete Task"
              >
                <i class="fas fa-trash fa-lg"></i>
              </button>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script>
import StatCard from '@/components/Cards/StatsCard.vue';
import ChartCard from '@/components/Cards/ChartCard.vue';
import LineChart from '@/components/charts/LineChart.vue';
import PieChart from '@/components/charts/PieChart.vue';

export default {
  name: 'VendorOverview',
  components: { StatCard, ChartCard, LineChart, PieChart },
  data() {
    return {
      totalRevenue: 2500.5,
      totalProducts: 150,
      pendingOrders: 12,
      customerRating: 4.7,
      salesTrend: {
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Revenue',
              data: [150, 170, 200, 250, 280, 320, 350],
              borderColor: '#ee5858',
              backgroundColor: 'transparent',
              fill: false,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      },
      feedbackTrend: {
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Satisfaction',
              data: [4.5, 4.7, 4.6, 4.8, 4.9, 5.0, 4.8],
              borderColor: '#2484C2',
              backgroundColor: 'transparent',
              fill: false,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      },
      productDistribution: {
        data: {
          labels: ['Electronics', 'Fashion', 'Home', 'Books'],
          datasets: [
            {
              data: [25, 40, 20, 15],
              backgroundColor: ['#ee5858', '#2484C2', '#FA8232', '#fdbdbd'],
            },
          ],
        },
      },
      taskData: [
        { title: 'Review Product Listings', checked: false },
        { title: 'Approve Pending Orders', checked: true },
        { title: 'Update Pricing', checked: false },
        { title: 'Check Inventory', checked: false },
      ],
    };
  },
};
</script>
