<template>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-10 ml-auto mr-auto">
            <div class="card shadow-lg refined-card">
              <div class="header text-center">
                <h4 class="title">Store Settings</h4>
                <p class="category">Manage your store configurations and settings efficiently.</p>
              </div>
              <div class="content table-responsive table-settings">
                <!-- Store Configuration Section -->
                <div class="settings-section">
                  <div class="setting-card">
                    <h5>Store Name</h5>
                    <div class="setting-info">
                      <input type="text" class="form-control" placeholder="Enter Store Name" />
                    </div>
                  </div>
                  <div class="setting-card">
                    <h5>Store Logo</h5>
                    <div class="setting-info">
                      <input type="file" class="form-control" />
                    </div>
                  </div>
                </div>
  
                <!-- Payment Settings Section -->
                <div class="settings-section">
                  <div class="setting-card">
                    <h5>Payment Methods</h5>
                    <div class="setting-info">
                      <select class="form-control">
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div class="setting-card">
                    <h5>Currency</h5>
                    <div class="setting-info">
                      <select class="form-control">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                      </select>
                    </div>
                  </div>
                </div>
  
                <!-- Shipping Settings Section -->
                <div class="settings-section">
                  <div class="setting-card">
                    <h5>Shipping Providers</h5>
                    <div class="setting-info">
                      <select class="form-control">
                        <option>FedEx</option>
                        <option>UPS</option>
                        <option>USPS</option>
                      </select>
                    </div>
                  </div>
                  <div class="setting-card">
                    <h5>Shipping Fee</h5>
                    <div class="setting-info">
                      <input type="number" class="form-control" placeholder="Enter Shipping Fee" />
                    </div>
                  </div>
                </div>
  
                <!-- CTA Section -->
                <div class="cta-section">
                  <div class="cta-btns">
                    <button class="cta-btn save-settings-btn">Save Settings</button>
                    <button class="cta-btn reset-settings-btn">Reset to Default</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Placeholder for dynamic data (could be connected to backend APIs)
      };
    },
    methods: {
      // Methods for handling button actions
      saveSettings() {
        console.log("Saving store settings...");
      },
      resetSettings() {
        console.log("Resetting to default store settings...");
      }
    }
  };
  </script>
  
  <style lang="scss">
  /* Global Styles */
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f4f4f4;
  }
  
  /* Refined Card Style */
  .refined-card {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    background: linear-gradient(145deg, #6a7a9c, #4e5a69);
    padding: 25px;
    color: white;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .category {
    font-size: 1rem;
    opacity: 0.8;
  }
  
  /* Settings Section Styles */
  .settings-section {
    margin-top:2vh;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .setting-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    width: 48%;
    padding: 15px;
    transition: transform 0.3s;
    margin-bottom: 20px;
  }
  
  .setting-card:hover {
    transform: translateY(-5px);
  }
  
  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
  }
  
  .setting-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  input[type="text"],
  input[type="file"],
  input[type="number"],
  select {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  /* CTA Button Section */
  .cta-section {
    text-align: center;
    margin-top: 30px;
  }
  
  .cta-btns {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .cta-btn {
    padding: 15px 30px;
    font-size: 1.2rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    color: white;
    text-align: center;
    display: inline-block;
    width: auto;
  }
  
  .save-settings-btn {
    background-color: #4caf50;
  }
  
  .save-settings-btn:hover {
    background-color: #45a049;
    transform: translateY(-3px);
  }
  
  .reset-settings-btn {
    background-color: #f44336;
  }
  
  .reset-settings-btn:hover {
    background-color: #e53935;
    transform: translateY(-3px);
  }
  
  </style>
  