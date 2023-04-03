import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faUnlock } from '@fortawesome/free-solid-svg-icons'

import Image from '../../components/Image'
import styles from './User.module.scss'
import axiosCt from '../../configs/axiosCT'
import { getTimeString } from '../../optionalFunction'
import Button from '../../components/Button'

const cx = classNames.bind(styles)

function User() {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [rerender, setRerender] = useState([])
  const [isChangeRoleFormShow, setIsChangeRoleFormShow] = useState(false)
  const [role, setRole] = useState()

  useEffect(() => {
    const controler = new AbortController()

    const fetchUser = async () => {
      const response = await axiosCt.get('/user/by-amdin/' + id)
      if (response !== 'fail' && response.code == 200) {
        setUser(response.data)
        setRole(response.data.role)
      }
    }

    fetchUser()

    return () => {
      controler.abort()
    }
  }, [id, rerender])

  const handleBanUnlockUser = async () => {
    const response = await axiosCt.patch('/user/force', {
      type: user.status === 0 ? 'BAN' : 'UNLOCK',
      id,
    })
    if (response !== 'fail' && response.code === 201) {
      setRerender([])
    }
  }
  const handleChangeRoleUser = async () => {
    const response = await axiosCt.patch('/user/change-role', {
      id,
      role,
    })
    if (response !== 'fail' && response.code === 200) {
      setRerender([])
      setIsChangeRoleFormShow(false)
    }
  }
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}> Thông tin người dùng</h1>
      <div className={cx('content')}>
        <div className={cx('avartar')}>
          <Image
            className={cx('avartar-img')}
            src={user.avartar_cdn}
            alt={user.name}
          />
        </div>
        <div className={cx('info')}>
          <div className={cx('name')}>{user.name}</div>
          <div className={cx('email')}>{user.email}</div>
          <div className={cx('created_at')}>
            <span>Ngày tạo: </span>
            {getTimeString(user.created_at)}
          </div>
          {user.updated_at && (
            <div className={cx('updated_at')}>
              <span>Cập nhât vào: </span>
              {getTimeString(user.updated_at)}
            </div>
          )}
          <div className={cx('role')}>
            <span>Vị trí: </span>
            <span className={cx('role-title')}>
              {(() => {
                switch (user.role) {
                  case 0:
                    return 'ADMIN'
                  case 1:
                    return 'WRITER'
                  case 2:
                    return 'CENSOR'
                  case 3:
                    return 'NORMAL'
                  default:
                    return null
                }
              })()}
            </span>
            <Button
              size='large-medium'
              onClick={() => setIsChangeRoleFormShow(!isChangeRoleFormShow)}
            >
              Thay đổi
            </Button>
            {isChangeRoleFormShow && (
              <div className={cx('change-role')}>
                <select
                  value={role}
                  onChange={(e) => setRole(Number(e.target.value))}
                >
                  <option value={0}>Admin</option>
                  <option value={1}>Writer</option>
                  <option value={2}>Censor</option>
                  <option value={3}>Normal</option>
                </select>
                <Button
                  size='small-medium'
                  green
                  className={cx('button-change-role')}
                  onClick={handleChangeRoleUser}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </div>
            )}
          </div>
          <div className={cx('ban-user')}>
            <Button
              size='medium'
              danger={user.status === 0}
              green={user.status === 1}
              onClick={handleBanUnlockUser}
            >
              <FontAwesomeIcon icon={user.status === 0 ? faBan : faUnlock} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
