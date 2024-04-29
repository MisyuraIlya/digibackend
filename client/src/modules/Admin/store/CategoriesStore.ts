import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAdminCategoriesState {
  search: string
  setSearch: (search: string) => void
}

export const useAdminCategories = create(
  persist(
    (set, get) => ({
      search: '',
      setSearch: (search: string) => {
        if (search) {
          // const filter = get().categories.filter((item) =>
          //   item.title.includes(search)
          // )
          // set({ categories: filter })
        } else {
          // set({ categories: get().rezervedCategrories })
        }
        set({ search })
      },
    }),
    {
      name: 'categories-admin-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAdminCategoriesState, useAdminCategoriesState>
  )
)
