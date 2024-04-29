import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { AdminProductService } from '../services/products.service'

type RouteParams = {
  lvl1: string
  lvl2: string
  lvl3: string
}

const fetchData = async (lvl1: string, lvl2: string, lvl3: string) => {
  return await AdminProductService.GetProducts(lvl1, lvl2, lvl3)
}

const useDataProductsEdit = () => {
  const { lvl1, lvl2, lvl3 } = useParams<RouteParams>()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/catalog/catalog/${lvl1}/${lvl2}/${lvl3}`,
    () => fetchData(lvl1!, lvl2!, lvl3!)
  )

  return {
    data,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataProductsEdit
