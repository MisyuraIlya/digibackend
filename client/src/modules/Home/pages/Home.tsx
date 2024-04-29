import React, { useEffect } from 'react'
import VideoSection from '../components/VideoSection/VideoSection'
import SliderSection from '../components/SliderSection/SliderSection'
import ContactFooter from '../../../shared/ContactFooter'
import { useCatalog } from '../../Catalog/store/CatalogStore'
import ProductSection from '../components/SliderSection/ProductSection'
import { useAuth } from '../../Auth/store/useAuthStore'
import { Box, Container } from '@mui/material'
import useDataCategories from '../../Catalog/hook/useDataCategories'
import ProductsEditList from '../../Admin/components/ProductsEdit/ProductsEditList'
const HomePage = () => {
  const { user } = useAuth()
  return (
    <Box>
      <Container maxWidth="xl" sx={{ marginBottom: '200px' }}>
        <Box sx={{ marginTop: '70px' }}>
          <VideoSection />
        </Box>
        {/* <Box sx={{ marginTop: '50px' }}>
          <SliderSection />
        </Box> */}
        {/* <Box>
          <ProductSection
            title={'מוצרים קבועים'}
            array={[]}
            toShow={5}
            column={1}
            loading={false}
          />
        </Box>
        <Box>
          <ProductSection
            title={'מוצרים קבועים'}
            array={[]}
            toShow={5}
            column={1}
            loading={false}
          />
        </Box> */}
      </Container>
      <ContactFooter />
    </Box>
  )
}

export default HomePage
