import { faClock, faEye, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { generatePath, Link, useParams } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import axiosCt from '../../configs/axiosCT'
import routers from '../../configs/baseRoutes'
import { generatePathSlug } from '../../optionalFunction'

import styles from './Category.module.scss'

const cx = classNames.bind(styles)

function Category() {
  const { id } = useParams()
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPage, setNumPage] = useState()
  useEffect(() => {
    const controller = new AbortController()
    setPosts([])
    const fetchPost = async () => {
      const response = await axiosCt.get(
        '/post/of-category/' + id + '/' + currentPage
      )
      if (response !== 'fail' && response.code === 200) {
        setPosts((prev) => response.data.posts)
        setNumPage(response.data.numpages)
      } else {
        setPosts([])
      }
    }
    fetchPost()
    return () => {
      controller.abort()
    }
  }, [id, currentPage])
  useEffect(() => {
    setCurrentPage(1)
  }, [id])
  const handleCLickPagination = (item) => {
    if (item === '<<') {
      setCurrentPage(1)
    } else if (item === '>>') {
      setCurrentPage(numPage)
    } else {
      setCurrentPage(item)
    }
    window.scrollTo(0, 0)
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        {posts.map((post) => {
          const date = new Date(post.created_at)
          return (
            <div className={cx('item')} key={post.id}>
              <img
                className={cx('avartar')}
                src={post.avartar_cdn}
                alt={post.title}
              />
              <div className={cx('info')}>
                <Link
                  className={cx('post-link')}
                  to={generatePath(routers.post, {
                    id: post.id,
                    slug: generatePathSlug(post.title),
                  })}
                >
                  <h3 className={cx('post-title')}>{post.title}</h3>
                </Link>
                <p className={cx('description')}>{post.sort_description}</p>
                <div className={cx('sub-info')}>
                  <div className={cx('viewed')}>
                    <FontAwesomeIcon
                      className={cx('viewed-icon')}
                      icon={faEye}
                    />
                    {post.viewed}
                  </div>
                  <div className={cx('time')}>
                    <FontAwesomeIcon
                      className={cx('created-icon')}
                      icon={faClock}
                    />
                    {`${date.getDay()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
                  </div>
                  <div className={cx('auhor')}>
                    <FontAwesomeIcon
                      className={cx('author-icon')}
                      icon={faUser}
                    />
                    {post.name_author}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Pagination
        data={numPage}
        onClick={handleCLickPagination}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Category
