import React, { FC } from 'react'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import { useCart } from '../../../../../../Cart/store/cart.store'
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart'
import { Typography, Grid, Box, TextField } from '@mui/material'

type PriceBlockProps = {
  product: IProduct
}

const PriceBlock: FC<PriceBlockProps> = ({ product }) => {
  const { user } = useAuth()
  const { getCartItem, selectedMode, changeQuantity } = useCart()

  const inCart = getCartItem(product)

  return (
    <Box>
      {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice !== 0 &&
      product.stock !== 0 ? (
        <Box sx={{ marginBottom: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} className="centered">
              <Box>
                <Typography variant="body2">{'סה״כ להזמנה'}</Typography>
                <Typography variant="body2" className="centered">
                  ₪{inCart?.quantity ?? 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="centered">
              <Box>
                <Typography variant="body2">{'סה״כ להזמנה'}</Typography>
                <Typography variant="body2" className="centered">
                  ₪{inCart?.total ?? 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      {/* {user &&
      selectedMode &&
      product.finalPrice &&
      product.finalPrice !== 0 &&
      product.stock !== 0 ? ( */}
      <AddToCart item={product} />
      {/* ) : null} */}
    </Box>
  )
}

export default PriceBlock
