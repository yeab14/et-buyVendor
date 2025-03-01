<template>
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
            <td class="name-cell">
              <img :src="product.image" alt="Product Image" class="product-image" />
              {{ product.name }}
            </td>
            <td>{{ product.category }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span :class="['status', product.status.toLowerCase().replace(' ', '-')]" >
                {{ product.status }}
              </span>
            </td>
            <td>
              <button class="btn btn-warning btn-action" @click="$emit('edit', product.id)">Edit</button>
              <button class="btn btn-danger btn-action ml-2" @click="$emit('delete', product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            id: 1,
            name: "Smartphone",
            category: "Electronics",
            price: 599.99,
            stock: 20,
            status: "Available",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 2,
            name: "Laptop",
            category: "Computers",
            price: 999.99,
            stock: 0,
            status: "OutofStock",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 3,
            name: "Wireless Headphones",
            category: "Accessories",
            price: 199.99,
            stock: 15,
            status: "Available",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 4,
            name: "Smartwatch",
            category: "Wearables",
            price: 299.99,
            stock: 5,
            status: "Low Stock",
            image: "https://via.placeholder.com/40"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
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
  
  .name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .product-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
  }

  /* Status Styling */
  .status {
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
    text-align: center;
  }

  .status.available {
    background-color: #28a745;
    color: white;
  }

  .status.outofstock {
    background-color: #dc3545;
    color: white;
  }

  .status.low-stock {
    background-color: #ffc107;
    color: black;
  }
  </style>
