import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Container, Paper, Box } from '@mui/material'

const VideoSection = () => {
  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
      background: '#fff',
    } as React.CSSProperties,

    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: '0',
      left: '0',
      filter: 'brightness(50%)',
    } as React.CSSProperties,
    showcase: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: '#fff',
    } as React.CSSProperties,
    title: {
      marginBottom: '120px',
    } as React.CSSProperties,
  }

  return (
    <Box style={styles.videoContainer}>
      <Paper elevation={0}>
        <video
          style={styles.video}
          preload="preload"
          loop
          muted
          autoPlay
          playsInline
          webkit-playsInline
          x-webkit-airplay="allow"
          poster={`${process.env.REACT_APP_MEDIA}/poster.jpg`}
        >
          <source
            src={`${process.env.REACT_APP_MEDIA}/video.mp4`}
            type="video/mp4"
          />
        </video>
      </Paper>
      <Box style={styles.showcase}>
        <Box className="centered">
          <Typography
            variant="h3"
            style={styles.title}
            sx={{
              width: { xs: '100%', md: '90%' },
              fontSize: { xs: '25px', md: '42px' },
            }}
          >
            ברוכים הבאים למדי מרקט המקור שלך לתרופות וציוד רפואי בישראל
          </Typography>
        </Box>
        <Link to="/client/catalog/0/0/0?page=1">
          <Button variant="contained" color="secondary">
            לקטלוג המלא
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default VideoSection
