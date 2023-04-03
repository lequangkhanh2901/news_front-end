import classNames from 'classnames/bind'
import { lazy, Suspense, useEffect, useState } from 'react'
// import { io } from 'socket.io-client'

import axiosCt from '../../configs/axiosCT'
import BlockCategory from './component/BlockCatogory'
import styles from './Home.module.scss'
const Aside = lazy(() => import('../../components/Aside'))

const cx = classNames.bind(styles)

// const socket = io(import.meta.env.VITE_SOCKET_IO)

function Home() {
  const [homePagePost, setHomePagePost] = useState({})
  useEffect(() => {
    // socket.emit('test', 'test socket  ')
  }, [])

  useEffect(() => {
    const fetchHomePage = async () => {
      const response = await axiosCt.get('/post/home')
      if (response !== 'fail' && response.code === 200) {
        const posts = {}
        for (let post of response.data) {
          if (!posts[post.name_category]) {
            posts[post.name_category] = []
          }
        }
        for (let post of response.data) {
          for (let key in posts) {
            if (key == post.name_category) {
              posts[key].push(post)
            }
          }
        }
        setHomePagePost(posts)
      }
    }
    fetchHomePage()
  }, [])

  return (
    <div className={cx('home')}>
      <div className={cx('main')}>
        {Object.keys(homePagePost).map((category) => (
          <BlockCategory
            key={category}
            data={homePagePost[category]}
            categoryName={category}
          />
        ))}
      </div>
      <aside className={cx('aside')}>
        <Suspense>
          <Aside />
        </Suspense>
      </aside>
    </div>
  )
}

export default Home
