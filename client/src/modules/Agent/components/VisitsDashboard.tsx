import React from 'react'
import ReactApexChart from 'react-apexcharts'
import MyCard from '../../../shared/MyCard'
import Wrap from '../../../shared/Wrap'
import { Box, Card, Grid, Typography } from '@mui/material'
import MyCheapButton from '../../../shared/MyCheapButton'
import useDataAgentObjectives from '../hooks/useDataAgentObjectives'
import useDataAgentMissions from '../hooks/useDataAgentMissions'
import moment from 'moment'
import useDataAgentDashboard from '../hooks/useDataAgentDashboard'

const VisitsDashboard = () => {
  const { data } = useDataAgentDashboard(
    moment().format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  )
  const visits = data?.['hydra:member'].filter(
    (item) => item.objectiveType === 'visit'
  )
  const tasks = data?.['hydra:member'].filter(
    (item) => item.objectiveType === 'task'
  )

  const totalVisits = visits?.length
  const completedVisits = visits?.filter((item) => item.completedAt).length
  const precentVisits =
    completedVisits && totalVisits ? (completedVisits / totalVisits) * 100 : 0

  const totalTasks = tasks?.length
  const completedTasks = tasks?.filter((item) => item.completedAt).length
  const precentObj =
    totalTasks && completedTasks ? (completedTasks / totalTasks) * 100 : 0
  const series2 = [precentVisits]
  const options2 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['ביקורים'],
    colors: ['#24426b'],
  }

  const series1 = [precentObj]
  const options1 = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['משימות'],
    colors: ['#24426b'],
  }

  return (
    <Card sx={{ padding: '0 50px', marginTop: '50px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          sm={6}
          xs={12}
          sx={{ display: { sm: 'flex', xs: 'block' }, gap: '20px' }}
        >
          <Box className="centered">
            <Box>
              <Typography
                variant="h6"
                sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
              >
                ביקורים
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">בוצע</Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MyCheapButton>{completedVisits}</MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">לביצוע</Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MyCheapButton>{totalVisits}</MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ReactApexChart
            // @ts-ignore
            options={options2}
            series={series2}
            type="radialBar"
            height={250}
          />
        </Grid>
        <Grid
          item
          sm={6}
          xs={12}
          sx={{ display: { sm: 'flex', xs: 'block' }, gap: '20px' }}
        >
          <Box className="centered">
            <Box>
              <Typography
                variant="h6"
                sx={{ width: '100%', textAlign: { sm: 'left', xs: 'center' } }}
              >
                משימות
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">בוצע</Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MyCheapButton>{completedTasks}</MyCheapButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: { sm: 'left', xs: 'center' },
                  }}
                >
                  <Typography variant="h6">לביצוע</Typography>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MyCheapButton>{totalTasks}</MyCheapButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ReactApexChart
            // @ts-ignore
            options={options1}
            series={series1}
            type="radialBar"
            height={250}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default VisitsDashboard
