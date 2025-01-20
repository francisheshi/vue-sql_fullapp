<template>
  <div class="overflow-x-auto m-20">
    <h1 class="title">Core Table</h1>
    <button @click="toggleCollapse" class="expand-btn">
      {{ isOpen ? 'Hide' : 'Expand' }}
    </button>

    <div v-show="isOpen">
      <div v-if="loading">Loading data...</div>
      <table class="table-container">
        <thead>
          <tr class="bg-gray-200 text-red-500">
            <!-- Bind headers from the store -->
            <th v-for="(header, index) in tableDataStore.headers" :key="index" class="table-header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Bind rows from the store -->
          <tr v-for="(row, rowIndex) in tableDataStore.rows" :key="rowIndex" class="table-row">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="table-cell">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import axios from 'axios'
import { useTableStore } from '@/stores/tableStore'

export interface ApiResponse {
  headers: string[]
  rows: string[][]
}

export default defineComponent({
  name: 'DataTable',
  props: {
    headers: {
      type: Array as PropType<{ headers: string }[]>, // Define the type for headers as an array of RowData
      required: true,
    },
    rows: {
      type: Array as PropType<{ rows: string }[]>, // Define the type for headers as an array of RowData
      required: true,
    },
  },
  data() {
    const tableDataStore = useTableStore()
    return {
      error: null as string | null,
      localHeaders: [] as string[],
      localRows: [] as string[][],
      tableDataStore,
      isOpen: false,
      loading: true,
    }
  },
  methods: {
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
    async fetchTableData() {
      try {
        const response = await axios.get('http://localhost:5000/api/tableData')
        this.tableDataStore.setTableData(response.data)
        this.loading = false
      } catch (error) {
        console.error('Error fetching table data:', error.toJSON())
        this.loading = false
      }
    },
  },
  created() {
    this.fetchTableData()
  },
})
</script>

<style scoped>
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
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.table-container {
  width: 100%;
  background-color: white;
  border: 1px solid #131416;
}
.table-header {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 1.015rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #b62d5b;
  background-color: #3ecab3;
  border: 1px solid #0d1629;
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
  padding: 0.75rem 1.5rem;
  font-size: 0.975rem;
  color: #9e3a13;
  background-color: #1ab31a;
  border: 1px solid #031538;
  white-space: nowrap;
  transition: background-color 0.5s ease-in-out;
}
.table-cell:hover {
  animation: backgroundChange 2s ease-in-out infinite;
}
.table-cell:active {
  background-color: #3f9b93;
}
</style>
