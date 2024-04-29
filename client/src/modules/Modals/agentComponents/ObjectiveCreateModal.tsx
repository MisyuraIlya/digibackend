import React, { FC, useState } from 'react'
import ModalWrapper from '../components/ModalWrapper/ModalWrapper'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { ReactSelectOptionsOfFullHour } from '../../Agent/helpers/arrayOfMonths'
import Calendar from 'react-calendar'
import moment from 'moment'
import { useMyScheduleCalendar } from '../../Agent/store/ScheduleCalendar.store'
import { useAuth } from '../../Auth/store/useAuthStore'

type ObjectiveCreateModalProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

type ObjectiveCreateModalForm = {
  hourFrom: { value: string; label: string }
  hourTo: { value: string; label: string }
  description: string
}

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const ObjectiveCreateModal: FC<ObjectiveCreateModalProps> = ({
  active,
  setActive,
}) => {
  const [value, onChange] = useState<Value>(new Date())
  const { createNewTask } = useMyScheduleCalendar()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ObjectiveCreateModalForm>()

  const handleClick = (data: ObjectiveCreateModalForm) => {
    {
      /* @ts-ignore */
    }
    createNewTask(
      data.hourFrom.value,
      data.hourTo.value,
      data.description,
      /* @ts-ignore */
      moment(value).format('YYYY-MM-DD'),
      /* @ts-ignore */
      user
    )
    reset()
    setActive(false)
  }
  return (
    <ModalWrapper active={active} setActive={setActive} height={80} width={50}>
      <form className="flex-container" onSubmit={handleSubmit(handleClick)}>
        <div
          className="col-lg-12"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h3>יצירת משימה</h3>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Calendar onChange={onChange} value={value} locale="he-IL" />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {value && (
            <>
              {/* @ts-ignore */}
              <h4>נבחר {moment(value).format('DD-MM-YYYY')}</h4>
            </>
          )}
        </div>
        <div className="col-lg-6">
          <div className="myPadding">
            <Controller
              name="hourFrom"
              control={control}
              render={({ field }) => (
                <Select
                  options={ReactSelectOptionsOfFullHour}
                  placeholder={'משעה'}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="myPadding">
            <Controller
              name="hourTo"
              control={control}
              render={({ field }) => (
                <Select
                  options={ReactSelectOptionsOfFullHour}
                  placeholder={'עד שעה'}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="myPadding">
            <div className="TextArea">
              <textarea
                placeholder={'פרטי משימה'}
                {...register('description', { required: `תאור שדה חובה` })}
              />
            </div>
          </div>
        </div>
        <div
          style={{ position: 'absolute', bottom: '60px', left: '60px' }}
          className="MyButton"
        >
          <button type="submit">{'ליצור'}</button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default ObjectiveCreateModal
