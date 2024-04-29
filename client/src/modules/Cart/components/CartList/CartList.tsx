import React from 'react'
import { useCart } from '../../store/cart.store'
import AddToCart from '../AddToCart/AddToCart'
import { useModals } from '../../../Modals/provider/ModalProvider'
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  IconButton,
  TextField,
} from '@mui/material'
import { themeColors } from '../../../../styles/mui'
import DeleteIcon from '@mui/icons-material/Delete'
import { onAsk } from '../../../../shared/MySweetAlert'
import { useAuth } from '../../../Auth/store/useAuthStore'

const CartList = () => {
  const {
    cart,
    CartTitle,
    deleteFromCart,
    changePrice,
    changeDiscount,
    changeSum,
  } = useCart()
  const { selectProduct } = useModals()
  const { isAgent } = useAuth()

  const handeDelete = async (item: ICart) => {
    const ask = await onAsk(
      'למחוק מהסל',
      `למחוק מהסל את הפריט ${item.product.title}`
    )
    if (ask) {
      deleteFromCart(item.sku)
    }
  }
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h5">{CartTitle()}</Typography>
      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky' }}></TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  פריט
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  כמות
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  מחיר
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  הנחה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  סה״כ יחידה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  fontSize={16}
                  fontWeight={700}
                  color={themeColors.primary}
                >
                  סה״כ להזמנה
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((element, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: '0',
                      background: 'white',
                      minWidth: '150px',
                      zIndex: 1,
                    }}
                  >
                    <Box className="centered">
                      <IconButton onClick={() => handeDelete(element)}>
                        <DeleteIcon sx={{ color: themeColors.primary }} />
                      </IconButton>
                      <AddToCart item={element?.product} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px', width: '350px' }}>
                      <img
                        width={120}
                        src={
                          element?.product?.defaultImagePath
                            ? process.env.REACT_APP_MEDIA +
                              '/product/' +
                              element?.product?.defaultImagePath
                            : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                        }
                        onClick={() => selectProduct(element?.product)}
                      />
                      <Box
                        sx={{
                          textAlign: 'right',
                          display: 'flex',
                          justifyContent: 'right',
                          alignItems: 'center',
                        }}
                      >
                        <Box sx={{ width: '100%', textAlign: 'right' }}>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: 'left' }}
                            color={themeColors.primary}
                          >
                            {' '}
                            #{element?.product?.sku}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: 'left' }}
                            fontWeight={800}
                            color={themeColors.primary}
                          >
                            {element?.product?.title}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    <Typography variant="body1" color={themeColors.primary}>
                      {element?.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.product.finalPrice}
                        onChange={(e) => changePrice(element, +e.target.value)}
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        {element?.product?.finalPrice} ₪{' '}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.discount}
                        onChange={(e) =>
                          changeDiscount(element, +e.target.value)
                        }
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        {element?.discount} %
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    {isAgent ? (
                      <TextField
                        value={element?.price}
                        onChange={(e) => changeSum(element, +e.target.value)}
                        sx={{
                          width: '50%',
                          '& input': {
                            textAlign: 'center',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            backgroundColor: '#f3f5f9',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" color={themeColors.primary}>
                        ₪{element?.price}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '100px' }}>
                    <Typography variant="body1" color={themeColors.primary}>
                      ₪{element?.total}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartList
