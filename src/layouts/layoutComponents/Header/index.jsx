import classNames from 'classnames/bind'

import styles from './Header.module.scss'
import logo from '../../../assets/image/bm-logo.png'
import Search from '../Search'
import Navigation from '../Navigation'
import { Link } from 'react-router-dom'
import routers from '../../../configs/baseRoutes'
import UserBar from '../UserBar'

const cx = classNames.bind(styles)

function Header() {
  return (
    <header className={cx('header')}>
      <div className={cx('inner')}>
        <div className={cx('main')}>
          <Link className={cx('logo')} to={routers.home}>
            <img src={logo} alt='docbao' />
          </Link>
          <Search />
          <UserBar />
        </div>
      </div>
      <Navigation />
    </header>
  )
}

export default Header
