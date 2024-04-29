import { Box } from '@mui/material'
import RightSide from './RightSide'
import MyDrawer from '../../../../utils/Drawer/MyDrawer'

const MobileRightSide = () => {
  return (
    <Box>
      <MyDrawer>
        <Box>
          <RightSide />
        </Box>
      </MyDrawer>
    </Box>
  )
}

export default MobileRightSide
