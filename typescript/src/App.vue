<template>
  <div class="app-container">
    <h1>Vue-Storage Datacollection</h1>
    <!-- Top Navbar -->
    <nav class="navbar">
      <Navbar />
    </nav>

    <!-- Page Content -->
    <main class="main-content">
      <router-view
        ref="myTable"
        :headers="headers"
        :rows="rows"
        :="tableData"
        :items-per-page="10"
        class="elevation-1"
      />
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
      headers: [
        { text: 'NAME', value: 'NAME' },
        { text: 'AGE', value: 'AGE' },
        { text: 'EMAIL', value: 'EMAIL' },
        { text: 'ADDRESS', value: 'ADDRESS' },
      ],
      rows: [
        { Name: 'John Doe', Age: 30, Email: 'johndoe@gmail.com', Address: '123 Main St' },
        { Name: 'Jane Smith', Age: 25, Email: 'janesmith@hotmail.com', Address: '456 Maple Ave' },
        { Name: 'Sam Wilson', Age: 28, Email: 'samwilson@gmail.com', Address: '789 Oak Dr' },
        {
          Name: 'Franci Sheshi',
          Age: 24,
          Email: 'francisheshi6@gmail.com',
          Address: 'Haxhi Sina, apartment 6/1',
        },
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
