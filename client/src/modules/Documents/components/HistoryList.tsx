import React from 'react'
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const HistoryList = () => {
  const { items, showCalendar, loading, clerOrderItems, searchValue } =
    useDocuments()
  const navigate = useNavigate()

  const handleStatus = (value: OrderStatus) => {
    if (value === 'pending') {
      return <p className="Waiting">ממתין</p>
    } else if (value === 'paid') {
      return <p className="Active">נקטלה</p>
    } else if (value === 'draft') {
      return <p className="Active">טיוטה</p>
    } else if (value === 'faild') {
      return <p className="Blocked">לא נקלטה</p>
    }
  }

  const handleDocumentType = (value: IDocumentType) => {
    if (value === 'order') {
      return 'הזמנה'
    } else if (value === 'draft') {
      return 'טיוטה'
    } else if (value === 'quote') {
      return 'הצעת מחיר'
    } else if (value === 'return') {
      return 'החזר'
    }
  }
  return (
    <div
      className={
        showCalendar ? 'doc-container active card' : 'doc-container card'
      }
    >
      {!showCalendar && items.length === 0 ? (
        <h1 className="no-products">בחר טווח תאריכים ובצע חיפוש</h1>
      ) : null}
      {items.length === 0 && !loading ? (
        <h1 className="no-products">לא נמצאו מסמכים בטווח תאריכים</h1>
      ) : null}
      {searchValue && searchValue.length == 0 ? (
        <h1 className="no-products">לא נמצאו מסמכים בתאריכים אלו</h1>
      ) : null}
      {items.length > 0 ? (
        <div id="lines-main-cont" className="lines-main-cont">
          <table className="lines-sub-cont">
            <tbody>
              <tr className="heading">
                <th className="col-cont sticky-col">
                  <p>#</p>
                </th>
                <th className="col-cont sticky-col">
                  <p>לקוח</p>
                </th>
                <th className="col-cont">
                  <p>סוג</p>
                </th>
                <th className="col-cont">
                  <p>ת.ערך</p>
                </th>
                <th className="col-cont">
                  <p>ת.תשלום</p>
                </th>

                <th className="col-cont">
                  <p>סה״כ</p>
                </th>
                <th className="col-cont">
                  <p>סטאטוס</p>
                </th>
              </tr>
              {(items as IHistory[])?.map((element, index) => {
                let docAllowed = true
                if (docAllowed == true) {
                  return (
                    <tr
                      key={index}
                      className={'item'}
                      id={'docRow_' + element.id}
                      onClick={() => {
                        navigate(`/historyItemPage/${element?.id}`)
                        clerOrderItems()
                      }}
                    >
                      <th className="col-cont sticky-col">
                        <p className="AccountKey no-margin">
                          {'#' + element?.id}
                        </p>
                      </th>
                      <th className="col-cont sticky-col">
                        <p className="AccountKey no-margin">
                          {'#' + element?.user?.extId}
                        </p>
                        <p className="AccountName  no-margin">
                          {element?.user?.name}
                        </p>
                      </th>
                      <th className="col-cont">
                        <p>{handleDocumentType(element?.documentType)}</p>
                      </th>
                      <th className="col-cont">
                        <p>{moment(element?.createdAt).format('DD-MM-YYYY')}</p>
                      </th>
                      <th className="col-cont">
                        <p>{moment(element?.updatedAt).format('DD-MM-YYYY')}</p>
                      </th>
                      <th className="col-cont">
                        <p>{element?.total.toFixed(1)}</p>
                      </th>
                      <th className="col-cont col-approved">
                        {element?.orderStatus ? (
                          <>{handleStatus(element?.orderStatus)}</>
                        ) : (
                          <p className="NotActive">ממתין</p>
                        )}
                      </th>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}

export default HistoryList
