import React, { FC, useState } from 'react'
import ModalWrapper from '../../components/ModalWrapper/ModalWrapper'
import { onAsk } from '../../../../shared/MySweetAlert'
import { useProductsEditStore } from '../../../Admin/store/ProductsEditStore'
import { useParams } from 'react-router-dom'

type GalleryProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const Gallery: FC<GalleryProps> = ({ active, setActive }) => {
  const { selectedProduct, updateProduct, getProducts, lvls, deleteImageFunc } =
    useProductsEditStore()

  const deleteImage = async (imageId: string | number) => {
    const ask = await onAsk('אתה בטוח שרוצה למחוק תמונה זו?', '')
    if (ask) {
      deleteImageFunc(imageId)
      await getProducts(lvls.lvl1, lvls.lvl2, lvls.lvl3)
    }
  }

  const handleUpdate = async (media: string) => {
    await updateProduct({ id: selectedProduct?.id, defaultImagePath: media })
    await getProducts(lvls.lvl1, lvls.lvl2, lvls.lvl3)
  }

  return (
    <ModalWrapper
      active={active}
      setActive={setActive}
      height={500}
      width={500}
    >
      <div className="flex-container">
        {selectedProduct?.imagePath?.map((item, index) => {
          return (
            <div className="col-lg-4" key={index}>
              <div style={{ padding: '10px', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => deleteImage(item?.id)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: 'red', fontSize: '30px' }}
                  >
                    delete
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <div className="input active" style={{ background: 'white' }}>
                    {selectedProduct.defaultImagePath ===
                    item?.mediaObject?.filePath ? (
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: 'black',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => handleUpdate('')}
                      >
                        done
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: 'white',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() =>
                          handleUpdate(item?.mediaObject?.filePath)
                        }
                      >
                        done
                      </span>
                    )}
                  </div>
                </div>
                <img
                  className="main-img"
                  src={
                    `${process.env.REACT_APP_MEDIA}/product/` +
                    item?.mediaObject?.filePath
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
    </ModalWrapper>
  )
}

export default Gallery
