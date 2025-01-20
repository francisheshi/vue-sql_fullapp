<template>
  <div class="overflow-x-auto m-20">
    <h1 class="title">Core Text Area</h1>
    <button @click="toggleCollapse" class="expand-btn">
      {{ isOpen ? 'Hide' : 'Expand' }}
    </button>

    <div v-if="isOpen" class="area-container">
      <h1>Pre-populated Text Area</h1>
      <textarea v-model="inputText" rows="4" cols="50" class="text-area"></textarea>

      <p>Current text in textarea:</p>
      <pre>{{ inputText }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TextArea',
  data() {
    return {
      isOpen: false,
      inputText: 'This is the initial content of the textarea.',
    }
  },
  methods: {
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.area-container {
  padding: 20px;
}
.text-area {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical; /* Allow user to resize the text area vertically */
}
.expand-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}
.expand-btn:hover {
  background-color: #2563eb;
}
</style>
