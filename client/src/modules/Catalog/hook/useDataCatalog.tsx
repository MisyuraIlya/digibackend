import useSWR, { SWRConfiguration } from 'swr'
import { CatalogServices } from '../services/catalog.service'
import { useLocation, useParams } from 'react-router-dom'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { useAuth } from '../../Auth/store/useAuthStore'

const fetchData = async (
  lvl1: string | number,
  lvl2: string | number,
  lvl3: string | number,
  searchParams: string,
  documentType: CatalogDocumentType,
  user: IUser
): Promise<GetCatalogResponse> => {
  return await CatalogServices.GetCatalog(
    lvl1,
    lvl2,
    lvl3,
    searchParams,
    documentType,
    user
  )
}

const useDataCatalog = () => {
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const { data, error, isValidating, mutate } = useSWR<GetCatalogResponse>(
    `/api/catalog/${documentType}/${lvl1}/${lvl2}/${lvl3}${location.search}&userId=${user?.id}`,
    () =>
      fetchData(
        lvl1 ?? '0',
        lvl2 ?? '0',
        lvl3 ?? '0',
        location.search,
        documentType as CatalogDocumentType,
        user!
      )
  )
  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }
  return {
    data,
    hydraPagination,
    isLoading: !data && !error,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataCatalog
