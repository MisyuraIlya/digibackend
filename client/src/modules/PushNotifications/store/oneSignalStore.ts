import moment from 'moment'
import { create } from 'zustand'
import { NotificationsServices } from '../services/notifications.service'
import { BROWSER_TPYES } from '../types/browserTypes'

interface OneSignalStoreState {
  loading: boolean
  oneSignalNotifications: IOneSignalServerNotification[]
  oneSignalNotificationsLength: number
  apiClientName: string
  isOpenModalNotification: boolean
  isUserRegistered: boolean

  setIsOpenModalNotification: (value: boolean) => void
  getOneSignalNotifications: (userExtId: string) => void
  registerClient: (userExtId: string, appId: string, platform: string) => void
  handleIsRead: (id: number | string, value: boolean) => void
  detectBrowser: () => IBrowser
}

export const useOneSignalStore = create<OneSignalStoreState>((set, get) => ({
  loading: false,
  oneSignalNotifications: [],
  oneSignalNotificationsLength: 0,
  apiClientName: 'bfl',
  isOpenModalNotification: false,
  isUserRegistered: false,
  setIsOpenModalNotification: (bool: boolean) =>
    set({ isOpenModalNotification: bool }),

  getOneSignalNotifications: async (userExtId: string) => {
    try {
      const response = await NotificationsServices.getOrdersPerClient(
        get().apiClientName,
        userExtId
      )
      if (response?.status === 'sucsses') {
        set({
          oneSignalNotifications: response.data,
          oneSignalNotificationsLength: response.data.length,
        })
      }
    } catch (e) {
      console.log('errorMe', e)
    }
  },

  registerClient: async (
    userExtId: string,
    appId: string,
    platform: string
  ) => {
    if (userExtId) {
      try {
        const response = await NotificationsServices.registerClient(
          get().apiClientName,
          appId,
          platform,
          true,
          userExtId,
          true,
          '1'
        )
        if (response.message == 'User ex id with this App id exists') {
          set({ isUserRegistered: true })
        }
      } catch (e) {
        console.log('error register client', e)
      }
    }
  },

  handleIsRead: (id: number | string, value: boolean) => {},

  detectBrowser: (): IBrowser => {
    const nav = navigator.userAgent
    if (nav.indexOf('Chrome') > -1) {
      return 'Chrome'
    } else if (nav.indexOf('Firefox') > -1) {
      return 'Firefox'
    } else if (nav.indexOf('Safari') > -1) {
      return 'Safari'
    } else if (nav.indexOf('Edge') > -1) {
      return 'Edge'
    } else if (nav.indexOf('Opera') > -1) {
      return 'Opera'
    } else if (nav.indexOf('Trident') > -1) {
      return 'Trident'
    } else {
      return 'Unknown'
    }
  },
}))
