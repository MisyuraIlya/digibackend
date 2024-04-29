import { Box } from '@mui/material'
import React, { FC } from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'

interface OverlayProps {
  show: boolean
  onClick: () => void
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

interface CalendarUtilProps {
  handleCalendar: (date: Date) => void
  closeHandler: () => void
  show: boolean
  value: Date
}

const StyledCalendarUtil = styled(Box)`
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  transition: top 0.5s ease;
  background-color: white;
  z-index: 999999;
  &.show {
    top: 30%;
  }
`

const CalendarUtil: FC<CalendarUtilProps> = ({
  handleCalendar,
  closeHandler,
  show,
  value,
}) => {
  return (
    <>
      <Overlay show={show} onClick={closeHandler} />
      <StyledCalendarUtil className={show ? 'show' : ''}>
        <Calendar
          onChange={(date) => handleCalendar(date as Date)}
          value={value}
          locale="he-IL"
        />
      </StyledCalendarUtil>
    </>
  )
}

export default CalendarUtil
