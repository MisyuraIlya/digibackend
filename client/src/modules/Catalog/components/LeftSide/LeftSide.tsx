import React from 'react'
import ProductList from './components/ProductList/ProductList'
import FiltersBlock from './components/FiltersBlock/FiltersBlock'
import { Box } from '@mui/material'
import PaginationUtil from '../../../../utils/pagination/PaginationUtil'
import useDataCatalog from '../../hook/useDataCatalog'

const LeftSide = () => {
  const { hydraPagination } = useDataCatalog()
  return (
    <Box>
      <FiltersBlock />
      <ProductList />
      {hydraPagination && <PaginationUtil hydraPagination={hydraPagination} />}
    </Box>
  )
}

export default LeftSide
