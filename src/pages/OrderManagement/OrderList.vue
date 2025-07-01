<template>
    <section class="overflow-x-auto w-full max-w-[1320px] mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <p class="mb-6 font-semibold text-etbuy-black text-lg tracking-wide">
        Total Orders: <span class="text-etbuy-red-dark">{{ orders.length }}</span>
      </p>
  
      <table class="min-w-full text-sm text-left border-collapse table-fixed rounded-lg border border-etbuy-red-light">
        <thead class="bg-etbuy-red-dark text-white text-xs font-semibold uppercase tracking-wide">
          <tr>
            <th class="px-6 py-4 w-[14%] text-center">Order ID</th>
            <th class="px-6 py-4 w-[18%] text-center">Customer</th>
            <th class="px-6 py-4 w-[18%] text-center">Status</th>
            <th class="px-6 py-4 w-[15%] text-center">Total Price</th>
            <th class="px-6 py-4 w-[15%] text-center">Date</th>
            <th class="px-6 py-4 w-[20%] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-etbuy-red-light hover:bg-etbuy-red-light/40 transition-colors duration-250 align-middle"
          >
            <td class="px-6 py-5 text-center font-mono text-etbuy-red-dark">{{ order.id }}</td>
            <td class="px-6 py-5 text-center font-semibold text-etbuy-black truncate" :title="order.customer">
              {{ order.customer }}
            </td>
            <td class="px-6 py-5 text-center">
              <StatusBadge :status="order.status" />
            </td>
            <td class="px-6 py-5 text-center font-semibold text-etbuy-red-dark">${{ order.totalPrice.toFixed(2) }}</td>
            <td class="px-6 py-5 text-center font-mono text-gray-700">{{ formatDate(order.date) }}</td>
            <td class="px-6 py-5 text-center flex justify-center space-x-4">
              <button
                @click="$emit('edit', order.id)"
                class="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow-sm hover:bg-yellow-500 transition"
                aria-label="Edit order"
              >
                View Details
              </button>
              <button
                @click="$emit('delete', order.id)"
                class="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-sm hover:bg-red-700 transition"
                aria-label="Delete order"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script setup>
  import StatusBadge from './StatusBadge.vue';
  
  const props = defineProps({
    orders: {
      type: Array,
      required: true,
    },
  });
  
  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString(undefined, options);
  }
  </script>
  