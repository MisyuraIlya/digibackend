import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { AdminCatalogService } from '../../services/catalog.service'
import CategoryEditItem from './CategoryEditItem'
import { Box, Grid, Typography } from '@mui/material'
import useDataCategoryEdit from '../../hooks/useDataCategoryEdit'

const CategoriesEditList = () => {
  const { data } = useDataCategoryEdit()
  const [categories, setCategories] = useState<ICategory[]>([])

  const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#e5e5e5' : '#ddd',
  })

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: any
  ): React.CSSProperties => ({
    userSelect: 'none',
    background: isDragging ? '#f9f9f9' : '#fff',
    ...draggableStyle,
  })

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedCategories = reorder(
      categories,
      result.source.index,
      result.destination.index
    )

    const updatedCategories = reorderedCategories.map((category, index) => ({
      ...category,
      orden: index,
    }))

    setCategories(updatedCategories)
    await AdminCatalogService.dragAndDropCategories(updatedCategories)
  }

  const reorder = (list: ICategory[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  useEffect(() => {
    setCategories(data?.['hydra:member'] ?? [])
  }, [data?.['hydra:member']])

  return (
    <Box>
      <Box sx={{ borderBottom: '5px solid #e2e3e6', width: '100%' }}>
        <Grid container spacing={1} sx={{ margin: '0 20px' }}>
          <Grid item xs={1}>
            <Typography variant="h6">{'כניסה'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'סדר'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'תמונה'}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6">{'מזהה'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{'כותרת'}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">{'סטאטוס'}</Typography>
          </Grid>
        </Grid>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              sx={{ margin: '0 25px' }}
              {...provided.innerRef}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {categories?.map((element, index) => {
                return (
                  <Box key={index} sx={{ margin: '10px 0px' }}>
                    <Draggable
                      key={element.id}
                      draggableId={element.id + ''}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <CategoryEditItem element={element} />
                        </Box>
                      )}
                    </Draggable>
                  </Box>
                )
              })}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default CategoriesEditList
