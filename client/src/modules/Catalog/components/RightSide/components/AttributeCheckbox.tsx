import React, { FC } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

type AttributeCheckboxProps = {
  subElement: ISubAttributes
  index2: number
}
const AttributeCheckbox: FC<AttributeCheckboxProps> = ({
  subElement,
  index2,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const atts = urlSearchParams.get('attributes')
  const isExists = atts?.includes(subElement?.id.toString())

  const handleFilter = () => {
    const urlSearchParams = new URLSearchParams(location.search)
    const atts = urlSearchParams.get('attributes')
    const attsArray = atts ? atts.split(',') : []
    if (isExists) {
      const updatedAtts = attsArray.filter(
        (id) => id != subElement?.id.toString()
      )
      urlSearchParams.set('attributes', updatedAtts.join(','))
    } else {
      attsArray.push(subElement?.id.toString())
      urlSearchParams.set('attributes', attsArray.join(','))
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
  }

  return (
    <div key={index2} className="filter-row" onClick={() => handleFilter()}>
      <div className={isExists ? 'checkBox active' : 'checkBox'}></div>
      <p>{subElement?.title}</p>
    </div>
  )
}

export default AttributeCheckbox
