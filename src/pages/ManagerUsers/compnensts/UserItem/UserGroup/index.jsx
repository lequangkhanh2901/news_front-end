import classNames from 'classnames/bind'

import styles from './UserGroup.module.scss'

const cx = classNames.bind(styles)

function UserGroup({ type, children }) {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('type')}>{type}</h1>
      <table className={cx('users')}>
        <thead>
          <tr>
            <th className={cx('id')}>Id</th>
            <th className={cx('name')}>Tên</th>
            <th className={cx('email')}>Email</th>
            <th className={cx('created')}>Ngày tạo</th>
            <th className={cx('action')}>Hành động</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default UserGroup
