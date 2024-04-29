import React from 'react'
import { useMobile } from '../../../Mobile/store/mobile.store'
import { Box } from '@mui/material'
import CenterComponent from '../CenterComponent/CenterComponent'

const SearchBar = () => {
  const { showMobileSearch } = useMobile()
  return <Box>{showMobileSearch && <CenterComponent />}</Box>
}

export default SearchBar
