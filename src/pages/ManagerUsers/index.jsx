import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import axiosCt from '../../configs/axiosCT'
import UserItem from './compnensts/UserItem'
import UserGroup from './compnensts/UserItem/UserGroup'

import styles from './ManagerUsers.module.scss'
import Modal from '../../components/Modal'

const cx = classNames.bind(styles)

function ManagerUsers() {
  const [listUser, setListUser] = useState([])
  const [modalAction, setModalAction] = useState('')
  const [userAction, setUserAction] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rerender, setRerender] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    const fetchUser = async () => {
      const response = await axiosCt.get('/user/list')
      if (response !== 'fail' && response.code === 200) {
        const writer = []
        const censor = []
        const normal = []
        response.data.forEach((user) => {
          if (user.role === 1) {
            writer.push(user)
          } else if (user.role === 2) {
            censor.push(user)
          } else {
            normal.push(user)
          }
        })
        setListUser(() => [
          { type: 'writer', users: writer },
          { type: 'censor', users: censor },
          { type: 'normal', users: normal },
        ])
      }
    }

    fetchUser()
    return () => {
      controller.abort()
    }
  }, [rerender])
  useEffect(() => {
    if (modalAction === '') {
      setUserAction({})
    }
  }, [modalAction])
  const handleActionUsersClick = (user, status) => {
    if (status === 0) {
      setModalAction('BAN')
    } else {
      setModalAction('UNLOCK')
    }
    setUserAction(user)
  }
  const handleCancel = () => {
    setModalAction('')
  }
  const fetchUpdate = async (type, id) => {
    const response = await axiosCt.patch('/user/force', { type, id })
  }
  const handleOk = async () => {
    setIsLoading(true)
    const response = await axiosCt.patch('/user/force', {
      type: modalAction,
      id: userAction.id,
    })
    setIsLoading(false)
    console.log(response)
    if (response.code === 201) {
      setRerender({})
      setModalAction('')
    }
  }
  const renderModalContent = () => {
    if (modalAction === 'BAN') {
      return (
        <div className={cx('modal-content')}>
          <h1 className={cx('title', { ban: modalAction === 'BAN' })}>
            Cấm tài khoản
          </h1>
          <div>
            <div className={cx('name')}>{userAction.name}</div>
            <div className={cx('email')}>{userAction.email}</div>
          </div>
        </div>
      )
    } else if (modalAction === 'UNLOCK') {
      return (
        <div className={cx('modal-content')}>
          <h1 className={cx('title')}>Khôi phục tài khoản</h1>
          <div>
            <div className={cx('name')}>{userAction.name}</div>
            <div className={cx('email')}>{userAction.email}</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
  return (
    <>
      {modalAction ? (
        <Modal onCancel={handleCancel} isLoading={isLoading} onOk={handleOk}>
          {renderModalContent()}
        </Modal>
      ) : null}
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          {listUser.map((group) => (
            <UserGroup key={group.type} type={group.type}>
              {group.users.map((user) => (
                <UserItem
                  key={user.id}
                  data={user}
                  onActionUserClick={() =>
                    handleActionUsersClick(user, user.status)
                  }
                />
              ))}
            </UserGroup>
          ))}
        </div>
      </div>
    </>
  )
}

export default ManagerUsers
