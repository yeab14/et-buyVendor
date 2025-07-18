<template>
  <div class="max-w-[1400px] mx-auto my-8 p-8 bg-white rounded-2xl shadow-lg">
    <h1
    class="font-public-sans text-4xl font-extrabold text-etbuy-red-dark text-center mb-8"
  >
    <span class="block text-etbuy-red-light mb-2 text-lg uppercase tracking-widest font-semibold">
      Ready to Sell?
    </span>
    <span>You Can Create Your Product Here</span>
  </h1>
  
    <form @submit.prevent="submitForm" class="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

      <!-- Category and SubCategory Section -->
      <section
      class="bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
    <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
    Category Details
  </h3>
  
      <div class="mb-6">
        <label class="block mb-2 font-medium text-etbuy-black/90">Category</label>
        <select
          v-model="product.categoryId"
          required
          class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                 transition-colors duration-300 shadow-etbuy-button"
        >
          <option disabled value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    
      <div>
        <label class="block mb-2 font-medium text-etbuy-black/90">Sub Category</label>
        <select
          v-model="product.subCategoryId"
          required
          class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                 transition-colors duration-300 shadow-etbuy-button"
        >
          <option disabled value="">Select Sub Category</option>
          <option
            v-for="subCategory in subCategories"
            :key="subCategory.id"
            :value="subCategory.id"
          >
            {{ subCategory.name }}
          </option>
        </select>
      </div>
    </section>
    
    
    

      <!-- Basic Info Section -->
      <section
      class="bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
    <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
   Basic Information
  </h3>
      <div class="space-y-6">
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Product Name</label>
          <input
            type="text"
            v-model="product.name"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Brand</label>
          <input
            type="text"
            v-model="product.brand"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">SKU</label>
          <input
            type="text"
            v-model="product.sku"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
      </div>
    </section>
    

      <!-- Pricing Section -->
      <section
      class="bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
    <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
 Pricing Details
  </h3>
    
      <div class="space-y-6">
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Original Price</label>
          <input
            type="number"
            v-model.number="product.originalPrice"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Current Price</label>
          <input
            type="number"
            v-model.number="product.currentPrice"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Discount Price</label>
          <input
            type="number"
            v-model.number="product.discountPrice"
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Discount Percent</label>
          <input
            type="number"
            v-model.number="product.discountPercent"
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
      </div>
    </section>
    

      <!-- Additional Details Section -->
      <section
      class="bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
    <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
   Additional Details
  </h3>
      <div class="space-y-6">
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            v-model.number="product.rating"
            required
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Tag</label>
          <input
            type="text"
            v-model="product.tag"
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
    
        <div>
          <label class="block mb-2 font-medium text-etbuy-black/90">Availability</label>
          <select
            v-model="product.availability"
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          >
            <option :value="true">Available</option>
            <option :value="false">Out of Stock</option>
          </select>
        </div>
      </div>
    </section>
    

      <!-- Description Section -->
      <section
      class="col-span-full bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
    <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
   product Description
  </h3>
    
      <textarea
        v-model="product.description"
        rows="4"
        placeholder="Enter product description"
        class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white resize-none
               focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
               transition-colors duration-300 shadow-etbuy-button"
      ></textarea>
    </section>
    
      <!-- Attributes Section -->
      <section
      class="col-span-full bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
      <h3
        class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
      >
        Product Variants
      </h3>
    
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="attribute in attributeDefinitions"
          :key="attribute.id"
          class="flex flex-col"
        >
          <label class="mb-2 font-medium text-etbuy-black/90">
            {{ attribute.name }}
          </label>
          <DynamicInput
            inputType="MULTISELECT"
            :options="attributeOptions[attribute.id] || []"
            :value="selectedAttributes[attribute.id] || []"
            @update:modelValue="values => updateSelectedAttribute(attribute.id, values)"
            class="w-full px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-creamywhite
                   focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                   transition-colors duration-300 shadow-etbuy-button"
          />
        </div>
      </div>
    
      <!-- Variants Table -->
      <table class="mt-8 w-full table-auto border border-etbuy-red-dark rounded-lg overflow-hidden shadow-md">
        <thead class="bg-etbuy-red-dark text-etbuy-white">
          <tr>
            <th
              v-for="attr in activeAttributeDefinitions"
              :key="attr.id"
              class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm tracking-wide"
            >
              {{ attr.name }}
            </th>
            <th class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm">SKU</th>
            <th class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm">Price</th>
            <th class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm">Stock</th>
            <th class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm">Image</th>
            <th class="p-3 text-left border border-etbuy-red-darken font-semibold text-sm text-center">Remove</th>
          </tr>
        </thead>
        <tbody class="bg-etbuy-creamywhite text-etbuy-black">
          <tr
            v-for="(variant, index) in variantCombinations"
            :key="index"
            class="hover:bg-light-salmon transition duration-150"
          >
            <!-- Attribute Values Columns -->
            <td
              v-for="attr in activeAttributeDefinitions"
              :key="attr.id"
              class="p-2 border border-etbuy-red-light text-sm"
            >
              {{ getVariantValue(variant, attr.id) }}
            </td>
    
            <!-- SKU -->
            <td class="p-2 border border-etbuy-red-light">
              <input
                type="text"
                v-model="variantData[index].sku"
                placeholder="SKU"
                class="w-full px-2 py-1 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                       focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                       transition-colors duration-300 shadow-etbuy-button text-sm"
              />
            </td>
    
            <!-- Price -->
            <td class="p-2 border border-etbuy-red-light">
              <input
                type="number"
                v-model.number="variantData[index].price"
                placeholder="Price"
                class="w-full px-2 py-1 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
                       focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
                       transition-colors duration-300 shadow-etbuy-button text-sm"
                min="0"
                step="0.01"
              />
            </td>
    
            
           <!-- Stock -->
<td class="p-2 border border-etbuy-red-light text-sm text-center">
  <select
    v-model.number="variantData[index].stock"
    class="w-full px-3 py-1.5 rounded-full text-sm text-center font-medium
           focus:outline-none focus:ring-2 appearance-none border
           transition-colors duration-200"
    :class="variantData[index].stock === 1 
      ? 'bg-white text-etbuy-whatsapp border-etbuy-whatsapp focus:ring-etbuy-whatsapp' 
      : 'bg-white text-etbuy-red-dark border-etbuy-red-dark focus:ring-etbuy-red-dark'"
  >
    <option :value="1" class="text-etbuy-whatsapp">Available</option>
    <option :value="0" class="text-etbuy-red-dark">Out of Stock</option>
  </select>
</td>

    
            <!-- Image Upload -->
            <td class="p-2 border border-etbuy-red-light">
           <div
  class="border-2 rounded-lg px-4 py-3 text-center cursor-pointer transition duration-200"
  :class="variantData[index].image
    ? 'border-solid bg-soft-peach border-etbuy-red-light'
    : 'border-dashed border-etbuy-red-light'"
>
  <!-- hidden input with an unique id -->
  <input
    type="file"
    :id="'variant-file-upload-' + index"
    accept="image/*"
    class="hidden"
    @change="e => handleVariantImageUpload(e, index)"
  />

  <!-- label linked by 'for' attribute triggers file dialog on click -->
  <label
    :for="'variant-file-upload-' + index"
    class="flex flex-col items-center gap-2 cursor-pointer"
  >
    <template v-if="!variantData[index].image">
      <span class="text-xl font-bold text-etbuy-red-dark">+</span>
      <span class="text-xs text-etbuy-red-dark">Upload</span>
    </template>
    <template v-else>
      <img
        :src="getImagePreviewUrl(variantData[index].image)"
        alt="Variant Image Preview"
        class="max-w-[80px] max-h-[80px] rounded-md shadow"
      />
      <button
        type="button"
        class="mt-1 bg-etbuy-red-dark text-white rounded px-2 py-1 text-xs hover:bg-custom-etbuy-red-dark transition"
        @click.stop="removeVariantImage(index)"
      >
        Remove
      </button>
    </template>
  </label>
</div>



            </td>
            
    
            <!-- Remove row -->
            <td class="p-2 border border-etbuy-red-light text-center">
              <button
                @click.prevent="removeVariantRow(index)"
                aria-label="Remove variant row"
                class="text-etbuy-red-dark hover:text-etbuy-red-darken transition-transform duration-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark
                       hover:scale-110 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    
    

    <section
    class="col-span-full bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
  >
  <h3
  class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
>
Shipping Information
</h3>
    <div class="flex flex-col gap-4">
      <!-- Selected Shipping Chips -->
      <div class="flex flex-wrap gap-2 mb-4">
        <div
          v-for="option in product.shippingInfo"
          :key="option"
          class="flex items-center gap-2 px-4 py-1 rounded-full border border-etbuy-red-light bg-etbuy-red-light/10 text-etbuy-red-dark cursor-pointer select-none"
          @click="removeShippingInfo(option)"
        >
          <span>{{ option }}</span>
          <button
            type="button"
            class="text-etbuy-red-dark hover:text-etbuy-red-darken focus:outline-none"
            aria-label="Remove shipping option"
          >
            ×
          </button>
        </div>
      </div>
  
      <!-- Shipping Provider Dropdown -->
      <select
        v-model="selectedShippingOption"
        @change="addShippingInfo"
        class="px-4 py-3 border border-etbuy-red-light rounded-md text-etbuy-black bg-etbuy-white
               focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
               transition-colors duration-300 shadow-etbuy-button"
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
      <div v-if="providerDetails" class="mt-4">
        <div class="bg-soft-peach border border-etbuy-red-light rounded-lg p-4 shadow-etbuy-button">
          <img
            :src="'/assets/logos/' + providerDetails.logo"
            :alt="providerDetails.name"
            class="max-w-[80px] mb-3"
          />
          <p class="font-semibold text-etbuy-black">{{ providerDetails.name }}</p>
          <p class="text-sm text-etbuy-black/80">{{ providerDetails.description }}</p>
          <p class="text-sm mt-2 text-etbuy-black/90">Base Cost: ${{ providerDetails.baseCost }}</p>
          <p class="text-sm text-etbuy-black/90">
            Delivery: {{ providerDetails.minDeliveryDays }}-{{ providerDetails.maxDeliveryDays }} days
          </p>
        </div>
      </div>
    </div>
  </section>
  

      <!-- Additional Info Section -->
      <section
      class="col-span-full bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
    >
      <h3
        class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
      >
        Additional Information
      </h3>
    
      <textarea
        v-model="product.additionalInformation"
        rows="4"
        placeholder="Enter additional information"
        class="w-full px-4 py-3 bg-etbuy-creamywhite rounded-lg text-etbuy-black resize-none
               focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark focus:border-etbuy-red-dark
               transition-colors duration-300 shadow-etbuy-button border-none"
      ></textarea>
    </section>
    


      <!-- Image Upload Section -->
 <section
  class="col-span-full bg-etbuy-white border border-etbuy-red-light rounded-xl p-6 hover:shadow-etbuy-light-hover transition-shadow duration-300"
>
  <h3
    class="font-public-sans text-lg font-semibold text-etbuy-red-darken uppercase mb-6 pb-2 border-b-2 border-etbuy-red tracking-wide"
  >
    Product Image
  </h3>

  <div
    class="border-2 rounded-xl p-8 text-center cursor-pointer transition-colors duration-300"
    :class="product.image ? 'border-solid bg-soft-peach border-etbuy-red-light' : 'border-dashed border-etbuy-red-light'"
  >
    <!-- Hidden file input with unique id -->
    <input
      type="file"
      id="product-file-upload"
      accept="image/*"
      class="hidden"
      @change="handleFileUpload"
    />

    <!-- Label linked to input by 'for' toggles file selector on click -->
    <label
      for="product-file-upload"
      class="flex flex-col items-center gap-4 text-etbuy-red-dark cursor-pointer select-none"
    >
      <template v-if="!product.image">
        <span class="text-4xl font-thin">+</span>
        <span class="font-medium">Choose Image</span>
        <span class="text-xs text-gray-500">Max size: 5MB</span>
      </template>
      <template v-else>
        <img
        :src="getImagePreviewUrl(product.image)"
        alt="Product Image Preview"
        class="max-w-[200px] max-h-[200px] rounded-lg shadow-etbuy-light mx-auto"
      />
        <span class="block truncate mt-2 text-etbuy-black font-medium">{{ product.image.name }}</span>
        <button
          type="button"
          class="mt-4 bg-etbuy-red-dark text-white rounded-md px-4 py-2 text-sm hover:bg-custom-etbuy-red-dark transition"
          @click.stop="removeImage"
        >
          Remove Image
        </button>
      </template>
    </label>
  </div>
</section>

    

      <!-- Submit Button -->
      <section class="col-span-full">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-4 bg-etbuy-red-dark text-white font-semibold rounded-lg shadow-etbuy-button
                 hover:bg-etbuy-red-darken hover:shadow-etbuy-light-hover
                 transform hover:-translate-y-0.5 transition duration-300 ease-in-out flex justify-center items-center gap-3"
        >
          <template v-if="isSubmitting">
            <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Creating...
          </template>
          <template v-else>
            Create Product
          </template>
        </button>
      </section>
      

    </form>
  </div>
</template>
<script>
import * as Yup from "yup";
import fetchCategories from "@/api/categories";
import fetchSubCategories from "@/api/subcategories"; 
import fetchAttributeDefinitionsBySubCategory from "@/api/attributeDefinition";
import fetchAttributeValuesByDefinitionId from "@/api/attributeValue";
import fetchShippingProviders from '@/api/shippingProviders';
import { createProduct } from "@/api/product";
import DynamicInput from '@/pages/ProductManagement/DynamicInput.vue';

export default {
  name: 'ProductForm',
  
  components: {
    DynamicInput
  },

  data() {
    return {
      product: {
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
      },
      categories: [],
      subCategories: [],
      attributeDefinitions: [],
      selectedAttributes: {},
      variantData: [], 
      attributeValues: {},
      attributeOptions: {},
      shippingProviders: [],
      selectedShippingOption: "",
      isSubmitting: false,
    };
  },

  computed: {
    activeAttributeDefinitions() {
      return this.attributeDefinitions;
    },
    variantCombinations() {
      const keys = Object.keys(this.selectedAttributes);
      if (keys.length === 0) return [];

      const filteredKeys = keys.filter(k => Array.isArray(this.selectedAttributes[k]) && this.selectedAttributes[k].length > 0);
      if (filteredKeys.length === 0) return [];

      const valuesArray = filteredKeys.map(k => this.selectedAttributes[k].map(v => ({ attributeId: k, value: v })));

      return this.cartesianProduct(valuesArray);
    }
  },

  imagePreviewUrl() {
    if (!this.product.image) return null;
    
    if (typeof this.product.image === 'string') {
      return this.product.image;
    }
    return URL.createObjectURL(this.product.image);
  },

  

  watch: {
    'product.currentPrice'(newPrice) {
      if (newPrice == null) return;
      this.variantData.forEach((variant, index) => {
        if (variant.price == null || variant.price === 0) {
          this.$set(this.variantData[index], 'price', newPrice);
        }
      });
    },
    variantCombinations: {
      immediate: true,
      handler(newCombinations) {
        this.syncVariantData(newCombinations);
        this.initializeVariantPrices();
      }
    },
    'product.categoryId': {
      async handler(newCategoryId) {
        if (newCategoryId) {
          try {
            const response = await fetchSubCategories(newCategoryId);
            this.subCategories = Array.isArray(response) 
              ? response 
              : response.subCategories || [];
            this.product.subCategoryId = null;
            this.attributeDefinitions = [];
            this.attributeValues = {};
            this.attributeOptions = {};
            this.selectedAttributes = {};
            this.variantData = [];
          } catch (error) {
            console.error("Error fetching subcategories:", error);
            this.subCategories = [];
          }
        } else {
          this.subCategories = [];
          this.product.subCategoryId = null;
          this.attributeDefinitions = [];
          this.attributeValues = {};
          this.attributeOptions = {};
          this.selectedAttributes = {};
          this.variantData = [];
        }
      }
    },
    'product.subCategoryId': {
      async handler(newSubCategoryId) {
        if (newSubCategoryId) {
          try {
            const definitions = await fetchAttributeDefinitionsBySubCategory(newSubCategoryId);
            this.attributeDefinitions = Array.isArray(definitions) ? definitions : [];
            
            this.attributeOptions = {};
            this.attributeValues = {};
            this.selectedAttributes = {};
            this.variantData = [];

            await Promise.all(this.attributeDefinitions.map(async (attribute) => {
              try {
                const values = await fetchAttributeValuesByDefinitionId(attribute.id);
                
                if (Array.isArray(values)) {
                  const mappedOptions = values.map(value => ({
                    id: value.id,
                    label: value.value,
                    value: value.value,
                    attributeValueId: value.id
                  }));
                  
                  this.$set(this.attributeOptions, attribute.id, mappedOptions);
                  this.$set(this.attributeValues, attribute.id, {
                    attributeDefinitionId: attribute.id,
                    name: attribute.name,
                    attributeValueId: null,
                    value: ""
                  });
                }
              } catch (error) {
                console.error(`Error fetching values for attribute ${attribute.id}:`, error);
              }
            }));
          } catch (error) {
            console.error("Error fetching attribute definitions:", error);
            this.attributeDefinitions = [];
            this.attributeValues = {};
            this.attributeOptions = {};
            this.selectedAttributes = {};
            this.variantData = [];
          }
        } else {
          this.attributeDefinitions = [];
          this.attributeValues = {};
          this.attributeOptions = {};
          this.selectedAttributes = {};
          this.variantData = [];
        }
      }
    },
    attributeValues: {
      handler(newValues) {
        this.product.attributes = Object.entries(newValues)
          .filter(([_, attr]) => attr.value !== "" && attr.attributeValueId)
          .map(([id, attr]) => ({
            attributeDefinitionId: Number(id),
            attributeValueId: Number(attr.attributeValueId),
            value: attr.value
          }));
      },
      deep: true
    }
  },

  async mounted() {
    try {
      const [categoriesData, providersData] = await Promise.all([
        fetchCategories(),
        fetchShippingProviders()
      ]);
      this.categories = categoriesData.categories || categoriesData;
      this.shippingProviders = providersData.filter(provider => provider.isActive);
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  },

  methods: {
    updateSelectedAttribute(attributeId, values) {
      this.$set(this.selectedAttributes, attributeId, values);
    },

    cartesianProduct(arrays) {
      return arrays.reduce((acc, curr) => {
        return acc.flatMap(a => curr.map(b => [...a, b]));
      }, [[]]);
    },

    syncVariantData(combinations) {
      while (this.variantData.length < combinations.length) {
        this.variantData.push({ sku: '', price: this.product.currentPrice || 0, stock: 1, image: null });
      }
      while (this.variantData.length > combinations.length) {
        this.variantData.pop();
      }
    },

    getVariantValue(variant, attrId) {
      const item = variant.find(v => String(v.attributeId) === String(attrId));
      return item ? item.value : '-';
    },

    initializeVariantPrices() {
      if (this.product.currentPrice == null) return;
      this.variantData.forEach((variant, index) => {
        if (variant.price == null || variant.price === 0) {
          this.$set(this.variantData[index], 'price', this.product.currentPrice);
        }
      });
    },

    removeVariantRow(index) {
      const variantToRemove = this.variantCombinations[index];
      Object.entries(this.selectedAttributes).forEach(([attrId, values]) => {
        if (!Array.isArray(values)) return;

        const variantAttr = variantToRemove.find(v => String(v.attributeId) === String(attrId));
        if (!variantAttr) return;

        this.$set(
          this.selectedAttributes,
          attrId,
          values.filter(val => val !== variantAttr.value)
        );
      });
    },


  triggerFileInput(index) {
    const fileInputs = this.$refs.fileInputs;
    if (fileInputs && fileInputs[index]) {
      fileInputs[index].click();
    } else {
      console.warn(`No file input found at index ${index}`);
    }
  },


  handleVariantImageUpload(event, index) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.$bvToast.toast('Please select a valid image file', {
        title: 'Invalid File',
        variant: 'warning',
        solid: true,
      });
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.$bvToast.toast('Image size should not exceed 5MB', {
        title: 'File Too Large',
        variant: 'warning',
        solid: true,
      });
      event.target.value = '';
      return;
    }

    this.$set(this.variantData[index], 'image', file);
  },
 
  getImagePreviewUrl(image) {
    if (!image) return null;
    if (typeof image === 'string') return image;  
    return URL.createObjectURL(image);           
  },
 
  removeVariantImage(index) {
    this.$set(this.variantData[index], 'image', null);
  },

    handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    this.$bvToast.toast('Please select a valid image file', {
      title: 'Invalid File',
      variant: 'warning',
      solid: true,
    });
    event.target.value = ''; 
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    this.$bvToast.toast('Image size should not exceed 5MB', {
      title: 'File Too Large',
      variant: 'warning',
      solid: true,
    });
    event.target.value = '';
    return;
  }

  this.product.image = file;
},

    removeImage() {
      this.product.image = null;
      const fileInput = document.getElementById('file-upload');
      if (fileInput) {
        fileInput.value = '';
      }
    },

   

    removeVariantImage(index) {
      this.$set(this.variantData[index], 'image', null);
    },

    async submitForm() {
      try {
        this.isSubmitting = true;
        if (!this.product.name || !this.product.categoryId || !this.product.subCategoryId) {
          this.$bvToast.toast('Please fill in all required fields', {
            title: 'Validation Error',
            variant: 'danger',
            solid: true
          });
          throw new Error('Missing required fields');
        }

        if (!this.product.image) {
          this.$bvToast.toast('Please select an image', {
            title: 'Validation Error',
            variant: 'danger',
            solid: true
          });
          throw new Error('Missing main product image');
        }

     
        const productPayload = {
          name: this.product.name,
          description: this.product.description,
          originalPrice: Number(this.product.originalPrice),
          currentPrice: Number(this.product.currentPrice),
          categoryId: Number(this.product.categoryId),
          subCategoryId: Number(this.product.subCategoryId),
          rating: Number(this.product.rating),
          tag: this.product.tag,
          sku: this.product.sku,
          brand: this.product.brand,
          availability: this.product.availability,
          discountPrice: Number(this.product.discountPrice) || null,
          discountPercent: Number(this.product.discountPercent) || null,
          additionalInformation: this.product.additionalInformation,
          attributes: Object.values(this.attributeValues)
            .filter(attr => attr.value !== "" && attr.attributeValueId)
            .map(attr => ({
              attributeDefinitionId: Number(attr.attributeDefinitionId),
              attributeValueId: Number(attr.attributeValueId),
              value: attr.value
            })),
          shippingInfo: this.product.shippingInfo.map(info => ({
            shippingMethod: info,
            shippingProviderId: Number(this.shippingProviders.find(p => p.name === info)?.id || 1),
            weight: 0.5,
            shippingTime: "5-7 business days"
          }))
        
        };

     
        const variantsPayload = this.variantCombinations.map((variantAttrs, index) => {
          const attributes = variantAttrs.map(({ attributeId, value }) => {
            const attributeDefinitionId = Number(attributeId);
            const optionList = this.attributeOptions[attributeDefinitionId] || [];
            const attributeValueObj = optionList.find(opt => opt.label === value);
            return {
              attributeDefinitionId,
              attributeValueId: attributeValueObj ? attributeValueObj.id : null,
              attributeValue: value
            };
          }).filter(attr => attr.attributeValueId !== null);

          return {
            sku: this.variantData[index].sku,
            price: this.variantData[index].price,
            stock: this.variantData[index].stock,
            image: undefined, // handled separately in FormData
            attributes
          };
        });

        productPayload.variants = variantsPayload;

        // Prepare FormData for multipart upload
        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(productPayload)], { type: 'application/json' }));

        // Append main product image file
        if (this.product.image instanceof File) {
          formData.append('image', this.product.image);
        }

        // Append each variant image file with unique keys recognized by backend
        this.variantData.forEach((variant, idx) => {
          if (variant.image instanceof File) {
            formData.append(`variantImage${idx}`, variant.image);
          }
        });

        // Send to backend
        const createdProduct = await createProduct(formData);

        this.$bvToast.toast(
          '🎉 Success! Your product is now live on EtBuy. 🚀 Keep going — your journey to more sales and greater reach starts here! 💼',
          {
            title: '✅ Product Added Successfully!',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
            toaster: 'b-toaster-top-right',
          }
        );

        this.resetForm();
        return createdProduct;

      } catch (err) {
        console.error("Error submitting form:", err);
        this.$bvToast.toast(
          'Error creating product: ' + (err.message || 'Please try again.'),
          {
            title: 'Error',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
            toaster: 'b-toaster-top-right',
          }
        );
        throw err;
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.product = {
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
      this.attributeValues = {};
      this.attributeOptions = {};
      this.selectedAttributes = {};
      this.variantData = [];
    }
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
