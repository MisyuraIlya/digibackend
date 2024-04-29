import React, { FC, useState } from 'react'
import { useNotificationStore } from '../../store/notificationStore'
import moment from 'moment'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Radio from '@mui/material/Radio'
import ModalWrapper from '../../../Modals/components/ModalWrapper/ModalWrapper'
import useDataNotification from '../../hooks/useDataNotification'

interface NotificationItemProps {
  element: INotification
  index: number
}
const NotificationItem: FC<NotificationItemProps> = ({ element, index }) => {
  const { setChoosedItem } = useNotificationStore()
  const [openModal, setOpenModal] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

  const isButtonDisabled = selectedValue === ''

  const handleSubmit = () => {
    // Your submission logic here
    console.log('Selected value:', selectedValue)
  }

  const { createMutation, deleteMutation } = useDataNotification()

  return (
    <>
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <img
                  src={
                    element?.image?.filePath
                      ? process.env.REACT_APP_MEDIA +
                        '/notifications/' +
                        element?.image?.filePath
                      : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                  }
                />
              </Grid>
              <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">{element.title}</Typography>
              </Grid>
              <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">
                  {moment(element?.createdAt).format('DD-MM-YYYY HH:mm')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body2">{element.description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => deleteMutation(element.id!)}
            >
              מחק
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() => createMutation(element)}
            >
              העתק
            </Button>
            <Button
              variant="outlined"
              startIcon={<ModeEditIcon />}
              onClick={() => setChoosedItem(element)}
            >
              עדכן
            </Button>
            <Button
              variant="outlined"
              startIcon={<SendIcon />}
              color="success"
              onClick={() => setOpenModal(true)}
            >
              שלח
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ModalWrapper
        active={openModal}
        setActive={setOpenModal}
        height={18}
        width={10}
      >
        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              בחר מהרשימה
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedValue}
              onChange={handleRadioChange}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="allUsers"
                control={<Radio />}
                label="כל המשתמשים"
              />
              <FormControlLabel
                value="allAgents"
                control={<Radio />}
                label="כל הסוכנים"
              />
            </RadioGroup>
          </FormControl>
          <Button
            sx={{ marginTop: '20px' }}
            variant="contained"
            color="success"
            fullWidth={true}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            שלח
          </Button>
        </Box>
      </ModalWrapper>
    </>
  )
}

export default NotificationItem
