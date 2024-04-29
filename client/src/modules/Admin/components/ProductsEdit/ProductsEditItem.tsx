import React, { FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { base64ToFile } from '../../../../helpers/base64ToFile'
// import MyCropper from '../../../../components/tools/MyCropper';
import { useProductsEditStore } from '../../store/ProductsEditStore'
import { AdminProductService } from '../../services/products.service'
import { useModals } from '../../../Modals/provider/ModalProvider'
import { MediaObjectService } from '../../services/mediaObject.service'
import MyCropper from '../../../../shared/MyCropper'
import { Box, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CollectionsIcon from '@mui/icons-material/Collections'
import { themeColors } from '../../../../styles/mui'

interface ProductsEditItemProps {
  element: IProduct
  index: number
}

const ProductsEditItem: FC<ProductsEditItemProps> = ({ element, index }) => {
  const { products, setProducts, setSelectedProduct } = useProductsEditStore()
  const [checked, setCheked] = useState(element.isPublished)
  const { gallery, setGallery } = useModals()

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })
  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(convertFile, 'product')
    const res2 = await AdminProductService.createNewImage({
      product: element['@id'],
      mediaObject: res['@id'],
    })
    await MediaObjectService.ftpUploader(
      res2.mediaObject.filePath,
      'src/img/products',
      'product'
    )
  }

  const unpublishHandle = async () => {
    setCheked(!checked)
    const newProd = products.map((item) => {
      if (item.id.toString() === element.id.toString()) {
        item.isPublished = !checked
      }
      return item
    })
    setProducts(newProd)
    await AdminProductService.updateProduct({
      id: element.id.toString(),
      isPublished: !checked,
    })
  }

  return (
    <Box key={index}>
      <Draggable key={element.id} draggableId={element.id + ''} index={index}>
        {(provided, snapshot) => (
          <Box
            className="item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <IconButton>
                  <DragIndicatorIcon sx={{ fontSize: '35px' }} />
                </IconButton>
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <MyCropper
                  aspectRatio={16 / 16}
                  uploadImg={uploadImg}
                  itemImage={
                    element?.defaultImagePath
                      ? `${process.env.REACT_APP_MEDIA}/product/${element?.defaultImagePath}`
                      : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                  }
                />
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => {
                    setGallery(true)
                    setSelectedProduct(element)
                  }}
                >
                  <CollectionsIcon
                    sx={{ fontSize: '35px', color: themeColors.primary }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1">{element?.title}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1">{element?.sku}</Typography>
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={checked}
                  onChange={() => unpublishHandle()}
                  sx={{ color: themeColors.primary, cursor: 'pointer' }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Draggable>
    </Box>
  )
}

export default ProductsEditItem
