

<template>
  <div class="min-h-screen px-content-px py-content-py bg-etbuy-creamywhite text-etbuy-black font-public-sans">
    <div class="max-w-7xl mx-auto">
      <div class="bg-etbuy-white shadow-etbuy-light rounded-xl p-6">
        <header class="mb-6">
          <h2 class="text-2xl font-semibold text-etbuy-red-dark">Order Management</h2>
          <p class="text-sm text-etbuy-text-muted">Manage and track orders effectively</p>
        </header>

        <!-- Tabs -->
        <div>
          <div class="flex space-x-4 border-b border-etbuy-red-darken mb-4">
            <button
              :class="tabClass('order-list')"
              @click="activeTab = 'order-list'"
            >
              Order List
            </button>
            <button
              :class="tabClass('other-actions')"
              @click="activeTab = 'other-actions'"
            >
              Other Actions
            </button>
          </div>

          <!-- Tab Contents -->
          <div class="mt-6">
            <OrderList
              v-if="activeTab === 'order-list'"
              :orders="orders"
              @edit="editOrder"
              @delete="deleteOrder"
            />

            <section v-if="activeTab === 'other-actions'" class="flex space-x-4">
              <button
                class="px-6 py-3 rounded border-2 border-etbuy-red-dark text-etbuy-red-dark font-semibold hover:bg-etbuy-red-dark hover:text-white transition"
                @click="bulkUpdate"
              >
                Bulk Update
              </button>
              <button
                class="px-6 py-3 rounded border-2 border-etbuy-red-dark text-etbuy-red-dark font-semibold hover:bg-etbuy-red-dark hover:text-white transition"
                @click="exportCSV"
              >
                Export to CSV
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import OrderList from './OrderList.vue';
import StatusBadge from './StatusBadge.vue'; 

const activeTab = ref('order-list');

const orders = ref([
  { id: 101, customer: 'John Doe', status: 'Pending', totalPrice: 150, date: '2025-02-28' },
  { id: 102, customer: 'Jane Smith', status: 'Shipped', totalPrice: 250, date: '2025-02-27' },
]);

function tabClass(tab) {
  return [
    'px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-t-lg',
    activeTab.value === tab
      ? 'bg-etbuy-red-dark text-white shadow-etbuy-button'
      : 'text-etbuy-red-dark hover:bg-etbuy-red-light hover:text-white'
  ];
}

function editOrder(id) {
  alert(`Edit order ${id}`);
}

function deleteOrder(id) {
  orders.value = orders.value.filter(order => order.id !== id);
}

function bulkUpdate() {
  alert('Bulk update triggered');
}

function exportCSV() {
  alert('Export CSV triggered');
}
</script>
