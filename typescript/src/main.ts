import { createApp } from 'vue'
import App from '@/App.vue'
import NavBar from '@/components/menu/NavBar.vue'
import DataTable from '@/views/table/DataTable.vue'
import TextArea from '@/views/textarea/TextArea.vue'
import Cards from '@/views/cards/OpenCards.vue'
import TodoList from '@/views/lists/TodoList.vue'
import ShoppingList from '@/views/showShop/ShoppingList.vue'
import AddProduct from '@/components/AddProduct.vue'
import '@/assets/tailwind.css'
import { createPinia } from 'pinia'
import router from '@/router/index'

const app = createApp(App)
const pinia = createPinia()

app.component('NavBar', NavBar)
app.component('DataTable', DataTable)
app.component('OpenCards', Cards)
app.component('TextArea', TextArea)
app.component('TodoList', TodoList)
app.component('shoppingList', ShoppingList)
app.component('addProduct', AddProduct)

app.use(router)
app.use(pinia)
app.mount('#app')
