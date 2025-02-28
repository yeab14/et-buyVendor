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
            <!-- <h3>Create Vendor Account</h3> -->
            <form @submit.prevent="register">
              <!-- <div class="input-group"> -->
                <input v-model="vendor.firstName" placeholder="First Name" required />
                <input v-model="vendor.lastName" placeholder="Last Name" required />
              <input v-model="vendor.businessName" placeholder="Business Name" required />
              <input type="email" v-model="vendor.email" placeholder="Email" required />
              <input type="tel" v-model="vendor.phone" placeholder="Phone Number" required />
              <input type="password" v-model="vendor.password" placeholder="Password" required />
              <input type="password" v-model="vendor.password" placeholder="Confirm Password" required />
            <!-- </div> -->
              <button type="submit" class="signup-btn">Sign Up</button>
            </form>
            <p class="login-link">Already have an account? <router-link to="/login">Log in</router-link></p>
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
          firstName: "",
          lastName: "",
          businessName: "",
          email: "",
          phone: "",
          password: "",
        },
      };
    },
    methods: {
      register() {
        console.log("Vendor Registered:", this.vendor);
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
    width: 880px;
    height: auto;
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
  </style>
  