import React, { FC } from 'react'

interface ModalInfoProps {
  modalInfo: string
  setEditMode: () => void
  canBack: boolean
  backFunction: () => void
  closeEditHandler: () => void
}
const ModalInfo: FC<ModalInfoProps> = ({
  modalInfo,
  setEditMode,
  canBack,
  backFunction,
  closeEditHandler,
}) => {
  // let dateTime = `${modalInfo.date}T${modalInfo.endHour}:00`;
  // const targetTime = Date.parse(dateTime);
  // const currentTime = Date.now();
  // const remaining = (targetTime - Date.now()) > 0;

  // const {MyScheduleCalendarMethods} = useMyScheduleCalendar()

  // const handleStatusBtn = (status) => {
  //     MyScheduleCalendarMethods.updateStatus(modalInfo.tableName,modalInfo.idDocument,status)
  //     closeEditHandler()
  // }
  return (
    <div>
      {/* <div className='flex-container hours-cont'>
            <h3 className='myMarginBottom' >{modalInfo.type}</h3>
            <div className='hours-box col-lg-12 myMarginBottom'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span>תאריך</span>
                    <span>{modalInfo.date}</span>
                </div>
            </div>
            <div className='hours-box'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>משעה</span>
                    <span>{modalInfo.startHour}</span>
                </div>
            </div>
            <div className='hours-box myMarginBottom'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>עד שעה</span>
                    <span>{modalInfo.endHour}</span>
                </div>
            </div>
        </div>  
        <div className=''>
            <MyDivider/>
        </div>
        <div className='flex-container myMarginTop'>
            <div className='col-lg-12'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">event_note</span>
                    <div className='myPadding'>
                        <span>{modalInfo.description}</span>
                    </div>
                </div>
            </div>
        </div>
        {modalInfo.completedDate ?
            <div>
                {
                    modalInfo.completed ? 
                    <div>
                        <div className='myCenterAlign'>
                            <h4>המשימה הושלמה</h4>
                        </div>
                    </div>    
                    :
                    <div>
                        <div className='myCenterAlign'>
                            <h4>המשימה לא הושלמה</h4>
                        </div>
                    </div>
                }
            </div>
        :
        <div className='myCenterAlign'>
            <div className="modal-mark-cont">
                <div className='myCenterAlign'>
                    <h4>המשימה הושלמה?</h4>
                </div> 
                <div className='flex-container'>
                    <div>
                    </div>    
                    <div className='myPadding'>
                        <BigButton googleIcon ='check_circle' imgLink={globalFileServer + '/agentApp/VIcon.png'} color={'suc'} onClickBtn={() => handleStatusBtn(true)}/>
                    </div>    
                    <div className='myPadding'>
                        <BigButton googleIcon ='block' imgLink={globalFileServer + 'agentApp/+Icon.png'} color={'fal'} onClickBtn={() => handleStatusBtn(false)}/>
                    </div>  
                </div>   
            </div>    
        </div>
        }


        {canBack &&
             <div className='close_btn' onClick={() => backFunction()}>
                <span className="material-symbols-outlined">keyboard_backspace</span>
            </div>
            
        }
        <div className='flex-container'>
            
            {localStorage.role ? 
                <div className='myPadding'>
                    <MyButton title={'עדכון'} buttonClick={() => setEditMode(true)}/>
                </div>
            :null}
        </div>   */}
    </div>
  )
}

export default ModalInfo
