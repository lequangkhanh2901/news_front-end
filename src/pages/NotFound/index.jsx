import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import routers from '../../configs/baseRoutes'

import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

function NotFound() {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('code')}>404</h1>
      <p className={cx('message')}>Không tìm thấy trang!</p>
      <div>
        <Link to={routers.home} className={cx('link-home')}>
          Trang chủ
        </Link>
      </div>
    </div>
  )
}

export default NotFound
