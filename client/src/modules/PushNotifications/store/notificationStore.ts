import moment from 'moment'
import { create } from 'zustand'
import { NotificationsServices } from '../services/notifications.service'
import { onAsk } from '../../../shared/MySweetAlert'

interface NotificationStoreState {
  loading: boolean
  items: INotification[]
  setItems: (arr: INotification[]) => void
  choosedClients: any[]
  setChooseClient: (arr: [string]) => void
  selectRadio: string | number
  setSelectRadio: (value: string | number) => void
  choosedItem: INotification | null
  setChoosedItem: (value: INotification | null) => void
  itemToSend: any
  setItemToSend: (value: string) => void
  sendNotification: () => Promise<void>
}

export const useNotificationStore = create<NotificationStoreState>(
  (set, get) => ({
    loading: false,
    items: [],
    setItems: (arr) => set({ items: arr }),
    choosedClients: [],
    setChooseClient: (arr: [string]) => set({ choosedClients: arr }),
    selectRadio: '',
    setSelectRadio: (value: string | number) => set({ selectRadio: value }),
    choosedItem: null,
    setChoosedItem: (value: INotification | null) =>
      set({ choosedItem: value }),
    itemToSend: null,
    setItemToSend: (value: string) => set({ itemToSend: value }),
    sendNotification: async () => {
      try {
        set({ loading: true })
        const object = {
          id: get().selectRadio,
          values: get().choosedClients,
        }
        const response = await NotificationsServices.sendNotification(object)
      } catch (e) {
      } finally {
        set({ loading: false })
      }
    },
  })
)
