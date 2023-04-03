import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import axiosCt from '../../../configs/axiosCT'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import routers from '../../../configs/baseRoutes'
import { generatePathSlug } from '../../../optionalFunction'
import Button from '../../../components/Button'

const cx = classNames.bind(styles)

function Search() {
  const [inputSearch, setInputSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isShowSearchResult, setIsShowResult] = useState(false)
  const navigate = useNavigate()

  const debouncedValue = useDebounce(inputSearch, 1000)

  useEffect(() => {
    const fetchSearchPost = async () => {
      if (debouncedValue) {
        const response = await axiosCt.get('/post/search/' + debouncedValue)
        if (response !== 'fail' && response.code === 200) {
          setSearchResult(response.data)
        }
      } else {
        if (searchResult.length > 0) {
          setSearchResult([])
        }
      }
    }
    fetchSearchPost()
  }, [debouncedValue])

  const handleInputSearchChange = (e) => {
    if (!e.target.value.startsWith(' ')) {
      setInputSearch(e.target.value)
    }
  }
  const handleSearch = () => {
    if (inputSearch.trim() === '') {
      return
    }
    navigate(generatePath(routers.search, { slug: inputSearch }))
  }

  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('search-input')}
        value={inputSearch}
        onChange={(e) => handleInputSearchChange(e)}
        onBlur={() => {
          setTimeout(() => {
            setIsShowResult(false)
          }, 100)
        }}
        onFocus={() => {
          setIsShowResult(true)
        }}
        spellCheck={false}
      />
      {/* <Button size='small'>
        <FontAwesomeIcon
          className={cx('search-icon')}
          icon={faMagnifyingGlass}
        />
      </Button> */}
      <button className={cx('search-btn')} onClick={handleSearch}>
        <FontAwesomeIcon
          className={cx('search-icon')}
          icon={faMagnifyingGlass}
        />
      </button>
      {searchResult.length > 0 && isShowSearchResult === true ? (
        <div className={cx('result-search-wrapper')}>
          <div className={cx('results')}>
            {searchResult.map((result) => (
              <div
                className={cx('search-result-item')}
                key={result.id}
                onClick={() => {
                  setInputSearch('')
                  setIsShowResult(false)
                }}
              >
                <Link
                  to={generatePath(routers.post, {
                    id: result.id,
                    slug: generatePathSlug(result.title),
                  })}
                  className={cx('link')}
                >
                  {result.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Search
