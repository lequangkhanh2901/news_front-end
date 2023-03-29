import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading({ small }) {
  return (
    <div className={cx('wrapper', { small })}>
      <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
    </div>
  )
}
export default Loading
