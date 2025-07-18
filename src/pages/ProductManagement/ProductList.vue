<template>
  <div class="min-h-screen bg-etbuy-creamywhite px-content-px py-content-py font-public-sans text-etbuy-black">
 
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-etbuy-red-dark tracking-tight">My Products</h2>
      <p class="text-sm text-etbuy-gray-placeholder">{{ products.length }} Products Listed</p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-etbuy-red-dark animate-pulse">
      <i class="fas fa-spinner fa-spin text-3xl mb-3"></i>
      <p class="text-lg font-semibold">Loading products...</p>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center text-center text-custom-etbuy-red-dark py-20">
      <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
      <p class="text-lg font-semibold">{{ error }}</p>
      <button @click="fetchProducts"
              class="mt-4 inline-flex items-center px-5 py-2 bg-etbuy-red-dark hover:bg-custom-etbuy-red-dark text-white font-semibold rounded-md shadow-etbuy-button transition">
        <i class="fas fa-redo mr-2"></i> Retry
      </button>
    </div>

  
    <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-etbuy-gray-placeholder">
      <i class="fas fa-box-open text-4xl mb-2"></i>
      <p class="text-base">No products found.</p>
    </div>

 
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id"
           class="bg-white rounded-xl shadow-etbuy-light hover:shadow-etbuy-light-hover transition duration-300 p-4 flex flex-col justify-between">
        
       
        <div class="relative h-48 mb-4 rounded-lg overflow-hidden bg-etbuy-white">
          <img :src="product.image" :alt="product.name" class="object-cover w-full h-full" />
          <div class="absolute top-2 left-2 space-y-1">
            <span v-if="product.discountPercent"
                  class="bg-etbuy-orange text-white text-xs px-2 py-0.5 rounded shadow-etbuy-icon-hover">
              {{ product.discountPercent }}%
            </span>
            <span :class="[ 
                    'text-xs font-semibold px-2 py-0.5 rounded',
                    product.availability 
                      ? 'bg-etbuy-whatsapp text-white'
                      : 'bg-etbuy-red-darken text-white'
                  ]">
              {{ product.availability ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>

      
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-etbuy-black truncate mb-1">{{ product.name }}</h3>
          <p class="text-sm text-etbuy-black text-opacity-70 line-clamp-2 leading-snug">{{ product.description }}</p>

       
          <div class="flex items-center mt-2 text-etbuy-red-dark">
            <div class="flex space-x-0.5">
              <i v-for="n in 5" :key="n"
                 :class="['fas', n <= Math.round(product.rating) ? 'fa-star' : 'fa-star text-gray-300']"></i>
            </div>
            <span class="ml-2 text-xs text-etbuy-gray-placeholder">({{ product.rating }}/5)</span>
          </div>

        
          <div class="mt-2 flex items-baseline space-x-2">
            <span class="text-base font-bold text-etbuy-blue">{{ product.currentPrice.toFixed(2) }} ETB</span>
            <span v-if="product.discountPrice"
                  class="text-sm line-through text-etbuy-gray-placeholder">{{ product.originalPrice.toFixed(2) }} ETB</span>
          </div>

        
          <div class="mt-2 text-xs text-custom-etbuy-red-dark flex justify-between">
            <span>SKU: {{ product.sku }}</span>
            <span class="capitalize">{{ product.tag }}</span>
          </div>
        </div>


        <div class="flex justify-between mt-4">
          <button @click="$emit('edit', product.id)"
                  class="text-sm text-etbuy-blue font-medium hover:underline transition">
            <i class="fas fa-edit mr-1"></i>Edit
          </button>
          <button @click="$emit('delete', product.id)"
                  class="text-sm text-custom-etbuy-red-dark font-medium hover:underline transition">
            <i class="fas fa-trash mr-1"></i>Delete
          </button>
          <button class="text-sm text-etbuy-orange font-medium hover:underline transition">
            <i class="fas fa-eye mr-1"></i>Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getProductsByVendor } from '@/api/product';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      const session = localStorage.getItem("vendorSession");
      const vendor = session ? JSON.parse(session)?.vendor : null;
      const vendorId = vendor?.id;

      if (!vendorId) {
        this.error = "Vendor ID not found.";
        this.loading = false;
        return;
      }

      getProductsByVendor(vendorId)
        .then(res => {
          this.products = res;
          this.loading = false;
        })
        .catch(err => {
          this.error = err.message || 'Failed to load products.';
          this.loading = false;
        });
    }
  }
};
</script>
