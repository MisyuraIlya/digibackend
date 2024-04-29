import { create } from 'zustand'
import { AdminClinetsService } from '../services/clients.service'
import { HydraHandler } from '../../../helpers/hydraHandler'

interface useClientStoreState {
  loading: boolean
  clients: IUser[]
  totalClients: number
  hydraPagination: hydraPagination
  search: string
  selectedAgent: null | IUser
}

interface useClientStoreActions {
  createClient: (user: IUser) => Promise<void>
  setSearch: (value: string) => void
  setPage: (page: string) => void
  setSelectedAgent: (item: IUser | null) => void
  setSWR: (UsersResponse: UsersResponse) => void
}

export const useClientStore = create<
  useClientStoreState & useClientStoreActions
>((set, get) => ({
  loading: false,
  clients: [],
  search: '',
  setSearch: (value: string) => set({ search: value }),
  setSWR: (response) => {
    const paginationHydra = HydraHandler.paginationHandler(response)
    set({
      hydraPagination: paginationHydra,
      clients: response['hydra:member'],
      totalClients: response['hydra:totalItems'],
    })
  },

  createClient: async (user: IUser) => {
    set({ loading: true })
    try {
      const response = await AdminClinetsService.createClient(user)
    } catch (e) {
      console.log('[error]', e)
    } finally {
      set({ loading: false })
    }
  },
  totalClients: 0,
  setPage: (page: string) => {
    set((state) => ({
      hydraPagination: {
        ...state.hydraPagination,
        page: page,
      },
    }))
  },
  selectedAgent: null,
  setSelectedAgent: (item: IUser | null) => set({ selectedAgent: item }),
  hydraPagination: {
    totalPages: '1',
    page: '1',
    lastPage: '1',
    nextPage: '1',
    previous: '1',
  },
}))
