import React, { FC } from 'react'
import './IssueHandler.styles.scss'
import { useNotifications } from '../../provider/PushNotification'
import { useMobile } from '../../../Mobile/store/mobile.store'

interface IssueHandlerProps {
  title: string
  link: string
  needPlatrofm: IBrowser
}

const IssueHandler: FC<IssueHandlerProps> = ({ title, link, needPlatrofm }) => {
  const iconChrome = 'https://shanishenhav.online/app/img/chrome.png'
  const iconSafari = 'https://shanishenhav.online/app/img/safari.png'
  const googlePlay = 'https://shanishenhav.online/app/img/GooglePlay.png'
  const { isIPhone } = useMobile()
  return (
    <div className="IssueHandler">
      <div>
        <div className="centered">
          {needPlatrofm == 'Safari' && <img src={iconSafari} />}
          {needPlatrofm == 'Chrome' && <img src={iconChrome} />}
        </div>
        <div className="content">
          {/* {title} */}
          <h2>אנו תומכים</h2>
          <h2>אך ורק בדפדפן מסוג {needPlatrofm}</h2>
          <h2>במכשירי {isIPhone ? 'Apple' : 'Android'}</h2>
        </div>

        {needPlatrofm == 'Chrome' && (
          <div className="content" style={{ paddingTop: '10px' }}>
            <h4>אנא עקוב אחר הוראות</h4>
            <h4>ההתקנה שמופיעות למטה</h4>
          </div>
        )}
        {/* {link &&
                    <div className='centered'>
                        <span> להורדת דפדפן לחץ  <a href={link}>כאן</a></span>
                    </div>
                } */}
        {needPlatrofm == 'Chrome' && (
          <div className="content" style={{ paddingTop: '10px' }}>
            <h4>או לחץ על הקישור</h4>
            <h4>להורדת הדפדפן</h4>
            <a href={link}>
              {' '}
              <img src={googlePlay} />{' '}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueHandler
