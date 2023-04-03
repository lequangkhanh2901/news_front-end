import {
  faClone,
  faList,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import routers from '../../../configs/baseRoutes'

import styles from './SettingBar.module.scss'

const cx = classNames.bind(styles)

function SettingBar() {
  const [listNav, setListNav] = useState([])
  const user = useSelector((state) => state.user)

  useEffect(() => {
    let listNavArr = [
      {
        to: routers.settingAccount,
        icon: faUser,
      },
    ]
    if (user.role === 0) {
      listNavArr = [
        ...listNavArr,
        {
          to: routers.addCategory,
          icon: faList,
        },
        {
          to: routers.managerUsers,
          icon: faUsers,
        },
        {
          to: routers.managerPosts,
          icon: faClone,
        },
      ]
    }
    if (user.role === 1) {
      listNavArr = [
        ...listNavArr,
        {
          to: routers.managerPosts,
          icon: faClone,
        },
      ]
    }
    if (user.role === 2) {
      listNavArr = [
        ...listNavArr,
        {
          to: routers.managerPosts,
          icon: faClone,
        },
      ]
    }
    setListNav(() => listNavArr)
  }, [user.id])

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        {listNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={(nav) => cx('nav', { active: nav.isActive })}
          >
            <FontAwesomeIcon icon={item.icon} />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SettingBar
