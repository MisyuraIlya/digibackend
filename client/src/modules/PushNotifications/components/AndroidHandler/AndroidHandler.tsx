import React from 'react'
import './AndroidHandler.styles.scss'
import IssueHandler from '../IssueHandler/IssueHandler'
import { useOneSignalStore } from '../../store/oneSignalStore'
const AndroidHandler = () => {
  const { detectBrowser } = useOneSignalStore()
  return (
    <>
      {detectBrowser() !== 'Chrome' && (
        <IssueHandler
          title={'אנחנו תומכים רק בדפדפן CHROME'}
          link={
            'https://play.google.com/store/apps/details?id=com.android.chrome'
          }
          needPlatrofm={'Chrome'}
        />
      )}
    </>
  )
}

export default AndroidHandler
