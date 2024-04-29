import React, { FC } from 'react'

interface SubTaskListProps {
  dayName: string
  subTasks: string
  hourFrom: string
  hourTo: string
  handleSetSubTask: () => void
}

const SubTaskList: FC<SubTaskListProps> = ({
  dayName,
  subTasks,
  hourFrom,
  hourTo,
  handleSetSubTask,
}) => {
  return (
    <div className="taskList">
      <div className="myCenterAlign">
        <h3>
          בחר משימה - יום {dayName} בין השעות {hourFrom} - {hourTo}
        </h3>
      </div>
      <div>
        {/*
            <div className='heading myPadding'>
                <div className='flex-container'>
                    <div className='col-lg-1 myCenterAlign'>
                        <p>#</p>
                    </div>
                    <div className='col-lg-2 myCenterAlign'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Icon.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>משימה</p>
                        </div>
                    </div>
                    <div className='col-lg-2 myCenterAlign flex-contianer'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Time.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>שעות</p>
                        </div>
                    </div>
                    <div className='col-lg-3 myCenterAlign'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/message.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>פירוט</p>
                        </div>

                    </div> 
                    <div className='col-lg-3 myCenterAlign'>
                        <p>ביצוע</p>
                    </div>
                </div>
            </div>
            <MyDivider/>
            */}
        <div className="list ">
          {/* {subTasks.map((item,index) => {
                    return(
                        <>
                        <div className='myPadding'>
                            <MyCard>
                                <div className=' pointer' key={index} onClick={() => handleSetSubTask(item)}>
                                    <div className='col-lg-2 myCenterAlign'>
                                        <div className='myPadding type'>
                                            <span>{item.type}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-2 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.startHour} - {item.endHour}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-3 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.mission} {item.visit}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-3 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.completed ? moment(item.completedDate).locale('he').format('LLLL'): 'ממתין'} </span>
                                        </div>
                                    </div> 
                                </div>  
                            </MyCard>  
                        </div>    
                        </>
                    )
                })} */}
        </div>
      </div>
    </div>
  )
}

export default SubTaskList
