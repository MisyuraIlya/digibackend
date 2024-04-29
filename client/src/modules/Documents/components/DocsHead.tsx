import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
const DocsHead = () => {
  const { setDocumentType, clearItems } = useDocuments()
  const location = useLocation()
  const navigate = useNavigate()
  const isDocumentPage = location.pathname.includes('documentPage')
  const isKartessetPage = location.pathname.includes('kartessetPage')
  const isHistoryPage = location.pathname.includes('historyPage')

  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().add(1, 'days').format('YYYY-MM-DD')

  return (
    <div className="tabs-main-cont">
      <div className="tabs-main-subcont">
        <div className="tab-cont">
          <div
            onClick={() => {
              navigate(`/documentPage?page=1&from=${from}&to=${to}`)
              setDocumentType('document')
              clearItems()
            }}
          >
            <p className={isDocumentPage ? 'active' : ''}>{'מסמכים'}</p>
          </div>
        </div>
        <div className="tab-cont">
          <div
            onClick={() => {
              navigate(`/historyPage?page=1&from=${from}&to=${to}`)
              setDocumentType('history')
              clearItems()
            }}
          >
            <p className={isHistoryPage ? 'active' : ''}>{'מסמכי Web'}</p>
          </div>
        </div>
        <div className="tab-cont">
          <div
            onClick={() => {
              navigate(`/kartessetPage?page=1&from=${from}&to=${to}`)
              setDocumentType('kartesset')
              clearItems()
            }}
          >
            <p className={isKartessetPage ? 'active' : ''}>{'כרטסת'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsHead
