<template>
    <div class="login-wrapper">
      <div class="login-card">
        <div class="left-section">
          <div class="branding">
            <img src="/img/et-buy.png" alt="EtBuy Logo" class="logo" />
            <h2>Welcome Back to EtBuy</h2>
            <p>Login to manage your business on EtBuy and start selling!</p>
          </div>
        </div>
        <div class="right-section">
          <div class="form-container">
            <form @submit.prevent="login">
              <input type="email" v-model="vendor.email" placeholder="Email" required />
              <input type="password" v-model="vendor.password" placeholder="Password" required />
              <button type="submit" class="login-btn">Login</button>
            </form>
            <p class="signup-link">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
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
          email: "",
          password: "",
        },
        hardcodedCredentials: {
          email: "mike@gmail.com",
          password: "1234",
        },
      };
    },
    methods: {
      login() {
        if (this.vendor.email === this.hardcodedCredentials.email && this.vendor.password === this.hardcodedCredentials.password) {
          console.log("Login successful");
          this.$router.push("/vendor/overview");
        } else {
          console.log("Invalid credentials");
          alert("Invalid email or password. Please try again.");
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
  </style>
  