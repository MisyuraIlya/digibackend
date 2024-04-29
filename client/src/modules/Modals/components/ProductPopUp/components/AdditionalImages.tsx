import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useState, useEffect, useRef } from 'react'
import { useSelectedProduct } from '../../../store/selecterdProduct.store'

const AdditionalImages = () => {
  const { selectedProd, changeDefaultImage } = useSelectedProduct()
  const swiperRef = useRef<null>(null)
  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    slidesPerView: 3,
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper
    },
    breakpoints: {
      1400: {
        slidesPerView: 5,
        slidesPerColumn: 1,
      },
      1000: {
        slidesPerView: 5,
        slidesPerColumn: 1,
      },
      600: {
        slidesPerView: 2,
        slidesPerColumn: 1,
      },
      0: {
        slidesPerView: 2,
        slidesPerColumn: 1,
      },
    },
  }
  return (
    <div className="additional-imgs-slider">
      <div className="items images images-slider images-slider-cont">
        <Swiper {...params}>
          {selectedProd?.imagePath?.map((element, index) => {
            return (
              <SwiperSlide key={index} className="product-item">
                <div
                  className={'wrapper sliderImg-main-cont'}
                  onClick={() =>
                    changeDefaultImage(element?.mediaObject?.filePath)
                  }
                >
                  <div className="img-cont">
                    {element?.mediaObject?.filePath ? (
                      <img
                        className="img"
                        src={
                          process.env.REACT_APP_MEDIA +
                          '/product/' +
                          element?.mediaObject?.filePath
                        }
                      />
                    ) : (
                      <img
                        className="img"
                        src={process.env.REACT_APP_MEDIA + 'placeholder.jpg'}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="swiper-navigation">
          <button
            className="swiper-nav prev"
            //@ts-ignore
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <span
              className="material-symbols-outlined"
              style={{ position: 'relative', background: 'none' }}
            >
              arrow_forward_ios
            </span>
          </button>
          <button
            className="swiper-nav next"
            //@ts-ignore
            onClick={() => swiperRef.current?.slideNext()}
          >
            <span
              className="material-symbols-outlined"
              style={{ position: 'relative', background: 'none' }}
            >
              arrow_back_ios
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdditionalImages
