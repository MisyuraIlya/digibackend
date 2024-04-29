import useSWR from 'swr'
import { CatalogServices } from '../services/catalog.service'

const fetchData = async (): Promise<GetCategoriesResponse> => {
  return await CatalogServices.GetCategories()
}

const useDataCategories = () => {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/categoriesApp`,
    fetchData
  )
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCategories
