<template>
  <div class="vendor-dashboard">
    <div class="container-fluid">

      <!-- Header Section -->
      <div class="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <p>Welcome! Here's an overview of your business performance.</p>
      </div>

      <!-- Vendor Stats Cards -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-money-coins text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Revenue</p>
              <h4 class="card-title">${{ totalRevenue }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i> Last 30 Days
            </div>
          </stats-card>
        </div>

<!-- Total Products -->
<div class="col-xl-3 col-md-6">
  <stats-card :brand-color="brandColor">
    <div slot="header" class="icon-info">
      <i class="fa fa-shopping-bag"></i>
    </div>
    <div slot="content">
      <p class="card-category">Total Products</p>
      <h4 class="card-title">{{ totalProducts }}</h4>
    </div>
    <div slot="footer">
      <i class="fa fa-cubes"></i> Active & Inactive
    </div>
  </stats-card>
</div>

        <div class="col-xl-3 col-md-6">
          <stats-card :brand-color="brandColor">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-bell-55 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Pending Orders</p>
              <h4 class="card-title">{{ pendingOrders }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-shopping-cart"></i> Awaiting Processing
            </div>
          </stats-card>
        </div>


<!-- Customer Rating -->
<div class="col-xl-3 col-md-6">
  <stats-card :brand-color="brandColor">
    <div slot="header" class="icon-danger">
      <i class="nc-icon nc-hat-3 text-danger"></i> <!-- Use nc-hat-3 for rating icon -->
    </div>
    <div slot="content">
      <p class="card-category">Customer Rating</p>
      <h4 class="card-title">{{ customerRating }}/5</h4>
    </div>
    <div slot="footer">
      <i class="fa fa-smile-o"></i> Overall Satisfaction
    </div>
  </stats-card>
</div>
      </div>

      <!-- Charts Section -->
      <div class="row">
        <div class="col-md-8">
          <chart-card :chart-data="salesTrend.data"
                      :chart-options="salesTrend.options"
                      :responsive-options="salesTrend.responsiveOptions"
                      chart-type="Line"
                      :brand-color="brandColor">
            <template slot="header">
              <h4 class="card-title">Sales Trend</h4>
              <p class="card-category">Last 7 Days</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle" :style="{color: brandColor}"></i> Sales
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated just now
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="feedbackTrend.data" chart-type="Line" :brand-color="brandColor">
            <template slot="header">
              <h4 class="card-title">Customer Feedback</h4>
              <p class="card-category">Last 7 Days</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-success"></i> Positive
                <i class="fa fa-circle text-danger"></i> Negative
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Last feedback: 1 hour ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card :chart-data="productDistribution.data" chart-type="Pie" :brand-color="brandColor">
            <template slot="header">
              <h4 class="card-title">Product Distribution</h4>
              <p class="card-category">By Category</p>
            </template>
            <template slot="footer">
              <div class="stats">
                <i class="fa fa-refresh"></i> Updated every 24 hours
              </div>
            </template>
          </chart-card>
        </div>

        <!-- Task Management -->
        <div class="col-md-6">
          <card :brand-color="brandColor">
            <template slot="header">
              <h5 class="title">Pending Tasks</h5>
              <p class="category">Vendor's backend tasks</p>
            </template>
            <l-table :data="taskData.data" :columns="taskData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{ row.title }}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info"
                          v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger"
                          v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 5 minutes ago
              </div>
            </div>
          </card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ChartCard from 'src/components/Cards/ChartCard.vue';
import StatsCard from 'src/components/Cards/StatsCard.vue';
import LTable from 'src/components/Table.vue';

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
/* General Styles */
.vendor-dashboard {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
}

.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
}

/* Dashboard Header */
.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 5px;
}

.dashboard-header p {
  font-size: 1.1em;
  color: #777;
}

/* Stats Cards */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.col-xl-3 {
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
}

.col-md-6,
.col-md-8,
.col-md-4 {
  padding: 10px;
  box-sizing: border-box;
}

/* Chart Card Styles */
.chart-card .card-title {
  font-size: 1.5em;
  color: #333;
}

.chart-card .card-category {
  font-size: 0.9em;
  color: #777;
}

/* Table Styles */
.l-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.l-table th,
.l-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.l-table th {
  background-color: #f2f2f2;
}

.l-table .td-actions {
  text-align: right;
}

/* Component Specific Styling */
.icon-success i {
  color: #28a745;
}

.icon-info i {
  color: #17a2b8;
}

.icon-warning i {
  color: #ffc107;
}

.icon-danger i {
  color: #dc3545;
}

/* General Styles */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

/* Vendor Dashboard */
.vendor-dashboard {
  padding: 20px;
}

.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
}

/* Cards */
.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
}

/* Header Section */
.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 5px;
}

.dashboard-header p {
  font-size: 1.1em;
  color: #777;
}

/* Stats Card */
.stats-card {
  border-left: 5px solid #ee5858;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.stats-card .icon-success,
.stats-card .icon-info,
.stats-card .icon-warning,
.stats-card .icon-danger {
  font-size: 2em;
  margin-bottom: 10px;
}

.stats-card .card-category {
  color: #777;
  font-size: 14px;
}

.stats-card .card-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  letter-spacing: 1px;
}

.stats-card .footer {
  color: #777;
  font-size: 12px;
  margin-top: 15px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .col-xl-3 {
    width: 50%;
  }

  .dashboard-header h1 {
    font-size: 2em;
  }

  .dashboard-header p {
    font-size: 1em;
  }
}

@media (max-width: 576px) {
  .col-xl-3 {
    width: 100%;
  }

  .dashboard-header h1 {
    font-size: 1.8em;
  }

  .dashboard-header p {
    font-size: 0.9em;
  }
}
</style>
