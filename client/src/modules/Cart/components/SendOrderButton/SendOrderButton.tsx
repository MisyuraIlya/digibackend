import React from 'react'
import { useAuth } from '../../../Auth/store/useAuthStore'
import { useCart } from '../../store/cart.store'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { Box, Button, Container, Grid } from '@mui/material'

const SendOrderButton = () => {
  const { isUserBlocked } = useAuth()
  const { selectedMode, cart, comment, setComment, sendOrder, priceBeforeTax } =
    useCart()

  const { openPopUpPay, setOpenPopUpPay } = useModals()

  const handlePay = () => {
    setOpenPopUpPay(true)
  }

  const handleSendOrder = () => {
    sendOrder()
  }

  return (
    <Container>
      {!isUserBlocked &&
      ((cart.length > 0 &&
        +process.env.MINIMUM_DELIVERY_PRICE! <= priceBeforeTax()) ||
        selectedMode !== 'order') ? (
        <>
          <Box sx={{ margin: '0px' }}>
            <textarea
              placeholder={'הערות למסמך'}
              value={comment}
              style={{
                outline: 'none',
                minHeight: '100px',
                border: '1px solid rgba(51, 51, 51, .0784313725)',
                resize: 'none',
                width: '100%',
                borderRadius: '5px',
              }}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Button
            onClick={handleSendOrder}
            variant="contained"
            sx={{
              borderRadius: '20px',
              width: '200px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            {'שלח'}
          </Button>
          <Button
            onClick={handlePay}
            variant="contained"
            sx={{
              borderRadius: '20px',
              width: '200px',
              fontSize: '18px',
              marginTop: '20px',
            }}
          >
            {'שלם'}
          </Button>
        </>
      ) : null}
    </Container>
  )
}

export default SendOrderButton
