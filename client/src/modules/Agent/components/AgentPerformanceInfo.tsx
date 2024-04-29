import React from 'react'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useAuth } from '../../Auth/store/useAuthStore'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { Box, Card, Grid, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import GroupIcon from '@mui/icons-material/Group'
import MyCheapButton from '../../../shared/MyCheapButton'
import useDataAgentProfile from '../hooks/useDataAgentProfile'

const AgentPerformanceInfo = () => {
  const { agent, isAdmin, isSuperAgent } = useAuth()
  const { data } = useDataAgentProfile()
  return (
    <Card sx={{ padding: '10px' }}>
      <Grid container spacing={10}>
        <Grid item sm={7} xs={12} className="centered">
          <Grid container spacing={2} className="centered">
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Box className="centered" sx={{ gap: '10px' }}>
                <SupportAgentIcon />
                <Box sx={{ marginTop: '5px' }}>
                  <Typography>{agent?.name}</Typography>
                  <Typography>{agent?.phone}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ חודשי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(data?.totalPriceMonth)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <LegendToggleIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סה״כ שנתי'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(data?.totalPriceYear)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={6} sx={{ gap: '5px' }}>
              <Grid container spacing={0} className="centered">
                <Grid item xs={2}>
                  <AnalyticsIcon />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2">{'סל ממוצע'}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <MyCheapButton>
                    {numberWithCommas(data?.averageBasket)}
                  </MyCheapButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'סה״כ יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(data?.totalPriceDay)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'כמות עסקאות יומי'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(data?.totalDayCount)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'סה"כ משימות'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(data?.totalMissions)}
                </MyCheapButton>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ gap: '5px' }}>
              <Typography variant="body2" textAlign={'center'}>
                {'עמידה ביעד'}
              </Typography>
              <Box className="centered" sx={{ marginTop: '5px' }}>
                <MyCheapButton>
                  {numberWithCommas(data?.targetPrecent)}
                </MyCheapButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AgentPerformanceInfo
