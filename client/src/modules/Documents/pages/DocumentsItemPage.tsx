import React from 'react'
import DocumentCardList from '../components/DocumentCardList'
import { useParams } from 'react-router-dom'
import DocsTotal from '../components/DocsTotal'
import moment from 'moment'
import DocsItemFilter from '../components/DocsItemFilter'
import { Container } from '@mui/material'
import BreadCrumbsUtil from '../../../utils/BreadCrumbs/BreadCrumbsUtil'
import Loader from '../../../shared/Loader'
import useDataDocumentsItem from '../hook/useDataDocumentsItem'
const DocumentsItemPage = () => {
  const { documentItemType, id } = useParams()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')
  const { isLoading } = useDataDocumentsItem()

  return (
    <Container maxWidth="xl">
      {isLoading && <Loader />}
      <BreadCrumbsUtil
        array={[
          {
            title: 'מסמכים',
            link: `/documentPage/${documentItemType}/${from}/${to}?page=1`,
          },
          { title: id || '', link: '' },
        ]}
      />
      <DocsItemFilter />
      <DocumentCardList />
      <DocsTotal />
    </Container>
  )
}

export default DocumentsItemPage
