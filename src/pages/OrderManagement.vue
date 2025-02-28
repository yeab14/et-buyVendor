<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Order Management</h4>
              <p class="card-category">Manage and track orders effectively</p>
            </template>

            <div class="nav-tabs-container">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="order-list-tab" data-toggle="tab" href="#order-list" role="tab">Order List</a>
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link" id="add-order-tab" data-toggle="tab" href="#add-order" role="tab">Add Order</a>
                </li> -->
                <li class="nav-item">
                  <a class="nav-link" id="actions-tab" data-toggle="tab" href="#actions" role="tab">Other Actions</a>
                </li>
              </ul>
              <div class="tab-content mt-3">
                <!-- Order List Tab -->
                <div class="tab-pane fade show active" id="order-list" role="tabpanel">
                  <div class="order-table">
                    <p>Total Orders: {{ orders.length }}</p>
                    <table class="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th class="text-center">Order ID</th>
                          <th class="text-center">Customer</th>
                          <th class="text-center">Status</th>
                          <th class="text-center">Total Price</th>
                          <th class="text-center">Date</th>
                          <th class="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" :key="order.id">
                          <td>{{ order.id }}</td>
                          <td>{{ order.customer }}</td>
                          <td>
                            <span :class="['status', order.status]">{{ order.status }}</span>
                          </td>
                          <td>${{ order.totalPrice }}</td>
                          <td>{{ order.date }}</td>
                          <td>
                            <button class="btn btn-warning btn-action" @click="editOrder(order.id)">Edit</button>
                            <button class="btn btn-danger btn-action ml-2" @click="deleteOrder(order.id)">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Add Order Tab -->
                <div class="tab-pane fade" id="add-order" role="tabpanel">
                  <div class="add-order-form">
                    <form @submit.prevent="addOrder">
                      <div class="form-group">
                        <label for="orderId">Order ID</label>
                        <input type="text" id="orderId" v-model="newOrder.id" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="customer">Customer</label>
                        <input type="text" id="customer" v-model="newOrder.customer" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="totalPrice">Total Price</label>
                        <input type="number" id="totalPrice" v-model="newOrder.totalPrice" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="status">Order Status</label>
                        <select v-model="newOrder.status" id="status" class="form-control" required>
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="orderDate">Order Date</label>
                        <input type="date" id="orderDate" v-model="newOrder.date" class="form-control" required />
                      </div>
                      <button type="submit" class="btn btn-success">Add Order</button>
                    </form>
                  </div>
                </div>

                <!-- Other Actions Tab -->
                <div class="tab-pane fade" id="actions" role="tabpanel">
                  <div class="other-actions">
                    <button class="btn btn-info">Bulk Update</button>
                    <button class="btn btn-secondary">Export to CSV</button>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data() {
      return {
        orders: [
          { id: 101, customer: 'John Doe', status: 'Pending', totalPrice: 150, date: '2025-02-28' },
          { id: 102, customer: 'Jane Smith', status: 'Shipped', totalPrice: 250, date: '2025-02-27' },
        ],
        newOrder: { id: '', customer: '', totalPrice: 0, status: 'Pending', date: '' },
        editingOrder: null
      };
    },
    methods: {
      addOrder() {
        this.orders.push({ ...this.newOrder });
        this.newOrder = { id: '', customer: '', totalPrice: 0, status: 'Pending', date: '' };
      },
      editOrder(id) {
        this.editingOrder = this.orders.find(order => order.id === id);
      },
      deleteOrder(id) {
        this.orders = this.orders.filter(order => order.id !== id);
      }
    }
  };
</script>

<style scoped>
  .nav-tabs-container {
    margin-bottom: 20px;
  }

  .nav-tabs .nav-link {
    font-size: 13px;
    padding: 8px 20px;
    border-radius: 0;
    margin-right: 10px;
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent;
  }

  .nav-tabs .nav-link.active {
    color: white;
    background-color: #ee5858;
    border: 2px solid #ee5858;
  }

  .nav-tabs .nav-link:hover {
    color: white;
    background-color: #ee5858;
    border: 2px solid #ee5858;
  }

  .order-table {
    margin-top: 20px;
  }

  .status {
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .status.Pending {
    background-color: #ffc107;
    color: white;
  }

  .status.Shipped {
    background-color: #007bff;
    color: white;
  }

  .status.Delivered {
    background-color: #28a745;
    color: white;
  }

  .status.Cancelled {
    background-color: #dc3545;
    color: white;
  }

  .table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 12px;
  }

  .table th, .table td {
    text-align: center;
    padding: 5px 10px;
    word-wrap: break-word;
    overflow: hidden;
  }

  .table th {
    background-color: #f8f9fa;
    font-weight: 700;
    font-size: 14px;
  }

  .table td {
    font-size: 12px;
  }

  .table tbody {
    display: block;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .table thead, .table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  
  .table th, .table td {
    width: 14%;
    text-align: left; 
  }
  
  .table tbody tr td {
    padding: 5px 10px;
  }
  

  .btn-action {
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .btn-warning, .btn-danger {
    padding: 6px 12px;
  }

  .container-fluid {
    padding-left: 10px;
    padding-right: 10px;
  }

  .add-order-form {
    margin-top: 20px;
  }

  .add-order-form .form-group {
    margin-bottom: 20px;
  }

  .other-actions {
    margin-top: 20px;
  }

  .other-actions button {
    margin-right: 15px;
    border-radius: 4px;
    padding: 12px 30px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .other-actions button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
</style>
