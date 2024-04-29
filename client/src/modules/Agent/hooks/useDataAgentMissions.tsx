import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { agentService } from '../services/agent.service'
import { HydraHandler } from '../../../helpers/hydraHandler'
import { agentProfileService } from '../services/agentProfile.service'
import { agentSheduleCalendarService } from '../services/agentSheduleCalendar.service'

const fetchData = async (agentId: string, dateFrom: string, dateTo: string) => {
  return await agentSheduleCalendarService.getAgentObjective(
    agentId,
    dateFrom,
    dateTo
  )
}

type RouteParams = {
  id: string
}

const useDataAgentMissions = (weekFrom: string, weekTo: string) => {
  const { id } = useParams<RouteParams>()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/calendar/${id}/${weekFrom}/${weekTo}`,
    () => fetchData(id!, weekFrom, weekTo)
  )

  const createObjective = async (obj: IAgentObjective) => {
    try {
      await agentProfileService.createAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  const updateObjective = async (obj: IAgentObjective) => {
    try {
      await agentProfileService.updateAgentObjective(obj)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  const deleteObjective = async (id: number | string) => {
    try {
      await agentProfileService.deleteAgentObjective(id)
    } catch (e) {
      console.log('[ERROR] error', e)
    } finally {
      mutate()
    }
  }

  return {
    data,
    createObjective,
    updateObjective,
    deleteObjective,
    isLoading: isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useDataAgentMissions
