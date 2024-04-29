import { Box } from '@mui/material'
import React from 'react'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { useProductsEditStore } from '../../store/ProductsEditStore'

const ProductsEditFilters = () => {
  const { search, setSearch } = useProductsEditStore()
  return (
    <Box>
      <SearchInput
        value={search}
        setValue={setSearch}
        placeholder="חיפוש לפי שם קטגוריה"
      />
    </Box>
  )
}

export default ProductsEditFilters
