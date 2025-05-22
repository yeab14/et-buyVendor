<template>
  <div class="vendor-dashboard">
    <div class="container-fluid">

      <!-- Enhanced Header Section -->
      <div class="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <p>Welcome back! Here's your business performance at a glance.</p>
      </div>

      <!-- Modern Stats Cards -->
      <div class="row">
        <!-- Revenue Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header">
              <div class="icon-wrapper">
                <i class="fas fa-dollar-sign"></i>
              </div>
            </div>
            <div slot="content">
              <p class="card-category">Total Revenue</p>
              <h4 class="card-title">${{ totalRevenue.toLocaleString() }}</h4>
            </div>
            <div slot="footer">
              <i class="fas fa-calendar"></i>
              Last 30 Days
            </div>
          </stats-card>
        </div>

        <!-- Products Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header">
              <div class="icon-wrapper">
                <i class="fas fa-box"></i>
              </div>
            </div>
            <div slot="content">
              <p class="card-category">Total Products</p>
              <h4 class="card-title">{{ totalProducts.toLocaleString() }}</h4>
            </div>
            <div slot="footer">
              <i class="fas fa-cubes"></i>
              Active & Inactive
            </div>
          </stats-card>
        </div>

        <!-- Orders Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header">
              <div class="icon-wrapper">
                <i class="fas fa-shopping-cart"></i>
              </div>
            </div>
            <div slot="content">
              <p class="card-category">Pending Orders</p>
              <h4 class="card-title">{{ pendingOrders }}</h4>
            </div>
            <div slot="footer">
              <i class="fas fa-clock"></i>
              Awaiting Processing
            </div>
          </stats-card>
        </div>

        <!-- Rating Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header">
              <div class="icon-wrapper">
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div slot="content">
              <p class="card-category">Customer Rating</p>
              <h4 class="card-title">{{ customerRating }}/5</h4>
            </div>
            <div slot="footer">
              <i class="fas fa-smile"></i>
              Overall Satisfaction
            </div>
          </stats-card>
        </div>
      </div>

      <!-- Enhanced Charts Section -->
      <div class="row">
        <!-- Sales Trend Chart -->
        <div class="col-md-8">
          <chart-card
            :chart-data="salesTrend.data"
            :chart-options="salesTrend.options"
            :responsive-options="salesTrend.responsiveOptions"
            chart-type="Line"
            :brand-color="brandColor"
          >
            <template slot="header">
              <h4 class="card-title">Sales Performance</h4>
              <p class="card-category">Weekly Revenue Trend</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fas fa-circle text-primary"></i> Revenue
                <i class="fas fa-circle text-info"></i> Orders
              </div>
              <hr>
              <div class="stats">
                <i class="fas fa-sync"></i> Updated just now
              </div>
            </template>
          </chart-card>
        </div>

        <!-- Customer Feedback Chart -->
        <div class="col-md-4">
          <chart-card
            :chart-data="feedbackTrend.data"
            chart-type="Line"
            :brand-color="brandColor"
          >
            <template slot="header">
              <h4 class="card-title">Customer Feedback</h4>
              <p class="card-category">Daily Satisfaction Score</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fas fa-circle text-success"></i> Positive
                <i class="fas fa-circle text-danger"></i> Negative
              </div>
              <hr>
              <div class="stats">
                <i class="fas fa-history"></i> Last update: 1 hour ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <!-- Product Distribution and Tasks -->
      <div class="row">
        <!-- Product Distribution -->
        <div class="col-md-6">
          <chart-card
            :chart-data="productDistribution.data"
            chart-type="Pie"
            :brand-color="brandColor"
          >
            <template slot="header">
              <h4 class="card-title">Product Categories</h4>
              <p class="card-category">Distribution by Category</p>
            </template>
            <template slot="footer">
              <div class="stats">
                <i class="fas fa-chart-pie"></i> Updated daily
              </div>
            </template>
          </chart-card>
        </div>

        <!-- Task Management -->
        <div class="col-md-6">
          <card :brand-color="brandColor">
            <template slot="header">
              <h4 class="card-title">Pending Tasks</h4>
              <p class="card-category">Action Items</p>
            </template>
            <l-table :data="taskData.data" :columns="taskData.columns">
              <template slot="columns"></template>
              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{ row.title }}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fas fa-sync"></i> Last updated 5 minutes ago
              </div>
            </div>
          </card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ChartCard from '@/components/Cards/ChartCard.vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import LTable from '@/components/Table.vue';

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard
  },
  data() {
    return {
      brandColor: '#ee5858', // Brand color
      totalRevenue: 2500.50,
      totalProducts: 150,
      pendingOrders: 12,
      customerRating: 4.7,
      editTooltip: 'Edit Task',
      deleteTooltip: 'Remove Task',
      salesTrend: {
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            [150, 170, 200, 250, 280, 320, 350]
          ]
        },
        options: {
          low: 0,
          high: 400,
          height: '245px',
          axisX: {
            showGrid: false
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc(value) {
                return value[0];
              }
            }
          }]
        ]
      },
      feedbackTrend: {
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            [4.5, 4.7, 4.6, 4.8, 4.9, 5.0, 4.8]
          ]
        }
      },
      productDistribution: {
        data: {
          labels: ['Electronics', 'Fashion', 'Home Appliances', 'Books'],
          series: [25, 40, 20, 15]
        }
      },
      taskData: {
        data: [
          { title: 'Review Product Listings', checked: false },
          { title: 'Approve Pending Orders', checked: true },
          { title: 'Update Pricing', checked: false },
          { title: 'Check Inventory', checked: false }
        ],
        columns: ['checkbox', 'title', 'actions']
      }
    };
  }
};
</script>

<style scoped>
/* Modern Dashboard Theme */
.vendor-dashboard {
  font-family: 'Inter', 'Arial', sans-serif;
  background-color: #f8f9fe;
  padding: 2rem;
  min-height: 100vh;
}

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
}

/* Enhanced Dashboard Header */
.dashboard-header {
  text-align: left;
  margin-bottom: 2.5rem;
  position: relative;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(238, 88, 88, 0.1);
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ee5858, #e63946);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-header p {
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
}

/* Modern Stats Cards */
.stats-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(238, 88, 88, 0.08);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(238, 88, 88, 0.1);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ee5858, #e63946);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(238, 88, 88, 0.12);
}

.stats-card:hover::before {
  opacity: 1;
}

.stats-card .icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: rgba(238, 88, 88, 0.1);
}

.stats-card i {
  font-size: 1.5rem;
  color: #ee5858;
}

.stats-card .card-category {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.stats-card .card-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stats-card .footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(238, 88, 88, 0.1);
  color: #64748b;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Enhanced Chart Cards */
.chart-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(238, 88, 88, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(238, 88, 88, 0.1);
}

.chart-card .card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.chart-card .card-category {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.chart-card .legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.chart-card .legend i {
  font-size: 0.8rem;
}

.chart-card hr {
  border: none;
  height: 1px;
  background: rgba(238, 88, 88, 0.1);
  margin: 1rem 0;
}

.chart-card .stats {
  color: #64748b;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Task Management Section */
.l-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  margin-top: 1rem;
}

.l-table th {
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  padding: 1rem;
  background: rgba(238, 88, 88, 0.05);
  border-bottom: 2px solid rgba(238, 88, 88, 0.1);
}

.l-table td {
  padding: 1rem;
  color: #2c3e50;
  border-bottom: 1px solid rgba(238, 88, 88, 0.1);
  font-size: 0.9rem;
}

.l-table tr:hover td {
  background: rgba(238, 88, 88, 0.02);
}

.btn-simple {
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-simple.btn-info:hover {
  background: rgba(238, 88, 88, 0.1);
  color: #ee5858;
}

.btn-simple.btn-danger:hover {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container-fluid {
    padding: 0 1rem;
  }
  
  .stats-card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    text-align: center;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .col-xl-3 {
    width: 50%;
  }
  
  .stats-card {
    margin-bottom: 1rem;
  }
  
  .chart-card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .vendor-dashboard {
    padding: 1rem;
  }
  
  .col-xl-3 {
    width: 100%;
  }
  
  .stats-card {
    margin-bottom: 1rem;
  }
  
  .dashboard-header h1 {
    font-size: 1.75rem;
  }
}
</style>
