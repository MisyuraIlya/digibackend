import React from 'react'
import { useSelectedProduct } from '../../../../store/selecterdProduct.store'
import AdditionalImages from '../AdditionalImages'
import { useModals } from '../../../../provider/ModalProvider'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { Box, IconButton } from '@mui/material'
const ProductRightSide = () => {
  const { selectedProd } = useSelectedProduct()
  const { handleImageModal } = useModals()
  const shareImage = () => {
    let message = 'שיתוף לינק לתמונה \n'
    message += 'מק״ט: ' + selectedProd.sku + '\n'
    message += 'מוצר: ' + selectedProd.title + '\n'
    message += 'לינק: '
    message += 'products/' + selectedProd.defaultImagePath
    window.open(
      'https://api.whatsapp.com/send?text=' + encodeURIComponent(message)
    )
  }

  const openLink = () => {
    let imageURL =
      'https://digitrade.com.ua/src/img3' +
      '/product/' +
      selectedProd.defaultImagePath
    window.open(imageURL, '_blank')
  }

  return (
    <>
      {selectedProd.defaultImagePath && (
        <Box sx={{ position: 'absolute' }}>
          <Box>
            <IconButton
              onClick={() => shareImage()}
              sx={{
                backgroundColor: '#f3f5f9',
                borderRadius: '9px',
                '&:hover': { backgroundColor: '#d1d9e8' },
              }}
            >
              <ShareOutlinedIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: '10px' }}>
            <IconButton
              onClick={() => openLink()}
              sx={{
                backgroundColor: '#f3f5f9',
                borderRadius: '9px',
                '&:hover': { backgroundColor: '#d1d9e8' },
              }}
            >
              <InsertLinkOutlinedIcon sx={{ fontSize: '30px' }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {selectedProd.defaultImagePath ? (
        <img
          src={`${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`}
          onClick={() =>
            handleImageModal(
              `${process.env.REACT_APP_MEDIA}/product/${selectedProd.defaultImagePath}`
            )
          }
        />
      ) : (
        <img src={`${process.env.REACT_APP_MEDIA}/placeholder.jpg`} />
      )}
      <Box>{selectedProd?.imagePath?.length > 1 && <AdditionalImages />}</Box>
    </>
  )
}

export default ProductRightSide
