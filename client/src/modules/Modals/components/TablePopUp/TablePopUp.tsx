import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useSelectedProduct } from '../../store/selecterdProduct.store'
import moment from 'moment'
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { themeColors } from '../../../../styles/mui'
import useDataPurchesHistory from '../../hooks/useDataPurchesHistory'

type TablePopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const TablePopUp: FC<TablePopUpProps> = ({ active, setActive }) => {
  const { selectedProd } = useSelectedProduct()
  const { data, isLoading } = useDataPurchesHistory(selectedProd.sku)
  return (
    <ModalWrapper width={50} height={65} active={active} setActive={setActive}>
      <Box>
        <>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {'פירוט היסטוריית רכישה'}
            </Typography>
            <Typography variant="h6">{selectedProd?.title}</Typography>
            <Typography variant="h6">{selectedProd?.sku + '#'}</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מסמך'}
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'תאריך'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'כמות'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מחיר'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'מחיר אחרי מע"מ'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'הנחה'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'סה"כ בתנועה'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={themeColors.primary}
                      fontWeight={800}
                    >
                      {'סה"כ בתנועה אחרי מע"מ'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  data?.['hydra:member']?.map((element, index) => (
                    <TableRow
                      key={index}
                      // onClick={() => selectProduct(element?.product)}
                    >
                      <TableCell>
                        <Typography>{element?.documentNumber}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(element?.date).format('DD-MM-YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.discount}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.totalPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{element?.vatTotal}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {data?.['hydra:member'].length === 0 && !isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
              }}
            >
              <Typography variant="h6">לא נמצאו הזמנות עם הפריט זה</Typography>
            </Box>
          )}
        </>
      </Box>
    </ModalWrapper>
  )
}

export default TablePopUp
