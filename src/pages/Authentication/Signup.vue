<template>
  <div class="signup-wrapper">
    <div class="signup-card">
      <div class="left-section">
        <div class="branding">
          <img src="/img/et-buy.png" alt="EtBuy Logo" class="logo" />
          <h2>Welcome to EtBuy Vendor Sign-Up</h2>
          <p>Start your journey with EtBuy and grow your business with ease!</p>
        </div>
      </div>
      <div class="right-section">
        <div class="form-container">
          <form @submit.prevent="handleSubmit">
            <div
              class="input-group"
              v-for="field in fields"
              :key="field.name"
              :class="{ 'has-error': errors[field.name] }"
            >
              <input
                v-if="field.name !== 'password' && field.name !== 'confirmPassword'"
                v-model="vendor[field.name]"
                :type="field.type"
                :placeholder="field.placeholder"
              />

              <div v-if="field.name === 'password'">
                <div class="password-input-wrapper">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="vendor.password"
                    placeholder="Password"
                  />
                  <img
                    src="@/assets/icons/EyeOpen.jpg"
                    alt="Show Password"
                    class="eye-icon"
                    @click="togglePassword('password')"
                  />
                </div>
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
              </div>

              <div v-if="field.name === 'confirmPassword'">
                <div class="password-input-wrapper">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="vendor.confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <img
                    src="@/assets/icons/EyeOpen.jpg"
                    alt="Show Password"
                    class="eye-icon"
                    @click="togglePassword('confirmPassword')"
                  />
                </div>
                <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
              </div>

              <span v-if="errors[field.name]" class="error">{{ errors[field.name] }}</span>
            </div>

            <button type="submit" class="signup-btn" :disabled="loading">
              {{ loading ? "Signing Up..." : "Sign Up" }}
            </button>
          </form>
          <p class="login-link">
            Already have an account? <router-link to="/vendor/login">Log in</router-link>
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
 
      this.$bvToast.toast('You have successfully signed up!', {
        title: 'Success!',
        variant: 'success',
        solid: true,
      });


      setTimeout(() => {
        this.$router.push("/vendor/overview");
      }, 2000); 
    } else {
      
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




<style scoped>
.signup-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 20px;
}

.signup-card {
  display: flex;
  margin-top:15vh;
  width: 880px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.input-group {
  margin-bottom: 10px;
}

.input-group.has-error {

}

.error {
  color: red;
  font-size: 12px;
}
.left-section {
  width: 40%;
  background: linear-gradient(135deg, #ee5858, #000);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
}

.branding .logo {
  width: 120px;
  margin-bottom: 15px;
}

.right-section {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-container {
  width: 100%;
  max-width: 360px;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 20px;
}


h3 {
  font-size: 22px;
  font-weight: bold;
  color: #ee5858;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  gap: 12px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s ease-in-out;
}

input + input {
  margin-top: 8px;
}


input:focus {
  border-color: #ee5858;
  outline: none;
  box-shadow: 0 0 5px rgba(238, 88, 88, 0.5);
}

.input-field {
  width: 100%;
  padding-right: 30vh;
}

input[type="password"], input[type="text"] {
  width: 180%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s ease-in-out;
}

input[type="password"]:focus, input[type="text"]:focus {
  border-color: #ee5858;
  outline: none;
  box-shadow: 0 0 5px rgba(238, 88, 88, 0.5);
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background: #ee5858;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.signup-btn:hover {
  background: #c04a4a;
}

.login-link {
  text-align: center;
  margin-top: 15px;
  color: #555;
}

.login-link a {
  color: #ee5858;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}

.eye-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
