import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useModals } from '../../provider/ModalProvider'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import Calendar from 'react-calendar'

type OrderSettingsProps = {
  active: boolean
  setActive: (bool: boolean) => void
}
type OrderSettingsForm = {
  CustName: string
  CustAddress: string
  Town: string
  CustMobile: string
}

const OrderSettings: FC<OrderSettingsProps> = ({ active, setActive }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSettingsForm>()
  const [activeCalendar, setActiveCalendar] = useState(false)
  const [value, onChange] = useState(new Date())
  const { setOpenCartSettings } = useModals()

  const handleClick = (data: OrderSettingsForm) => {}

  return (
    <ModalWrapper
      active={active}
      setActive={setActive}
      height={500}
      width={500}
    >
      <form className="tablePopUp docs" onSubmit={handleSubmit(handleClick)}>
        <div className="pop-details">
          <div className="for-calendar flex-container card">
            <div className="golbal-header">
              <h3 className="mainTitle">{'שם וכתובת מיוחדים לאספקה'}</h3>
            </div>
          </div>
          <div className="prod-info-cont flex-container">
            <div className="col-lg-5">
              <p className="c-title">{'שם לקוח לאספקה'}</p>
            </div>
            <div className="col-lg-6">
              <input type="text" {...register('CustName')} />
            </div>
          </div>
          <div className="prod-info-cont flex-container">
            <div className="col-lg-5">
              <p className="c-title">{'כתובת אספקה'}</p>
            </div>
            <div
              className={
                !errors?.CustAddress?.message
                  ? 'col-lg-6 input-cont'
                  : 'col-lg-6 input-cont alert'
              }
            >
              <input
                type="text"
                {...register('CustAddress', {
                  required: 'כתובת אספקה שדה חובה',
                })}
              />
            </div>
          </div>
          <div className="prod-info-cont flex-container">
            <div className="col-lg-5">
              <p className="c-title">{'עיר'}</p>
            </div>
            {/* <div className={!this.state.alertInputs ? "col-lg-6 input-cont" : "col-lg-6 input-cont alert"}>
                            {Object.keys(this.state.object).length ? 
                            <SearchHook searchPhpFunc={this.searchPhpFunc}
                                    changeState={this.changeState}
                                                    searchProds={this.state.searchProds} preload={this.state.preload}
                                                    showNotFound={this.state.showNotFound} props={this.props}
                                                    closeSearchMob={this.closeSearchMob} popObject={this.state.object}/>
                            :null}
                        </div> */}
            <div
              className={
                !errors?.CustMobile?.message
                  ? 'col-lg-6 input-cont'
                  : 'col-lg-6 input-cont alert'
              }
            >
              <input
                type="text"
                {...register('Town', { required: 'עיר שדה חובה' })}
              />
            </div>
          </div>
          <div className="prod-info-cont flex-container">
            <div className="col-lg-5">
              <p className="c-title">{'נייד'}</p>
            </div>
            <div
              className={
                !errors?.CustMobile?.message
                  ? 'col-lg-6 input-cont'
                  : 'col-lg-6 input-cont alert'
              }
            >
              <input
                type="text"
                {...register('CustMobile', { required: 'נייד שדה חובה' })}
              />
            </div>
          </div>

          {/* <div className="MyButton" style={{textAlign:'right'}} onClick={() => setActiveCalendar(!activeCalendar)}>
                        <button type='button'>בחר תאריך אספקה</button>
                    </div> */}

          {/* {activeCalendar && 
                  <div className='settingsCalendar'>
                      <Calendar 
                      onChange={onChange} 
                      value={value} 
                      locale="he-IL"
                      />
                  </div>    
              } */}
        </div>

        <div className="MyButton">
          <button type="submit" onClick={() => setOpenCartSettings(false)}>
            שמור
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default OrderSettings
