import React from 'react'
import Filters from './components/Filters'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@mui/material'
import { themeColors } from '../../../../styles/mui'
import useDataCategories from '../../hook/useDataCategories'
const RightSide = () => {
  const { data } = useDataCategories()
  const { lvl1, lvl2, lvl3, documentType } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const handlePush = (
    lvl1: ICategory,
    lvl2: ICategory,
    currentItem: ICategory
  ) => {
    if (currentItem.lvlNumber === 2) {
      navigate(
        `/client/${documentType}/${lvl1.id}/${lvl2.id}/0${location.search}?page=1`
      )
    }
    if (currentItem.lvlNumber === 3) {
      navigate(
        `/client/${documentType}/${lvl1.id}/${lvl2.id}/${currentItem?.id}/${location.search}?page=1`
      )
    }
  }

  return (
    <>
      <List>
        {data?.['hydra:member']?.map((lvl1Cat, key1) => {
          if (lvl1Cat.lvlNumber === 1) {
            return (
              <>
                <ListItem
                  key={key1}
                  onClick={() =>
                    navigate(`/client/${documentType}/${lvl1Cat.id}/0/0?page=1`)
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemText
                    primary={lvl1Cat.title}
                    sx={{
                      '& span': {
                        textDecoration:
                          lvl1 === lvl1Cat.id.toString() ? 'underline' : 'none',
                        fontWeight: lvl1 === lvl1Cat.id.toString() ? 600 : 500,
                        color:
                          lvl1 === lvl1Cat.id.toString()
                            ? themeColors.secondary
                            : 'black',
                      },
                    }}
                  />
                </ListItem>
                {lvl1 === lvl1Cat.id.toString() && (
                  <List sx={{ marginLeft: '30px' }}>
                    {lvl1Cat?.categories?.map((lvl2Cat, key2) => {
                      return (
                        <>
                          <ListItem
                            key={key2}
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              handlePush(lvl1Cat, lvl2Cat, lvl2Cat)
                            }
                          >
                            <ListItemText
                              primary={lvl2Cat.title}
                              sx={{
                                '& span': {
                                  textDecoration:
                                    lvl2 === lvl2Cat.id.toString()
                                      ? 'underline'
                                      : 'none',
                                  fontWeight:
                                    lvl2 === lvl2Cat.id.toString() ? 600 : 500,
                                  color:
                                    lvl2 === lvl2Cat.id.toString()
                                      ? themeColors.secondary
                                      : 'black',
                                },
                              }}
                            />
                          </ListItem>
                          {lvl2 === lvl2Cat.id.toString() && (
                            <List sx={{ marginLeft: '60px' }}>
                              {lvl2Cat?.categories?.map((lvl3Cat, key3) => (
                                <ListItem
                                  key={key3}
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    handlePush(lvl1Cat, lvl2Cat, lvl3Cat)
                                  }
                                >
                                  <ListItemText
                                    primary={lvl3Cat.title}
                                    sx={{
                                      '& span': {
                                        textDecoration:
                                          lvl3 === lvl3Cat.id.toString()
                                            ? 'underline'
                                            : 'none',
                                        fontWeight:
                                          lvl3 === lvl3Cat.id.toString()
                                            ? 600
                                            : 500,
                                        color:
                                          lvl3 === lvl3Cat.id.toString()
                                            ? themeColors.secondary
                                            : 'black',
                                      },
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </>
                      )
                    })}
                  </List>
                )}
              </>
            )
          }
        })}
      </List>
      <Filters />
    </>
  )
}

export default RightSide
