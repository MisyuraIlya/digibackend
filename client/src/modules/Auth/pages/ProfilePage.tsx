import React from 'react'
import MyProfile from '../components/MyProfile/MyProfile'
import AgentMyProfile from '../components/AgentMyProfile/AgentMyProfile'
import AgentActions from '../../Agent/components/AgentActions'
import { Container } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
const ProfilePage = () => {
  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: 'פרופיל',
            link: '',
          },
        ]}
      />
      <MyProfile />
      <AgentMyProfile />
      <AgentActions colsNumber={3} />
    </Container>
  )
}

export default ProfilePage
