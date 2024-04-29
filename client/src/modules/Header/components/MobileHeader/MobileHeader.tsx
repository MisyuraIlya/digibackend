import React, { FC } from 'react'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { useNavigate, Link } from 'react-router-dom'
type MobileHeaderProps = {
  mobileSearchOn: boolean
  setMobileSearchOn: (bool: boolean) => void
}
const MobileHeader: FC<MobileHeaderProps> = ({
  mobileSearchOn,
  setMobileSearchOn,
}) => {
  const { clientRightSideBar, setClientRightSideBar } = useModals()
  const navigate = useNavigate()

  return (
    <div className="open-menu">
      <div
        onClick={() => setClientRightSideBar(!clientRightSideBar)}
        className={clientRightSideBar ? 'nav-icon3 open' : 'nav-icon3'}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="main-logo-mobile">
        <Link to="/">
          <img src={process.env.REACT_APP_MEDIA + '/logo.png'} />
        </Link>
      </div>
      <div>
        <div className="back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <div
          className="search-icon"
          onClick={() => setMobileSearchOn(!mobileSearchOn)}
        >
          <span className="material-symbols-outlined">search</span>
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
