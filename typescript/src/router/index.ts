import { createRouter, createWebHistory } from 'vue-router'

// Import components
import Table from '../views/table/DataTable.vue'
import OpenCards from '../views/cards/OpenCards.vue'
import TextArea from '../views/textarea/TextArea.vue'
import TodoList from '@/views/lists/TodoList.vue'
import ShoppingList from '@/views/showShop/ShoppingList.vue'
import AddProduct from '@/components/AddProduct.vue'
import ProductDetails from '@/components/ProductDetails.vue'
// import ChartNow from '@/views/charts/ChartNow.vue'

// Define routes
const routes = [
  { path: '/tables', name: 'DataTable', component: Table },
  { path: '/textareas', name: 'TextArea', component: TextArea },
  { path: '/cards', name: 'OpenCards', component: OpenCards },
  { path: '/todo-list', name: 'TodoList', component: TodoList },
  { path: '/shop-now', name: 'ShoppingList', component: ShoppingList }, // Correct route name
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  // { path: '/charts', name: 'ChartNow', component: ChartNow },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: (route) => ({ id: Number(route.params.id) }),
  },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
