<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="left-section">
        <div class="branding">
          <img src="img/et-buy.png" alt="EtBuy Logo" class="logo" />
          <h2>Welcome Back to EtBuy</h2>
          <p>Login to manage your business on EtBuy and start selling!</p>
        </div>
      </div>
      <div class="right-section">
        <div class="form-container">
          <form @submit.prevent="login">
            <div
              class="input-group"
              v-for="field in fields"
              :key="field.name"
              :class="{ 'has-error': errors[field.name] }"
            >
              <label :for="field.name" class="input-label">{{ field.placeholder }}</label>

              <input
                v-if="field.name !== 'password'"
                v-model="vendor[field.name]"
                :type="field.type"
                :id="field.name"
              />

              <div v-if="field.name === 'password'">
                <div class="password-input-wrapper">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="vendor.password"
                    id="password"
                    class="password-field"
                  />
                  <img
                    src="img/EyeOpen.jpg"
                    alt="Show Password"
                    class="eye-icon"
                    @click="togglePassword('password')"
                  />
                </div>
              </div>

              <span v-if="errors[field.name]" class="error">{{ errors[field.name] }}</span>
            </div>

            <button type="submit" class="login-btn" :disabled="loading">
              {{ loading ? "Logging In..." : "Log In" }}
            </button>
          </form>
          <p class="signup-link">
            Don't have an account? <router-link to="/"><strong>Sign up</strong></router-link> to get started.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      dummyPhoneNumber: "1234567890", // Dummy phone number for testing
      dummyPassword: "password123", // Dummy password for testing
    };
  },
  methods: {
    login() {
      this.errors = {}; // Reset errors
      if (!this.vendor.phoneNumber || !this.vendor.password) {
        this.errors = {
          phoneNumber: "Phone number is required",
          password: "Password is required",
        };
        return;
      }

      // Validate phone number format
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(this.vendor.phoneNumber)) {
        this.errors.phoneNumber = "Invalid phone number format";
        return;
      }

      // Dummy data validation
      if (
        this.vendor.phoneNumber === this.dummyPhoneNumber &&
        this.vendor.password === this.dummyPassword
      ) {
        // Simulate successful login and navigate
        console.log("Login successful");
        this.$router.push("/vendor/overview");
      } else {
        this.errors = {
          phoneNumber: "Incorrect phone number or password",
        };
      }
    },
    togglePassword(field) {
      if (field === "password") {
        this.showPassword = !this.showPassword;
      }
    },
  },
};
</script>


<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 20px;
}

.login-card {
  display: flex;
  margin-top: 15vh;
  width: 880px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
  flex-direction: column;
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

input:focus {
  border-color: #ee5858;
  outline: none;
  box-shadow: 0 0 5px rgba(238, 88, 88, 0.5);
}

.input-label {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-bottom: 5px;
  text-align: left;
}

.login-btn {
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

.login-btn:hover {
  background: #c04a4a;
}

.signup-link {
  text-align: center;
  margin-top: 15px;
  color: #555;
}

.signup-link a {
  color: #ee5858;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
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

.password-input-wrapper {
  position: relative;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
