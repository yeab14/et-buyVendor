<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 font-public-sans">
    <div class="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

      <!-- Left Branding Panel -->
      <div class="bg-gradient-to-br from-custom-etbuy-red-dark to-etbuy-red-darken text-etbuy-text-light font-public-sans flex flex-col items-center justify-center p-12 lg:p-16 text-center space-y-4">
        <img src="/img/et-buy.png" alt="EtBuy Logo" class="w-24 md:w-28 lg:w-32 mb-4 drop-shadow-lg" />
        <h2 class="text-3xl md:text-4xl font-bold tracking-wide leading-snug drop-shadow-sm">
          Join EtBuy as a Vendor
        </h2>
        <p class="text-sm md:text-base opacity-90 leading-relaxed max-w-xs md:max-w-sm">
          Set up your store, showcase your products, and grow your business with EtBuy’s vendor platform.
        </p>
      </div>

      <!-- Right Form Panel -->
      <div class="flex items-center justify-center p-10">
        <div class="w-full max-w-sm">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-for="field in fields" :key="field.name" class="space-y-1">
              <label :for="field.name" class="block text-sm font-medium text-gray-700">
                {{ field.placeholder }}
              </label>

              <!-- Normal Input -->
              <input
                v-if="!['password', 'confirmPassword'].includes(field.name)"
                v-model="vendor[field.name]"
                :type="field.type"
                :id="field.name"
                :placeholder="field.placeholder"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-etbuy-red-dark focus:outline-none transition duration-200"
              />

              <!-- Password -->
              <div v-else-if="field.name === 'password'" class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="vendor.password"
                  id="password"
                  placeholder="Password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-etbuy-red-dark focus:outline-none transition duration-200"
                />
                <img
                  src="/img/EyeOpen.jpg"
                  alt="Show Password"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition"
                  @click="togglePassword('password')"
                />
              </div>

              <!-- Confirm Password -->
              <div v-else-if="field.name === 'confirmPassword'" class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="vendor.confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-etbuy-red-dark focus:outline-none transition duration-200"
                />
                <img
                  src="/img/EyeOpen.jpg"
                  alt="Show Password"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition"
                  @click="togglePassword('confirmPassword')"
                />
              </div>

              <!-- Error Message -->
              <span v-if="errors[field.name]" class="text-sm text-red-500">
                {{ errors[field.name] }}
              </span>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-etbuy-red-dark hover:bg-etbuy-red-light text-white font-semibold rounded-md transition duration-200"
            >
              {{ loading ? "Signing Up..." : "Sign Up" }}
            </button>
          </form>

          <!-- Login Redirect -->
          <p class="text-center text-gray-600 text-sm mt-6">
            Already a vendor?
            <router-link to="/vendor/login" class="text-etbuy-red-dark hover:underline font-medium">
              Sign in
            </router-link>
            to manage your store and track your sales.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import * as yup from "yup";
import { registerVendor } from "@/api/auth";

export default {
  data() {
    return {
      vendor: {
        firstName: "",
        lastName: "",
        businessName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      showPassword: false,
      showConfirmPassword: false,
      fields: [
        { name: "firstName", type: "text", placeholder: "First Name" },
        { name: "lastName", type: "text", placeholder: "Last Name" },
        { name: "businessName", type: "text", placeholder: "Business Name" },
        { name: "phoneNumber", type: "tel", placeholder: "Phone Number" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
      ],
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
  this.loading = true;

  try {
    const validationSchema = yup.object({
      firstName: yup
        .string()
        .required("First Name is required")
        .min(2, "At least 2 characters")
        .matches(/^[a-zA-Z ]*$/, "Only letters and spaces"),
      lastName: yup
        .string()
        .required("Last Name is required")
        .min(2, "At least 2 characters")
        .matches(/^[a-zA-Z ]*$/, "Only letters and spaces"),
      businessName: yup
        .string()
        .required("Business Name is required")
        .min(2, "At least 2 characters"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Phone must be 10-15 digits"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain one uppercase letter")
        .matches(/[a-z]/, "Must contain one lowercase letter")
        .matches(/[0-9]/, "Must contain one number")
        .matches(/[\W_]/, "Must contain one special character"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

 
    await validationSchema.validate(this.vendor, { abortEarly: false });
    this.errors = {}; 

    const response = await registerVendor(this.vendor);
    if (response) { 
  this.$bvToast.toast('🎉 Welcome aboard! Your vendor account has been successfully created. 🚀 Get ready to grow your business with EtBuy! You’ll be redirected shortly...', {
    title: '🎊 Success! 🎊',
    variant: 'success',
    solid: true,
   
  });

  setTimeout(() => {
    this.$router.push("/vendor/overview");
  }, 5000);
}else {
      
      this.$bvToast.toast('Something went wrong, please try again.', {
        title: 'Error!',
        variant: 'danger',
        solid: true,
      });
    }

  } catch (err) {
    console.error("Validation or API Error:", err);
    this.loading = false;

    if (err.inner) {
      this.errors = err.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
    }

 
    this.$bvToast.toast('Please correct the errors and try again.', {
      title: 'Error!',
      variant: 'danger',
      solid: true,
    });
  } finally {
    this.loading = false;
  }
}
,

    togglePassword(field) {
      if (field === "password") {
        this.showPassword = !this.showPassword;
      } else if (field === "confirmPassword") {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
  },
};
</script>




