import React, { useState } from 'react'
import CatalogSearch from '../../../Catalog/components/CatalogSearch/CatalogSearch'
import { Box } from '@mui/material'
import SearchInput from '../../../../utils/SearchInput/SearchInput'
import ProductList from '../../../../utils/SearchInput/components/ProductList'
import useSWR from 'swr'
import { CatalogServices } from '../../../Catalog/services/catalog.service'
import { useDebounce } from 'use-debounce'
import { useModals } from '../../../Modals/provider/ModalProvider'

const CenterComponent = () => {
  const [search, setSearch] = useState<string>('')
  const [valueDebounced] = useDebounce(search, 400)
  const { selectProduct } = useModals()
  const fetchData = async (): Promise<GetCatalogResponse> => {
    if (valueDebounced) {
      return await CatalogServices.GetCatalog(
        '0',
        '0',
        '0',
        `?search=${valueDebounced}`,
        'search'
      )
    } else {
      return {
        'hydra:member': [],
        'hydra:totalItems': 0,
        'hydra:view': {
          '@id': '',
          'hydra:first': '',
          'hydra:last': '',
          'hydra:next': '',
          'hydra:previous': '',
        },
      }
    }
  }

  const onClickHandle = (product: IProduct) => {
    selectProduct(product)
  }

  const { data, isLoading, mutate } = useSWR<GetCatalogResponse>(
    `/api/catalog/search/0/0/0?search=${search}`,
    () => fetchData(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const handleDebounced = (valueDebounced: string) => {
    mutate()
  }

  return (
    <Box sx={{ width: '100%', position: 'relative', zIndex: 10 }}>
      <SearchInput
        value={search}
        setValue={setSearch}
        handleFunction={handleDebounced}
        placeholder="חפש מוצר..."
        ListComponent={
          <ProductList
            onClick={onClickHandle}
            array={data?.['hydra:member'] ?? []}
            loading={isLoading}
            totalFound={data?.['hydra:totalItems'] ?? 0}
            searchValue={search}
            setSearchValue={setSearch}
          />
        }
      />
    </Box>
  )
}

export default CenterComponent
