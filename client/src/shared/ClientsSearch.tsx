import React, { useEffect, useState, FC } from 'react'
import { useDebounce } from 'use-debounce'
import Loader from './Loader'
import { AdminClinetsService } from '../modules/Admin/services/clients.service'

interface ClientsSearchProps {
  onChooseClient: (client: IUser) => void
  searchValue?: string
}

const ClientsSearch: FC<ClientsSearchProps> = ({
  onChooseClient,
  searchValue,
}) => {
  const [clients, setClinets] = useState<IUser[]>()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState(searchValue ?? '')
  const [valueDebounced] = useDebounce(search, 1000)

  const findUsers = async () => {
    try {
      setLoading(true)
      const response = await AdminClinetsService.getClients(
        1,
        true,
        valueDebounced
      )
      console.log('a', response['hydra:member'])
      setClinets(response['hydra:member'])
    } catch (e) {
      console.error('[ERROR] ClientsSearch component', e)
    } finally {
      setLoading(false)
    }
  }

  const handleChooseClient = (user: IUser) => {
    onChooseClient(user)
    setSearch('')
    setClinets([])
    setLoading(false)
  }

  useEffect(() => {
    if (valueDebounced) {
      findUsers()
    }
  }, [valueDebounced])

  return (
    <div className="search-cont-main">
      {localStorage.user || localStorage.agent || localStorage.role ? (
        <div className="search-cont">
          <div className="input">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder={'חיפוש'}
            />
            {search == '' ? (
              <span className="material-symbols-outlined search-img">
                search
              </span>
            ) : (
              <span
                className="material-symbols-outlined search-img"
                onClick={() => setSearch('')}
              >
                close
              </span>
            )}
          </div>
          {search && (
            <div className="searchRes-cont">
              {loading && <Loader />}
              {valueDebounced
                ? clients?.map((item, key) => {
                    if (key < 5) {
                      return (
                        <div
                          key={key}
                          className="searchRes-row flex-container"
                          onClick={() => handleChooseClient(item)}
                        >
                          <div className="content col-lg-12">
                            <p className="catalog">{item.name}</p>
                          </div>
                        </div>
                      )
                    }
                  })
                : null}

              {clients?.length === 0 && valueDebounced && (
                <div className="all-res-cont not-found">
                  <p>{'לא נמצאו תוצאות'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default ClientsSearch
