import moment from 'moment'
import React, { useState } from 'react'
import MobileMyScheduleCalendar from './MobileMyScheduleCalendar'
import {
  HourOfDay,
  useMyScheduleCalendar,
} from '../../store/ScheduleCalendar.store'
import Loader from '../../../../shared/Loader'
import { ConvertHebrewNameDayToWeekDateByWeekName } from '../../helpers/ScheduleCalendar.helper'
import { useMobile } from '../../../Mobile/store/mobile.store'
import './MyScheduleCalendar.styles.scss'
import useDataAgentMissions from '../../hooks/useDataAgentMissions'
import MissionModal from './UpdateMissionModal'
import MySheduleCalendarItem from './MySheduleCalendarItem'

const MyScheduleCalendar = () => {
  const { daysOfWeek, hoursOfDay, weekFrom, weekTo, loading } =
    useMyScheduleCalendar()
  const { isMobile } = useMobile()
  const { data } = useDataAgentMissions(weekFrom, weekTo)
  return (
    <>
      {!isMobile ? (
        <div className="weekly-scheduler myMarginBottom">
          <div className="header">
            <div className="cell img_time">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            {daysOfWeek.map((day, index) => (
              <div key={day} className="cell day">
                <p>
                  {day} -{' '}
                  {ConvertHebrewNameDayToWeekDateByWeekName(index, weekFrom)}
                </p>
              </div>
            ))}
          </div>
          <div className="body">
            {loading ? (
              <div className="myCenterAlign loaderHeightMin">
                <Loader />
              </div>
            ) : (
              hoursOfDay.map((hour, key1) => (
                <div key={key1} className="row">
                  <div className="cell hour">
                    <p>{hour}</p>
                  </div>
                  {daysOfWeek.map((day, key2) => (
                    <div key={`${key2}`} className="cell">
                      {data?.data.map((event, key3) => {
                        if (event.choosedDay == day && event.hourFrom == hour) {
                          const eventDuration =
                            hoursOfDay.indexOf(event.hourTo as HourOfDay) -
                            hoursOfDay.indexOf(event.hourFrom as HourOfDay)
                          return (
                            <MySheduleCalendarItem
                              key={key3}
                              event={event}
                              day={day}
                              hour={hour}
                              eventDuration={eventDuration}
                            />
                          )
                        }
                        return null
                      })}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <MobileMyScheduleCalendar />
      )}
    </>
  )
}

export default MyScheduleCalendar
