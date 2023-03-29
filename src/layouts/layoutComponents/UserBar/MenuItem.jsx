import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './UserBar.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ data }) {
  let Component
  if (data.type === 'link') {
    Component = Link
  }
  if (data.type === 'button') {
    Component = 'button'
  }
  return (
    <div className={cx('menu-item-wrapper')}>
      <Component className={cx('item')} to={data.to} onClick={data.onClick}>
        <span className={cx('item-text')}>{data.text}</span>
        <FontAwesomeIcon className={cx('icon')} icon={data.icon} />
      </Component>
    </div>
  )
}

export default MenuItem
