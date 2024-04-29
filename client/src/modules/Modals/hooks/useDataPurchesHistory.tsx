import useSWR from 'swr'
import { CatalogServices } from '../../Catalog/services/catalog.service'
import { useAuth } from '../../Auth/store/useAuthStore'

const fetchData = async (
  userExId: string,
  sku: string
): Promise<GetPurchaseHistoryItem> => {
  return await CatalogServices.GetPurchaseHistory(userExId, sku)
}

const useDataPurchesHistory = (sku: string) => {
  const { user } = useAuth()
  const { data, error, isLoading, mutate } = useSWR<GetPurchaseHistoryItem>(
    `/api/purchaseHistory/${user?.extId}/${sku}`,
    () => fetchData(user?.extId!, sku)
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  }
}

export default useDataPurchesHistory
