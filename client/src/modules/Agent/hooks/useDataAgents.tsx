import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { AdminClinetsService } from '../../Admin/services/clients.service'
import { HydraHandler } from '../../../helpers/hydraHandler'

const fetchData = async () => {
  return await AdminClinetsService.getUsers('ROLE_AGENT', 1, '')
}

const useDataAgents = () => {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const page = urlSearchParams.get('page')
  const search = urlSearchParams.get('search')
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/ROLE_AGENT?page=${page}`,
    () => fetchData()
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

export default useDataAgents
