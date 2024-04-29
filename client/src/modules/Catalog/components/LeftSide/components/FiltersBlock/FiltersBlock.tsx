import React, { useEffect, useState } from 'react'
import { useCatalog } from '../../../../store/CatalogStore'
import { useDebounce } from 'use-debounce'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { themeColors } from '../../../../../../styles/mui'
import CloseIcon from '@mui/icons-material/Close'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import WindowIcon from '@mui/icons-material/Window'
import useDataCatalog from '../../../../hook/useDataCatalog'

const arrOrden = [
  { value: '1', label: 'שם' },
  { value: '2', label: 'מק״ט' },
  { value: '3', label: 'מומלץ' },
]

const FiltersBlock = () => {
  const [search, setSearch] = useState<string>('')
  const {
    listView,
    setListView,
    prodsPerPage,
    setProdsPerPage,
    sortProdSetting,
    setSortProdSetting,
  } = useCatalog()
  const { data } = useDataCatalog()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchDebounce] = useDebounce(search, 1000)
  const arrProdsPerPage = ['2', '24', '48']
  const totalItems = data ? data?.['hydra:totalItems'] : '0'

  const handleSearchValue = (value: string) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('page', '1')
    if (value) {
      urlSearchParams.set('search', value)
    } else {
      urlSearchParams.delete('search')
    }
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
  }

  const handleChangeItemsPerPage = (event: SelectChangeEvent) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('itemsPerPage', event.target.value)
    urlSearchParams.set('page', '1')
    const updatedUrl = '?' + urlSearchParams.toString()
    setProdsPerPage(event.target.value)
    navigate(location.pathname + updatedUrl)
  }

  const handleOrderBy = (event: SelectChangeEvent) => {
    const urlSearchParams = new URLSearchParams(location.search)
    urlSearchParams.set('orderBy', event.target.value)
    const updatedUrl = '?' + urlSearchParams.toString()
    navigate(location.pathname + updatedUrl)
    if (event.target.value == '1') {
      setSortProdSetting('1', 'שם')
    } else if (event.target.value == '2') {
      setSortProdSetting('2', 'מק״ט')
    } else if (event.target.value == '3') {
      setSortProdSetting('3', 'מומלץ')
    }
  }

  useEffect(() => {
    handleSearchValue(searchDebounce)
  }, [searchDebounce])

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: '10px 0',
        borderBottom: '1px solid rgba(65, 67, 106, 0.2117647059)',
        borderTop: '1px solid rgba(65, 67, 106, 0.2117647059)',
      }}
    >
      <Grid
        item
        xs={6}
        sm={2}
        sx={{
          paddingTop: '10px !important',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color={themeColors.primary}>
          {'נמצאו: ' + totalItems + ' מוצרים'}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sm={4}
        className="centered"
        sx={{ paddingTop: '10px !important' }}
      >
        <TextField
          placeholder="חיפוש מוצר.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            border: '1px solid gray',
            borderRadius: '4px',
            padding: '0',
            '& input': {
              padding: '7px 10px',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                {search ? (
                  <CloseIcon onClick={() => setSearch('')} />
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={2}
        sx={{
          paddingTop: '10px !important',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
          sx={{ paddingRight: '8px' }}
        >
          מוצרים:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, margin: '0px' }} size="small">
          <Select value={prodsPerPage} onChange={handleChangeItemsPerPage}>
            {arrProdsPerPage?.map((item, key) => (
              <MenuItem key={key} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={6}
        sm={2}
        sx={{
          paddingTop: '10px !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
          sx={{ paddingRight: '8px' }}
        >
          מיון:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, margin: '0px' }} size="small">
          <Select value={sortProdSetting.value} onChange={handleOrderBy}>
            {arrOrden?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        sx={{
          paddingTop: '10px !important',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          color={themeColors.primary}
          sx={{ paddingRight: '5px' }}
        >
          תצוגה:
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <IconButton
            style={{
              border: !listView
                ? '1px solid rgba(65, 67, 106, 0.2117647059)'
                : '',
              borderRadius: '0px',
              padding: '7px',
            }}
            onClick={() => setListView(false)}
          >
            <WindowIcon sx={{ fontSize: '25px' }} />
          </IconButton>
          <IconButton
            style={{
              border: listView
                ? '1px solid rgba(65, 67, 106, 0.2117647059)'
                : '',
              borderRadius: '0px',
              padding: '7px',
            }}
            onClick={() => setListView(true)}
          >
            <FormatListBulletedIcon sx={{ fontSize: '25px' }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FiltersBlock
