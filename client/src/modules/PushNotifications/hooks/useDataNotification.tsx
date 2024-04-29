import useSWR from 'swr'
import { NotificationsServices } from '../services/notifications.service'
import moment from 'moment'
import { onAsk } from '../../../shared/MySweetAlert'
const fetchData = async () => {
  return await NotificationsServices.fetchNotifications()
}

const useDataNotification = () => {
  const { data, isLoading, mutate } = useSWR(`api/notifications`, fetchData)

  const createMutation = async (object: INotification | null) => {
    const newObject: INotification = {
      title: null,
      description: null,
      link: null,
      createdAt: moment().format('YYYY-MM-DD'),
      isSend: false,
      image: null,
      isPublic: false,
      isPublished: false,
    }
    if (object?.id) {
      newObject.title = object?.title
      newObject.description = object?.description
      newObject.link = object?.link
      if (object?.image) {
        //@ts-ignore
        newObject.image = object?.image['@id']
      }
    }
    await NotificationsServices.createItem(newObject)
    mutate()
  }

  const updateMutation = async (obj: INotification) => {
    await NotificationsServices.updateItem(obj)
    mutate()
  }

  const deleteMutation = async (id: string | number) => {
    const ask = await onAsk('למחוק שורה זו?', '')
    if (ask) {
      await NotificationsServices.deleteItem(id)
      mutate()
    }
  }

  return {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

export default useDataNotification
