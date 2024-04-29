import { create } from 'zustand'

interface DocumentsStore {
  //========== CALENDAR ===============
  currentDate: Date
  setCurrentDate: (currentDate: Date) => void
  showCalendar: boolean
  setShowCalendar: (bool: boolean) => void
  type: 'from' | 'to'
  handleCalendar: (value: 'from' | 'to', date: Date) => void
  //===================================
}

export const useDocuments = create<DocumentsStore>((set, get) => ({
  loading: false,

  //========== CALENDAR ===============
  currentDate: new Date(),
  setCurrentDate: (value) => set({ currentDate: value }),
  showCalendar: false,
  setShowCalendar: (bool: boolean) => set({ showCalendar: bool }),
  type: 'from',
  handleCalendar: (type: 'from' | 'to', date) => {
    set({
      currentDate: date,
      type,
      showCalendar: !get().showCalendar,
    })
  },
  //===================================
}))
