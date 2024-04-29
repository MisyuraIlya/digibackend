import React from 'react'
import ProductsEditList from '../components/ProductsEdit/ProductsEditList'
import { useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import ProductsEditFilters from '../components/ProductsEdit/ProductsEditFilters'
import Loader from '../../../shared/Loader'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import useDataProductsEdit from '../hooks/useDataProductsEdit'
import { findCategoryTitleById } from '../../../helpers/handleBreadCrumbs'
import useDataCategories from '../../Catalog/hook/useDataCategories'

const ProductsEdit = () => {
  const { lvl1, lvl2, lvl3 } = useParams()
  const { isLoading } = useDataProductsEdit()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)
  const res3 = findCategoryTitleById(+lvl2!, categoriesArray)

  return (
    <Container maxWidth="lg">
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}/0` || '',
          },
        ]}
      />
      <ProductsEditFilters />
      <ProductsEditList />
    </Container>
  )
}

export default ProductsEdit
