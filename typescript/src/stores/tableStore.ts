import { defineStore } from 'pinia'
import { ref } from 'vue'

interface RowData {
  [key: string]: string | number | null
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
