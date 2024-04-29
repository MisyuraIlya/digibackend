interface INotification {
  '@id'?: string
  id?: number
  title: string | null
  description: string | null
  link: string | null
  createdAt: string | null
  isSend: boolean | null
  isPublic: boolean | null
  isPublished: boolean | null
  image: IMediaObject | null
}

interface ISendNotification {
  id: string | number
  values: Array<string>
}

interface INotificationUser {
  id: number
  user: IUser
  notification: INotification
  isRead: boolean
  createdAt: string
}
