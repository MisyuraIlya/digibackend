import React, { ReactNode, FC } from 'react'
import { Global } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Drawer } from '@mui/material'

const drawerBleeding = 50

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}))

export default function MyDrawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            width: `calc(90% - ${drawerBleeding}px)`, // Adjusted width
            overflow: 'visible',
          },
        }}
      />
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            visibility: 'visible',
            top: '50%',
            right: drawerBleeding,
            left: 0,
          }}
        >
          <Box
            sx={{
              width: '50px',
              boxShadow: '-4px 3px 20px 3px #ececec',
              textAlign: 'center',
              alignItems: 'center',
              borderTopRightRadius: '40%',
              borderBottomRightRadius: '40%',
              padding: '15px 0 7px 0',
              background: 'white',
              position: 'absolute',
              top: '50%',
              right: -drawerBleeding,
            }}
            onClick={toggleDrawer(!open)}
          >
            <FilterListIcon />
          </Box>
        </Box>
        <Box
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            width: '80%',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Drawer>
    </Root>
  )
}
