<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
      


<div class="bg-gradient-to-br from-custom-etbuy-red-dark to-etbuy-red-darken text-etbuy-text-light font-public-sans flex flex-col items-center justify-center p-12 lg:p-16 text-center space-y-4">
  <img
    src="img/et-buy.png"
    alt="EtBuy Logo"
    class="w-24 md:w-28 lg:w-32 mb-4 drop-shadow-lg"
  />

  <h2 class="text-3xl md:text-4xl font-bold tracking-wide leading-snug drop-shadow-sm">
    Welcome Back to EtBuy
  </h2>
  <p class="text-sm md:text-base opacity-90 leading-relaxed max-w-xs md:max-w-sm">
    Manage your store, track your performance, and grow your business confidently with EtBuy’s powerful vendor dashboard.
  </p>
</div>




      <div class="flex items-center justify-center p-10">
        <div class="w-full max-w-sm">
          <form @submit.prevent="login" class="space-y-6">
            <div v-for="field in fields" :key="field.name" class="space-y-1">
              <label :for="field.name" class="block text-sm font-medium text-gray-700">
                {{ field.placeholder }}
              </label>

              <div class="relative">
                <input
                  v-if="field.name !== 'password'"
                  v-model="vendor[field.name]"
                  :type="field.type"
                  :id="field.name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-etbuy-red-dark focus:outline-none transition duration-200"
                  :placeholder="field.placeholder"
                />

                <div v-else class="relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="vendor.password"
                    id="password"
                    class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-etbuy-red-dark focus:outline-none transition duration-200"
                    placeholder="Password"
                  />
                  <img
                    src="img/EyeOpen.jpg"
                    alt="Show Password"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition"
                    @click="togglePassword"
                  />
                </div>
              </div>

              <span v-if="errors[field.name]" class="text-sm text-red-500">
                {{ errors[field.name] }}
              </span>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-etbuy-red-dark hover:bg-etbuy-red-light text-white font-semibold rounded-md transition duration-200"
            >
              {{ loading ? "Logging In..." : "Log In" }}
            </button>
          </form>

          <p class="text-center text-gray-600 text-sm mt-6">
            Don't have an account?
            <router-link to="/" class="text-etbuy-red-dark font-medium hover:underline">
              Sign up
            </router-link>
            to get started.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { loginVendor } from "@/api/auth";

export default {
  data() {
    return {
      vendor: {
        phoneNumber: "",
        password: "",
      },
      fields: [
        { name: "phoneNumber", type: "tel", placeholder: "Phone Number" },
        { name: "password", type: "password", placeholder: "Password" },
      ],
      errors: {},
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.errors = {};
      if (!this.vendor.phoneNumber || !this.vendor.password) {
        this.errors = {
          phoneNumber: !this.vendor.phoneNumber ? "Phone number is required" : "",
          password: !this.vendor.password ? "Password is required" : "",
        };
        return;
      }

      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(this.vendor.phoneNumber)) {
        this.errors.phoneNumber = "Invalid phone number format";
        return;
      }

      try {
        this.loading = true;
        const response = await loginVendor({
          phoneNumber: this.vendor.phoneNumber,
          password: this.vendor.password,
        });

 
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        this.$bvToast.toast(
          '✅ Welcome back! You have successfully logged in to your EtBuy vendor account. 🚀 Time to manage your business and boost your sales! Redirecting you to your dashboard...',
          {
            title: '🎉 Login Successful!',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
            toaster: 'b-toaster-top-right',
          }
        );

        setTimeout(() => {
          this.$router.push("/vendor/overview");
        }, 4000);
      } catch (error) {
        console.error("Login failed:", error);
        this.errors.phoneNumber = error.message || "Incorrect phone number or password";
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>

</style>