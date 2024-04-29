import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { numberWithCommas } from '../../../helpers/numberWithCommas'
import { useModals } from '../../Modals/provider/ModalProvider'
import { themeColors } from '../../../styles/mui'
import useDataDocumentsItem from '../hook/useDataDocumentsItem'

const DocumentCardList = () => {
  const { selectProduct } = useModals()
  const { data, isLoading } = useDataDocumentsItem()
  return (
    <Box sx={{ marginTop: '30px' }}>
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
                  מוצר
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  כמות
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מחיר יח'
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  הנחה
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  סה״כ
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products['hydra:member']?.map((element, index) => (
              <TableRow
                key={index}
                onClick={() => selectProduct(element?.product)}
              >
                <TableCell>
                  <img
                    width={100}
                    src={
                      element?.product?.defaultImagePath
                        ? process.env.REACT_APP_MEDIA +
                          '/product/' +
                          element?.product?.defaultImagePath
                        : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                    }
                    alt=""
                  />
                </TableCell>
                <TableCell>
                  <Typography>{'#' + element?.sku}</Typography>
                  <Typography>{element?.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.priceByOne}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{element?.discount.toFixed(1) + '%'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {numberWithCommas(element?.total.toFixed(1))}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="centered">
        {data?.products['hydra:member']?.length === 0 && !isLoading && (
          <Typography variant="h6">לא נמצאו פריטים למסמך זה</Typography>
        )}
      </Box>
    </Box>
  )
}

export default DocumentCardList
