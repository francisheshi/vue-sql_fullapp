<template>
  <div class="add-product-container">
    <h1>Add a New Product</h1>
    <form @submit.prevent="submitProduct">
      <label for="product-name">Product Name:</label>
      <input
        placeholder="Enter product name"
        id="product-name"
        v-model="name"
        type="text"
        required
      />

      <label for="quantity">Quantity:</label>
      <input
        placeholder="Enter quantity"
        v-model.number="quantity"
        type="number"
        id="quantity"
        required
      />

      <label for="description">Description:</label>
      <textarea
        placeholder="Enter product description"
        v-model="description"
        id="description"
      ></textarea>

      <button type="button" @click="submitProduct()">Add Product</button>
    </form>
  </div>
</template>

<script lang="ts">
// import {useProductStore} from '@/stores/prodStore'

export default {
  name: 'AddProduct',
  data() {
    return {
      description: '',
      quantity: 0,
      name: '',
    }
  },
  methods: {
    submitProduct() {
      const newProduct = {
        description: this.description,
        quantity: this.quantity,
        name: this.name,
        id: Date.now(),
      }

      if (this.name && this.quantity > 0 && this.description) {
        this.$emit('add-product', newProduct)
      } else {
        alert('All fields are required, and quantity must be greater than 0.')
      }

      this.name = ''
      this.description = ''
      this.quantity = 0
    },
  },
}
</script>

<style scoped>
.add-product-container {
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

form {
  flex-direction: column;
  display: flex;
}

input,
textarea,
button {
  margin-bottom: 15px;
  font-size: 16px;
  padding: 10px;
}

button {
  transition: background-color 0.3s ease;
  background-color: #007bff;
  cursor: pointer;
  color: #fff;
  border: none;
}

button:hover {
  background-color: #0056b3;
}
</style>
