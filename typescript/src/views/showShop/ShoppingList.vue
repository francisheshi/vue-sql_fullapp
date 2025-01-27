<template>
  <div>
    <!-- Header Section -->
    <header class="header">
      <h1>Shopping List</h1>
    </header>
    <button class="add-product-card" @click="toggleCreateProduct">
      <span class="icon">{{ isVisible ? '-' : '+' }}</span>
    </button>

    <AddProduct @add-product="addProduct" @update-product="updateProduct" v-show="isVisible" />

    <div class="product-container">
      <div v-if="!products.length">No products added yet!</div>

      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="openProductDetails(product.id)"
      >
        <div class="card-header">
          <h3>{{ product.name }}</h3>
          <span class="quantity">Quantity: {{ product.quantity }}</span>
        </div>
        <div class="card-body">
          <p class="description">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddProduct from '@/components/AddProduct.vue'
import { useProductStore, Product } from '@/stores/prodStore'
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShoppingList',
  components: {
    AddProduct,
  },
  data() {
    const productStore = useProductStore()
    return {
      productStore,
      products: [] as Product[], // Local copy of products
      selectedProduct: null as Product | null,
      isVisible: false,
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products')
        this.productStore.setProducts(response.data) // Sync data with store
        this.products = this.productStore.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    toggleCreateProduct() {
      this.isVisible = !this.isVisible
    },
    openProductDetails(id: number) {
      this.$router.push(`/product/${id}`)
    },
    async addProduct(newProduct: Product) {
      try {
        const response = await axios.post('http://localhost:5000/api/products', newProduct)
        this.productStore.addProduct(response.data)
        this.products.push(response.data)
      } catch (error) {
        console.error('Error creating product:', error.response?.data || error.message || error)
      }
    },
    async updateProduct(updatedProduct: Product) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${updatedProduct.id}`,
          updatedProduct,
        )
        const updatedData = response.data as Product
        this.productStore.updateProduct(updatedData)
        const index = this.products.findIndex((p) => p.id === updatedProduct.id)
        if (index !== -1) {
          this.products[index] = updatedData
        }
        this.selectedProduct = updatedData
        this.isVisible = false
        this.notifyUser('Product updated successfully!')
      } catch (error) {
        console.error('Error updating product:', error)
        this.notifyUser('Failed to update product. Please try again.')
      }
    },
  },
  async deleteProduct(product: Product) {
    try {
      // Make the DELETE request to the server to delete the product
      await axios.delete(`http://localhost:5000/api/products/${product.id}`)

      if (Array.isArray(this.products)) {
        this.products = this.products.filter((p) => p.id !== product.id)
      } else {
        console.error('Products state is not an array:', this.products)
      }

      console.log(`Product ${product.id} deleted successfully`)
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message)
    }
  },
  created() {
    this.fetchProducts()
  },
})
</script>

<style scoped>
.header {
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
  justify-content: center;
  padding: 10px 0;
  display: flex;
}
.add-product-card {
  justify-content: center;
  background: #007bff;
  align-items: center;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  color: #fff;
  display: flex;
  height: 50px;
  border: none;
  width: 50px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}
.icon {
  transform-origin: center;
  display: flex;
  font-weight: bold;
  font-size: 32px;
  line-height: 1;
}
.add-product-card:hover {
  transform: rotate(90deg) scale(1.15);
  background-color: #0056b3;
}
.add-product-card:active {
  transform: scale(1.1);
  background-color: #f0f0f0;
}
.product-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  display: grid;
  padding: 20px;
  gap: 20px;
}
.product-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #fff;
  border-radius: 8px;
}
.product-card:hover {
  transform: translateY(-10px);
}
.card-header {
  background-color: #007bff;
  padding: 15px;
  color: #fff;
}
.card-header h3 {
  margin: 0;
}
.quantity {
  font-weight: bold;
  font-size: 14px;
}
.card-body {
  padding: 15px;
}
.description {
  font-size: 16px;
  color: #333;
}
</style>
