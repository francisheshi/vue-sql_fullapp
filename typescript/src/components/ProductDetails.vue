<template>
  <div class="product-details-modal">
    <div class="name-header">
      <h2>
        {{ product?.name || 'Product Details' }}
      </h2>

      <button class="delete-btn" @click="deleteProduct(product)">
        <span class="material-icons">🗑️</span>
      </button>
    </div>

    <div class="content">
      <div class="name-content">
        <label for="edit-name">Name:</label>
        <div
          id="edit-name"
          @input="updateField('name', $event)"
          :class="{ editable: isEditing }"
          :contenteditable="isEditing"
        >
          {{ product.name }}
        </div>
      </div>

      <br />

      <div class="quantity-content">
        <label for="edit-quantity">Quantity:</label>
        <div
          id="edit-quantity"
          @input="updateField('quantity', $event)"
          :class="{ editable: isEditing }"
          :contenteditable="isEditing"
        >
          {{ product.quantity }}
        </div>
      </div>

      <br />

      <div class="description-content">
        <label for="edit-description">Description:</label>
        <div
          @input="updateField('description', $event)"
          :class="{ editable: isEditing }"
          :contenteditable="isEditing"
          id="edit-description"
        >
          {{ product.description }}
        </div>
      </div>
    </div>

    <div class="buttons">
      <button v-if="!isEditing" @click="enableEditing">Edit</button>
      <button v-else @click="saveChanges">Save</button>

      <button @click="cancelEdit">Cancel</button>
      <button @click="cancelEdit">Display</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useProductStore } from '@/stores/prodStore'
import type { Product } from '@/stores/prodStore'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'ProductDetails',
  data() {
    const route = useRoute()
    const productId = Number(route.params.id)
    const productStore = useProductStore()
    const foundProduct = productStore.products.find((p: Product) => p.id === productId)

    return {
      product: foundProduct
        ? { ...foundProduct }
        : { id: productId, name: '', quantity: 1, description: '' },
      isEditing: false,
      productStore,
    }
  },
  methods: {
    enableEditing() {
      this.isEditing = true
    },
    updateField(field: string, event: Event) {
      const target = event.target as HTMLDivElement
      const value = target.textContent || ''
      if (field === 'quantity') {
        const numericValue = Number(value)
        if (!isNaN(numericValue)) {
          this.product.quantity = numericValue
        }
      } else if (field === 'name' || field === 'description') {
        this.product[field] = value.trim()
      }
    },
    async updateProduct(updatedProduct: Product) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${updatedProduct.id}`,
          {
            name: updatedProduct.name,
            description: updatedProduct.description,
            quantity: updatedProduct.quantity,
          },
        )

        const updatedData = response.data
        this.productStore.updateProduct(updatedData)
        this.product = updatedData
        this.isEditing = false
      } catch (error) {
        console.error('Error updating product:', error)
      }
    },
    saveChanges() {
      if (
        this.product &&
        typeof this.product.id === 'number' &&
        this.product.quantity > 0 &&
        this.product.description &&
        this.product.name
      ) {
        this.updateProduct(this.product as Product)
      } else {
        alert('Please fill in all fields before saving.')
      }
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
    cancelEdit() {
      this.$router.push('/shop-now')
      const originalProduct = this.productStore.products.find((p) => p.id === this.product.id)
      if (originalProduct) {
        this.product = { ...originalProduct }
      }
    },
  },
}
</script>

<style scoped>
.product-details-modal {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  position: fixed;
  padding: 2.25%;
  left: 50%;
  top: 50%;
}
.name-header {
  justify-content: space-between;
  display: flex;
}
h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}
.content label {
  font-weight: bold;
}
.content div {
  transition: border-color 0.2s ease;
  border: 1px solid transparent;
  padding: 5px;
}
.content div.editable {
  border: 1px solid #007bff;
  background-color: #f9f9f9;
  cursor: text;
}
.content div.editable:focus {
  outline: none;
}
.name-content,
.quantity-content {
  display: grid;
}
.description-content {
  margin-bottom: 10px;
  display: grid;
}
.buttons {
  display: flex;
  gap: 10px;
}
.buttons button {
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}
.buttons button:hover {
  opacity: 1.1;
}
button:nth-child(1) {
  background-color: #007bff;
  color: white;
}
button:nth-child(2) {
  background-color: #dc3545;
  color: white;
}
button:nth-child(3) {
  background-color: #28a745;
  color: white;
}
.delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  color: red;
  transition:
    transform 0.2s ease-in-out,
    color 0.3s;
}
.delete-btn:hover {
  transform: scale(1.05);
}
.material-icons {
  animation: shake 0.5s infinite alternate ease-in-out;
}
</style>
