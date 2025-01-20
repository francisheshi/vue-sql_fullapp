<template>
  <div class="app-container">
    <h1>Vue-Storage Datacollection</h1>
    <!-- Top Navbar -->
    <nav class="navbar">
      <Navbar />
    </nav>

    <!-- Page Content -->
    <main class="main-content">
      <router-view :headers="headers" :rows="tableRows" />
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
      headers: ['Name', 'Age', 'Email', 'Address'],
      tableRows: [
        ['John Doe', '30', 'johndoe@gmail.com', '123 Main St'],
        ['Jane Smith', '25', 'janesmith@hotmail.com', '456 Maple Ave'],
        ['Sam Wilson', '28', 'samwilson@gmail.com', '789 Oak Dr'],
        ['Franci Sheshi', '24', 'francisheshi6@gmail.com', 'Haxhi Sina, apartment 6/1'],
      ],
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
