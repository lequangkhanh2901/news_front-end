import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './ManagerPosts.module.scss'
import axioxCT from '../../configs/axiosCT'
import Pagination from '../../components/Pagination'
import Button from '../../components/Button'
import routers from '../../configs/baseRoutes'
import PostSettingPage from '../../components/PostSettingPage'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

function ManagerPosts() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPage, setNumPage] = useState()
  const [rerender, setRerender] = useState([])
  const [searchId, setSearchId] = useState('')
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const controller = new AbortController()
    setPosts([])
    const fetchPosts = async () => {
      let response
      switch (user.role) {
        case 0:
          response = await axioxCT.get('/post/list/' + currentPage)

          break
        case 1:
        case 2:
          response = await axioxCT.get('/post/list-special')
          break
        default:
          break
      }
      if (response !== 'fail' && response.code === 200) {
        if (user.role === 0) {
          setPosts(response.data.posts)
          setNumPage(response.data.numPages)
        } else {
          setPosts(response.data)
        }
      }
    }
    fetchPosts()
    return () => {
      controller.abort()
    }
  }, [currentPage, rerender])
  const handleChangePage = (item) => {
    if (item === '<<') {
      setCurrentPage(1)
    } else if (item === '>>') {
      setCurrentPage(numPage)
    } else {
      setCurrentPage(item)
    }
    window.scrollTo(0, 0)
  }

  const handleDeletePost = async (id) => {
    console.log(id)
    let response
    if (user.role === 1) {
      response = await axioxCT.delete('/post/un-censored', { id })
    } else {
      response = await axioxCT.delete('/post', { id })
    }

    console.log(response)
    if (response === 'fail') {
      toast.error('Lỗi!')
    } else if (response.code === 203 || response.code === 200) {
      toast.success('Deleted!')
      setRerender([])
    } else {
      toast.error('Lỗi hệ thống!')
    }
  }

  const handleChangeSearchId = (e) => {
    if (e.target.value.startsWith(' ')) {
      return
    }
    setSearchId(e.target.value)
  }

  const hanleSearchById = async () => {
    if (searchId.trim === '') {
      toast.warning('Id rỗng!')
      return
    }
    const response = await axioxCT.get('/post/' + searchId)
    if (response !== 'fail' && response.code === 200) {
      if (Object.keys(response.data).length > 0) {
        const tmpArr = []
        tmpArr.push(response.data)
        setPosts(tmpArr)
      } else {
        setPosts([])
      }
    }
  }
  const handleCensorPost = async (idPost) => {
    const response = await axioxCT.post('/post/censor', {
      id: idPost,
    })
    if (response !== 'fail' && response.code === 202) {
      toast.success('Duyệt thành công!')
      setRerender([])
    } else {
      toast.error('Lỗi!')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <h1 className={cx('title')}>Quản lí bài đăng</h1>
        {user.role === 0 && (
          <div className={cx('top-bar')}>
            <div className={cx('search-by-id')}>
              <h2 className={cx('title-search')}>Tìm kiếm bằng id</h2>
              <div className={cx('search-form')}>
                <input
                  type='number'
                  className={cx('input')}
                  value={searchId}
                  onChange={(e) => handleChangeSearchId(e)}
                />
                <Button
                  size='small'
                  className={cx('btn-search')}
                  onClick={hanleSearchById}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </div>
            </div>
            <Button to={routers.trashPost} size='large'>
              Thùng rác
            </Button>
          </div>
        )}
        {user.role === 0 && (
          <PostSettingPage
            posts={posts}
            onDelete={handleDeletePost}
            page='MANAGER'
          />
        )}
        {user.role === 1 && (
          <>
            <h2>Bài viết đã được duyệt</h2>
            <PostSettingPage
              posts={posts}
              // onDelete={handleDeletePost}
              page='MANAGER'
              type='CENSORED'
            />
            <h2>Bài viết chưa được duyệt</h2>
            <PostSettingPage
              posts={posts}
              onDelete={handleDeletePost}
              page='MANAGER'
              type='UN_CENSORED'
            />
          </>
        )}
        {user.role === 2 && (
          <PostSettingPage
            posts={posts}
            page='MANAGER'
            onCensor={handleCensorPost}
          />
        )}
        {user.role === 0}{' '}
        {
          <Pagination
            onClick={handleChangePage}
            data={numPage}
            currentPage={currentPage}
          />
        }
      </div>
    </>
  )
}
export default ManagerPosts
