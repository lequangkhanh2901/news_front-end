import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { reducer, initState } from './reducerSettingAccount'
import Image from '../../components/Image'
import styles from './System.module.scss'
import Modal from '../../components/Modal'
import ChangeAvartar from './components/ChangeAvartar'
import axiosCT from '../../configs/axiosCT'
import { update } from '../../redux/userSlice'
import ChangeName from './components/ChangeName'
import Button from '../../components/Button'
import ChangePassword from './components/ChangePassword'

const cx = classNames.bind(styles)

function SettingAccount() {
  const user = useSelector((state) => state.user)
  const dispatchRedux = useDispatch()
  const [state, dispatch] = useReducer(reducer, initState)

  const setErrorModal = (error, time) => {
    dispatch({ type: 'UPDATE_ERROR', payload: error })
    setTimeout(() => {
      dispatch({ type: 'UPDATE_ERROR', payload: '' })
    }, time)
  }
  const handleCancelModal = () => {
    dispatch({ type: 'UPDATE_MODAL_ACTION', payload: '' })
  }
  const handleOkModal = () => {
    switch (state.modalAction) {
      case 'CHANGE_AVARTAR':
        if (!state.file) {
          setErrorModal('Vui lòng chọn hình ảnh!', 1500)
        } else {
          const postChangeAvatar = async () => {
            const formData = new FormData()
            formData.append('file', state.file)
            formData.append('previousCDN', user.avartarCDN)
            const response = await axiosCT.postFile(
              '/user/change-avartar',
              formData
            )
            console.log(response)
            if (response === 'fail') {
              setErrorModal('Lỗi. Vui lòng thử lại sau!', 3000)
            } else {
              dispatchRedux(
                update({
                  ...user,
                  avartarCDN: response.data,
                })
              )

              dispatch({ type: 'UPDATE_MODAL_ACTION', payload: '' })
            }
          }
          postChangeAvatar()
        }
        break

      case 'CHANGE_NAME':
        if (state.name.trim().length < 3) {
          setErrorModal('Tên quá ngắn!', 1500)
        } else if (state.name.trim().length > 30) {
          setErrorModal('Tên quá dài!', 1500)
        } else if (state.name.trim() === user.name) {
          setErrorModal('Tên giống với tên cũ!', 1500)
        } else {
          const postChangeName = async () => {
            dispatch({
              type: 'CHANGE_IS_LOADING',
              payload: true,
            })
            const response = await axiosCT.patch('/user', { name: state.name })
            dispatch({
              type: 'CHANGE_IS_LOADING',
              payload: false,
            })
            if (response !== 'fail' && response.code === 201) {
              dispatchRedux(
                update({
                  ...user,
                  name: state.name,
                })
              )
              dispatch({
                type: 'UPDATE_MODAL_ACTION',
                payload: '',
              })
            } else {
              setErrorModal('Lỗi hệ thống!', 3000)
            }
          }
          postChangeName()
        }

        break
      case 'CHANGE_PASSWORD':
        if (state.oldPass.length < 6 || state.newPass.length < 6) {
          toast.warning('Mật khẩu ít nhất 6 ký tự!')
          break
        }
        if (state.oldPass === state.newPass) {
          toast.warning('Mật khẩu mới giống mật khẩu cũ!')
          break
        }
        const fetchChangePass = async () => {
          const response = await axiosCT.patch('/user/change-password', {
            oldPassword: state.oldPass,
            newPassword: state.newPass,
          })
          if (response === 'fail') {
            toast.error('Lỗi!')
          } else {
            switch (response.code) {
              case 200:
                toast.success('Đổi mật khẩu thành công!')
                dispatch({
                  type: 'UPDATE_MODAL_ACTION',
                  payload: '',
                })

                break
              case 400:
                toast.warning('Mật khẩu cũ không đúng!')

                break
              case 401:
                toast.warning('Dữ liệu không hợp lệ!')

                break
              case 404:
                toast.error('Người dùng không tồn tại!')
                dispatch({
                  type: 'UPDATE_MODAL_ACTION',
                  payload: '',
                })

                break
              default:
                toast.error('Lỗi!')
                break
            }
          }
        }

        fetchChangePass()
        break
      default:
        break
    }
  }
  const handleChangeAvartar = (e) => {
    dispatch({ type: 'UPDATE_FILE', payload: e.target.files[0] })
  }

  const handleChangeNameInput = (e) => {
    if (e.target.value.startsWith(' ')) {
      return
    }
    dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
  }

  const renderModalContent = () => {
    switch (state.modalAction) {
      case 'CHANGE_AVARTAR':
        return (
          <ChangeAvartar onChange={handleChangeAvartar} file={state.file} />
        )
      case 'CHANGE_NAME':
        return (
          <ChangeName onChange={handleChangeNameInput} value={state.name} />
        )
      case 'CHANGE_PASSWORD':
        return (
          <ChangePassword
            onChangeOldPass={handleChangeOldPass}
            oldPass={state.oldPass}
            newPass={state.newPass}
            onChangeNewPass={handleChangeNewPass}
          />
        )
      default:
        return null
    }
  }

  const handleChangeOldPass = (e) => {
    if (e.target.value.startsWith(' ') || e.target.value.length > 30) {
      return
    }
    dispatch({ type: 'UPDATE_OLD_PASS', payload: e.target.value.trim() })
  }

  const handleChangeNewPass = (e) => {
    if (e.target.value.startsWith(' ') || e.target.value.length > 30) {
      return
    }
    dispatch({ type: 'UPDATE_NEW_PASS', payload: e.target.value.trim() })
  }

  return (
    <>
      <ToastContainer />
      {state.modalAction ? (
        <Modal
          onCancel={handleCancelModal}
          onOk={handleOkModal}
          isLoading={state.isLoading}
        >
          {renderModalContent()}
          <div className={cx('error')}>{state.error}</div>
        </Modal>
      ) : null}
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <h1 className={cx('title')}>Thông tin tài khoản</h1>
          <div className={cx('info')}>
            <div className={cx('avartar-block')}>
              <Image
                src={user.avartarCDN}
                alt={user.name}
                className={cx('avartar')}
                key={user.avartarCDN}
              />
              <Button
                rounded
                size='small-medium'
                className={cx('btn-edit-avartar')}
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_MODAL_ACTION',
                    payload: 'CHANGE_AVARTAR',
                  })
                }
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </div>
            <div className={cx('info-inner')}>
              <div className={cx('name')}>
                <div className={cx('name-label')}>Tên tài khoản: </div>
                <div className={cx('name-user')}>{user.name}</div>
                <Button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_MODAL_ACTION',
                      payload: 'CHANGE_NAME',
                    })
                  }
                  size='small-medium'
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </div>
              <div className={cx('password')}>
                <Button
                  size='large'
                  warring
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_MODAL_ACTION',
                      payload: 'CHANGE_PASSWORD',
                    })
                  }
                >
                  Thay đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingAccount
