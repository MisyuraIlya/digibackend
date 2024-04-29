import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { agentProfileService } from '../services/agentProfile.service'

const fetchDataProfile = async (agentId: string) => {
  return await agentProfileService.getAgentProfile(agentId)
}

type RouteParams = {
  id: string
}

const useDataAgentProfile = () => {
  const { id } = useParams<RouteParams>()

  const { data, isLoading } = useSWR(`/agentProfile/${id}`, () =>
    fetchDataProfile(id!)
  )

  return {
    data,
    isLoading,
  }
}

export default useDataAgentProfile
