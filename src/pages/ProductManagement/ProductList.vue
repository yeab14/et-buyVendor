<template>
  <div class="product-list-container">
    <!-- Header Section -->
    <div class="list-header">
      <div class="header-content">
        <h2>My Products</h2>
        <p class="product-count">{{ products.length }} Products Listed</p>
      </div>

    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
      <button @click="fetchProducts" class="retry-btn">
        <i class="fas fa-redo"></i>
        Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else class="products-grid">
      <div v-if="products.length === 0" class="no-products">
        <i class="fas fa-box-open"></i>
        <p>No products found</p>
        <button class="add-product-btn">
          <i class="fas fa-plus"></i>
          Add Your First Product
        </button>
      </div>

      <div v-else v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
          <div class="product-badges">
            <span v-if="product.discountPercent" class="discount-badge">
              -{{ product.discountPercent }}%
            </span>
            <span :class="['status-badge', product.availability ? 'in-stock' : 'out-of-stock']">
              {{ product.availability ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>
        
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-brand">{{ product.brand }}</p>
          
          <div class="product-rating">
            <div class="stars">
              <i v-for="n in 5" :key="n" 
                 :class="['fas', n <= Math.round(product.rating) ? 'fa-star' : 'fa-star-o']">
              </i>
            </div>
            <span class="rating-value">{{ product.rating }}/5</span>
          </div>

          <div class="price-section">
            <span class="current-price">{{ product.currentPrice.toFixed(2) }}ETB</span>
            <span v-if="product.discountPrice" class="original-price">{{ product.originalPrice.toFixed(2) }}ETB</span>
          </div>

          <div class="product-meta">
            <span class="sku">SKU: {{ product.sku }}</span>
            <span class="category">{{ product.tag }}</span>
          </div>
        </div>

        <div class="product-actions">
          <button class="action-btn edit" @click="$emit('edit', product.id)">
            <i class="fas fa-edit"></i>
            Edit
          </button>
          <button class="action-btn delete" @click="$emit('delete', product.id)">
            <i class="fas fa-trash"></i>
            Delete
          </button>
          <button class="action-btn view">
            <i class="fas fa-eye"></i>
            View Details
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
  
  data: function() {
    return {
      products: [],
      loading: false,
      error: null
    }
  },

  created: function() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts: function() {
      this.loading = true;
      
  
      const vendorSession = localStorage.getItem("vendorSession");
      console.log('Raw vendor session:', vendorSession);
      const sessionData = vendorSession ? JSON.parse(vendorSession) : null;
      console.log('Parsed session data:', sessionData);
      const vendorId = sessionData ? sessionData.vendor.id : null;
      console.log('Extracted vendor ID:', vendorId);

      if (!vendorId) {
        console.error('No vendor ID found in session:', sessionData);
        this.error = "Vendor ID not found";
        this.loading = false;
        return;
      }

      console.log('Fetching products for vendor ID:', vendorId);
      
      getProductsByVendor(vendorId)
        .then(products => {
          console.log('Products received:', products);
          this.products = products;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          console.error('Error details:', {
            message: error.message,
            response: error.response,
            status: error.response?.status
          });
          this.error = error.message;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.product-list-container {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fe 0%, #ffffff 100%);
  min-height: 100vh;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(238, 88, 88, 0.08);
  border-left: 4px solid #ee5858;
}

.header-content h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ee5858, #e63946);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-count {
  color: #64748b;
  font-size: 1rem;
}

.add-product-btn {
  background: linear-gradient(45deg, #ee5858, #e63946);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-product-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(238, 88, 88, 0.2);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(238, 88, 88, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(238, 88, 88, 0.1);
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(238, 88, 88, 0.15);
  border-color: rgba(238, 88, 88, 0.3);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #ee5858, #e63946);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover::before {
  opacity: 1;
}

.product-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
}

.discount-badge {
  background: linear-gradient(45deg, #ee5858, #e63946);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(238, 88, 88, 0.3);
  animation: pulse 2s infinite;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.status-badge.in-stock {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
}

.status-badge.out-of-stock {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
}

.product-info {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(238, 88, 88, 0.1);
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.product-card:hover .product-name {
  color: #ee5858;
}

.product-brand {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: rgba(238, 88, 88, 0.05);
  padding: 0.5rem;
  border-radius: 8px;
}

.stars {
  color: #fbbf24;
  display: flex;
  gap: 0.25rem;
}

.rating-value {
  color: #64748b;
  font-size: 0.875rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.75rem;
  background: rgba(238, 88, 88, 0.05);
  border-radius: 8px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ee5858;
  text-shadow: 0 2px 4px rgba(238, 88, 88, 0.1);
}

.original-price {
  color: #64748b;
  text-decoration: line-through;
  font-size: 1rem;
  opacity: 0.7;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(238, 88, 88, 0.1);
}

.product-actions {
  padding: 1rem 1.5rem;
  background: #f8f9fe;
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.action-btn.edit {
  background: rgba(238, 88, 88, 0.1);
  color: #ee5858;
}

.action-btn.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-btn.view {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .product-list-container {
    padding: 1rem;
  }

  .list-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }

  .product-card {
    margin-bottom: 1rem;
  }

  .product-actions {
    flex-direction: column;
  }
}

.loading-state,
.error-state,
.no-products {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(238, 88, 88, 0.08);
  margin: 2rem 0;
}

.loading-state i,
.error-state i,
.no-products i {
  font-size: 3rem;
  color: #ee5858;
  margin-bottom: 1rem;
}

.loading-state p,
.error-state p,
.no-products p {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.retry-btn {
  background: linear-gradient(45deg, #ee5858, #e63946);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(238, 88, 88, 0.2);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fa-spinner {
  animation: spin 1s linear infinite;
}
</style>
