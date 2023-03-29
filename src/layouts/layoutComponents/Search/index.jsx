import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import { useState } from 'react'

const cx = classNames.bind(styles)

function Search() {
  const [inputSearch, setInputSearch] = useState('')
  const handleInputSearchChange = (e) => {
    // setInputSearch(e.target.value)
    if (!e.target.value.startsWith(' ')) {
      setInputSearch(e.target.value)
    }
  }
  return (
    <div className={cx('wrapper')}>
      <input className={cx('search-input')} value={inputSearch} onChange={(e) => handleInputSearchChange(e)} />
      <button className={cx('search-btn')}>
        <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
      </button>
    </div>
  )
}

export default Search
