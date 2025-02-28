<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10 ml-auto mr-auto">
          <div class="card shadow-lg refined-card">
            <div class="header text-center">
              <h4 class="title">Customer Interaction Dashboard</h4>
              <p class="category">Manage your customer interactions effectively and enhance your business communication!</p>
            </div>
            <div class="content table-responsive table-interactions">
              <!-- Interaction Section 1 -->
              <div class="interaction-section">
                <div class="interaction-card">
                  <h5>Total Conversations</h5>
                  <div class="interaction-info">
                    <div class="amount">1,250</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 75%;"></div>
                    </div>
                  </div>
                </div>
                <div class="interaction-card">
                  <h5>Active Chats</h5>
                  <div class="interaction-info">
                    <div class="amount">300</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 60%;"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Interaction Section 2 -->
              <div class="interaction-section">
                <div class="interaction-card">
                  <h5>Resolved Issues</h5>
                  <div class="interaction-info">
                    <div class="amount">900</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 80%;"></div>
                    </div>
                  </div>
                </div>
                <div class="interaction-card">
                  <h5>Pending Requests</h5>
                  <div class="interaction-info">
                    <div class="amount">50</div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" style="width: 25%;"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Interaction Section 3 -->
              <div class="interaction-section">
                <div class="interaction-card">
                  <h5>Recent Feedback</h5>
                  <div class="interaction-info">
                    <div class="amount">98% Positive</div>
                    <div class="badge badge-success">Great</div>
                  </div>
                </div>
                <div class="interaction-card">
                  <h5>Last Interaction</h5>
                  <div class="interaction-info">
                    <div class="amount">02/28/2025</div>
                    <i class="fa fa-calendar-alt text-primary"></i>
                  </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div class="cta-section">
                <div class="cta-btns">
                  <button class="cta-btn new-interaction-btn">Start New Interaction</button>
                  <button class="cta-btn view-history-btn">View Interaction History</button>
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
    startNewInteraction() {
      console.log("Starting a new customer interaction...");
    },
    viewHistory() {
      console.log("Viewing the interaction history...");
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

/* Interaction Section Styles */
.interaction-section {
  margin-top:2vh;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.interaction-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  width: 48%;
  padding: 15px;
  transition: transform 0.3s;
  margin-bottom: 20px;
}

.interaction-card:hover {
  transform: translateY(-5px);
}

h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.interaction-info {
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

.new-interaction-btn {
  background-color: #ff6b6b;
}

.new-interaction-btn:hover {
  background-color: #ff4f4f;
  transform: translateY(-3px);
}

.view-history-btn {
  background-color: #dcdcdc;
  color: #777;
}

.view-history-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

</style>
