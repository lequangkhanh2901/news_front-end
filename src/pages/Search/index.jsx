import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link, generatePath, useParams } from 'react-router-dom'

import axiosCt from '../../configs/axiosCT'
import styles from './Search.module.scss'
import Aside from '../../components/Aside'
import Image from '../../components/Image'
import routers from '../../configs/baseRoutes'
import { generatePathSlug } from '../../optionalFunction'

const cx = classNames.bind(styles)

function Search() {
  const { slug } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchSearch = async () => {
      const response = await axiosCt.get('/post/search-all/' + slug)
      if (response !== 'fail' && response.code === 200) {
        setPosts(response.data)
      }
      console.log(response)
    }
    fetchSearch()
  }, [slug])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <h1 className={cx('title')}>
          Kết quả tìm kiếm cho: <span className={cx('slug')}>{slug}</span>
        </h1>
        <div className={cx('posts')}>
          {posts.map((post) => (
            <div className={cx('post')} key={post.id}>
              <Link
                to={generatePath(routers.post, {
                  id: post.id,
                  slug: generatePathSlug(post.title),
                })}
              >
                <Image src={post.avartar_cdn} alt={post.title} />
              </Link>
              <div className={cx('info')}>
                <Link
                  to={generatePath(routers.post, {
                    id: post.id,
                    slug: generatePathSlug(post.title),
                  })}
                >
                  <h2 className={cx('post-title')}>{post.title}</h2>
                </Link>
                <p className={cx('sort-desc')}>{post.sort_description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Aside />
    </div>
  )
}

export default Search
