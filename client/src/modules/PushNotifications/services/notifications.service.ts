import axios from 'axios'

const URL = 'https://digitrade.host/helpers/onesignal/src/index.php'
const classPoint = 'OneSignal'

interface NotificationsServicesResponse {
  status: 'sucsses' | 'error'
  message: string
  data: boolean
}

interface GetNotificationResponse extends Hydra {
  'hydra:member': INotification[]
}

export const NotificationsServices = {
  async createItem(object: INotification): Promise<INotification> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/notifications`,
      object
    )
    return response.data
  },

  async updateItem(object: INotification): Promise<INotification> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/notifications/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },

  async deleteItem(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/notifications/${id}`
    )
    return response.data
  },

  async fetchNotifications(): Promise<GetNotificationResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/notifications`
    )
    return response.data
  },

  async sendNotification(data: ISendNotification) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/notifications/send`,
      data
    )
    return response.data
  },

  // OneSignalService
  // async registerClient(
  //   clientName: string,
  //   appId: string,
  //   platform: string,
  //   isSubscribed: boolean,
  //   userExId: string,
  //   isAllowed: boolean,
  //   type: string
  // ): Promise<NotificationsServicesResponse> {
  //   const valAjax = {
  //     classPoint: classPoint,
  //     funcName: 'registerClient',
  //     clientName,
  //     appId,
  //     platform,
  //     isSubscribed,
  //     userExId,
  //     isAllowed,
  //     type,
  //     url: URL,
  //   }

  //   const data = await axios.post(URL, valAjax)
  //   return data.data
  // },

  // async getOrdersPerClient(
  //   clientName: string,
  //   userExId: string
  // ): Promise<OneSignalServerNotificationResponse> {
  //   const valAjax = {
  //     classPoint: classPoint,
  //     funcName: 'fetchNotificationPerClient',
  //     clientName,
  //     userExId,
  //     url: URL,
  //   }
  //   const data = await axios.post(URL, valAjax)
  //   return data.data
  // },

  // async handleIsRead(
  //   clientName: string,
  //   notificationId: string,
  //   isRead: boolean
  // ) {
  //   const valAjax = {
  //     classPoint: classPoint,
  //     funcName: 'handleIsRead',
  //     clientName,
  //     notificationId,
  //     isRead,
  //     url: URL,
  //   }
  //   const data = await axios.post(URL, valAjax)
  //   return data.data
  // },

  // async handleReadAll() {},
}
