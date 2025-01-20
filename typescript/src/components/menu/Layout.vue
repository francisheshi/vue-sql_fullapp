<template>
  <div class="app-container">
    <nav class="navbar">
      <NavBar />
    </nav>

    <div class="main-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppLayout',
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.navbar {
  width: 100%;
  background-color: #1f2937;
  color: white;
  text-align: center;
}

.main-container {
  flex: 2;
  margin-left: 0;
  padding: 20px 20px;
  background-color: #f3f4f6;
  padding-top: 50px;
}

@media (min-width: 768px) {
  .main-container {
    margin-left: 256px;
  }
}
</style>
