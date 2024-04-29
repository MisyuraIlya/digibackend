import React from 'react'
import { useModals } from '../../../Modals/provider/ModalProvider'

const AgentsFilter = () => {
  const { setAgentsModal } = useModals()
  return (
    <div className="for-calendar flex-container card">
      <div className="flex-container right-side-header col-lg-7">
        <div className={'flex-container col-lg-12 docs-agent-header-cls'}></div>
      </div>
      <div className="flex-container left-side-header col-lg-5">
        <div className="userInfo-cls flex-container">
          <div className="left-side-comp header-btn-cont col-pay">
            <div className="select-cont">
              <div
                onClick={() => setAgentsModal(true)}
                className="add-sale-btn"
              >
                <p>הוסף סוכן</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsFilter
