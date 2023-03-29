import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './Pagination.module.scss'
import PaginationItem from './PaginationItem'

const cx = classNames.bind(styles)

function Pagination({ data, onClick, currentPage }) {
  const [paginationArr, setPaginationArr] = useState([])

  useEffect(() => {
    const tmpArr = []
    for (let i = 1; i <= data; i++) {
      tmpArr.push(i)
    }
    setPaginationArr(tmpArr)
  }, [data])

  return (
    <div className={cx('wrapper')}>
      {paginationArr.map((item) => (
        <PaginationItem
          onClick={onClick}
          key={item}
          data={item}
          active={item === currentPage}
        />
      ))}
    </div>
  )
}

export default Pagination
