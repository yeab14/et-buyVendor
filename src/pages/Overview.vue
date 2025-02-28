<template>
  <div class="content">
    <div class="container-fluid">
      <!-- Vendor Stats Cards -->
      <div class="row">
        <!-- Total Revenue Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-wallet text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i> Last 30 Days
            </div>
          </stats-card>
        </div>

        <!-- Total Products Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-box text-info"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Products</p>
              <h4 class="card-title">120</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i> Updated now
            </div>
          </stats-card>
        </div>

        <!-- Pending Orders Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-time-alarm text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Pending Orders</p>
              <h4 class="card-title">18</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i> Last 24 hours
            </div>
          </stats-card>
        </div>

        <!-- Customer Feedback Card -->
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-hat-3 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Customer Feedback</p>
              <h4 class="card-title">4.8/5</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-star"></i> Excellent Rating
            </div>
          </stats-card>
        </div>
      </div>

      <!-- Sales, Feedback, and Product Distribution Charts -->
      <div class="row">
        <!-- Sales Trend -->
        <div class="col-md-8">
          <chart-card :chart-data="salesTrend.data"
                      :chart-options="salesTrend.options"
                      :responsive-options="salesTrend.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Sales Performance</h4>
              <p class="card-category">Last 7 Days</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-success"></i> Sales
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated just now
              </div>
            </template>
          </chart-card>
        </div>

        <!-- Customer Feedback Trend -->
        <div class="col-md-4">
          <chart-card :chart-data="feedbackTrend.data" chart-type="Line">
            <template slot="header">
              <h4 class="card-title">Customer Feedback</h4>
              <p class="card-category">Last 7 Days</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Positive
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

      <!-- Product Distribution Pie Chart -->
      <div class="row">
        <div class="col-md-6">
          <chart-card :chart-data="productDistribution.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Product Distribution</h4>
              <p class="card-category">Percentage Distribution</p>
            </template>
            <template slot="footer">
              <div class="stats">
                <i class="fa fa-history"></i> Updated just now
              </div>
            </template>
          </chart-card>
        </div>

        <!-- Task Management -->
        <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Pending Tasks</h5>
              <p class="category">Vendor's backend tasks</p>
            </template>
            <l-table :data="taskData.data"
                     :columns="taskData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
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
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove Task',
        salesTrend: {
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
              [120, 150, 170, 200, 250, 300, 350]
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
                labelInterpolationFnc (value) {
                  return value[0]
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
            {title: 'Review Product Listings', checked: false},
            {title: 'Approve Pending Orders', checked: true},
            {title: 'Update Pricing', checked: false},
            {title: 'Check Inventory', checked: false}
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    letter-spacing: 1px;
  }

  .card-category {
    font-size: 14px;
    color: #777;
    font-weight: 500;
  }

  .legend {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .footer {
    margin-top: 10px;
  }

  .legend i {
    margin-right: 5px;
  }

  .stats {
    font-size: 12px;
    color: #666;
  }

  .stats i {
    margin-right: 5px;
  }
</style>
