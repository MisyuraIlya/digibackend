import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Tags from '../../../Catalog/components/LeftSide/components/ProductList/components/Tags'
import BasicInfo from '../../../Catalog/components/LeftSide/components/ProductList/components/BasicInfo'
import PriceBlock from '../../../Catalog/components/LeftSide/components/ProductList/components/PriceBlock'
import { TailSpin } from 'react-loader-spinner'
import { Box, Typography } from '@mui/material'

interface ProductSectionProps {
  title: string
  array: IProduct[]
  toShow: number
  column: number
  loading: boolean
}

const ProductSection: FC<ProductSectionProps> = ({
  title,
  array,
  toShow = 5,
  column = 1,
  loading,
}) => {
  const swiperRef = useRef<null>(null)
  const settings = {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,
  }

  return (
    <Box>
      <Box className="title-wrapper">
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Typography>
        <Swiper {...settings}>
          {array?.map((element, index) => {
            return (
              <SwiperSlide key={index} className="product-item"></SwiperSlide>
            )
          })}
        </Swiper>
      </Typography>
    </Box>
  )
}

export default ProductSection
