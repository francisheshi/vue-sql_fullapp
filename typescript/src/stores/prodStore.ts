import { defineStore } from 'pinia'

export interface Product {
  description: string
  quantity: number
  name: string
  id: number
}

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    addProduct(product: Product) {
      if (product && product.id && product.name) {
        this.products.push(product)
      } else {
        console.error('Invalid product:', product)
      }
    },
    setProducts(products: Product[]) {
      this.products = products
    },
    updateProduct(updatedProduct: Product) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products[index] = updatedProduct
      }
    },
  },
})
