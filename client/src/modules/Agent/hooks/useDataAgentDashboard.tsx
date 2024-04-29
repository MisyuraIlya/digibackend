import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { agentService } from '../services/agent.service'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { agentProfileService } from '../services/agentProfile.service'

const fetchData = async (agentId: string, dateFrom: string, dateTo: string) => {
  return await agentProfileService.getAgentObjective(
    1,
    null,
    null,
    agentId,
    dateFrom,
    dateTo
  )
}

const fetchDataProfile = async (agentId: string) => {
  return await agentProfileService.getAgentProfile(agentId)
}

type RouteParams = {
  id: string
}

const useDataAgentDashboard = (weekFrom: string, weekTo: string) => {
  const { id } = useParams<RouteParams>()

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/calendar/${id}/${weekFrom}/${weekTo}`,
    () => fetchData(id!, weekFrom, weekTo)
  )

  const { data: profile, isLoading: profileLoading } = useSWR(
    `/agentProfile/${id}`,
    () => fetchDataProfile(id!)
  )

  const updateObjective = async (obj: IAgentObjective) => {
    try {
      await agentProfileService.updateAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  return {
    data,
    profile,
    profileLoading,
    isLoading: isLoading,
    isError: error,
    updateObjective,
    isValidating,
    mutate,
  }
}

export default useDataAgentDashboard
