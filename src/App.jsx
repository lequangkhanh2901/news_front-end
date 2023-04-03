import { Route, Routes } from 'react-router-dom'
import { Fragment, Suspense } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import MainLayout from './layouts/MainLayout'
import { privateRoutes, publicRoutes } from './routers'
import Loading from './components/Loading'
import axiosCt from './configs/axiosCT'
import { update } from './redux/userSlice'
import NotFound from './pages/NotFound'
import './App.css'
import { SocketContext, socket } from './configs/context/socket'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const fetchUser = async () => {
        const response = await axiosCt.post('/user/login-token', {})
        if (response !== 'fail' && response.code === 200) {
          if (response.data.role !== undefined) {
            dispatch(
              update({
                name: response.data.name,
                id: response.data.id,
                role: response.data.role,
                token: response.data.token,
                avartarCDN: response.data.avartar_cdn,
              })
            )
          } else {
            dispatch(
              update({
                name: response.data.name,
                id: response.data.id,
                token: response.data.token,
                avartarCDN: response.data.avartar_cdn,
              })
            )
          }
          Cookies.set('token', response.data.token, {
            expires: 10,
            path: '/',
          })
        } else {
          Cookies.set('token', '', {
            path: '/',
          })
        }
      }
      fetchUser()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (user.id) {
      socket.on(user.id, (data) => {
        if (data === 'BAN') {
          dispatch(
            update({
              name: '',
              id: 0,
              token: '',
              avartarCDN: null,
              role: -1,
            })
          )
        }
      })
    }
  }, [user.id])

  const renderRoutes = (route, index) => {
    let Layout = MainLayout
    let Page = route.component
    if (route.layout) {
      Layout = route.layout
    } else if (route.layout === null) {
      Layout = Fragment
    }
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Suspense fallback={<Loading />}>
              <Page />
            </Suspense>
          </Layout>
        }
      />
    )
  }

  const modal = useSelector((state) => state.modal)

  return (
    <div className='App'>
      <SocketContext.Provider value={socket}>
        <Routes>
          {publicRoutes.map(renderRoutes)}
          {user.id && privateRoutes.normalUserRoutes.map(renderRoutes)}
          {user.id &&
            user.role === 0 &&
            privateRoutes.adminRoutes.map(renderRoutes)}
          {user.id &&
            user.role === 1 &&
            privateRoutes.writerRoutes.map(renderRoutes)}
          {user.id &&
            user.role === 2 &&
            privateRoutes.censorRoutes.map(renderRoutes)}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  )
}

export default App
