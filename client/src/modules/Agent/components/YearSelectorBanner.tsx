import React, { FC } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { useAgentProfileStore } from '../store/agentProfile.store'

interface YearSelectorBannerProps {
  isDashborad: boolean
}

interface OptionType {
  value: string
  label: string
}

const YearSelectorBanner: FC<YearSelectorBannerProps> = ({ isDashborad }) => {
  const { choosedYear, setChoosetYear } = useAgentProfileStore()
  const dates: OptionType[] = [
    {
      value: (moment().year() - 1).toString(),
      label: (moment().year() - 1).toString(),
    },
    { value: moment().year().toString(), label: moment().year().toString() },
    {
      value: (moment().year() + 1).toString(),
      label: (moment().year() + 1).toString(),
    },
  ]

  return (
    <div
      className={isDashborad ? 'flex-container' : 'flex-container myPadding'}
    >
      <div className="col-lg-2 colMobile12 mobileAlign">
        <Select
          options={dates}
          placeholder={'בחר שנה'}
          value={{
            value: choosedYear.toString(),
            label: choosedYear.toString(),
          }}
          onChange={(e) => setChoosetYear(e?.value)}
        />
      </div>
    </div>
  )
}

export default YearSelectorBanner
