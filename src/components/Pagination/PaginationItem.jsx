import classNames from 'classnames/bind'

import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)

function PaginationItem({ data, onClick, active }) {
  return (
    <button className={cx('item', { active })} onClick={() => onClick(data)}>
      {data}
    </button>
  )
}
export default PaginationItem
