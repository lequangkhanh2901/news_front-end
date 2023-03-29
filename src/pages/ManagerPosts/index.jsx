import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './ManagerPosts.module.scss'
import axioxCT from '../../configs/axiosCT'
import Pagination from '../../components/Pagination'
import PaginationItem from '../../components/Pagination/PaginationItem'
import { getTimeString } from '../../optionalFunction'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const cx = classNames.bind(styles)

function ManagerPosts() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [numPage, setNumPage] = useState()
  const [rerender, setRerender] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    setPosts([])
    const fetchPosts = async () => {
      const response = await axioxCT.get('/post/list/' + currentPage)
      if (response !== 'fail' && response.code === 200) {
        setPosts(response.data.posts)
        setNumPage(response.data.numPages)
      }
    }
    fetchPosts()
    return () => {
      controller.abort()
    }
  }, [currentPage, rerender])
  const handleChangePage = (item) => {
    setCurrentPage(item)
  }

  const handleDeletePost = async (id) => {
    const response = await axioxCT.delete('/post', { id })
    if (response === 'fail') {
      toast.error('Lỗi!')
    } else if (response.code === 203) {
      toast.success('Deleted!')
      setRerender([])
    } else {
      toast.error('Lỗi hệ thống!')
    }
  }
  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <h1 className={cx('title')}>Quản lí bài đăng</h1>
        <div className={cx('top-bar')}>
          <div className={cx('search-by-id')}>
            <h2 className={cx('title-search')}>Tìm kiếm bằng id</h2>
            <div className={cx('search-form')}>
              <input type='number' className={cx('input')} />
              <button className={cx('btn-search')}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          {/* <Link to='/post/trash'>Thùng rác</Link> */}
          <Button to='/post/trash' size='large'>
            Thùng rác
          </Button>
        </div>
        <div className={cx('posts')}>
          <table className={cx('posts-table')}>
            <thead className={cx('head-table')}>
              <tr>
                <th className={cx('post-id')}>id</th>
                <th className={cx('post-title')}>Tiêu đề</th>
                <th className={cx('post-created')}>Ngày đăng</th>
                <th className={cx('post-author')}>Tác giả</th>
                <th className={cx('post-censor')}>Người duyệt</th>
                <th className={cx('post-censored')}>Ngày duyệt</th>
                <th className={cx('post-action')}></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <tr className={cx('post')} key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{getTimeString(post.created_at)}</td>
                    <td>
                      <Link to={'/user/' + post.id_author}>
                        {post.name_author}
                      </Link>
                    </td>
                    <td>
                      <Link to={'/user/' + post.id_censor}>
                        {post.name_censor}
                      </Link>
                    </td>
                    <td>{getTimeString(post.censored_at)}</td>
                    <td>
                      <Button
                        onClick={() => handleDeletePost(post.id)}
                        size='small'
                        danger
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          onClick={handleChangePage}
          data={numPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}
export default ManagerPosts
