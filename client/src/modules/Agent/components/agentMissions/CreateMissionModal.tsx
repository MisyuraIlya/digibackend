import React, { useState } from 'react'
import ModalWrapper from '../../../Modals/components/ModalWrapper/ModalWrapper'
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import useDataAgentMissions from '../../hooks/useDataAgentMissions'
import { useMyScheduleCalendar } from '../../store/ScheduleCalendar.store'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { Controller, useForm } from 'react-hook-form'
import { ReactSelectOptionsOfFullHour } from '../../helpers/arrayOfMonths'
import CalendarUtil from '../../../../utils/Calendar/CalendarUtil'
import moment from 'moment'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { onSuccessAlert } from '../../../../shared/MySweetAlert'

type CreateMissionModalForm = {
  date: string
  hourFrom: string
  hourTo: string
  description: string
}

const CreateMissionModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (value: boolean) => void
}) => {
  const { agent } = useAuth()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const { weekFrom, weekTo } = useMyScheduleCalendar()
  const { createObjective } = useDataAgentMissions(weekFrom, weekTo)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateMissionModalForm>()

  const handleClick = (data: CreateMissionModalForm) => {
    if (agent) {
      let obj: IAgentObjective = {
        agent: agent,
        client: null,
        isCompleted: false,
        completedAt: null,
        title: data.description,
        description: '',
        week1: false,
        week2: false,
        week3: false,
        week4: false,
        hourFrom: data.hourFrom,
        hourTo: data.hourTo,
        choosedDay: moment(currentDate).locale('he').format('dddd'),
        date: moment(currentDate).format('YYYY-MM-DD'),
        objectiveType: 'task',
        createdAt: moment().format('YYYY-MM-DD'),
        updatedAt: moment().format('YYYY-MM-DD'),
        subTusk: [],
      }
      createObjective(obj)
      reset()
      onSuccessAlert('משימה הוקמה בהצלחה', '')
      setOpen(false)
    }
  }

  const handleCalendar = (date: Date) => {
    setCurrentDate(date)
    setCalendarOpen(false)
  }
  return (
    <>
      <CalendarUtil
        show={calendarOpen}
        closeHandler={() => setCalendarOpen(false)}
        value={currentDate}
        handleCalendar={handleCalendar}
      />
      <ModalWrapper height={40} width={30} active={open} setActive={setOpen}>
        <Box>
          <form onSubmit={handleSubmit(handleClick)}>
            <Typography variant="h6">{'יצירת משימה'}</Typography>
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                border: '1px solid #ced0d2',
                borderRadius: '5px',
                minWidth: '200px',
              }}
              className="centered"
              onClick={() => setCalendarOpen(true)}
            >
              <DateRangeIcon />
              <Typography variant="h6">
                {moment(currentDate).format('DD-MM-YYYY')}
              </Typography>
            </Box>
            <Box sx={{ gap: '20px', marginTop: '20px' }} className="centered">
              <FormControl fullWidth>
                <InputLabel id="from-select-label">משעה</InputLabel>
                <Controller
                  name="hourFrom"
                  control={control}
                  rules={{
                    required: 'בחר משעה',
                  }}
                  render={({ field }) => (
                    <Select {...field} label="משעה" placeholder="משעה">
                      {ReactSelectOptionsOfFullHour?.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="to-select-label">עד שעה</InputLabel>
                <Controller
                  name="hourTo"
                  control={control}
                  rules={{
                    required: 'בחר עד שעה',
                  }}
                  render={({ field }) => (
                    <Select {...field} label="עד שעה" placeholder="עד שעה">
                      {ReactSelectOptionsOfFullHour?.map((item, index) => (
                        <MenuItem value={item.value} key={index}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
            <TextareaAutosize
              minRows={6}
              style={{
                fontSize: '16px',
                background: '#f3f5f9',
                width: '97%',
                resize: 'none',
                border: 'none',
                padding: '10px',
                borderRadius: '10px',
                margin: '10px 0px',
              }}
              placeholder="מלל הודעה"
              {...register('description')}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ fontSize: '18px', minWidth: '150px' }}
            >
              צור משימה
            </Button>
          </form>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default CreateMissionModal
