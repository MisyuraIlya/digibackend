import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CampaignIcon from '@mui/icons-material/Campaign'
import StorefrontIcon from '@mui/icons-material/Storefront'
import moment from 'moment'
import ShopIcon from '@mui/icons-material/Shop'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import { themeColors } from '../styles/mui'
import { getAgentFromStorage } from '../modules/Auth/helpers/auth.helper'

const dateFrom = moment().subtract(1, 'day').format('YYYY-MM-DD')
const dateTo = moment().format('YYYY-MM-DD')

const agent = getAgentFromStorage()
export const clientURL = {
  PROFILE: {
    LINK: '/profile',
    LABEL: 'פרופיל',
    ICON: (
      <span
        className="material-symbols-outlined"
        style={{ color: themeColors.primary }}
      >
        person
      </span>
    ),
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: true,
    SHOW_IN_HEADER: true,
    WITH_BADGE: false,
    NEED_AUTHORIZATION: false,
  },
  CART: {
    LINK: '/cart',
    LABEL: 'עגלה',
    ICON: (
      <span
        className="material-symbols-outlined"
        style={{ color: themeColors.primary }}
      >
        shopping_cart
      </span>
    ),
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: true,
    NEED_AUTHORIZATION: true,
  },
  USER_LIST: {
    LINK: `/agentClients/${agent?.id}?page=1`,
    LABEL: 'הלקוחות שלי',
    ICON: (
      <span
        className="material-symbols-outlined"
        style={{ color: themeColors.primary }}
      >
        StoreFront
      </span>
    ),
    FOR_AGENT: true,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: false,
    NEED_AUTHORIZATION: true,
  },
  NOTIFICATIONS: {
    LINK: '',
    LABEL: 'הודעות',
    ICON: (
      <span
        className="material-symbols-outlined"
        style={{ color: themeColors.primary }}
      >
        campaign
      </span>
    ),
    FOR_AGENT: false,
    SHOW_IN_PROFILE_MENU: false,
    SHOW_IN_HEADER: true,
    WITH_BADGE: true,
    NEED_AUTHORIZATION: true,
  },
  DOCUMENTS: {
    LINK: `/documentPage/order/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'מסמכי לקוח',
    ICON: (
      <span
        className="material-symbols-outlined"
        style={{ color: themeColors.primary }}
      >
        description{' '}
      </span>
    ),
    FOR_AGENT: true,
    SHOW_IN_PROFILE_MENU: true,
    SHOW_IN_HEADER: false,
    WITH_BADGE: false,
    NEED_AUTHORIZATION: true,
  },
}

export const agentURL = {
  DOCUMENT_APPROCE: {
    LINK: '/agentDashboard/1/1',
    LABEL: 'דאשבורד',
    ICON: <ChecklistRtlIcon />,
  },
  DOCUMENT_AGENT: {
    LINK: '/agentDocument',
    LABEL: '/מסמכים',
    ICON: <ArticleOutlinedIcon />,
  },
  ORDER_AGENT: {
    LINK: '/agentQuote',
    LABEL: 'טיוטות/הזמנות',
    ICON: <StickyNote2OutlinedIcon />,
  },
  AGENT_GVIYA: {
    LINK: '/gviya',
    LABEL: 'גביה',
    ICON: <CurrencyExchangeOutlinedIcon />,
  },
  AGENT_STATISTICS: {
    LINK: '/agentStatistics',
    LABEL: 'גביה',
    ICON: <SupportAgentOutlinedIcon />,
  },
  DOCUMENT_OFFLINE: {
    LINK: '/offline',
    LABEL: '/מסמכי אופליין',
    ICON: <WifiOffOutlinedIcon />,
  },
}

export const AdminURL = {
  CATALOG_EDIT: {
    LINK: '/admin/category-edit/0/0',
    LABEL: 'ניהול קטלוג',
    ICON: <ShopIcon sx={{ fontSize: '40px' }} />,
  },
  CLIENTS: {
    LINK: '/admin/ROLE_USER?page=1',
    LABEL: 'לקוחות',
    ICON: <GroupIcon sx={{ fontSize: '40px' }} />,
  },
  AGENTS: {
    LINK: '/admin/ROLE_AGENT?page=1',
    LABEL: 'סוכנים',
    ICON: <GroupIcon sx={{ fontSize: '40px' }} />,
  },
  ORDERS: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'מסמכים',
    ICON: <ShoppingCartCheckoutIcon sx={{ fontSize: '40px' }} />,
  },
  NOTIFICATIONS: {
    LINK: `/admin/notification`,
    LABEL: 'הודעות',
    ICON: <NotificationAddIcon sx={{ fontSize: '40px' }} />,
  },
}
