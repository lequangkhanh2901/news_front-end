import classNames from 'classnames/bind'
import Button from '../Button'

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ children, onCancel, onOk, onClick, isLoading }) {
  return (
    <div className={cx('wrapper')}>
      <div
        className={cx('container', { isLoading: isLoading })}
        onClick={onClick}
      >
        <div className={cx('content')}>{children}</div>
        <div className={cx('action')}>
          <Button onClick={onCancel} size='large-medium' danger>
            Cancel
          </Button>

          <Button onClick={onOk} size='large-medium'>
            Ok
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
