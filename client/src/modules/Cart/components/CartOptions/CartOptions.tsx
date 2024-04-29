import React from 'react'
import { useCart } from '../../store/cart.store'
import { onAsk } from '../../../../shared/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Box, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveAsIcon from '@mui/icons-material/SaveAs'

const CartOptions = () => {
  const { cart, setCart, selectedMode, saveDarft } = useCart()
  const navigate = useNavigate()
  let from = moment().subtract(1, 'months').format('YYYY-MM-DD')
  let to = moment().format('YYYY-MM-DD')

  const askDelete = async () => {
    const ask = await onAsk('האם אתה בטוח?', 'כל המוצרים בעגלה יימחקו')
    if (ask) {
      setCart([])
    }
  }

  const handleSaveAsDraft = async () => {
    const ask = await onAsk(
      'שמור הזמנה כטיוטה?',
      'טיוטה תשמר וסל הקניות הנוכחי יתרוקן'
    )
    if (ask) {
      saveDarft()
      navigate(`/historyPage?page=1&from=${from}&to=${to}`)
      setCart([])
    }
  }

  const handleToDraft = () => {
    navigate(`/historyPage?page=1&from=${from}&to=${to}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        gap: '20px',
        margin: '0 20px',
      }}
    >
      {cart.length > 0 && (
        <Button
          onClick={() => askDelete()}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
            minWidth: { sm: { minWidth: '130px' }, xs: { minWidth: '100px' } },
            height: '39px',
          }}
        >
          מחק סל
        </Button>
      )}
      {cart.length > 0 && selectedMode == 'order' && (
        <Button
          variant="contained"
          onClick={() => handleSaveAsDraft()}
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
            minWidth: { sm: { minWidth: '130px' }, xs: { minWidth: '100px' } },
            height: '35px',
          }}
          startIcon={<SaveAsIcon />}
        >
          שמור טיוטה
        </Button>
      )}
      {selectedMode == 'order' && (
        <Button
          variant="contained"
          onClick={() => handleToDraft()}
          sx={{
            fontSize: '14px',
            whiteSpace: 'nowrap',
            minWidth: { sm: { minWidth: '130px' }, xs: { minWidth: '100px' } },
            height: '35px',
          }}
          startIcon={<SaveAsIcon />}
        >
          טען טיוטה
        </Button>
      )}
    </Box>
  )
}

export default CartOptions
