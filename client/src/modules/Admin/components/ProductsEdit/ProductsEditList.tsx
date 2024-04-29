import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import ProductsEditItem from './ProductsEditItem'
import { AdminProductService } from '../../services/products.service'
import { Box, Grid, Typography } from '@mui/material'
import useDataProductsEdit from '../../hooks/useDataProductsEdit'
const ProductsEditList = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { data } = useDataProductsEdit()

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }
    const items = reorder(
      products,
      result.source.index,
      result.destination.index
    )
    setProducts(items)
    await AdminProductService.updateProduct({
      id: result.draggableId,
      orden: result.destination.index,
    })
  }

  const reorder = (list: IProduct[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setProducts(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <Box>
      <Box sx={{ borderBottom: '5px solid #e2e3e6', width: '100%' }}>
        <Grid container spacing={1} sx={{ margin: '0 20px' }}>
          <Grid item xs={1}>
            <Typography variant="h6">{'סדר'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'תמונה'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'גלריה'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{'כותרת'}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">{'מק״ט'}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{'סטאטוס'}</Typography>
          </Grid>
        </Grid>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              sx={{ margin: '10px 20px' }}
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {products.map((element, index) => {
                return <ProductsEditItem element={element} index={index} />
              })}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {products?.length == 0 && (
        <Box className="centered">
          <Typography variant="body2">אין פריטים עבור קטגוריה זה</Typography>
        </Box>
      )}
    </Box>
  )
}

export default ProductsEditList
