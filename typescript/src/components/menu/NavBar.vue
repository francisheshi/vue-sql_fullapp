<template>
  <nav class="navbar">
    <router-link to="/textareas" class="nav-btn">Text Areas</router-link>
    <router-link to="/cards" class="nav-btn">Cards</router-link>
    <router-link to="/tables" class="nav-btn">Tables</router-link>
    <router-link to="/todo-list" class="nav-btn">Todo List</router-link>
    <router-link to="/shop-now" class="nav-btn">Shop Now</router-link>

    <div class="sign-auth">
      <div v-if="isLoggedIn">
        <span class="username">{{ authStore.username }}</span>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
      <div v-else>
        <router-link to="/register" class="register-btn">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const isLoggedIn = computed(() => authStore.token !== null)

    const handleLogout = () => {
      authStore.logout()
      router.push('/signin')
    }

    return { authStore, isLoggedIn, handleLogout }
  },
}
</script>

<style scoped>
.navbar {
  justify-content: flex-start;
  background-color: #1f2937;
  padding: 0.18rem;
  display: flex;
}

.nav-btn {
  transition: background-color 0.2s ease;
  border-radius: 0.285rem;
  padding: 1rem 1rem;
  color: white;
}

.nav-btn:hover {
  background-color: #2563eb;
}

.sign-auth {
  justify-content: flex-end;
  display: flex;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.logout-btn,
.register-btn {
  background-color: #f0a500;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: white;
  display: flex;
  border: none;
}

.logout-btn:hover,
.register-btn:hover {
  background-color: #e68900;
}
</style>
