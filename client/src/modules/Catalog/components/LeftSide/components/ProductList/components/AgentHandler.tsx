import { Box, Grid, TextField, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useCart } from '../../../../../../Cart/store/cart.store'

type AgentHandler = {
  product: IProduct
}

const AgentHandler: FC<AgentHandler> = ({ product }) => {
  const { getCartItem, changePrice, changeDiscount, changeSum, addToCart } =
    useCart()
  const inCart = getCartItem(product)

  const handleChangePrice = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changePrice(itemCart!, value)
  }

  const handleChangeDiscount = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changeDiscount(itemCart!, value)
  }

  const handleChangeSum = (value: number) => {
    if (!inCart) {
      addToCart(product)
    }
    const itemCart = getCartItem(product)
    changeSum(itemCart!, value)
  }

  return (
    <Box sx={{ margin: '0 20px 0 35px' }}>
      <Grid container spacing={2} sx={{ marginRight: '0px' }}>
        <Grid item xs={4} className="centered">
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {"מחיר יח'"}
            </Typography>
            <Box sx={{ marginBottom: '10px' }}>
              <TextField
                value={inCart?.product.finalPrice ?? product.finalPrice}
                onChange={(e) => handleChangePrice(+e.target.value)}
                sx={{
                  '& input': {
                    textAlign: 'center',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#f3f5f9',
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="centered">
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {'הנחה'}
            </Typography>
            <Box sx={{ marginBottom: '10px' }}>
              <TextField
                value={inCart?.discount ?? product?.discount}
                onChange={(e) => handleChangeDiscount(+e.target.value)}
                sx={{
                  '& input': {
                    textAlign: 'center',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#f3f5f9',
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="centered">
          <Box>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {'סה״כ'}
            </Typography>
            <Box sx={{ marginBottom: '10px' }}>
              <TextField
                value={inCart?.price ?? product.finalPrice}
                onChange={(e) => handleChangeSum(+e.target.value)}
                sx={{
                  '& input': {
                    textAlign: 'center',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#f3f5f9',
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AgentHandler
