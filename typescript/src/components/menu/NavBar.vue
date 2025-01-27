<template>
  <nav class="navbar">
    <router-link to="/textareas" class="nav-btn">Text Areas</router-link>
    <router-link to="/cards" class="nav-btn">Cards</router-link>
    <router-link to="/tables" class="nav-btn">Tables</router-link>
    <!-- <router-link to="/charts" class="nav-btn">Charts</router-link> -->
    <router-link to="/todo-list" class="nav-btn">Todo List</router-link>
    <router-link to="/shop-now" class="nav-btn">Shop Now</router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'NavBar',
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  background-color: #1f2937;
  padding: 0.18rem;
}

.nav-btn {
  color: white;
  padding: 1rem 1rem;
  border-radius: 0.285rem;
  transition: background-color 0.2s ease;
}

.nav-btn:hover {
  background-color: #2563eb;
}
</style>
