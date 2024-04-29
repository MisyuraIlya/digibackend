import React, { useEffect } from 'react'
import { TextField, CircularProgress, Typography, Grid } from '@mui/material'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'
import { useCart } from '../../../../../../Cart/store/cart.store'
import { useAuth } from '../../../../../../Auth/store/useAuthStore'
import Loader from '../../../../../../../shared/Loader'

const ProductMainInfoTwo = () => {
  const { selectedProd } = useSelectedProduct()
  const { Maam, selectedMode } = useCart()
  const { user } = useAuth()
  return (
    <>
      {/* {isFetchOnline || loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>
      ) : (
        <>
          {user && (
            <>
              {selectedProd.basePrice ? (
                <Grid container sx={{ margin: '20px 0px' }}>
                  <Grid item xs={4}>
                    <Typography variant="body1">{"מחיר ליח' מקורי"}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      {selectedProd?.finalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}
              <Grid container sx={{ margin: '20px 0px' }}>
                <Grid item xs={4}>
                  <Typography variant="body1">{'הנחה'}</Typography>
                </Grid>
                <Grid item xs={8}>
                  {isAgent && selectedMode ? (
                    <TextField
                      id={'inputDiscount_' + selectedProd.id}
                      type="number"
                      value={selectedProd.discount}
                    />
                  ) : (
                    <Typography variant="body1">
                      {selectedProd.discount}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container sx={{ margin: '20px 0px' }}>
                <Grid item xs={4}>
                  <Typography variant="body1">{"מחיר ליח'"}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    ₪{selectedProd?.finalPrice}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )} */}
    </>
  )
}

export default ProductMainInfoTwo
