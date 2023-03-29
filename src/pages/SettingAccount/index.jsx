import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { reducer, initState } from './reducerSettingAccount'
import Image from '../../components/Image'
import styles from './System.module.scss'
import Modal from '../../components/Modal'
import ChangeAvartar from './components/ChangeAvartar'
import axiosCT from '../../configs/axiosCT'
import { update } from '../../redux/userSlice'
import ChangeName from './components/ChangeName'
import Button from '../../components/Button'

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
      default:
        return null
    }
  }

  return (
    <>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingAccount
