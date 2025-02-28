<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
          <div class="card shadow-lg refined-card">
            <div class="header text-center">
              <h4 class="title">Your Financial Dashboard</h4>
              <p class="category">Track your balance, earnings, and financial activities to grow your business!</p>
            </div>
            <div class="content table-responsive table-financial">
              <!-- Financial Section 1 -->
              <div class="financial-section">
                <div class="financial-card">
                  <h5>Current Balance</h5>
                  <div class="financial-info">
                    <div class="amount">$500.00</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 60%;"></div>
                    </div>
                  </div>
                </div>
                <div class="financial-card">
                  <h5>Earnings This Month</h5>
                  <div class="financial-info">
                    <div class="amount">$1,000.00</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 80%;"></div>
                    </div>
                  </div>
                </div>
                <div class="financial-card">
                  <h5>Pending Payouts</h5>
                  <div class="financial-info">
                    <div class="amount">$200.00</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 30%;"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Financial Section 2 -->
              <div class="financial-section">
                <div class="financial-card">
                  <h5>Last Payout Date</h5>
                  <div class="financial-info">
                    <div class="amount">01/15/2025</div>
                    <i class="fa fa-calendar-alt text-primary"></i>
                  </div>
                </div>
                <div class="financial-card">
                  <h5>Subscription Plan</h5>
                  <div class="financial-info">
                    <div class="amount">Premium ($49/month)</div>
                    <div class="badge badge-success">Active</div>
                  </div>
                </div>
                <div class="financial-card">
                  <h5>Support</h5>
                  <div class="financial-info">
                    <i class="fa fa-check-circle text-success"></i> <span>24/7 Premium Support</span>
                  </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div class="cta-section">
                <div class="cta-btns">
                  <button class="cta-btn upgrade-btn" :class="{'active': isActive}" @click="upgradeToPremium">Upgrade to Premium</button>
                  <button class="cta-btn current-plan-btn" :disabled="isDisabled">Current Plan</button>
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
export default {};
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
  background: linear-gradient(145deg, #ff6b6b, #ff4f4f);
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

/* Financial Section Styles */
.financial-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.financial-card {
  margin-top:2vh;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  width: 31%; 
  padding: 15px;
  transition: transform 0.3s;
  margin-bottom: 20px;
}

.financial-card:hover {
  transform: translateY(-5px);
}

h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.financial-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.progress-bar-container {
  width: 65%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
}

/* Badge Styles */
.badge {
  padding: 5px 10px;
  border-radius: 5px;
}

.badge-success {
  background-color: #28a745;
  color: white;
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

.upgrade-btn {
  background-color: #ff6b6b;
  color: white;
  font-size: 1.1rem;
  padding: 15px;
  transition: background-color 0.3s;
  border-radius: 10px;
}

.upgrade-btn:hover {
  background-color: #ff4f4f;
}

.disabled {
  background-color: #dcdcdc;
  cursor: not-allowed;
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

/* Custom CTA Button Styles */
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

.upgrade-btn {
  background-color: #ff6b6b;
}

.upgrade-btn:hover {
  background-color: #ff4f4f;
  transform: translateY(-3px);
}

.current-plan-btn {
  background-color: #dcdcdc;
  color: #777;
}

.current-plan-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.upgrade-btn.active {
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}


</style>
