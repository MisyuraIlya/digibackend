import React, { FC } from 'react'
import Tags from './LeftSide/components/ProductList/components/Tags'
import BasicInfo from './LeftSide/components/ProductList/components/BasicInfo'
import PriceBlock from './LeftSide/components/ProductList/components/PriceBlock'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useAuth } from '../../Auth/store/useAuthStore'
import AgentHandler from './LeftSide/components/ProductList/components/AgentHandler'
import { useModals } from '../../Modals/provider/ModalProvider'

interface ProductCardProps {
  product: IProduct
  listView?: boolean
}
const ProductCard: FC<ProductCardProps> = ({ product, listView = false }) => {
  const { isAgent } = useAuth()
  const { selectProduct } = useModals()
  return (
    <Card sx={{ position: 'relative', paddingBottom: '20px' }}>
      <Box sx={{ height: '150px' }}>
        <CardMedia
          onClick={() => selectProduct(product)}
          component="img"
          height={120}
          sx={{
            cursor: 'pointer',
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
          image={
            product.defaultImagePath
              ? `${process.env.REACT_APP_MEDIA}/product/${product.defaultImagePath}`
              : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
          }
          alt={product.title}
        />
      </Box>
      <CardContent>
        <Typography variant="subtitle1" color={'black'}>
          {product.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography variant="body1">מק״ט:</Typography>
          <Typography variant="body1">{product?.sku}</Typography>
        </Box>
        {product?.barcode && (
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <Typography variant="body1">ברקוד:</Typography>
            <Typography variant="body1">{product.barcode}</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography variant="body1">מארז:</Typography>
          <Typography variant="body1">
            {`${product?.packQuantity} יח'`}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: '10px' }} />
      </CardContent>
      {/* <Tags product={product} />
        <Grid item xs={listView ? 6 : 12}>
          <BasicInfo product={product} />
        </Grid>
        {isAgent && (
          <Box
            sx={{
              height: '10x',
              marginBottom: '5px',
              borderTop: '1px solid rgba(65,67,106,.43137254901960786);',
              width: '100%',
            }}
          />
        )}

        {isAgent && <AgentHandler product={product} />}
        {isAgent && (
          <Box
            sx={{
              height: '10x',
              marginTop: '5px',
              borderBottom: '1px solid rgba(65,67,106,.43137254901960786);',
              width: '100%',
            }}
          />
        )}

        <Grid item xs={listView ? 6 : 12}>
          <Box>
            <PriceBlock product={product} />
          </Box>
        </Grid> */}
    </Card>
  )
}

export default ProductCard
