import React, { FC } from 'react'
import ModalWrapper from '../ModalWrapper/ModalWrapper'
import { useModals } from '../../provider/ModalProvider'

interface PdfViwerProps {
  active: boolean
  setActive: (value: boolean) => void
}

const PdfViwer: FC<PdfViwerProps> = ({ active, setActive }) => {
  const { pdfLinkOrBase64 } = useModals()

  const isPdfDataURI = (str: string) => {
    const regex = /^data:application\/pdf;base64,/
    return regex.test(str)
  }

  const isOctetStreamDataURI = (str: string) => {
    const regex = /^data:application\/octet-stream;base64,/
    return regex.test(str)
  }

  const isBase64DataURI = (str: string) => {
    return isPdfDataURI(str) || isOctetStreamDataURI(str)
  }

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }

  const renderPdfContent = () => {
    try {
      if (isBase64DataURI(pdfLinkOrBase64)) {
        const blob = dataURItoBlob(pdfLinkOrBase64)
        const blobUrl = URL.createObjectURL(blob)
        return (
          <iframe
            className="pdf-ele"
            src={blobUrl}
            width={'100%'}
            height={'90%'}
          ></iframe>
        )
      } else {
        return (
          <iframe
            className="pdf-ele"
            src={pdfLinkOrBase64}
            width={'100%'}
            height={'90%'}
          ></iframe>
        )
      }
    } catch (e) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>PDF לא תקין</h1>
        </div>
      )
    }
  }

  return (
    <ModalWrapper active={active} setActive={setActive} height={90} width={40}>
      {renderPdfContent()}
    </ModalWrapper>
  )
}

export default PdfViwer
