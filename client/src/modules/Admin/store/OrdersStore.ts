import { create } from 'zustand'
import { AdminOrderService } from '../services/orders.service'
import { HydraHandler } from '../../../helpers/hydraHandler'
import moment from 'moment'

interface useAdminOrdersState {
  loading: boolean
  search: string
  setSearch: (value: string) => void
  orders: any[] // Change 'any[]' to the actual type of your orders
  getOrders: () => Promise<void>
  totalOrders: number
  setPage: (page: string) => void
  hydraPagination: hydraPagination
  dateFrom: Date
  setDateFrom: (value: Date) => void
  dateTo: Date
  setDateTo: (value: Date) => void
  setType: (value: string) => void
  setShowCalendar: (value: boolean) => void
  showCalendar: boolean
  type: string
  choosedDate: Date
  handleChangeCalendar: (date: Date) => void
  documentType: string
  setDocumentType: (type: string) => void
  items: any[] // Change 'any[]' to the actual type of your items
  getItems: (orderItem: any) => Promise<void> // Change 'any' to the actual type of your orderItem
}

export const useAdminOrders = create<useAdminOrdersState>((set, get) => ({
  loading: false,
  search: '',
  setSearch: (value) => set({ search: value }),
  orders: [],
  getOrders: async () => {
    const response = await AdminOrderService.getOrders(
      moment(get().dateFrom).format('YYYY-MM-DD'),
      moment(get().dateTo).format('YYYY-MM-DD'),
      get().hydraPagination.page,
      get().search
    )
    set({
      orders: response['hydra:member'],
      totalOrders: response['hydra:totalItems'],
    })
    const hydraPagination = HydraHandler.paginationHandler(response)
    set({ hydraPagination: hydraPagination })
  },
  totalOrders: 0,
  hydraPagination: {
    totalPages: '1',
    page: '1',
    lastPage: '1',
    nextPage: '1',
    previous: '1',
  },
  setPage: (page: string) => {
    set((state) => ({
      hydraPagination: {
        ...state.hydraPagination,
        page: page,
      },
    }))
  },
  dateFrom: new Date(),
  setDateFrom: (value) => {
    set({ dateFrom: value })
  },
  dateTo: new Date(),
  setDateTo: (value) => {
    set({ dateTo: value })
  },
  setType: (value) => set({ type: value, showCalendar: true }),
  setShowCalendar: (value) => set({ showCalendar: value }),
  showCalendar: false,
  type: '',
  choosedDate: new Date(),
  handleChangeCalendar: (date) => {
    if (get().type === 'from') {
      set({ dateFrom: date, showCalendar: false })
    }

    if (get().type === 'to') {
      set({ dateTo: date, showCalendar: false })
    }
  },
  documentType: '',
  setDocumentType: (type) => set({ documentType: type }),
  items: [],
  getItems: async (orderItem) => {
    try {
      set({ loading: true })
      const response = await AdminOrderService.getOrderItem(orderItem)
      set({ items: response['hydra:member'] })
    } catch (e) {
      console.log('[Error]', e)
    } finally {
      set({ loading: false })
    }
  },
}))
