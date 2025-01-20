<template>
  <div class="overflow-x-auto m-20">
    <h1 class="title">Core Table</h1>
    <button @click="toggleCollapse" class="expand-btn">
      {{ isOpen ? 'Hide' : 'Expand' }}
    </button>

    <div v-show="isOpen">
      <!-- <div v-if="!loading">Loading data...</div> -->
      <div v-show="!loading">
        <div v-if="!tableDataStore.rows || tableDataStore.rows.length === 0">No data available</div>

        <table
          class="table-container"
          v-show="tableDataStore.rows && tableDataStore.rows.length > 0"
        >
          <thead>
            <tr class="bg-gray-200 text-red-500">
              <th
                v-for="(header, index) in tableDataStore.headers"
                :key="index"
                class="table-header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableDataStore.rows" :key="rowIndex" class="table-row">
              <td class="table-cell">
                {{ row.name }}
              </td>
              <td class="table-cell">
                {{ row.age }}
              </td>
              <td class="table-cell">
                {{ row.email }}
              </td>
              <td class="table-cell">
                {{ row.address }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTableStore } from '@/stores/tableStore'
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'DataTable',
  data: () => ({
    error: null as string | null,
    tableDataStore: useTableStore(),
    loading: true,
    isOpen: false,
    headers: [],
    rows: [],
  }),
  methods: {
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
    async fetchTableData() {
      this.loading = true
      axios
        .get('http://localhost:5000/api/tableData')
        .then((response) => {
          this.loading = false
          this.tableDataStore = response.data
        })
        .catch((error) => console.log(error))
    },
  },
  mounted() {
    this.fetchTableData()
  },
})
</script>

<style scoped>
.expand-btn {
  transition: background-color 0.2s;
  background-color: #3b82f6;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  color: white;
}
.expand-btn:hover {
  background-color: #2563eb;
}
.title {
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
}
.table-container {
  border: 1px solid #131416;
  background-color: white;
  width: 100%;
}
.table-header {
  background-color: #3ecab3;
  border: 1px solid #0d1629;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  font-size: 1.015rem;
  text-align: left;
  font-weight: 600;
  color: #b62d5b;
}
.table-header:hover {
  animation: backgroundChange 2s ease-in-out infinite;
}
.table-header:active {
  background-color: #a5cf43;
}
.table-row:hover {
  background-color: #f9fafb;
}
@keyframes backgroundChange {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #458f61;
  }
  100% {
    background-color: #5dbeba;
  }
}
.table-cell {
  transition: background-color 0.5s ease-in-out;
  background-color: #1ab31a;
  border: 1px solid #031538;
  padding: 0.75rem 1.5rem;
  font-size: 0.975rem;
  white-space: nowrap;
  color: #9e3a13;
}
.table-cell:hover {
  animation: backgroundChange 2s ease-in-out infinite;
}
.table-cell:active {
  background-color: #3f9b93;
}
</style>
