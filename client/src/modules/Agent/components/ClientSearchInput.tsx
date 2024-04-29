import React, { FC, useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce'
import { useAuth } from '../../Auth/store/useAuthStore'
import Loader from '../../../shared/Loader'

interface ClientSearchInputProps {
  value: string
  onChange: (value: string) => void
}

const ClientSearchInput: FC<ClientSearchInputProps> = ({ value, onChange }) => {
  const { loading } = useAuth()
  const [isChoosed, setIsChoosed] = useState(false)
  const [valueDebounced] = useDebounce(value, 1000)
  const [filter, setFilter] = useState('')

  // const handleClickInputSearch = (item) => {
  //     onChange(item.Name)
  //     setFilter(item.Name)
  //     MyUsersMethods.filterByUser(item.Name)
  //     setIsChoosed(true)
  // }

  // useEffect(() => {
  //     if(valueDebounced){
  //         MyUsersMethods.filterByUser(valueDebounced)
  //     }
  // },[valueDebounced])

  // useEffect(() => {
  //     if(value !== filter){
  //         setIsChoosed(false)
  //     }
  // },[value])

  return (
    <>
      <div className="MySearchInput">
        <div className="flex-container myCenterAlign myPadding">
          <div className="col-lg-12 input">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="שם לקוח/ מספר לקוח"
            />
          </div>
        </div>
      </div>
      {value && !isChoosed && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="MySearchInputCont">
              {/* {filteredUsers.length > 0 ?
                    filteredUsers.map((item,index) => {
                        return(
                            <div className='cardCont' onClick={() => handleClickInputSearch(item)}>
                                <div className='container searchCont'>
                                    <div className='flex-container' key={index}>
                                        <div className='col-lg-4'>
                                            <p>{item.ExId}</p>
                                        </div>    
                                        <div className='col-lg-8'>
                                            <p>{item.Name}</p>
                                        </div>      
                                    </div>
                                </div> 
                            </div>    
                        )
                    })
                :
                    <div className='myCenterAlign noUsers'>
                    <h4>לא נמצאו לקוחות</h4>

                    </div>    
                } */}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ClientSearchInput
