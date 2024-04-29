import React from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import useDataAgentClients from '../../hooks/useDataAgentClients'
import { themeColors } from '../../../../styles/mui'
import { UserStatus } from '../../../../enums/status'
import { useCart } from '../../../Cart/store/cart.store'
import { onAsk } from '../../../../shared/MySweetAlert'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Auth/store/useAuthStore'

const AgentClientsList = () => {
  const { data, isLoading } = useDataAgentClients()
  const { setUser } = useAuth()
  const { cart, setCart } = useCart()
  const navigate = useNavigate()

  const handleUser = async (user: IUser) => {
    if (cart.length > 0) {
      const ask = await onAsk('קיימים פריטים בסל', 'כל הפריטים ימחקו')
      if (ask) {
        setCart([])
        setUser(user)
        navigate('/profile')
      }
    } else {
      setUser(user)
      navigate('/profile')
    }
  }
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className="lines-sub-cont">
          <TableHead>
            <TableRow className="heading">
              <TableCell className="col-cont sticky-col">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  שם לקוח
                </Typography>
              </TableCell>
              <TableCell className="col-cont sticky-col">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  מס לקוח
                </Typography>
              </TableCell>
              <TableCell className="col-cont">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  ח.פ/ע.מ
                </Typography>
              </TableCell>
              <TableCell className="col-cont">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  כתובת
                </Typography>
              </TableCell>
              <TableCell className="col-cont">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  עיר
                </Typography>
              </TableCell>
              <TableCell className="col-cont">
                <Typography
                  variant="body2"
                  color={themeColors.primary}
                  fontWeight={800}
                >
                  סטאטוס
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data?.['hydra:member']?.map((element, index) => {
                return (
                  <TableRow
                    key={index}
                    className={'item'}
                    onClick={() => handleUser(element)}
                  >
                    <TableCell>
                      <Typography variant="body2">{element?.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.extId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.hp}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {element?.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{element?.city}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {UserStatus(element)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AgentClientsList
