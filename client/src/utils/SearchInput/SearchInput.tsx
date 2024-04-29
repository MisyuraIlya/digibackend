import { Box, IconButton, TextField } from '@mui/material'
import React, { FC, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useDebounce } from 'use-debounce'
import CloseIcon from '@mui/icons-material/Close'
import MicIcon from '@mui/icons-material/Mic'

interface SearchInputProps {
  placeholder: string
  value: string
  setValue: (value: string) => void
  handleFunction?: (value: string) => void
  ListComponent?: any
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder,
  handleFunction,
  ListComponent,
}) => {
  const [valueDebounced] = useDebounce(value, 1000)

  const handleMicClick = async () => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        console.error('Speech recognition not supported in this browser')
        return
      }
      const recognition = new SpeechRecognition()
      recognition.lang = 'he-IL'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setValue(transcript)
      }

      recognition.start()
    } catch (error) {
      console.error('Speech recognition error:', error)
    }
  }

  useEffect(() => {
    handleFunction && handleFunction(valueDebounced)
  }, [valueDebounced])

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TextField
        fullWidth={true}
        placeholder={placeholder}
        sx={{ backgroundColor: '#f3f5f9' }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        InputProps={{
          startAdornment: (
            <IconButton sx={{ marginRight: '15px' }} onClick={handleMicClick}>
              <MicIcon color="primary" />
            </IconButton>
          ),
          endAdornment: (
            <IconButton>
              {value ? (
                <CloseIcon
                  onClick={() => setValue('')}
                  style={{ color: 'gray' }}
                />
              ) : (
                <SearchIcon style={{ color: 'gray' }} />
              )}
            </IconButton>
          ),
        }}
      />
      {value && ListComponent}
    </Box>
  )
}

export default SearchInput
