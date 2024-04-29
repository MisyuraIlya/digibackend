import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { agentProfileService } from '../services/agentProfile.service'

const fetchData = async (agentId: string, year: string) => {
  return await agentProfileService.getAgentTargets(agentId, year)
}

type RouteParams = {
  id: string
}

const useDataAgentTargets = (year: string) => {
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `api/agent_targets/${id}?year=${year}`,
    () => fetchData(id!, year)
  )

  const createTarget = async (obj: IAgentTaget) => {
    try {
      await agentProfileService.createAgentTarget(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  const updateTarget = async (obj: IAgentTaget) => {
    try {
      await agentProfileService.updateAgentTarget(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  return {
    data,
    isLoading: isLoading,
    createTarget,
    updateTarget,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentTargets
