<template>
  <div class="overflow-x-auto m-20">
    <h1 class="title">Core Card Details</h1>
    <button @click="toggleCollapse" class="expand-btn">
      {{ isOpen ? 'Hide' : 'Expand' }}
    </button>

    <div v-if="isOpen">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">User Dataset</h2>
          <button @click="clearAll" class="clear-btn">Clear All</button>
        </div>
        <div class="card-content">
          <label for="textInput" class="input-label">Full Name:</label>
          <input
            type="text"
            id="textInput"
            v-model="inputText"
            class="text-input"
            placeholder="Write your fullname ..."
          />

          <fieldset class="checkbox-group">
            <legend>Genders:</legend>
            <div v-for="(gender, index) in genders" :key="index" class="checkbox-item">
              <label>
                <input type="checkbox" v-model="selectedGenders" :value="gender" class="checkbox" />
                {{ gender }}
              </label>
            </div>
          </fieldset>

          <div class="summary" :class="{ 'selected-background': selectedGenders.length > 0 }">
            <p><strong>Selected Gender:</strong> {{ selectedGenders.join(', ') || 'None' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OpenCards',
  data() {
    return {
      isOpen: false,
      inputText: '',
      genders: ['Female', 'Male', 'Other'],
      selectedGenders: [],
    }
  },
  methods: {
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
    clearAll() {
      this.inputText = ''
      this.selectedGenders = []
    },
  },
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 320px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 12px;
}
.input-label {
  font-size: 1.01rem;
  margin-bottom: 4px;
}
.text-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.01rem;
}
.checkbox-group {
  margin-top: 12px;
  font-size: 1.025rem;
}
.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.checkbox {
  margin-right: 8px;
}
.summary {
  margin-top: 12px;
  font-size: 1.125rem;
}
.selected-background {
  background-color: #59aa7f;
}
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
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
.clear-btn {
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1.4rem;
  margin-top: 1.42rem;
  transition: background-color 0.2s;
}
.clear-btn:hover {
  background-color: #dc2626;
}
</style>
