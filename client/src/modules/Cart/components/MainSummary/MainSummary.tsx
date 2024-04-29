import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import { useCart } from '../../store/cart.store'
import { themeColors } from '../../../../styles/mui'

const MainSummary = () => {
  const {
    selectedMode,
    cart,
    totalBeforeTax,
    totalTax,
    totalAfterTax,
    finalPrice,
  } = useCart()
  return (
    <>
      <List>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color={themeColors.primary}>
            כמות שורות
          </Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {cart.length}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`סה"כ לפני מע"מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalBeforeTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`דמי משלוח`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {process.env.DELIVERY_PRICE} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`מע"מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body1"
            color={themeColors.primary}
          >{`מחיר אחרי מע״מ`}</Typography>
          <Typography variant="body1" color={themeColors.primary}>
            {`${totalAfterTax().toFixed(1)}`} ₪
          </Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color={themeColors.primary}>
            {'מחיר לתשלום'}
          </Typography>
          <Typography variant="h6" fontWeight={900} color={themeColors.primary}>
            {finalPrice().toFixed(1)} ₪
          </Typography>
        </ListItem>
      </List>

      {selectedMode === 'quote' && (
        <List>
          <ListItem>
            <ListItemText primary={`ללא אישור מנהל`} />
          </ListItem>
        </List>
      )}

      {+process.env.MINIMUM_DELIVERY_PRICE! > totalBeforeTax() &&
      selectedMode === 'order' ? (
        <Typography color={themeColors.primary}>
          {'עליך לצבור עוד ' +
            Math.abs(
              totalBeforeTax() - +process.env.MINIMUM_DELIVERY_PRICE!
            ).toFixed(1) +
            ' ש"ח עד למינימום הזמנה'}
        </Typography>
      ) : null}
    </>
  )
}

export default MainSummary
