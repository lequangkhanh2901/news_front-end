import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PostSettingPage from '../../components/PostSettingPage'
import axiosCt from '../../configs/axiosCT'

import styles from './TrashPost.module.scss'

const cx = classNames.bind(styles)

function TrashPost() {
  const [trashPosts, setTrashPosts] = useState([])
  const [rerender, setRerender] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchTrashPost = async () => {
      const response = await axiosCt.get('/post/trash')
      if (response !== 'fail' && response.code === 200) {
        setTrashPosts(response.data)
      }
      console.log(response)
    }

    fetchTrashPost()
    return () => {
      controller.abort()
    }
  }, [rerender])

  const handleRestore = async (idPost) => {
    const response = await axiosCt.post('/post/restore', { idPost })
    if (response !== 'fail' && response.code === 202) {
      toast.success('Khôi phục thành công!')
      setRerender({})
    } else {
      toast.error('Lỗi!')
    }
  }

  const handleForceDelete = async (idPost) => {
    const response = await axiosCt.delete('/post/force', {
      idPost,
    })
    if (response !== 'fail' && response.code === 200) {
      toast.success('Xóa thành công!')
      setRerender([])
    } else {
      toast.error('Lỗi!')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <h1 className={cx('title')}>Thùng rác bài đăng</h1>
        <PostSettingPage
          posts={trashPosts}
          onRestore={handleRestore}
          onDelete={handleForceDelete}
        />
      </div>
    </>
  )
}

export default TrashPost
