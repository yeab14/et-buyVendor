<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template #header>
              <h4 class="card-title">Product Management</h4>
              <p class="card-category">Manage all aspects of product listings</p>
            </template>

            <div class="nav-tabs-container">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a 
                    class="nav-link" 
                    :class="{ active: activeTab === 'product-list' }" 
                    @click="activeTab = 'product-list'"
                  >Product List</a>
                </li>
                <li class="nav-item">
                  <a 
                    class="nav-link" 
                    :class="{ active: activeTab === 'add-product' }" 
                    @click="activeTab = 'add-product'"
                  >Add Product</a>
                </li>
              </ul>
              <div class="tab-content mt-3">
                <ProductList v-if="activeTab === 'product-list'" />
                <ProductForm v-if="activeTab === 'add-product'" @product-added="handleProductAdded" />
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Card from 'src/components/Cards/Card.vue';
import ProductList from './ProductList.vue';
import ProductForm from './ProductForm.vue';

export default {
  components: {
    Card,
    ProductList,
    ProductForm
  },
  setup() {
    const activeTab = ref('product-list');

    const handleProductAdded = () => {
      activeTab.value = 'product-list';
    };

    return {
      activeTab,
      handleProductAdded
    };
  }
};
</script>

<style scoped>
.nav-tabs .nav-link {
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 0;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
  border: 2px solid transparent;
  cursor: pointer;
}

.nav-tabs .nav-link.active {
  color: white;
  background-color: #ee5858;
  border: 2px solid #ee5858;
}
</style>
