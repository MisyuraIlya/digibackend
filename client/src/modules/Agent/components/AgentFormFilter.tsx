import React from 'react'
import MyCard from '../../../shared/MyCard'
import Select from 'react-select'
import MyInputV2 from '../../../shared/MyInputV2'
import moment from 'moment'
import { MONTH_HEBREW_3, findMonthName } from '../helpers/arrayOfMonths'

const AgentFormFilter = () => {
  const dates = [
    { value: moment().year() - 1, label: moment().year() - 1 },
    { value: moment().year(), label: moment().year() },
    { value: moment().year() + 1, label: moment().year() + 1 },
  ]

  return (
    <MyCard>
      <div className="flex-container myPadding">
        <div className="col-lg-3 colMobile12 mobileAlign">
          <div className="myPadding colMobile12">
            {/* <MySelectBox array={MONTH_HEBREW_2} state={findMonthName(month)} setState={changeMonthHandler}/> */}
            {/* <Select options={MONTH_HEBREW_3} value={findMonthName(month)} onChange={changeMonthHandler} /> */}
          </div>
        </div>
        <div className="col-lg-3 colMobile12 mobileAlign">
          <div className="myPadding colMobile12">
            {/* <MySelectBox array={dates} state={year} setState={MyQuestionDocsStoreMethods.setYear}/> */}
            {/* <Select options={dates} value={{ value:year, label: year }} onChange={(e) => MyQuestionDocsStoreMethods.setYear(e.value)} /> */}
          </div>
        </div>
        <div className="col-lg-3 myCenterAlign colMobile12 mobileAlign">
          <div className="">
            {/* <MyInputV2 placeholder={'חיפוש לפי לקוח'} value={searchValue} onChange={MyQuestionDocsStoreMethods.setSearchValue}/> */}
          </div>
        </div>
      </div>
    </MyCard>
  )
}

export default AgentFormFilter
