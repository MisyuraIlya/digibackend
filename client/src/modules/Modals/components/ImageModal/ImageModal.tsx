import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useModals } from '../../provider/ModalProvider'

interface ImageModalProps {
  active: boolean
  setActive: (value: boolean) => void
}

const ImageModal: FC<ImageModalProps> = ({ active, setActive }) => {
  const { srcImageModal } = useModals()
  return (
    <>
      {active && (
        <div className="modai-image animated">
          <div onClick={() => setActive(false)} className="close">
            <span className="material-symbols-outlined">close</span>
          </div>
          <div className="img-wrapper">
            <img src={srcImageModal} />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageModal
