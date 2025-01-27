<template>
  <div class="overflow-x-auto m-20">
    <h1 class="title">Core Table</h1>
    <button @click="toggleCollapse" class="expand-btn">
      {{ isOpen ? 'Hide' : 'Expand' }}
    </button>

    <div v-show="isOpen">
      <template v-if="tableData.rows && tableData.rows.length">
        <v-data-table class="table-container">
          <thead>
            <tr class="bg-gray-200 text-red-500">
              <th class="table-header">NAME</th>
              <th class="table-header">AGE</th>
              <th class="table-header">EMAIL</th>
              <th class="table-header">ADDRESS</th>
              <th class="table-header">PROFESSION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableData.rows" :key="rowIndex" class="table-row">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="table-cell">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </v-data-table>

        <!-- <ChartNow :tableData="tableData" /> -->
      </template>
      <p v-else>No data available</p>
    </div>
  </div>
</template>

<script lang="ts">
// import ChartNow from '../charts/ChartNow.vue'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'

interface TableData {
  headers: string[]
  rows: string[][]
}

export default defineComponent({
  name: 'DataTable',
  // components: {
  //   ChartNow,
  // },
  data() {
    return {
      isOpen: false,
      tableData: {
        headers: [],
        rows: [],
      },
    }
  },
  methods: {
    async fetchTableData() {
      try {
        const response = await axios.get<TableData>('/api/table-data')

        if (response.data) {
          console.log('Fetched table data:', response.data)
        }
        this.tableData.headers = response.data
        this.tableData.rows = response.data
      } catch (error) {
        console.error('Error fetching table data:', error)
      }
    },
    toggleCollapse() {
      this.isOpen = !this.isOpen
    },
  },
  computed: {
    ...mapGetters({
      dataTable: 'dataTable',
    }),
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
