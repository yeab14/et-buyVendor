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
            <select v-model="product.category.id" required>
              <option disabled value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Sub Category</label>
            <select v-model="product.subCategory.id" required>
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

        <!-- Attributes Section -->
        <div class="form-section full-width">
          <h3 class="section-title">Product Attributes</h3>
          <div class="attributes-grid">
            <div v-for="attribute in attributeDefinitions" :key="attribute.id" class="attribute-group">
              <label class="form-label">{{ attribute.name }}</label>
              <DynamicInput
                :inputType="attribute.inputType"
                v-model="attributeValues[attribute.id]"
                :options="attributeOptions[attribute.id] || []"
              />
            </div>
          </div>
        </div>

        <!-- Shipping Section -->
        <div class="form-section full-width">
          <h3 class="section-title">Shipping Information</h3>
          <div class="shipping-container">
            <div class="chips-container">
              <div class="chip" v-for="option in product.shippingInfo" :key="option" @click="removeShippingInfo(option)">
                <span>{{ option }}</span>
                <button type="button" class="clear-btn">×</button>
              </div>
            </div>
            <select v-model="selectedShippingOption" @change="addShippingInfo" class="shipping-select">
              <option disabled value="">Select Shipping Info</option>
              <option v-for="option in shippingOptions" :key="option.id" :value="option.name">{{ option.name }}</option>
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
          <div class="upload-container">
            <input type="file" @change="handleFileUpload" id="file-upload" class="file-input" />
            <label for="file-upload" class="upload-label">
              <span class="upload-icon">+</span>
              <span>Choose Image</span>
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
import { ref, onMounted, watch } from "vue";
import * as Yup from "yup";
import fetchCategories from "@/api/categories";
import fetchSubCategories from "@/api/subcategories"; 
import fetchAttributeDefinitionsBySubCategory from "@/api/attributeDefinition";
import fetchAttributeValuesByDefinitionId from "@/api/attributeValue";
import DynamicInput from '@/pages/ProductManagement/DynamicInput.vue'


const product = ref({
  name: "",
  category: { id: null },
  subCategory: { id: null },
  rating: null,
  description: "",
  originalPrice: null,
  currentPrice: null,
  discountPrice: null,
  discountPercent: null,
  tag: "",
  sku: "",
  brand: "",
  availability: true,
  attributes: [],
  shippingInfo: [],
  additionalInformation: "",
});

const categories = ref([]);
const subCategories = ref([]);
const attributeDefinitions = ref([]);
const attributeValues = ref({});
const attributeOptions = ref({})


const selectedShippingOption = ref("");


const fetchAllCategories = async () => {
  try {
    const data = await fetchCategories();
    categories.value = data.categories || data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};


watch(
  () => product.value.category.id,
  async (newCategoryId) => {
    if (newCategoryId) {
      try {
        const subCategoryData = await fetchSubCategories(newCategoryId);
        subCategories.value = Array.isArray(subCategoryData) ? subCategoryData : subCategoryData.subCategories || [];
        product.value.subCategory.id = null;
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      subCategories.value = [];
      product.value.subCategory.id = null;
    }
  }
);

watch(
  () => product.value.subCategory.id,
  async (newSubCategoryId) => {
    if (newSubCategoryId) {
      try {
        const attributesData = await fetchAttributeDefinitionsBySubCategory(newSubCategoryId);
        attributeDefinitions.value = attributesData;

        // Clear existing options
        attributeOptions.value = {};
        attributeValues.value = {};

        for (const attribute of attributesData) {
          const values = await fetchAttributeValuesByDefinitionId(attribute.id);
          console.log(`Attribute ${attribute.id} values:`, values);
          
          const mappedOptions = values.map(value => ({
            id: value.id,
            label: value.value,
            value: value.value,
          }));
          
          attributeOptions.value = Object.assign({}, attributeOptions.value, {
            [attribute.id]: mappedOptions
          });
          
          // Initialize with empty string for SELECT, null for NUMBER
          const initialValue = attribute.inputType === 'NUMBER' ? null : '';
          attributeValues.value = Object.assign({}, attributeValues.value, {
            [attribute.id]: initialValue
          });
        }

        // Update product attributes
        product.value.attributes = Object.keys(attributeValues.value).map(attrId => ({
          attributeDefinitionId: parseInt(attrId),
          value: attributeValues.value[attrId]
        }));

      } catch (error) {
        console.error("Error fetching attribute definitions:", error);
      }
    } else {
      attributeDefinitions.value = [];
      attributeValues.value = {};
      attributeOptions.value = {};
    }
  }
);

// Add a watch for attributeValues changes
watch(attributeValues, (newValues) => {
  console.log('Attribute values changed:', newValues);
  // Update product attributes whenever values change
  product.value.attributes = Object.keys(newValues).map(attrId => ({
    attributeDefinitionId: parseInt(attrId),
    value: newValues[attrId]
  }));
}, { deep: true });

onMounted(() => {
  fetchAllCategories();
});

const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required."),
  category: Yup.object().shape({
    id: Yup.number().required("Category is required."),
  }),
  subCategory: Yup.object().shape({
    id: Yup.number().required("SubCategory is required."),
  }),
  rating: Yup.number()
    .min(0, "Rating must be at least 0.")
    .max(5, "Rating must be at most 5.")
    .required("Rating is required."),
  sku: Yup.string().required("SKU is required."),
  originalPrice: Yup.number()
    .positive("Original Price must be a positive number.")
    .required("Original Price is required."),
  currentPrice: Yup.number()
    .positive("Current Price must be a positive number.")
    .max(Yup.ref("originalPrice"), "Current Price cannot be more than Original Price.")
    .required("Current Price is required."),
  description: Yup.string().required("Description is required."),
});

const submitForm = async () => {
  try {
    await validationSchema.validate(product.value, { abortEarly: false });
    product.value.attributes = Object.keys(attributeValues.value).map(attrId => ({
  attributeDefinitionId: parseInt(attrId),
  value: attributeValues.value[attrId],
}));

    console.log("Form submitted successfully with product data:", product.value);
  } catch (err) {
    const errors = {};
    err.inner.forEach((e) => {
      errors[e.path] = e.message;
    });
    console.error("Validation errors:", errors);
  }
};


const addAttributeValue = (attributeId, value) => {
  if (value) {
    attributeValues.value[attributeId] = value;
  }
};

const removeAttributeValue = (attributeId) => {
  delete attributeValues.value[attributeId];
};

const addShippingInfo = () => {
  if (selectedShippingOption.value && !product.value.shippingInfo.includes(selectedShippingOption.value)) {
    product.value.shippingInfo.push(selectedShippingOption.value);
    selectedShippingOption.value = "";
  }
};

const removeShippingInfo = (option) => {
  product.value.shippingInfo = product.value.shippingInfo.filter((o) => o !== option);
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    product.value.image = file; 
  }
};
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
  font-size: 2rem;
  font-weight: 200;
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
