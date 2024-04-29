import React, { FC, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import useDataCategories from '../../../Catalog/hook/useDataCategories'
import { themeColors, themeSettings } from '../../../../styles/mui'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

const SliderSection = () => {
  const { data } = useDataCategories()

  const settings = {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 20,
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: '#F6F6F6',
            borderRadius: themeSettings.borderRadius,
            color: 'black',
          }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <Typography variant="h4">{'קטגוריות'}</Typography>
        <IconButton>
          <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
        </IconButton>
      </Box>
      <Box>
        <Swiper {...settings}>
          {data?.['hydra:member']?.map((element, index) => {
            return (
              <SwiperSlide key={index}>
                <Card>
                  <CardActionArea>
                    <Box sx={{ height: '190px' }}>
                      <CardMedia
                        sx={{ objectFit: 'cover' }}
                        component="img"
                        image={`${process.env.REACT_APP_MEDIA + '/placeholder.jpg'}`}
                        alt={`${index}`}
                      />
                    </Box>
                    <CardContent
                      sx={{
                        backgroundColor: themeColors.primary,
                        color: 'white',
                        padding: '6px 12px',
                      }}
                    >
                      <Typography gutterBottom variant="h6">
                        {element?.title}
                      </Typography>
                      <Button
                        endIcon={<ArrowBackOutlinedIcon />}
                        sx={{ color: 'white' }}
                      >
                        לקטלוג
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {/* <Box>
                  <Link to={`/client/catalog/${element?.identify}/0/0?page=1`}>
                    <Box>
                      <img
                        className="img"
                        src={
                          element?.MediaObject?.filePath
                            ? process.env.REACT_APP_MEDIA +
                              '/category/' +
                              element?.MediaObject?.filePath
                            : process.env.REACT_APP_MEDIA + '/placeholder.jpg'
                        }
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontSize={16}>
                        {element?.title}
                      </Typography>
                    </Box>
                  </Link>
                </Box> */}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Box>
  )
}

export default SliderSection
