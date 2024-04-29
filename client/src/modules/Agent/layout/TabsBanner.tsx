import React, { useEffect } from 'react'
import Tabs, { Tab } from 'react-best-tabs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const TabsBanner = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const ReturnTabNumber = (tabName: string) => {
    const split = tabName.split('/')
    switch (split[1]) {
      case 'agentDashboard':
        return 1
      case 'objectives':
        return 2
      case 'visits':
        return 3
      case 'target':
        return 4
    }
  }
  let currentTab = ReturnTabNumber(location.pathname)
  const handleTabsROuter = (tabNumber: number) => {
    switch (tabNumber) {
      case 1:
        navigate(`/agentDashboard/${id}`)
        break
      case 2:
        navigate(`/objectives/${id}`)
        break
      case 3:
        navigate(`/visits/${id}?page1`)
        break
      case 4:
        navigate(`/target/${id}`)
        break
    }
  }

  useEffect(() => {
    const tabsCont = document.getElementById('tabs-cont')

    if (tabsCont) {
      if (currentTab) {
        if (currentTab < 4) {
          tabsCont.scrollLeft = -((currentTab - 1) * 70)
        } else {
          tabsCont.scrollLeft = -((currentTab - 1) * 80)
        }
      }
    }
    if (id) {
      // setChoosedAgentId(id)
    }
  }, [location.pathname, id])

  return (
    <>
      <div id="tabs-cont" className="myDesktop tabs-cont">
        <div className="InfoBanner">
          <div id="tabsBar" className="flex-container TabsBar">
            <Tabs
              activeTab={currentTab}
              className=""
              ulClassName=""
              activityClassName="bg-success"
              onClick={(event, tab) => handleTabsROuter(tab)}
            >
              <Tab title="דאשבורד" className="mr-4 tab-1"></Tab>
              <Tab title="משימות" className="mr-4 tab-2"></Tab>
              <Tab title="תבניות ביקורים" className="mr-4 tab-3"></Tab>
              <Tab title="יעדים" className="mr-4 tab-4"></Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default TabsBanner
