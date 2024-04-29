import React from 'react'
import Loader from '../../../../shared/Loader'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { Box, Card, Grid, Typography } from '@mui/material'
import useDataAgentTargets from '../../hooks/useDataAgentTargets'
import { themeColors } from '../../../../styles/mui'

import { MONTH_HEBREW_1 } from '../../helpers/arrayOfMonths'
import { useParams } from 'react-router-dom'
import ModalWrapper from '../../../../utils/ModalWrapper/ModalWrapper'
import TargetItem from './TargetItem'

const TargetList = ({ year }: { year: string }) => {
  const { agent } = useAuth()
  const { data, isLoading } = useDataAgentTargets(year)

  const targets: IAgentTaget[] = MONTH_HEBREW_1.map((item) => {
    const matchingData = data?.['hydra:member']?.find(
      (res) => item.name === res.month
    )
    return {
      id: matchingData ? matchingData.id : null,
      agent: agent,
      month: item.name,
      year: year,
      currentValue: matchingData ? matchingData.currentValue : 0,
      targetValue: matchingData ? matchingData.targetValue : 0,
      isCompleted: matchingData ? matchingData.isCompleted : false,
    }
  })

  return (
    <Card sx={{ marginTop: '50px' }}>
      <Grid container spacing={2} sx={{ margin: '5px', padding: '10px 20px' }}>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            תאריך
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            יעד
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            מחזור
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight={700}>
            סטאטוס
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" fontWeight={700}>
            פעולות
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box className="centered">
          <Loader />
        </Box>
      ) : (
        <Box>
          {targets?.map((item, index) => (
            <TargetItem item={item} index={index} />
          ))}
        </Box>
      )}
    </Card>
  )
}

export default TargetList
