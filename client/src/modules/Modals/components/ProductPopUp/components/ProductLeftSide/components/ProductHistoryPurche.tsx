import React from 'react'
import { useModals } from '../../../../../provider/ModalProvider'
import { Typography, Grid, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { themeColors } from '../../../../../../../styles/mui'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'

const ProductHistoryPurche = () => {
  const { setActiveTablePopUp } = useModals()
  const { user } = useAuth()

  const handleOpen = () => {
    setActiveTablePopUp(true)
  }

  return (
    <>
      {user && (
        <>
          <Grid container sx={{ margin: '10px 0px' }}>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">{'היסטוריית רכישה'}</Typography>
            </Grid>
            <Grid item xs={8}>
              <IconButton onClick={handleOpen}>
                <VisibilityIcon sx={{ color: themeColors.primary }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ProductHistoryPurche
