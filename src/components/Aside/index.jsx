import classNames from 'classnames/bind'

import styles from './Aside.module.scss'
import NewHot from './NewHot'
import { type } from './type'

const cx = classNames.bind(styles)

function Aside() {
  return (
    <div className={cx('wrapper')}>
      <NewHot type={type.new} />
      <NewHot type={type.hot} />
    </div>
  )
}

export default Aside
