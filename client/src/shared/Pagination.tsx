import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
type PaginationProps = {
  hydraPagination: hydraPagination
}
const Pagination: FC<PaginationProps> = ({ hydraPagination }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoToPage = (page: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', page)
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    window.scrollTo(0, 0)
  }

  const getPageNumbers = () => {
    const halfRange = Math.floor(7 / 2)
    const start = Math.max(1, +hydraPagination.page - halfRange)
    const end = Math.min(+hydraPagination.totalPages, start + 7 - 1)

    const pageNumbers = []
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  return (
    <div className="paginate-main-cont">
      <div className="paginate-sub-cont flex-container">
        <div className="paginate-controller-main col-lg-8">
          <div className="paginate-controller-sub">
            <div className="pageBtn glbBtn">
              <p onClick={() => handleGoToPage('1')}>{'<<'}</p>
            </div>
            <div className="pageBtn glbBtn">
              {hydraPagination.previous ? (
                <p
                  onClick={() =>
                    handleGoToPage(hydraPagination.previous.toString())
                  }
                >
                  {'<'}
                </p>
              ) : (
                <p>{'<'}</p>
              )}
            </div>
            {getPageNumbers()?.map((item, index) => (
              <div key={index} className="pageBtn">
                <p
                  className={item == hydraPagination.page ? 'active' : 'null'}
                  onClick={() => handleGoToPage(item.toString())}
                >
                  {item}
                </p>
              </div>
            ))}
            <div className="pageBtn glbBtn">
              {hydraPagination.nextPage ? (
                <p
                  onClick={() =>
                    handleGoToPage(hydraPagination.nextPage.toString())
                  }
                >
                  {'>'}
                </p>
              ) : (
                <p>{'>'}</p>
              )}
            </div>
            <div className="pageBtn glbBtn">
              <p
                onClick={() =>
                  handleGoToPage(hydraPagination.lastPage.toString())
                }
              >
                {'>>'}
              </p>
            </div>
          </div>
        </div>
        <div className="paginate-info-main col-lg-4">
          <p>{`עמוד ${hydraPagination.page} מתוך ${hydraPagination.totalPages}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Pagination
