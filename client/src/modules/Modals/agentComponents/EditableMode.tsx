import React from 'react'

const EditableMode = () => {
  return (
    <>
      {/* <form>
            <div className='flex-container'>
                <div className='col-lg-12'>
                    <p>ביצוע - {moment(modalInfo.ObjectiveDate).format('DD-MM-YYYY')}</p>
                </div>
            </div>

            <div className='flex-container'>
                <div className='col-lg-6'>
                    <div className='myPadding'>
                    <Controller
                        name="HoursFromSelect"
                        control={control}
                        render={({ field }) => (
                        <ReactSelect
                            isClearable
                            {...field}
                            options={ReactSelectOptionsOfFullHour}
                        />
                        )}
                    />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='myPadding'>
                        <Controller
                            name="HoursToSelect"
                            control={control}
                            render={({ field }) => (
                            <ReactSelect
                                isClearable
                                {...field}
                                options={ReactSelectOptionsOfFullHour}
                            />
                            )}
                        />
                    </div>
                </div>
            </div>

            {modalInfo.typeId == 2 &&
                <div>
                    <p>פירוט..</p>
                    <MyTextArea  props={{...register(`description`, { value: modalInfo.description })}} placeholder={'פירוט'}/>
                </div>
            }

        </form>
        <div className='flex-container'>
            <div className='col-lg-6'>
                <div className='flex-container'>

                    <div className='myPadding'>
                        <MyButton title={'עדכן'} buttonClick={handleSubmit(doneEditHandler)}/>
                    </div>
                    <div className='myPadding'>
                        <MyButton title={'מחק'} buttonClick={() => handleUnpublishMission()} color={'red'}/>
                    </div>
                </div>
            </div>
        </div> */}
    </>
  )
}

export default EditableMode
