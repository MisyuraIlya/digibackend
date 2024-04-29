import React, { useState } from 'react'
import { useDocuments } from '../store/DocumentsStore'
import moment from 'moment'
import { useCart } from '../../Cart/store/cart.store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useModals } from '../../Modals/provider/ModalProvider'
import { useAuth } from '../../Auth/store/useAuthStore'
import Loader from '../../../shared/Loader'

import { documentTypes } from '../../../enums/documentsTypes'
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { themeColors } from '../../../styles/mui'
import useDataDocuments from '../hook/useDataDocuments'
const DocsFilter = () => {
  const { handleCalendar } = useDocuments()
  const navigate = useNavigate()
  const location = useLocation()
  const { documentType, dateFrom, dateTo } = useParams()
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const { isAdmin, isAgent, isSuperAgent } = useAuth()
  // const {location,push} = useHistory()
  const { id } = useParams()
  const { cart, setCart } = useCart()
  const { setRestoreCartModal, handlePdfViwer } = useModals()
  const [loadingRestoreCart, setLoadingRestoreCart] = useState(false)
  // const { handleCalendar } = useDocumentsProvider()

  // const handleResoreCart = async () => {
  //   try {
  //     setLoadingRestoreCart(true)

  //     // if (!isAdmin || !isAgent || !isSuperAgent) {
  //     //   setRestoreCartModal(true)
  //     // } else {
  //     // if (id) {
  //     const res = await handleRestoreCartFunction()
  //     if (res) {
  //       setCart(res)
  //       navigate('/cart')
  //     }
  //     // }
  //     // }
  //     onSuccessAlert('שחזור בוצע בהצלחה', 'עודכן מחיר עדכני')
  //   } catch (e) {
  //     onErrorAlert('תקלה בשחזור נתונים', 'נסה שנית מאוחר יותר')
  //   } finally {
  //     setLoadingRestoreCart(false)
  //   }
  // }

  // const handleDocument = async (file: string) => {
  //   if (id) {
  //     const link = await downloadDocument(file, id)
  //     // console.log('link',link.url)
  //     // window.open(link.url, '_blank');
  //   }
  // }

  const handleSelect = (parameter: IDocumentTypes) => {
    navigate(`/documentPage/${parameter}/${dateFrom}/${dateTo}?page=1`)
  }

  const { data, mutate } = useDataDocuments()
  const total = data?.['hydra:totalItems'] ?? 0
  return (
    <Paper
      elevation={4}
      sx={{
        display: { sm: 'flex', xs: 'block' },
        justifyContent: 'space-between',
        padding: '20px 20px',
      }}
    >
      <Box sx={{ display: { sm: 'flex', xs: 'block' }, gap: '20px' }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box>
            <Typography variant="h6">מתאריך</Typography>
            <Box
              onClick={() => handleCalendar('from', new Date(dateFrom!))}
              sx={{
                border: '1px solid #f0f3ff',
                padding: '5px 15px',
                gap: '10px',
              }}
              className="centered"
            >
              <CalendarMonthIcon sx={{ fontSize: '25px' }} />
              <Typography variant="body1">
                {moment(dateFrom).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6">לתאריך</Typography>
            <Box
              onClick={() => handleCalendar('to', new Date(dateTo!))}
              sx={{
                border: '1px solid #f0f3ff',
                padding: '5px 15px',
                gap: '10px',
              }}
              className="centered"
            >
              <CalendarMonthIcon sx={{ fontSize: '25px' }} />
              <Typography variant="body1">
                {moment(dateTo).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{
            height: '35px',
            width: '90px',
            fontSize: '18px',
            marginTop: '32px',
          }}
          onClick={() => mutate()}
        >
          חפש
        </Button>
      </Box>
      <Box
        sx={{
          display: { sm: 'flex', xs: 'block' },
          gap: '20px',
          marginTop: '30px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box className="centered">
            <Typography color={themeColors.primary}>
              סה"כ מסמכים: {total}
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ width: '200px' }}>
            <InputLabel id="demo-simple-select-label">מסמך</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={documentType}
              sx={{ height: '40px' }}
              label="מסמך"
              onChange={(e) => handleSelect(e.target.value as IDocumentTypes)}
            >
              {documentTypes?.map((ele, ind) => {
                return (
                  <MenuItem value={ele.value} key={ind}>
                    {ele.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          variant="outlined"
          sx={{
            width: { sm: '200px', xs: '100%' },
            marginTop: { sm: '0px', xs: '20px' },
          }}
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type={'text'}
            placeholder="חיפוש..."
            sx={{ height: '40px' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Paper>
  )
}

export default DocsFilter
