import React from 'react'
import {
  Container,
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
  FormControl,
} from '@mui/material'
import { colors, themeColors } from '../styles/mui'
import { useForm, Controller } from 'react-hook-form'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

type form = {
  firstName: string
  lastName: string
  phone: string
  email: string
  description: string
}

const ContactFooter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<form>()

  return (
    <Box sx={{ backgroundColor: themeColors.primary, padding: '40px 100px' }}>
      <Box sx={{ minHeight: '400px' }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box
              sx={{
                color: 'white',
                bgcolor: colors.alpha.white[5],
                height: '100%',
                padding: '24px',
              }}
            >
              <Typography variant="h5">יש לכם שאלות? תצרו איתנו קשר</Typography>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר לקוח פנימי*"
                        placeholder="הכנס את המספר שלך"
                        type="text"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר לקוח פנימי*"
                        placeholder="הכנס את המספר שלך"
                        type="text"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר לקוח פנימי*"
                        placeholder="הכנס את המספר שלך"
                        type="text"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'מספר לקוח שדה חובה',
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label="מספר לקוח פנימי*"
                        placeholder="הכנס את המספר שלך"
                        type="text"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{
                          color: 'white',
                          '& .MuiInput-underline:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottomColor: 'white',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                        InputLabelProps={{ style: { color: 'white' } }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <img
              src={`${process.env.REACT_APP_MEDIA}/logo.png`}
              alt=""
              style={{ width: '120px' }}
            />
            <Box sx={{ width: '600px' }}>
              <Typography variant="body2" color={'white'}>
                Lacus fringilla laoreet quam euismod eu lectus quam aliquet
                nisi. Cras interdum aliquet leo justo sed pellentesque commodo
                commodo. Risus turpis turpis cursus quam dictum mattis odio
                eget. Dignissim cursus augue morbi risus tempor sem erat sed
                pretium. Et placerat eleifend diam eu. Fringilla mattis tempor
                eu vitae pellentesque blandit. Sit facilisi urna enim facilisis
                porta in nunc at et. Leo ipsum ut feugiat nulla viverra volutpat
                nunc. Elementum vel pharetra consequat nec elit sapien pretium
                felis morbi. Bibendum porttitor ornare viverra velit amet nibh.
              </Typography>
            </Box>
            <Grid container sx={{ width: '400px' }} spacing={'8px'}>
              <Grid item xs={2}>
                <Typography variant="body2" color={'white'}>
                  כתובת
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" color={'white'}>
                  407 Cherry Tree Close, St. Peters 00898
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" color={'white'}>
                  טלפון
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" color={'white'}>
                  0123-45-67
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" color={'white'}>
                  מייל
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" color={'white'}>
                  companyemail@company.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
          paddingTop: '40px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '36px' }}>
          <Typography sx={{ textDecoration: 'underline' }}>
            Accessibility Statement
          </Typography>
          <Typography sx={{ textDecoration: 'underline' }}>
            Terms of Use
          </Typography>
        </Box>
        <Box>
          <Typography>Digitrade</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactFooter
