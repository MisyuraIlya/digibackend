import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../../Auth/store/useAuthStore'
import { useModals } from '../../../provider/ModalProvider'
import { onErrorAlert } from '../../../../../shared/MySweetAlert'
import AuthInput from '../../../../Auth/components/AuthInput/AuthInput'

const NewB2bCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formNewB2bForm>()
  const { setOpenAuthModal } = useModals()
  const { registerClient, setAction } = useAuth()

  const onSubmit = async (data: formNewB2bForm) => {
    if (data.password === data.confirmPassword) {
      await registerClient(data)
      setOpenAuthModal(false)
    } else {
      onErrorAlert('סיסמאות חיבות להיות תואמות', '')
    }
  }

  return (
    <form className="register" onSubmit={handleSubmit(onSubmit)}>
      <div className="connect-b2b-form">
        <div>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '50px' }}
          >
            person
          </span>
        </div>
        <h3>{'הרשמה לקוח חדש'}</h3>
        <AuthInput
          title={'שם מלא'}
          name={'fullName'}
          register={register}
          error={errors.fullName?.message || ''}
        />
        <AuthInput
          title={'טלפון'}
          name={'phone'}
          register={register}
          error={errors.phone?.message || ''}
        />
        <AuthInput
          title={'עיר'}
          name={'town'}
          register={register}
          error={errors.town?.message || ''}
        />
        <AuthInput
          title={'כתובת'}
          name={'address'}
          register={register}
          error={errors.address?.message || ''}
        />
        <AuthInput
          title={'מייל'}
          name={'email'}
          register={register}
          error={errors.email?.message || ''}
        />
        <AuthInput
          title={'עיסוק'}
          name={'business'}
          register={register}
          error={errors.business?.message || ''}
        />

        <div className="accept">
          <button type="submit">{'הרשמה'}</button>
        </div>
      </div>
    </form>
  )
}

export default NewB2bCustomer
