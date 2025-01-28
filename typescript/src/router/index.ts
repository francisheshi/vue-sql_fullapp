/* Store & router Management */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

/* Components Management */
import ShoppingList from '@/views/showShop/ShoppingList.vue'
import ProductDetails from '@/components/ProductDetails.vue'
import SignUp from '@/views/authentication/SignUp.vue'
import SignIn from '@/views/authentication/SignIn.vue'
import TextArea from '../views/textarea/TextArea.vue'
import OpenCards from '../views/cards/OpenCards.vue'
import AddProduct from '@/components/AddProduct.vue'
import TodoList from '@/views/lists/TodoList.vue'
import Table from '../views/table/DataTable.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/signup' },
  { path: '/register', name: 'SignUp', component: SignUp },
  { path: '/signin', name: 'SignIn', component: SignIn },
  {
    path: '/shop-now',
    name: 'ShoppingList',
    component: ShoppingList,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (!authStore.token) {
        next('/signin')
      } else {
        next()
      }
    },
  },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  { path: '/textareas', name: 'TextArea', component: TextArea },
  { path: '/todo-list', name: 'TodoList', component: TodoList },
  { path: '/cards', name: 'OpenCards', component: OpenCards },
  { path: '/tables', name: 'DataTable', component: Table },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: (route) => ({ id: Number(route.params.id) }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // const isAuthenticated = localStorage.getItem('token')
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/signin')
  } else {
    next()
  }
})

export default router
