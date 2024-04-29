import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { AuthService } from '../../services/auth.service'
import { useAuth } from '../../store/useAuthStore'
import { fileToBase64 } from '../../../../helpers/fileToBase64'
import { onErrorAlert, onSuccessAlert } from '../../../../shared/MySweetAlert'
import Loader from '../../../../shared/Loader'

type formDoc = {
  title: string
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const CreateDocForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formDoc>()
  const { user, getUserDocs } = useAuth()

  const onSubmit: SubmitHandler<formDoc> = async (data) => {
    const extId = user?.extId
    const convertToBase64 = await fileToBase64(acceptedFiles[0])
    const priorityBase64 = 'data:application/pdf;base64,' + convertToBase64
    try {
      setLoading(true)
      if (extId) {
        const res = await AuthService.createUserDocs(
          extId,
          data.title,
          priorityBase64
        )
        if (res.status === 'success') {
          onSuccessAlert('קובץ נשמר בהצלחה', '')
          getUserDocs()
          reset()
        } else {
          onErrorAlert('קובץ לא נשמר', '')
        }
      }
    } catch (e) {
      onErrorAlert('קובץ לא נשמר', '')
    } finally {
      setLoading(false)
    }
  }

  const {
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      pdf: ['application/pdf'],
    },
    multiple: true,
  })

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ))

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div style={{ padding: '50px' }}>
      <Card sx={{ minWidth: 275 }}>
        {loading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent style={{ direction: 'rtl' }}>
            <Typography
              sx={{ fontSize: 21 }}
              color="text.secondary"
              style={{ marginRight: '24px' }}
              gutterBottom
            >
              העלאת קובץ
            </Typography>
            <TextField
              id="outlined-basic"
              label="שם הקובץ"
              variant="outlined"
              style={{ marginRight: '24px' }}
              {...register('title')}
            />
            {errors.title && <span>This field is required</span>}

            <section className="container" style={{ paddingTop: '20px' }}>
              <div {...getRootProps({ className: 'dropzone', style })}>
                <input {...getInputProps({ multiple: true })} />
                <p>גרור ושחרר קובץ כאן, או לחץ כדי לבחור קובץ</p>
              </div>
              <aside>
                {acceptedFiles?.length > 0 && (
                  <>
                    <h4>קוב</h4>
                    <ul>{files}</ul>
                  </>
                )}
              </aside>
            </section>
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained">
              שדר
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default CreateDocForm
