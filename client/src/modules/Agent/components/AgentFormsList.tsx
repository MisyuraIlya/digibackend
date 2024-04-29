import React, { useEffect } from 'react'
// import { useMyQuestionDocsStore } from '../../../../store/QuestionDocsStore';
import Container from '../layout/AgentContainer'
import moment from 'moment'
import MyCard from '../../../shared/MyCard'
import Loader from '../../../shared/Loader'

const AgentFormsList = () => {
  // const {MyQuestionDocsStoreMethods,agentForms, loading} = useMyQuestionDocsStore()

  // useEffect(() => {
  //     MyQuestionDocsStoreMethods.fetchAgentsForms(pagination)
  // },[pagination])
  return (
    <div className="flex-container AgentFormsList">
      {loading ? (
        <div className="loaderHeightMin myCenterAlign myWidth">
          <div className="myCenterAlign">
            <Loader />
          </div>
        </div>
      ) : (
        agentForms.map((item, index) => (
          <div className="col-lg-12 " key={index}>
            <div className="myPadding ">
              <MyCard>
                <Container>
                  <div
                    className="flex-container card"
                    onClick={() => handleOpenFormDetailed(item)}
                  >
                    <div className="col-lg-1 myCenterAlign">
                      <span>{index}</span>
                    </div>
                    <div className="col-lg-11">
                      <div className="flex-container">
                        <div className="col-lg-10">
                          <h4>{item.ClientName}</h4>
                        </div>
                        <div className="col-lg-2 myCenterAlign">
                          <span>{moment(item.QuestionDate).format('L')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </MyCard>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default AgentFormsList
