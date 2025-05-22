<template>
  <div class="form-container">
    <h1 class="form-title">Product Management</h1>
    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-grid">
        <!-- Category and SubCategory Section -->
        <div class="form-section">
          <h3 class="section-title">Category Details</h3>
          <div class="form-group">
            <label>Category</label>
            <select v-model="product.categoryId" required>
              <option disabled value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Sub Category</label>
            <select v-model="product.subCategoryId" required>
              <option disabled value="">Select Sub Category</option>
              <option v-for="subCategory in subCategories" :key="subCategory.id" :value="subCategory.id">{{ subCategory.name }}</option>
            </select>
          </div>
        </div>

        <!-- Basic Info Section -->
        <div class="form-section">
          <h3 class="section-title">Basic Information</h3>
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" v-model="product.name" required />
          </div>

          <div class="form-group">
            <label>Brand</label>
            <input type="text" v-model="product.brand" required />
          </div>

          <div class="form-group">
            <label>SKU</label>
            <input type="text" v-model="product.sku" required />
          </div>
        </div>

       

        <!-- Pricing Section -->
        <div class="form-section">
          <h3 class="section-title">Pricing Details</h3>
          <div class="form-group">
            <label>Original Price</label>
            <input type="number" v-model.number="product.originalPrice" required />
          </div>

          <div class="form-group">
            <label>Current Price</label>
            <input type="number" v-model.number="product.currentPrice" required />
          </div>

          <div class="form-group">
            <label>Discount Price</label>
            <input type="number" v-model.number="product.discountPrice" />
          </div>

          <div class="form-group">
            <label>Discount Percent</label>
            <input type="number" v-model.number="product.discountPercent" />
          </div>
        </div>

        <!-- Rating & Tags Section -->
        <div class="form-section">
          <h3 class="section-title">Additional Details</h3>
          <div class="form-group">
            <label>Rating</label>
            <input type="number" v-model.number="product.rating" min="0" max="5" step="0.1" required />
          </div>

          <div class="form-group">
            <label>Tag</label>
            <input type="text" v-model="product.tag" />
          </div>

          <div class="form-group">
            <label>Availability</label>
            <select v-model="product.availability">
              <option :value="true">Available</option>
              <option :value="false">Out of Stock</option>
            </select>
          </div>
        </div>

           <!-- Description Section -->
           <div class="form-section full-width">
            <h3 class="section-title">Product Description</h3>
            <div class="form-group">
              <textarea v-model="product.description" rows="4" placeholder="Enter product description"></textarea>
            </div>
          </div>

        <!-- Attributes Section -->
        <div class="form-section full-width">
          <h3 class="section-title">Product Attributes</h3>
          <div class="attributes-grid">
            <div v-for="attribute in attributeDefinitions" :key="attribute.id" class="attribute-group">
              <label class="form-label">{{ attribute.name }}</label>
              <DynamicInput
                :inputType="attribute.inputType"
                :value="attributeValues[attribute.id]?.value"
                @update:modelValue="(value, selectedOption) => updateAttributeValue(attribute.id, value, selectedOption)"
                :options="attributeOptions[attribute.id] || []"
              />
            </div>
          </div>
        </div>

<!-- Shipping Section -->
<div class="form-section full-width">
  <h3 class="section-title">Shipping Information</h3>
  <div class="shipping-container">
    <!-- Selected Shipping Chips -->
    <div class="chips-container">
      <div
        class="chip"
        v-for="option in product.shippingInfo"
        :key="option"
        @click="removeShippingInfo(option)"
      >
        <span>{{ option }}</span>
        <button type="button" class="clear-btn">×</button>
      </div>
    </div>

    <!-- Shipping Provider Dropdown -->
    <select
      v-model="selectedShippingOption"
      @change="addShippingInfo"
      class="shipping-select"
    >
      <option disabled value="">Select Shipping Provider</option>
      <option
        v-for="provider in shippingProviders"
        :key="provider.id"
        :value="provider.name"
      >
        {{ provider.name }} - ${{ provider.baseCost }} | {{ provider.minDeliveryDays }}-{{ provider.maxDeliveryDays }} days
      </option>
    </select>

    <!-- Provider Details Card -->
    <div v-if="providerDetails" class="provider-details">
      <div class="provider-card">
        <img
          :src="'/assets/logos/' + providerDetails.logo"
          :alt="providerDetails.name"
          class="provider-logo"
        />
        <p><strong>{{ providerDetails.name }}</strong></p>
        <p>{{ providerDetails.description }}</p>
        <p>Base Cost: ${{ providerDetails.baseCost }}</p>
        <p>Delivery: {{ providerDetails.minDeliveryDays }}-{{ providerDetails.maxDeliveryDays }} days</p>
      </div>
    </div>
  </div>
</div>

      

        <!-- Additional Info Section -->
        <div class="form-section full-width">
          <h3 class="section-title">Additional Information</h3>
          <div class="form-group">
            <textarea v-model="product.additionalInformation" rows="4" placeholder="Enter additional information"></textarea>
          </div>
        </div>

        <!-- Image Upload Section -->
        <div class="form-section full-width">
          <h3 class="section-title">Product Images</h3>
          <div class="upload-container" :class="{ 'has-image': product.image }">
            <input 
              type="file" 
              @change="handleFileUpload" 
              id="file-upload" 
              class="file-input"
              accept="image/*"
            />
            <label for="file-upload" class="upload-label">
              <template v-if="!product.image">
                <span class="upload-icon">+</span>
                <span>Choose Image</span>
                <span class="upload-hint">Max size: 5MB</span>
              </template>
              <template v-else>
                <img 
                  :src="imagePreviewUrl" 
                  class="preview-image" 
                  alt="Preview"
                />
                <span class="image-name">{{ product.image.name }}</span>
                <button type="button" class="remove-image" @click="removeImage">
                  Remove Image
                </button>
              </template>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-section full-width">
          <button type="submit" class="submit-btn">Save Product</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import * as Yup from "yup";
import fetchCategories from "@/api/categories";
import fetchSubCategories from "@/api/subcategories"; 
import fetchAttributeDefinitionsBySubCategory from "@/api/attributeDefinition";
import fetchAttributeValuesByDefinitionId from "@/api/attributeValue";
import fetchShippingProviders from '@/api/shippingProviders';
import { createProduct } from "@/api/product";
import DynamicInput from '@/pages/ProductManagement/DynamicInput.vue';

const product = ref({
  name: "",
  description: "",
  originalPrice: null,
  currentPrice: null,
  categoryId: null,
  subCategoryId: null,
  rating: null,
  tag: "",
  sku: "",
  brand: "",
  availability: true,
  discountPrice: null,
  discountPercent: null,
  additionalInformation: "",
  attributes: [],
  shippingInfo: [],
  image: null
});

const categories = ref([]);
const subCategories = ref([]);
const attributeDefinitions = ref([]);
const attributeValues = ref({});
const attributeOptions = ref({});
const shippingProviders = ref([]);
const selectedShippingOption = ref("");

// Computed Properties
const imagePreviewUrl = computed(() => {
  return product.value.image ? URL.createObjectURL(product.value.image) : '';
});

const providerDetails = computed(() => {
  if (!selectedShippingOption.value) return null;
  return shippingProviders.value.find(
    provider => provider.name === selectedShippingOption.value
  );
});

// Form submission
const submitForm = async function() {
  try {
    // Validate required fields
    if (!product.value.name || !product.value.categoryId || !product.value.subCategoryId) {
      alert('Please fill in all required fields');
      throw new Error('Missing required fields');
    }

    // Validate image
    if (!product.value.image) {
      alert('Please select an image');
      throw new Error('Missing image');
    }

    // Format the product data
    const formattedProduct = {
      name: product.value.name,
      description: product.value.description,
      originalPrice: Number(product.value.originalPrice),
      currentPrice: Number(product.value.currentPrice),
      categoryId: Number(product.value.categoryId),
      subCategoryId: Number(product.value.subCategoryId),
      rating: Number(product.value.rating),
      tag: product.value.tag,
      sku: product.value.sku,
      brand: product.value.brand,
      availability: product.value.availability,
      discountPrice: Number(product.value.discountPrice) || null,
      discountPercent: Number(product.value.discountPercent) || null,
      additionalInformation: product.value.additionalInformation,
      attributes: Object.values(attributeValues.value)
        .filter(attr => attr.value !== "" && attr.attributeValueId)
        .map(attr => ({
          attributeDefinitionId: Number(attr.attributeDefinitionId),
          attributeValueId: Number(attr.attributeValueId),
          value: attr.value
        })),
      shippingInfo: product.value.shippingInfo.map(info => ({
        shippingMethod: info,
        shippingProviderId: Number(shippingProviders.value.find(p => p.name === info)?.id || 1),
        weight: 0.5,
        shippingTime: "5-7 business days"
      }))
    };

    // Create FormData
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(formattedProduct)], {
      type: 'application/json'
    }));
    formData.append('image', product.value.image);

    // Call the API
    const createdProduct = await createProduct(formData);
    console.log("Product created successfully:", createdProduct);

    // Reset form on success
    resetForm();

    return createdProduct;

  } catch (err) {
    console.error("Error submitting form:", err);
    alert('Error creating product: ' + (err.message || 'Please try again.'));
    throw err;
  }
};

// File handling
const handleFileUpload = function(event) {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      event.target.value = ''; // Clear the input
      return;
    }
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      event.target.value = ''; // Clear the input
      return;
    }
    product.value.image = file;
    console.log('Image file selected:', file.name, file.type, file.size);
  }
};

const removeImage = () => {
  product.value.image = null;
  const fileInput = document.getElementById('file-upload');
  if (fileInput) {
    fileInput.value = '';
  }
};

const resetForm = () => {
  product.value = {
    name: "",
    description: "",
    originalPrice: null,
    currentPrice: null,
    categoryId: null,
    subCategoryId: null,
    rating: null,
    tag: "",
    sku: "",
    brand: "",
    availability: true,
    discountPrice: null,
    discountPercent: null,
    additionalInformation: "",
    attributes: [],
    shippingInfo: [],
    image: null
  };
  attributeValues.value = {};
  attributeOptions.value = {};
};

const addShippingInfo = () => {
  if (selectedShippingOption.value && !product.value.shippingInfo.includes(selectedShippingOption.value)) {
    product.value.shippingInfo.push(selectedShippingOption.value);
    selectedShippingOption.value = "";
  }
};

const removeShippingInfo = (option) => {
  product.value.shippingInfo = product.value.shippingInfo.filter(o => o !== option);
};

// Initialize data on mount
onMounted(async () => {
  try {
    const [categoriesData, providersData] = await Promise.all([
      fetchCategories(),
      fetchShippingProviders()
    ]);
    categories.value = categoriesData.categories || categoriesData;
    shippingProviders.value = providersData.filter(provider => provider.isActive);
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

const updateAttributeValue = (attributeId, value, selectedOption) => {
  console.log('Updating attribute value:', { attributeId, value, selectedOption });
  if (attributeValues.value[attributeId]) {
    attributeValues.value[attributeId] = {
      ...attributeValues.value[attributeId],
      value: value,
      attributeValueId: selectedOption?.attributeValueId
    };
    console.log('Updated attributeValues:', attributeValues.value);
  }
};

// Watch for category changes
watch(
  () => product.value.categoryId,
  async (newCategoryId) => {
    if (newCategoryId) {
      try {
        const response = await fetchSubCategories(newCategoryId);
        // Handle both array and object response formats
        subCategories.value = Array.isArray(response) 
          ? response 
          : response.subCategories || [];
        
        // Reset subcategory selection when category changes
        product.value.subCategoryId = null;
        // Also reset attributes when category changes
        attributeDefinitions.value = [];
        attributeValues.value = {};
        attributeOptions.value = {};
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        subCategories.value = [];
      }
    } else {
      subCategories.value = [];
      product.value.subCategoryId = null;
    }
  }
);

// Watch for subcategory changes
watch(
  () => product.value.subCategoryId,
  async (newSubCategoryId) => {
    if (newSubCategoryId) {
      try {
        // Fetch attribute definitions
        const definitions = await fetchAttributeDefinitionsBySubCategory(newSubCategoryId);
        attributeDefinitions.value = Array.isArray(definitions) ? definitions : [];
        console.log('Fetched attribute definitions:', attributeDefinitions.value);

        // Clear existing attribute data
        attributeOptions.value = {};
        attributeValues.value = {};

        // Fetch values for each attribute definition
        await Promise.all(attributeDefinitions.value.map(async (attribute) => {
          try {
            const values = await fetchAttributeValuesByDefinitionId(attribute.id);
            console.log(`Fetched values for attribute ${attribute.id}:`, values);
            
            if (Array.isArray(values)) {
              // Map the values to the expected format
              const mappedOptions = values.map(value => ({
                id: value.id,
                label: value.value,
                value: value.value,
                attributeValueId: value.id
              }));
              
              // Update options
              attributeOptions.value[attribute.id] = mappedOptions;
              
              // Initialize the attribute value
              attributeValues.value[attribute.id] = {
                attributeDefinitionId: attribute.id,
                name: attribute.name,
                attributeValueId: null,
                value: ""
              };
            }
          } catch (error) {
            console.error(`Error fetching values for attribute ${attribute.id}:`, error);
          }
        }));
      } catch (error) {
        console.error("Error fetching attribute definitions:", error);
        attributeDefinitions.value = [];
        attributeValues.value = {};
        attributeOptions.value = {};
      }
    } else {
      attributeDefinitions.value = [];
      attributeValues.value = {};
      attributeOptions.value = {};
    }
  }
);

// Watch for attributeValues changes
watch(attributeValues, (newValues) => {
  console.log('Attribute values changed:', newValues);
  product.value.attributes = Object.entries(newValues)
    .filter(([_, attr]) => attr.value !== "" && attr.attributeValueId)
    .map(([id, attr]) => ({
      attributeDefinitionId: Number(id),
      attributeValueId: Number(attr.attributeValueId),
      value: attr.value
    }));
}, { deep: true });
</script>


<style scoped>
.form-container {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #ee5858;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.form-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.form-section:hover {
  box-shadow: 0 4px 15px rgba(238, 88, 88, 0.1);
  border-color: #ee5858;
}

.full-width {
  grid-column: span 4;
}

.section-title {
  color: #ee5858;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ee585833;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: #ee5858;
  box-shadow: 0 0 0 3px rgba(238, 88, 88, 0.1);
  outline: none;
}

.attributes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.shipping-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.chip {
  background: #ee585815;
  border: 1px solid #ee5858;
  color: #ee5858;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.clear-btn {
  background: none;
  border: none;
  color: #ee5858;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
}

.upload-container {
  border: 2px dashed #ee5858;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload-container:hover {
  border-color: #d64545;
  background-color: #fff5f5;
}

.upload-container.has-image {
  border-style: solid;
  background-color: #fff5f5;
}

.file-input {
  display: none;
}

.upload-label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #ee5858;
}

.upload-icon {
  font-size: 2.5rem;
  font-weight: 200;
}

.upload-hint {
  font-size: 0.8rem;
  color: #666;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.image-name {
  font-size: 0.9rem;
  color: #333;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-image {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.remove-image:hover {
  background: #e63946;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #ee5858;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #d64545;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(238, 88, 88, 0.2);
}

.shipping-select {
  padding: 8px;
  width: 100%;
  margin-top: 10px;
}

.provider-card {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff6f1;
}

.provider-logo {
  max-width: 80px;
  margin-bottom: 8px;
}


/* Responsive Design */
@media (max-width: 1200px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .attributes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .full-width {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .attributes-grid {
    grid-template-columns: 1fr;
  }
  
  .full-width {
    grid-column: span 1;
  }
  
  .form-container {
    padding: 1rem;
  }
}
</style>
