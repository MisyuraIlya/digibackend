import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import MyCropper from '../../../../shared/MyCropper'
import { base64ToFile } from '../../../../helpers/base64ToFile'
import { MediaObjectService } from '../../../Admin/services/mediaObject.service'
import {
  TextField,
  TextareaAutosize,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import { useNotificationStore } from '../../store/notificationStore'
import AddIcon from '@mui/icons-material/Add'
import useDataNotification from '../../hooks/useDataNotification'

interface LeftSideForm {
  title: string
  description: string
  link: string
}

const LeftSide = () => {
  const { choosedItem, setChoosedItem } = useNotificationStore()
  const { updateMutation, createMutation } = useDataNotification()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeftSideForm>()

  const handleForm = async (data: LeftSideForm) => {
    if (choosedItem) {
      choosedItem.title = data.title
      choosedItem.description = data.description
      choosedItem.link = data.link
      updateMutation(choosedItem)
      setChoosedItem(null)
    }
  }

  const uploadImg = async (img: string, fileName: string) => {
    const convertFile = base64ToFile(img, fileName)
    const res = await MediaObjectService.uploadImage(
      convertFile,
      'notifications'
    )
    if (choosedItem) {
      //@ts-ignore
      choosedItem.image = res['@id']
      await updateMutation(choosedItem)
    }
  }

  useEffect(() => {
    if (choosedItem) {
      setValue('title', choosedItem.title || '')
      setValue('description', choosedItem.description || '')
      setValue('link', choosedItem.link || '')
    }
  }, [choosedItem])

  return (
    <>
      {choosedItem?.id ? (
        <Paper elevation={4} sx={{ minHeight: '500px', borderRadius: '10px' }}>
          <form onSubmit={handleSubmit(handleForm)}>
            <Box sx={{ padding: '10px' }}>
              <TextField
                fullWidth
                sx={{ background: '#f3f5f9' }}
                placeholder="כותרת ההודעה"
                {...register('title')}
              />
              <TextareaAutosize
                minRows={6}
                style={{
                  background: '#f3f5f9',
                  width: '94%',
                  resize: 'none',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  margin: '10px 0px',
                }}
                placeholder="מלל הודעה"
                {...register('description')}
              />
              <TextField
                fullWidth
                sx={{ background: '#f3f5f9' }}
                placeholder="קישור"
                {...register('link')}
              />
              <Box className="centered" sx={{ marginTop: '50px' }}>
                <MyCropper
                  aspectRatio={16 / 16}
                  uploadImg={uploadImg}
                  itemImage={
                    choosedItem?.image?.filePath
                      ? `${process.env.REACT_APP_MEDIA}/notifications/${choosedItem?.image?.filePath}`
                      : `${process.env.REACT_APP_MEDIA}/placeholder.jpg`
                  }
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  marginTop: '50px',
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{ width: '100px' }}
                >
                  בטל
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: '100px' }}
                >
                  שמור
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      ) : (
        <Paper
          elevation={4}
          className="centered"
          sx={{ minHeight: '500px', borderRadius: '10px' }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => createMutation(null)}
            startIcon={<AddIcon />}
          >
            <Typography variant="h6">חדש</Typography>
          </Button>
        </Paper>
      )}
    </>
  )
}

export default LeftSide
