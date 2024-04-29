import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CategoryEdit from './modules/Admin/pages/CategoryEdit'
import ProductsEdit from './modules/Admin/pages/ProductsEdit'
import Home from './modules/Home/pages/Home'
import Catalog from './modules/Catalog/pages/Catalog'
import CatalogView from './modules/Catalog/pages/CatalogView'
import CartPage from './modules/Cart/pages/CartPage'
import ProfilePage from './modules/Auth/pages/ProfilePage'
import DocumentsItemPage from './modules/Documents/pages/DocumentsItemPage'
import DocumentsPage from './modules/Documents/pages/DocumentsPage'
import Header from './modules/Header/Header'
import NotificationPage from './modules/PushNotifications/pages/NotificationPage'
import AgentClinets from './modules/Agent/pages/AgentClinets'
import AgentDashboard from './modules/Agent/pages/AgentDashboard'
import { useAuth } from './modules/Auth/store/useAuthStore'
import { Box } from '@mui/material'
import Users from './modules/Admin/pages/Users'
import BottomNavigationMobile from './components/BottomNavigationMobile'

const RouterApp = () => {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Box>
        <Header />
        <Box>
          <Routes>
            <Route>
              {/* CLIENT */}
              <Route path="/" element={<Home />} />
              <Route
                path="/client/:documentType/:lvl1/:lvl2/:lvl3"
                element={<Catalog />}
              />
              <Route path="/CatalogView" element={<CatalogView />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/documentPage/:documentType/:dateFrom/:dateTo"
                element={<DocumentsPage />}
              />
              <Route
                path="/documentItemPage/:documentItemType/:id"
                element={<DocumentsItemPage />}
              />

              {/* ADMIN */}
              <Route
                path="/admin/category-edit/:lvl1/:lvl2"
                element={<CategoryEdit />}
              />
              <Route
                path="/admin/products-edit/:lvl1/:lvl2/:lvl3"
                element={<ProductsEdit />}
              />
              <Route path="/admin/:userRole" element={<Users />} />
              <Route
                path="/admin/notification"
                element={<NotificationPage />}
              />

              {/* AGENT */}
              <Route path="/agentClients/:agentId" element={<AgentClinets />} />
              <Route
                path="/agentDashboard/:tab/:id"
                element={<AgentDashboard />}
              />
            </Route>
          </Routes>
        </Box>
        <BottomNavigationMobile />
      </Box>
    </>
  )
}

export default RouterApp
