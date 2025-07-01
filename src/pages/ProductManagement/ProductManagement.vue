<template>
  <div class="min-h-screen px-content-px py-content-py  bg-etbuy-creamywhite text-etbuy-black font-public-sans">
    <div class="max-w-7xl mx-auto">
      <div class="bg-etbuy-white shadow-etbuy-light rounded-xl p-6">
        <header class="mb-6">
          <h2 class="text-2xl font-semibold text-etbuy-red-dark">Product Management</h2>
          <p class="text-sm text-etbuy-text-muted">Manage all aspects of product listings</p>
        </header>

        <!-- Tabs -->
        <div>
          <div class="flex space-x-4 border-b border-etbuy-red-darken mb-4">
            <button
              :class="[
                'px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-t-lg',
                activeTab === 'product-list'
                  ? 'bg-etbuy-red-dark text-white shadow-etbuy-button'
                  : 'text-etbuy-red-dark hover:bg-etbuy-red-light hover:text-white'
              ]"
              @click="activeTab = 'product-list'"
            >
              Product List
            </button>
            <button
              :class="[
                'px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-t-lg',
                activeTab === 'add-product'
                  ? 'bg-etbuy-red-dark text-white shadow-etbuy-button'
                  : 'text-etbuy-red-dark hover:bg-etbuy-red-light hover:text-white'
              ]"
              @click="activeTab = 'add-product'"
            >
              Add Product
            </button>
          </div>

          <div class="mt-6">
            <ProductList v-if="activeTab === 'product-list'" />
            <ProductForm v-if="activeTab === 'add-product'" @product-added="handleProductAdded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductList from './ProductList.vue';
import ProductForm from './ProductForm.vue';

const activeTab = ref('product-list');

const handleProductAdded = () => {
  activeTab.value = 'product-list';
};
</script>
