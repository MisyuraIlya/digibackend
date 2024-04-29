import { create } from 'zustand'

interface useCatalogState {
  listView: boolean
  setListView: (value: boolean) => void

  prodsPerPage: string
  setProdsPerPage: (number: string) => void

  sortProdSetting: { value: string; label: string }
  setSortProdSetting: (value: string, label: string) => void
}

export const useCatalog = create<useCatalogState>((set, get) => ({
  listView: false,
  setListView: (value: boolean) => set({ listView: value }),

  prodsPerPage: '24',
  setProdsPerPage: (prodsPerPage) => set({ prodsPerPage }),

  sortProdSetting: { value: '1', label: 'שם' },
  setSortProdSetting: (value: string, label: string) =>
    set({ sortProdSetting: { value: value, label: label } }),
}))
