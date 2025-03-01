<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <!-- Category and SubCategory -->
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

 
      <!-- Product Details -->
      <div class="form-group">
        <label>Product Name</label>
        <input type="text" v-model="product.name" required />
      </div>

           <!-- Rating -->
           <div class="form-group">
            <label>Rating</label>
            <input type="number" v-model.number="product.rating" min="0" max="5" step="0.1" required />
          </div>
    

      <div class="form-group">
        <label>SKU</label>
        <input type="text" v-model="product.sku" required />
      </div>

      <div class="form-group">
        <label>Brand</label>
        <input type="text" v-model="product.brand" required />
      </div>

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

      <div class="form-group">
        <label>Tag</label>
        <input type="text" v-model="product.tag" />
      </div>

      <!-- Attributes -->
      <div class="form-group">
        <label>Attributes</label>
        <div class="multi-select">
          <div class="chip" v-for="attr in product.attributes" :key="attr" @click="removeAttribute(attr)">
            <span>{{ attr }}</span>
            <button type="button" class="clear-btn">×</button>
          </div>
          <select v-model="selectedAttribute" @change="addAttribute" class="attribute-select">
            <option disabled value="">Select Attribute</option>
            <option v-for="attr in attributes" :key="attr.id" :value="attr.name">{{ attr.name }}</option>
          </select>
        </div>
      </div>

      <!-- Shipping Info -->
      <div class="form-group">
        <label>Shipping Info</label>
        <div class="multi-select">
          <div class="chip" v-for="option in product.shippingInfo" :key="option" @click="removeShippingInfo(option)">
            <span>{{ option }}</span>
            <button type="button" class="clear-btn">×</button>
          </div>
          <select v-model="selectedShippingOption" @change="addShippingInfo" class="shipping-info-select">
            <option disabled value="">Select Shipping Info</option>
            <option v-for="option in shippingOptions" :key="option.id" :value="option.name">{{ option.name }}</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Availability</label>
        <select v-model="product.availability">
          <option :value="true">Available</option>
          <option :value="false">Out of Stock</option>
        </select>
      </div>

      <div class="form-group full-width">
        <label>Description</label>
        <textarea v-model="product.description"></textarea>
      </div>

      <div class="form-group full-width">
        <label>Additional Information</label>
        <textarea v-model="product.additionalInformation"></textarea>
      </div>

      <div class="form-group full-width">
        <label>Upload Image</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as Yup from "yup";

// Product form data
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

// Error messages object
const errors = ref({
  name: "",
  category: "",
  subCategory: "",
  rating: "",
  sku: "",
  originalPrice: "",
  currentPrice: "",
  description: "",
});

// Example data for categories, subcategories, and shipping options
const categories = ref([
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
]);

const subCategories = ref([
  { id: 1, name: "Phones" },
  { id: 2, name: "Laptops" },
]);

const attributes = ref([
  { id: 1, name: "Color" },
  { id: 2, name: "Size" },
]);

const shippingOptions = ref([
  { id: 1, name: "Express" },
  { id: 2, name: "Standard" },
]);

// Validation schema with Yup
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
    console.log("Form submitted successfully with product data:", product.value);
  } catch (err) {
    errors.value = {};
    err.inner.forEach((e) => {
      errors.value[e.path] = e.message;
    });
  }
};

</script>

<style scoped>
.form-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}



.error-text {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-width {
  grid-column: span 3;
}

label {
  font-weight: bold;
  font-size: 16px;
}

input,
select,
textarea {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #ee5858;
  outline: none;
}

button[type="button"].clear-btn {
  background: transparent;
  border: none;
  color: #ee5858;
  font-size: 18px;
  cursor: pointer;
}

button[type="button"].clear-btn:hover {
  color: #d94444;
}

.submit-btn {
  grid-column: span 3;
  background: #ee5858;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #d94444;
}

.brand-selector,
.multi-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-chip,
.chip {
  background: #f2f2f2;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-chip span,
.chip span {
  font-size: 14px;
}

select.brand-select,
select.attribute-select,
select.shipping-info-select {
  flex-grow: 1;
  border-radius: 8px;
}

.clear-btn {
  background: none;
  border: none;
  color: #ee5858;
  font-size: 14px;
  cursor: pointer;
}
</style>
