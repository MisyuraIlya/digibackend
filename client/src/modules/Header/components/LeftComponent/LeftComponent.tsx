import React, { useState } from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { useCart } from '../../../Cart/store/cart.store'
import { Link, useNavigate } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'

import { clientURL } from '../../../../enums/url'
import NotificationContainer from '../../../PushNotifications/components/NotificationContainer/NotificationContainer'
import { themeColors } from '../../../../styles/mui'
import { onAsk } from '../../../../shared/MySweetAlert'
import useDataNotificationUser from '../../../PushNotifications/hooks/useDataNotificationUser'
import ProfileMenu from './components/ProfileMenu'
const LeftComponent = () => {
  const { user, isAgent, agent, setAction, logOut, setUser } = useAuth()
  const { cart, selectedMode } = useCart()
  const { data: notificationData } = useDataNotificationUser()
  const [openProfile, setOpenProfile] = useState<boolean>(false)
  const { setOpenAuthModal } = useModals()
  const navigate = useNavigate()

  const [openDrawver, setOpenDrawver] = useState(false)

  const handleOnMouseOver = (
    value: IURL,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value.LABEL === clientURL.PROFILE.LABEL) {
      setOpenProfile(true)
    }
  }

  const handleOnLeftMouse = (
    value: IURL,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value.LABEL === clientURL.PROFILE.LABEL) {
      setOpenProfile(false)
    }
  }
  const handleClick = (value: IURL) => {
    if (value.LINK) {
      navigate(value.LINK)
    }

    if (value.LABEL === clientURL.NOTIFICATIONS.LABEL) {
      setOpenDrawver(true)
    }
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', gap: '10px', position: 'relative' }}
        onMouseLeave={() => setOpenProfile(false)}
      >
        {user ? (
          Object.entries(clientURL).map(([key, value]) => {
            if (value.SHOW_IN_HEADER) {
              if (value.FOR_AGENT && !isAgent) return
              return (
                <IconButton
                  key={key}
                  sx={{
                    height: '50px',
                    width: '50px',
                    backgroundColor: '#f3f5f9',
                  }}
                  onClick={() => handleClick(value)}
                  onMouseEnter={(e) => handleOnMouseOver(value, e)}
                >
                  {value === clientURL.CART && (
                    <Tooltip title={value.LABEL}>
                      <Badge badgeContent={cart.length ?? 0} color="secondary">
                        {value.ICON}
                      </Badge>
                    </Tooltip>
                  )}
                  {value === clientURL.NOTIFICATIONS && (
                    <Tooltip title={value.LABEL}>
                      <Badge
                        badgeContent={
                          notificationData?.['hydra:totalItems'] ?? 0
                        }
                        color="secondary"
                      >
                        {value.ICON}
                      </Badge>
                    </Tooltip>
                  )}
                  {value !== clientURL.CART &&
                    value !== clientURL.NOTIFICATIONS && (
                      <Tooltip title={value.LABEL}>{value.ICON}</Tooltip>
                    )}
                </IconButton>
              )
            }
          })
        ) : (
          <IconButton
            sx={{
              height: '50px',
              width: '50px',
              backgroundColor: '#f3f5f9',
            }}
            onClick={() => {
              setOpenAuthModal(true)
              setAction('login')
            }}
          >
            <Tooltip title={clientURL.PROFILE.LABEL}>
              {clientURL.PROFILE.ICON}
            </Tooltip>
          </IconButton>
        )}

        {openProfile && (
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              left: '-180px',
              top: '50px',
              zIndex: 10,
            }}
          >
            <ProfileMenu />
          </Paper>
        )}
      </Box>
      <Drawer
        anchor="right"
        open={openDrawver}
        onClose={() => setOpenDrawver(false)}
      >
        <Box sx={{ minWidth: '350px' }} className="centered">
          <Box sx={{ width: '90%' }}>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: themeColors.primary,
                marginTop: '20px',
              }}
            >
              הודעות
            </Typography>
            <NotificationContainer />
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default LeftComponent
