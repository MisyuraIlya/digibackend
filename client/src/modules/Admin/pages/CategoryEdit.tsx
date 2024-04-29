import React from 'react'
import CategoriesEditList from '../components/CategoryEdit/CategoriesEditList'
import CategoryEditFilters from '../components/CategoryEdit/CategoryEditFilters'
import Loader from '../../../shared/Loader'
import { useParams } from 'react-router-dom'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import { Container } from '@mui/material'
import useDataCategoryEdit from '../hooks/useDataCategoryEdit'
import { findCategoryTitleById } from '../../../helpers/handleBreadCrumbs'
import useDataCategories from '../../Catalog/hook/useDataCategories'

const CategoryEdit = () => {
  const { isLoading } = useDataCategoryEdit()
  const { lvl1, lvl2 } = useParams()
  const { data } = useDataCategories()
  const categoriesArray = data?.['hydra:member'] || []
  const res1 = findCategoryTitleById(+lvl1!, categoriesArray)
  const res2 = findCategoryTitleById(+lvl2!, categoriesArray)

  return (
    <Container maxWidth="lg">
      <BreadCrumbsUtil
        array={[
          {
            title: res1 ?? '',
            link: `/admin/category-edit/${lvl1}/0` || '',
          },
          {
            title: res2 ?? '',
            link: `/admin/category-edit/${lvl1}/${lvl2}` || '',
          },
        ]}
      />
      {isLoading && <Loader />}
      <CategoryEditFilters />
      <CategoriesEditList />
    </Container>
  )
}

export default CategoryEdit
