import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { AdminClinetsService } from '../services/clients.service'
import { HydraHandler } from '../../../helpers/hydraHandler'

const fetchData = async (
  userRole: ROLE_TYPES,
  page: string,
  search: string
) => {
  return await AdminClinetsService.getUsers(userRole, page, search)
}

type RouteParams = {
  userRole: ROLE_TYPES
}

const useDataUsers = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const { userRole } = useParams<RouteParams>()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/${userRole}?page=${page}`,
    () => fetchData(userRole!, page!, search!)
  )

  let hydraPagination
  if (data) {
    hydraPagination = HydraHandler.paginationHandler(data)
  }

  return {
    data,
    hydraPagination,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataUsers
