<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Product Management</h4>
              <p class="card-category">Manage all aspects of product listings</p>
            </template>

            <div class="nav-tabs-container">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="product-list-tab" data-toggle="tab" href="#product-list" role="tab">Product List</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="add-product-tab" data-toggle="tab" href="#add-product" role="tab">Add Product</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="others-tab" data-toggle="tab" href="#others" role="tab">Other Actions</a>
                </li>
              </ul>
              <div class="tab-content mt-3">
                <div class="tab-pane fade show active" id="product-list" role="tabpanel">
                  <div class="product-table">
                    <p>Total Products: {{ products.length }}</p>
                    <table class="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th class="text-center">Product ID</th>
                          <th class="text-center">Name</th>
                          <th class="text-center">Category</th>
                          <th class="text-center">Price</th>
                          <th class="text-center">Stock</th>
                          <th class="text-center">Status</th>
                          <th class="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in products" :key="product.id">
                          <td>{{ product.id }}</td>
                          <td>{{ product.name }}</td>
                          <td>{{ product.category }}</td>
                          <td>${{ product.price }}</td>
                          <td>{{ product.stock }}</td>
                          <td>
                            <span :class="['status', product.status]">{{ product.status }}</span>
                          </td>
                          <td>
                            <button class="btn btn-warning btn-action" @click="editProduct(product.id)">Edit</button>
                            <button class="btn btn-danger btn-action ml-2" @click="deleteProduct(product.id)">Delete</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="tab-pane fade" id="add-product" role="tabpanel">
                  <div class="add-product-form">
                    <form @submit.prevent="addProduct">
                      <div class="form-group">
                        <label for="productName">Product Name</label>
                        <input type="text" id="productName" v-model="newProduct.name" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" id="category" v-model="newProduct.category" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" id="price" v-model="newProduct.price" class="form-control" required />
                      </div>
                      <div class="form-group">
                        <label for="stock">Stock Quantity</label>
                        <input type="number" id="stock" v-model="newProduct.stock" class="form-control" required />
                      </div>
                      <button type="submit" class="btn btn-success">Add Product</button>
                    </form>
                  </div>
                </div>

                <div class="tab-pane fade" id="others" role="tabpanel">
                  <div class="other-actions">
                    <button class="btn btn-info">Bulk Upload</button>
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
        products: [
          { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 50, status: 'Available' },
          { id: 2, name: 'Shirt', category: 'Clothing', price: 29, stock: 150, status: 'OutOfStock' },
        ],
        newProduct: { name: '', category: '', price: 0, stock: 0 },
        editingProduct: null
      };
    },
    methods: {
      addProduct() {
        this.products.push({ ...this.newProduct, id: Date.now(), status: 'Available' });
        this.newProduct = { name: '', category: '', price: 0, stock: 0 };
      },
      editProduct(id) {
        this.editingProduct = this.products.find(product => product.id === id);
      },
      deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
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

  .product-table {
    margin-top: 20px;
  }

  .status {
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .status.Available {
    background-color: #28a745;
    color: white;
  }

  .status.OutOfStock {
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

  .add-product-form {
    margin-top: 20px;
  }

  .add-product-form .form-group {
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
