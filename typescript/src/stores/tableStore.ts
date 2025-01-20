import { defineStore } from 'pinia'

// In your store definition
export interface TableStoreData {
  headers: string[]
  rows: string[][]
}

export const useTableStore = defineStore({
  id: 'tableStore',
  state: (): TableStoreData => ({
    headers: [],
    rows: [],
  }),
  actions: {
    setTableData(data: TableStoreData) {
      this.headers = data.headers
      this.rows = data.rows
    },
  },
})
