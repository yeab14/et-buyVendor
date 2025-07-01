  <template>
    <div class="min-h-screen bg-etbuy-creamywhite text-etbuy-black font-public-sans px-content-px py-content-py flex justify-center">
      <section class="w-full max-w-5xl bg-etbuy-white rounded-2xl shadow-etbuy-light p-10 space-y-10">
        <!-- Header -->
        <header class="text-center space-y-2">
          <h2 class="text-3xl font-semibold text-etbuy-red-dark">Vendor Profile Settings</h2>
          <p class="text-gray-700 max-w-xl mx-auto leading-relaxed">
            Manage your vendor information, contact, and branding visuals.
          </p>
        </header>

        <!-- Loading State -->
  <div
  v-if="loading"
  class="flex items-center justify-center gap-4 bg-etbuy-white-transparent border border-etbuy-red-light rounded-xl py-4 px-6 shadow-md animate-pulse"
  >
  <i class="fas fa-spinner fa-spin text-etbuy-red-dark text-xl"></i>
  <span class="text-etbuy-red-dark font-semibold text-base">Loading vendor data...</span>
  </div>

  <!-- Error State -->
  <div
  v-if="errorMessage"
  class="flex items-start gap-4 bg-etbuy-red-light/20 border border-etbuy-red-dark rounded-xl py-4 px-6 shadow-etbuy-light text-etbuy-red-dark"
  >
  <i class="fas fa-exclamation-circle text-xl text-etbuy-red-dark mt-1"></i>
  <div>
    <p class="font-bold text-etbuy-red-dark mb-1">Something went wrong</p>
    <p class="text-sm leading-relaxed text-etbuy-red-darken">
      {{ errorMessage }}
    </p>
  </div>
  </div>


        <form @submit.prevent="submitVendorInfo" class="space-y-12">

          <!-- Business Info -->
          <section class="space-y-6">
            <h3 class="text-xl font-semibold text-etbuy-red-dark border-b border-etbuy-red-light pb-2">
              Business Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col">
                <label for="businessName" class="mb-2 font-medium text-etbuy-red-dark">Business Name</label>
                <input v-model="vendor.businessName" type="text" id="businessName" class="input-style" placeholder="Enter business name" />
              </div>
              <div class="flex flex-col">
                <label for="location" class="mb-2 font-medium text-etbuy-red-dark">Location</label>
                <input v-model="vendor.location" type="text" id="location" class="input-style" placeholder="Addis Ababa, Ethiopia" />
              </div>
            </div>
          </section>

          <!-- Contact Info -->
          <section class="space-y-6">
            <h3 class="text-xl font-semibold text-etbuy-red-dark border-b border-etbuy-red-light pb-2">
              Contact Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col">
                <label for="firstName" class="mb-2 font-medium text-etbuy-red-dark">First Name</label>
                <input v-model="vendor.firstName" type="text" id="firstName" class="input-style" placeholder="John" />
              </div>
              <div class="flex flex-col">
                <label for="lastName" class="mb-2 font-medium text-etbuy-red-dark">Last Name</label>
                <input v-model="vendor.lastName" type="text" id="lastName" class="input-style" placeholder="Doe" />
              </div>
              <div class="flex flex-col">
                <label for="email" class="mb-2 font-medium text-etbuy-red-dark">Email</label>
                <input v-model="vendor.email" type="email" id="email" class="input-style" placeholder="john@example.com" />
              </div>
              <div class="flex flex-col">
                <label for="phone" class="mb-2 font-medium text-etbuy-red-dark">Phone Number</label>
                <input v-model="vendor.phoneNumber" type="tel" id="phone" class="input-style" placeholder="09xxxxxxx" />
              </div>
            </div>
          </section>

          <!-- Visual Branding -->
          <section class="space-y-6">
            <h3 class="text-xl font-semibold text-etbuy-red-dark border-b border-etbuy-red-light pb-2">
              Brand Media
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex flex-col">
                <label for="photo" class="mb-2 font-medium text-etbuy-red-dark">Vendor Photo</label>
                <input id="photo" type="file" @change="handleFileChange('photo', $event)" class="file-input" />
                <p v-if="photoName" class="text-sm text-gray-600 mt-1">Selected: {{ photoName }}</p>
              </div>
              <div class="flex flex-col">
                <label for="banner" class="mb-2 font-medium text-etbuy-red-dark">Banner Image</label>
                <input id="banner" type="file" @change="handleFileChange('banner', $event)" class="file-input" />
                <p v-if="bannerName" class="text-sm text-gray-600 mt-1">Selected: {{ bannerName }}</p>
              </div>
            </div>
          </section>

          <!-- Description -->
          <section class="space-y-6">
            <h3 class="text-xl font-semibold text-etbuy-red-dark border-b border-etbuy-red-light pb-2">
              Company Description
            </h3>
            <textarea v-model="vendor.companyDescription" rows="4" class="w-full input-style resize-none" placeholder="Describe your business..."></textarea>
          </section>

          <!-- Actions -->
          <section class="flex flex-col md:flex-row gap-4 justify-center">
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-topbar-bg text-etbuy-white font-semibold shadow-etbuy-button transition-all duration-300 hover:bg-etbuy-red-dark hover:text-white hover:shadow-etbuy-light-hover"
            >
              <i class="fas fa-save"></i>
              Save Changes
            </button>
            <button
            type="button"
            @click="resetForm"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-etbuy-red-dark text-etbuy-red-dark bg-white font-semibold shadow-etbuy-button transition-all duration-300 hover:bg-etbuy-red-light hover:text-etbuy-black hover:shadow-etbuy-light-hover"
          >
            <i class="fas fa-undo-alt"></i>
            Reset
          </button>
          
          </section>

          
        </form>
      </section>
    </div>
  </template>

  <script setup>
  import { reactive, ref, onMounted } from 'vue';
  import fetchVendorProfile from '@/api/vendorProfile';
  
  // 1. Local storage vendor extraction
  let vendorId = null;
  try {
  const storedSession = localStorage.getItem('vendorSession');
  if (storedSession) {
    const session = JSON.parse(storedSession);
    vendorId = session?.vendor?.id || null;
  }
} catch (error) {
  console.error('Failed to parse vendorSession from localStorage:', error);
}
  
  // 2. Vendor reactive state
  const vendor = reactive({
    businessName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    companyDescription: '',
    location: '',
    photo: null,
    banner: null,
  });
  
  const photoName = ref('');
  const bannerName = ref('');
  const loading = ref(false);
  const errorMessage = ref('');
  
  // 3. Fetch vendor data
  onMounted(async () => {
    if (!vendorId) {
      errorMessage.value = 'Vendor ID not found in local storage.';
      return;
    }
  
    loading.value = true;
    try {
      const data = await fetchVendorProfile(vendorId);
      Object.assign(vendor, {
        businessName: data.businessName || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        companyDescription: data.companyDescription || '',
        location: data.location || '',
        photo: null,
        banner: null,
      });
    } catch (err) {
      errorMessage.value = err.message || 'Failed to load vendor profile.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  });
  
  // 4. File input handlers
  function handleFileChange(type, event) {
    const file = event.target.files[0];
    if (!file) return;
    vendor[type] = file;
    if (type === 'photo') photoName.value = file.name;
    else if (type === 'banner') bannerName.value = file.name;
  }
  
  // 5. Submit handler
  function submitVendorInfo() {
    console.log('Submitting vendor info:', vendor);
    alert('Vendor info saved successfully.');
  }
  
  // 6. Reset form
  function resetForm() {
    vendor.businessName = '';
    vendor.firstName = '';
    vendor.lastName = '';
    vendor.phoneNumber = '';
    vendor.email = '';
    vendor.companyDescription = '';
    vendor.location = '';
    vendor.photo = null;
    vendor.banner = null;
    photoName.value = '';
    bannerName.value = '';
  }
  </script>
  

  <style scoped>
  .input-style {
    @apply rounded-xl border border-etbuy-red-light px-4 py-3 text-etbuy-black placeholder-etbuy-gray-placeholder shadow-etbuy-light focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark transition;
  }

  .file-input {
    @apply px-4 py-2 rounded-xl border border-etbuy-red-light bg-white text-etbuy-black shadow-etbuy-light cursor-pointer focus:outline-none focus:ring-2 focus:ring-etbuy-red-dark transition;
  }

  .primary-btn {
    @apply bg-etbuy-red-dark text-white font-semibold rounded-full px-8 py-3 shadow-etbuy-button hover:bg-etbuy-red-light transition;
  }

  .secondary-btn {
    @apply border border-etbuy-red-dark text-etbuy-red-dark font-semibold rounded-full px-8 py-3 hover:bg-etbuy-red-light hover:text-etbuy-black transition;
  }
  </style>
