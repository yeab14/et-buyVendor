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
              :class="{ 'has-error': errors[field.name] }"
              v-for="field in fields"
              :key="field.name"
            >
              <input
                v-if="field.name !== 'password' && field.name !== 'confirmPassword'"
                v-model="vendor[field.name]"
                :type="field.type"
                :placeholder="field.placeholder"
              />
              <div v-if="field.name === 'password'">
                <div class="password-header">
                  <label class="input-label">Password</label>
                </div>
                <div class="password-input-wrapper">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="input-field"
                    v-model="vendor.password"
                    placeholder="Password"
                  />
                  <img
                    :src="require('@/assets/icons/EyeOpen.jpg')"
                    alt="Show Password"
                    class="eye-icon"
                    @click="togglePassword('password')"
                  />
                </div>
                <span v-if="errors.password" class="error">{{ errors.password }}</span>
              </div>
              <div v-if="field.name === 'confirmPassword'">
                <div class="password-header">
                  <label class="input-label">Confirm Password</label>
                </div>
                <div class="password-input-wrapper">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="input-field"
                    v-model="vendor.confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <img
                    :src="require('@/assets/icons/EyeOpen.jpg')"
                    alt="Show Password"
                    class="eye-icon"
                    @click="togglePassword('confirmPassword')"
                  />
                </div>
                <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
              </div>
              <span
                v-if="field.name !== 'password' && field.name !== 'confirmPassword' && errors[field.name]"
                class="error"
                >{{ errors[field.name] }}</span
              >
            </div>
            <button type="submit" class="signup-btn">Sign Up</button>
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
import { reactive, ref } from "vue";
import * as yup from "yup";

export default {
  setup() {
    const vendor = reactive({
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    const errors = ref({});

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    // Strong validation schema
    const validationSchema = yup.object({
      firstName: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters")
        .matches(/^[a-zA-Z ]*$/, "First Name can only contain letters and spaces"),
      lastName: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters")
        .matches(/^[a-zA-Z ]*$/, "Last Name can only contain letters and spaces"),
      businessName: yup
        .string()
        .required("Business Name is required")
        .min(2, "Business Name must be at least 2 characters"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[\W_]/, "Password must contain at least one special character"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    const handleSubmit = async () => {
      try {
        await validationSchema.validate(vendor, { abortEarly: false });
        errors.value = {}; // Clear previous errors
        console.log("Vendor Registered:", vendor);
      } catch (err) {
        // Handle validation errors
        errors.value = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
      }
    };

    const fields = [
      { name: "firstName", type: "text", placeholder: "First Name" },
      { name: "lastName", type: "text", placeholder: "Last Name" },
      { name: "businessName", type: "text", placeholder: "Business Name" },
      { name: "email", type: "email", placeholder: "Email" },
      { name: "phone", type: "tel", placeholder: "Phone Number" },
      { name: "password", type: "password", placeholder: "Password" },
      { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
    ];

    const togglePassword = (field) => {
      if (field === "password") {
        showPassword.value = !showPassword.value;
      } else if (field === "confirmPassword") {
        showConfirmPassword.value = !showConfirmPassword.value;
      }
    };

    return { vendor, errors, handleSubmit, fields, togglePassword, showPassword, showConfirmPassword };
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

.password-input-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding-right: 30vh;
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
