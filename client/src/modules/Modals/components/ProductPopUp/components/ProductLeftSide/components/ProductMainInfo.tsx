import React from 'react'
import { useSelectedProduct } from '../../../../../store/selecterdProduct.store'
import { Typography, Link, Grid, IconButton } from '@mui/material'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'

const ProductMainInfo = () => {
  const { selectedProd } = useSelectedProduct()

  return (
    <>
      <Typography variant="h5">{selectedProd?.title}</Typography>
      {selectedProd?.sku && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{'מספר קטלוגי'}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">{selectedProd?.sku}</Typography>
          </Grid>
        </Grid>
      )}
      {selectedProd?.link && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{selectedProd?.linkTitle}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Link
              href={selectedProd?.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <InsertLinkOutlinedIcon />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      )}
      {selectedProd?.packQuantity && (
        <Grid container sx={{ margin: '20px 0px' }}>
          <Grid item xs={4}>
            <Typography variant="body1">{'יחידות במארז'}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {selectedProd?.packQuantity}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default ProductMainInfo
