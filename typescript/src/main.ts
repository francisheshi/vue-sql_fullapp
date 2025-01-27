import { createPinia } from 'pinia'
import router from '@/router/index'
import { createApp } from 'vue'
/* COMPONENT ROUTING */
import ShoppingList from '@/views/showShop/ShoppingList.vue'
import TextArea from '@/views/textarea/TextArea.vue'
import AddProduct from '@/components/AddProduct.vue'
import DataTable from '@/views/table/DataTable.vue'
import NavBar from '@/components/menu/NavBar.vue'
import TodoList from '@/views/lists/TodoList.vue'
import Cards from '@/views/cards/OpenCards.vue'
import App from '@/App.vue'
/* STYLIZATION */
// import { createTheme, ThemeProvider } from '@mui/material/styles'
import '@mui/material/styles/createTypography'

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
