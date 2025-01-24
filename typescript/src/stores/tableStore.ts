import { defineStore } from 'pinia'
import { ref } from 'vue'

interface RowData {
  name: string
  age: number
  email: string
  address: string
}

interface TableData {
  headers: string[]
  rows: RowData[]
}

export const useTableStore = defineStore('tableStore', () => {
  const headers = ref<string[]>([])
  const rows = ref<RowData[]>([])

  const setTableData = (data: TableData) => {
    headers.value = data.headers
    rows.value = data.rows
  }

  return {
    headers,
    rows,
    setTableData,
  }
})
