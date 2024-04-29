import React, { useEffect } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useSearchStore } from '../../store/SearchStore'
import { useDebounce } from 'use-debounce'
import { Link } from 'react-router-dom'
import Loader from '../../../../shared/Loader'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { TailSpin } from 'react-loader-spinner'
const CatalogSearch = () => {
  const { isAgent, user } = useAuth()
  const {
    searchValue,
    setSearchValue,
    setSavedValue,
    loading,
    productsFilter,
    findProductsByValue,
    totalFound,
  } = useSearchStore()
  const { selectProduct } = useModals()
  const [valueDebounced] = useDebounce(searchValue, 1000)

  const handelSearchValue = (value: string) => {
    setSearchValue(value)
    setSavedValue(value)
  }

  const handleSearch = () => {
    findProductsByValue('0', '0', '0', `?search=${valueDebounced}`)
  }

  useEffect(() => {
    if (valueDebounced) {
      handleSearch()
    }
  }, [valueDebounced])

  return (
    <div className="search-cont-main">
      <div className="search-cont">
        <div className="input">
          <input
            onChange={(e) => handelSearchValue(e.target.value)}
            value={searchValue}
            type="text"
            placeholder={'חיפוש מוצר...'}
            // onKeyPress={e => searchCheckEnter(e)}
          />
          {searchValue == '' ? (
            <span className="material-symbols-outlined search-img">search</span>
          ) : (
            <span
              className="material-symbols-outlined search-img"
              onClick={() => {
                setSearchValue('')
              }}
            >
              close
            </span>
          )}
        </div>
        {searchValue && (
          <div className="searchRes-cont">
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '150px',
                }}
              >
                <TailSpin height="40" width="40" color="black" visible={true} />
              </div>
            ) : (
              productsFilter?.map((item, key) => {
                if (key < 10) {
                  return (
                    <div
                      key={key}
                      className="searchRes-row flex-container"
                      onClick={() => selectProduct(item)}
                    >
                      <div className="img-cont col-lg-3">
                        <img
                          className="img"
                          src={
                            item.defaultImagePath
                              ? process.env.REACT_APP_MEDIA +
                                '/product/' +
                                item?.defaultImagePath
                              : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                          }
                        />
                      </div>
                      <div className="content col-lg-9">
                        <p className="title">{item.title}</p>
                        <p className="catalog">{'#' + item.sku}</p>
                        {localStorage.user && (
                          <p className="price">{'₪ ' + item.finalPrice}</p>
                        )}
                      </div>
                    </div>
                  )
                }
              })
            )}

            {!loading && (
              <>
                {totalFound > 0 && (
                  <div
                    className="all-res-cont"
                    onClick={() => {
                      setSearchValue('')
                    }}
                  >
                    <Link
                      to={
                        '/client/search/0/0/0' + '?page=1&search=' + searchValue
                      }
                    >
                      <p>{'מעבר לכל ה (' + totalFound + ' ) תוצאות'}</p>
                    </Link>
                  </div>
                )}
              </>
            )}
            {(!searchValue || productsFilter.length == 0) && !loading && (
              <div className="all-res-cont not-found">
                <p>{'לא נמצאו תוצאות'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogSearch
