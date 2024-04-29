import React, { FC } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

interface BreadCrumbsArr {
  title: string
  link: string
}

interface BreadCrumbsProps {
  array: BreadCrumbsArr[]
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ array }) => {
  const navigate = useNavigate()
  return (
    <div className="breadcrumbs bread-crumbs-glb-cont">
      <div className="back_btn" onClick={() => navigate(-1)}>
        <p>חזור</p>
        <span className="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="breadcrumbs-container">
        <div className="">
          <ul>
            <li>
              <Link to="/">
                <span>{'בית'}</span>
              </Link>
            </li>
            {array?.map((element, index) => {
              if (element.title) {
                return (
                  <li key={index}>
                    {element.link ? (
                      <Link to={element.link}>{element.title}</Link>
                    ) : (
                      <span style={{ fontWeight: '900' }}>{element.title}</span>
                    )}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumbs
