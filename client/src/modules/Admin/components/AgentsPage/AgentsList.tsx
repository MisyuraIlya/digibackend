import React from 'react'
import Pagination from '../../../../shared/Pagination'
import { useAgentProfileStore } from '../../../Agent/store/agentProfile.store'
import { useModals } from '../../../Modals/provider/ModalProvider'

const AgentsList = () => {
  const { agentList } = useAgentProfileStore()
  const { setAgentsModalItem } = useModals()
  return (
    <div className={true ? 'doc-container active card' : 'doc-container card'}>
      <div id="lines-main-cont" className="lines-main-cont">
        <table className="lines-sub-cont">
          <tbody>
            <tr className="heading">
              <th className="col-cont sticky-col">
                <p>שם</p>
              </th>
              <th className="col-cont sticky-col">
                <p>מס' פנימי</p>
              </th>
              <th className="col-cont">
                <p>שם משתמש</p>
              </th>
              <th className="col-cont">
                <p>סיסמה</p>
              </th>
              <th className="col-cont">
                <p>מאסטר</p>
              </th>
            </tr>
            {agentList?.map((element, index) => {
              return (
                <tr
                  key={index}
                  className={'item'}
                  id={'docRow_' + element.id}
                  onClick={() => setAgentsModalItem(element)}
                >
                  <th className="col-cont sticky-col">
                    <p className="AccountKey no-margin">{element.name}</p>
                  </th>
                  <th className="col-cont sticky-col">
                    <p> {element.extId}</p>
                  </th>
                  <th className="col-cont">
                    <p>{element.email}</p>
                  </th>
                  <th className="col-cont">
                    <p>{element?.passwordUnencrypted}</p>
                  </th>

                  <th className="col-cont col-approved">
                    {element?.role == 'ROLE_SUPER_AGENT' ? (
                      <p className="Waiting">{'מנהל'}</p>
                    ) : (
                      <p className="Active">{'רגיל'}</p>
                    )}
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* <Pagination /> */}
    </div>
  )
}

export default AgentsList
