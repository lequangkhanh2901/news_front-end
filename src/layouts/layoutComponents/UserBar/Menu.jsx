import {
  // faAddressCard,
  faArrowRightFromBracket,
  faGear,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import Modal from '../../../components/Modal'
import routers from '../../../configs/baseRoutes'
import MenuItem from './MenuItem'
import { update } from '../../../redux/userSlice'
import { initState, reducer } from './reducerMenu'
import styles from './UserBar.module.scss'
import { validateEmail } from '../../../optionalFunction'
import axiosCT from '../../../configs/axiosCT'

const cx = classNames.bind(styles)

function Menu() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initState)
  const dispatchRedux = useDispatch()
  useEffect(() => {
    if (user.id) {
      const userMenuList = [
        // {
        //   type: 'link',
        //   text: 'Trang cá nhân',
        //   icon: faAddressCard,
        //   to: routers.profile,
        // },
        {
          type: 'button',
          text: 'Đăng xuất',
          icon: faArrowRightFromBracket,
          onClick: handleLogout,
        },
      ]
      userMenuList.push({
        type: 'link',
        text: 'Quản lí chung',
        icon: faGear,
        to: routers.settingAccount,
      })

      // if (user.role !== undefined) {
      //   if (user.role === 0) {
      //   } else if (user.role === 1) {
      //     //writer
      //   } else if (user.role === 2) {
      //     //censor
      //   }
      // }
      dispatch({
        type: 'UPDATE_MENU_LIST',
        payload: userMenuList,
      })
    } else {
      dispatch({
        type: 'UPDATE_MENU_LIST',
        payload: [
          {
            type: 'button',
            text: 'Đăng nhập',
            icon: faRightToBracket,
            onClick: handleLogin,
          },
          {
            type: 'button',
            text: 'Đăng ký',
            icon: faUserPlus,
            onClick: handleSignup,
          },
        ],
      })
    }
  }, [user.id, user.role])

  const modalContent = {
    logOut: <div>Bạn muốn đăng xuất?</div>,
    logIn: (
      <div className={cx('login-form')}>
        <h2 className={cx('title')}>Đăng nhập</h2>
        <div className={cx('form')}>
          <div>
            <input
              value={state.logInData.email}
              spellCheck={false}
              id='login-email'
              type='email'
              placeholder=' '
              onChange={(e) => {
                dispatch({
                  type: 'UPDATE_LOGIN_EMAIL',
                  payload: e.target.value,
                })
              }}
            />
            <label htmlFor='login-email'>Email</label>
          </div>
          <div>
            <input
              value={state.logInData.password}
              id='login-password'
              type='password'
              minLength='6'
              placeholder=' '
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_LOGIN_PASSWORD',
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor='login-password'>Mật khẩu: </label>
          </div>
        </div>
      </div>
    ),
    signUp: (
      <div className={cx('signup-form')}>
        <h2 className={cx('title')}>Đăng ký</h2>
        <div className={cx('form')}>
          <div>
            <input
              value={state.signUpData.name}
              type='text'
              id='signup-name'
              placeholder=' '
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SIGNUP_NAME',
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor='signup-name'>Tên</label>
          </div>
          <div>
            <input
              value={state.signUpData.email}
              type='email'
              id='signup-email'
              placeholder=' '
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SIGNUP_EMAIL',
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor='signup-email'>Email</label>
          </div>
          <div>
            <input
              value={state.signUpData.password}
              id='signup-password'
              placeholder=' '
              type={'password'}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SIGNUP_PASSWORD',
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor='signup-password'>Mật khẩu</label>
          </div>
          <div>
            <input
              value={state.signUpData.rePassword}
              id='signup-repassword'
              placeholder=' '
              type={'password'}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_SIGNUP_REPASSWORD',
                  payload: e.target.value,
                })
              }
            />
            <label htmlFor='signup-repassword'>Nhập lại mật khẩu</label>
          </div>
        </div>
      </div>
    ),
    signUpSuccess: (
      <div className={cx('signup-success')}>
        <h2 className={cx('title')}>Yêu cầu xác thực</h2>
        <p className={cx('message')}>
          Chúng tôi đã gửi một email xác nhận đăng ký đến Email của bạn. Vui
          lòng vào hộp thư, nhấn vào link verify để hoàn thành đăng ký.
        </p>
      </div>
    ),
  }

  const dispatchUpdateErrMessage = (mess, timeOut) => {
    dispatch({ type: 'UPDATE_ERR_MESSAGE', payload: mess })
    setTimeout(() => {
      dispatch({ type: 'UPDATE_ERR_MESSAGE', payload: '' })
    }, timeOut)
  }

  const handleLogout = (e) => {
    dispatch({
      type: 'HANDLE_LOGOUT',
    })
    e.stopPropagation()
  }
  const handleLogin = (e) => {
    dispatch({
      type: 'HANDLE_LOGIN',
    })
    e.stopPropagation()
  }
  const handleSignup = (e) => {
    dispatch({ type: 'HANDLE_SIGNUP' })
    e.stopPropagation()
  }

  const handleCancelModal = () => {
    dispatch({ type: 'CANCEL_MODAL' })
  }
  const handleOkModal = () => {
    switch (state.modalAction) {
      case 'LOG_OUT':
        dispatchRedux(
          update({
            name: '',
            id: 0,
            role: -1,
            token: '',
            avartarCDN: '',
          })
        )
        dispatch({ type: 'LOGED_OUT' })
        navigate(routers.home)
        Cookies.set('token', '', {
          path: '/',
        })
        break
      case 'LOG_IN':
        if (state.logInData.email.trim() === '') {
          dispatchUpdateErrMessage('Email rỗng!', 1500)
        } else if (!validateEmail(state.logInData.email)) {
          dispatchUpdateErrMessage('Email không hợp lệ!', 1500)
        } else if (state.logInData.email.length > 50) {
          dispatchUpdateErrMessage('Email quá dài!', 1500)
        } else if (state.logInData.password.trim() < 6) {
          dispatchUpdateErrMessage('Mật khẩu ít nhất 6 ký tự!', 1500)
        } else if (state.logInData.password.length > 30) {
          dispatchUpdateErrMessage('Mật khẩu quá dài!', 1500)
        } else {
          dispatch({ type: 'SET_LOADING' })
          const fetchLogin = async () => {
            const response = await axiosCT.post('/user/login', {
              email: state.logInData.email,
              password: state.logInData.password,
            })
            dispatch({ type: 'REMOVE_LOADING' })
            switch (response.code) {
              case 401:
                dispatchUpdateErrMessage('Tài khoản không tồn tại!', 3000)
                break
              case 204:
                dispatchUpdateErrMessage('Tài khoản đã bị cấm!', 3000)
                break
              case 302:
                dispatchUpdateErrMessage('Mật khẩu không đúng!', 3000)
                break
              case 500:
                dispatchUpdateErrMessage('Lỗi hệ thống, thử lại sau!', 3000)
                break
              case 201:
                dispatchRedux(
                  update({
                    name: response.data.name,
                    id: response.data.id,
                    role: response.data.role,
                    token: response.data.token,
                    avartarCDN: response.data.avartar_cdn,
                  })
                )

                Cookies.set('token', response.data.token, {
                  expires: 10,
                  path: '/',
                })
                dispatch({ type: 'REMOVE_ACTION' })
                break
              default:
                break
            }
          }
          fetchLogin()
        }
        break
      case 'SIGN_UP':
        if (state.signUpData.name.trim() === '') {
          dispatchUpdateErrMessage('Tên rỗng!', 1500)
        } else if (state.signUpData.name.trim() < 3) {
          dispatchUpdateErrMessage('Tên quá ngắn!', 1500)
        } else if (state.signUpData.name.trim() > 30) {
          dispatchUpdateErrMessage('Tên quá dài!', 1500)
        } else if (
          !validateEmail(state.signUpData.email.trim()) ||
          state.signUpData.email.length > 50
        ) {
          dispatchUpdateErrMessage('Email không hợp lệ!', 1500)
        } else if (state.signUpData.password.trim() === '') {
          dispatchUpdateErrMessage('Mật khẩu rỗng!', 1500)
        } else if (state.signUpData.password.trim().length < 6) {
          dispatchUpdateErrMessage('Mật khẩu ít nhất 6 ký tự!', 1500)
        } else if (state.signUpData.password.trim().length > 20) {
          dispatchUpdateErrMessage('Mật khẩu quá dài!', 1500)
        } else if (state.signUpData.password !== state.signUpData.rePassword) {
          dispatchUpdateErrMessage('Nhập lại mật khẩu không đúng!', 1500)
        } else {
          dispatch({ type: 'SET_LOADING' })
          const fetchSignup = async () => {
            const response = await axiosCT.post('/user/', {
              name: state.signUpData.name,
              email: state.signUpData.email,
              password: state.signUpData.password,
            })
            dispatch({ type: 'REMOVE_LOADING' })
            switch (response.code) {
              case 500:
                dispatchUpdateErrMessage('Lỗi hệ thống, thử lại sau!', 3000)
                break
              case 305:
                dispatchUpdateErrMessage('Email đã tồn tại!', 3000)
                break
              case 201:
                dispatch({ type: 'SIGNUP_SUCCESS' })
                break
              default:
                break
            }
          }
          fetchSignup()
        }
        break
      case 'SIGNED_UP':
        dispatch({ type: 'CANCEL_MODAL' })
        break
      default:
        break
    }
  }
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  const renderChildModal = () => {
    switch (state.modalAction) {
      case 'LOG_OUT':
        return modalContent.logOut
      case 'LOG_IN':
        return modalContent.logIn
      case 'SIGN_UP':
        return modalContent.signUp
      case 'SIGNED_UP': {
        return modalContent.signUpSuccess
      }
      default:
        return null
    }
  }

  return (
    <div className={cx('menu-wrapper')}>
      {state.modalAction && (
        <Modal
          onCancel={handleCancelModal}
          onOk={handleOkModal}
          onClick={handleModalClick}
          isLoading={state.isLoading}
        >
          {renderChildModal()}
          <div className={cx('err-message')}>{state.errMessage}</div>
        </Modal>
      )}

      <div className={cx('menu')}>
        {user.id ? (
          <div className={cx('is-user')}>
            {state.menuList.map((item, index) => {
              return <MenuItem data={item} key={index} />
            })}
          </div>
        ) : (
          <div className={cx('non-user')}>
            {state.menuList.map((item, index) => (
              <MenuItem data={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default Menu
