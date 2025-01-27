<template>
  <div class="app-container">
    <h1>Vue-Storage Datacollection</h1>
    <nav class="navbar">
      <Navbar />
    </nav>

    <main class="main-content">
      <router-view ref="myTable" :="tableData" :items-per-page="10" class="elevation-1" />
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from './components/menu/NavBar.vue'

export default {
  name: 'AppLayout',
  components: {
    Navbar,
  },
  data() {
    return {
      tableData: [],
    }
  },
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.navbar {
  width: 100%;
  background-color: #1f2937;
  color: white;
  text-align: center;
}
.main-content {
  flex: 1;
  padding: 1.35rem;
  background-color: #f3f4f6;
}
</style>
