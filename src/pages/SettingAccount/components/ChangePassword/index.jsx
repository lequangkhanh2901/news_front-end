import classNames from 'classnames/bind'

import styles from './ChangePassword.module.scss'

const cx = classNames.bind(styles)

function ChangePassword({
  oldPass,
  newPass,
  onChangeOldPass,
  onChangeNewPass,
}) {
  return (
    <div className={cx('change-password')}>
      <h1 className={cx('title')}>Thay đôi mật khẩu</h1>
      <input
        type='password'
        value={oldPass}
        onChange={onChangeOldPass}
        className={cx('old-pass-input')}
        placeholder='Mật khẩu cũ'
        minLength='6'
      />
      <input
        type='password'
        value={newPass}
        minLength='6'
        onChange={onChangeNewPass}
        className={cx('new-pass-input')}
        placeholder='Mật khẩu mới'
      />
    </div>
  )
}

export default ChangePassword
