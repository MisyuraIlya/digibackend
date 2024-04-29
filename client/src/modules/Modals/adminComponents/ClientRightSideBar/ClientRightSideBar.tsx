import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type ClientRightSideBarProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const ClientRightSideBar: FC<ClientRightSideBarProps> = ({
  active,
  setActive,
}) => {
  return (
    <div className="main-menuu">
      <div className="header-right-cont-main-smallRes">
        <nav className={active ? 'opened' : 'closed'}>
          <div className="header-right-cont col-lg-5 header-mob-right-cont">
            <ul className={!active ? 'to-left' : ''}>
              <li className="logo" onClick={() => setActive(false)}>
                <Link to="/">
                  <img src={process.env.REACT_APP_MEDIA + 'logo.png'} />
                </Link>
              </li>
              <Link to="/">
                <li onClick={() => setActive(false)}>
                  <p>{'בית'}</p>
                </li>
              </Link>
              <Link to={'/profile'}>
                <li onClick={() => setActive(false)}>
                  <p>{'אזור אישי'}</p>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
        <div
          onClick={() => setActive(false)}
          className={active ? 'fake-click opened' : 'fake-click closed'}
        ></div>
      </div>
    </div>
  )
}

export default ClientRightSideBar
