import classNames from 'classnames/bind'
import SettingBar from '../layoutComponents/SettingBar'
import MainLayout from '../MainLayout'

import styles from './SettingLayout.module.scss'

const cx = classNames.bind(styles)

function SettingLayout({ children }) {
  return (
    <MainLayout>
      <div className={cx('wrapper')}>
        <SettingBar />
        <div className={cx('content')}>{children}</div>
      </div>
    </MainLayout>
  )
}

export default SettingLayout
