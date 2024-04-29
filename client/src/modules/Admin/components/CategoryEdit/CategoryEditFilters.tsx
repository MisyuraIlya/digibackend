import { Box } from '@mui/material'
import React from 'react'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import { useAdminCategories } from '../../store/CategoriesStore'

const CategoryEditFilters = () => {
  const { search, setSearch } = useAdminCategories()
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

export default CategoryEditFilters
