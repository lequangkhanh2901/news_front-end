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

  let prevDots = false
  let nextDots = false
  const numPageButon = 3
  return (
    <div className={cx('wrapper')}>
      {paginationArr.map((item) => {
        if (item < currentPage - numPageButon) {
          if (!prevDots) {
            prevDots = true
            return <PaginationItem data='<<' onClick={onClick} key={'<<'} />
          }
          return null
        }
        if (item > currentPage + numPageButon) {
          if (!nextDots) {
            nextDots = true
            return <PaginationItem data='>>' onClick={onClick} key={'>>'} />
          }
          return null
        }
        return (
          <PaginationItem
            onClick={onClick}
            key={item}
            data={item}
            active={item === currentPage}
          />
        )
      })}
    </div>
  )
}

export default Pagination
