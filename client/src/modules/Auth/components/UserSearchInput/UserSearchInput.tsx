import React, { FC, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { AdminClinetsService } from '../../../Admin/services/clients.service'
import Loader from '../../../../shared/Loader'

interface UserSearchInputProps {
  onChoose: (user: IUser) => void
}

const UserSearchInput: FC<UserSearchInputProps> = ({ onChoose }) => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [valueDebounced] = useDebounce(search, 1000)
  const [users, setUsers] = useState<IUser[]>([])

  const handleUsers = async () => {
    if (valueDebounced) {
      try {
        setLoading(true)
        const response = await AdminClinetsService.getClients(
          1,
          true,
          valueDebounced
        )
        setUsers(response['hydra:member'])
      } catch (e) {
        console.log('[ERROR] UserSearchInput', e)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChoose = (item: IUser) => {
    onChoose(item)
    setSearch(item.name)
    setUsers([])
  }
  useEffect(() => {
    handleUsers()
  }, [valueDebounced])
  return (
    <>
      <div className="MySearchInput">
        <div className="flex-container myCenterAlign inputBorder">
          <div className="col-lg-2">
            <div className="myCenterAlign img">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
          <div className="col-lg-10 input">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {users.length > 0 && (
        <>
          {loading ? (
            <div className="MySearchInputCont">
              <div className="myCenterAlign ">
                <div className="loaderMargin">
                  <Loader />
                </div>
              </div>
            </div>
          ) : (
            <div className="MySearchInputCont">
              {users.length > 0 ? (
                users.map((item, index) => {
                  return (
                    <div
                      className="cardCont"
                      onClick={() => handleChoose(item)}
                    >
                      <div className="container searchCont">
                        <div className="flex-container" key={index}>
                          <div className="col-lg-4">
                            <p>{item.extId}</p>
                          </div>
                          <div className="col-lg-8">
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="myCenterAlign noUsers">
                  <h4>לא נמצאו לקוחות</h4>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default UserSearchInput
